import Link from 'next/link';
import { EDGE } from '@/lib/content';
import Reveal from './Reveal';

/**
 * The three claims a self-serve template gallery cannot make. Sits directly
 * under the hero, because a visitor should know inside one screen why this is
 * not another builder.
 */
export default function Edge() {
  const [head, headEm] = EDGE.heading;
  return (
    <section id="edge">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>{EDGE.eyebrow}</span>
            <h2>{head}<em>{headEm}</em></h2>
          </div>
          <p>{EDGE.lede}</p>
        </Reveal>

        <div className="edge-grid">
          {EDGE.points.map((p, i) => (
            <Reveal className="edge" key={p.n} delay={i * 0.1}>
              <span className="edge-n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <Link className="edge-cta" href={p.href}>{p.cta} &rarr;</Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
