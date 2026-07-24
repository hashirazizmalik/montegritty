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
      'Montegritty designs, builds, and implements custom software, ERP & CRM implementation, and AI automation for operations worldwide that can’t afford to break.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phoneLink.replace('tel:', ''),
      contactType: 'sales',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
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
