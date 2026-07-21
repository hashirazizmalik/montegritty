import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = { name: 120, email: 200, company: 160, message: 4000, timeline: 60 };

/**
 * Naive fixed-window rate limit. This lives in process memory, so it resets on
 * deploy and does NOT coordinate across serverless instances — it's a speed bump
 * for casual spam, not real abuse protection. Put Upstash/Redis behind this if
 * the form starts getting hit.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip);

  if (!rec || now - rec.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    if (hits.size > 5000) hits.clear(); // crude ceiling so the map can't grow forever
    return false;
  }

  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

function clientIp(req) {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

/** Strip control characters so nothing odd lands in a log or an email body. */
function clean(value, max) {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
}

async function deliver(payload) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // No mail provider configured — log it and let the caller know it wasn't emailed.
  if (!key || !to || !from) {
    console.info('[contact] enquiry received (no mail provider configured):', payload);
    return { delivered: false };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `New enquiry — ${payload.name}${payload.company ? ` (${payload.company})` : ''}`,
      text: [
        `Name:     ${payload.name}`,
        `Email:    ${payload.email}`,
        `Company:  ${payload.company || '—'}`,
        `Timeline: ${payload.timeline || '—'}`,
        '',
        payload.message,
      ].join('\n'),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Mail provider responded ${res.status}: ${body.slice(0, 300)}`);
  }
  return { delivered: true };
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  const payload = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    company: clean(body.company, LIMITS.company),
    message: clean(body.message, LIMITS.message),
    timeline: clean(body.timeline, LIMITS.timeline),
  };

  if (payload.name.length < 2) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(payload.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (payload.message.length < 12) {
    return NextResponse.json({ error: 'Please add a little more detail.' }, { status: 400 });
  }

  // Rate limit only well-formed submissions. Validation failures are cheap (they
  // never reach the mail provider), and counting them would let someone lock
  // themselves out just by mistyping their email a few times.
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: 'Too many messages in a short time. Please try again in a minute.' },
      { status: 429 }
    );
  }

  try {
    const { delivered } = await deliver(payload);
    return NextResponse.json({
      ok: true,
      message: delivered
        ? 'Thanks — your message is on its way. We’ll reply within one business day.'
        : 'Thanks — we’ve logged your enquiry. For the fastest reply, message us on WhatsApp.',
    });
  } catch (err) {
    console.error('[contact] delivery failed:', err);
    return NextResponse.json(
      { error: 'We couldn’t send that just now.' },
      { status: 502 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
