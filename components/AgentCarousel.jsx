'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PlayGlyph, PauseGlyph } from './PlayIcon';

/**
 * The home-page agent carousel.
 *
 * Centred rather than split left/right, with a deliberately small portrait —
 * the voice is the product here, not the photograph.
 *
 * The loop is real: positions are computed modulo the list, so the previous and
 * next slots always hold an agent and there is no first or last. Stepping past
 * either end wraps without a jump, and the peeking neighbours make that legible
 * before anyone clicks.
 */
export default function AgentCarousel({ agents }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [dir, setDir] = useState(1);
  const audioRef = useRef(null);

  const n = agents.length;
  const at = useCallback((offset) => agents[(((i + offset) % n) + n) % n], [agents, i, n]);
  const agent = at(0);

  const stop = useCallback(() => {
    const el = audioRef.current;
    if (el && !el.paused) { el.pause(); el.currentTime = 0; }
    setPlaying(false);
  }, []);

  const go = useCallback((step) => {
    stop();
    setDir(step > 0 ? 1 : -1);
    setI((c) => (((c + step) % n) + n) % n);
  }, [n, stop]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const off = () => setPlaying(false);
    el.addEventListener('pause', off);
    el.addEventListener('ended', off);
    return () => { el.removeEventListener('pause', off); el.removeEventListener('ended', off); };
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      document.querySelectorAll('audio').forEach((o) => { if (o !== el) o.pause(); });
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  };

  return (
    <div
      className="car"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      }}
    >
      <div className="car-stage">
        <button type="button" className="car-arrow prev" onClick={() => go(-1)} aria-label="Previous agent">‹</button>

        {/* Neighbours are decorative peeks — clicking one steps that way. */}
        <button
          type="button"
          className="car-peek left"
          onClick={() => go(-1)}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img key={at(-1).id} src={at(-1).portrait} alt="" width={96} height={190} loading="lazy" />
        </button>

        <div className="car-card" key={agent.id} data-dir={dir}>
          <img
            className="car-photo"
            src={agent.portrait}
            alt={`${agent.name}, ${agent.role}`}
            width={240}
            height={300}
          />
          <div className="car-body">
            <p className="car-vert">{agent.vertical}</p>
            <h3 className="car-name">{agent.name}</h3>
            <p className="car-role">{agent.role}</p>
            <p className="car-tag">{agent.tagline}</p>

            <div className="car-actions">
              <button
                type="button"
                className={`car-play${playing ? ' on' : ''}`}
                onClick={toggle}
                aria-label={playing ? `Stop ${agent.name}` : `Hear ${agent.name}'s voice`}
              >
                {playing ? <PauseGlyph /> : <PlayGlyph />}
                {playing ? `${agent.name} speaking` : 'Hear the voice'}
              </button>

              {/* /voice-agents/[slug] was renamed to /agents/[slug]; this link
                  was left behind and 404'd on both pages the carousel is on. */}
              <Link className="car-more" href={`/agents/${agent.id}`}>
                Hear the full call &rarr;
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="car-peek right"
          onClick={() => go(1)}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img key={at(1).id} src={at(1).portrait} alt="" width={96} height={190} loading="lazy" />
        </button>

        <button type="button" className="car-arrow next" onClick={() => go(1)} aria-label="Next agent">›</button>
      </div>

      <div className="car-dots" role="tablist" aria-label="Choose an agent">
        {agents.map((a, k) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-label={a.name}
            className={`car-dot${k === i ? ' on' : ''}`}
            onClick={() => { stop(); setDir(k > i ? 1 : -1); setI(k); }}
          />
        ))}
      </div>

      <audio ref={audioRef} preload="none" src={agent.greetingAudio} />
    </div>
  );
}
