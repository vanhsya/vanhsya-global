import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL('https://vanhsya.com'),
  title: "VANHSYA Global Migration - Expert Migration & Visa Services Worldwide",
  description: "Trusted global migration consultancy offering comprehensive visa and migration services. Expert guidance for work, study, family, and business visas with transparent pricing and verified success rates.",
  keywords: "migration services, visa consultation, immigration lawyer, work visa, study visa, family visa, business visa, permanent residence, global migration, visa processing, immigration consultant, Vanhsya World Best Immigration Company, UAE Luxury Business Setup, AI-Powered Relocation Services, YNO Coin Global Migration",
  authors: [{ name: "VANHSYA Global Migration" }],
  robots: "index, follow",
  other: {
    "facebook-domain-verification": "56xb3biyo7pprrx8429ww96azvk88t",
  },
  openGraph: {
    title: "VANHSYA Global Migration - Expert Migration & Visa Services Worldwide",
    description: "Where your journey begins — safely, securely, and supported. Real migration. Real guidance. Real results.",
    url: "https://vanhsya.com",
    siteName: "VANHSYA Global Migration",
    images: [
      {
        url: "/images/originallogo.png",
        width: 1200,
        height: 630,
        alt: "VANHSYA Global Migration - Your trusted migration partner"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "VANHSYA Global Migration - Expert Migration Services",
    description: "Trusted global migration consultancy with transparent pricing and verified success rates. Professional guidance for worldwide migration.",
    images: ["/images/originallogo.png"]
  },
  alternates: {
    canonical: "https://vanhsya.com"
  }
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
