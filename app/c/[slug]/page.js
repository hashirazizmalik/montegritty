import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import ClientDashboard from '@/components/ClientDashboard';
import SignOutButton from '@/components/SignOutButton';
import { canViewClient } from '@/lib/session';
import { getClient } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const client = await getClient(slug);
  return {
    title: client ? `${client.name} — Voice agent dashboard` : 'Dashboard',
    robots: { index: false, follow: false },
  };
}

export default async function ClientPage({ params }) {
  const { slug } = await params;
  const client = await getClient(slug);
  if (!client) notFound();

  // A dashboard is a client's own business data, so it needs a session. The
  // embed is the deliberate exception — it carries a key instead, because an
  // iframe on someone else's site cannot rely on our cookie.
  if (!(await canViewClient(slug))) redirect(`/login?next=/c/${slug}`);

  return (
    <main className="cd-page">
      <div className="cd-shell">
        <div className="cd-bar">
          <Link href="/" className="cd-brand">Montegritty</Link>
          <SignOutButton />
        </div>
        <ClientDashboard client={client} />
      </div>
    </main>
  );
}
