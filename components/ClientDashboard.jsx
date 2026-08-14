'use client';

import { useMemo, useState } from 'react';
import { OUTCOME_FALLBACK } from '@/lib/clients';
import SignOutButton from './SignOutButton';

const clockFromSeconds = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

/** Tiny inline trend line for a KPI tile. No library, no axes — shape only. */
function Spark({ points = [], tone = 'up' }) {
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${28 - ((p - min) / span) * 24}`)
    .join(' ');
  return (
    <svg className={`cd-spark ${tone}`} viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={d} />
    </svg>
  );
}

/**
 * The column chart. One series, so no legend — the peak is the only value worth
 * calling out and it is direct-labelled. Gridlines are recessive on purpose.
 */
function Columns({ points, axis }) {
  const peak = Math.max(...points, 1);
  const peakAt = points.indexOf(peak);
  return (
    <div className="cd-chart">
      <div className="cd-plot">
        {[100, 75, 50, 25, 0].map((g) => (
          <span className="cd-grid" style={{ bottom: `${g}%` }} key={g}>
            <em>{Math.round((peak * g) / 100)}</em>
          </span>
        ))}
        <div className="cd-cols">
          {points.map((v, i) => (
            <span className="cd-col" key={i} title={`${v} calls`}>
              {i === peakAt && <b className="cd-col-tag">{v}</b>}
              <i className={i === peakAt ? 'peak' : undefined} style={{ height: `${Math.max(2, (v / peak) * 100)}%` }} />
            </span>
          ))}
        </div>
      </div>
      <div className="cd-axis">{axis.map((a) => <span key={a}>{a}</span>)}</div>
    </div>
  );
}

/** Outcome split as a single stacked bar plus a labelled legend beneath it. */
function Outcomes({ items }) {
  return (
    <>
      <div className="cd-stack">
        {items.map((o) => (
          <i
            key={o.label}
            style={{ width: `${o.pct}%`, background: o.color || OUTCOME_FALLBACK }}
            title={`${o.label} — ${o.pct}%`}
          />
        ))}
      </div>
      <ul className="cd-legend">
        {items.map((o) => (
          <li key={o.label}>
            <i style={{ background: o.color || OUTCOME_FALLBACK }} />
            <span className="nm">{o.label}</span>
            <span className="vl">{o.pct}%</span>
            <span className="ct">{typeof o.count === 'number' ? o.count.toLocaleString('en-US') : ''}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function ClientDashboard({ client, embedded = false }) {
  const m = client.metrics || {};
  const ranges = m.ranges || {};
  const keys = Object.keys(ranges);
  const [rangeKey, setRangeKey] = useState(m.defaultRange && ranges[m.defaultRange] ? m.defaultRange : keys[0]);
  const range = ranges[rangeKey] || {};
  const connected = Boolean(client.assistantId);

  const health = m.health || {};
  const nav = useMemo(() => ([
    { id: 'overview', label: 'Overview' },
    { id: 'volume', label: 'Call volume' },
    { id: 'outcomes', label: 'Outcomes' },
    { id: 'callers', label: 'What people call about' },
    { id: 'calls', label: 'Recent calls' },
  ]), []);

  const main = (
    <div className="cd-main">
      <header className="cd-head">
        <div>
          <p className="cd-crumb">{client.plan || 'Voice agent'} · {range.label || 'Overview'}</p>
          <h1>{client.name}</h1>
          <p className="cd-sub">
            {client.agentName || 'Voice agent'}
            {client.agentRole ? ` — ${client.agentRole}` : ''}
          </p>
        </div>
        <div className="cd-head-right">
          <span className={`cd-pill${connected ? ' live' : ''}`}>
            <i />{connected ? 'Agent live' : 'Not connected'}
          </span>
          {keys.length > 1 && (
            <div className="cd-ranges" role="tablist" aria-label="Date range">
              {keys.map((k) => (
                <button
                  key={k} type="button" role="tab" aria-selected={k === rangeKey}
                  className={k === rangeKey ? 'on' : undefined}
                  onClick={() => setRangeKey(k)}
                >
                  {ranges[k].label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {!connected && (
        <p className="cd-notice">
          No voice agent is attached to this account yet. Everything below is
          illustrative until one is connected and starts taking calls.
        </p>
      )}

      <section id="overview" className="cd-kpis">
        {(range.kpis || []).map((k) => (
          <div className="cd-kpi" key={k.label}>
            <span className="l">{k.label}</span>
            <b>{k.value}</b>
            <span className="row">
              {k.delta && <span className={`d ${k.dir || 'flat'}`}>{k.delta}</span>}
              <Spark points={k.spark} tone={k.dir} />
            </span>
          </div>
        ))}
      </section>

      <div className="cd-row">
        <section id="volume" className="cd-card wide">
          <div className="cd-card-head">
            <div>
              <h2>Call volume</h2>
              <p>{range.label}</p>
            </div>
            {m.peak && rangeKey === 'today' && (
              <span className="cd-tagline">Peak {m.peak.window}</span>
            )}
          </div>
          {range.points?.length > 0 && <Columns points={range.points} axis={range.axis || []} />}
          {m.peak?.note && rangeKey === 'today' && (
            <p className="cd-foot-note">{m.peak.note}</p>
          )}
        </section>

        <section className="cd-card">
          <div className="cd-card-head"><div><h2>Agent health</h2><p>Live status</p></div></div>
          <dl className="cd-health">
            <dt>Status</dt>
            <dd><span className={`cd-chip ${connected ? 'good' : 'bad'}`}>{connected ? health.status || 'Healthy' : 'Not connected'}</span></dd>
            <dt>Uptime</dt><dd>{health.uptime || '—'}</dd>
            <dt>Answer time</dt><dd>{health.avgAnswerMs ? `${health.avgAnswerMs} ms` : '—'}</dd>
            <dt>Escalation rate</dt><dd>{health.escalationRate || '—'}</dd>
            <dt>Failed calls</dt><dd>{health.failedCalls ?? '—'}</dd>
            <dt>Voice</dt><dd className="mono">{client.voice || '—'}</dd>
            <dt>Languages</dt><dd>{client.language || '—'}</dd>
          </dl>
        </section>
      </div>

      <div className="cd-row">
        <section id="outcomes" className="cd-card">
          <div className="cd-card-head"><div><h2>Outcomes</h2><p>Share of completed calls</p></div></div>
          {range.outcomes?.length > 0 && <Outcomes items={range.outcomes} />}
        </section>

        <section className="cd-card">
          <div className="cd-card-head"><div><h2>Language</h2><p>How callers spoke</p></div></div>
          {m.languages?.length > 0 && <Outcomes items={m.languages} />}
        </section>
      </div>

      {m.intents?.length > 0 && (
        <section id="callers" className="cd-card">
          <div className="cd-card-head"><div><h2>What people call about</h2><p>Top intents, {range.label?.toLowerCase()}</p></div></div>
          <ul className="cd-intents">
            {m.intents.map((it) => (
              <li key={it.label}>
                <span className="nm">{it.label}</span>
                <span className="bar"><i style={{ width: `${it.pct}%` }} /></span>
                <span className="ct">{it.count.toLocaleString('en-US')}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {m.recent?.length > 0 && (
        <section id="calls" className="cd-card">
          <div className="cd-card-head"><div><h2>Recent calls</h2><p>Newest first</p></div></div>
          <div className="cd-tbl-wrap">
            <table className="cd-tbl">
              <thead>
                <tr><th>Time</th><th>Number</th><th>Length</th><th>About</th><th>Outcome</th><th>Language</th></tr>
              </thead>
              <tbody>
                {m.recent.map((r, i) => (
                  <tr key={`${r.t}-${i}`}>
                    <td className="m">{r.t}</td>
                    <td className="m">{r.num}</td>
                    <td className="m">{r.dur}</td>
                    <td>{r.intent || '—'}</td>
                    <td><span className={`cd-chip ${r.tone || 'info'}`}>{r.outcome}</span></td>
                    <td className="u">{r.lang}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <p className="cd-disclaimer">
        Sample data. Live call reporting begins once the agent is connected to your
        phone line. Questions about these numbers go to Montegritty.
      </p>
    </div>
  );

  if (embedded) return <div className="cd embedded">{main}</div>;

  return (
    <div className="cd">
      <aside className="cd-side">
        <div className="cd-side-top">
          <span className="cd-logo">Montegritty</span>
          <p className="cd-side-client">{client.name}</p>
          <p className="cd-side-plan">{client.plan || 'Voice agent'}{client.since ? ` · since ${client.since}` : ''}</p>
        </div>

        <nav className="cd-nav">
          {nav.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </nav>

        <div className="cd-side-foot">
          <p className="cd-side-label">Updated</p>
          <p className="cd-side-val">{m.updated || '—'}</p>
          <SignOutButton />
        </div>
      </aside>
      {main}
    </div>
  );
}
