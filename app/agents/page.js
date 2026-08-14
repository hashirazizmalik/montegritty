import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgentCarousel from '@/components/AgentCarousel';
import TemplateLibrary from '@/components/TemplateLibrary';
import Reveal from '@/components/Reveal';
import { AGENTS } from '@/lib/agents';
import { TEMPLATES } from '@/lib/templates';
import { AGENTS_PAGE } from '@/lib/content';

export const metadata = {
  title: 'Hear the Agents — Real Urdu Voice Calls | Montegritty',
  description:
    `Eight Urdu voice agents with full recorded calls and bilingual transcripts, plus ${TEMPLATES.length} ready-made templates you can listen to. Built by Montegritty.`,
  alternates: { canonical: '/agents' },
  openGraph: {
    title: 'Hear the Agents — Real Urdu Voice Calls | Montegritty',
    description: 'Eight recorded calls in Urdu, with transcripts. Listen before you believe anything else.',
    url: '/agents',
    type: 'website',
  },
};

export default function AgentsPage() {
  const [head, headEm] = AGENTS_PAGE.heading;

  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">{AGENTS_PAGE.eyebrow}</span>
            <h1>{head}<em>{headEm}</em></h1>
            <p className="lede">{AGENTS_PAGE.lede}</p>
          </div>
        </section>

        <section style={{ paddingTop: 70 }}>
          <div className="wrap">
            <Reveal className="sec-label-row">
              <span className="eyebrow">{AGENTS.length} agents · full recorded calls</span>
            </Reveal>
            <Reveal><AgentCarousel agents={AGENTS} /></Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 40 }}>
          <div className="wrap">
            <Reveal className="shead">
              <div>
                <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>Template library</span>
                <h2>{TEMPLATES.length} more, <em>already written</em></h2>
              </div>
              <p>
                Each one is a complete brief — the voice, the opening line in Urdu, and
                the rules about what it must never say. Press play to hear how any of
                them opens a call.
              </p>
            </Reveal>
            <TemplateLibrary />
          </div>
        </section>

        <section style={{ paddingTop: 20 }}>
          <div className="wrap">
            <Reveal as="p" className="dash-note" style={{ maxWidth: '68ch' }}>
              {AGENTS_PAGE.disclosure}
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 40 }}>
          <div className="wrap cta">
            <Reveal>
              <h2>Yours is <em>not on this page</em></h2>
              <p>
                These exist to show the standard. What we build for you is shaped around
                your call, your systems and your callers — tell us which call to start with.
              </p>
              <Link href="/contact" className="btn">
                Start the conversation <span className="arr" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
