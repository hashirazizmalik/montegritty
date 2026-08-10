import Link from 'next/link';
import { UMBRELLAS } from '@/lib/content';
import Reveal from './Reveal';

/**
 * Home-page teaser for the three pillars. Deliberately shallow — it names each
 * one, shows three examples, and sends people to /solutions for the rest.
 */
export default function Pillars() {
  return (
    <section id="what-we-do">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
              What we do
            </span>
            <h2>Voice, and what it <em>takes</em> to run it</h2>
          </div>
          <p>
            We build one thing and the two layers it depends on. Not a general software
            shop with a voice product bolted on — the agent, the speech models underneath
            it, and the integration work that makes it part of your operation.
          </p>
        </Reveal>

        <div className="pill-grid">
          {UMBRELLAS.map((u, i) => (
            <Reveal className="pill-card" key={u.id} delay={i * 0.1}>
              <span className="n">{u.num}</span>
              <h3>{u.name}</h3>
              <p>{u.lead}</p>
              <ul>
                {u.services.slice(0, 3).map((s) => <li key={s.name}>{s.name}</li>)}
              </ul>
              <Link className="go" href={`/solutions#${u.id}`}>
                All {u.services.length} &rarr;
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
