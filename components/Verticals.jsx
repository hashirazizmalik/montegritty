import Link from 'next/link';
import { VERTICALS, VERTICALS_ALSO } from '@/lib/content';
import Reveal from './Reveal';

/** The three sectors, each linking to its own page. */
export default function Verticals({ compact = false }) {
  return (
    <div className="wrap">
      <div className="vert-grid">
        {VERTICALS.map((v, i) => (
          <Reveal className="vert" key={v.slug} delay={(i % 3) * 0.1}>
            <div className="vert-line" />
            <div className="idx">{v.idx}</div>
            <h3>{v.title}</h3>
            <p className="vert-lead">{v.lead}</p>
            <p>{compact ? v.short : v.body}</p>
            <div className="tags">
              {v.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
            <Link className="vert-go" href={`/${v.slug}`}>What we build for {v.title.toLowerCase()} &rarr;</Link>
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
