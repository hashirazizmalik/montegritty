import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Verticals from '@/components/Verticals';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Industries We Build Voice Agents For — Montegritty',
  description:
    'Voice agents for telecom and ISPs, healthcare and diagnostics, e-commerce and logistics, banking and microfinance, education networks, and public-sector outreach in Pakistan.',
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industries We Build Voice Agents For — Montegritty',
    description:
      'Where voice agents earn their keep: telecom, healthcare, e-commerce, lending, education and public outreach.',
    url: '/industries',
    type: 'website',
  },
};

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">Where we go deep</span>
            <h1>The calls worth <em>automating first</em></h1>
            <p className="lede">
              A voice agent pays for itself where the same conversation happens thousands
              of times a day and each missed one costs money. These are the six operations
              where that arithmetic is clearest in Pakistan — and where most of our work is.
            </p>
          </div>
        </section>

        <section style={{ paddingTop: 90 }}>
          <Verticals />
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="wrap cta">
            <Reveal>
              <h2>Not on the list? <em>Still call us.</em></h2>
              <p>
                The industry matters less than the shape of the call. If your team makes or
                takes the same conversation hundreds of times a week, there is an agent in it.
              </p>
              <Link href="/contact" className="btn">
                Start the conversation <span className="arr" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
