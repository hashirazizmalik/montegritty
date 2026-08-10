import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgentGrid from '@/components/AgentGrid';
import CustomAgentPanel from '@/components/CustomAgentPanel';
import Reveal from '@/components/Reveal';
import { AGENTS } from '@/lib/agents';
import { VOICE_AGENTS } from '@/lib/content';

export const metadata = {
  title: 'Urdu Voice Agent Demos — Montegritty',
  description:
    'Eight working Urdu voice agents built by Montegritty, each with a full recorded call and bilingual transcript — customer support, appointments, COD confirmation, collections, chronic care, schools, sales and public health.',
  alternates: { canonical: '/voice-agents' },
  openGraph: {
    title: 'Urdu Voice Agent Demos — Montegritty',
    description:
      'Eight working Urdu voice agents, each with a full recorded call you can play line by line.',
    url: '/voice-agents',
    type: 'website',
  },
};

export default function VoiceAgentsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="ag-hero">
          <div className="wrap">
            <Link href="/solutions#voice-agents" className="ag-back">&larr; Solutions</Link>
            <h1>Eight agents.<br />Eight <em>real calls</em>.</h1>
            <div className="ag-hero-sub">
              <p>{VOICE_AGENTS.lede}</p>
              <div className="ag-spec">
                <dl>
                  <dt>Languages</dt><dd>Urdu · English · mixed</dd>
                  <dt>Latency</dt><dd>~1s end-to-end</dd>
                  <dt>Channels</dt><dd>Phone · WhatsApp · Web</dd>
                  <dt>Hosting</dt><dd>Self or cloud</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 90 }}>
          <div className="wrap">
            <AgentGrid agents={AGENTS} />

            <Reveal className="vert-also" style={{ marginTop: 56 }}>
              <span className="vert-also-label">{VOICE_AGENTS.dashboardTeaser.title}</span>
              <div className="vert-also-pills">
                <Link href="/voice-agents/dashboard">
                  {VOICE_AGENTS.dashboardTeaser.cta} &rarr;
                </Link>
              </div>
            </Reveal>

            <Reveal as="p" className="dash-note" style={{ maxWidth: '68ch' }}>
              {VOICE_AGENTS.disclosure}
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <CustomAgentPanel />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
