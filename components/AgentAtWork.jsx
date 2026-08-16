'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { BEATS, CALL_META, CALL_SUMMARY, SECTION } from '@/lib/worksequence';
import Reveal from './Reveal';

/**
 * The claim on this site is that the agent does the work rather than talking
 * about it. That is hard to believe in prose and obvious in motion, so this
 * band plays a call on the left and the work it causes on the right, at the
 * same moment.
 *
 * Everything here hangs off one integer, `step` — the index of the beat being
 * spoken. The transcript, which circle is lit, which system card is open and
 * what has already completed are all derived from it, so the two columns can
 * never drift out of sync. There is no second timeline to keep in step.
 *
 * Three things it deliberately does NOT do:
 *   - Run off-screen. An IntersectionObserver pauses it, because a looping
 *     animation nobody is looking at is just battery.
 *   - Animate under `prefers-reduced-motion`. It jumps to the finished state,
 *     which shows the same four actions without moving.
 *   - Auto-play with no way out. Indefinite motion needs a pause control
 *     (WCAG 2.2.2), and the whole band is keyboard reachable through it.
 *
 * The transcript is a placeholder — see lib/worksequence.js.
 */

const ACTION_RUN_MS = 1150;
const SUMMARY_MS = 4200;

function Check() {
  return (
    <svg className="aw-check" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10.5 L8.5 15 L16 6" />
    </svg>
  );
}

/** Five bars that only move while their speaker holds the floor. */
function Waveform({ live }) {
  return (
    <span className={`aw-wave${live ? ' on' : ''}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ animationDelay: `${i * 0.11}s` }} />)}
    </span>
  );
}

function Speaker({ person, tone, live }) {
  return (
    <div className={`aw-speaker ${tone}${live ? ' live' : ''}`}>
      <div className="aw-orb">
        <span className="aw-ring" aria-hidden="true" />
        <span className="aw-ring two" aria-hidden="true" />
        <span className="aw-orb-face">{person.initials}</span>
      </div>
      <div className="aw-speaker-id">
        <b>{person.name}</b>
        <span>{person.role}</span>
        <Waveform live={live} />
      </div>
    </div>
  );
}

/** The open system card: what the agent is reading or writing right now. */
function ActionCard({ action, phase }) {
  const running = phase === 'running';
  return (
    <div className={`aw-card ${action.mode}${running ? ' running' : ' done'}`} key={action.id}>
      <div className="aw-card-top">
        <span className={`aw-mode ${action.mode}`}>{action.mode}</span>
        <span className="aw-system">{action.system}</span>
        <span className="aw-state">
          {running ? <span className="aw-dots" aria-hidden="true"><i /><i /><i /></span> : <Check />}
          {running ? (action.mode === 'read' ? 'reading' : 'writing') : 'done'}
        </span>
      </div>

      <h4>{action.label}</h4>

      {action.schedule ? (
        <div className="aw-sched">
          <div className="aw-sched-head">
            <span />
            {action.schedule.days.map((d) => <span key={d}>{d}</span>)}
          </div>
          {action.schedule.times.map((time, r) => (
            <div className="aw-sched-row" key={time}>
              <span className="aw-sched-time">{time}</span>
              {action.schedule.slots[r].map((state, c) => (
                <span
                  className={`aw-slot ${state}`}
                  key={`${time}-${c}`}
                  style={{ animationDelay: `${(r * 3 + c) * 0.045}s` }}
                >
                  {state === 'target' ? 'free' : state === 'held' ? 'held' : ''}
                </span>
              ))}
            </div>
          ))}
          <span className="aw-scan" aria-hidden="true" />
        </div>
      ) : (
        <dl className="aw-fields">
          {action.fields.map(([k, val], i) => (
            <div className="aw-field" key={k} style={{ animationDelay: `${i * 0.12}s` }}>
              <dt>{k}</dt>
              <dd>{val}</dd>
            </div>
          ))}
        </dl>
      )}

      <p className="aw-card-note">{action.note}</p>
    </div>
  );
}

export default function AgentAtWork() {
  const [head, headEm] = SECTION.heading;
  const rootRef = useRef(null);

  const [step, setStep] = useState(0);
  const [runPhase, setRunPhase] = useState('done');
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Reduced motion: hold the finished state and never start a timer.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = inView && !paused && !reduced;

  // One timer, one integer. `step === BEATS.length` is the summary card.
  useEffect(() => {
    if (!running) return;
    const isSummary = step >= BEATS.length;
    const wait = isSummary ? SUMMARY_MS : BEATS[step].hold * 1000;
    const t = setTimeout(() => setStep((s) => (s + 1 > BEATS.length ? 0 : s + 1)), wait);
    return () => clearTimeout(t);
  }, [step, running]);

  // A beat carrying an action shows it working, then completes it.
  useEffect(() => {
    if (!running || step >= BEATS.length || !BEATS[step].action) return;
    setRunPhase('running');
    const t = setTimeout(() => setRunPhase('done'), ACTION_RUN_MS);
    return () => clearTimeout(t);
  }, [step, running]);

  const shown = reduced ? BEATS.length - 1 : step;

  // Scroll the transcript by measuring where the active line actually sits.
  const linesRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const list = linesRef.current;
    if (!list) return;
    // Anchor the spoken line to the BOTTOM of the window, so the panel reads
    // like a call log — what has been said stacks above it, and what has not
    // been said yet stays off-screen instead of sitting there as a spoiler.
    const measure = () => {
      const li = list.children[Math.min(shown, BEATS.length - 1)];
      if (!li) return setOffset(0);
      const viewport = list.parentElement.clientHeight;
      setOffset(Math.max(0, li.offsetTop + li.offsetHeight - viewport));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [shown]);

  const atSummary = !reduced && step >= BEATS.length;

  const { activeIdx, activeAction, doneActions } = useMemo(() => {
    const fired = [];
    for (let i = 0; i <= Math.min(shown, BEATS.length - 1); i += 1) {
      if (BEATS[i].action) fired.push(i);
    }
    const last = fired[fired.length - 1];
    return {
      activeIdx: last,
      activeAction: last == null ? null : BEATS[last].action,
      // Once the summary takes the card slot there is no "open" action left,
      // so the last one has to join the completed list rather than vanish —
      // otherwise the panel shows three rows while claiming four actions.
      doneActions: (atSummary ? fired : fired.slice(0, -1)).map((i) => BEATS[i].action),
    };
  }, [shown, atSummary]);

  // The call has ended, but leaving the whole transcript greyed reads as broken
  // rather than finished — hold the last line lit.
  const highlight = Math.min(shown, BEATS.length - 1);
  const speaking = atSummary ? null : BEATS[highlight].who;
  const phase = reduced || activeIdx !== shown ? 'done' : runPhase;

  return (
    <section id="at-work" ref={rootRef}>
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
              {SECTION.eyebrow}
            </span>
            <h2>{head}<em>{headEm}</em></h2>
          </div>
          <p>{SECTION.lede}</p>
        </Reveal>

        <Reveal className="aw">
          {/* ---------------- left: the call ---------------- */}
          <div className="aw-call">
            <div className="aw-call-top">
              <div className="aw-speakers">
                <Speaker person={CALL_META.agent} tone="agent" live={speaking === 'agent'} />
                <span className="aw-link" aria-hidden="true" />
                <Speaker person={CALL_META.caller} tone="caller" live={speaking === 'caller'} />
              </div>
              <span className="aw-context">{CALL_META.context}</span>
            </div>

            {/* Every line stays in the DOM so the transcript is readable
                without JS and to assistive tech; `step` only moves the window.
                The offset is measured rather than assumed — lines carrying a
                trigger tag are taller, so any per-line percentage drifts. */}
            <div className="aw-script">
              <ul
                className="aw-lines"
                ref={linesRef}
                style={{ transform: `translateY(${-offset}px)` }}
              >
                {BEATS.map((b, i) => (
                  <li
                    key={b.en}
                    className={`aw-line ${b.who}${i === highlight ? ' on' : ''}${i < highlight ? ' past' : ''}`}
                  >
                    <span className="aw-who">{b.who === 'agent' ? CALL_META.agent.name : CALL_META.caller.name}</span>
                    <span className="aw-ur urdu" lang="ur" dir="rtl">{b.ur}</span>
                    <span className="aw-en">{b.en}</span>
                    {b.action && (
                      <span className="aw-trigger">
                        <i aria-hidden="true" />
                        {b.action.mode === 'read' ? 'reads' : 'writes'} · {b.action.system}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="aw-toggle"
              onClick={() => setPaused((p) => !p)}
              disabled={reduced}
            >
              {reduced ? 'Animation off' : paused ? 'Play sequence' : 'Pause sequence'}
            </button>
          </div>

          {/* ---------------- the wire between them ---------------- */}
          <div className="aw-bus" aria-hidden="true">
            <span className="aw-bus-line" />
            {activeAction && !reduced && <span className="aw-bus-dot" key={activeIdx} />}
          </div>

          {/* ---------------- right: the work ---------------- */}
          <div className="aw-work">
            <div className="aw-work-top">
              <span className="aw-work-label">System activity</span>
              <span className={`aw-live${speaking ? ' on' : ''}`}>
                <i aria-hidden="true" />{atSummary ? 'call ended' : 'live'}
              </span>
            </div>

            <div className="aw-stack">
              {doneActions.map((a) => (
                <div className="aw-done-row" key={a.id}>
                  <Check />
                  <b>{a.label}</b>
                  <span>{a.system}</span>
                </div>
              ))}

              {atSummary ? (
                <div className="aw-summary">
                  <h4>{CALL_SUMMARY.headline}</h4>
                  <div className="aw-summary-stats">
                    {CALL_SUMMARY.stats.map((s) => (
                      <div key={s.label}>
                        <b>{s.value}</b>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <p>{CALL_SUMMARY.note}</p>
                </div>
              ) : activeAction ? (
                <ActionCard action={activeAction} phase={phase} />
              ) : (
                <div className="aw-idle">
                  <span className="aw-idle-pulse" aria-hidden="true" />
                  Listening. Nothing written yet.
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal as="p" className="aw-note">{SECTION.disclosure}</Reveal>
      </div>
    </section>
  );
}
