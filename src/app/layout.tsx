import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  metadataBase: new URL('https://vanhsya.com'),
  title: {
    default: 'VANHSYA Global – World\'s First AI & Crypto-Enabled Migration Platform',
    template: '%s | VANHSYA Global',
  },
  description:
    'VANHSYA Global is the world\'s first AI-powered, crypto-enabled migration platform. Transparent visa services, automated document processing, blockchain-verified workflows for study, work, business, and family visas worldwide.',
  keywords: [
    'world\'s best migration company',
    'AI-based migration services',
    'crypto migration solutions',
    'AI-powered immigration platform',
    'blockchain document verification',
    'migration services',
    'visa consultation',
    'immigration consultant',
    'work visa',
    'study visa',
    'family visa',
    'business visa',
    'permanent residence',
    'global migration',
    'visa processing',
    'UAE immigration',
    'Canada immigration',
    'Australia immigration',
    'UK immigration',
    'YNO Coin',
    'crypto visa payments',
    'AI immigration tools',
    'migration scam protection',
    'Vanhsya World Best Immigration Company',
    'UAE Luxury Business Setup',
    'AI-Powered Relocation Services',
    'YNO Coin Global Migration',
  ],
  authors: [{ name: 'VANHSYA Global' }],
  creator: 'VANHSYA Global',
  publisher: 'VANHSYA Global',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'VANHSYA Global – World\'s First AI & Crypto-Enabled Migration Platform',
    description:
      'Where your journey begins — safely, securely, and supported by AI. Real migration. Real guidance. Real results.',
    url: 'https://vanhsya.com',
    siteName: 'VANHSYA Global',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'VANHSYA Global – AI-Powered Migration Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VANHSYA Global – World\'s First AI & Crypto Migration Platform',
    description:
      'The world\'s first AI-powered, crypto-enabled migration platform. Transparent, secure, automated visa services worldwide.',
    images: ['/images/og-default.jpg'],
    creator: '@vanhsya_global',
    site: '@vanhsya_global',
  },
  alternates: {
    canonical: 'https://vanhsya.com',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? 'your-google-verification-code',
    yandex: process.env.YANDEX_VERIFICATION ?? undefined,
  },
};

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-[#0A0A10] text-[#E0E0E0] bg-grid-vanhsya overflow-x-hidden scroll-smooth">
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
