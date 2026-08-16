import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import Reveal from './Reveal';
import Confidential from './Confidential';
import { VERTICAL_PAGES } from '@/lib/verticals';
import { VERTICALS } from '@/lib/content';
import { AGENTS } from '@/lib/agents';
import { SITE_URL } from '@/lib/seo';

const META = {
  healthcare: {
    title: 'Urdu Voice Agents for Clinics & Hospitals — Montegritty',
    description:
      'Agentic voice AI for healthcare in Pakistan: confirms the appointment in Urdu, reschedules against live availability and updates the patient record mid-call. Deployable self-hosted.',
  },
  education: {
    title: 'Voice Agents for Schools — Admissions, Fees, Attendance | Montegritty',
    description:
      'Agentic voice AI for schools: absence follow-up the same evening, fee reminders and admissions enquiries in Urdu, written straight back into your school ERP.',
  },
  'front-desk': {
    title: 'Voice Agents for Order Confirmation, Bookings & Support — Montegritty',
    description:
      'Agentic voice AI that confirms cash-on-delivery orders, qualifies leads and takes bookings in Urdu — then writes every outcome back to your store or CRM.',
  },
};

const SERVICE_TYPE = {
  healthcare: 'Healthcare voice agent deployment',
  education: 'Education voice agent deployment',
  'front-desk': 'Customer operations voice agent deployment',
};

const AUDIENCE = {
  healthcare: 'Clinics, hospitals, laboratories and diagnostic centres',
  education: 'Schools, colleges and training networks',
  'front-desk': 'E-commerce, real estate, hospitality and support operations',
};

export function verticalMetadata(slug) {
  const m = META[slug];
  return {
    ...m,
    alternates: { canonical: `/${slug}` },
    openGraph: { ...m, url: `/${slug}`, type: 'website' },
  };
}

/**
 * Two blocks per page: the Service the page sells, and the questions it
 * answers. Both point at the site-wide Organization node rather than repeating
 * it, so everything resolves to one entity.
 */
function VerticalSchema({ slug, vertical }) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/${slug}#service`,
        name: META[slug].title.split(' — ')[0],
        serviceType: SERVICE_TYPE[slug],
        description: META[slug].description,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'Pakistan' },
        availableLanguage: ['ur', 'en'],
        audience: { '@type': 'BusinessAudience', audienceType: AUDIENCE[slug] },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Calls we automate first',
          itemListElement: vertical.calls.map((c) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: c.name, description: c.body },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/${slug}#faq`,
        mainEntity: vertical.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

/**
 * One layout, three sectors. Each page answers the same four questions in the
 * same order — which calls, what it will not do, hear one, start — so a visitor
 * moving between them is never relearning the page.
 */
export default function VerticalPage({ slug }) {
  const v = VERTICAL_PAGES[slug];
  if (!v) notFound();

  const [head, headEm] = v.heading;
  const others = VERTICALS.filter((x) => x.slug !== slug);

  return (
    <>
      <Header />
      <main>
        <VerticalSchema slug={slug} vertical={v} />

        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">{v.eyebrow}</span>
            <h1>{head}<em>{headEm}</em></h1>
            <div className="vp-hero">
              <p className="lede">{v.lede}</p>
              <div className="vp-stat">
                <b>{v.stat.value}</b>
                <span>{v.stat.label}</span>
              </div>
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 80 }}>
          <div className="wrap">
            <Reveal className="shead">
              <div>
                <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
                  The calls we automate first
                </span>
                <h2>Four calls, <em>in order of payback</em></h2>
              </div>
              <p>
                We start with one. One call type, one department, six weeks, measured
                against a number agreed before anything is built.
              </p>
            </Reveal>

            <div className="vp-calls">
              {v.calls.map((c, i) => {
                const agent = c.demo ? AGENTS.find((a) => a.id === c.demo) : null;
                return (
                  <Reveal className="vp-call" key={c.name} delay={(i % 2) * 0.08}>
                    <span className="vp-call-n">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{c.name}</h3>
                      <p>{c.body}</p>
                      {agent && (
                        <Link className="vp-call-demo" href={`/agents/${agent.id}`}>
                          Hear {agent.name} do this &rarr;
                        </Link>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 40 }}>
          <div className="wrap">
            <Reveal className="vp-guard">
              <h2>What it will <em>never</em> do</h2>
              <p className="vp-guard-lede">
                An agent is only trustworthy if its limits are written down before it
                takes a call. These are set in the brief, not discovered in production.
              </p>
              <ul>
                {v.guardrails.map((g) => <li key={g}>{g}</li>)}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Question-led headings with the answer in the first sentence — the
            shape featured snippets and voice assistants read back verbatim.
            Emitted as FAQPage above. */}
        <section style={{ paddingTop: 40 }}>
          <div className="wrap">
            <Reveal className="voice-faq">
              <h3>Common questions</h3>
              <div className="voice-faq-list">
                {v.faq.map((f) => (
                  <div className="voice-faq-item" key={f.q}>
                    <h4>{f.q}</h4>
                    <p>{f.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Confidential />

        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="vert-also">
              <span className="vert-also-label">Also built for</span>
              <div className="vert-also-pills">
                {others.map((o) => (
                  <Link href={`/${o.slug}`} key={o.slug}>{o.title}</Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 40 }}>
          <div className="wrap cta">
            <Reveal>
              <h2>{v.close}</h2>
              <p>
                Tell us which of those calls your team makes most often. We scope a pilot
                around it — one number, six weeks, a plain answer at the end.
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
