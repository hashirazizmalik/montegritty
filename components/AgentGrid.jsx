'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import { AGENTS } from '@/lib/agents';
import { PlayGlyph, PauseGlyph } from './PlayIcon';

/**
 * The demo gallery. Each card plays that agent's opening line in place — a
 * two-second taste — and links through to the full call.
 *
 * One <audio> element is shared across every card rather than eight of them,
 * so switching agents can't leave a previous greeting playing underneath.
 */
export default function AgentGrid({ agents }) {
  const audioRef = useRef(null);
  const [sounding, setSounding] = useState(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const stop = () => setSounding(null);
    el.addEventListener('pause', stop);
    el.addEventListener('ended', stop);
    return () => {
      el.removeEventListener('pause', stop);
      el.removeEventListener('ended', stop);
    };
  }, []);

  const hear = (agent) => {
    const el = audioRef.current;
    if (!el) return;
    if (sounding === agent.id) {
      el.pause();
      return;
    }
    document.querySelectorAll('audio').forEach((o) => { if (o !== el) o.pause(); });
    el.src = agent.greetingAudio;
    el.play().then(() => setSounding(agent.id)).catch(() => setSounding(null));
  };

  return (
    <>
      <div className="ag-grid">
        {agents.map((a, i) => (
          <Reveal className="ag-card" key={a.id} delay={(i % 2) * 0.1}>
            <div className="ag-card-line" />
            <div className="ag-top">
              {/* Numbered by position in the full catalogue, so a subset shown
                  on the home page keeps the same numbers as the demo index. */}
              <span className="ag-idx">
                {String(AGENTS.findIndex((x) => x.id === a.id) + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="ag-name">{a.name}</h3>
                <p className="ag-role">{a.role}</p>
                <p className="ag-vert">{a.vertical}</p>
              </div>
            </div>
            <p className="ag-tag">{a.tagline}</p>
            <div className="ag-foot">
              <button
                type="button"
                className="pbtn sm"
                onClick={() => hear(a)}
                aria-label={
                  sounding === a.id
                    ? `Stop ${a.name}'s greeting`
                    : `Hear ${a.name} say hello in Urdu`
                }
              >
                {sounding === a.id ? <PauseGlyph /> : <PlayGlyph />}
              </button>
              <span className="ag-hear">
                Hear <b>{a.name}</b>
              </span>
              <Link className="ag-open" href={`/voice-agents/${a.id}`}>
                Full call &rarr;
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
      <audio ref={audioRef} preload="none" />
    </>
  );
}
