import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import AgentAtWork from '@/components/AgentAtWork';
import Edge from '@/components/Edge';
import VoiceAgents from '@/components/VoiceAgents';
import Sectors from '@/components/Sectors';
import Integrations from '@/components/Integrations';
import DashboardShowcase from '@/components/DashboardShowcase';
import Confidential from '@/components/Confidential';
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
 *   Dashboards  — reporting ships with the agent
 *   Confidential— the objection that stops regulated buyers
 *   WhyVoice    — the market case, sourced
 *   Closing     — one action
 *
 * Long-form lives on its own route. Adding a section here is almost always the
 * wrong move — give it a page. The engine layer used to sit between Sectors and
 * Dashboards; it was cut because the home page had become unreadable and that
 * section is covered in full on /how-it-works.
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
        <DashboardShowcase />
        <Confidential />
        <WhyVoice />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
