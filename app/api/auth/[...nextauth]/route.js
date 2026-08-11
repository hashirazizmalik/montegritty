import { handlers, isAuthConfigured } from '@/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Without Google credentials NextAuth throws on every request, and the
// SessionProvider polls /api/auth/session on every page load — which would mean
// a 500 in the console for every visitor on a deployment that simply has not
// switched sign-in on yet. An empty session is the honest answer instead.
const notConfigured = () =>
  Response.json({}, { status: 200, headers: { 'Cache-Control': 'no-store' } });

export async function GET(request, context) {
  if (!isAuthConfigured()) return notConfigured();
  return handlers.GET(request, context);
}

export async function POST(request, context) {
  if (!isAuthConfigured()) {
    return Response.json({ error: 'Sign-in is not configured.' }, { status: 503 });
  }
  return handlers.POST(request, context);
}
