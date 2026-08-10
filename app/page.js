import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Pillars from '@/components/Pillars';
import VoiceAgents from '@/components/VoiceAgents';
import WhyVoice from '@/components/WhyVoice';
import CustomAgentPanel from '@/components/CustomAgentPanel';
import Footer from '@/components/Footer';

/**
 * The home page introduces and routes; it does not contain the whole site.
 * The services accordion lives on /solutions, the full industry grid on
 * /industries, the method on /process, and the enquiry form on /contact.
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
        <Pillars />
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
