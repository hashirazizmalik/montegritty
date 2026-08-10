import { WHY_VOICE } from '@/lib/content';
import Reveal from './Reveal';

/**
 * The market case. Every figure is public and sourced, and the sources are
 * printed underneath — if a statistic ever loses its link, cut the statistic.
 */
export default function WhyVoice() {
  const [head, headEm, headTail] = WHY_VOICE.heading;

  return (
    <section id="why-voice">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
              {WHY_VOICE.eyebrow}
            </span>
            <h2>{head}<em>{headEm}</em>{headTail}</h2>
          </div>
          <p>{WHY_VOICE.lede}</p>
        </Reveal>

        <div className="why-grid">
          {WHY_VOICE.stats.map((s) => (
            <div className="why-cell" key={s.value}>
              <b>{s.value}</b>
              <p>{s.body}</p>
            </div>
          ))}
        </div>

        <Reveal as="p" className="why-close">{WHY_VOICE.close}</Reveal>

        <div className="why-src">
          <span>Sources</span>
          {WHY_VOICE.sources.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
