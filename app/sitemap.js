import { SITE_URL } from '@/lib/seo';
import { AGENTS } from '@/lib/agents';

export default function sitemap() {
  const now = new Date();
  const page = (path, priority) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority,
  });

  return [
    page('', 1),
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
