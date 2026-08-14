import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/session';
import { hasKey } from '@/lib/uplift';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Lists the assistants on the Uplift account so the capture harness has
// something to pick from. Shape-tolerant: the list endpoint has changed before.
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Not signed in as admin.' }, { status: 401 });
  }
  if (!hasKey()) return NextResponse.json({ assistants: [] });

  try {
    const res = await fetch('https://api.upliftai.org/v1/realtime-assistants', {
      headers: { Authorization: `Bearer ${process.env.UPLIFT_API_KEY}` },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Uplift responded ${res.status}`);
    const body = await res.json();
    const rows = Array.isArray(body) ? body : body.data || body.assistants || body.items || [];
    return NextResponse.json({
      assistants: rows
        .map((a) => ({
          id: a.realtimeAssistantId || a.id,
          name: a.name || 'Unnamed',
          createdAt: a.createdAt || null,
        }))
        .filter((a) => a.id),
    });
  } catch (e) {
    console.error('[api/admin/assistants]', e);
    return NextResponse.json({ assistants: [], error: e.message });
  }
}
