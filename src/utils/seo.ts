import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  noIndex?: boolean;
  structured?: any;
}

const defaultMeta = {
  title: 'VANHSYA Global Migration - Trusted Immigration Consultancy',
  description: 'Leading immigration consultancy providing expert visa services for Canada, Australia, UK, and USA. Transparent, client-first approach with proven success rates.',
  keywords: [
    'immigration consultancy',
    'visa services',
    'Canada immigration',
    'Australia visa',
    'UK visa',
    'USA immigration',
    'work visa',
    'study visa',
    'permanent residency',
    'VANHSYA'
  ],
  ogImage: '/images/originallogo.png',
  twitterCard: 'summary_large_image'
};

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  ogType = 'website',
  twitterCard,
  noIndex = false,
  structured
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} | VANHSYA Global Migration` : defaultMeta.title;
  const seoDescription = description || defaultMeta.description;
  const seoKeywords = [...defaultMeta.keywords, ...keywords];
  const seoOgImage = ogImage || defaultMeta.ogImage;
  const seoTwitterCard = twitterCard || defaultMeta.twitterCard;

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords.join(', '),
    
    // Open Graph
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: ogType as any,
      images: [
        {
          url: seoOgImage,
          width: 1200,
          height: 630,
          alt: seoTitle
        }
      ],
      siteName: 'VANHSYA Global Migration'
    },
    
    // Twitter
    twitter: {
      card: seoTwitterCard as any,
      title: seoTitle,
      description: seoDescription,
      images: [seoOgImage],
      creator: '@vanhsya_global'
    },
    
    // Canonical URL
    alternates: canonical ? {
      canonical: canonical
    } : undefined,
    
    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    
    // Additional meta tags
    other: {
      'theme-color': '#2563eb',
      'msapplication-TileColor': '#2563eb',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no'
    }
  };

  return metadata;
}

// Structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VANHSYA Global Migration",
  "url": "https://www.vanhsya.com",
  "logo": "https://www.vanhsya.com/images/originallogo.png",
  "description": "Leading immigration consultancy providing expert visa services for Canada, Australia, UK, and USA.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "United Arab Emirates",
    "addressCountry": "AE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971522338785",
    "contactType": "customer service",
    "availableLanguage": ["English", "French", "Hindi", "Punjabi"]
  },
  "areaServed": [
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah"
  ],
  "sameAs": [
    "https://facebook.com/vanhsyaglobal",
    "https://twitter.com/vanhsya_global",
    "https://linkedin.com/company/vanhsya-global",
    "https://instagram.com/vanhsyaglobal"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2847"
  }
};

export const serviceSchema = (service: {
  name: string;
  description: string;
  price?: string;
  category?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": "VANHSYA Global Migration"
  },
  "category": service.category || "Immigration Services",
  "offers": service.price ? {
    "@type": "Offer",
    "price": service.price,
    "priceCurrency": "CAD"
  } : undefined
});

export const faqSchema = (faqs: Array<{question: string; answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const breadcrumbSchema = (items: Array<{name: string; url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Page-specific metadata
export const homePageMeta = generateSEOMetadata({
  title: 'Premier Immigration Consultancy - Your Gateway to Global Migration',
  description: 'Expert immigration services for Canada, Australia, UK & USA. Transparent process, proven success rates. Start your migration journey with VANHSYA today.',
  keywords: ['immigration consultant', 'visa expert', 'global migration', 'citizenship services'],
  structured: organizationSchema
});

export const servicesPageMeta = generateSEOMetadata({
  title: 'Immigration Services - Visa & Migration Solutions',
  description: 'Comprehensive immigration services including work visas, study permits, permanent residency, and citizenship applications. Expert guidance every step of the way.',
  keywords: ['immigration services', 'visa application', 'migration solutions', 'visa consultant']
});

export const aboutPageMeta = generateSEOMetadata({
  title: 'About VANHSYA - Leading Immigration Consultancy',
  description: 'Learn about VANHSYA Global Migration, our mission, values, and commitment to providing transparent, client-first immigration services worldwide.',
  keywords: ['about vanhsya', 'immigration company', 'migration consultancy', 'visa experts']
});

export const contactPageMeta = generateSEOMetadata({
  title: 'Contact Us - Get Expert Immigration Advice',
  description: 'Contact VANHSYA Global Migration for expert immigration consultation. Multiple contact methods, quick response times, and personalized service.',
  keywords: ['contact immigration consultant', 'visa consultation', 'immigration advice', 'migration help']
});
