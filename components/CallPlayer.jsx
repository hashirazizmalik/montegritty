'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PlayGlyph, PauseGlyph } from './PlayIcon';

function clock(s) {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r < 10 ? '0' : ''}${r}`;
}

/**
 * Plays a generated call and keeps the bilingual transcript in step with it.
 *
 * The sync needs no alignment model: each turn was synthesised as its own clip
 * before being stitched together, so `turn.at` is the exact offset that turn
 * starts at. That also makes every line seekable — click a line, hear it.
 */
export default function CallPlayer({ agent }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [now, setNow] = useState(0);
  const [total, setTotal] = useState(agent.duration || 0);

  const active = playing
    ? agent.turns.reduce((best, t, i) => (now + 0.05 >= t.at ? i : best), -1)
    : -1;

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setNow(el.currentTime);
    const onMeta = () => setTotal(el.duration || agent.duration || 0);
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);

    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onStop);
    el.addEventListener('ended', onStop);
    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onStop);
      el.removeEventListener('ended', onStop);
    };
  }, [agent.duration]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      // Only one call plays at a time, even across separate players on a page.
      document.querySelectorAll('audio').forEach((o) => { if (o !== el) o.pause(); });
      el.play();
    } else {
      el.pause();
    }
  }, []);

  const seek = useCallback((at) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = at;
    document.querySelectorAll('audio').forEach((o) => { if (o !== el) o.pause(); });
    el.play();
  }, []);

  const pct = total ? Math.min(100, (now / total) * 100) : 0;

  return (
    <>
      <div className="call">
        <div className="call-bar">
          <button
            type="button"
            className="pbtn"
            onClick={toggle}
            aria-label={playing ? `Pause ${agent.name}'s call` : `Play ${agent.name}'s call`}
          >
            {playing ? <PauseGlyph /> : <PlayGlyph />}
          </button>
          <span className="call-meta">
            <strong>{agent.name} takes a call</strong>
            <span>
              {agent.turns.length} turns · Urdu · voice&nbsp;&ldquo;{agent.voice}&rdquo;
            </span>
          </span>
          <span className="call-clock">{clock(now)} / {clock(total)}</span>
        </div>
        <div className="call-rail"><i style={{ width: `${pct}%` }} /></div>
        <ul className="turns">
          {agent.turns.map((t, i) => (
            <li key={`${t.at}-${i}`}>
              <button
                type="button"
                className={`turn ${t.who}${i === active ? ' on' : ''}`}
                onClick={() => seek(t.at)}
              >
                <span className="turn-who">
                  <b>{t.who === 'agent' ? agent.name : 'Caller'}</b>
                  <span>{clock(t.at)}</span>
                </span>
                <span>
                  {/* .urdu sets direction in CSS only; without lang/dir the
                      script is announced by an English voice and no machine can
                      tell this is Urdu. */}
                  <span className="turn-ur urdu" lang="ur" dir="rtl">{t.ur}</span>
                  <span className="turn-en">{t.en}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <audio ref={audioRef} preload="metadata" src={agent.call} />
      </div>
      <p className="call-legend">
        <span><i style={{ background: 'var(--clay)' }} />Agent — {agent.voice}</span>
        <span><i style={{ background: 'var(--muted)' }} />Caller — {agent.peerVoice}</span>
        <span>Click any line to jump to it</span>
      </p>
    </>
  );
}
