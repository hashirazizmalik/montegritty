import { Fraunces, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import { SITE_URL } from '@/lib/seo';
import OrganizationSchema from '@/components/OrganizationSchema';
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

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Montegritty — Enterprise Digital Solutions',
  description:
    'Montegritty designs, builds, and implements custom software, ERP & CRM implementation, and AI automation for operations worldwide that can’t afford to break.',
  keywords: [
    'ERP implementation', 'CRM implementation', 'custom software development',
    'agentic AI', 'AI automation', 'computer vision', 'web development',
    'UI/UX design', 'Meta ads agency',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Montegritty — Enterprise Digital Solutions',
    description:
      'Custom software, ERP & CRM implementation, and AI automation for operations worldwide that can’t afford to break.',
    url: SITE_URL,
    siteName: 'Montegritty',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Montegritty — Enterprise Digital Solutions',
    description:
      'Custom software, ERP & CRM implementation, and AI automation for operations worldwide that can’t afford to break.',
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
      <body>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
