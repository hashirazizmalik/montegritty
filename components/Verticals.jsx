import Link from 'next/link';
import { VERTICALS, VERTICALS_ALSO } from '@/lib/content';
import Reveal from './Reveal';

export default function Verticals() {
  return (
    <div className="wrap">
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
              <Link href="/contact" key={label}>{label}</Link>
            ))}
          </div>
        </Reveal>
    </div>
  );
}
