import { SITE_URL } from '@/lib/seo';
import { AGENTS } from '@/lib/agents';

// A build-time `new Date()` told crawlers every URL changed on every deploy,
// which is how a lastmod signal gets ignored. Bump this by hand when the copy
// on a route actually changes.
const LAST_CONTENT_CHANGE = '2026-08-17';

export default function sitemap() {
  const page = (path, priority) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_CONTENT_CHANGE,
    changeFrequency: 'monthly',
    priority,
  });

  return [
    page('', 1),
    page('/about', 0.75),
    page('/healthcare', 0.95),
    page('/agents', 0.9),
    page('/education', 0.85),
    page('/front-desk', 0.85),
    page('/how-it-works', 0.8),
    page('/contact', 0.7),
    page('/voice-agents/dashboard', 0.6),
    ...AGENTS.map((a) => page(`/agents/${a.id}`, 0.7)),
  ];
}
