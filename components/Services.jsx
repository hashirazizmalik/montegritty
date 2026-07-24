'use client';

import { useState } from 'react';
import { UMBRELLAS } from '@/lib/content';
import Reveal from './Reveal';

export default function Services() {
  // first umbrella open on load so the section never reads as an empty list
  const [open, setOpen] = useState(UMBRELLAS[0].id);

  const toggle = (id) => setOpen((cur) => (cur === id ? null : id));

  return (
    <section id="services">
      <div className="wrap">
        <Reveal className="shead">
          <h2>What we <em>build</em></h2>
          <p>
            Three disciplines, one mandate: give teams software that fits the way they actually
            operate. No off-the-shelf compromises — every engagement is shaped around your
            processes, your data, and your constraints.
          </p>
        </Reveal>

        <div className="umb-list">
          {UMBRELLAS.map((u, i) => {
            const isOpen = open === u.id;
            return (
              <Reveal key={u.id} className={`umb${isOpen ? ' open' : ''}`} delay={i * 0.08}>
                <button
                  className="umb-head"
                  onClick={() => toggle(u.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${u.id}`}
                  id={`tab-${u.id}`}
                >
                  <span className="umb-num">{u.num}</span>
                  <h3 className="umb-name">{u.name}</h3>
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
                          <a className="svc" key={s.name} href="#contact">
                            <span className="svc-num">
                              {u.num}.{String(j + 1).padStart(2, '0')}
                            </span>
                            <span className="svc-mid">
                              <h4 className="svc-name">{s.name}</h4>
                            </span>
                            <span className="svc-desc">{s.desc}</span>
                            <span className="svc-go" aria-hidden="true">↗</span>
                          </a>
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
    </section>
  );
}
