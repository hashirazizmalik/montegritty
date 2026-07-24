import { SITE_URL } from '@/lib/seo';

export default function sitemap() {
  // Single page today. Add an entry here for every new route as the site
  // grows into dedicated service/industry pages and a blog.
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
