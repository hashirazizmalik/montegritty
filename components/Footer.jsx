import { CONTACT } from '@/lib/content';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Logo />
            <p>
              Enterprise digital solutions for operations that can&rsquo;t afford to break.
              Software, AI, and growth systems — built with rigor.
            </p>
          </div>
          <div className="foot-col">
            <h4>Navigate</h4>
            <a href="#services">Services</a>
            <a href="#voice-models">Voice AI</a>
            <a href="#process">Process</a>
            <a href="#verticals">Verticals</a>
            <a href="#testimonials">Clients</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="foot-col">
            <h4>Reach us</h4>
            <a href={CONTACT.phoneLink}>{CONTACT.phoneDisplay}</a>
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
              WhatsApp {CONTACT.whatsappDisplay}
            </a>
            <p>{CONTACT.hours}</p>
            <p>Remote-first, globally available</p>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="copy">© {new Date().getFullYear()} Montegritty. All rights reserved.</span>
          <a className="parent" href="#top">
            <span className="pz">Z</span>
            <span className="ptxt">A <b>Zoue Tech</b> company</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
