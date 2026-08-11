'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import useAuthConfigured from './useAuthConfigured';

function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className="g-mark">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

/**
 * `configured` comes from the server — without Google credentials there is
 * nothing to sign in to, and a button that only produces an error page is worse
 * than an honest message.
 */
export default function SignInButton({ compact = false, label = 'Sign in with Google' }) {
  const { data: session, status } = useSession();
  const configured = useAuthConfigured();

  // Unknown yet — render nothing rather than flashing the wrong state.
  if (configured === null) return <span className="auth-loading" aria-hidden="true" />;

  if (!configured) {
    return compact ? null : (
      <span className="auth-off">Sign-in is not configured on this deployment</span>
    );
  }

  if (status === 'loading') return <span className="auth-loading" aria-hidden="true" />;

  if (session?.user) {
    return (
      <span className="auth-who">
        {session.user.image
          ? <img src={session.user.image} alt="" width={26} height={26} referrerPolicy="no-referrer" />
          : <span className="auth-initial">{(session.user.name || '?').charAt(0)}</span>}
        {!compact && <span className="auth-name">{session.user.name || session.user.email}</span>}
        <button type="button" className="auth-out" onClick={() => signOut()}>Sign out</button>
      </span>
    );
  }

  return (
    <button type="button" className="auth-in" onClick={() => signIn('google')}>
      <GoogleMark />
      {label}
    </button>
  );
}
