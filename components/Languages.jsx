import { LANGUAGES } from '@/lib/content';
import Reveal from './Reveal';

/**
 * Language status, stated plainly.
 *
 * Every competitor in this market publishes an aspirational language roadmap.
 * A buyer disproves an overclaim on their first call, so the honest version is
 * both more credible and easier to defend — never mark anything "in production"
 * that has not shipped.
 */
export default function Languages() {
  const [head, headEm] = LANGUAGES.heading;
  return (
    <section id="languages">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>{LANGUAGES.eyebrow}</span>
            <h2>{head}<em>{headEm}</em></h2>
          </div>
          <p>{LANGUAGES.lede}</p>
        </Reveal>

        <ul className="lang-list">
          {LANGUAGES.rows.map((r) => (
            <li key={r.name}>
              <span className="lang-name">{r.name}</span>
              <span className={`lang-status${r.status === 'In production' ? ' live' : ''}`}>{r.status}</span>
              <span className="lang-note">{r.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
