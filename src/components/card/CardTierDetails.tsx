'use client';

import { motion } from 'framer-motion';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import CardImage from '@/components/card/CardImage';
import CardPreviewModal from '@/components/card/CardPreviewModal';
import CardWaitlist from '@/components/card/CardWaitlist';
import { getCardByTier, type CardTier } from '@/data/card/tiers';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function CardTierDetails({ tier }: { tier: CardTier }) {
  const c = useMemo(() => getCardByTier(tier), [tier]);
  const [openPreview, setOpenPreview] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <NavigationPremium variant="neo" />
      <section className="pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90">
                  <BadgeCheck className="w-4 h-4" />
                  Tier Details
                </div>
                <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">{c.name}</h1>
                <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">{c.tagline}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenPreview(true)}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                  >
                    Preview card <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    href="/card"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold transition-colors"
                  >
                    Compare tiers <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassCard className="p-6 border-white/10" hover={false}>
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Core Specs</div>
                    <div className="mt-4 space-y-2 text-white/70">
                      <div className="flex items-center justify-between gap-4">
                        <span>Rewards</span>
                        <span className="font-extrabold text-white">{c.rewardsRate}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>FX Fees</span>
                        <span className="font-extrabold text-white">{c.fxFees}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>ATM</span>
                        <span className="font-extrabold text-white">{c.atmFees}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Concierge</span>
                        <span className="font-extrabold text-white">{c.concierge}</span>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6 border-white/10" hover={false}>
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Limits</div>
                    <div className="mt-4 space-y-2 text-white/70">
                      <div className="flex items-center justify-between gap-4">
                        <span>Daily Spend</span>
                        <span className="font-extrabold text-white">{c.limits.dailySpend}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Monthly Spend</span>
                        <span className="font-extrabold text-white">{c.limits.monthlySpend}</span>
                      </div>
                    </div>
                    <div className="mt-5 flex items-start gap-3 text-sm text-white/60">
                      <ShieldCheck className="w-5 h-5 text-emerald-200 mt-0.5" />
                      <div>Limits are finalized during onboarding after verification.</div>
                    </div>
                  </GlassCard>
                </div>

                <div className="mt-10">
                  <GlassCard className="p-7 border-white/10" hover={false}>
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Perks</div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {c.perks.map((p) => (
                        <div key={p} className="rounded-2xl bg-white/[0.05] border border-white/10 p-4 text-white/80">
                          {p}
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                <div className="mt-10">
                  <CardWaitlist tier={tier} />
                </div>
              </div>

              <div className="w-full lg:w-[460px]">
                <div className="sticky top-28">
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black">
                    <div className="relative aspect-[16/10]">
                      <CardImage tier={tier} priority className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="text-white font-extrabold">Design preview</div>
                      <div className="mt-2 text-sm text-white/60">
                        Premium SVG renders via VANHSYA Card Image API for consistent display and fast loading.
                      </div>
                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={() => setOpenPreview(true)}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                        >
                          Open fullscreen preview <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Navigation</div>
                    <div className="mt-4 flex flex-col gap-3">
                      <Link
                        href="/card"
                        className="inline-flex items-center justify-between px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-colors"
                      >
                        Back to tiers <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                      >
                        Talk to VANHSYA <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />

      <CardPreviewModal open={openPreview} onClose={() => setOpenPreview(false)} tier={tier} />
    </main>
  );
}

