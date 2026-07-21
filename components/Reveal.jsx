'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fades + lifts its children in once, when they first scroll into view.
 * `delay` is in seconds and staggers siblings.
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  threshold = 0.15,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already on screen at mount (or no observer support) — show immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal${seen ? ' in' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
