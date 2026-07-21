import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Verticals from '@/components/Verticals';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Verticals />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
