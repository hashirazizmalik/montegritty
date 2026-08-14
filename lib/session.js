import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

/**
 * Password hashing and signed sessions, with no dependencies and no database.
 *
 * Passwords are scrypt-hashed with a per-password salt — never stored or logged
 * in the clear, including the admin's. Sessions are an HMAC-signed cookie, so
 * there is no session table to keep.
 */

const COOKIE = 'mg_session';
const MAX_AGE = 60 * 60 * 12; // 12 hours

const secret = () =>
  process.env.SESSION_SECRET ||
  process.env.QUOTA_SECRET ||
  process.env.UPLIFT_API_KEY ||
  'montegritty-dev-secret';

// ---------------------------------------------------------------- passwords

export function hashPassword(plain) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(String(plain), salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(plain, stored) {
  if (!plain || typeof stored !== 'string' || !stored.startsWith('scrypt:')) return false;
  const [, salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const attempt = scryptSync(String(plain), salt, 64);
  const known = Buffer.from(hash, 'hex');
  return attempt.length === known.length && timingSafeEqual(attempt, known);
}

// ------------------------------------------------------------- admin config

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';

/**
 * In development an admin can sign in with a known default so the panel is
 * usable the moment you clone the repo. In production that would be an open
 * door, so ADMIN_PASSWORD must be set explicitly or admin login is refused.
 */
export const DEV_ADMIN_PASSWORD = 'montegritty-admin';

export function adminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  return process.env.NODE_ENV === 'production' ? null : DEV_ADMIN_PASSWORD;
}

export const adminConfigured = () => adminPassword() !== null;

export function checkAdmin(username, password) {
  const expected = adminPassword();
  if (!expected) return false;
  if (String(username || '').trim().toLowerCase() !== ADMIN_USERNAME.toLowerCase()) return false;
  const a = Buffer.from(String(password || ''));
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// ---------------------------------------------------------------- sessions

const sign = (payload) => createHmac('sha256', secret()).update(payload).digest('base64url');

function encode(session) {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function decode(raw) {
  if (typeof raw !== 'string' || !raw.includes('.')) return null;
  const [payload, sig] = raw.split('.');
  const a = Buffer.from(sig || '');
  const b = Buffer.from(sign(payload));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (!session.exp || session.exp < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export async function startSession(session) {
  const jar = await cookies();
  jar.set(COOKIE, encode({ ...session, exp: Date.now() + MAX_AGE * 1000 }), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function currentSession() {
  const jar = await cookies();
  return decode(jar.get(COOKIE)?.value);
}

export async function requireAdmin() {
  const s = await currentSession();
  return s?.role === 'admin' ? s : null;
}

/** Admins can view any client dashboard; a client only ever sees their own. */
export async function canViewClient(slug) {
  const s = await currentSession();
  if (!s) return false;
  return s.role === 'admin' || (s.role === 'client' && s.slug === slug);
}
