import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TemplateLibrary from '@/components/TemplateLibrary';
import CustomAgentPanel from '@/components/CustomAgentPanel';
import Reveal from '@/components/Reveal';
import { TEMPLATES, CATEGORIES } from '@/lib/templates';

export const metadata = {
  title: 'Ready-Made Urdu Voice Agent Templates — Montegritty',
  description:
    `${TEMPLATES.length} ready-made voice agent templates for Pakistani businesses — support, COD confirmation, appointments, collections, outreach and more. Deploy one and talk to it in your browser.`,
  alternates: { canonical: '/templates' },
  openGraph: {
    title: 'Ready-Made Urdu Voice Agent Templates — Montegritty',
    description: `${TEMPLATES.length} templates you can deploy and talk to in seconds.`,
    url: '/templates',
    type: 'website',
  },
};

export default function TemplatesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">Template library</span>
            <h1>{TEMPLATES.length} agents, <em>already written</em></h1>
            <p className="lede">
              Every template is a complete brief — the voice, the opening line, and the
              rules about what it must never say. Deploy one and it is live in seconds,
              in your browser, with a link you can send to anyone.
            </p>
            <p className="page-sub">
              Across {CATEGORIES.length} sectors · Urdu, English and code-mixed · eight of
              them have a real recorded call you can{' '}
              <Link href="/voice-agents">listen to first</Link>.
            </p>
          </div>
        </section>

        <section style={{ paddingTop: 70 }}>
          <div className="wrap">
            <TemplateLibrary />
          </div>
        </section>

        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="ag-custom">
              <div className="voice-deco" />
              <span className="eyebrow">Nothing fits?</span>
              <h2>Describe yours <em>out loud</em></h2>
              <p>
                The studio interviews you the way we would, then builds the agent while
                you are still on the call. It picks the voice, writes the brief and hands
                you a link — no form, no template, no waiting.
              </p>
              <div className="ag-custom-cta">
                <Link href="/studio" className="btn">
                  Open the studio <span className="arr" aria-hidden="true">↗</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

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
