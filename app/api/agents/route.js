import { auth, isAuthConfigured } from '@/auth';
import { createAgent, hasKey } from '@/lib/uplift';
import { getTemplate } from '@/lib/templates';
import { safeVoice } from '@/lib/voices';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const bad = (message, status = 400) =>
  Response.json({ error: message }, { status });

/**
 * Create a live voice agent, either from a template or from a spec the studio
 * builder assembled during a conversation.
 *
 *   POST { templateId }                          → deploy a ready-made template
 *   POST { name, instructions, voice, greeting } → deploy what the builder wrote
 *
 * Returns { id, url } — the url is a public page anyone can talk to.
 */
export async function POST(request) {
  if (!hasKey()) {
    return bad('Voice agent creation is not configured on this deployment.', 503);
  }

  // Creating an agent costs real API credits and produces a link that gets
  // shared, so it is the one thing behind a sign-in. Listening to an agent
  // someone shared with you stays open.
  if (!isAuthConfigured()) {
    return bad('Sign-in is not configured on this deployment, so agents cannot be created.', 503);
  }
  const session = await auth();
  if (!session?.user) {
    return Response.json(
      { error: 'Sign in with Google to deploy an agent.', needsAuth: true },
      { status: 401 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return bad('Expected a JSON body.');
  }

  let spec;

  if (body.templateId) {
    const t = getTemplate(body.templateId);
    if (!t) return bad(`No template with id "${body.templateId}".`, 404);
    spec = {
      name: `${t.name} — Montegritty demo`,
      description: t.blurb,
      voice: t.voice,
      instructions: t.instructions,
      greeting: t.greeting,
    };
  } else {
    const { name, instructions, voice, greeting, description } = body;
    // Instructions are the whole agent. Anything shorter than a sentence or two
    // produces something that will happily say anything, so refuse it.
    if (typeof instructions !== 'string' || instructions.trim().length < 40) {
      return bad('An agent needs instructions of at least 40 characters.');
    }
    spec = {
      name: typeof name === 'string' && name.trim() ? name.trim() : 'Custom agent',
      description: typeof description === 'string' ? description : '',
      // The builder is told which voices exist, but an LLM can still invent one
      // — and the theatrical half of Uplift's catalogue must never reach a
      // customer. Anything unrecognised silently becomes the default.
      voice: safeVoice(typeof voice === 'string' ? voice.trim() : ''),
      instructions: instructions.trim().slice(0, 8000),
      greeting: typeof greeting === 'string' ? greeting.trim().slice(0, 400) : '',
    };
  }

  try {
    const id = await createAgent(spec);
    return Response.json({ id, url: `/agent/${id}`, name: spec.name });
  } catch (e) {
    console.error('[api/agents] create failed:', e);
    return bad('Could not create the agent right now. Please try again.', 502);
  }
}
