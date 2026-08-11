/**
 * Generate lib/integrations.js from simple-icons.
 *
 *   node tools/logos.mjs
 *
 * simple-icons is a devDependency and its paths are baked into the generated
 * file, so the 3,453-icon package never ships to the browser.
 *
 * Note which brands are deliberately absent: Slack, Salesforce and Twilio were
 * removed from simple-icons at the trademark holders' request. We name those in
 * text rather than redrawing marks their owners actively police.
 */
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as si from 'simple-icons';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'lib', 'integrations.js');

const WANT = [
  ['whatsapp', 'WhatsApp'],
  ['n8n', 'n8n'],
  ['make', 'Make'],
  ['zapier', 'Zapier'],
  ['hubspot', 'HubSpot'],
  ['zoho', 'Zoho'],
  ['odoo', 'Odoo'],
  ['shopify', 'Shopify'],
  ['woocommerce', 'WooCommerce'],
  ['googlesheets', 'Google Sheets'],
  ['googlecalendar', 'Google Calendar'],
  ['gmail', 'Gmail'],
  ['notion', 'Notion'],
  ['airtable', 'Airtable'],
  ['telegram', 'Telegram'],
  ['discord', 'Discord'],
];

const icons = WANT.map(([slug, name]) => {
  const icon = si['si' + slug.charAt(0).toUpperCase() + slug.slice(1)];
  if (!icon) throw new Error(`simple-icons has no "${slug}"`);
  return { name, slug, path: icon.path };
});

writeFileSync(
  OUT,
  `// GENERATED FILE — do not edit by hand.\n` +
  `// Source: simple-icons, via tools/logos.mjs. Regenerate: node tools/logos.mjs\n` +
  `//\n` +
  `// Logo paths are trademarks of their respective owners and appear here only to\n` +
  `// indicate what a Montegritty agent can connect to.\n\n` +
  `export const INTEGRATIONS = ${JSON.stringify(icons, null, 2)};\n\n` +
  `// Brands simple-icons removed at the trademark holders' request. We name them\n` +
  `// rather than redraw marks their owners actively police.\n` +
  `export const ALSO = ['Slack', 'Salesforce', 'Twilio', 'Microsoft 365', 'Freshdesk', 'Zendesk'];\n`
);

console.log(`wrote ${OUT} — ${icons.length} marks`);
