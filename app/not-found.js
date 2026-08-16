import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VERTICALS } from '@/lib/content';

export const metadata = {
  title: 'Page not found — Montegritty',
  robots: { index: false, follow: true },
};

/**
 * A 404 that routes rather than apologises. Three of these links existed as
 * dead hrefs on the live site for weeks, so anyone who followed one landed on
 * the default Next.js page with nowhere to go.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">404</span>
            <h1>That page <em>has moved on</em></h1>
            <p className="lede">
              The link is dead, but the thing you were after is probably one of these.
            </p>
          </div>
        </section>

        <section style={{ paddingTop: 60 }}>
          <div className="wrap">
            <div className="vert-also">
              <span className="vert-also-label">Try instead</span>
              <div className="vert-also-pills">
                <Link href="/agents">Hear the agents</Link>
                {VERTICALS.map((v) => (
                  <Link href={`/${v.slug}`} key={v.slug}>{v.title}</Link>
                ))}
                <Link href="/how-it-works">How it works</Link>
                <Link href="/contact">Start a project</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
