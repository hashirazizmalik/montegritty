import { VOICE_MODELS } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';
import Reveal from './Reveal';

// Service + FAQPage structured data, colocated with the content it describes.
// FAQPage schema is also what most AI answer engines (and Google's featured
// snippets) lift verbatim, so the copy here is written as direct, quotable
// statements rather than pure marketing prose.
function VoiceModelsSchema() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Custom Voice AI Models',
    serviceType: 'Voice AI / Speech Model Finetuning',
    description:
      'Custom-finetuned speech-to-text and text-to-speech voice models, deployed self-hosted or cloud-hosted, with native support for Urdu, Pashto, and English.',
    provider: { '@type': 'Organization', name: 'Montegritty', url: SITE_URL },
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Urdu', 'Pashto'],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: VOICE_MODELS.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

export default function VoiceModels() {
  return (
    <section id="voice-models">
      <VoiceModelsSchema />
      <div className="wrap">
        <Reveal className="voice-wrap">
          <div className="voice-deco" />
          <span className="eyebrow">Flagship Capability</span>
          <h2>Voice models, deployed the way your business <em>actually</em> needs them.</h2>
          <p className="voice-lede">{VOICE_MODELS.lede}</p>

          <div className="voice-deploy-grid">
            {VOICE_MODELS.deployment.map((d) => (
              <div className="voice-deploy-card" key={d.name}>
                <h3>{d.name}</h3>
                <span className="voice-best">{d.best}</span>
                <ul>
                  {d.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="voice-lang-block">
            <h3>Native &amp; Regional Language Support</h3>
            <div className="voice-lang-grid">
              {VOICE_MODELS.languages.map((l) => (
                <div className="voice-lang-card" key={l.name}>
                  <h4>{l.name}</h4>
                  <span className="voice-lang-sub">{l.sub}</span>
                  <p>{l.body}</p>
                </div>
              ))}
            </div>
            <p className="voice-lang-note">{VOICE_MODELS.languageNote}</p>
          </div>
        </Reveal>

        <Reveal className="voice-faq">
          <h3>Common Questions</h3>
          <div className="voice-faq-list">
            {VOICE_MODELS.faq.map((f) => (
              <div className="voice-faq-item" key={f.q}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
