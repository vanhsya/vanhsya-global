'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Additional sections will be added here */}
      <section className="section-padding bg-white">
        <div className="container-max text-center">
          <h2 className="heading-lg mb-6">
            Why Choose <span className="gradient-text">VANHSYA</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With over a decade of experience and thousands of successful cases, 
            we are your trusted partner in making your global dreams a reality.
          </p>
        </div>
      </section>
    </div>
  );
}
