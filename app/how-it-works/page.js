import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Process from '@/components/Process';
import Engines from '@/components/Engines';
import Languages from '@/components/Languages';
import Reveal from '@/components/Reveal';
import { PROCESS_PAGE } from '@/lib/content';

export const metadata = {
  title: 'How It Works — Voice Agent Pilots & Engines | Montegritty',
  description:
    'One call type, one number to move, six weeks. Plus the engine layer: Uplift AI for Urdu, ElevenLabs for English, Vapi for telephony, and open-source self-hosted where data cannot leave.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How It Works — Montegritty',
    description: 'One call type, one number to move, six weeks. And the engines underneath.',
    url: '/how-it-works',
    type: 'website',
  },
};

function FaqSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PROCESS_PAGE.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function HowItWorksPage() {
  const [head, headEm] = PROCESS_PAGE.heading;

  return (
    <>
      <Header />
      <main>
        <FaqSchema />

        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">{PROCESS_PAGE.eyebrow}</span>
            <h1>{head}<em>{headEm}</em></h1>
            <p className="lede">{PROCESS_PAGE.lede}</p>
          </div>
        </section>

        <section style={{ paddingTop: 80 }}>
          <Process />
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="pilot">
              <h3>{PROCESS_PAGE.pilot.title}</h3>
              <ol>
                {PROCESS_PAGE.pilot.points.map((p, i) => (
                  <li key={p}><span>{String(i + 1).padStart(2, '0')}</span><span>{p}</span></li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <Engines />
        <Languages />

        <section style={{ paddingTop: 20 }}>
          <div className="wrap">
            <Reveal className="voice-faq">
              <h3>Common Questions</h3>
              <div className="voice-faq-list">
                {PROCESS_PAGE.faq.map((f) => (
                  <div className="voice-faq-item" key={f.q}>
                    <h4>{f.q}</h4>
                    <p>{f.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 40 }}>
          <div className="wrap cta">
            <Reveal>
              <h2>Which call would you <em>hand over first?</em></h2>
              <p>
                That question is the whole scoping conversation. Answer it and we can tell
                you within a week whether an agent is worth building for it.
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
