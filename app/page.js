import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import AgentAtWork from '@/components/AgentAtWork';
import Edge from '@/components/Edge';
import VoiceAgents from '@/components/VoiceAgents';
import Sectors from '@/components/Sectors';
import Integrations from '@/components/Integrations';
import WhyVoice from '@/components/WhyVoice';
import Closing from '@/components/Closing';
import Footer from '@/components/Footer';

/**
 * The home page answers, in order: what is this, why believe it, who is it for,
 * what is underneath, what do I get, why now, what do I do.
 *
 *   Hero        — most voice AI only talks; ours does the work
 *   AgentAtWork — the same claim, demonstrated: call on the left, the systems
 *                 it touches on the right, moving together
 *   Edge        — what "agentic" means, in three claims
 *   VoiceAgents — the proof, because it is the one thing a competitor cannot fake
 *   Sectors     — healthcare, education, front desk, each linking to its own page
 *   Integrations— the systems it acts on; this is what makes it an agent
 *   WhyVoice    — the problem this exists to solve, sourced
 *   Closing     — one action
 *
 * Long-form lives on its own route. Adding a section here is almost always the
 * wrong move — give it a page. Three sections have been cut from here for
 * length, each because it already exists in full somewhere else: the engine
 * layer and the dashboard showcase live on /how-it-works and
 * /voice-agents/dashboard, and the confidential-deployment band is on all
 * three vertical pages, where the buyer who needs it actually is.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <AgentAtWork />
        <Edge />
        <VoiceAgents />
        <Sectors />
        <Integrations />
        <WhyVoice />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
