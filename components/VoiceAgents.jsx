import Link from 'next/link';
import { AGENTS } from '@/lib/agents';
import { VOICE_AGENTS } from '@/lib/content';
import AgentShowcase from './AgentShowcase';
import Reveal from './Reveal';

export default function VoiceAgents() {
  const [head, headEm] = VOICE_AGENTS.heading;

  return (
    <section id="voice-agents">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
              {VOICE_AGENTS.eyebrow}
            </span>
            <h2>Hear one <em>before you build</em></h2>
          </div>
          <p>
            Eight agents we have already built, each handling a real call in Urdu.
            Press play for the voice, hover the portrait for a taste, or open any of
            them for the full recording and a transcript you can follow line by line.
          </p>
        </Reveal>

        <Reveal>
          <AgentShowcase agents={AGENTS} sampleOnly />
        </Reveal>

        <Reveal className="vert-also" style={{ marginTop: 48 }}>
          <span className="vert-also-label">Or skip the demos</span>
          <div className="vert-also-pills">
            <Link href="/templates">Deploy a ready-made template &rarr;</Link>
            <Link href="/studio">Build one by talking &rarr;</Link>
            <Link href="/voice-agents">Briefs &amp; transcripts &rarr;</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
