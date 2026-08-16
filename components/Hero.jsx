'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { HERO } from '@/lib/content';

// WebGL is browser-only; keep it out of the server render entirely.
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

/**
 * three.js is the largest chunk in the build by a wide margin, and it exists
 * for a decorative point field. Our buyers are reached by phone precisely
 * because they are on mid-range Android on mobile data — the worst possible
 * audience to hand half a megabyte of WebGL. Gate the import on viewport and
 * motion preference, so phones never download it at all. The CSS grid behind
 * it is a complete fallback.
 */
function useDecorativeCanvas() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 900px)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setShow(wide.matches && !still.matches);
    update();
    wide.addEventListener('change', update);
    still.addEventListener('change', update);
    return () => {
      wide.removeEventListener('change', update);
      still.removeEventListener('change', update);
    };
  }, []);

  return show;
}

export default function Hero() {
  const showCanvas = useDecorativeCanvas();

  return (
    <section className="hero">
      <div className="hero-grid" />
      {showCanvas && <HeroCanvas />}
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
