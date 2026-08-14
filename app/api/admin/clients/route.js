import { NextResponse } from 'next/server';
import { hashPassword, requireAdmin } from '@/lib/session';
import { backend, deleteClient, isDurable, listClients, saveClient } from '@/lib/store';
import { randomBytes } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const deny = () => NextResponse.json({ error: 'Not signed in as admin.' }, { status: 401 });

// Slugs end up in a URL and a subdomain, so keep them boring.
const toSlug = (s) =>
  String(s || '').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);

/** Never let a password hash out of the server, even to an admin. */
const safe = ({ passwordHash, ...rest }) => ({ ...rest, hasPassword: Boolean(passwordHash) });

export async function GET() {
  if (!(await requireAdmin())) return deny();
  return NextResponse.json({
    clients: (await listClients()).map(safe),
    storage: { backend: backend(), durable: isDurable() },
  });
}

export async function POST(request) {
  if (!(await requireAdmin())) return deny();

  let body = {};
  try { body = await request.json(); } catch { /* validated below */ }

  const slug = toSlug(body.slug || body.name);
  if (!slug) return NextResponse.json({ error: 'A name is required.' }, { status: 400 });

  const record = {
    slug,
    name: String(body.name || '').trim() || slug,
    contact: String(body.contact || '').trim(),
    assistantId: String(body.assistantId || '').trim(),
    agentName: String(body.agentName || '').trim(),
    agentRole: String(body.agentRole || '').trim(),
    voice: String(body.voice || '').trim(),
    language: String(body.language || '').trim(),
    plan: String(body.plan || '').trim(),
    username: String(body.username || '').trim(),
  };

  // Only set a password when one was actually typed, so saving other fields
  // never silently clears an existing login.
  if (body.password) record.passwordHash = hashPassword(body.password);

  const existing = (await listClients()).find((c) => c.slug === slug);
  if (!existing?.embedKey) record.embedKey = randomBytes(12).toString('base64url');

  const saved = await saveClient(record);
  return NextResponse.json({ client: safe(saved), durable: isDurable() });
}

export async function DELETE(request) {
  if (!(await requireAdmin())) return deny();
  const slug = new URL(request.url).searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Missing slug.' }, { status: 400 });
  await deleteClient(slug);
  return NextResponse.json({ ok: true });
}
