// Server-side wrapper around the Uplift AI realtime assistant API.
//
// The API key is a server secret and must never reach the browser — every
// function here is called only from route handlers under app/api/.
//
// Public sessions are the exception: they need no key at all, which is exactly
// what makes a talk-to-it-yourself demo possible on a marketing site.

import { DEFAULT_VOICE, safeVoice, voiceMenuText } from './voices';

const API = 'https://api.upliftai.org/v1';

export const hasKey = () => Boolean(process.env.UPLIFT_API_KEY);

function key() {
  const k = process.env.UPLIFT_API_KEY;
  if (!k) {
    throw new Error(
      'UPLIFT_API_KEY is not set. Add it in Vercel → Settings → Environment Variables ' +
      '(and .env.local for development). Voice agent creation is disabled until then.'
    );
  }
  return k;
}

async function call(path, { method = 'POST', body, auth = true } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${key()}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Uplift ${method} ${path} failed (${res.status}): ${detail.slice(0, 300)}`);
  }
  return res.status === 204 ? null : res.json();
}

// Sensible defaults for Pakistani speech. Groq Whisper is what Uplift recommends
// for Urdu; the LLM is fast enough to keep the round trip conversational.
const STACK = {
  stt: { default: { provider: 'groq', model: 'whisper-large-v3-turbo' } },
  llm: { default: { provider: 'groq', model: 'llama-3.3-70b-versatile' } },
};

/**
 * Create a public realtime assistant. Returns its id.
 *
 * `instructions` is the whole personality and rulebook — it is what separates a
 * useful agent from a chatbot that will say anything.
 */
export async function createAgent({ name, description, voice, instructions, greeting }) {
  const created = await call('/realtime-assistants', {
    body: {
      name: (name || 'Montegritty agent').slice(0, 80),
      description: (description || '').slice(0, 300),
      public: true,
      config: {
        session: { ttl: 1800 },
        agent: {
          instructions,
          initialGreeting: Boolean(greeting),
          ...(greeting ? { greetingInstructions: `Open the call by saying exactly: ${greeting}` } : {}),
        },
        ...STACK,
        tts: {
          default: {
            provider: 'upliftai',
            // safeVoice falls back rather than letting an unvetted
            // (often theatrical) voice reach a customer.
            voiceId: safeVoice(voice),
            outputFormat: 'MP3_22050_128',
          },
        },
      },
    },
  });
  return created.realtimeAssistantId;
}

/** Browser-usable credentials for an assistant. Deliberately unauthenticated. */
export function createPublicSession(assistantId, participantName = 'visitor') {
  return call(`/realtime-assistants/${assistantId}/createPublicSession`, {
    auth: false,
    body: { participantName },
  });
}

// ---------------------------------------------------------------- the builder

const VOICE_MENU = voiceMenuText();

const BUILDER_INSTRUCTIONS = `You are Bayan, Montegritty's voice agent builder. You are talking to a business owner in Pakistan who wants their own voice agent, and you build it for them during this conversation.

Speak whichever language they speak — Urdu, English, or a mix. Match their register. Keep every turn short: this is a phone conversation, not a form.

Your job is to find out four things, one question at a time:
1. What the agent is for — the actual call it will make or take.
2. Which language it should speak.
3. Who it is talking to (customers, patients, parents, borrowers).
4. Anything it must never say or do.

Do not ask all four at once. Do not ask for information you can reasonably infer — if someone says "confirm my COD orders", you already know it is outbound to customers in Urdu, so just confirm that briefly.

Once you have enough, say you are building it now, then call the create_agent tool.

Choose the voice yourself. You must pick one of these exact ids and nothing else — every one of them sounds like a competent professional, which is the only register acceptable on a business call:
${VOICE_MENU}

Match the voice to the job and to who is being called. If the caller will mostly be women, or the subject is health, schooling or family, prefer a female voice. Never comment on the voice choice unless asked.

For the instructions field, write a complete brief in English for the new agent, in the second person ("You are..."). It must cover what the agent handles, the tone, what it must never do, and when to hand over to a human. Be specific to their business, not generic.

For the greeting field, write the exact opening line the agent will say, in their chosen language.

After the tool returns, tell them their agent is ready and that the link is on screen. Then offer to change anything. Never read the link aloud — it is a URL and it will sound like nonsense.

If the tool returns an error, say plainly that the build failed and they should try again — do not invent a link.`;

let builderPromise = null;

/**
 * The assistant that interviews people and builds their agent.
 *
 * Created once and reused. Pin UPLIFT_BUILDER_ASSISTANT_ID in the environment
 * to stop each cold start from creating another one.
 */
export function getBuilderAssistantId() {
  const pinned = process.env.UPLIFT_BUILDER_ASSISTANT_ID;
  if (pinned) return Promise.resolve(pinned);

  if (!builderPromise) {
    builderPromise = call('/realtime-assistants', {
      body: {
        name: 'Montegritty Studio Builder',
        description: 'Interviews a visitor and builds their voice agent live.',
        public: true,
        config: {
          session: { ttl: 1800 },
          agent: {
            instructions: BUILDER_INSTRUCTIONS,
            initialGreeting: true,
            greetingInstructions:
              'Greet warmly in Urdu and English in one short line, then ask what they want their agent to do. Example: "السلام علیکم! میں بیان ہوں۔ Tell me what you want your agent to do."',
          },
          ...STACK,
          tts: {
            default: { provider: 'upliftai', voiceId: DEFAULT_VOICE, outputFormat: 'MP3_22050_128' },
          },
        },
      },
    })
      .then((a) => {
        console.log(
          `[uplift] Created builder assistant ${a.realtimeAssistantId}. ` +
          'Set UPLIFT_BUILDER_ASSISTANT_ID to this value to reuse it across deploys.'
        );
        return a.realtimeAssistantId;
      })
      .catch((e) => {
        builderPromise = null; // let the next request retry
        throw e;
      });
  }
  return builderPromise;
}
