// Single source of truth for the site's canonical URL. Used by metadata,
// robots.txt, sitemap.xml, and structured data.
//
// This MUST be the hostname the site is actually served from. It was left on
// the placeholder Vercel domain after montegritty.com went live, which meant
// every canonical tag, every sitemap entry and the robots.txt sitemap
// directive pointed at a host returning 404 — the site told Google to index an
// address that served nothing. Do not change it without checking the new value
// returns 200.
export const SITE_URL = "https://montegritty.com";
