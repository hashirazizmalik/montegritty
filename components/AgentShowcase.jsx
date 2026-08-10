'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PlayGlyph, PauseGlyph } from './PlayIcon';

function clock(s) {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r < 10 ? '0' : ''}${r}`;
}

// Brushing the cursor across the portrait on the way somewhere else should not
// fire audio. A short dwell means the hover was intentional.
const HOVER_INTENT_MS = 260;

/**
 * The demo slider: portrait on one side, who the agent is and their call on the
 * other, thumbnails underneath.
 *
 * Two separate audio elements — a greeting for the hover preview and the full
 * call for the player — because they are different intents and must never
 * overlap. Whichever starts pauses the other.
 */
export default function AgentShowcase({ agents }) {
  const [i, setI] = useState(0);
  const [previewing, setPreviewing] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [now, setNow] = useState(0);
  const [total, setTotal] = useState(0);
  const [broken, setBroken] = useState({});

  const greetRef = useRef(null);
  const callRef = useRef(null);
  const intent = useRef(null);

  const agent = agents[i];

  // Track the full call's position for the progress rail and clock.
  useEffect(() => {
    const el = callRef.current;
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

  const stopAll = useCallback(() => {
    clearTimeout(intent.current);
    [greetRef.current, callRef.current].forEach((el) => {
      if (el && !el.paused) { el.pause(); el.currentTime = 0; }
    });
    setPreviewing(false);
  }, []);

  // Changing agent resets both players and the rail.
  const go = useCallback((next) => {
    stopAll();
    setNow(0);
    setTotal(0);
    setI((n) => (next + agents.length) % agents.length);
  }, [agents.length, stopAll]);

  useEffect(() => () => clearTimeout(intent.current), []);

  // Touch devices have no hover, so the cue must not promise one.
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Chrome refuses audible playback until the visitor has interacted with the
  // document, and a hover does not count. Once any real gesture lands, hover
  // previews are permitted again — so clear the fallback wording immediately
  // rather than leaving "Tap to hear" up until the next successful play.
  useEffect(() => {
    if (!blocked) return;
    const unlock = () => setBlocked(false);
    const opts = { once: true, passive: true };
    window.addEventListener('pointerdown', unlock, opts);
    window.addEventListener('keydown', unlock, opts);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [blocked]);

  const startPreview = () => {
    clearTimeout(intent.current);
    intent.current = setTimeout(() => {
      const el = greetRef.current;
      if (!el) return;
      if (callRef.current && !callRef.current.paused) return; // full call wins
      el.currentTime = 0;
      el.play()
        .then(() => { setPreviewing(true); setBlocked(false); })
        // Browsers only allow audio after the visitor has interacted with the
        // page, and a hover is not an interaction. Say so rather than failing
        // silently — one click anywhere makes every later hover work.
        .catch(() => setBlocked(true));
    }, HOVER_INTENT_MS);
  };

  const endPreview = () => {
    clearTimeout(intent.current);
    const el = greetRef.current;
    if (el && !el.paused) { el.pause(); el.currentTime = 0; }
    setPreviewing(false);
  };

  const toggleCall = () => {
    const el = callRef.current;
    if (!el) return;
    if (el.paused) {
      endPreview();
      document.querySelectorAll('audio').forEach((o) => { if (o !== el) o.pause(); });
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const onKeyNav = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  };

  const pct = total ? Math.min(100, (now / total) * 100) : 0;

  return (
    <div className="show" onKeyDown={onKeyNav}>
      <div className="show-main">
        {/* Portrait — hovering it previews the agent's opening line. */}
        <div
          className={`show-photo${previewing ? ' sounding' : ''}`}
          onMouseEnter={startPreview}
          onMouseLeave={endPreview}
        >
          {broken[agent.id] ? (
            <div className="show-mono" aria-hidden="true"><span>{agent.name.charAt(0)}</span></div>
          ) : (
            <img
              src={agent.portrait}
              alt={`${agent.name}, ${agent.role}`}
              width={900}
              height={1125}
              onError={() => setBroken((b) => ({ ...b, [agent.id]: true }))}
            />
          )}

          <button
            type="button"
            className="show-hit"
            onClick={() => (previewing ? endPreview() : startPreview())}
            aria-label={`Hear ${agent.name} say hello in Urdu`}
          />

          <span className={`show-cue${previewing ? ' on' : ''}`}>
            <span className="show-eq" aria-hidden="true"><i /><i /><i /><i /></span>
            {previewing
              ? `${agent.name} is speaking`
              : blocked || !canHover
                ? 'Tap to hear the voice'
                : 'Hover to hear the voice'}
          </span>
        </div>

        {/* Who they are, what they do, and the full call. */}
        <div className="show-body">
          <p className="show-meta">
            <span className="show-no">{String(i + 1).padStart(2, '0')}</span>
            <span className="show-vert">{agent.vertical}</span>
          </p>
          <h3 className="show-name">{agent.name}</h3>
          <p className="show-role">{agent.role}</p>
          <p className="show-tag">{agent.tagline}</p>
          <p className="show-desc">{agent.solution}</p>

          <div className="show-player">
            <button
              type="button"
              className="pbtn"
              onClick={toggleCall}
              aria-label={playing ? `Pause ${agent.name}'s call` : `Play ${agent.name}'s full call`}
            >
              {playing ? <PauseGlyph /> : <PlayGlyph />}
            </button>
            <span className="show-ptext">
              <strong>Listen to the full call</strong>
              <span>{agent.turns.length} turns · Urdu · voice &ldquo;{agent.voice}&rdquo;</span>
            </span>
            <span className="show-clock">
              {clock(now)} / {clock(total || agent.duration)}
            </span>
          </div>
          <div className="show-rail"><i style={{ width: `${pct}%` }} /></div>

          <div className="show-actions">
            <Link className="ag-open" href={`/voice-agents/${agent.id}`}>
              Full brief &amp; transcript &rarr;
            </Link>
            <span className="show-nav">
              <button type="button" onClick={() => go(i - 1)} aria-label="Previous agent">‹</button>
              <button type="button" onClick={() => go(i + 1)} aria-label="Next agent">›</button>
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnail strip doubles as the position indicator. */}
      <div className="show-strip" role="tablist" aria-label="Choose an agent">
        {agents.map((a, n) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={`${a.name} — ${a.role}`}
            className={`show-thumb${n === i ? ' on' : ''}`}
            onClick={() => go(n)}
          >
            {broken[a.id]
              ? <span className="show-mono sm">{a.name.charAt(0)}</span>
              : <img src={a.thumb} alt="" width={240} height={300} loading="lazy"
                     onError={() => setBroken((b) => ({ ...b, [a.id]: true }))} />}
            <span className="show-thumb-name">{a.name}</span>
          </button>
        ))}
      </div>

      <audio ref={greetRef} preload="none" src={agent.greetingAudio} />
      <audio ref={callRef} preload="metadata" src={agent.call} />
    </div>
  );
}
