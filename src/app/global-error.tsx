'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import MaintenanceArcade from '@/components/maintenance/MaintenanceArcade';
import { ArrowRight, BadgeCheck, RefreshCcw } from 'lucide-react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  void error;
  const [retrying, setRetrying] = useState(false);

  const retry = () => {
    setRetrying(true);
    setTimeout(() => reset(), 250);
    setTimeout(() => setRetrying(false), 650);
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0A0A10] text-white">
        <div className="min-h-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.14),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 header-blur-vanhsya">
                <BadgeCheck className="w-4 h-4 text-amber-200" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">System Recovery</span>
              </div>
              <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                The platform needs a reset.
              </h1>
              <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                Retry to reload the experience. If maintenance is active, you’ll be routed to the arcade downtime screen.
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <GlassCard className="lg:col-span-8 p-7 border-white/10" hover={false}>
                <MaintenanceArcade title="Recovery arcade" subtitle="Keep moving while systems reload." seed="global-error" compact />
              </GlassCard>

              <GlassCard className="lg:col-span-4 p-7 border-white/10" hover={false}>
                <div className="text-white font-extrabold text-xl">Actions</div>
                <div className="mt-2 text-white/70 text-sm leading-relaxed">Try a reload or return to the hub.</div>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={retry}
                    disabled={retrying}
                    className="w-full h-11 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-60 inline-flex items-center justify-center gap-2"
                  >
                    <RefreshCcw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
                    {retrying ? 'Reloading…' : 'Reload'} <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/"
                    className="w-full h-11 px-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Home <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/maintenance"
                    className="w-full h-11 px-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 font-bold transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Maintenance <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

