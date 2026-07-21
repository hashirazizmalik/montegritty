import { Fraunces, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-jakarta',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-mono',
});

const SITE = 'https://montegritty.com';

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'Montegritty — Enterprise Digital Solutions',
  description:
    'Montegritty designs, builds, and implements software, AI, and growth systems for operations that can’t afford to break. Development, AI & machine learning, and digital marketing.',
  keywords: [
    'ERP implementation', 'CRM implementation', 'custom software', 'agentic AI',
    'AI automation', 'computer vision', 'web development', 'UI/UX', 'Meta ads',
  ],
  openGraph: {
    title: 'Montegritty — Enterprise Digital Solutions',
    description:
      'Software, AI, and growth systems for operations that can’t afford to break.',
    url: SITE,
    siteName: 'Montegritty',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Montegritty — Enterprise Digital Solutions',
    description:
      'Software, AI, and growth systems for operations that can’t afford to break.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#faf8f5',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
