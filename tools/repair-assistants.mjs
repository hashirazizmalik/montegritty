/**
 * Patch assistants that were created before the STT and delivery fixes.
 *
 *   UPLIFT_API_KEY=sk_api_... node tools/repair-assistants.mjs          # dry run
 *   UPLIFT_API_KEY=sk_api_... node tools/repair-assistants.mjs --apply
 *
 * Two changes per assistant:
 *   1. stt.language = 'ur'. Whisper left to auto-detect mangles Urdu, and the
 *      model then answers the garbage it was handed.
 *   2. Appends DELIVERY_RULES to the instructions, which stops the model
 *      speaking its own `<function=end_call>` syntax out loud and stops it
 *      inventing details the caller never gave.
 *
 *   3. public = true. Uplift's update endpoint resets top-level fields that are
 *      omitted from the body, so an update carrying only `config` silently
 *      turned `public` off on every assistant — and every public session then
 *      failed with "Assistant is not available publicly". Always send it.
 *
 * Idempotent: an assistant already carrying all three is skipped.
 */
import { DELIVERY_RULES } from '../lib/uplift.js';

const KEY = process.env.UPLIFT_API_KEY;
const APPLY = process.argv.includes('--apply');
// --model=groq:moonshotai/kimi-k2-instruct   (or openai:gpt-4o-mini)
const MODEL_ARG = process.argv.find((a) => a.startsWith('--model='))?.split('=')[1];
const [MODEL_PROVIDER, MODEL_NAME] = MODEL_ARG ? MODEL_ARG.split(/:(.+)/) : [];
const API = 'https://api.upliftai.org/v1/realtime-assistants';

if (!KEY) {
  console.error('Set UPLIFT_API_KEY before running.');
  process.exit(1);
}

const headers = { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };
const MARKER = '--- HOW TO SPEAK';

const listRes = await fetch(API, { headers, cache: 'no-store' });
if (!listRes.ok) {
  console.error(`Could not list assistants: ${listRes.status}`);
  process.exit(1);
}
const body = await listRes.json();
const rows = Array.isArray(body) ? body : body.data || body.assistants || body.items || [];

console.log(`${rows.length} assistants on the account.${APPLY ? '' : '  (dry run — pass --apply to write)'}\n`);

let patched = 0;
let skipped = 0;

for (const a of rows) {
  const id = a.realtimeAssistantId || a.id;
  const name = a.name || 'Unnamed';
  const cfg = a.config || {};
  const agent = cfg.agent || {};
  const stt = cfg.stt?.default || {};

  const needsLang = stt.language !== 'ur';
  const needsRules = !String(agent.instructions || '').includes(MARKER);
  const needsPublic = a.public !== true;
  const llm = cfg.llm?.default || {};
  const needsModel = Boolean(MODEL_NAME) && (llm.model !== MODEL_NAME || llm.provider !== MODEL_PROVIDER);

  const rulesStale = String(agent.instructions || '').includes(MARKER)
    && !String(agent.instructions || '').includes('Write Urdu in the Urdu script only');

  if (!needsLang && !needsRules && !needsPublic && !needsModel && !rulesStale) {
    skipped += 1;
    console.log(`  ✓ ${name.slice(0, 44).padEnd(44)} already current`);
    continue;
  }

  const why = [
    needsLang && 'stt language',
    (needsRules || rulesStale) && 'delivery rules',
    needsPublic && 'public flag',
    needsModel && `model → ${MODEL_NAME}`,
  ].filter(Boolean).join(' + ');
  console.log(`  → ${name.slice(0, 44).padEnd(44)} ${why}`);

  if (!APPLY) continue;

  const next = {
    // Always sent. Omitting it resets it — see the note at the top of this file.
    public: true,
    config: {
      ...cfg,
      agent: {
        ...agent,
        instructions: (() => {
          // Strip any previous copy first, so re-running never stacks the block.
          const base = String(agent.instructions || '').split(MARKER)[0].trimEnd();
          return `${base}${DELIVERY_RULES}`;
        })(),
      },
      stt: { ...cfg.stt, default: { ...stt, language: 'ur' } },
      ...(MODEL_NAME
        ? { llm: { ...cfg.llm, default: { ...llm, provider: MODEL_PROVIDER, model: MODEL_NAME } } }
        : {}),
    },
  };

  const res = await fetch(`${API}/${id}`, {
    method: 'POST',   // Uplift updates are POST to the id, partial-merge
    headers,
    body: JSON.stringify(next),
  });

  if (!res.ok) {
    console.log(`     failed: ${res.status} ${(await res.text()).slice(0, 160)}`);
    continue;
  }
  patched += 1;
}

console.log(
  `\n${APPLY ? `${patched} patched` : `${rows.length - skipped} would be patched`}, ${skipped} already current.`
);
