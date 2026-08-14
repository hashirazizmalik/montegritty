'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { CATEGORIES, TEMPLATES } from '@/lib/templates';
import { AGENTS } from '@/lib/agents';
import { PlayGlyph, PauseGlyph } from './PlayIcon';

/**
 * The template catalogue, as a listening experience.
 *
 * There is no deploy button any more: this site's job is to prove the voices
 * are good and start a conversation, not to hand out self-serve agents. Every
 * card plays its own opening line in its own voice.
 */
export default function TemplateLibrary() {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [sounding, setSounding] = useState(null);
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
            const playing = sounding === t.id;
            return (
              <article className={`tpl${playing ? ' playing' : ''}`} key={t.id}>
                <div className="tpl-head">
                  {/* Faces make a catalogue read as a cast of staff rather than
                      a config list. Generated at build time — see tools/avatars.mjs. */}
                  <img className="tpl-face" src={`/avatars/${t.id}.svg`} alt="" width={52} height={52} loading="lazy" />
                  <div>
                    <h3>{t.name}</h3>
                    <p className="tpl-ur urdu">{t.urName}</p>
                  </div>
                </div>

                <p className="tpl-blurb">{t.blurb}</p>

                <div className="tpl-foot">
                  <button
                    type="button"
                    className={`tpl-hear${playing ? ' on' : ''}`}
                    onClick={() => hear(t)}
                    aria-label={playing ? `Stop ${t.name}` : `Hear the ${t.name} voice`}
                  >
                    {playing ? <PauseGlyph /> : <PlayGlyph />}
                    {playing ? 'Playing' : 'Hear the voice'}
                  </button>
                  <span className="tpl-voice">{t.voice}</span>
                  {agent && (
                    <Link className="tpl-demo" href={`/agents/${agent.id}`}>Full call</Link>
                  )}
                </div>

                {playing && <p className="tpl-line urdu">{t.greeting}</p>}
              </article>
            );
          })}
        </div>
      )}
      <audio ref={audioRef} preload="none" />
    </>
  );
}
