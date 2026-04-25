'use client';

import { motion } from 'framer-motion';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';
import { EXPOSE_INTERVIEWS } from '@/data/expose/interviews';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Play, Video } from 'lucide-react';
import VideoModal from '@/components/expose/VideoModal';
import { COMPANY } from '@/lib/company';

type InterviewApiItem = {
  id: string;
  title: string;
  guest: string;
  role?: string;
  publishedAt: string;
  youtubeId: string;
  thumbnail: string;
  summary: string;
  tags: string[];
};

type UploadItem = {
  id: string;
  title: string;
  publishedAt: string;
  youtubeId: string;
  thumbnail: string;
  url: string;
};

export default function ExposeInterviews() {
  const fallback = useMemo<InterviewApiItem[]>(
    () =>
      EXPOSE_INTERVIEWS.map((v) => ({
        id: v.id,
        title: v.title,
        guest: v.guest,
        role: v.role,
        publishedAt: v.publishedAt,
        youtubeId: v.youtubeId,
        thumbnail: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`,
        summary: v.summary,
        tags: v.tags
      })),
    []
  );

  const [items, setItems] = useState<InterviewApiItem[]>(fallback);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [active, setActive] = useState<InterviewApiItem | null>(null);
  const [channel, setChannel] = useState<{ url: string; subscribeUrl: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const res = await fetch('/api/expose/videos?type=interviews');
      if (!res.ok) return;
      const json = (await res.json()) as {
        interviews?: InterviewApiItem[];
        uploads?: UploadItem[];
        channel?: { url: string; subscribeUrl: string };
      };
      if (!cancelled && Array.isArray(json.interviews) && json.interviews.length > 0) {
        setItems(json.interviews);
      }
      if (!cancelled && Array.isArray(json.uploads)) {
        setUploads(json.uploads.slice(0, 6));
      }
      if (!cancelled && json.channel?.url && json.channel.subscribeUrl) {
        setChannel(json.channel);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

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
              <Video className="w-4 h-4" />
              YouTube Interviews
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
              Real voices. Real proof.{' '}
              <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Zero hype.
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Interviews and explainers that teach victims what to do next, and expose fraud patterns with calm precision.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/75">
              <div className="font-extrabold text-white">Stay tuned.</div>
              <div className="mt-1 leading-relaxed">
                New episodes are in production—featuring high-impact public voices, founders, and verified experts to help expose fraud
                and protect families.
              </div>
            </div>
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
              <a
                href={(channel?.url || COMPANY.social.youtubeChannel)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
              >
                Watch VANHSYA Live <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={(channel?.subscribeUrl || COMPANY.social.youtubeSubscribe)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {uploads.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center justify-between gap-4">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">VANHSYA Live</div>
                <a
                  href={(channel?.url || COMPANY.social.youtubeChannel)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black transition-colors"
                >
                  View channel <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
                {uploads.map((u) => (
                  <a
                    key={u.id}
                    href={u.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="relative aspect-video bg-black">
                      <Image
                        src={u.thumbnail}
                        alt={u.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white font-extrabold line-clamp-2">{u.title}</div>
                    </div>
                    <div className="p-4 text-xs text-white/60 font-bold">
                      {new Date(u.publishedAt).toLocaleDateString()}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((v, idx) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <GlassCard className="border-white/10 overflow-hidden" hover={false}>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-white font-extrabold text-lg">{v.title}</div>
                        <div className="mt-1 text-sm text-white/70">
                          {v.guest}{v.role ? ` · ${v.role}` : ''} · {new Date(v.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <span className="neo-badge neo-badge-popular">INTERVIEW</span>
                    </div>
                    <div className="mt-4 text-sm text-white/70 leading-relaxed">{v.summary}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive(v)}
                    className="relative aspect-video bg-black w-full text-left"
                    aria-label={`Play video: ${v.title}`}
                  >
                    <Image
                      src={v.thumbnail}
                      alt={`${v.title} thumbnail`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={idx < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl flex items-center justify-center">
                        <Play className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </button>
                  <div className="p-6 pt-5 flex flex-wrap gap-2">
                    {v.tags.map((t) => (
                      <span key={t} className="neo-badge neo-badge-security">
                        {t}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />

      {active && (
        <VideoModal
          open={Boolean(active)}
          onClose={() => setActive(null)}
          youtubeId={active.youtubeId}
          title={active.title}
        />
      )}
    </main>
  );
}
