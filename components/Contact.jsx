'use client';

import { useState } from 'react';
import { CONTACT } from '@/lib/content';
import Reveal from './Reveal';
import PhoneIcon from './PhoneIcon';
import WhatsAppIcon from './WhatsAppIcon';

const EMPTY = { name: '', email: '', company: '', message: '' };

function buildWhatsAppMessage({ name, email, company, message }) {
  const lines = ['New enquiry from the Montegritty website', '', `Name: ${name}`, `Email: ${email}`];
  if (company.trim()) lines.push(`Company: ${company.trim()}`);
  lines.push('', message.trim());
  return lines.join('\n');
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sent | error
  const [note, setNote] = useState('');

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

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const text = buildWhatsAppMessage(form);
    const url = `${CONTACT.whatsappLink}?text=${encodeURIComponent(text)}`;

    // window.open must fire synchronously inside the click handler — no fetch or
    // await before it — or browsers treat it as an unrequested popup and block it.
    const win = window.open(url, '_blank', 'noopener,noreferrer');

    if (win) {
      setStatus('sent');
      setNote('WhatsApp opened in a new tab — send the message there to finish your enquiry.');
      setForm(EMPTY);
    } else {
      setStatus('error');
      setNote('Your browser blocked the popup — use the WhatsApp button below instead.');
    }
  };

  return (
    <section id="contact" className="cta">
      <Reveal className="wrap">
        <span className="eyebrow" style={{ justifyContent: 'center', display: 'flex', marginBottom: 24 }}>
          Get in touch
        </span>
        <h2>Bring us the process<br />that <em>keeps you up</em> at night.</h2>
        <p>Tell us what you&rsquo;re dealing with and we&rsquo;ll pick it up on WhatsApp.</p>

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
            <button type="submit" className="btn">Send via WhatsApp <span className="arr">↗</span></button>
            <span className={`form-note ${status === 'error' ? 'bad' : 'ok'}${note ? ' show' : ''}`} role="status">
              {note}
            </span>
          </div>
        </form>

        <div className="call-row">
          <span className="call-sep">or reach us directly</span>
          <a className="call-btn" href={CONTACT.phoneLink}>
            <PhoneIcon />
            <span className="num">{CONTACT.phoneDisplay}</span>
          </a>
          <a className="call-btn whatsapp" href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span className="num">{CONTACT.whatsappDisplay}</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
