'use client';

import { motion } from 'framer-motion';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';
import { INDUSTRY_WATCH } from '@/data/expose/industryWatch';
import { ArrowRight, ShieldAlert } from 'lucide-react';

const badgeForSeverity = (s: string) => {
  if (s === 'critical') return 'neo-badge neo-badge-security';
  if (s === 'high') return 'neo-badge neo-badge-popular';
  return 'neo-badge neo-badge-security';
};

export default function IndustryWatch() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <NavigationPremium variant="neo" />
      <section className="pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90">
              <ShieldAlert className="w-4 h-4" />
              Migration Industry Watch
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
              Fraud patterns.{' '}
              <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Verified signals.
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              A public safety layer that documents how scams operate, what verification should look like, and how victims can respond.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/expose"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
              >
                Back to Expose <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/expose/victim-stories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold transition-colors"
              >
                Submit a Case <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {INDUSTRY_WATCH.map((w, idx) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <GlassCard className="p-7 border-white/10" hover={false}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-white font-extrabold text-xl">{w.title}</div>
                      <div className="mt-2 text-sm text-white/60">
                        {w.category.replace('-', ' ').toUpperCase()} · {new Date(w.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span className={badgeForSeverity(w.severity)}>{w.severity.toUpperCase()}</span>
                  </div>
                  <div className="mt-4 text-sm text-white/75 leading-relaxed">{w.summary}</div>
                  <div className="mt-4 text-sm text-white/70 leading-relaxed">{w.details}</div>
                  <div className="mt-6">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Signals</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {w.signals.map((s) => (
                        <span key={s} className="neo-badge neo-badge-security">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

