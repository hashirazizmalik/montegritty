import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DEFAULT_METRICS, SEED_CLIENTS } from './clients';

/**
 * Client records, stored wherever this deployment can actually persist them.
 *
 * Four backends, picked automatically in this order:
 *
 *   supabase — Postgres over PostgREST. The recommended one: client records and,
 *              later, call telemetry belong in a real table you can query.
 *              Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 *   kv       — Vercel KV / Upstash Redis, if KV_REST_API_URL and
 *              KV_REST_API_TOKEN are set.
 *   file     — .data/clients.json. Works locally; on Vercel the filesystem is
 *              read-only and per-invocation, so this is development only.
 *   memory   — last resort. Survives nothing. The admin panel says so loudly.
 *
 * No SDK for any of them — all three remote backends are plain REST, so there
 * is no driver to keep alive across serverless invocations.
 *
 * Seeds from lib/clients.js are always merged underneath, so a client defined in
 * code exists even when the store is empty.
 */

const KEY = 'montegritty:clients';
const FILE = resolve(process.cwd(), '.data', 'clients.json');

const kvUrl = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const sbUrl = () => process.env.SUPABASE_URL;
// The service role key bypasses row-level security. It is only ever read here,
// server-side, and must never be exposed to the browser or prefixed NEXT_PUBLIC_.
const sbKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

export function backend() {
  if (sbUrl() && sbKey()) return 'supabase';
  if (kvUrl() && kvToken()) return 'kv';
  if (process.env.VERCEL) return 'memory';
  return 'file';
}

export const isDurable = () => ['supabase', 'kv'].includes(backend());

let memory = null;

async function kv(command) {
  const res = await fetch(kvUrl(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${kvToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`KV ${command[0]} failed: ${res.status}`);
  const { result } = await res.json();
  return result;
}

async function supabase(path, init = {}) {
  const res = await fetch(`${sbUrl()}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: sbKey(),
      Authorization: `Bearer ${sbKey()}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Supabase ${init.method || 'GET'} ${path} failed (${res.status}): ${detail.slice(0, 200)}`);
  }
  return res.status === 204 ? null : res.json();
}

async function readRaw() {
  const how = backend();
  try {
    if (how === 'supabase') {
      const rows = await supabase('clients?select=data');
      return rows.map((r) => r.data);
    }
    if (how === 'kv') {
      const raw = await kv(['GET', KEY]);
      return raw ? JSON.parse(raw) : [];
    }
    if (how === 'file') {
      return JSON.parse(readFileSync(FILE, 'utf8'));
    }
  } catch (e) {
    // A missing file on first run is expected; anything else is worth knowing.
    if (e?.code !== 'ENOENT') console.error('[store] read failed:', e.message);
  }
  return memory || [];
}

async function writeRaw(list) {
  const how = backend();
  memory = list;
  if (how === 'kv') {
    await kv(['SET', KEY, JSON.stringify(list)]);
    return;
  }
  if (how === 'file') {
    mkdirSync(dirname(FILE), { recursive: true });
    writeFileSync(FILE, JSON.stringify(list, null, 2));
  }
}

/**
 * Seeds first, saved records on top — saved wins on a slug collision, except
 * for `metrics`.
 *
 * Metrics are not an admin-editable field: they come from the seed today and
 * from real telemetry later. A copy captured in the store when a client was
 * saved would otherwise freeze the dashboard at whatever shape the code had
 * that day, which is exactly what happened once already.
 */
export async function listClients() {
  const saved = await readRaw();
  const bySlug = new Map(SEED_CLIENTS.map((c) => [c.slug, { ...c, seeded: true }]));
  for (const c of saved) {
    const seed = bySlug.get(c.slug);
    bySlug.set(c.slug, {
      ...seed,
      ...c,
      seeded: false,
      metrics: seed?.metrics || DEFAULT_METRICS,
    });
  }
  return [...bySlug.values()]
    .map((c) => ({ ...c, metrics: c.metrics || DEFAULT_METRICS }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getClient(slug) {
  if (!slug) return null;
  return (await listClients()).find((c) => c.slug === slug) || null;
}

export async function getClientByUsername(username) {
  if (!username) return null;
  const needle = String(username).trim().toLowerCase();
  return (await listClients()).find((c) => (c.username || '').toLowerCase() === needle) || null;
}

/** Create or update. Merges into whatever is already stored for that slug. */
export async function saveClient(client) {
  if (backend() === 'supabase') {
    const base = (await getClient(client.slug)) || {};
    const { seeded, metrics, ...clean } = { ...base, ...client };
    await supabase('clients?on_conflict=slug', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ slug: clean.slug, data: clean }),
    });
    return clean;
  }

  const saved = await readRaw();
  const i = saved.findIndex((c) => c.slug === client.slug);
  // Merge against the effective record so editing one field never wipes a
  // seeded value the admin never touched.
  const base = (await getClient(client.slug)) || {};
  const { seeded, metrics, ...clean } = { ...base, ...client };
  if (i >= 0) saved[i] = clean; else saved.push(clean);
  await writeRaw(saved);
  return clean;
}

export async function deleteClient(slug) {
  if (backend() === 'supabase') {
    await supabase(`clients?slug=eq.${encodeURIComponent(slug)}`, {
      method: 'DELETE',
      headers: { Prefer: 'return=minimal' },
    });
    return;
  }

  const saved = await readRaw();
  await writeRaw(saved.filter((c) => c.slug !== slug));
}
