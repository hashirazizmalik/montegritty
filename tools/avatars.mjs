/**
 * Generate an avatar for every template.
 *
 *   node tools/avatars.mjs
 *
 * Bayan gives each of its templates a face, and it is the single thing that
 * makes their gallery feel like a cast of staff rather than a config list —
 * worth borrowing. DiceBear's "notionists" set is open source, so this is a
 * shared public asset, not their artwork.
 *
 * Rendered to static SVGs at build time rather than hitting api.dicebear.com at
 * runtime: no external request on page load, no layout shift, works offline.
 * Seeded by template id, so a given template always gets the same face.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createAvatar } from '@dicebear/core';
import { notionistsNeutral } from '@dicebear/collection';

import { TEMPLATES } from '../lib/templates.js';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'avatars');
mkdirSync(OUT, { recursive: true });

// Bone-family backgrounds so the faces sit in the site's palette rather than
// arriving with their own.
const BACKGROUNDS = ['EDE9E0', 'E5E7E0', 'EFE7DE', 'E7EAE6'];

let n = 0;
for (const t of TEMPLATES) {
  const svg = createAvatar(notionistsNeutral, {
    seed: t.id,
    size: 128,
    radius: 50,
    backgroundColor: [BACKGROUNDS[n % BACKGROUNDS.length]],
  }).toString();
  writeFileSync(join(OUT, `${t.id}.svg`), svg);
  n += 1;
}

console.log(`wrote ${n} avatars to public/avatars/`);
