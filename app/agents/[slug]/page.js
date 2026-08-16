import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CallPlayer from '@/components/CallPlayer';
import Reveal from '@/components/Reveal';
import { AGENTS, getAgent } from '@/lib/agents';
import { SITE_URL } from '@/lib/seo';

export function generateStaticParams() {
  return AGENTS.map((a) => ({ slug: a.id }));
}

/** Seconds → ISO 8601 duration, which is what schema.org expects. */
function isoDuration(seconds) {
  const total = Math.round(seconds);
  return `PT${Math.floor(total / 60)}M${total % 60}S`;
}

/** "PKR 450,000" → { currency, amount } for priceSpecification. */
function parsePrice(value) {
  const amount = value.replace(/[^\d.]/g, '');
  return amount ? { priceCurrency: 'PKR', price: amount } : null;
}

/**
 * The recorded call is the most valuable and least copyable thing on this site,
 * and it shipped as a bare <audio> tag that no machine could identify. This
 * declares it: what language it is in, how long it runs, and that a full
 * transcript accompanies it.
 */
function AgentSchema({ agent }) {
  const url = `${SITE_URL}/agents/${agent.id}`;
  const transcript = agent.turns
    .map((t) => `${t.who === 'agent' ? agent.name : 'Caller'}: ${t.ur} — ${t.en}`)
    .join('\n');

  const setup = parsePrice(agent.pricing.setup);
  const monthly = parsePrice(agent.pricing.monthly);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AudioObject',
        '@id': `${url}#call`,
        name: `${agent.name} — a full ${agent.vertical.toLowerCase()} call in Urdu`,
        description: agent.tagline,
        contentUrl: `${SITE_URL}${agent.call}`,
        encodingFormat: 'audio/mpeg',
        inLanguage: 'ur-PK',
        duration: isoDuration(agent.duration),
        transcript,
        thumbnailUrl: `${SITE_URL}${agent.portrait}`,
        isPartOf: { '@id': url },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `${agent.name} — ${agent.role}`,
        serviceType: 'Agentic voice agent deployment',
        description: agent.solution,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'Pakistan' },
        availableLanguage: ['ur', 'en'],
        audience: { '@type': 'BusinessAudience', audienceType: agent.vertical },
        ...(setup && monthly
          ? {
              offers: {
                '@type': 'Offer',
                priceCurrency: 'PKR',
                priceSpecification: [
                  { '@type': 'UnitPriceSpecification', name: 'One-time setup', ...setup },
                  {
                    '@type': 'UnitPriceSpecification',
                    name: 'Monthly licence',
                    ...monthly,
                    referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
                  },
                ],
              },
            }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Agents', item: `${SITE_URL}/agents` },
          { '@type': 'ListItem', position: 2, name: agent.name, item: url },
        ],
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return {};
  return {
    title: `${agent.name} — ${agent.role} | Montegritty Voice Agents`,
    description: `${agent.tagline} An agentic Urdu voice agent for ${agent.vertical.toLowerCase()} — hear the full recorded call and read the bilingual transcript.`,
    alternates: { canonical: `/agents/${agent.id}` },
    openGraph: {
      title: `${agent.name} — ${agent.role}`,
      description: agent.tagline,
      url: `/agents/${agent.id}`,
      type: 'website',
    },
  };
}

export default async function AgentPage({ params }) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();

  const others = AGENTS.filter((a) => a.id !== agent.id).slice(0, 3);
  // Floor, not round — so this matches the player's own clock exactly.
  const mins = Math.floor(agent.duration / 60);
  const secs = String(Math.floor(agent.duration % 60)).padStart(2, '0');

  return (
    <>
      <Header />
      <main>
        <AgentSchema agent={agent} />

        <section className="ag-hero">
          <div className="wrap">
            <Link href="/agents" className="ag-back">&larr; All agents</Link>
            {/* Role is printed as written — lowercasing it turned "COD" into "cod". */}
            <h1>{agent.name}, <em>{agent.role}</em></h1>
            <div className="ag-hero-sub">
              <p>{agent.tagline}</p>
              <div className="ag-spec">
                <dl>
                  <dt>Built for</dt><dd>{agent.vertical}</dd>
                  <dt>Voice</dt><dd>{agent.voice}</dd>
                  <dt>Call length</dt><dd>{mins}:{secs}</dd>
                  <dt>Channels</dt><dd>Phone · WhatsApp · Web</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 80 }}>
          <div className="wrap">
            <Reveal>
              <span className="eyebrow" style={{ marginBottom: 28, display: 'inline-flex' }}>
                Listen to the call
              </span>
              <CallPlayer agent={agent} />
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 40 }}>
          <div className="wrap">
            <Reveal className="ag-two">
              <div className="ag-block">
                <h3 className="bad">What it costs today</h3>
                <p>{agent.problem}</p>
              </div>
              <div className="ag-block">
                <h3>What {agent.name} does instead</h3>
                <p>{agent.solution}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 40 }}>
          <div className="wrap">
            <Reveal className="shead">
              <div>
                <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
                  Target impact
                </span>
                <h2>What it is <em>hired to move</em></h2>
              </div>
              <p>
                Modelled from published industry benchmarks, not measured from a live
                deployment. We agree them as the pilot&rsquo;s success criteria, then prove
                them on your data.
              </p>
            </Reveal>
            <div className="ag-kpis">
              {agent.kpis.map((k, i) => (
                <Reveal className="ag-kpi" key={k.label} delay={i * 0.1}>
                  <b>{k.value}</b>
                  <span className="k">{k.label}</span>
                  <span className="d">{k.note}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 40 }}>
          <div className="wrap">
            <Reveal className="shead">
              <div>
                <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
                  Integration &amp; commercials
                </span>
                <h2>What it <em>plugs into</em></h2>
              </div>
              <p>
                An agent that cannot read your systems is a recording. {agent.name} is
                wired into the ones that hold the answers, and writes every outcome back.
              </p>
            </Reveal>

            <Reveal className="vert-also" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
              <div className="vert-also-pills">
                {agent.integrations.map((x) => (
                  <span
                    key={x}
                    style={{
                      fontFamily: 'var(--font-mono), ui-monospace, monospace',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      border: '1px solid var(--line)',
                      borderRadius: 40,
                      padding: '10px 18px',
                    }}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="ag-price" style={{ marginTop: 48 }}>
              <div><span>One-time setup</span><b>{agent.pricing.setup}</b></div>
              <div><span>Monthly licence</span><b>{agent.pricing.monthly}</b></div>
              <div><span>Included volume</span><b>{agent.pricing.included}</b></div>
              <div><span>Beyond that</span><b>{agent.pricing.overage}</b></div>
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 40 }}>
          <div className="wrap">
            <Reveal className="shead">
              <div>
                <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>
                  Keep listening
                </span>
                <h2>Other agents <em>we&rsquo;ve built</em></h2>
              </div>
              <p />
            </Reveal>
            <div className="ag-next">
              {others.map((o) => (
                <Link href={`/agents/${o.id}`} key={o.id}>
                  <span>{o.vertical}</span>
                  <strong>{o.name}</strong>
                  <span>{o.role}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
