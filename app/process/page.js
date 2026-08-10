import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Process from '@/components/Process';
import Reveal from '@/components/Reveal';
import { PROCESS_PAGE } from '@/lib/content';

export const metadata = {
  title: 'How We Work — Voice Agent Pilots | Montegritty',
  description:
    'Every Montegritty engagement starts as a narrow pilot: one call type, one department, six weeks, measured against a single number agreed before anything is built.',
  alternates: { canonical: '/process' },
  openGraph: {
    title: 'How We Work — Voice Agent Pilots | Montegritty',
    description: 'One call type, one number to move, six weeks. Then we scale it or say so.',
    url: '/process',
    type: 'website',
  },
};

function ProcessFaqSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PROCESS_PAGE.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ProcessPage() {
  const [head, headEm] = PROCESS_PAGE.heading;

  return (
    <>
      <Header />
      <main>
        <ProcessFaqSchema />

        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">{PROCESS_PAGE.eyebrow}</span>
            <h1>{head}<em>{headEm}</em></h1>
            <p className="lede">{PROCESS_PAGE.lede}</p>
          </div>
        </section>

        <section style={{ paddingTop: 90 }}>
          <Process />
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="pilot">
              <h3>{PROCESS_PAGE.pilot.title}</h3>
              <ol>
                {PROCESS_PAGE.pilot.points.map((p, i) => (
                  <li key={p}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 40 }}>
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
