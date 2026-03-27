 'use client';
 
 import React from 'react';
 import NavigationPremium from '@/components/NavigationPremium';
 import Footer from '@/components/Footer';
 import { LineChart, ShieldCheck, Mail, Building2, Coins, Target } from 'lucide-react';
 
 export default function InvestorsPage() {
   return (
     <main className="min-h-screen bg-slate-950 text-white">
       <NavigationPremium variant="neo" />
 
       <section className="pt-28 pb-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya">
               <ShieldCheck className="w-4 h-4 text-amber-300" />
               <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Investor Relations</span>
             </div>
             <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
               VANHSYA: Building Global Migration Infrastructure
             </h1>
             <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
               We are engineering the premium, transparent platform for cross-border mobility at scale. Our roadmap spans AI, payments and compliant crypto rails.
             </p>
           </div>
 
           <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 header-blur-vanhsya">
               <div className="flex items-center gap-3">
                 <LineChart className="w-6 h-6 text-indigo-300" />
                 <h3 className="font-bold">Financial Projections</h3>
               </div>
               <ul className="mt-4 text-slate-300 text-sm space-y-2">
                 <li>12–18 month SaaS revenue ramp via AI modules</li>
                 <li>EMI + payments margin expansion with milestone escrow</li>
                 <li>Exchange settlement fees for cross-border value flows</li>
               </ul>
             </div>
             <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 header-blur-vanhsya">
               <div className="flex items-center gap-3">
                 <Building2 className="w-6 h-6 text-purple-300" />
                 <h3 className="font-bold">Go-To-Market</h3>
               </div>
               <ul className="mt-4 text-slate-300 text-sm space-y-2">
                 <li>Direct enterprise integrations (universities, employers)</li>
                 <li>Verified partner network with fraud protection guarantees</li>
                 <li>Community-led acquisition via stories and rewards</li>
               </ul>
             </div>
             <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 header-blur-vanhsya">
               <div className="flex items-center gap-3">
                 <Target className="w-6 h-6 text-amber-300" />
                 <h3 className="font-bold">Risk Controls</h3>
               </div>
               <ul className="mt-4 text-slate-300 text-sm space-y-2">
                 <li>Transparency-first architecture and verifiable outcomes</li>
                 <li>Compliance guardrails for payments and crypto acceptance</li>
                 <li>Tiered access for lottery and rewards mechanisms</li>
               </ul>
             </div>
           </div>
 
           <div className="mt-12 text-center">
             <a
               href="mailto:founder@vanhsya.com"
               className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold"
             >
               <Mail className="w-5 h-5" />
               Contact: founder@vanhsya.com
             </a>
             <p className="mt-3 text-sm text-white/70">Request our investor deck and detailed financial model.</p>
           </div>
         </div>
       </section>
 
       <Footer />
     </main>
   );
 }
