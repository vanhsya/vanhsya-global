'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, ShieldAlert } from 'lucide-react';

type StatusResponse = {
  id: string;
  createdAt: string;
  status: 'received' | 'reviewing' | 'published' | 'rejected';
};

export default function TrackCase({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StatusResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/expose/status/${id}`);
        if (!res.ok) {
          const j = (await res.json().catch(() => null)) as { error?: string } | null;
          throw new Error(j?.error || 'Not found');
        }
        const j = (await res.json()) as StatusResponse;
        if (!cancelled) setData(j);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <NavigationPremium variant="neo" />
      <section className="pt-28 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90">
              <ShieldAlert className="w-4 h-4" />
              Case Tracking
            </div>
            <h1 className="mt-6 text-3xl md:text-5xl font-black tracking-tight">Track your submission</h1>
            <p className="mt-4 text-white/70">
              Tracking ID: <span className="font-extrabold text-white">{id}</span>
            </p>
          </motion.div>

          <div className="mt-8">
            <GlassCard className="p-7 border-white/10" hover={false}>
              {loading && <div className="text-white/70">Loading status…</div>}
              {!loading && error && <div className="text-red-200">{error}</div>}
              {!loading && data && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm text-white/70">Submitted</div>
                    <div className="text-sm font-extrabold text-white">{new Date(data.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm text-white/70">Status</div>
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10 font-extrabold">
                      <BadgeCheck className="w-4 h-4 text-green-300" />
                      <span className="text-white">{data.status.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/expose/victim-stories"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                >
                  Submit another case <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/expose"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold transition-colors"
                >
                  Back to Expose <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

