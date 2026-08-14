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

  if (!needsLang && !needsRules && !needsPublic) {
    skipped += 1;
    console.log(`  ✓ ${name.slice(0, 44).padEnd(44)} already current`);
    continue;
  }

  const why = [needsLang && 'stt language', needsRules && 'delivery rules', needsPublic && 'public flag']
    .filter(Boolean).join(' + ');
  console.log(`  → ${name.slice(0, 44).padEnd(44)} ${why}`);

  if (!APPLY) continue;

  const next = {
    // Always sent. Omitting it resets it — see the note at the top of this file.
    public: true,
    config: {
      ...cfg,
      agent: {
        ...agent,
        instructions: needsRules ? `${agent.instructions || ''}${DELIVERY_RULES}` : agent.instructions,
      },
      stt: { ...cfg.stt, default: { ...stt, language: 'ur' } },
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
