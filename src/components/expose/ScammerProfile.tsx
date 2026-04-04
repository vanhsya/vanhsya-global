'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';
import { SCAMMER_PROFILES } from '@/data/expose/scammers';
import { ArrowRight, ShieldAlert } from 'lucide-react';

export default function ScammerProfile({ slug }: { slug: string }) {
  const p = SCAMMER_PROFILES.find((x) => x.slug === slug);
  if (!p) return notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <NavigationPremium variant="neo" />
      <section className="pt-28 pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90">
              <ShieldAlert className="w-4 h-4" />
              Profile
            </div>
            <h1 className="mt-6 text-3xl md:text-5xl font-black tracking-tight">{p.displayName}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="neo-badge neo-badge-security">{p.risk.toUpperCase()}</span>
              <span className="neo-badge neo-badge-popular">{p.type.toUpperCase()}</span>
              {p.countries.map((c) => (
                <span key={c} className="neo-badge neo-badge-security">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-6 text-white/70 leading-relaxed">{p.summary}</p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-6">
            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Known patterns</div>
              <div className="mt-4 space-y-2 text-white/80">
                {p.knownPatterns.map((s) => (
                  <div key={s} className="flex items-start gap-2">
                    <span className="text-amber-200 mt-0.5">•</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Verification checklist</div>
              <div className="mt-4 space-y-2 text-white/80">
                {p.verificationSteps.map((s) => (
                  <div key={s} className="flex items-start gap-2">
                    <span className="text-green-200 mt-0.5">•</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {p.publicLinks.length > 0 && (
              <GlassCard className="p-7 border-white/10" hover={false}>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Public links</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {p.publicLinks.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                    >
                      {l.label} <ArrowRight className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/expose/scammers"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
            >
              Back to profiles <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/expose/victim-stories"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold transition-colors"
            >
              Submit a case <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

