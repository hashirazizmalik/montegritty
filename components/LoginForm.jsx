'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * One form for both admins and clients. The server decides which you are and
 * where you land, so nobody needs to know there are two kinds of account.
 */
export default function LoginForm({ hint }) {
  const router = useRouter();
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

  return (
    <form className="login" onSubmit={submit}>
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
        {busy ? 'Signing in…' : 'Sign in'}
        <span className="arr" aria-hidden="true">↗</span>
      </button>

      {error && <p className="login-err" role="alert">{error}</p>}
      {hint && !error && <p className="login-hint">{hint}</p>}
    </form>
  );
}
