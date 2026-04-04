'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import { COMPANY } from '@/lib/company';
import { EXPOSE_CASES } from '@/data/expose/cases';
import { ArrowRight, BadgeCheck, FileWarning, Play, ShieldAlert, Upload, UserCheck, Video } from 'lucide-react';
import VideoModal from '@/components/expose/VideoModal';

type InterviewVideo = {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  publishedAt: string;
  guest: string;
  role?: string;
};

type ScamType =
  | 'Fake Agent / Consultancy'
  | 'Fake Job Offer'
  | 'Embassy / Government Impersonation'
  | 'Document Fraud'
  | 'Payment / Wallet Scam'
  | 'Other';

type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

const scamTypes: ScamType[] = [
  'Fake Agent / Consultancy',
  'Fake Job Offer',
  'Embassy / Government Impersonation',
  'Document Fraud',
  'Payment / Wallet Scam',
  'Other'
];

const severities: Severity[] = ['Low', 'Medium', 'High', 'Critical'];

export default function VictimStories() {
  const [scamType, setScamType] = useState<ScamType>('Fake Agent / Consultancy');
  const [severity, setSeverity] = useState<Severity>('High');
  const [country, setCountry] = useState('');
  const [amountLost, setAmountLost] = useState('');
  const [summary, setSummary] = useState('');
  const [contactPreference, setContactPreference] = useState<'WhatsApp' | 'Email' | 'Call'>('Email');
  const [anonymous, setAnonymous] = useState(true);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [evidence, setEvidence] = useState<FileList | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const published = useMemo(() => EXPOSE_CASES.slice().sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)), []);
  const [videos, setVideos] = useState<InterviewVideo[]>([]);
  const [activeVideo, setActiveVideo] = useState<InterviewVideo | null>(null);
  const [channel, setChannel] = useState<{ url: string; subscribeUrl: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const res = await fetch('/api/expose/videos?type=interviews');
      if (!res.ok) return;
      const json = (await res.json()) as { interviews?: InterviewVideo[]; channel?: { url: string; subscribeUrl: string } };
      if (!cancelled && Array.isArray(json.interviews)) {
        setVideos(json.interviews.slice(0, 3));
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

  const submit = async () => {
    setSubmitError(null);
    setTrackingId(null);

    if (!country.trim() || !summary.trim()) {
      setSubmitError('Country and story details are required.');
      return;
    }

    if (!anonymous && contactPreference === 'Email' && !contactEmail.trim()) {
      setSubmitError('Email is required when not anonymous and Email is selected.');
      return;
    }

    if (!anonymous && contactPreference !== 'Email' && !contactPhone.trim()) {
      setSubmitError('Phone is required when not anonymous and WhatsApp/Call is selected.');
      return;
    }

    const form = new FormData();
    form.set('scamType', scamType);
    form.set('severity', severity);
    form.set('country', country);
    form.set('amountLost', amountLost);
    form.set('summary', summary);
    form.set('contactPreference', contactPreference);
    form.set('anonymous', String(anonymous));
    form.set('contactEmail', contactEmail);
    form.set('contactPhone', contactPhone);

    const files = evidence ? Array.from(evidence).slice(0, 5) : [];
    for (const f of files) form.append('evidence', f);

    setSubmitting(true);
    try {
      const res = await fetch('/api/expose/submit', { method: 'POST', body: form });
      const json = (await res.json().catch(() => null)) as { id?: string; error?: string } | null;
      if (!res.ok) {
        setSubmitError(json?.error || 'Submission failed');
        return;
      }
      if (!json?.id) {
        setSubmitError('Submission failed');
        return;
      }
      setTrackingId(json.id);
      setCountry('');
      setAmountLost('');
      setSummary('');
      setEvidence(null);
      setContactEmail('');
      setContactPhone('');
      setAnonymous(true);
      setContactPreference('Email');
      setSeverity('High');
      setScamType('Fake Agent / Consultancy');
    } catch {
      setSubmitError('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90">
              <ShieldAlert className="w-4 h-4" />
              Victim Stories
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
              Submit your case.{' '}
              <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Protect others.
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Share what happened with supporting evidence. We review submissions, verify details, and publish only public-safe
              information. No passport numbers, OTPs, or bank credentials.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/expose"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
              >
                Back to Expose <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={COMPANY.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold transition-colors"
              >
                WhatsApp Support <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black min-h-[320px]">
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1600"
                  alt="Victim support and fraud exposure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/70">Multimedia storytelling</div>
                  <div className="mt-3 text-2xl md:text-3xl font-extrabold text-white">
                    Stories, evidence, interviews, and verified signals — in one platform.
                  </div>
                  <div className="mt-3 text-white/70 max-w-xl">
                    We highlight victim narratives with public-safe publishing, video interviews, and industry watchlists so fewer people fall for the same scams.
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/expose/interviews"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                    >
                      Watch interviews <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/expose/industry-watch"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                    >
                      Read industry watch <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <GlassCard className="p-6 border-white/10 h-full" hover={false}>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Featured videos</div>
                  <span className="neo-badge neo-badge-popular">API powered</span>
                </div>

                <div className="mt-5 space-y-3">
                  {videos.length === 0 && (
                    <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-5 text-sm text-white/70">
                      Loading interviews…
                    </div>
                  )}
                  {videos.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActiveVideo(v)}
                      className="w-full text-left rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 overflow-hidden transition-colors"
                      aria-label={`Play video: ${v.title}`}
                    >
                      <div className="flex gap-4 p-4">
                        <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-black shrink-0">
                          <Image
                            src={v.thumbnail}
                            alt={`${v.title} thumbnail`}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xl flex items-center justify-center">
                              <Play className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="text-white font-extrabold line-clamp-2">{v.title}</div>
                          <div className="mt-2 text-xs text-white/60 flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            <span className="truncate">{v.guest}{v.role ? ` · ${v.role}` : ''}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    href="/expose/interviews"
                    className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black"
                  >
                    View all interviews <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={(channel?.url || COMPANY.social.youtubeChannel)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                  >
                    Watch VANHSYA Live <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={(channel?.subscribeUrl || COMPANY.social.youtubeSubscribe)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                  >
                    Subscribe <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </GlassCard>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <GlassCard className="p-8 border-white/10" hover={false}>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Secure Submission</div>
                  <span className="neo-badge neo-badge-security">Evidence upload + tracking</span>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Scam type</span>
                    <select
                      value={scamType}
                      onChange={(e) => setScamType(e.target.value as ScamType)}
                      aria-label="Scam type"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    >
                      {scamTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Severity</span>
                    <select
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value as Severity)}
                      aria-label="Severity"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    >
                      {severities.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Country / region</span>
                    <input
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      aria-label="Country"
                      placeholder="Where it happened"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Amount lost (optional)</span>
                    <input
                      value={amountLost}
                      onChange={(e) => setAmountLost(e.target.value)}
                      aria-label="Amount lost"
                      placeholder="e.g., 1200 USD"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    />
                  </label>
                </div>

                <div className="mt-4 space-y-4">
                  <label className="space-y-2 block">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">What happened?</span>
                    <textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      aria-label="Story"
                      rows={8}
                      placeholder="Explain what happened. Do not include passport numbers, OTPs, or bank details."
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-amber-400/40 resize-none"
                    />
                  </label>

                  <label className="space-y-2 block">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Evidence files (optional)</span>
                    <div className="flex items-center justify-between gap-3 bg-black/30 border border-white/10 rounded-2xl px-4 py-3">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => setEvidence(e.target.files)}
                        aria-label="Upload evidence"
                        className="text-sm text-white/80"
                      />
                      <Upload className="w-5 h-5 text-amber-200" />
                    </div>
                    <div className="text-xs text-white/50">
                      Up to 5 files, max 10MB each. Avoid sensitive data.
                    </div>
                  </label>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Contact preference</span>
                    <select
                      value={contactPreference}
                      onChange={(e) => setContactPreference(e.target.value as any)}
                      aria-label="Contact preference"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    >
                      {['WhatsApp', 'Email', 'Call'].map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-3">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      aria-label="Anonymous"
                      className="h-4 w-4"
                    />
                    <span className="text-sm font-black text-white/90">Submit anonymously</span>
                  </label>
                </div>

                <AnimatePresence>
                  {!anonymous && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <label className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Email (optional)</span>
                        <input
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          aria-label="Email"
                          placeholder="you@example.com"
                          className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                        />
                      </label>
                      <label className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Phone (optional)</span>
                        <input
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          aria-label="Phone"
                          placeholder="+971..."
                          className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                        />
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>

                {submitError && <div className="mt-4 text-sm text-red-200">{submitError}</div>}

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors disabled:opacity-60"
                  >
                    {submitting ? 'Submitting…' : 'Submit Case'} <ArrowRight className="h-5 w-5" />
                  </button>
                  <Link
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 text-white font-black transition-colors"
                  >
                    Talk to VANHSYA <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>

                {trackingId && (
                  <div className="mt-6 rounded-2xl bg-white/[0.06] border border-white/10 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.25em] text-white/60">Tracking ID</div>
                        <div className="mt-2 text-lg font-extrabold text-white">{trackingId}</div>
                        <div className="mt-2 text-sm text-white/70">
                          Save this ID. You can track status anytime.
                        </div>
                      </div>
                      <BadgeCheck className="w-6 h-6 text-green-300" />
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/expose/track/${trackingId}`}
                        className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black"
                      >
                        Track status <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </GlassCard>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <GlassCard className="p-6 border-white/10" hover={false}>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">How we protect you</div>
                <div className="mt-5 space-y-3 text-sm text-white/70 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <UserCheck className="w-5 h-5 text-emerald-200 mt-0.5" />
                    <div>
                      <div className="font-black text-white">Verification-first publishing</div>
                      <div>We publish only public-safe and verified details to protect victims and avoid harmful exposure.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileWarning className="w-5 h-5 text-amber-200 mt-0.5" />
                    <div>
                      <div className="font-black text-white">No sensitive data</div>
                      <div>Do not upload passports, OTPs, banking logins, or private contracts without redaction.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="w-5 h-5 text-purple-200 mt-0.5" />
                    <div>
                      <div className="font-black text-white">Case tracking</div>
                      <div>Every submission receives a tracking ID so you can follow review status.</div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 border-white/10" hover={false}>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Published stories</div>
                <div className="mt-5 space-y-3">
                  {published.slice(0, 6).map((c) => (
                    <Link
                      key={c.id}
                      href={`/expose/cases/${c.slug}`}
                      className="block rounded-2xl bg-white/[0.05] border border-white/10 p-4 hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black shrink-0 border border-white/10">
                          <Image
                            src={c.coverImage || 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600'}
                            alt={c.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/25" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="text-white font-extrabold line-clamp-2">{c.title}</div>
                              <div className="mt-1 text-xs text-white/60">{c.country} · {c.scamType}</div>
                            </div>
                            <span className="neo-badge neo-badge-security">{c.severity.toUpperCase()}</span>
                          </div>
                          <div className="mt-3 text-sm text-white/70 line-clamp-2">{c.summary}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {activeVideo && (
        <VideoModal
          open={Boolean(activeVideo)}
          onClose={() => setActiveVideo(null)}
          youtubeId={activeVideo.youtubeId}
          title={activeVideo.title}
        />
      )}
    </main>
  );
}
