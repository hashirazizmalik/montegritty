'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#verticals', label: 'Verticals' },
  { href: '#testimonials', label: 'Clients' },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <header className={solid ? 'solid' : ''}>
      <div className="wrap nav">
        <Logo />
        <nav className={`navlinks${open ? ' open' : ''}`} id="menu">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Start a project</a>
        </nav>
        <button
          className={`burger${open ? ' x' : ''}`}
          onClick={() => setOpen((v) => !v)}
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
