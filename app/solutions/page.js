import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import VoiceModels from '@/components/VoiceModels';
import Reveal from '@/components/Reveal';
import { SOLUTIONS_PAGE } from '@/lib/content';

export const metadata = {
  title: 'Voice Agents, Voice Models & Automation — Montegritty',
  description:
    'What Montegritty builds: voice agents that make and take calls in Urdu, Pashto and Sindhi; custom-finetuned speech models deployed self-hosted or cloud-hosted; and the automation that wires them into your systems.',
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'Voice Agents, Voice Models & Automation — Montegritty',
    description:
      'Voice agents, custom speech models, and the integration work that puts them into production.',
    url: '/solutions',
    type: 'website',
  },
};

export default function SolutionsPage() {
  const [head, headEm] = SOLUTIONS_PAGE.heading;

  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">{SOLUTIONS_PAGE.eyebrow}</span>
            <h1>{head}<em>{headEm}</em></h1>
            <p className="lede">{SOLUTIONS_PAGE.lede}</p>
          </div>
        </section>

        <section style={{ paddingTop: 90 }}>
          <Services />
        </section>

        <VoiceModels />

        <section style={{ paddingTop: 0 }}>
          <div className="wrap cta">
            <Reveal>
              <h2>Hear it before you <em>buy it</em></h2>
              <p>
                Eight agents we have already built, each with a full recorded call and a
                transcript you can follow line by line.
              </p>
              <Link href="/voice-agents" className="btn">
                Listen to the demos <span className="arr" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
