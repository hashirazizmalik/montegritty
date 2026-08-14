import { createPublicSession } from '@/lib/uplift';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Only the capture tool uses this, and only when that tool is switched on.
export async function POST(request) {
  if (process.env.CAPTURE_TOOL !== 'on') {
    return Response.json({ error: 'Not found.' }, { status: 404 });
  }
  const { assistantId } = await request.json().catch(() => ({}));
  if (!assistantId) return Response.json({ error: 'assistantId is required.' }, { status: 400 });
  try {
    return Response.json(await createPublicSession(assistantId, 'capture'));
  } catch (e) {
    return Response.json({ error: e.message }, { status: 502 });
  }
}
