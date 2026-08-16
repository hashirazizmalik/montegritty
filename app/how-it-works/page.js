import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Process from '@/components/Process';
import Engines from '@/components/Engines';
import Integrations from '@/components/Integrations';
import Languages from '@/components/Languages';
import Reveal from '@/components/Reveal';
import { PROCESS, PROCESS_PAGE } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

export const metadata = {
  title: 'How It Works — Agentic Voice Agents & Integrations | Montegritty',
  description:
    'How a Montegritty voice agent pilot runs: one call type, one number to move, six weeks. Plus what the agent connects to — CRM, ERP, booking systems and order feeds, through MCP and n8n.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How It Works — Montegritty',
    description: 'One call type, one number to move, six weeks. And what the agent plugs into.',
    url: '/how-it-works',
    type: 'website',
  },
};

/**
 * The four-phase pilot was already a sequence in `PROCESS`; declaring it as a
 * HowTo just says so. The FAQ is the site's strongest AEO surface — direct
 * answers, first sentence.
 */
function PageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/how-it-works#faq`,
        mainEntity: PROCESS_PAGE.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'HowTo',
        '@id': `${SITE_URL}/how-it-works#howto`,
        name: 'How a Montegritty voice agent pilot runs',
        description:
          'Every Montegritty engagement starts as a narrow pilot on a single call type, measured against a number agreed before anything is built.',
        totalTime: 'P6W',
        step: PROCESS.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.title,
          text: s.body,
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function HowItWorksPage() {
  const [head, headEm] = PROCESS_PAGE.heading;

  return (
    <>
      <Header />
      <main>
        <PageSchema />

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

        <Integrations />
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
                Answer that and we can tell you within a week whether an agent is worth
                building for it.
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
