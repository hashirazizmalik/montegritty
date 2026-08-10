'use client';

import { useEffect, useRef, useState } from 'react';
import { PROCESS } from '@/lib/content';
import Reveal from './Reveal';

export default function Process() {
  const gridRef = useRef(null);
  const [run, setRun] = useState(false);

  // Bars fill only once the grid is properly in frame — the stagger is the payoff.
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="wrap">
        <Reveal className="proc-wrap">
          <div className="proc-deco" />
          <span className="eyebrow">How we work</span>
          <h2>A method built for systems<br />that must not fail.</h2>
          <div className={`proc-grid${run ? ' in' : ''}`} ref={gridRef}>
            {PROCESS.map((s) => (
              <div className="step" key={s.phase}>
                <div className="bar" />
                <span className="n">{s.phase}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
    </div>
  );
}
