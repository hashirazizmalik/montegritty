import Link from 'next/link';
import { VOICE_AGENTS } from '@/lib/content';
import Reveal from './Reveal';

/**
 * The repositioning beat. It follows the demo gallery everywhere the gallery
 * appears, so nobody reads the eight agents as a menu to order from.
 */
export default function CustomAgentPanel() {
  const [head, headEm] = VOICE_AGENTS.customHeading;

  return (
    <Reveal className="ag-custom">
      <div className="voice-deco" />
      <span className="eyebrow">{VOICE_AGENTS.customEyebrow}</span>
      <h2>{head}<em>{headEm}</em></h2>
      <p>{VOICE_AGENTS.customLede}</p>

      <div className="ag-custom-grid">
        {VOICE_AGENTS.customCards.map((c) => (
          <div className="ag-custom-card" key={c.title}>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </div>
        ))}
      </div>

      <div className="ag-custom-cta">
        <Link href="/contact" className="btn">
          {VOICE_AGENTS.customCta}
          <span className="arr" aria-hidden="true">↗</span>
        </Link>
      </div>
    </Reveal>
  );
}
