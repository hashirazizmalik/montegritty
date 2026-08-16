import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { CONTACT_PAGE } from '@/lib/content';

export const metadata = {
  title: 'Start a Voice Agent Project — Montegritty',
  description:
    'Tell us the call your team makes most often. We scope an agentic Urdu voice agent pilot around it: one call type, one number to move, roughly six weeks.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Start a Voice Agent Project — Montegritty',
    description: 'Tell us the call your team is drowning in and we will scope a pilot around it.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  const [head, headEm] = CONTACT_PAGE.heading;

  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">{CONTACT_PAGE.eyebrow}</span>
            <h1>{head}<em>{headEm}</em></h1>
            <p className="lede">{CONTACT_PAGE.lede}</p>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
