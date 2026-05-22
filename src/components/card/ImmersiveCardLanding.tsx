'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CreditCard, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import { VANHSYA_CARDS } from '@/data/card/tiers';
import ImmersiveCardsExperience from '@/components/card/immersive/ImmersiveCardsExperience';

export default function ImmersiveCardLanding() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <NavigationPremium variant="neo" />
      <ImmersiveCardsExperience />

      <section className="relative pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90">
              <CreditCard className="w-4 h-4" />
              Immersive Card Gallery
            </div>

            <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Explore VANHSYA Card tiers in{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                    real-time 3D
                  </span>
                  .
                </h1>
                <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
                  Hover, tilt, and scroll through a WebGL-powered card wall with physical easing, dynamic lighting, and
                  viewport-based entrance cues. If WebGL is unavailable, the page gracefully falls back to high-quality CSS 3D.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/card"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-extrabold transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Card
                  </Link>
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                  >
                    Get consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {VANHSYA_CARDS.map((c, index) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
                      transition={{ duration: 0.55, delay: index * 0.06 }}
                    >
                      <GlassCard className="p-6 border-white/10" hover={false}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-white font-extrabold truncate">{c.name}</div>
                            <div className="mt-2 text-sm text-white/60">{c.tagline}</div>
                          </div>
                          <div className="neo-badge neo-badge-popular">{c.tier.toUpperCase()}</div>
                        </div>
                        <div className="mt-5 text-sm text-white/70 space-y-1">
                          <div>Rewards: {c.rewardsRate}</div>
                          <div>FX: {c.fxFees}</div>
                          <div>Concierge: {c.concierge}</div>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-xs text-white/50 font-black uppercase tracking-[0.25em]">
                          <Sparkles className="w-4 h-4 text-amber-200" />
                          WebGL-enhanced
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

