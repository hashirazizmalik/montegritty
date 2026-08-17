import { SITE_URL } from '@/lib/seo';
import { CONTACT } from '@/lib/content';

/**
 * Site-wide structured data: who this company is, and what the site is.
 *
 * `@id` matters more than it looks. Every other block on the site (Service,
 * AudioObject, FAQPage) points its publisher/provider at these two URIs, so
 * search and answer engines resolve one entity rather than a dozen unlinked
 * mentions of the same name.
 *
 * `sameAs` is the field that most directly improves AI retrieval — it is how a
 * model confirms the LinkedIn page, the directory listing and this site all
 * describe one company. Add each profile here the day it is claimed.
 */
export default function OrganizationSchema() {
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Montegritty',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon.png`,
      caption: 'Montegritty',
    },
    description:
      "Montegritty builds Pakistan's first Urdu-first agentic voice AI agents — voice agents that hold a phone conversation in Urdu and take action during the call, booking appointments, confirming orders and writing outcomes back into the customer's own CRM, ERP or booking system.",
    slogan: 'Most voice AI only talks. Ours does the work.',
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    knowsLanguage: ['ur', 'en', 'ps', 'sd'],
    knowsAbout: [
      'Agentic voice AI',
      'Urdu speech recognition',
      'Urdu text to speech',
      'Voice agent systems integration',
      'Call centre automation',
      'Appointment reminder calls',
      'Cash on delivery order confirmation',
    ],
    // The field that most directly improves AI retrieval: it is how a model
    // confirms the profile and this site describe one entity. Both checked
    // live (200) before being added — an unresolvable sameAs is worse than
    // none. Add more here the day they are claimed.
    sameAs: [
      'https://www.linkedin.com/company/montegritty/',
      'https://www.instagram.com/montegritty',
    ],
    makesOffer: [
      'Urdu-first agentic voice agents',
      'Voice agent integration with CRM, ERP and booking systems',
      'Self-hosted voice AI deployment',
      'Custom speech-to-text and text-to-speech models',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phoneLink.replace('tel:', ''),
      contactType: 'sales',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Urdu'],
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Montegritty',
    description: "Pakistan's first Urdu-first agentic voice agents.",
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [organization, website],
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
