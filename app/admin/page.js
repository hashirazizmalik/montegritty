import { redirect } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';
import { requireAdmin } from '@/lib/session';

export const metadata = { title: 'Admin — Montegritty', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!(await requireAdmin())) redirect('/login');
  return <main className="adm-page"><AdminPanel /></main>;
}
