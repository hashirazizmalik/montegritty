import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Studio from '@/components/Studio';
import Reveal from '@/components/Reveal';
import { hasKey } from '@/lib/uplift';

export const metadata = {
  title: 'Voice Studio — Build an Agent by Talking to It | Montegritty',
  description:
    'Describe the call you want handled, out loud, in Urdu or English. The studio interviews you, builds a working voice agent, and gives you a link anyone can talk to.',
  alternates: { canonical: '/studio' },
  openGraph: {
    title: 'Build a voice agent by talking to it — Montegritty Studio',
    description: 'Describe it out loud in Urdu or English and get a working agent with a shareable link.',
    url: '/studio',
    type: 'website',
  },
};

// The studio talks to a live API, so it must never be captured at build time.
export const dynamic = 'force-dynamic';

export default function StudioPage() {
  const configured = hasKey();

  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">Voice studio</span>
            <h1>Build it by <em>talking to it</em></h1>
            <p className="lede">
              Tell it what call you want handled and it asks the questions we would ask —
              the language, who is on the other end, what the agent must never say. Then
              it builds the thing and hands you a link.
            </p>
          </div>
        </section>

        <section style={{ paddingTop: 70 }}>
          <div className="wrap">
            {configured ? (
              <Studio />
            ) : (
              <div className="studio-off">
                <h3>The studio is not switched on for this deployment</h3>
                <p>
                  It needs an <code>UPLIFT_API_KEY</code> in the environment to create
                  agents. Add it in Vercel under Settings → Environment Variables, then
                  redeploy. Everything else on this page works without it.
                </p>
                <Link href="/templates" className="btn">
                  Browse the templates instead <span className="arr" aria-hidden="true">↗</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section style={{ paddingTop: 30 }}>
          <div className="wrap">
            <Reveal className="shead">
              <div>
                <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
                  What you just built
                </span>
                <h2>A demo, and then <em>the real one</em></h2>
              </div>
              <p>
                What the studio produces is a working agent you can talk to and share —
                genuinely live, not a mock-up. It is still a demo: it expires, it has no
                phone number, and it cannot see your systems.
              </p>
            </Reveal>

            <div className="pill-grid">
              <div className="pill-card">
                <span className="n">01</span>
                <h3>Put it on a phone line</h3>
                <p>
                  Browser agents are for showing people. A production agent sits behind a
                  SIP trunk or your PBX so it answers the number your customers already dial.
                </p>
              </div>
              <div className="pill-card">
                <span className="n">02</span>
                <h3>Give it your data</h3>
                <p>
                  An agent that cannot read your order feed, CRM or billing stack is a
                  recording. Wiring it in is what makes the answers true.
                </p>
              </div>
              <div className="pill-card">
                <span className="n">03</span>
                <h3>Prove it moved a number</h3>
                <p>
                  We scope a pilot against one metric — return rate, no-show rate,
                  collection efficiency — and measure it on your traffic.
                </p>
              </div>
            </div>

            <div className="ag-custom-cta" style={{ marginTop: 44 }}>
              <Link href="/contact" className="btn">
                Take it to production <span className="arr" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
