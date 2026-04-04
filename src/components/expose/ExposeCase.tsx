'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';
import { EXPOSE_CASES } from '@/data/expose/cases';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Play, ShieldAlert } from 'lucide-react';
import VideoModal from '@/components/expose/VideoModal';

export default function ExposeCase({ slug }: { slug: string }) {
  const [openVideo, setOpenVideo] = useState(false);
  const c = EXPOSE_CASES.find((x) => x.slug === slug);
  if (!c) return notFound();

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
              Verified Case
            </div>
            <h1 className="mt-6 text-3xl md:text-5xl font-black tracking-tight">{c.title}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="neo-badge neo-badge-security">{c.severity.toUpperCase()}</span>
              <span className="neo-badge neo-badge-popular">{c.scamType}</span>
              <span className="neo-badge neo-badge-security">{c.country}</span>
            </div>
            <div className="mt-6 text-white/70 leading-relaxed">{c.summary}</div>
          </motion.div>

          <div className="mt-8 rounded-3xl overflow-hidden border border-white/10 bg-black">
            <div className="relative aspect-[16/7]">
              <Image
                src={c.coverImage || 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1600'}
                alt={c.title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {c.youtubeId && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setOpenVideo(true)}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-xl text-white font-extrabold"
                    aria-label="Play case video"
                  >
                    <Play className="w-5 h-5" />
                    Watch interview
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6">
            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Full story</div>
              <div className="mt-4 text-white/80 leading-relaxed whitespace-pre-line">{c.fullStory}</div>
            </GlassCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard className="p-7 border-white/10" hover={false}>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Red flags</div>
                <div className="mt-4 space-y-2 text-white/80">
                  {c.redFlags.map((r) => (
                    <div key={r} className="flex items-start gap-2">
                      <span className="text-amber-200 mt-0.5">•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
              <GlassCard className="p-7 border-white/10" hover={false}>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">What worked</div>
                <div className="mt-4 space-y-2 text-white/80">
                  {c.whatWorked.map((r) => (
                    <div key={r} className="flex items-start gap-2">
                      <span className="text-green-200 mt-0.5">•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {c.evidence && c.evidence.length > 0 && (
              <GlassCard className="p-7 border-white/10" hover={false}>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Public-safe evidence</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {c.evidence.map((e) => (
                    <a
                      key={e.url}
                      href={e.url}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                    >
                      {e.label} <ArrowRight className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/expose"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
            >
              Back to Expose <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/expose/victim-stories"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold transition-colors"
            >
              Submit your case <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />

      {c.youtubeId && (
        <VideoModal
          open={openVideo}
          onClose={() => setOpenVideo(false)}
          youtubeId={c.youtubeId}
          title={c.title}
        />
      )}
    </main>
  );
}
