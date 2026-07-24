import { VERTICALS, VERTICALS_ALSO } from '@/lib/content';
import Reveal from './Reveal';

export default function Verticals() {
  return (
    <section id="verticals">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>Where we go deep</span>
            <h2>Industries we <em>build for</em></h2>
          </div>
          <p>
            We don&rsquo;t build for everyone — but across physical operations and
            digital-first brands worldwide, we&rsquo;ve concentrated real expertise where
            complexity is highest and the cost of failure is real.
          </p>
        </Reveal>
        <div className="vert-grid">
          {VERTICALS.map((v, i) => (
            <Reveal className="vert" key={v.idx} delay={(i % 3) * 0.1}>
              <div className="vert-line" />
              <div className="idx">{v.idx}</div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
              <div className="tags">
                {v.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="vert-also">
          <span className="vert-also-label">Also built for</span>
          <div className="vert-also-pills">
            {VERTICALS_ALSO.map((label) => (
              <a href="#contact" key={label}>{label}</a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
