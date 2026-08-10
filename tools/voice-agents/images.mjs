/**
 * Convert agent portraits into web-sized WebP and drop them in public/agents/.
 *
 * The source files are full-resolution PNGs (roughly 1.9 MB each) — far too
 * heavy to ship. This produces a display image and a small thumbnail for the
 * slider's nav strip, together well under a tenth of the original.
 *
 *   node tools/voice-agents/images.mjs ~/Downloads
 *
 * Names are matched loosely, so "dr saad.png", "Dr Saad.PNG" and "saad.webp"
 * all land on the same agent. Anything missing is skipped and reported — the
 * slider falls back to a monogram panel for agents without a portrait.
 *
 * Uses sharp, which ships with Next.js, so there is nothing extra to install.
 */
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '..', '..', 'public', 'agents');
const SRC = resolve(process.argv[2] || join(process.env.HOME, 'Downloads'));

// <substring to look for>: <agent id>
const MAP = {
  hassan: 'hassan-support',
  ayesha: 'ayesha-clinic',
  bilal: 'bilal-cod',
  fatima: 'fatima-collections',
  saad: 'saad-chroniccare',
  sana: 'sana-school',
  kamran: 'kamran-leads',
  zainab: 'zainab-outreach',
};

const OK = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const kb = (p) => Math.round(statSync(p).size / 1024);

mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => OK.has(extname(f).toLowerCase()));
const missing = [];

for (const [stem, id] of Object.entries(MAP)) {
  const match = files.find((f) => f.toLowerCase().includes(stem));
  if (!match) {
    missing.push(`${id}  (looked for a filename containing "${stem}")`);
    continue;
  }

  const src = join(SRC, match);
  const full = join(OUT, `${id}.webp`);
  const thumb = join(OUT, `${id}-thumb.webp`);

  // 4:5 portrait, matching how the slider crops it.
  await sharp(src).resize(900, 1125, { fit: 'cover', position: 'top' })
    .webp({ quality: 80 }).toFile(full);
  await sharp(src).resize(240, 300, { fit: 'cover', position: 'top' })
    .webp({ quality: 70 }).toFile(thumb);

  console.log(`  ${id.padEnd(22)} ${String(kb(full)).padStart(4)} KB  + ${kb(thumb)} KB thumb   ← ${match}`);
}

if (missing.length) {
  console.log('\nNo portrait found for:');
  missing.forEach((m) => console.log(`  - ${m}`));
  console.log(`\nDrop the file into ${SRC} and re-run.`);
  console.log('Until then the slider shows a monogram panel for that agent.');
}
