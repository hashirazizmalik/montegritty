import { Fraunces, Plus_Jakarta_Sans, Space_Mono, Noto_Nastaliq_Urdu } from 'next/font/google';
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

// Urdu is set in Nastaliq, not a naskh fallback. A Pakistani buyer reads the
// difference immediately — naskh Urdu looks like machine output. Only loaded
// where it's used (voice agent transcripts and the operations dashboard), but
// declared here so the variable exists site-wide.
const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-urdu',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Montegritty — Urdu Voice AI Agents for Pakistani Operations',
    template: '%s',
  },
  description:
    'Montegritty builds voice agents that make and take phone calls in Urdu, Pashto and Sindhi — plus the custom speech models underneath them and the automation that wires them into your systems.',
  keywords: [
    'Urdu voice agent', 'Pashto voice AI', 'voice AI Pakistan', 'AI call center Pakistan',
    'text to speech Urdu', 'speech to text Urdu', 'custom voice model',
    'COD confirmation calls', 'appointment reminder calls', 'AI voice automation',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Montegritty — Urdu Voice AI Agents for Pakistani Operations',
    description:
      'Voice agents that take the call in Urdu, Pashto and Sindhi. Hear eight of them handle a real conversation.',
    url: SITE_URL,
    siteName: 'Montegritty',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Montegritty — Urdu Voice AI Agents for Pakistani Operations',
    description:
      'Voice agents that take the call in Urdu, Pashto and Sindhi. Hear eight of them handle a real conversation.',
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
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${spaceMono.variable} ${nastaliq.variable}`}
    >
      <body>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
