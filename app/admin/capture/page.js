import Link from 'next/link';
import { redirect } from 'next/navigation';
import CallCapture from '@/components/CallCapture';
import { requireAdmin } from '@/lib/session';
import { hasKey } from '@/lib/uplift';

export const metadata = { title: 'Call capture — Montegritty', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

async function loadAssistants() {
  if (!hasKey()) return [];
  try {
    const res = await fetch('https://api.upliftai.org/v1/realtime-assistants', {
      headers: { Authorization: `Bearer ${process.env.UPLIFT_API_KEY}` },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const body = await res.json();
    const rows = Array.isArray(body) ? body : body.data || body.assistants || body.items || [];
    return rows.map((a) => ({ id: a.realtimeAssistantId || a.id, name: a.name || 'Unnamed' })).filter((a) => a.id);
  } catch {
    return [];
  }
}

export default async function CapturePage() {
  if (!(await requireAdmin())) redirect('/login');
  const assistants = await loadAssistants();

  return (
    <main className="adm-page">
      <div className="adm-top">
        <div>
          <h1>Call capture</h1>
          <p>Instrumented call · every SDK event recorded</p>
        </div>
        <Link href="/admin" className="adm-signout">← Clients</Link>
      </div>

      <p className="adm-warn" style={{ background: 'var(--bone-2)', borderColor: 'var(--line)', color: 'var(--ink-soft)' }}>
        <strong>Why this exists.</strong> Uplift has no server-side call log, transcript
        or webhook API — nothing can be queried once a call ends. Anything the client
        dashboard shows has to be captured live in the room and stored by us. Make a real
        call here, download the JSON, and design the dashboard from the fields that are
        actually in it.
      </p>

      <CallCapture assistants={assistants} />
    </main>
  );
}
