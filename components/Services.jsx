'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UMBRELLAS } from '@/lib/content';
import Reveal from './Reveal';

export default function Services() {
  // first umbrella open on load so the section never reads as an empty list
  const [open, setOpen] = useState(UMBRELLAS[0].id);

  // Footer and service links deep-link to a pillar (/solutions#voice-models).
  // Open the one that was asked for rather than dumping the visitor at the top
  // of a collapsed list.
  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (id && UMBRELLAS.some((u) => u.id === id)) {
      setOpen(id);
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    }
  }, []);

  const toggle = (id) => setOpen((cur) => (cur === id ? null : id));

  return (
    <div className="wrap">
        <div className="umb-list">
          {UMBRELLAS.map((u, i) => {
            const isOpen = open === u.id;
            return (
              <Reveal id={u.id} key={u.id} className={`umb${isOpen ? ' open' : ''}`} delay={i * 0.08}>
                <button
                  className="umb-head"
                  onClick={() => toggle(u.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${u.id}`}
                  id={`tab-${u.id}`}
                >
                  <span className="umb-num">{u.num}</span>
                  <span className="umb-mid">
                    <h3 className="umb-name">{u.name}</h3>
                    <span className="umb-lead">{u.lead}</span>
                  </span>
                  <span className="umb-count">
                    {u.services.length} service{u.services.length > 1 ? 's' : ''}
                  </span>
                  <span className="umb-toggle" aria-hidden="true" />
                </button>

                {/* inert keeps the collapsed links out of the tab order */}
                <div
                  className="umb-panel"
                  id={`panel-${u.id}`}
                  role="region"
                  aria-labelledby={`tab-${u.id}`}
                  inert={!isOpen}
                >
                  <div className="umb-panel-inner">
                    <div className="umb-sub">
                      <div className="svc-list">
                        {u.services.map((s, j) => (
                          <Link className="svc" key={s.name} href={s.href}>
                            <span className="svc-num">
                              {u.num}.{String(j + 1).padStart(2, '0')}
                            </span>
                            <span className="svc-mid">
                              <h4 className="svc-name">{s.name}</h4>
                            </span>
                            <span className="svc-desc">{s.desc}</span>
                            <span className="svc-go" aria-hidden="true">↗</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
    </div>
  );
}
