import Link from 'next/link';
import Reveal from './Reveal';

/**
 * The objection that stops banks, hospitals and law firms from going further.
 * It deserves its own answer on the home page rather than a line buried in a
 * services accordion.
 *
 * Everything claimed here is a deployment option we actually offer. Do not add
 * a certification or a standard we do not hold.
 */
const POINTS = [
  {
    title: 'It can run entirely inside your walls',
    body:
      'Self-hosted on your own servers or private cloud. The voice models, the transcripts and the recordings never leave your environment, and there is no per-request call to anyone else’s API.',
  },
  {
    title: 'You decide what is kept',
    body:
      'Retention is a setting, not our policy. Keep every recording for audit, keep transcripts but discard audio, or redact identifiers before anything is written down. Deletion is real deletion.',
  },
  {
    title: 'The agent only knows what you show it',
    body:
      'Integrations are scoped to the fields a call actually needs. An order-confirmation agent can see an order; it cannot see your customer table, and it cannot be talked into reading one out.',
  },
  {
    title: 'Every call is on the record',
    body:
      'Full transcripts, timestamps and outcomes for anything a regulator or an internal audit might ask about — including what the agent said, not just what it did.',
  },
];

export default function Confidential() {
  return (
    <section id="confidential">
      <div className="wrap">
        <Reveal className="conf">
          <div className="conf-deco" />
          <span className="eyebrow">If the data cannot leave</span>
          <h2>Confidential operations, <em>covered</em></h2>
          <p className="conf-lede">
            Most voice AI is a wrapper around somebody else’s API, which means your
            customers’ conversations travel to a third party before you hear them. That is
            a non-starter for a bank, a hospital or a law firm — so it is not how we
            deploy for one.
          </p>

          <div className="conf-grid">
            {POINTS.map((p) => (
              <div className="conf-card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>

          <div className="conf-cta">
            <Link href="/contact" className="btn">
              Talk about a self-hosted deployment
              <span className="arr" aria-hidden="true">↗</span>
            </Link>
            <span className="conf-note">
              Demo agents built on this site are cloud-hosted and are not for real
              customer data.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
