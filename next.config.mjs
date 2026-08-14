import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // There's an unrelated package-lock.json in the parent user directory; without
  // this, Next infers the wrong workspace root and mis-traces files on deploy.
  outputFileTracingRoot: __dirname,

  async headers() {
    return [
      {
        // The embed exists to be put in an iframe on a client's own site, so it
        // must not inherit any frame-blocking default. Everything else on the
        // site refuses framing outright.
        source: '/embed/:path*',
        headers: [{ key: 'Content-Security-Policy', value: 'frame-ancestors *' }],
      },
      {
        source: '/((?!embed).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
