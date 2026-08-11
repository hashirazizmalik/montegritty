import { FREE_LIMIT, remaining } from '@/lib/quota';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Lets the template library show "3 of 5 left" before anyone clicks anything.
export async function GET() {
  return Response.json(
    { remaining: await remaining(), limit: FREE_LIMIT },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
