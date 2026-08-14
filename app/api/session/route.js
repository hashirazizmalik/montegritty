import { NextResponse } from 'next/server';
import {
  checkAdmin, adminConfigured, endSession, startSession, verifyPassword,
} from '@/lib/session';
import { getClientByUsername } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// One login endpoint for both roles: admin credentials are checked first, then
// client accounts. Failures are deliberately indistinguishable so the form
// cannot be used to discover which usernames exist.
export async function POST(request) {
  let body = {};
  try { body = await request.json(); } catch { /* handled below */ }

  const username = String(body.username || '').trim();
  const password = String(body.password || '');
  if (!username || !password) {
    return NextResponse.json({ error: 'Enter a username and password.' }, { status: 400 });
  }

  if (checkAdmin(username, password)) {
    await startSession({ role: 'admin', username });
    return NextResponse.json({ role: 'admin', redirect: '/admin' });
  }

  const client = await getClientByUsername(username);
  if (client?.passwordHash && verifyPassword(password, client.passwordHash)) {
    await startSession({ role: 'client', slug: client.slug, username });
    return NextResponse.json({ role: 'client', redirect: `/c/${client.slug}` });
  }

  const hint = !adminConfigured()
    ? 'Admin sign-in is disabled until ADMIN_PASSWORD is set on this deployment.'
    : 'That username and password do not match.';
  return NextResponse.json({ error: hint }, { status: 401 });
}

export async function DELETE() {
  await endSession();
  return NextResponse.json({ ok: true });
}
