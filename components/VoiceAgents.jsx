import Link from 'next/link';
import { AGENTS } from '@/lib/agents';
import { TEMPLATES } from '@/lib/templates';
import AgentCarousel from './AgentCarousel';
import Reveal from './Reveal';

// A shortlist on the home page; all of them live on /agents.
const HOME_AGENTS = ['ayesha-clinic', 'saad-chroniccare', 'sana-school', 'bilal-cod', 'hassan-support', 'kamran-leads'];

/**
 * The proof band. This is the one thing a self-serve competitor cannot fake —
 * a gallery of templates nobody has deployed is not evidence — so it sits high
 * and speaks plainly.
 */
export default function VoiceAgents() {
  const shown = HOME_AGENTS.map((id) => AGENTS.find((a) => a.id === id)).filter(Boolean);

  return (
    <section id="proof">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
              Proof, not a promise
            </span>
            <h2>Listen before you <em>believe us</em></h2>
          </div>
          <p>
            Every voice here is a working Montegritty agent handling a real call in Urdu.
            Press play, or open any of them for the full recording and transcript.
          </p>
        </Reveal>

        <Reveal><AgentCarousel agents={shown} /></Reveal>

        <Reveal className="vert-also" style={{ marginTop: 48 }}>
          <span className="vert-also-label">All {AGENTS.length} agents · {TEMPLATES.length} templates</span>
          <div className="vert-also-pills">
            <Link href="/agents">Hear every one &rarr;</Link>
            <Link href="/voice-agents/dashboard">See the reporting &rarr;</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
