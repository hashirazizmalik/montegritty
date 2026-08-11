'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CATEGORIES, TEMPLATES } from '@/lib/templates';
import { AGENTS } from '@/lib/agents';

const demoHref = (id) => `/voice-agents/${id}`;

export default function TemplateLibrary() {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(null);
  const [live, setLive] = useState({});   // templateId → { url }
  const [failed, setFailed] = useState({});

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
                  <span className="tpl-voice">{t.voice}</span>
                  <span className="tpl-langs">{t.languages.join(' · ').toUpperCase()}</span>
                </div>

                <div className="tpl-foot">
                  {deployed ? (
                    <Link className="tpl-live" href={deployed.url}>Talk to it &rarr;</Link>
                  ) : (
                    <button
                      type="button"
                      className="tpl-deploy"
                      onClick={() => deploy(t)}
                      disabled={busy === t.id}
                    >
                      {busy === t.id ? 'Deploying…' : 'Deploy & talk'}
                    </button>
                  )}
                  {agent && (
                    <Link className="tpl-demo" href={demoHref(agent.id)}>
                      Hear the real call
                    </Link>
                  )}
                </div>
                {failed[t.id] && <p className="tpl-err" role="alert">{failed[t.id]}</p>}
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
