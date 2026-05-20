import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { getSiteUrl } from "@/lib/utils";

const siteUrl = getSiteUrl();

const verification: Metadata["verification"] = {
  google:
    process.env.GOOGLE_SITE_VERIFICATION ?? "d5K7Nt1yL2zX9pQ3rR4sT5uY6wE7oP8",
  ...(process.env.YANDEX_VERIFICATION
    ? { yandex: process.env.YANDEX_VERIFICATION }
    : {}),
  other: {
    ...(process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {}),
    "facebook-domain-verification":
      process.env.FACEBOOK_VERIFICATION ?? "56xb3biyo7pprrx8429ww96azvk88t",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A10",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VANHSYA Global – World's First AI & Crypto-Enabled Migration Platform",
    template: "%s | VANHSYA Global",
  },
  description:
    "VANHSYA Global is the world's first AI-powered, crypto-enabled migration platform. Transparent visa services, automated document processing, blockchain-verified workflows for study, work, business, and family visas worldwide.",
  keywords: [
    "world's best migration company",
    "AI-based migration services",
    "crypto migration solutions",
    "AI-powered immigration platform",
    "blockchain document verification",
    "migration services",
    "visa consultation",
    "immigration consultant",
    "work visa",
    "study visa",
    "family visa",
    "business visa",
    "permanent residence",
    "global migration",
    "visa processing",
    "UAE immigration",
    "Canada immigration",
    "Australia immigration",
    "UK immigration",
    "YNO Coin",
    "crypto visa payments",
    "AI immigration tools",
    "migration scam protection",
    "Vanhsya World Best Immigration Company",
    "UAE Luxury Business Setup",
    "AI-Powered Relocation Services",
    "YNO Coin Global Migration",
  ],
  authors: [{ name: "VANHSYA Global" }],
  creator: "VANHSYA Global",
  publisher: "VANHSYA Global",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  openGraph: {
    title: "VANHSYA Global – World's First AI & Crypto-Enabled Migration Platform",
    description:
      "Where your journey begins — safely, securely, and supported by AI. Real migration. Real guidance. Real results.",
    url: "/",
    siteName: "VANHSYA Global",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "VANHSYA Global – AI-Powered Migration Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VANHSYA Global – World's First AI & Crypto Migration Platform",
    description:
      "The world's first AI-powered, crypto-enabled migration platform. Transparent, secure, automated visa services worldwide.",
    images: ["/images/og-default.jpg"],
    creator: "@vanhsya_global",
    site: "@vanhsya_global",
  },
  alternates: {
    canonical: "/",
  },
  verification,
};

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const enableVercelRuntimeScripts = process.env.VERCEL === "1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "VANHSYA Global",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/logo.png`,
        },
        sameAs: [
          "https://facebook.com/vanhsyaglobal",
          "https://twitter.com/vanhsya_global",
          "https://instagram.com/vanhsyaglobal",
          "https://linkedin.com/company/vanhsya-global",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "VANHSYA Global",
        publisher: { "@id": `${siteUrl}#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-[#0A0A10] text-[#E0E0E0] bg-grid-vanhsya overflow-x-hidden scroll-smooth">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script
          id="suppress-wallet-extension-ethereum-defineproperty"
          strategy="beforeInteractive"
        >{`(function(){var isExtensionSource=function(src){return typeof src==="string"&&(src.startsWith("chrome-extension://")||src.startsWith("moz-extension://")||src.startsWith("safari-extension://"));};var shouldSuppress=function(msg,src,stack){if(!msg)return false;var m=String(msg);if(m.indexOf("Cannot redefine property: ethereum")!==-1)return true;if(m.indexOf("Cannot redefine property")!==-1&&m.indexOf("ethereum")!==-1)return true;if(isExtensionSource(src)&&m.indexOf("ethereum")!==-1)return true;if(isExtensionSource(src)&&stack&&String(stack).indexOf("defineProperty")!==-1)return true;return false;};window.addEventListener("error",function(ev){try{var src=ev&&ev.filename||"";var stack=ev&&ev.error&&ev.error.stack||"";if(shouldSuppress(ev&&ev.message,src,stack)){ev.preventDefault();ev.stopImmediatePropagation&&ev.stopImmediatePropagation();}}catch(e){}},true);window.addEventListener("unhandledrejection",function(ev){try{var reason=ev&&ev.reason;var msg=reason&&reason.message?reason.message:String(reason||"");var stack=reason&&reason.stack?reason.stack:"";if(shouldSuppress(msg,"",stack)){ev.preventDefault();}}catch(e){}},true);}());`}</Script>
        <ClientLayout>{children}</ClientLayout>
        {enableVercelRuntimeScripts ? <Analytics /> : null}
        {enableVercelRuntimeScripts ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
