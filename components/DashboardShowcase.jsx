'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DASHBOARDS, DASHBOARD_NOTE } from '@/lib/dashboards';
import Reveal from './Reveal';

/**
 * Three dashboard examples, switched by tab.
 *
 * Single-series bars in ink with the peak in clay — no legend, because one
 * series needs none, and the peak is the only value worth calling out at this
 * size. These are previews, not instruments: anyone who wants to interrogate
 * the data follows the link to the real one.
 */
export default function DashboardShowcase() {
  const [i, setI] = useState(0);
  const d = DASHBOARDS[i];
  const peak = Math.max(...d.bars);

  return (
    <section id="dashboards">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
              Reporting is included
            </span>
            <h2>You also get a <em>dashboard</em></h2>
          </div>
          <p>
            Every client gets reporting built from their own calls — not a spreadsheet
            somebody assembles on Monday. Here are three of the shapes we ship, depending
            on whether you are running a support line, a calling campaign, or a regulated
            operation that has to prove what was said.
          </p>
        </Reveal>

        <div className="dsw">
          <div className="dsw-tabs" role="tablist" aria-label="Dashboard examples">
            {DASHBOARDS.map((x, k) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={k === i}
                className={`dsw-tab${k === i ? ' on' : ''}`}
                onClick={() => setI(k)}
              >
                <span className="dsw-tab-n">{String(k + 1).padStart(2, '0')}</span>
                <span>
                  <strong>{x.name}</strong>
                  <em>{x.sub}</em>
                </span>
              </button>
            ))}
          </div>

          <div className="dsw-panel" key={d.id}>
            <div className="dsw-head">
              <div>
                <h3>{d.name}</h3>
                <p>{d.body}</p>
              </div>
              <Link href={d.href} className="dsw-link">{d.linkLabel} &rarr;</Link>
            </div>

            <div className="dsw-kpis">
              {d.kpis.map((k) => (
                <div className="dsw-kpi" key={k.label}>
                  <span className="l">{k.label}</span>
                  <b>{k.value}</b>
                  <span className={`d ${k.dir}`}>{k.delta}</span>
                </div>
              ))}
            </div>

            <div className="dsw-chart">
              <span className="dsw-chart-label">{d.barsLabel}</span>
              <div className="dsw-bars">
                {d.bars.map((v, h) => (
                  <i
                    key={h}
                    className={v === peak ? 'peak' : undefined}
                    style={{ height: `${Math.max(4, (v / peak) * 100)}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="dsw-note">{DASHBOARD_NOTE}</p>
      </div>
    </section>
  );
}
