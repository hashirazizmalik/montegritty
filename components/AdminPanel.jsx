'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { VOICES } from '@/lib/voices';

const BLANK = {
  slug: '', name: '', contact: '', assistantId: '', agentName: '', agentRole: '',
  voice: 'helpdesk-agent', language: 'Urdu · English', plan: 'Pilot',
  username: '', password: '',
};

const origin = () => (typeof window === 'undefined' ? '' : window.location.origin);

export default function AdminPanel() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [storage, setStorage] = useState(null);
  const [editing, setEditing] = useState(null);   // slug being edited, or 'new'
  const [form, setForm] = useState(BLANK);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState('');

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/clients');
    if (res.status === 401) { router.push('/login'); return; }
    const data = await res.json();
    setClients(data.clients || []);
    setStorage(data.storage || null);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const startNew = () => { setEditing('new'); setForm(BLANK); setMsg(''); setErr(''); };
  const startEdit = (c) => {
    setEditing(c.slug);
    // Password is intentionally blank: it is never sent to the browser, and
    // leaving it empty on save keeps whatever the client already has.
    setForm({ ...BLANK, ...c, password: '' });
    setMsg(''); setErr('');
  };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true); setErr(''); setMsg('');
    try {
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save.');
      setMsg(`Saved ${data.client.name}.`);
      setEditing(null);
      await load();
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (c) => {
    if (!window.confirm(`Delete ${c.name}? Their dashboard link and login stop working immediately.`)) return;
    setBusy(true);
    await fetch(`/api/admin/clients?slug=${encodeURIComponent(c.slug)}`, { method: 'DELETE' });
    await load();
    setBusy(false);
  };

  const signOut = async () => {
    await fetch('/api/session', { method: 'DELETE' });
    router.push('/login');
    router.refresh();
  };

  const copy = async (text, tag) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(tag);
      setTimeout(() => setCopied((c) => (c === tag ? '' : c)), 2000);
    } catch { /* the field is selectable either way */ }
  };

  const voices = useMemo(
    () => VOICES.map((v) => ({ id: v.id, label: `${v.id} — ${v.gender}` })),
    []
  );

  return (
    <div className="adm">
      <div className="adm-top">
        <div>
          <h1>Clients</h1>
          <p>{clients.length} account{clients.length === 1 ? '' : 's'}</p>
        </div>
        <div className="adm-top-actions">
          <button type="button" className="btn" onClick={startNew}>
            New client <span className="arr" aria-hidden="true">↗</span>
          </button>
          <button type="button" className="adm-signout" onClick={signOut}>Sign out</button>
        </div>
      </div>

      {storage && !storage.durable && (
        <p className="adm-warn" role="status">
          <strong>Nothing you save here will survive a redeploy.</strong> Storage is
          &ldquo;{storage.backend}&rdquo;. Add <code>SUPABASE_URL</code> and{' '}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> to make this permanent — see SUPABASE.sql
          for the one table it needs.
        </p>
      )}
      {msg && <p className="adm-ok" role="status">{msg}</p>}
      {err && <p className="adm-err" role="alert">{err}</p>}

      {editing && (
        <form className="adm-form" onSubmit={save}>
          <h2>{editing === 'new' ? 'New client' : `Editing ${form.name}`}</h2>

          <div className="adm-grid">
            <label>Company name
              <input value={form.name} onChange={set('name')} required placeholder="Shakir & Associates" />
            </label>
            <label>URL slug
              <input
                value={form.slug} onChange={set('slug')}
                placeholder="shakir" disabled={editing !== 'new'}
              />
              <small>{editing === 'new' ? 'Leave blank to derive it from the name.' : 'Fixed once created.'}</small>
            </label>
            <label>Contact person
              <input value={form.contact} onChange={set('contact')} placeholder="Shakir Shehzad" />
            </label>
            <label>Plan
              <input value={form.plan} onChange={set('plan')} placeholder="Pilot" />
            </label>
          </div>

          <h3>Their voice agent</h3>
          <div className="adm-grid">
            <label>Agent name
              <input value={form.agentName} onChange={set('agentName')} placeholder="Legal Intake Desk" />
            </label>
            <label>What it does
              <input value={form.agentRole} onChange={set('agentRole')} placeholder="First-contact screening" />
            </label>
            <label>Uplift assistant ID
              <input value={form.assistantId} onChange={set('assistantId')} placeholder="uuid from /studio or a template deploy" />
              <small>Leave blank until one is built. The dashboard says &ldquo;not connected&rdquo; until then.</small>
            </label>
            <label>Voice
              <select value={form.voice} onChange={set('voice')}>
                {voices.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
              </select>
            </label>
            <label>Languages
              <input value={form.language} onChange={set('language')} placeholder="Urdu · English" />
            </label>
          </div>

          <h3>Their login</h3>
          <div className="adm-grid">
            <label>Username
              <input
                value={form.username} onChange={set('username')}
                autoCapitalize="none" spellCheck="false" placeholder="shakir"
              />
            </label>
            <label>Password
              <input
                type="text" value={form.password} onChange={set('password')}
                autoComplete="new-password"
                placeholder={editing === 'new' ? 'Set a password' : 'Leave blank to keep current'}
              />
              <small>Stored hashed — you will not be able to read it back, so send it to them now.</small>
            </label>
          </div>

          <div className="adm-actions">
            <button type="submit" className="btn" disabled={busy}>
              {busy ? 'Saving…' : 'Save client'}
            </button>
            <button type="button" className="adm-cancel" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="adm-list">
        {clients.map((c) => {
          const url = `${origin()}/c/${c.slug}`;
          const embedSrc = `${origin()}/embed/${c.slug}${c.embedKey ? `?k=${c.embedKey}` : ''}`;
          const embed = `<iframe src="${embedSrc}" width="100%" height="900" style="border:0" title="${c.name} — voice agent dashboard" loading="lazy"></iframe>`;
          return (
            <article className="adm-card" key={c.slug}>
              <div className="adm-card-head">
                <div>
                  <h3>{c.name}</h3>
                  <p className="adm-meta">
                    {c.plan || 'No plan'} · {c.agentName || 'No agent yet'}
                    {c.contact ? ` · ${c.contact}` : ''}
                  </p>
                </div>
                <div className="adm-card-actions">
                  <button type="button" onClick={() => startEdit(c)}>Edit</button>
                  {!c.seeded && <button type="button" onClick={() => remove(c)}>Delete</button>}
                </div>
              </div>

              <dl className="adm-facts">
                <dt>Login</dt>
                <dd>
                  {c.username
                    ? <>{c.username} {c.hasPassword ? '· password set' : '· no password yet'}</>
                    : <span className="adm-missing">no account yet</span>}
                </dd>
                <dt>Agent</dt>
                <dd>
                  {c.assistantId
                    ? <code>{c.assistantId}</code>
                    : <span className="adm-missing">not connected</span>}
                </dd>
              </dl>

              <div className="adm-share">
                <label>Dashboard URL
                  <span className="adm-copy">
                    <input readOnly value={url} />
                    <button type="button" onClick={() => copy(url, `u-${c.slug}`)}>
                      {copied === `u-${c.slug}` ? 'Copied' : 'Copy'}
                    </button>
                  </span>
                </label>
                <label>Embed code
                  <span className="adm-copy">
                    <input readOnly value={embed} />
                    <button type="button" onClick={() => copy(embed, `e-${c.slug}`)}>
                      {copied === `e-${c.slug}` ? 'Copied' : 'Copy'}
                    </button>
                  </span>
                </label>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
