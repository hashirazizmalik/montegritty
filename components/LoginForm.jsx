'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * One form for both admins and clients. The server decides which you are and
 * where you land, so nobody needs to know there are two kinds of account.
 */
const ROLES = [
  {
    id: 'client',
    title: 'Client sign in',
    blurb: 'See your voice agent and its dashboard.',
    cta: 'Sign in to your dashboard',
  },
  {
    id: 'admin',
    title: 'Administrator',
    blurb: 'Manage every client account, agent and dashboard.',
    cta: 'Sign in as administrator',
  },
];

export default function LoginForm({ hint, adminEnabled = true }) {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not sign you in.');
      // refresh() so the server components re-read the new session cookie.
      router.push(data.redirect);
      router.refresh();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  // Which door you came through is a UI affordance only — the server decides
  // what you actually are from the credentials, so picking "Administrator" here
  // grants nothing on its own.
  if (!role) {
    return (
      <div className="login-choose">
        {ROLES.map((r) => (
          <button
            key={r.id}
            type="button"
            className="login-role"
            onClick={() => { setRole(r.id); setError(''); }}
            disabled={r.id === 'admin' && !adminEnabled}
          >
            <span className="login-role-title">{r.title}</span>
            <span className="login-role-blurb">
              {r.id === 'admin' && !adminEnabled
                ? 'Disabled until ADMIN_PASSWORD is set on this deployment.'
                : r.blurb}
            </span>
            <span className="login-role-go" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    );
  }

  const chosen = ROLES.find((r) => r.id === role);

  return (
    <form className="login" onSubmit={submit}>
      <button type="button" className="login-back" onClick={() => { setRole(null); setError(''); }}>
        ← Not you?
      </button>
      <p className="login-role-now">{chosen.title}</p>
      <div className="field">
        <label htmlFor="lg-user">Username</label>
        <input
          id="lg-user" value={form.username} onChange={set('username')}
          autoComplete="username" autoCapitalize="none" spellCheck="false" required
        />
      </div>
      <div className="field">
        <label htmlFor="lg-pass">Password</label>
        <input
          id="lg-pass" type="password" value={form.password} onChange={set('password')}
          autoComplete="current-password" required
        />
      </div>

      <button type="submit" className="btn" disabled={busy}>
        {busy ? 'Signing in…' : chosen.cta}
        <span className="arr" aria-hidden="true">↗</span>
      </button>

      {error && <p className="login-err" role="alert">{error}</p>}
      {hint && !error && <p className="login-hint">{hint}</p>}
    </form>
  );
}
