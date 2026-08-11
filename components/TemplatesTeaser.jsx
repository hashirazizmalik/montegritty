import Link from 'next/link';
import Reveal from './Reveal';
import { CATEGORIES, TEMPLATES } from '@/lib/templates';

// A spread across sectors rather than the first six in the file, so the strip
// reads as a library and not as one vertical.
const FEATURED = [
  'tier-1-support',
  'cod-confirmation',
  'clinic-receptionist',
  'payment-reminder',
  'property-lead',
  'restaurant-orders',
];

export default function TemplatesTeaser() {
  const picks = FEATURED.map((id) => TEMPLATES.find((t) => t.id === id)).filter(Boolean);

  return (
    <section id="templates">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
              Template library
            </span>
            <h2>{TEMPLATES.length} agents, <em>already written</em></h2>
          </div>
          <p>
            Each one is a complete brief — the voice, the opening line in Urdu, and the
            rules about what it must never say. Deploy one and talk to it in your browser
            before you decide anything.
          </p>
        </Reveal>

        <div className="tt-cats">
          {CATEGORIES.map((c) => (
            <Link key={c.id} href="/templates" className="tt-cat">
              {c.label}
              <span>{TEMPLATES.filter((t) => t.category === c.id).length}</span>
            </Link>
          ))}
        </div>

        <div className="tt-grid">
          {picks.map((t, i) => (
            <Reveal className="tt-card" key={t.id} delay={(i % 3) * 0.08}>
              <div className="tt-top">
                <h3>{t.name}</h3>
                <p className="tt-ur urdu">{t.urName}</p>
              </div>
              <p className="tt-blurb">{t.blurb}</p>
              <span className="tt-voice">{t.voice}</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="tt-foot">
          <Link href="/templates" className="btn">
            Browse all {TEMPLATES.length} <span className="arr" aria-hidden="true">↗</span>
          </Link>
          <Link href="/studio" className="btn-ghost">Or describe your own out loud</Link>
        </Reveal>
      </div>
    </section>
  );
}
