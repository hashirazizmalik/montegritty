import Link from 'next/link';
import { AGENTS } from '@/lib/agents';
import { VOICE_AGENTS } from '@/lib/content';
import AgentGrid from './AgentGrid';
import Reveal from './Reveal';

// Four on the home page, spread across the industries that ask most — the
// remaining four are one click away rather than dumped here.
const FEATURED = ['hassan-support', 'bilal-cod', 'ayesha-clinic', 'fatima-collections'];

export default function VoiceAgents() {
  const [head, headEm] = VOICE_AGENTS.heading;
  const featured = FEATURED.map((id) => AGENTS.find((a) => a.id === id)).filter(Boolean);

  return (
    <section id="voice-agents">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
              {VOICE_AGENTS.eyebrow}
            </span>
            <h2>{head}<em>{headEm}</em></h2>
          </div>
          <p>{VOICE_AGENTS.lede}</p>
        </Reveal>

        <AgentGrid agents={featured} />

        <Reveal className="vert-also" style={{ marginTop: 56 }}>
          <span className="vert-also-label">Four more, and the dashboard</span>
          <div className="vert-also-pills">
            <Link href="/voice-agents">All eight demos &rarr;</Link>
            <Link href="/voice-agents/dashboard">{VOICE_AGENTS.dashboardTeaser.cta} &rarr;</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
