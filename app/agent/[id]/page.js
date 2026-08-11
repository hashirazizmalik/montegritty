import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgentTalk from '@/components/AgentTalk';

export const metadata = {
  title: 'Talk to this agent — Montegritty',
  description: 'A live Urdu voice agent built with Montegritty. Press start and talk to it.',
  // These are one-off demo agents, not content anyone should land on from search.
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AgentPage({ params }) {
  const { id } = await params;

  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="wrap">
            <Link href="/studio" className="ag-back">&larr; Voice studio</Link>
            <h1>Say <em>hello</em></h1>
            <p className="lede">
              This is a live voice agent. Press start, allow the microphone, and talk to
              it the way you would talk to a person — in Urdu, English, or both at once.
            </p>
          </div>
        </section>

        <section style={{ paddingTop: 60 }}>
          <div className="wrap">
            <AgentTalk assistantId={id} />

            <p className="agent-note">
              Demo agents expire and cannot see your systems. To put one on a real phone
              line, wired into your data, <Link href="/contact">start a conversation</Link>{' '}
              — or <Link href="/studio">build another</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
