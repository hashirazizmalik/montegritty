import Link from 'next/link';
import { CONFIDENTIAL } from '@/lib/content';
import Reveal from './Reveal';

/**
 * The objection that stops a hospital going further. It gets its own answer
 * rather than a line in a services list. Everything claimed here is a
 * deployment option we actually offer — do not add a certification we do not hold.
 */
export default function Confidential() {
  const [head, headEm] = CONFIDENTIAL.heading;
  return (
    <section id="confidential">
      <div className="wrap">
        <Reveal className="conf">
          <div className="conf-deco" />
          <span className="eyebrow">{CONFIDENTIAL.eyebrow}</span>
          <h2>{head}<em>{headEm}</em></h2>
          <p className="conf-lede">{CONFIDENTIAL.lede}</p>

          <div className="conf-grid">
            {CONFIDENTIAL.points.map((p) => (
              <div className="conf-card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>

          <div className="conf-cta">
            <Link href="/contact" className="btn">
              {CONFIDENTIAL.cta}<span className="arr" aria-hidden="true">↗</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
