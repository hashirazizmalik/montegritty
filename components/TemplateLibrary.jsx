'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { PlayGlyph, PauseGlyph } from './PlayIcon';
import useAuthConfigured from './useAuthConfigured';
import { CATEGORIES, TEMPLATES } from '@/lib/templates';
import { AGENTS } from '@/lib/agents';

const demoHref = (id) => `/voice-agents/${id}`;

// Absolute, because the whole point is pasting it somewhere else.
const shareUrl = (path) =>
  typeof window === 'undefined' ? path : `${window.location.origin}${path}`;

export default function TemplateLibrary() {
  const { data: session } = useSession();
  const authConfigured = useAuthConfigured();
  const signedIn = Boolean(session?.user);
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(null);
  const [sounding, setSounding] = useState(null);
  const [live, setLive] = useState({});   // templateId → { id, url }
  const [failed, setFailed] = useState({});
  const [copied, setCopied] = useState(null);
  // One shared element rather than 52, so switching previews can never leave a
  // previous voice playing underneath.
  const audioRef = useRef(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const stop = () => setSounding(null);
    el.addEventListener('pause', stop);
    el.addEventListener('ended', stop);
    el.addEventListener('error', stop);
    return () => {
      el.removeEventListener('pause', stop);
      el.removeEventListener('ended', stop);
      el.removeEventListener('error', stop);
    };
  }, []);

  const hear = (t) => {
    const el = audioRef.current;
    if (!el) return;
    if (sounding === t.id) { el.pause(); return; }
    document.querySelectorAll('audio').forEach((o) => { if (o !== el) o.pause(); });
    el.src = `/templates/${t.id}.mp3`;
    el.play().then(() => setSounding(t.id)).catch(() => setSounding(null));
  };

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return TEMPLATES.filter((t) => {
      if (cat !== 'all' && t.category !== cat) return false;
      if (!needle) return true;
      return (
        t.name.toLowerCase().includes(needle) ||
        t.blurb.toLowerCase().includes(needle) ||
        t.urName.includes(needle)
      );
    });
  }, [cat, q]);

  const deploy = async (t) => {
    setBusy(t.id);
    setFailed((f) => ({ ...f, [t.id]: null }));
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: t.id }),
      });
      const data = await res.json();
      if (res.status === 401) throw new Error('Sign in with Google to deploy an agent.');
      if (!res.ok) throw new Error(data.error || 'Could not deploy this template.');
      setLive((l) => ({ ...l, [t.id]: data }));
    } catch (e) {
      setFailed((f) => ({ ...f, [t.id]: e.message }));
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <div className="tpl-bar">
        <div className="tpl-cats" role="tablist" aria-label="Template categories">
          <button
            type="button" role="tab" aria-selected={cat === 'all'}
            className={`tpl-cat${cat === 'all' ? ' on' : ''}`}
            onClick={() => setCat('all')}
          >
            All <span>{TEMPLATES.length}</span>
          </button>
          {CATEGORIES.map((c) => {
            const n = TEMPLATES.filter((t) => t.category === c.id).length;
            return (
              <button
                key={c.id} type="button" role="tab" aria-selected={cat === c.id}
                className={`tpl-cat${cat === c.id ? ' on' : ''}`}
                onClick={() => setCat(c.id)}
              >
                {c.label} <span>{n}</span>
              </button>
            );
          })}
        </div>
        <input
          className="tpl-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search templates…"
          aria-label="Search templates"
        />
      </div>

      {shown.length === 0 ? (
        <p className="tpl-empty">
          Nothing matches “{q}”. We build custom agents for anything not on this list —{' '}
          <Link href="/contact">tell us what you need</Link>.
        </p>
      ) : (
        <div className="tpl-grid">
          {shown.map((t) => {
            const agent = t.demo ? AGENTS.find((a) => a.id === t.demo) : null;
            const deployed = live[t.id];
            return (
              <article className="tpl" key={t.id}>
                <div className="tpl-head">
                  <h3>{t.name}</h3>
                  <p className="tpl-ur urdu">{t.urName}</p>
                </div>
                <p className="tpl-blurb">{t.blurb}</p>

                <div className="tpl-meta">
                  <button
                    type="button"
                    className="tpl-hear"
                    onClick={() => hear(t)}
                    aria-label={
                      sounding === t.id
                        ? `Stop the ${t.name} sample`
                        : `Hear the ${t.name} voice say its opening line`
                    }
                  >
                    {sounding === t.id ? <PauseGlyph /> : <PlayGlyph />}
                    {t.voice}
                  </button>
                  <span className="tpl-langs">{t.languages.join(' · ').toUpperCase()}</span>
                </div>
                {sounding === t.id && <p className="tpl-line urdu">{t.greeting}</p>}

                <div className="tpl-foot">
                  {deployed ? (
                    <Link className="tpl-live" href={deployed.url}>Talk to it &rarr;</Link>
                  ) : signedIn ? (
                    <button
                      type="button"
                      className="tpl-deploy"
                      onClick={() => deploy(t)}
                      disabled={busy === t.id}
                    >
                      {busy === t.id ? 'Deploying…' : 'Deploy & talk'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="tpl-deploy locked"
                      onClick={() => authConfigured === true && signIn('google')}
                      disabled={authConfigured !== true}
                      title={
                        authConfigured === false
                          ? 'Sign-in is not configured on this deployment'
                          : 'Deploying creates a live, shareable agent — sign in first'
                      }
                    >
                      {authConfigured === false ? 'Deploy unavailable' : 'Sign in to deploy'}
                    </button>
                  )}
                  {agent && (
                    <Link className="tpl-demo" href={demoHref(agent.id)}>
                      Hear the real call
                    </Link>
                  )}
                </div>
                {deployed && (
                  <div className="tpl-share">
                    <input readOnly value={shareUrl(deployed.url)} aria-label={`Share link for ${t.name}`} />
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(shareUrl(deployed.url));
                          setCopied(t.id);
                          setTimeout(() => setCopied((c) => (c === t.id ? null : c)), 2200);
                        } catch { /* clipboard blocked — the field is selectable */ }
                      }}
                    >
                      {copied === t.id ? 'Copied' : 'Copy link'}
                    </button>
                  </div>
                )}
                {failed[t.id] && <p className="tpl-err" role="alert">{failed[t.id]}</p>}
              </article>
            );
          })}
        </div>
      )}
      <audio ref={audioRef} preload="none" />
    </>
  );
}
