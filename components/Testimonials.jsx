'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '@/lib/content';
import Reveal from './Reveal';

const ROTATE_MS = 8000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);

  const go = useCallback((i) => {
    setActive((i + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-advance, but only while the section is on screen and the user isn't
  // interacting with it. Reduced-motion users get no rotation at all.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = null;
    let visible = false;

    const tick = () => setActive((i) => (i + 1) % TESTIMONIALS.length);
    const sync = () => {
      clearInterval(timer);
      timer = visible && !paused ? setInterval(tick, ROTATE_MS) : null;
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.3 });
    io.observe(el);

    return () => { clearInterval(timer); io.disconnect(); };
  }, [paused]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="wrap">
        <Reveal className="shead">
          <h2>In their <em>words</em></h2>
          <p>
            The measure of this work isn&rsquo;t the architecture diagram — it&rsquo;s whether the
            people running the operation would do it again. Here&rsquo;s what a few of them say.
          </p>
        </Reveal>

        <Reveal className="tst-stage">
          <div className="tst-quote-box" aria-live="polite">
            <span className="tst-mark" aria-hidden="true">&ldquo;</span>
            {TESTIMONIALS.map((t, i) => (
              <figure
                className={`tst-slide${i === active ? ' active' : ''}`}
                key={t.company}
                aria-hidden={i === active ? undefined : 'true'}
              >
                <blockquote>{t.quote}</blockquote>
                <figcaption className="tst-attr">
                  <span className="tst-avatar" aria-hidden="true">{t.initials}</span>
                  <span className="tst-who">
                    <strong>{t.name}</strong>
                    <span>{t.role} · {t.company}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="tst-side" onKeyDown={onKeyDown}>
            <div className="tst-rail" role="group" aria-label="Choose a client testimonial">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.company}
                  type="button"
                  className={`tst-tab${i === active ? ' on' : ''}`}
                  aria-pressed={i === active}
                  onClick={() => go(i)}
                >
                  <span className="dot" aria-hidden="true" />
                  <span className="co">{t.company}</span>
                  <span className="who">{t.name}</span>
                </button>
              ))}
            </div>

            <div className="tst-nav">
              <button className="tst-arrow" onClick={() => go(active - 1)} aria-label="Previous testimonial">←</button>
              <button className="tst-arrow" onClick={() => go(active + 1)} aria-label="Next testimonial">→</button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
