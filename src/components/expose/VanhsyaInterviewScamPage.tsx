'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import Image from 'next/image';
import Link from 'next/link';
import { tryGetSupabaseBrowserClient } from '@/lib/supabaseClient';
import { ArrowRight, Download, FileText, Gavel, Headphones, Lock, Shield, X } from 'lucide-react';

type Source = {
  label: string;
  url: string;
};

type TimelineItem = {
  date: string;
  title: string;
  details: string;
  sources: Source[];
};

type Testimony = {
  pseudonym: string;
  location?: string;
  summary: string;
  sources: Source[];
};

type AuthorityStatement = {
  authority: string;
  date: string;
  statement: string;
  sources: Source[];
};

type EvidenceItem = {
  title: string;
  description: string;
  sources: Source[];
};

type AudioRecord = {
  id: string;
  title: string;
  date?: string;
  publicUrl?: string;
  transcript?: string;
  transcriptSource?: Source;
};

type EvidenceImage = {
  src: string;
  alt: string;
  caption: string;
  source?: Source;
};

function duckBackground() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('vanhsya:media:duck', { detail: { level: 0.14, ms: 180 } }));
}

function unduckBackground() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('vanhsya:media:unduck', { detail: { ms: 220 } }));
}

function onlyWithSources<T extends { sources: Source[] }>(items: T[]) {
  return items.filter((i) => Array.isArray(i.sources) && i.sources.length > 0 && i.sources.every((s) => s?.url));
}

export default function VanhsyaInterviewScamPage() {
  const [authed, setAuthed] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<EvidenceImage | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const supabase = tryGetSupabaseBrowserClient();
        if (!supabase) {
          if (!cancelled) setAuthed(false);
          return;
        }
        const { data } = await supabase.auth.getSession();
        if (!cancelled) setAuthed(Boolean(data.session?.user));
      } catch {
        if (!cancelled) setAuthed(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const downloadRecording = async (id: string) => {
    setDownloading(id);
    try {
      const supabase = tryGetSupabaseBrowserClient();
      if (!supabase) {
        setAuthed(false);
        return;
      }
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setAuthed(false);
        return;
      }

      const res = await fetch(`/api/expose/interviews/audio/${encodeURIComponent(id)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const cd = res.headers.get('content-disposition') || '';
      const m = /filename="([^"]+)"/i.exec(cd);
      const name = m?.[1] || `${id}.bin`;

      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } finally {
      setDownloading((cur) => (cur === id ? null : cur));
    }
  };

  const timeline = useMemo<TimelineItem[]>(
    () =>
      onlyWithSources([
        {
          date: '',
          title: '',
          details: '',
          sources: [],
        },
      ]).filter((x) => x.date && x.title),
    []
  );

  const testimonies = useMemo<Testimony[]>(
    () =>
      onlyWithSources([
        {
          pseudonym: '',
          summary: '',
          sources: [],
        },
      ]).filter((x) => x.pseudonym && x.summary),
    []
  );

  const authorityStatements = useMemo<AuthorityStatement[]>(
    () =>
      onlyWithSources([
        {
          authority: '',
          date: '',
          statement: '',
          sources: [],
        },
      ]).filter((x) => x.authority && x.date && x.statement),
    []
  );

  const evidence = useMemo<EvidenceItem[]>(
    () =>
      onlyWithSources([
        {
          title: '',
          description: '',
          sources: [],
        },
      ]).filter((x) => x.title && x.description),
    []
  );

  const audio = useMemo<AudioRecord[]>(
    () => [
      {
        id: 'vanhsya-interview-scam-audio-001',
        title: 'Recording 1',
        publicUrl: undefined,
        transcript: undefined,
      },
    ],
    []
  );

  const images = useMemo<EvidenceImage[]>(
    () => [
      {
        src: '/images/og-default.jpg',
        alt: 'Evidence placeholder',
        caption: 'Replace with verified, labeled evidence screenshots and documentation.',
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90">
              <Shield className="w-4 h-4" />
              Case File
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
              Vanhsya Interview Scam{' '}
              <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                evidence hub
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              This page is built to display only items that include sources. Add verified sources (official statements, public
              records, and redacted evidence packs) to publish full timelines and testimony.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/expose/interviews"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
              >
                Back to Interviews <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/expose/victim-stories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold transition-colors"
              >
                Submit Evidence <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="border-white/10" hover={false}>
              <div className="p-6">
                <div className="flex items-center gap-2 text-white font-black">
                  <FileText className="w-5 h-5 text-white/80" />
                  <span>Chronological Timeline</span>
                </div>
                {timeline.length ? (
                  <div className="mt-5 space-y-4">
                    {timeline.map((t) => (
                      <div key={`${t.date}:${t.title}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                        <div className="text-xs text-white/60 font-bold">{t.date}</div>
                        <div className="mt-1 text-white font-extrabold">{t.title}</div>
                        <div className="mt-2 text-sm text-white/70 leading-relaxed">{t.details}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {t.sources.map((s) => (
                            <a
                              key={s.url}
                              href={s.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white/90 text-xs font-bold transition-colors"
                            >
                              {s.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 text-sm text-white/65">
                    No verified timeline entries are published yet for this case file.
                  </div>
                )}
              </div>
            </GlassCard>

            <GlassCard className="border-white/10" hover={false}>
              <div className="p-6">
                <div className="flex items-center gap-2 text-white font-black">
                  <Headphones className="w-5 h-5 text-white/80" />
                  <span>Audio Recordings</span>
                </div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">
                  Background music automatically ducks while a recording plays. Downloads require an authenticated portal session.
                </div>

                <div className="mt-5 space-y-4">
                  {audio.map((a) => (
                    <div key={a.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-white font-extrabold truncate">{a.title}</div>
                          <div className="mt-1 text-xs text-white/60 font-bold">{a.date || 'Date pending verification'}</div>
                        </div>
                        {authed ? (
                          <button
                            type="button"
                            onClick={() => downloadRecording(a.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs transition-colors"
                            aria-label={`Download ${a.title}`}
                            disabled={downloading === a.id}
                          >
                            <Download className="w-4 h-4" />
                            {downloading === a.id ? 'Downloading…' : 'Download'}
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-white/70 text-xs font-bold">
                            <Lock className="w-4 h-4" />
                            Sign in to download
                          </div>
                        )}
                      </div>

                      {a.publicUrl ? (
                        <div className="mt-4">
                          <audio
                            controls
                            preload="metadata"
                            className="w-full"
                            onPlay={duckBackground}
                            onPause={unduckBackground}
                            onEnded={unduckBackground}
                          >
                            <source src={a.publicUrl} />
                          </audio>
                        </div>
                      ) : (
                        <div className="mt-4 text-sm text-white/65">
                          Audio file not attached yet. Add a public playback URL or host it behind the authenticated download API.
                        </div>
                      )}

                      {a.transcript ? (
                        <details className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                          <summary className="cursor-pointer text-white font-extrabold text-sm">Transcript</summary>
                          <div className="mt-3 text-sm text-white/70 whitespace-pre-wrap leading-relaxed">{a.transcript}</div>
                          {a.transcriptSource ? (
                            <div className="mt-3">
                              <a
                                href={a.transcriptSource.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-amber-200 font-bold hover:text-white transition-colors"
                              >
                                Source: {a.transcriptSource.label}
                              </a>
                            </div>
                          ) : null}
                        </details>
                      ) : (
                        <div className="mt-4 text-sm text-white/60">
                          Transcript not published yet. Add a synchronized transcript to meet accessibility requirements.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="border-white/10" hover={false}>
              <div className="p-6">
                <div className="flex items-center gap-2 text-white font-black">
                  <Gavel className="w-5 h-5 text-white/80" />
                  <span>Authority Statements</span>
                </div>
                {authorityStatements.length ? (
                  <div className="mt-5 space-y-4">
                    {authorityStatements.map((s) => (
                      <div key={`${s.authority}:${s.date}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                        <div className="text-white font-extrabold">{s.authority}</div>
                        <div className="mt-1 text-xs text-white/60 font-bold">{s.date}</div>
                        <div className="mt-3 text-sm text-white/70 whitespace-pre-wrap leading-relaxed">{s.statement}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {s.sources.map((src) => (
                            <a
                              key={src.url}
                              href={src.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white/90 text-xs font-bold transition-colors"
                            >
                              {src.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 text-sm text-white/65">No verified authority statements are published yet for this case file.</div>
                )}
              </div>
            </GlassCard>

            <GlassCard className="border-white/10" hover={false}>
              <div className="p-6">
                <div className="flex items-center gap-2 text-white font-black">
                  <Shield className="w-5 h-5 text-white/80" />
                  <span>Victim Testimonies</span>
                </div>
                {testimonies.length ? (
                  <div className="mt-5 space-y-4">
                    {testimonies.map((t) => (
                      <div key={t.pseudonym} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                        <div className="text-white font-extrabold">{t.pseudonym}</div>
                        <div className="mt-1 text-xs text-white/60 font-bold">{t.location || 'Location withheld'}</div>
                        <div className="mt-3 text-sm text-white/70 whitespace-pre-wrap leading-relaxed">{t.summary}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {t.sources.map((src) => (
                            <a
                              key={src.url}
                              href={src.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white/90 text-xs font-bold transition-colors"
                            >
                              {src.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 text-sm text-white/65">No verified testimonies are published yet for this case file.</div>
                )}
              </div>
            </GlassCard>

            <GlassCard className="border-white/10" hover={false}>
              <div className="p-6">
                <div className="text-white font-black">Evidence Gallery</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">
                  High-resolution, labeled images (screenshots, documents, proof) should be uploaded with captions and sources.
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {images.map((img) => (
                    <button
                      key={img.src + img.caption}
                      type="button"
                      onClick={() => setLightbox(img)}
                      className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black hover:border-white/20 transition-colors"
                      aria-label={`Open image: ${img.caption}`}
                    >
                      <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
                      <div className="absolute left-3 right-3 bottom-3 text-[11px] font-black text-white/90 line-clamp-2">
                        {img.caption}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="border-white/10" hover={false}>
              <div className="p-6">
                <div className="text-white font-black">Evidence Index</div>
                {evidence.length ? (
                  <div className="mt-5 space-y-4">
                    {evidence.map((e) => (
                      <div key={e.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                        <div className="text-white font-extrabold">{e.title}</div>
                        <div className="mt-2 text-sm text-white/70 leading-relaxed">{e.description}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {e.sources.map((s) => (
                            <a
                              key={s.url}
                              href={s.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white/90 text-xs font-bold transition-colors"
                            >
                              {s.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 text-sm text-white/65">No verified evidence items are published yet for this case file.</div>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99]"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute inset-0 bg-black/80"
              aria-label="Close image preview"
            />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 top-1/2 w-[94vw] max-w-5xl -translate-x-1/2 -translate-y-1/2"
            >
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <div className="min-w-0">
                    <div className="text-white font-extrabold truncate">Evidence</div>
                    <div className="mt-1 text-xs text-white/60 font-bold truncate">{lightbox.caption}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="relative w-full aspect-video bg-black">
                  <Image src={lightbox.src} alt={lightbox.alt} fill sizes="(max-width: 768px) 100vw, 80vw" className="object-contain" />
                </div>
                <div className="p-5 border-t border-white/10">
                  <div className="text-sm text-white/80 leading-relaxed">{lightbox.caption}</div>
                  {lightbox.source ? (
                    <a
                      href={lightbox.source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-xs text-amber-200 font-bold hover:text-white transition-colors"
                    >
                      {lightbox.source.label}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
