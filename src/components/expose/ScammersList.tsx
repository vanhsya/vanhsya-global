'use client';

import { motion } from 'framer-motion';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';
import { SCAMMER_PROFILES } from '@/data/expose/scammers';
import { ArrowRight, ShieldAlert } from 'lucide-react';

export default function ScammersList() {
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
              Scammer Profiles
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">Profiles & verification checklists</h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Public profiles should be published only after verification. Use these checklists to protect yourself before paying anyone.
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

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCAMMER_PROFILES.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <GlassCard className="p-7 border-white/10" hover={false}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-white font-extrabold text-xl">{p.displayName}</div>
                      <div className="mt-1 text-sm text-white/60">
                        {p.type.toUpperCase()} · Risk: {p.risk.toUpperCase()} · {p.countries.join(', ')}
                      </div>
                    </div>
                    <span className="neo-badge neo-badge-security">{p.risk.toUpperCase()}</span>
                  </div>
                  <div className="mt-4 text-sm text-white/75 leading-relaxed">{p.summary}</div>
                  <div className="mt-6">
                    <Link
                      href={`/expose/scammers/${p.slug}`}
                      className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black"
                    >
                      View profile <ArrowRight className="w-4 h-4" />
                    </Link>
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

