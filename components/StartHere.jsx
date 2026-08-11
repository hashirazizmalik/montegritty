import Link from 'next/link';
import Reveal from './Reveal';
import { TEMPLATES } from '@/lib/templates';
import { AGENTS } from '@/lib/agents';

/**
 * The one section that has to do its job above everything else: tell a first-time
 * visitor what they can actually do here, in three options, immediately after the
 * hero. Everything else on the home page is evidence for one of these three.
 */
const PATHS = [
  {
    n: '01',
    title: 'Talk to it',
    body:
      'Describe the call you want handled, out loud, in Urdu or English. It asks what we would ask — the language, who is on the other end, what it must never say — and builds a working agent while you speak.',
    cta: 'Open the studio',
    href: '/studio',
    tag: 'Two minutes, no form',
  },
  {
    n: '02',
    title: 'Start from a template',
    body:
      `${TEMPLATES.length} briefs across 12 sectors, each with the voice, the opening line and the rules already written. Deploy one and it is live in seconds with a link you can send to anyone.`,
    cta: 'Browse templates',
    href: '/templates',
    tag: `${TEMPLATES.length} ready to deploy`,
  },
  {
    n: '03',
    title: 'Hear one we built',
    body:
      `${AGENTS.length} agents handling real calls in Urdu — order confirmations, appointments, collections, outreach. Full recordings, with a transcript you can follow line by line.`,
    cta: 'Listen to the demos',
    href: '/voice-agents',
    tag: 'Real recorded calls',
  },
];

export default function StartHere() {
  return (
    <section id="start">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
              Start here
            </span>
            <h2>Three ways in. <em>Pick one.</em></h2>
          </div>
          <p>
            You do not need to talk to us to see whether this works. Build an agent
            yourself in the browser, deploy one that is already written, or listen to
            eight we have already built — all of it without sending a single email.
          </p>
        </Reveal>

        <div className="path-grid">
          {PATHS.map((p, i) => (
            <Reveal className="path" key={p.n} delay={i * 0.1}>
              <span className="path-n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <span className="path-tag">{p.tag}</span>
              <Link href={p.href} className="path-cta">
                {p.cta} <span aria-hidden="true">&rarr;</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
