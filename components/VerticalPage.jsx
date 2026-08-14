import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import Reveal from './Reveal';
import Confidential from './Confidential';
import { VERTICAL_PAGES } from '@/lib/verticals';
import { VERTICALS } from '@/lib/content';
import { AGENTS } from '@/lib/agents';

const META = {
  healthcare: {
    title: 'Urdu Voice Agents for Clinics & Hospitals — Montegritty',
    description:
      'Appointment confirmation, pre-arrival intake and chronic care follow-up in spoken Urdu — reaching the patients an SMS reminder never did. Deployable self-hosted.',
  },
  education: {
    title: 'Voice Agents for Schools — Admissions, Fees, Attendance | Montegritty',
    description:
      'Absence follow-up the same evening, fee reminders and admissions enquiries in Urdu, written straight back into your school system.',
  },
  'front-desk': {
    title: 'Voice Agents for Order Confirmation, Bookings & Support — Montegritty',
    description:
      'Cash-on-delivery confirmation, lead qualification, bookings and first-line support — the high-volume calls a person is too expensive to keep answering.',
  },
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
                We do not start with all of them. One call type, one department, six
                weeks, measured against a number agreed before anything is built.
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
                Tell us which of those calls your team makes most often and we will scope
                a pilot around it — one number, six weeks, and a plain answer at the end.
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
