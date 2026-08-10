import { SITE_URL } from '@/lib/seo';
import { CONTACT } from '@/lib/content';

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Montegritty',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description:
      'Montegritty builds voice AI agents for Pakistani operations — inbound and outbound calling in Urdu, Pashto and Sindhi, custom-finetuned speech models, and the automation that connects them to existing systems.',
    areaServed: 'PK',
    knowsLanguage: ['ur', 'ps', 'sd', 'en'],
    makesOffer: [
      'Urdu voice agents', 'Custom speech-to-text and text-to-speech models',
      'Call automation and systems integration',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phoneLink.replace('tel:', ''),
      contactType: 'sales',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Urdu'],
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify of a fixed, developer-authored object — no user input
      // ever flows into this, so there's no injection surface to worry about.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
