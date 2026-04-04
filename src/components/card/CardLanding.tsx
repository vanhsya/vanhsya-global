'use client';

import { motion } from 'framer-motion';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import CardCountdown from '@/components/card/CardCountdown';
import CardWaitlist from '@/components/card/CardWaitlist';
import CardTierSelector from '@/components/card/CardTierSelector';
import CardPreviewModal from '@/components/card/CardPreviewModal';
import CardImage from '@/components/card/CardImage';
import { VANHSYA_CARDS, getCardByTier, type CardTier } from '@/data/card/tiers';
import { useCardTier } from '@/hooks/useCardTier';
import Link from 'next/link';
import { ArrowRight, CreditCard, ShieldCheck, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function CardLanding() {
  const { tier, setTier } = useCardTier();
  const active = useMemo(() => getCardByTier(tier), [tier]);
  const [previewTier, setPreviewTier] = useState<CardTier | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90">
              <CreditCard className="w-4 h-4" />
              VANHSYA Card
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                  A premium card system built for{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                    global mobility
                  </span>
                  .
                </h1>
                <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
                  Choose your tier and preview the design instantly. Each tier is tuned for different travel intensity—limits,
                  rewards, and concierge depth scale with your level.
                </p>

                <div className="mt-8">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Select tier</div>
                  <div className="mt-4">
                    <CardTierSelector value={tier} onChange={setTier} />
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <GlassCard className="p-5 border-white/10" hover={false}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Launch</div>
                      <Sparkles className="w-5 h-5 text-purple-200" />
                    </div>
                    <div className="mt-4">
                      <CardCountdown />
                    </div>
                  </GlassCard>
                  <GlassCard className="p-5 border-white/10" hover={false}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Security</div>
                      <ShieldCheck className="w-5 h-5 text-emerald-200" />
                    </div>
                    <div className="mt-4 text-sm text-white/70 leading-relaxed">
                      Tiered controls, instant freeze, and verification workflows designed for cross-border use.
                    </div>
                  </GlassCard>
                </div>

                <div className="mt-10">
                  <CardWaitlist tier={tier} />
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black">
                  <div className="relative aspect-[16/10]">
                    <CardImage tier={tier} priority className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col sm:flex-row gap-3 justify-between">
                    <div>
                      <div className="text-white font-extrabold text-xl">{active.name}</div>
                      <div className="mt-2 text-white/60">{active.tagline}</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setPreviewTier(tier)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                      >
                        Preview <ArrowRight className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/card/${tier}`}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                      >
                        View details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {VANHSYA_CARDS.map((c) => (
                    <GlassCard key={c.id} className="p-6 border-white/10" hover={false}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-white font-extrabold">{c.name}</div>
                          <div className="mt-2 text-sm text-white/60">{c.tagline}</div>
                        </div>
                        <span className={`neo-badge ${tier === c.tier ? 'neo-badge-popular' : 'neo-badge-security'}`}>
                          {c.tier.toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-5 text-sm text-white/70 space-y-1">
                        <div>Rewards: {c.rewardsRate}</div>
                        <div>FX: {c.fxFees}</div>
                        <div>Concierge: {c.concierge}</div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => setPreviewTier(c.tier)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                        >
                          Preview <ArrowRight className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/card/${c.tier}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                        >
                          Details <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setTier(c.tier)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold transition-colors"
                        >
                          Select <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {previewTier && (
        <CardPreviewModal open={Boolean(previewTier)} onClose={() => setPreviewTier(null)} tier={previewTier} />
      )}
    </main>
  );
}

