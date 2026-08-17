import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { ABOUT_PAGE, CONTACT, SOCIAL } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

export const metadata = {
  title: "About Montegritty — Pakistan's First Urdu-First Agentic Voice Agents",
  description:
    "Montegritty builds and runs agentic voice agents that speak Urdu and act on it — reading a schedule, booking a slot, confirming an order — wired into the systems a client already runs. Pakistan-based, remote-first.",
  alternates: { canonical: '/about' },
  openGraph: {
    title: "About Montegritty",
    description: "Pakistan's first Urdu-first agentic voice agents — what we build, what we don't, and how to reach us.",
    url: '/about',
    type: 'website',
  },
};

/**
 * The entity page. This is what an AI engine or a search crawler reads to
 * decide the company behind the domain is real, so every sentence here has to
 * be independently true — see the rule at the top of ABOUT_PAGE in
 * lib/content.js. No founding date, address, team size or client count:
 * none of those are known facts as of this page shipping, and an invented one
 * would be exactly the kind of overclaim the rest of the site refuses to make.
 *
 * mainEntity points at the site-wide Organization node (see
 * OrganizationSchema) rather than repeating its fields, so this stays a
 * pointer rather than a second, driftable copy of the same facts.
 */
function AboutSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about`,
    url: `${SITE_URL}/about`,
    name: "About Montegritty",
    mainEntity: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function AboutPage() {
  const [head, headEm, headTail] = ABOUT_PAGE.heading;

  return (
    <>
      <Header />
      <main>
        <AboutSchema />

        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">{ABOUT_PAGE.eyebrow}</span>
            <h1>{head}<em>{headEm}</em>{headTail}</h1>
            <p className="lede">{ABOUT_PAGE.lede}</p>
          </div>
        </section>

        <section style={{ paddingTop: 80 }}>
          <div className="wrap">
            <div className="edge-grid">
              {ABOUT_PAGE.pillars.map((p, i) => (
                <Reveal className="edge" key={p.title} delay={i * 0.1}>
                  <span className="edge-n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 60 }}>
          <div className="wrap">
            <Reveal className="vp-guard">
              <h2>{ABOUT_PAGE.notEyebrow}</h2>
              <p className="vp-guard-lede">{ABOUT_PAGE.notNote}</p>
              <ul>
                {ABOUT_PAGE.not.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 60 }}>
          <div className="wrap">
            <Reveal className="shead">
              <div>
                <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>Reach us</span>
                <h2>{ABOUT_PAGE.based}</h2>
              </div>
              <p>
                <a href={CONTACT.phoneLink}>{CONTACT.phoneDisplay}</a> &middot;{' '}
                <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
                  WhatsApp {CONTACT.whatsappDisplay}
                </a>{' '}
                &middot; <a href={CONTACT.emailLink}>{CONTACT.email}</a> &middot; {CONTACT.hours}
                <br />
                {SOCIAL.map((s, i) => (
                  <span key={s.href}>
                    {i > 0 && ' · '}
                    <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                  </span>
                ))}
              </p>
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 40 }}>
          <div className="wrap cta">
            <Reveal>
              <h2>{ABOUT_PAGE.close}</h2>
              <p>Eight agents, eight full recorded calls in Urdu, with a transcript you can follow line by line.</p>
              <div className="closing-actions">
                <Link href="/agents" className="btn">
                  Hear the agents <span className="arr" aria-hidden="true">↗</span>
                </Link>
                <Link href="/contact" className="btn-ghost">Start a project</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
