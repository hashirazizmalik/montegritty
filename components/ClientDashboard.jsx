import { OUTCOME_FALLBACK } from '@/lib/clients';

/**
 * A client's own dashboard. Rendered both on their page and inside the embed,
 * so the iframe and the URL can never drift apart.
 *
 * `embedded` strips the outer framing for the iframe version.
 */
export default function ClientDashboard({ client, embedded = false }) {
  const m = client.metrics || {};
  const hourly = m.hourly || [];
  const peak = hourly.length ? Math.max(...hourly) : 1;
  const connected = Boolean(client.assistantId);

  return (
    <div className={`cd${embedded ? ' embedded' : ''}`}>
      <header className="cd-top">
        <div>
          <p className="cd-eyebrow">{client.plan || 'Voice agent'} · Montegritty</p>
          <h1>{client.name}</h1>
          <p className="cd-sub">
            {client.agentName || 'Voice agent'}
            {client.agentRole ? ` — ${client.agentRole}` : ''}
          </p>
        </div>
        <div className="cd-status">
          <span className={`cd-pill${connected ? ' live' : ''}`}>
            <i />{connected ? 'Agent live' : 'Agent not connected'}
          </span>
          {m.updated && <span className="cd-updated">Updated {m.updated}</span>}
        </div>
      </header>

      {!connected && (
        <p className="cd-notice">
          No voice agent is attached to this account yet. The figures below are
          illustrative until one is connected and starts taking calls.
        </p>
      )}

      {m.kpis?.length > 0 && (
        <div className="cd-kpis">
          {m.kpis.map((k) => (
            <div className="cd-kpi" key={k.label}>
              <span className="l">{k.label}</span>
              <b>{k.value}</b>
              {k.delta && <span className={`d ${k.dir || 'flat'}`}>{k.delta}</span>}
            </div>
          ))}
        </div>
      )}

      <div className="cd-grid">
        {hourly.length > 0 && (
          <section className="cd-card">
            <h2>Calls by hour</h2>
            <p className="cd-card-sub">Midnight to 11pm</p>
            <div className="cd-bars">
              {hourly.map((v, h) => (
                <span className="cd-bar" key={h} title={`${String(h).padStart(2, '0')}:00 — ${v}`}>
                  <i className={v === peak ? 'peak' : undefined} style={{ height: `${Math.max(3, (v / peak) * 100)}%` }} />
                </span>
              ))}
            </div>
            <div className="cd-axis"><span>00</span><span>06</span><span>12</span><span>18</span><span>23</span></div>
          </section>
        )}

        {m.outcomes?.length > 0 && (
          <section className="cd-card">
            <h2>What the calls did</h2>
            <p className="cd-card-sub">Share of completed calls</p>
            <div className="cd-out">
              {m.outcomes.map((o) => (
                <div className="cd-out-row" key={o.label}>
                  <div className="top">
                    <span className="nm">
                      <i style={{ background: o.color || OUTCOME_FALLBACK }} />{o.label}
                    </span>
                    <span className="pc" style={{ color: o.color || OUTCOME_FALLBACK }}>
                      {o.pct}%{typeof o.count === 'number' ? ` · ${o.count.toLocaleString('en-US')}` : ''}
                    </span>
                  </div>
                  <div className="track">
                    <i style={{ width: `${o.pct}%`, background: o.color || OUTCOME_FALLBACK }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {m.recent?.length > 0 && (
        <section className="cd-card cd-feed">
          <h2>Recent calls</h2>
          <div className="cd-tbl-wrap">
            <table className="cd-tbl">
              <thead>
                <tr><th>Time</th><th>Number</th><th>Length</th><th>Outcome</th><th>Language</th></tr>
              </thead>
              <tbody>
                {m.recent.map((r, i) => (
                  <tr key={`${r.t}-${i}`}>
                    <td className="m">{r.t}</td>
                    <td className="m">{r.num}</td>
                    <td className="m">{r.dur}</td>
                    <td>{r.outcome}</td>
                    <td className="u">{r.lang}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <p className="cd-foot">
        Sample data. Live call reporting begins once the agent is connected to your
        phone line. Questions about these numbers go to Montegritty.
      </p>
    </div>
  );
}
