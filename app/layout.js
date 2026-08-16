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

const TITLE = "Montegritty — Pakistan's First Urdu-First Agentic Voice Agents";
const DESCRIPTION =
  'Montegritty builds agentic voice AI agents that speak Urdu and take action: they book the appointment, confirm the order and write the outcome into your CRM, ERP or booking system while the caller is still on the line.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // Pages set their own full title, brand included — see any page.js.
    template: '%s',
  },
  description: DESCRIPTION,
  // Only the home page inherits this; every other route sets its own canonical.
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description:
      'Voice agents that speak Urdu and act on it — booking, confirming and updating your systems mid-call. Hear eight of them handle a real conversation.',
    url: SITE_URL,
    siteName: 'Montegritty',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description:
      'Voice agents that speak Urdu and act on it — booking, confirming and updating your systems mid-call.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
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
      <head>
        {/* Every section below the fold ships at opacity:0 and is revealed by an
            IntersectionObserver. Without JS that hides essentially the whole
            page — from a reader and from any crawler that flags invisible body
            copy. One rule removes the risk and costs normal visitors nothing. */}
        <noscript>
          <style>{'.reveal{opacity:1 !important;transform:none !important}'}</style>
        </noscript>
      </head>
      <body>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
