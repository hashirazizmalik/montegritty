import Link from 'next/link';
import { CONTACT, FOOTER, SOCIAL } from '@/lib/content';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Logo href="/" />
            <p>{FOOTER.blurb}</p>
            <Link href={FOOTER.about.href} className="foot-about">{FOOTER.about.label} &rarr;</Link>
          </div>

          {FOOTER.columns.map((col) => (
            <div className="foot-col" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => (
                <Link href={l.href} key={l.href}>{l.label}</Link>
              ))}
            </div>
          ))}

          <div className="foot-col">
            <h4>Reach us</h4>
            <a href={CONTACT.phoneLink}>{CONTACT.phoneDisplay}</a>
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
              WhatsApp {CONTACT.whatsappDisplay}
            </a>
            {SOCIAL.map((s) => (
              <a href={s.href} key={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
            <p>{CONTACT.hours}</p>
            <p>Pakistan-based, remote-first</p>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="copy">© {new Date().getFullYear()} Montegritty. All rights reserved.</span>
          <span className="copy">Voice AI · Urdu · Pashto · Sindhi · English</span>
        </div>
      </div>
    </footer>
  );
}
