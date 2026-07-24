'use client';

import dynamic from 'next/dynamic';

// WebGL is browser-only; keep it out of the server render entirely.
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <HeroCanvas />
      <div className="wrap">
        <span className="eyebrow hero-tag">Enterprise digital solutions</span>
        <h1>
          <span className="ln"><span>Systems that</span></span>
          <span className="ln"><span>carry the weight</span></span>
          <span className="ln"><span>of <em>real work.</em></span></span>
        </h1>
        <div className="hero-sub">
          <p>
            Montegritty designs, builds, and implements custom software, ERP &amp; CRM
            implementation, and AI automation for operations worldwide that can&rsquo;t afford
            to break. We turn tangled processes into infrastructure you can trust.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn">Begin the conversation <span className="arr">↗</span></a>
            <a href="#services" className="btn-ghost">Explore services</a>
          </div>
        </div>
      </div>
      <div className="hero-stats">
        <div className="big serif">13</div>
        <div className="mono">services, three disciplines</div>
      </div>
    </section>
  );
}
