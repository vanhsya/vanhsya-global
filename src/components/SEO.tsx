import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
  structuredData?: object;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = '/images/og-default.jpg',
  canonical,
  noIndex = false
}: SEOProps): Metadata {
  const fullTitle = title.includes('Vanhsya') ? title : `${title} | Vanhsya Immigration Services`;
  const baseUrl = 'https://vanhsya.com';
  
  return {
    title: fullTitle,
    description,
    keywords: [...keywords, 'immigration', 'visa', 'canada', 'australia', 'vanhsya'].join(', '),
    authors: [{ name: 'Vanhsya Immigration Services' }],
    creator: 'Vanhsya Immigration Services',
    publisher: 'Vanhsya Immigration Services',
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: canonical || baseUrl
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || baseUrl,
      siteName: 'Vanhsya Immigration Services',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@vanhsya_global'
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code'
    },
    category: 'Immigration Services'
  };
}

export const defaultSEO: SEOProps = {
  title: 'Vanhsya Immigration Services - Your Trusted Immigration Partner',
  description: 'Expert immigration services for Canada, Australia, USA & more. Trusted by 5000+ clients with 98% success rate. Get your visa approved with our professional guidance.',
  keywords: [
    'immigration services',
    'visa application',
    'canada immigration',
    'australia immigration',
    'usa immigration',
    'uk immigration',
    'permanent residence',
    'work visa',
    'student visa',
    'family visa',
    'immigration consultant',
    'visa consultant',
    'immigration lawyer',
    'express entry',
    'provincial nominee program',
    'skilled worker visa',
    'business immigration',
    'investment visa'
  ]
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'Vanhsya Immigration Services - Your Trusted Immigration Partner',
    description: 'Expert immigration services for Canada, Australia, USA & more. Trusted by 5000+ clients with 98% success rate. Professional visa consultation and application assistance.',
    keywords: ['immigration services', 'visa consultant', 'canada immigration', 'australia immigration', 'permanent residence']
  },
  services: {
    title: 'Immigration Services - Visa Consultation & Application Assistance',
    description: 'Comprehensive immigration services including visa consultation, application assistance, document preparation, and legal support. Specialized in Canada, Australia, USA, UK immigration.',
    keywords: ['immigration services', 'visa consultation', 'application assistance', 'document preparation', 'legal support']
  },
  countries: {
    title: 'Immigration Destinations - Compare Countries & Visa Options',
    description: 'Compare immigration opportunities in Canada, Australia, USA, UK, Germany & New Zealand. Detailed information on visa types, requirements, and processing times.',
    keywords: ['immigration destinations', 'country comparison', 'visa options', 'immigration requirements', 'processing times']
  },
  blog: {
    title: 'Immigration Blog - Latest News, Tips & Updates',
    description: 'Stay updated with latest immigration news, policy changes, application tips, and success stories. Expert insights on visa processes and immigration strategies.',
    keywords: ['immigration blog', 'immigration news', 'visa tips', 'policy updates', 'immigration advice']
  },
  contact: {
    title: 'Contact Us - Free Immigration Consultation',
    description: 'Get free immigration consultation from certified experts. Contact Vanhsya Immigration Services for personalized visa guidance and application support.',
    keywords: ['contact immigration consultant', 'free consultation', 'immigration advice', 'visa guidance']
  },
  about: {
    title: 'About Vanhsya - Leading Immigration Consultancy',
    description: 'Learn about Vanhsya Immigration Services - your trusted partner since 2015. Certified consultants, 98% success rate, 5000+ satisfied clients worldwide.',
    keywords: [
      'about vanhsya',
      'immigration consultancy',
      'certified consultants',
      'success rate',
      'client testimonials',
      'Vanhsya World Best Immigration Company',
      'UAE Luxury Business Setup',
      'YNO Coin Global Migration',
      'AI-Powered Relocation Services'
    ]
  },
  eligibilityBot: {
    title: 'Immigration Eligibility Assessment - Free Online Tool',
    description: 'Take our free immigration eligibility assessment to discover your best visa options. AI-powered tool analyzes your profile for Canada, Australia, USA & more.',
    keywords: ['eligibility assessment', 'immigration quiz', 'visa eligibility', 'free assessment', 'immigration tool']
  },
  documentGenerator: {
    title: 'Immigration Document Generator - Professional Templates',
    description: 'Generate professional immigration documents instantly. Cover letters, SOPs, employment letters & more. Ensure your documents meet all requirements.',
    keywords: ['document generator', 'immigration documents', 'SOP template', 'cover letter', 'employment verification']
  },
  scamDetector: {
    title: 'Immigration Scam Detector - Protect Yourself from Fraud',
    description: 'Protect yourself from immigration fraud. Check companies, websites & communications against our scam database. Get real-time risk assessments.',
    keywords: ['scam detector', 'immigration fraud', 'fraud protection', 'scam prevention', 'visa scam']
  },
  portal: {
    title: 'Client Portal - Track Your Immigration Application',
    description: 'Secure client portal to track your immigration application progress. Access documents, updates, and communicate with your consultant.',
    keywords: ['client portal', 'application tracking', 'document access', 'secure portal', 'application status']
  }
};

// Structured Data Schema
export const generateStructuredData = (type: 'Organization' | 'Service' | 'Article' | 'FAQPage', data: any) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        name: 'Vanhsya Immigration Services',
        url: 'https://vanhsya.com',
        logo: 'https://vanhsya.com/images/originallogo.png',
        description: 'Professional immigration services for global destinations',
        address: {
          '@type': 'PostalAddress',
          streetAddress: data.address || '123 Immigration Street',
          addressLocality: data.city || 'Toronto',
          addressRegion: data.region || 'ON',
          postalCode: data.postalCode || 'M5V 3A8',
          addressCountry: 'CA'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: data.phone || '+1-800-VANHSYA',
          contactType: 'customer service',
          availableLanguage: ['English', 'French', 'Spanish', 'Hindi']
        },
        sameAs: [
          'https://facebook.com/vanhsyaglobal',
          'https://twitter.com/vanhsya_global',
          'https://linkedin.com/company/vanhsya-global',
          'https://instagram.com/vanhsyaglobal'
        ]
      };

    case 'Service':
      return {
        ...baseSchema,
        name: data.name,
        provider: {
          '@type': 'Organization',
          name: 'Vanhsya Immigration Services'
        },
        description: data.description,
        serviceType: 'Immigration Services',
        areaServed: ['Canada', 'Australia', 'USA', 'UK', 'Germany', 'New Zealand'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Immigration Services',
          itemListElement: data.services?.map((service: any, index: number) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.description
            }
          }))
        }
      };

    case 'Article':
      return {
        ...baseSchema,
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Organization',
          name: 'Vanhsya Immigration Services'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Vanhsya Immigration Services',
          logo: {
            '@type': 'ImageObject',
            url: 'https://vanhsya.com/images/originallogo.png'
          }
        },
        datePublished: data.publishDate,
        dateModified: data.modifiedDate || data.publishDate,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        }
      };

    case 'FAQPage':
      return {
        ...baseSchema,
        mainEntity: data.faqs?.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      };

    default:
      return baseSchema;
  }
};

// Helper function to inject structured data
export const StructuredData = ({ schema }: { schema: object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
);
