import { VERTICALS } from '@/lib/content';
import Reveal from './Reveal';

export default function Verticals() {
  return (
    <section id="verticals">
      <div className="wrap">
        <Reveal className="shead">
          <h2>Where we go <em>deep</em></h2>
          <p>
            We don&rsquo;t claim to serve everyone. We&rsquo;ve concentrated our expertise where
            operational complexity is highest and the cost of failure is real.
          </p>
        </Reveal>
        <div className="vert-grid">
          {VERTICALS.map((v, i) => (
            <Reveal className="vert" key={v.idx} delay={(i % 2) * 0.1}>
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
      </div>
    </section>
  );
}
