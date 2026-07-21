'use client';

import { useState } from 'react';
import { CONTACT } from '@/lib/content';
import Reveal from './Reveal';
import PhoneIcon from './PhoneIcon';

const SCOPES = [
  { value: '4-6 Weeks', label: 'We need to automate manual workflows' },
  { value: '6-10 Weeks', label: 'We need a website or mobile app built' },
  { value: '8-12 Weeks', label: 'Our sales/service teams need a better CRM' },
  { value: '3-5 Months', label: 'We need a full ERP implementation' },
  { value: '3-6 Months', label: 'We want AI agents or a custom model' },
  { value: '4-6 Months', label: 'We require bespoke system architecture' },
];

const EMPTY = { name: '', email: '', company: '', message: '' };

export default function Contact() {
  const [timeline, setTimeline] = useState(SCOPES[0].value);
  const [swap, setSwap] = useState(false);

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [note, setNote] = useState('');

  // brief fade-out/in so the timeline number doesn't just pop
  const onScopeChange = (e) => {
    const next = e.target.value;
    setSwap(true);
    setTimeout(() => { setTimeline(next); setSwap(false); }, 180);
  };

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Please enter a valid email.';
    if (form.message.trim().length < 12) e.message = 'Tell us a little more — at least a sentence.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (status === 'sending') return;
    if (!validate()) return;

    setStatus('sending');
    setNote('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timeline }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || 'Something went wrong.');

      setStatus('sent');
      setNote(data.message || 'Thanks — we’ll be in touch shortly.');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setNote(`${err.message} You can also call us directly.`);
    }
  };

  return (
    <section id="contact" className="cta">
      <Reveal className="wrap">
        <span className="eyebrow" style={{ justifyContent: 'center', display: 'flex', marginBottom: 24 }}>
          Project Scope
        </span>
        <h2>Bring us the process<br />that <em>keeps you up</em> at night.</h2>
        <p>Get an immediate read on potential timelines, then tell us what you&rsquo;re dealing with.</p>

        <div className="calc-widget">
          <div className="calc-head"><h3>Estimate Timeline</h3></div>
          <div className="calc-opt-group">
            <label className="calc-label" htmlFor="calcType">What is the core challenge?</label>
            <select id="calcType" className="calc-select" onChange={onScopeChange} defaultValue={SCOPES[0].value}>
              {SCOPES.map((s) => <option key={s.label} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div className="calc-result">
            <span>Estimated Target Timeline</span>
            <strong className={swap ? 'swap' : ''}>{timeline}</strong>
          </div>
        </div>

        <form className="form-widget" onSubmit={submit} noValidate>
          <div className="calc-head"><h3>Start the conversation</h3></div>

          <div className={`field${errors.name ? ' err' : ''}`}>
            <label htmlFor="cf-name">Your name</label>
            <input id="cf-name" value={form.name} onChange={set('name')} placeholder="Jane Doe" autoComplete="name" />
            {errors.name && <span className="msg">{errors.name}</span>}
          </div>

          <div className={`field${errors.email ? ' err' : ''}`}>
            <label htmlFor="cf-email">Email</label>
            <input id="cf-email" type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" autoComplete="email" />
            {errors.email && <span className="msg">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="cf-company">Company <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
            <input id="cf-company" value={form.company} onChange={set('company')} placeholder="Company name" autoComplete="organization" />
          </div>

          <div className={`field${errors.message ? ' err' : ''}`}>
            <label htmlFor="cf-message">What are you trying to fix?</label>
            <textarea id="cf-message" value={form.message} onChange={set('message')} placeholder="Describe the process, system, or bottleneck…" />
            {errors.message && <span className="msg">{errors.message}</span>}
          </div>

          <div className="form-foot">
            <button type="submit" className="btn" disabled={status === 'sending'}>
              {status === 'sending' ? <>Sending <span className="spin" /></> : <>Send enquiry <span className="arr">↗</span></>}
            </button>
            <span className={`form-note ${status === 'error' ? 'bad' : 'ok'}${note ? ' show' : ''}`} role="status">
              {note}
            </span>
          </div>
        </form>

        <div className="call-row">
          <span className="call-sep">or call us directly</span>
          <a className="call-btn" href={CONTACT.phoneLink}>
            <PhoneIcon />
            <span className="num">{CONTACT.phoneDisplay}</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
