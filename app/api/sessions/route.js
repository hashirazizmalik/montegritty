import { createPublicSession, getBuilderAssistantId, hasKey } from '@/lib/uplift';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Mint browser credentials for a voice conversation.
 *
 *   POST { assistantId }   → talk to that agent
 *   POST { builder: true } → talk to the studio builder
 *
 * Returns { token, wsUrl, roomName } for the LiveKit client. The underlying
 * Uplift endpoint needs no API key, but it is proxied here rather than called
 * from the browser so the origin stays same-site and the builder's id is never
 * exposed as something a visitor has to know.
 */
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    /* an empty body is fine — treated as a builder request below */
  }

  let assistantId = typeof body.assistantId === 'string' ? body.assistantId.trim() : '';

  if (!assistantId) {
    if (!hasKey()) {
      return Response.json(
        { error: 'The studio is not configured on this deployment.' },
        { status: 503 }
      );
    }
    try {
      assistantId = await getBuilderAssistantId();
    } catch (e) {
      console.error('[api/sessions] builder unavailable:', e);
      return Response.json({ error: 'The studio is unavailable right now.' }, { status: 502 });
    }
  }

  try {
    const session = await createPublicSession(assistantId, body.participantName || 'visitor');
    return Response.json({ ...session, assistantId });
  } catch (e) {
    console.error('[api/sessions] session failed:', e);

    // Say what actually went wrong. "The agent may have expired" was a guess,
    // and when the real cause was a reset `public` flag it sent the debugging
    // in entirely the wrong direction.
    const detail = String(e?.message || '');
    const notPublic = detail.includes('not available publicly') || detail.includes('403');
    const missing = detail.includes('404');

    return Response.json(
      {
        error: notPublic
          ? 'That agent is not marked public, so a browser cannot connect to it. Run tools/repair-assistants.mjs, or recreate it.'
          : missing
            ? 'That agent no longer exists on the Uplift account.'
            : 'Could not start the conversation.',
        detail: detail.slice(0, 300),
      },
      { status: 502 }
    );
  }
}
