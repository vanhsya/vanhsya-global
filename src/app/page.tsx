import React, { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import NavigationPremium from '@/components/NavigationPremium';
import WorldClassHero from '@/components/WorldClassHero';
import Footer from '@/components/Footer';
import { generateMetadata as generateSEOMetadata, generateStructuredData, StructuredData } from '@/components/SEO';
import LandingStatsStrip from '@/components/LandingStatsStrip';
import WebGLCountryVisualizationSection from '@/components/WebGLCountryVisualizationSection';
import { COMPANY } from '@/lib/company';

// Dynamic imports for heavy sections
const MigrationTrendsVideoSection = dynamic(() => import('@/components/MigrationTrendsVideoSection'), {
  loading: () => <SectionSkeleton />
});
const WhyChooseVanhsya = dynamic(() => import('@/components/WhyChooseVanhsya'), {
  loading: () => <SectionSkeleton />
});
const RealStoriesResults = dynamic(() => import('@/components/RealStoriesResults'), {
  loading: () => <SectionSkeleton />
});
const AIToolsShowcase = dynamic(() => import('@/components/AIToolsShowcase'), {
  loading: () => <SectionSkeleton />
});
const LandingBlogSection = dynamic(() => import('@/components/LandingBlogSection'), {
  loading: () => <SectionSkeleton />
});
const VanhsyaPromise = dynamic(() => import('@/components/VanhsyaPromise'), {
  loading: () => <SectionSkeleton />
});
const ReferralProgramSection = dynamic(() => import('@/components/ReferralProgramSection'), {
  loading: () => <SectionSkeleton />
});
const EmployerConnectSection = dynamic(() => import('@/components/EmployerConnectSection'), {
  loading: () => <SectionSkeleton />
});
const VanhsyaDifference = dynamic(() => import('@/components/VanhsyaDifference'), {
  loading: () => <SectionSkeleton />
});
const ComingSoonShowcase = dynamic(() => import('@/components/ComingSoonShowcase'), {
  loading: () => <SectionSkeleton />
});

function SectionSkeleton() {
  return (
    <div className="w-full py-20 animate-pulse bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-slate-800 rounded w-1/4 mb-6 mx-auto" />
        <div className="h-4 bg-slate-800 rounded w-1/2 mb-12 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-900 rounded-2xl border border-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = generateSEOMetadata({
  title: 'World\'s Best Migration Platform – New Era Starts Now',
  description:
    'A premium, AI-enabled global migration platform built on transparency, precision, and verified workflows for high-value relocations.',
  keywords: ['migration services', 'AI migration platform', 'visa application', 'immigration consultant', 'study abroad', 'work visa', 'PR application', 'migration scam protection'],
  canonical: 'https://vanhsya.com'
});

export default function Home() {
  const organizationSchema = generateStructuredData('Organization', {
    address: COMPANY.uae.country,
    city: 'Dubai',
    region: 'Dubai',
    postalCode: '',
    phone: COMPANY.phoneE164
  });

  return (
    <>
      <StructuredData schema={organizationSchema} />
      <div className="min-h-screen bg-grid-vanhsya overflow-x-hidden">
        {/* Premium Navigation */}
        <NavigationPremium variant="neo" />
        
        <div className="space-y-0">
          {/* 1. World Class Hero Section - Main conversion point */}
          <Suspense fallback={<div className="h-screen bg-black/20" />}>
            <WorldClassHero />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <ComingSoonShowcase />
          </Suspense>
          <LandingStatsStrip />
          <WebGLCountryVisualizationSection />

          <Suspense fallback={<SectionSkeleton />}>
            <div className="space-y-0">
              {/* 1.5. Migration Trends & Inside Videos - Unique Value */}
              <MigrationTrendsVideoSection />
              
              {/* 2. Why Choose VANHSYA - Key differentiators */}
              <WhyChooseVanhsya />
              
              {/* 3. Real Stories & Results - Social proof */}
              <RealStoriesResults />
              
              {/* 4. AI Tools Showcase - Value demonstration */}
              <AIToolsShowcase />

              {/* 4.5. Blog + AI Insights - Card-based content highlights */}
              <LandingBlogSection />
              
              {/* 5. VANHSYA Promise - Trust building */}
              <VanhsyaPromise />
              
              {/* 6. Referral Program - Viral growth */}
              <ReferralProgramSection />
              
              {/* 7. Employer Connect - B2B value */}
              <EmployerConnectSection />
              
              {/* 8. The VANHSYA Difference - Competitive advantage */}
              <VanhsyaDifference />
            </div>
          </Suspense>
          
          {/* 9. Footer - Final conversion */}
          <Footer />
        </div>
      </div>
    </>
  );
}
