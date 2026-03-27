'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, Clock, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

type Destination = 'Canada' | 'Australia' | 'United Kingdom' | 'United States' | 'Germany' | 'UAE' | 'Singapore';
type VisaType = 'Tourist/Visit' | 'Study' | 'Work' | 'Business' | 'Family' | 'Permanent Residence';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatWeeks(weeks: number) {
  if (weeks < 4) return `${weeks} week${weeks === 1 ? '' : 's'}`;
  const months = Math.round(weeks / 4);
  return `${months} month${months === 1 ? '' : 's'}`;
}

export default function VisaTimelinePredictorPage() {
  const [destination, setDestination] = useState<Destination>('Canada');
  const [visaType, setVisaType] = useState<VisaType>('Tourist/Visit');
  const [riskTolerance, setRiskTolerance] = useState<number>(50);
  const [hasBiometrics, setHasBiometrics] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const estimate = useMemo(() => {
    const baseWeeksByVisa: Record<VisaType, number> = {
      'Tourist/Visit': 6,
      Study: 10,
      Work: 12,
      Business: 8,
      Family: 14,
      'Permanent Residence': 28,
    };

    const baseWeeksByDestination: Record<Destination, number> = {
      Canada: 2,
      Australia: 3,
      'United Kingdom': 1,
      'United States': 4,
      Germany: 2,
      UAE: 1,
      Singapore: 1,
    };

    const biometricsDelta = hasBiometrics ? -1 : 1.5;
    const riskBuffer = (100 - riskTolerance) / 100;
    const bufferWeeks = 2 + riskBuffer * 6;

    const raw = baseWeeksByVisa[visaType] + baseWeeksByDestination[destination] + biometricsDelta + bufferWeeks;
    const min = clamp(Math.round(raw * 0.65), 2, 52);
    const max = clamp(Math.round(raw * 1.25), min + 1, 78);

    const milestones = [
      { label: 'Profile & documents ready', weeksFromNow: 0.5 },
      { label: 'Submission window', weeksFromNow: 1.5 },
      { label: 'Biometrics / appointment', weeksFromNow: hasBiometrics ? 1.5 : 3.5 },
      { label: 'Decision band (most likely)', weeksFromNow: Math.round((min + max) / 2) },
      { label: 'Travel-safe buffer', weeksFromNow: max + 2 },
    ];

    return { min, max, milestones };
  }, [destination, visaType, riskTolerance, hasBiometrics]);

  const runPrediction = async () => {
    setIsLoading(true);
    setShowResult(false);
    await new Promise((r) => setTimeout(r, 1100));
    setIsLoading(false);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen text-white">
      <Navigation />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
              <Sparkles className="h-4 w-4" />
              Visa Timeline Predictor
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Predict your timeline
              </span>{' '}
              <span className="bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                before you apply
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              A risk-aware timeline forecast built for immigration and tourism planning. It generates a decision band,
              milestones, and a travel-safe buffer.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Destination</span>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value as Destination)}
                    className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                  >
                    {(['Canada', 'Australia', 'United Kingdom', 'United States', 'Germany', 'UAE', 'Singapore'] as Destination[]).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Visa Type</span>
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value as VisaType)}
                    className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                  >
                    {(['Tourist/Visit', 'Study', 'Work', 'Business', 'Family', 'Permanent Residence'] as VisaType[]).map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Risk Tolerance</span>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={riskTolerance}
                      onChange={(e) => setRiskTolerance(Number(e.target.value))}
                      className="w-full accent-amber-400"
                      aria-label="Risk tolerance slider"
                    />
                    <span className="min-w-[64px] text-sm font-black text-amber-200/80">{riskTolerance}%</span>
                  </div>
                  <p className="text-sm text-slate-500">
                    Lower tolerance adds buffer weeks so your travel plan stays resilient across real-world delays.
                  </p>
                </label>

                <label className="flex items-center gap-3 sm:col-span-2 bg-black/25 border border-white/10 rounded-2xl px-4 py-3">
                  <input
                    type="checkbox"
                    checked={hasBiometrics}
                    onChange={(e) => setHasBiometrics(e.target.checked)}
                    className="h-4 w-4 accent-amber-400"
                  />
                  <span className="text-sm font-bold text-slate-200">I already have valid biometrics on file</span>
                </label>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={runPrediction}
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Clock className="h-5 w-5 animate-spin" />
                      Predicting…
                    </>
                  ) : (
                    <>
                      <ArrowRight className="h-5 w-5" />
                      Predict My Timeline
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 flex items-start gap-3 text-slate-500 text-sm">
                <ShieldAlert className="h-4 w-4 mt-0.5 text-amber-200/70" />
                <p>
                  This tool provides a planning estimate. Official processing times vary by embassy load, region, and
                  seasonality.
                </p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <AnimatePresence mode="wait">
                {showResult ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-black">Predicted Decision Band</h2>
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
                        {destination} • {visaType}
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Fast Case</p>
                        <p className="mt-2 text-3xl font-black text-white">{formatWeeks(estimate.min)}</p>
                      </div>
                      <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Buffered Plan</p>
                        <p className="mt-2 text-3xl font-black text-white">{formatWeeks(estimate.max)}</p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-sm font-black uppercase tracking-[0.25em] text-slate-400">Milestones</h3>
                      <div className="mt-4 space-y-3">
                        {estimate.milestones.map((m) => (
                          <div key={m.label} className="flex items-center justify-between bg-black/25 border border-white/10 rounded-2xl px-4 py-3">
                            <span className="text-sm font-bold text-slate-200">{m.label}</span>
                            <span className="text-sm font-black text-amber-200/80">~{formatWeeks(Math.max(1, Math.round(m.weeksFromNow)))} </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-center"
                  >
                    <div className="text-center">
                      <div className="mx-auto w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        <Calendar className="h-7 w-7 text-amber-200/80" />
                      </div>
                      <h2 className="mt-6 text-2xl font-black">Your timeline will appear here</h2>
                      <p className="mt-3 text-slate-400">
                        Run the predictor to generate a decision band, milestones, and a travel-safe buffer.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
