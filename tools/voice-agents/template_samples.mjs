/**
 * Synthesise the opening line of every template so visitors can hear the voice
 * before deploying anything.
 *
 *   UPLIFT_API_KEY=sk_api_... node tools/voice-agents/template_samples.mjs
 *
 * Reads lib/templates.js directly, so the greeting and voice can never drift
 * from what actually gets deployed. Resumable: existing files are skipped, so
 * changing one greeting costs one API call. Pass --force to redo everything.
 */
import { mkdirSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { TEMPLATES } from '../../lib/templates.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '..', '..', 'public', 'templates');
const KEY = process.env.UPLIFT_API_KEY;
const FORCE = process.argv.includes('--force');
const URL = 'https://api.upliftai.org/v1/synthesis/text-to-speech';

if (!KEY) {
  console.error('Set UPLIFT_API_KEY before running.');
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });

async function synth(t) {
  const path = join(OUT, `${t.id}.mp3`);
  if (!FORCE && existsSync(path) && statSync(path).size > 1000) return { skipped: true, path };

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const res = await fetch(URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        voiceId: t.voice,
        text: t.greeting,
        outputFormat: 'MP3_22050_64',
      }),
    });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length > 1000) {
        writeFileSync(path, buf);
        return { path, bytes: buf.length };
      }
    }
    if (attempt === 3) {
      throw new Error(`${t.id}: ${res.status} ${(await res.text()).slice(0, 160)}`);
    }
    await new Promise((r) => setTimeout(r, 800 * attempt));
  }
}

// Three at a time — enough to be quick, gentle enough not to trip rate limits.
const queue = [...TEMPLATES];
let made = 0;
let skipped = 0;
let bytes = 0;

async function worker() {
  while (queue.length) {
    const t = queue.shift();
    const r = await synth(t);
    if (r.skipped) {
      skipped += 1;
    } else {
      made += 1;
      bytes += r.bytes;
      console.log(`  ${t.id.padEnd(24)} ${t.voice.padEnd(22)} ${Math.round(r.bytes / 1024)} KB`);
    }
  }
}

await Promise.all([worker(), worker(), worker()]);

console.log(
  `\n${made} synthesised, ${skipped} already present. ` +
  `${(bytes / 1024 / 1024).toFixed(2)} MB written to public/templates/.`
);
