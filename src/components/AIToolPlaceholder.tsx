import React from 'react';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import { FaTools, FaRocket } from 'react-icons/fa';
import Link from 'next/link';

export const metadata = {
  title: 'AI Tool - Coming Soon | VANHSYA',
  description: 'This AI-powered migration tool is currently in beta development. Join the waitlist for early access.',
};

export default function AIToolPlaceholderPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <NavigationPremium />
      
      <div className="flex-grow flex items-center justify-center pt-20 pb-10 px-4">
        <div className="text-center max-w-2xl">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/30 animate-pulse">
            <FaTools className="text-4xl text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tool Under Development
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Our engineering team is currently fine-tuning this AI module to ensure 
            <span className="text-indigo-400 font-semibold"> 99.9% accuracy</span>. 
            We believe in releasing only the most reliable tools for your migration journey.
          </p>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mb-10">
            <h3 className="text-lg font-semibold text-white mb-2">Development Status</h3>
            <div className="w-full bg-slate-800 rounded-full h-3 mb-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full w-[85%] animate-pulse"></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Beta Testing</span>
              <span>85% Complete</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/ai-tools"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all"
            >
              Explore Other Tools
            </Link>
            <Link 
              href="/contact"
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-white font-medium shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              <FaRocket />
              <span>Join Waitlist</span>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
