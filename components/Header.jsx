'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { NAV } from '@/lib/content';
import Logo from './Logo';

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Tapping a link triggers an instant browser navigation while the page's own
  // viewport is briefly unstable (mobile toolbar show/hide during the scroll) —
  // which throws off the panel's `translateY(-100%)`, since that percentage is
  // relative to the panel's own (viewport-driven) height. A transition:none jump
  // still lands on that moving target. display:none has no percentage math and
  // no animation to land badly, so it can't glitch.
  const closeForNav = () => {
    const el = navRef.current;
    if (el) el.style.display = 'none';
    setOpen(false);
  };

  // Restore normal rendering before the burger's own toggle, so the slide
  // animation still works when the menu is reopened.
  const toggleBurger = () => {
    const el = navRef.current;
    if (el) el.style.display = '';
    setOpen((v) => !v);
  };

  return (
    <header className={`site-header${solid ? ' solid' : ''}`}>
      <div className="wrap nav">
        <Logo href="/" />
        <nav className={`navlinks${open ? ' open' : ''}`} id="menu" ref={navRef}>
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} onClick={closeForNav}>{l.label}</Link>
          ))}
          <Link href="/contact" className="nav-cta" onClick={closeForNav}>Start a project</Link>
        </nav>
        <button
          className={`burger${open ? ' x' : ''}`}
          onClick={toggleBurger}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
