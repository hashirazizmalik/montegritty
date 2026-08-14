import { notFound } from 'next/navigation';
import CallCapture from '@/components/CallCapture';
import { hasKey } from '@/lib/uplift';

export const metadata = { title: 'Call capture', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

/**
 * Internal debugging tool. There is no sign-in on this site any more, so it is
 * gated by an environment variable instead: set CAPTURE_TOOL=on to expose it.
 * Off by default, and a 404 rather than a 403 so its existence is not
 * advertised to anyone poking at URLs.
 */
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
  if (process.env.CAPTURE_TOOL !== 'on') notFound();
  return (
    <main className="adm-page">
      <div className="adm-top">
        <div>
          <h1>Call capture</h1>
          <p>Internal · every SDK event recorded</p>
        </div>
      </div>
      <CallCapture assistants={await loadAssistants()} />
    </main>
  );
}
