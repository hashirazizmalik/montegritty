import { notFound } from 'next/navigation';
import ClientDashboard from '@/components/ClientDashboard';
import { getClient } from '@/lib/store';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

/**
 * The iframe version. No navigation, no session — an embed on a client's own
 * website cannot send our cookie, so the unguessable key in the URL is what
 * authorises it. Rotating the key in the admin panel revokes every existing
 * embed, which is the point.
 */
export default async function EmbedPage({ params, searchParams }) {
  const { slug } = await params;
  const { k } = await searchParams;
  const client = await getClient(slug);
  if (!client) notFound();

  if (client.embedKey && k !== client.embedKey) {
    return (
      <main className="cd-page embed">
        <p className="cd-denied">
          This dashboard link is not valid. Ask Montegritty for a current embed code.
        </p>
      </main>
    );
  }

  return (
    <main className="cd-page embed">
      <ClientDashboard client={client} embedded />
    </main>
  );
}
