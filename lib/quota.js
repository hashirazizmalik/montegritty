import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

/**
 * Free-tier allowance for creating demo agents.
 *
 * Every created agent costs real API credits and stays live, so visitors get a
 * handful to try and then a conversation with us. Template deploys and studio
 * builds draw on the same allowance because both create the same thing.
 *
 * Tracked in a signed cookie rather than an account, because there is no login
 * and there should not be one just to hear a demo. Be clear-eyed about what
 * that means: the signature stops casual editing of the counter, but anyone who
 * clears their cookies or opens a private window starts again. This is a
 * friction gate to start a sales conversation, not a licence check — if it ever
 * needs to be enforceable, it needs accounts.
 */
export const FREE_LIMIT = 5;

const COOKIE = 'mg_demo_quota';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// AUTH-free deployments still need a signing key. Falling back to a constant
// keeps the site working; set QUOTA_SECRET in production to make the signature
// meaningful.
const secret = () => process.env.QUOTA_SECRET || process.env.UPLIFT_API_KEY || 'montegritty-dev';

const sign = (value) => createHmac('sha256', secret()).update(String(value)).digest('base64url');

function verify(raw) {
  if (typeof raw !== 'string' || !raw.includes('.')) return 0;
  const [count, sig] = raw.split('.');
  const n = Number.parseInt(count, 10);
  if (!Number.isInteger(n) || n < 0) return 0;

  const expected = sign(n);
  const a = Buffer.from(sig || '');
  const b = Buffer.from(expected);
  // A tampered counter is treated as exhausted rather than as zero, so editing
  // the cookie can never buy extra runs.
  if (a.length !== b.length || !timingSafeEqual(a, b)) return FREE_LIMIT;
  return n;
}

/** How many the visitor has already used. */
export async function used() {
  const jar = await cookies();
  return verify(jar.get(COOKIE)?.value);
}

export async function remaining() {
  return Math.max(0, FREE_LIMIT - (await used()));
}

/** Record one more creation. Returns how many are left afterwards. */
export async function consume() {
  const jar = await cookies();
  const next = (await used()) + 1;
  jar.set(COOKIE, `${next}.${sign(next)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  });
  return Math.max(0, FREE_LIMIT - next);
}
