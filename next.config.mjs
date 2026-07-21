import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // There's an unrelated package-lock.json in the parent user directory; without
  // this, Next infers the wrong workspace root and mis-traces files on deploy.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
