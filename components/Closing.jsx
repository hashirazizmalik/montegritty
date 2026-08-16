import Link from 'next/link';
import Reveal from './Reveal';
import { CONTACT } from '@/lib/content';

/** One action, at the end. Not a form — the form is on /contact. */
export default function Closing() {
  return (
    <section id="closing">
      <div className="wrap cta">
        <Reveal>
          <h2>Which call would you <em>hand over first?</em></h2>
          <p>
            Tell us the call your team makes most often. Within a week we will tell you
            whether an agent is worth building for it, and what it would take.
          </p>
          <div className="closing-actions">
            <Link href="/contact" className="btn">
              Start the conversation <span className="arr" aria-hidden="true">↗</span>
            </Link>
            <a href={CONTACT.phoneLink} className="btn-ghost">Or call {CONTACT.phoneDisplay}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
