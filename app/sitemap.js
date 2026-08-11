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
    page('/templates', 0.95),
    page('/studio', 0.9),
    page('/solutions', 0.9),
    page('/voice-agents', 0.9),
    page('/industries', 0.8),
    page('/process', 0.7),
    page('/contact', 0.7),
    page('/voice-agents/dashboard', 0.6),
    // One entry per demo agent — each is a real landing page for its vertical
    // ("Urdu voice agent for COD confirmation" and so on).
    ...AGENTS.map((a) => page(`/voice-agents/${a.id}`, 0.7)),
  ];
}
