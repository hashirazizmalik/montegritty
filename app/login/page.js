import Link from 'next/link';
import LoginForm from '@/components/LoginForm';
import { adminConfigured, currentSession, DEV_ADMIN_PASSWORD, ADMIN_USERNAME } from '@/lib/session';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Sign in — Montegritty', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const session = await currentSession();
  if (session?.role === 'admin') redirect('/admin');
  if (session?.role === 'client') redirect(`/c/${session.slug}`);

  // Only ever shown off production, where the default is the point.
  const devHint = !process.env.ADMIN_PASSWORD && process.env.NODE_ENV !== 'production'
    ? `Development admin: ${ADMIN_USERNAME} / ${DEV_ADMIN_PASSWORD}`
    : null;

  return (
    <main className="login-page">
      <div className="login-box">
        <Link href="/" className="login-brand">Montegritty</Link>
        <h1>Sign in</h1>
        <p className="login-lede">Who is signing in?</p>
        <LoginForm hint={devHint} adminEnabled={adminConfigured()} />
        {!adminConfigured() && (
          <p className="login-note">
            Admin sign-in is disabled on this deployment until <code>ADMIN_PASSWORD</code> is set.
          </p>
        )}
      </div>
    </main>
  );
}
