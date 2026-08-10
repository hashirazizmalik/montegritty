'use client';

import { useEffect, useRef, useState } from 'react';
import {
  DASH_FEED_HEADERS,
  DASH_FEED_SEED,
  FEED_POOL,
  OUTCOME_STYLES,
} from '@/lib/dashboard';

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function nextRow(prev) {
  // Walk the clock backwards from the newest row so the feed stays plausible
  // without depending on the visitor's own system time.
  const [h, m, s] = prev.t.split(':').map(Number);
  const bumped = h * 3600 + m * 60 + s + 4 + Math.floor(Math.random() * 22);
  const hh = String(Math.floor(bumped / 3600) % 24).padStart(2, '0');
  const mm = String(Math.floor((bumped % 3600) / 60)).padStart(2, '0');
  const ss = String(bumped % 60).padStart(2, '0');

  const secs = 25 + Math.floor(Math.random() * 260);

  return {
    id: `${hh}${mm}${ss}-${Math.random().toString(36).slice(2, 7)}`,
    t: `${hh}:${mm}:${ss}`,
    agent: pick(FEED_POOL.agents),
    num: `${pick(FEED_POOL.prefixes)}-${String(Math.floor(Math.random() * 90) + 10)}••••`,
    dur: `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`,
    outcome: pick(FEED_POOL.outcomes),
    lang: pick(FEED_POOL.langs),
  };
}

/**
 * The live half of the dashboard — a call feed that keeps arriving, and a
 * counter that climbs with it. Seeded rows render on the server so first paint
 * matches; everything after that is appended client-side only.
 */
export default function DashboardFeed() {
  const [rows, setRows] = useState(() =>
    DASH_FEED_SEED.map((r, i) => ({ ...r, id: `seed-${i}` }))
  );
  const [handled, setHandled] = useState(4182);
  const timer = useRef(null);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const tick = () => {
      setRows((prev) => [nextRow(prev[0]), ...prev].slice(0, 9));
      setHandled((n) => n + 1);
      timer.current = window.setTimeout(tick, 3200 + Math.random() * 2600);
    };
    timer.current = window.setTimeout(tick, 2600);
    return () => window.clearTimeout(timer.current);
  }, []);

  return (
    <div className="dash-card dash-feed">
      <h3>لائیو کال فیڈ</h3>
      <span className="sub">
        اب تک موصول ہونے والی کالز: <span className="mono">{handled.toLocaleString('en-US')}</span>
      </span>

      <div className="dash-tbl-wrap">
        <table className="dash-tbl">
          <thead>
            <tr>
              {DASH_FEED_HEADERS.map((h) => <th key={h} scope="col">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const o = OUTCOME_STYLES[r.outcome];
              return (
                <tr key={r.id} className={i === 0 && !r.id.startsWith('seed') ? 'dash-row-new' : undefined}>
                  <td className="m">{r.t}</td>
                  <td className="u">{r.agent}</td>
                  <td className="m">{r.num}</td>
                  <td className="m">{r.dur}</td>
                  <td>
                    <span className="pill" style={{ borderColor: o.color, color: o.color }}>
                      <i style={{ background: o.color }} />
                      {o.label}
                    </span>
                  </td>
                  <td className="u">{r.lang}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
