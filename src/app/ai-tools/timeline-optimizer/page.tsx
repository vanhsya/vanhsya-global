'use client';

import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import LanguageSelect from '@/components/ai/LanguageSelect';
import { addProgressEvent } from '@/lib/toolProgress';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, CalendarClock, Sparkles } from 'lucide-react';

type Result = {
  summary: string;
  milestones: { title: string; dueDate: string; durationDays: number; risk: 'low' | 'medium' | 'high'; notes: string[] }[];
  buffers: { title: string; days: number; why: string }[];
  optimizationTips: string[];
  disclaimer: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

export default function TimelineOptimizerPage() {
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('Canada');
  const [pathway, setPathway] = useState('Study');
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    return iso;
  });
  const [constraints, setConstraints] = useState('I want the fastest realistic timeline with conservative buffers.');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const riskColor = useMemo(() => ({ low: 'text-emerald-200', medium: 'text-amber-200', high: 'text-pink-200' }), []);

  const run = async () => {
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/ai/timeline-optimizer', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ country, pathway, startDate, constraints, language })
      });
      const json = (await res.json().catch(() => null)) as Result | { error?: string } | null;
      if (!res.ok) {
        setError((json as { error?: string } | null)?.error || 'Failed to optimize.');
        setLoading(false);
        return;
      }
      const data = json as Result;
      setResult(data);
      addProgressEvent({
        toolId: 'timeline-optimizer',
        label: `Timeline plan (${country} • ${pathway})`,
        score: 85,
        meta: { milestones: data.milestones.length }
      });
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A10] text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 header-blur-vanhsya">
              <BadgeCheck className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Timeline Optimizer</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Plan milestones with buffers and risk flags.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Build a realistic schedule for your country and pathway. Includes conservative buffers and optimization tips.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-5 p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-amber-200" />
                  <div className="text-white font-extrabold text-xl">Inputs</div>
                </div>
                <LanguageSelect value={language} onChange={setLanguage} />
              </div>

              <div className="mt-5 space-y-4">
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country (e.g., Canada)"
                  className="h-12 w-full px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <input
                  value={pathway}
                  onChange={(e) => setPathway(e.target.value)}
                  placeholder="Pathway (Study / Work / PR)"
                  className="h-12 w-full px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <input
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  aria-label="Start date"
                  type="date"
                  className="h-12 w-full px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <textarea
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="Constraints, deadlines, preferences…"
                  className="min-h-[160px] w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              {error ? <div className="mt-4 text-sm text-amber-200">{error}</div> : null}

              <div className="mt-6">
                <button
                  type="button"
                  disabled={loading}
                  onClick={run}
                  className="w-full inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-60"
                >
                  <Sparkles className="w-4 h-4" />
                  {loading ? 'Optimizing…' : 'Generate timeline'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-7 p-7 border-white/10" hover={false}>
              <div className="text-white font-extrabold text-xl">Timeline</div>
              <div className="mt-2 text-white/70">Milestones and tips appear here.</div>

              {result ? (
                <div className="mt-6 space-y-6">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Summary</div>
                    <div className="mt-3 text-white/80 leading-relaxed">{result.summary}</div>
                  </div>

                  <div className="space-y-3">
                    {result.milestones.slice(0, 14).map((m) => (
                      <div key={`${m.title}_${m.dueDate}`} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-white font-extrabold">{m.title}</div>
                            <div className="mt-2 text-sm text-white/60">
                              Due: <span className="text-white/80">{m.dueDate}</span> · Duration: {m.durationDays} days
                            </div>
                          </div>
                          <div className={`text-[10px] font-black uppercase tracking-[0.25em] ${riskColor[m.risk]}`}>{m.risk}</div>
                        </div>
                        <div className="mt-3 space-y-2 text-sm text-white/70">
                          {m.notes.slice(0, 2).map((x) => (
                            <div key={x} className="flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                              <span>{x}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Buffers</div>
                      <div className="mt-4 space-y-3 text-sm text-white/75">
                        {result.buffers.slice(0, 6).map((b) => (
                          <div key={b.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                            <div className="flex items-center justify-between gap-4">
                              <div className="text-white font-extrabold">{b.title}</div>
                              <div className="text-white/70 font-bold">{b.days}d</div>
                            </div>
                            <div className="mt-2 text-white/70">{b.why}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Optimization tips</div>
                      <div className="mt-4 space-y-2 text-sm text-white/75">
                        {result.optimizationTips.slice(0, 10).map((x) => (
                          <div key={x} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                            <span>{x}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-white/60">{result.disclaimer}</div>
                </div>
              ) : null}
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

