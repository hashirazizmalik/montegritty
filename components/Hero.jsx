'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { HERO } from '@/lib/content';

// WebGL is browser-only; keep it out of the server render entirely.
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <HeroCanvas />
      <div className="wrap">
        <span className="eyebrow hero-tag">{HERO.eyebrow}</span>
        <h1>
          {HERO.lines.map((l) => (
            <span className="ln" key={l}><span>{l}</span></span>
          ))}
          <span className="ln">
            <span>{HERO.lastLine}<em>{HERO.lastLineEm}</em></span>
          </span>
        </h1>
        <div className="hero-sub">
          <p>{HERO.lede}</p>
          <div className="hero-actions">
            <Link href={HERO.primary.href} className="btn">
              {HERO.primary.label} <span className="arr">↗</span>
            </Link>
            <Link href={HERO.secondary.href} className="btn-ghost">
              {HERO.secondary.label}
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-stats">
        <div className="big serif">{HERO.statBig}</div>
        <div className="mono">{HERO.statLabel}</div>
      </div>
    </section>
  );
}
