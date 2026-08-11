import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import StartHere from '@/components/StartHere';
import TemplatesTeaser from '@/components/TemplatesTeaser';
import VoiceAgents from '@/components/VoiceAgents';
import WhyVoice from '@/components/WhyVoice';
import CustomAgentPanel from '@/components/CustomAgentPanel';
import Footer from '@/components/Footer';

/**
 * The home page answers one question in order: what can I do here?
 *
 *   Hero        — you can build a voice agent by talking to one
 *   StartHere   — the three ways in, so nobody has to guess
 *   Templates   — proof there is a library, and a route into it
 *   VoiceAgents — proof it sounds real (voice samples only; the full calls
 *                 live on /voice-agents so the home page stays a taste)
 *   WhyVoice    — why this matters in Pakistan specifically
 *
 * Everything long-form lives on its own route: the services accordion on
 * /solutions, industries on /industries, the method on /process, the form on
 * /contact. Adding a section here is almost always the wrong move.
 *
 * <Testimonials /> is deliberately absent — see the note above TESTIMONIALS in
 * lib/content.js. The quotes are unapproved and describe work we no longer sell.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <StartHere />
        <TemplatesTeaser />
        <VoiceAgents />
        <WhyVoice />
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <CustomAgentPanel />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
