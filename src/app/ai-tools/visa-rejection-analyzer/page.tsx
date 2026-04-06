'use client';

import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import LanguageSelect from '@/components/ai/LanguageSelect';
import { addProgressEvent } from '@/lib/toolProgress';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, ScanText, ShieldAlert } from 'lucide-react';

type Result = {
  summary: string;
  detectedReasons: { id: string; confidence: number; evidence: string[]; whyItFailed: string[] }[];
  improvementPlan: { priority: 'high' | 'medium' | 'low'; action: string; evidenceToAdd: string[] }[];
  nextAttemptChecklist: string[];
  disclaimer: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

export default function VisaRejectionAnalyzerPage() {
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('Canada');
  const [pathway, setPathway] = useState('Study');
  const [letterText, setLetterText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const wordCount = useMemo(() => (letterText.trim().match(/\S+/g) || []).length, [letterText]);

  const run = async () => {
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/ai/visa-rejection-analyzer', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ letterText, country, pathway, language })
      });
      const json = (await res.json().catch(() => null)) as Result | { error?: string } | null;
      if (!res.ok) {
        setError((json as { error?: string } | null)?.error || 'Failed to analyze.');
        setLoading(false);
        return;
      }
      const data = json as Result;
      setResult(data);
      addProgressEvent({
        toolId: 'visa-rejection-analyzer',
        label: `Rejection analysis (${country} • ${pathway})`,
        score: Math.max(
          1,
          Math.min(100, 100 - Math.round((data.detectedReasons.reduce((a, r) => a + r.confidence, 0) / Math.max(1, data.detectedReasons.length)) * 60))
        ),
        meta: { country, pathway, words: wordCount }
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
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Visa Rejection Analyzer</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Turn refusal into a targeted plan.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Paste the rejection letter. Get the most likely failure points, evidence gaps, and a prioritized improvement strategy.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-6 p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <ScanText className="w-5 h-5 text-amber-200" />
                  <div className="text-white font-extrabold text-xl">Rejection letter</div>
                </div>
                <LanguageSelect value={language} onChange={setLanguage} />
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country (e.g., Canada)"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <input
                  value={pathway}
                  onChange={(e) => setPathway(e.target.value)}
                  placeholder="Pathway (Study / Work / Visitor)"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <textarea
                value={letterText}
                onChange={(e) => setLetterText(e.target.value)}
                placeholder="Paste the full refusal letter text here…"
                className="mt-4 w-full min-h-[260px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              />
              <div className="mt-3 text-sm text-white/60">
                Words: <span className="text-white font-bold">{wordCount}</span>
              </div>

              {error ? <div className="mt-4 text-sm text-amber-200">{error}</div> : null}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled={loading || !letterText.trim()}
                  onClick={run}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-60"
                >
                  <ShieldAlert className="w-4 h-4" />
                  {loading ? 'Analyzing…' : 'Analyze'}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLetterText('')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                >
                  Clear
                </button>
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-6 p-7 border-white/10" hover={false}>
              <div className="text-white font-extrabold text-xl">Analysis</div>
              <div className="mt-2 text-white/70">Results appear here after analysis.</div>

              {result ? (
                <div className="mt-6 space-y-6">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Summary</div>
                    <div className="mt-3 text-white/80 leading-relaxed">{result.summary}</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Likely reasons</div>
                    <div className="mt-4 space-y-4">
                      {result.detectedReasons.slice(0, 5).map((r) => (
                        <div key={`${r.id}_${r.confidence}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="text-white font-extrabold">{r.id}</div>
                            <div className="text-white/70 font-bold">{Math.round(r.confidence * 100)}%</div>
                          </div>
                          <div className="mt-3 text-sm text-white/70 space-y-2">
                            {r.whyItFailed.slice(0, 3).map((x) => (
                              <div key={x} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                                <span>{x}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Improvement plan</div>
                    <div className="mt-4 space-y-3 text-sm text-white/75">
                      {result.improvementPlan.slice(0, 10).map((a) => (
                        <div key={a.action} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="text-white font-extrabold">{a.action}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-200">{a.priority}</div>
                          </div>
                          <div className="mt-3 space-y-2">
                            {a.evidenceToAdd.slice(0, 3).map((x) => (
                              <div key={x} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                                <span>{x}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
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

