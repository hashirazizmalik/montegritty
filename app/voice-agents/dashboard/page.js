import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardFeed from '@/components/DashboardFeed';
import Reveal from '@/components/Reveal';
import {
  DASH_AGENTS,
  DASH_DISCLOSURE,
  DASH_HOURLY,
  DASH_HOURLY_NOTE,
  DASH_KPIS,
  DASH_META,
  DASH_OUTCOMES,
} from '@/lib/dashboard';

export const metadata = {
  title: 'Urdu Voice Agent Operations Dashboard — Montegritty',
  description:
    'A live operations dashboard for Urdu voice agents, in Urdu: call volume by hour, outcome mix, agent leaderboard and a live call feed. Sample data.',
  alternates: { canonical: '/voice-agents/dashboard' },
};

export default function DashboardPage() {
  const peak = Math.max(...DASH_HOURLY);
  const topAgent = Math.max(...DASH_AGENTS.map((a) => a.calls));

  return (
    <>
      <Header />
      <main>
        <section className="ag-hero" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <Link href="/voice-agents" className="ag-back">&larr; All eight demos</Link>
            <h1>The same system that answers<br />also <em>reports</em>.</h1>
            <div className="ag-hero-sub">
              <p>
                Every call an agent handles is transcribed, classified and written back
                the moment it ends — so operations reporting stops being a thing someone
                assembles on Monday and becomes a thing you watch. Here it is in Urdu,
                with sample data.
              </p>
              <div className="ag-spec">
                <dl>
                  <dt>Interface</dt><dd>اردو · RTL</dd>
                  <dt>Refresh</dt><dd>Live, per call</dd>
                  <dt>Source</dt><dd>Agent transcripts</dd>
                  <dt>Export</dt><dd>CSV · API · BI</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="dash" style={{ marginTop: 90 }}>
          <div className="wrap">
            <div className="dash-shell">
              <Reveal className="dash-top">
                <div className="dash-title">
                  <h2 className="urdu">{DASH_META.title}</h2>
                  <p className="urdu">{DASH_META.subtitle}</p>
                </div>
                <span className="dash-live"><i />{DASH_META.live}</span>
              </Reveal>

              <Reveal className="dash-kpis">
                {DASH_KPIS.map((k) => (
                  <div className="dash-kpi" key={k.label}>
                    <span className="lbl urdu">{k.label}</span>
                    <span className="val">{k.value}</span>
                    <span className={`delta ${k.dir}`}>{k.delta}</span>
                  </div>
                ))}
              </Reveal>

              <div className="dash-grid">
                {/* Hourly volume — one series, so no legend; the peak is direct-labelled. */}
                <Reveal className="dash-card">
                  <h3 className="urdu">گھنٹہ وار کال والیوم</h3>
                  <span className="sub urdu">آدھی رات سے رات 11 بجے تک</span>
                  <div className="dash-bars">
                    {DASH_HOURLY.map((v, h) => (
                      <span
                        className={`dash-bar${v === peak ? ' peak' : ''}`}
                        key={h}
                        tabIndex={0}
                      >
                        <span className="tip">{String(h).padStart(2, '0')}:00 — {v} calls</span>
                        <i style={{ height: `${(v / peak) * 100}%` }} />
                        <em>{String(h).padStart(2, '0')}</em>
                      </span>
                    ))}
                  </div>
                  <p className="dash-peak-note urdu">{DASH_HOURLY_NOTE}</p>
                </Reveal>

                <Reveal className="dash-card" delay={0.1}>
                  <h3 className="urdu">کالز کا نتیجہ</h3>
                  <span className="sub urdu">آج کی 4,182 کالز کی تقسیم</span>
                  <div className="dash-out">
                    {DASH_OUTCOMES.map((o) => (
                      <div className="dash-out-row" key={o.label}>
                        <div className="top">
                          <span className="nm urdu">
                            <i style={{ background: o.color }} />
                            {o.label}
                          </span>
                          <span className="pc" style={{ color: o.color }}>
                            {o.pct}% · {o.count.toLocaleString('en-US')}
                          </span>
                        </div>
                        <div className="track">
                          <i style={{ width: `${o.pct}%`, background: o.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <div className="dash-grid" style={{ marginTop: 24 }}>
                <DashboardFeed />

                <Reveal className="dash-card" delay={0.1}>
                  <h3 className="urdu">ایجنٹ کے حساب سے کارکردگی</h3>
                  <span className="sub urdu">آج سنبھالی گئی کالز اور خودکار حل کی شرح</span>
                  <div className="dash-agents">
                    {DASH_AGENTS.map((a) => (
                      <div className="dash-agent" key={a.name}>
                        <div>
                          <span className="who urdu">{a.name}</span>
                          <small>{a.role} · {a.rate}% self-served</small>
                          <div className="track">
                            <i style={{ width: `${(a.calls / topAgent) * 100}%` }} />
                          </div>
                        </div>
                        <span className="n">{a.calls.toLocaleString('en-US')}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <p className="dash-note">{DASH_DISCLOSURE}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap cta">
            <Reveal>
              <h2>Want this pointed at <em>your</em> phone lines?</h2>
              <p>
                The dashboard ships with the agent. Tell us which call your team makes
                most often and we&rsquo;ll build the agent that makes it — and the reporting
                that proves it worked.
              </p>
              <Link href="/contact" className="btn">
                Start the conversation
                <span className="arr" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
