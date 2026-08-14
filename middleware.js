import { NextResponse } from 'next/server';

/**
 * Subdomain routing: shakir.montegritty.com serves /c/shakir.
 *
 * Requires a wildcard domain (*.montegritty.com) added in Vercel and a
 * wildcard CNAME in DNS. Until that exists, /c/shakir works everywhere and
 * this simply never matches.
 *
 * Hosts that are the site itself — the apex, www, and *.vercel.app preview
 * URLs — are left alone.
 */
const RESERVED = new Set(['www', 'admin', 'app', 'api', 'staging', 'preview']);

export function middleware(request) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  const { pathname } = request.nextUrl;

  // Never rewrite internals, assets, or an already-correct path.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/c/') ||
    pathname.startsWith('/embed/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const parts = host.split('.');
  // A client subdomain needs at least three labels (client.example.com) and a
  // registrable root — vercel.app deployment URLs are not that.
  const isVercelPreview = host.endsWith('.vercel.app');
  if (parts.length < 3 || isVercelPreview) return NextResponse.next();

  const sub = parts[0];
  if (RESERVED.has(sub)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/c/${sub}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
