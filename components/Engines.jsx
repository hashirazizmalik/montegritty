import { ENGINES } from '@/lib/content';
import Reveal from './Reveal';

/**
 * Engine independence — the claim a competitor welded to a single vendor
 * cannot answer. Kept factual: each entry says what that engine is actually
 * for, and its real status.
 */
export default function Engines() {
  const [head, headEm] = ENGINES.heading;
  return (
    <section id="engines">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>{ENGINES.eyebrow}</span>
            <h2>{head}<em>{headEm}</em></h2>
          </div>
          <p>{ENGINES.lede}</p>
        </Reveal>

        <div className="eng-grid">
          {ENGINES.items.map((e, i) => (
            <Reveal className="eng" key={e.name} delay={(i % 2) * 0.08}>
              <div className="eng-top">
                <h3>{e.name}</h3>
                <span className={`eng-status${e.status === 'In production' ? ' live' : ''}`}>{e.status}</span>
              </div>
              <p className="eng-role">{e.role}</p>
              <p className="eng-body">{e.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="eng-note">{ENGINES.note}</p>
      </div>
    </section>
  );
}
