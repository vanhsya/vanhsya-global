import React from 'react';
import NavigationPremium from '@/components/NavigationPremium';
import WhyChooseVanhsya from '@/components/WhyChooseVanhsya';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Why Choose VANHSYA | Trusted AI Migration Platform',
  description: 'Discover why 15,000+ clients trust VANHSYA for their migration journey. Zero scams, zero agents, 100% transparency.',
};

export default function WhyVanhsyaPage() {
  return (
    <main className="min-h-screen">
      <NavigationPremium variant="neo" />
      <div className="pt-20">
        <WhyChooseVanhsya />
      </div>
      <Footer />
    </main>
  );
}
