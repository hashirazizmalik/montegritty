import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Edge from '@/components/Edge';
import VoiceAgents from '@/components/VoiceAgents';
import Sectors from '@/components/Sectors';
import Engines from '@/components/Engines';
import DashboardShowcase from '@/components/DashboardShowcase';
import Confidential from '@/components/Confidential';
import WhyVoice from '@/components/WhyVoice';
import Closing from '@/components/Closing';
import Footer from '@/components/Footer';

/**
 * The home page answers, in order: what is this, why believe it, who is it for,
 * what is underneath, what do I get, why now, what do I do.
 *
 *   Hero        — the problem, in the buyer's words
 *   Edge        — why this is not another template gallery
 *   VoiceAgents — the proof, because it is the one thing a competitor cannot fake
 *   Sectors     — healthcare, education, front desk, each linking to its own page
 *   Engines     — not locked to one vendor
 *   Dashboards  — reporting ships with the agent
 *   Confidential— the objection that stops regulated buyers
 *   WhyVoice    — the market case, sourced
 *   Closing     — one action
 *
 * Long-form lives on its own route. Adding a section here is almost always the
 * wrong move — give it a page.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Edge />
        <VoiceAgents />
        <Sectors />
        <Engines />
        <DashboardShowcase />
        <Confidential />
        <WhyVoice />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
