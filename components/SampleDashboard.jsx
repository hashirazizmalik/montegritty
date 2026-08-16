import Link from 'next/link';
import Reveal from './Reveal';
import { AGENTS, DASH, HOURLY, HOURLY_PEAK_NOTE, IMPACT, KPIS, OUTCOMES, SECTION } from '@/lib/sampledash';

/**
 * One sample dashboard, on the home page.
 *
 * This replaced a three-tab showcase that asked a visitor to click between
 * "Operations", "Campaigns" and "Quality" before seeing anything. Three shallow
 * previews behind tabs prove less than one panel with real depth, and most
 * people never pressed a tab.
 *
 * No JavaScript. The bars carry their tooltip in a CSS :hover/:focus-within
 * layer and are reachable by keyboard, so the whole section is a server
 * component — a marketing screenshot should not cost a hydration payload.
 *
 * CHART DECISIONS, so they survive the next edit:
 *   - Calls by hour is ONE series, so it takes no legend and no categorical
 *     palette: ink bars, with the single peak in clay and direct-labelled.
 *     Labelling every bar would be noise; labelling the peak is the point.
 *   - Outcomes are STATES, so they take the status palette, and each row is
 *     labelled with its name, share and count. Colour is never the only cue —
 *     which also covers the amber's sub-3:1 contrast (see lib/sampledash.js).
 *   - The agent list is a ranked single series, so it shares the ink treatment
 *     rather than introducing a second palette.
 */

const CLOCK = (h) => `${String(h).padStart(2, '0')}:00`;

export default function SampleDashboard() {
  const [head, headEm] = SECTION.heading;
  const peak = Math.max(...HOURLY);
  const peakHour = HOURLY.indexOf(peak);
  const total = HOURLY.reduce((a, b) => a + b, 0);
  const topAgent = Math.max(...AGENTS.map((a) => a.calls));

  return (
    <section id="dashboard">
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

        <Reveal className="sd">
          <header className="sd-top">
            <div>
              <h3>{DASH.client}</h3>
              <p>{DASH.scope}</p>
            </div>
            <div className="sd-top-right">
              <span className="sd-period">{DASH.period}</span>
              <span className="sd-live"><i aria-hidden="true" />Live</span>
            </div>
          </header>

          {/* ---- headline numbers ---- */}
          <div className="sd-kpis">
            {KPIS.map((k) => (
              <div className="sd-kpi" key={k.label}>
                <span className="sd-kpi-label">{k.label}</span>
                <b className="sd-kpi-value">{k.value}</b>
                <span className={`sd-kpi-delta ${k.dir}`}>
                  <i aria-hidden="true">↑</i>{k.delta}
                  <em>{k.since}</em>
                </span>
              </div>
            ))}
          </div>

          {/* ---- calls by hour ---- */}
          <div className="sd-card sd-chart">
            <div className="sd-card-head">
              <div>
                <h4>Calls by hour</h4>
                <span className="sd-sub">
                  {total.toLocaleString('en-US')} calls · midnight to 11pm
                </span>
              </div>
              <span className="sd-chart-peak">
                Peak {CLOCK(peakHour)} · <b>{peak}</b>
              </span>
            </div>

            <div className="sd-bars" role="img"
                 aria-label={`Calls by hour. Quiet overnight, climbing from 07:00, peaking at ${CLOCK(peakHour)} with ${peak} calls, falling away after 21:00.`}>
              {HOURLY.map((v, h) => (
                <span className={`sd-bar${h === peakHour ? ' peak' : ''}`} key={h} tabIndex={0}>
                  <span className="sd-tip">{CLOCK(h)} — {v} calls</span>
                  <i style={{ height: `${(v / peak) * 100}%` }} />
                  {/* Every third hour, so the axis stays readable at any width. */}
                  <em>{h % 3 === 0 ? String(h).padStart(2, '0') : ''}</em>
                </span>
              ))}
            </div>
            <p className="sd-note">{HOURLY_PEAK_NOTE}</p>
          </div>

          <div className="sd-split">
            {/* ---- outcome mix ---- */}
            <div className="sd-card">
              <div className="sd-card-head">
                <div>
                  <h4>How the calls ended</h4>
                  <span className="sd-sub">Classified from the transcript, every call</span>
                </div>
              </div>
              <div className="sd-outcomes">
                {OUTCOMES.map((o) => (
                  <div className={`sd-outcome ${o.tone}`} key={o.label}>
                    <div className="sd-outcome-top">
                      <span className="sd-outcome-name"><i aria-hidden="true" />{o.label}</span>
                      <span className="sd-outcome-val">
                        {o.pct}%<em>{o.count.toLocaleString('en-US')}</em>
                      </span>
                    </div>
                    <span className="sd-track"><i style={{ width: `${o.pct}%` }} /></span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- agent leaderboard ---- */}
            <div className="sd-card">
              <div className="sd-card-head">
                <div>
                  <h4>By agent</h4>
                  <span className="sd-sub">Top {AGENTS.length} of 8 · calls handled and share resolved alone</span>
                </div>
              </div>
              <div className="sd-agents">
                {AGENTS.map((a) => (
                  <div className="sd-agent" key={a.name}>
                    <div className="sd-agent-id">
                      <b>{a.name}</b>
                      <span>{a.role}</span>
                    </div>
                    <span className="sd-track">
                      <i style={{ width: `${(a.calls / topAgent) * 100}%` }} />
                    </span>
                    <span className="sd-agent-n">{a.calls.toLocaleString('en-US')}</span>
                    <span className="sd-agent-rate">{a.rate}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---- what it adds up to ---- */}
          <div className="sd-impact">
            {IMPACT.map((i) => (
              <div key={i.label}>
                <b>{i.value}</b>
                <span className="l">{i.label}</span>
                <span className="n">{i.note}</span>
              </div>
            ))}
          </div>

          <footer className="sd-foot">
            <p>{SECTION.note}</p>
            <Link href={SECTION.cta.href} className="sd-link">
              {SECTION.cta.label} &rarr;
            </Link>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
