'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Compass, Sparkles, MapPin, CalendarDays, ArrowRight, BadgeCheck, Plane, Utensils, Landmark } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Destination = 'UAE' | 'Singapore' | 'United Kingdom' | 'Germany' | 'Canada' | 'Australia' | 'United States';
type Interest = 'Culture' | 'Food' | 'Nature' | 'Shopping' | 'Nightlife' | 'Family';

const interestToBlocks: Record<Interest, Array<{ icon: LucideIcon; label: string }>> = {
  Culture: [
    { icon: Landmark, label: 'Museums + heritage walks' },
    { icon: BadgeCheck, label: 'Local guided tours' },
  ],
  Food: [
    { icon: Utensils, label: 'Top-rated local dining' },
    { icon: BadgeCheck, label: 'Food market crawl' },
  ],
  Nature: [
    { icon: Compass, label: 'National parks + viewpoints' },
    { icon: BadgeCheck, label: 'Day hikes + photo spots' },
  ],
  Shopping: [
    { icon: MapPin, label: 'Flagship malls + outlets' },
    { icon: BadgeCheck, label: 'Tax-free planning' },
  ],
  Nightlife: [
    { icon: Plane, label: 'Night cityscape experiences' },
    { icon: BadgeCheck, label: 'Safe transport routing' },
  ],
  Family: [
    { icon: BadgeCheck, label: 'Family-friendly attractions' },
    { icon: MapPin, label: 'Low-walk transit routing' },
  ],
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function TravelItineraryAIPage() {
  const [destination, setDestination] = useState<Destination>('UAE');
  const [days, setDays] = useState<number>(7);
  const [interests, setInterests] = useState<Interest[]>(['Culture', 'Food']);
  const [budget, setBudget] = useState<'Budget' | 'Comfort' | 'Premium'>('Comfort');
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const plan = useMemo(() => {
    const d = clamp(days, 3, 21);
    const blocks = interests.flatMap((i) => interestToBlocks[i]).slice(0, 6);
    const dayCards = Array.from({ length: d }).map((_, i) => {
      const day = i + 1;
      const theme = interests[(i + interests.length) % interests.length];
      const pack = interestToBlocks[theme];
      return {
        day,
        title: `Day ${day}: ${theme} focus`,
        bullets: [
          `Morning: ${pack[0]?.label ?? 'Arrivals + city orientation'}`,
          `Afternoon: ${pack[1]?.label ?? 'Signature experience'}`,
          `Evening: Sunset spots + reservations`,
        ],
      };
    });

    const visaSmartTips = [
      'Build a single, consistent itinerary that matches your stated purpose.',
      'Align hotel nights with flights and include a simple return plan.',
      'Reserve refundable options where possible and keep confirmation PDFs.',
    ];

    const costHints: Record<typeof budget, string> = {
      Budget: 'Optimized for public transit, compact routing, and free experiences.',
      Comfort: 'Balanced: premium highlights with flexible reservations.',
      Premium: 'High-touch: curated routes, premium dining windows, and private transfers.',
    };

    return { blocks, dayCards, visaSmartTips, costHint: costHints[budget] };
  }, [budget, days, interests]);

  const toggleInterest = (i: Interest) => {
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const generate = async () => {
    setIsLoading(true);
    setShow(false);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setShow(true);
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
              <Compass className="h-4 w-4" />
              Travel Itinerary AI
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Visa-smart itineraries
              </span>{' '}
              <span className="bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                that adapt
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Generate a premium trip plan that also supports your visa narrative—clean structure, realistic timing, and
              consistent documentation.
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
                    {(['UAE', 'Singapore', 'United Kingdom', 'Germany', 'Canada', 'Australia', 'United States'] as Destination[]).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Trip Length (days)</span>
                  <input
                    type="number"
                    min={3}
                    max={21}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                  />
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Budget Style</span>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Budget', 'Comfort', 'Premium'] as const).map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`px-3 py-3 rounded-2xl border text-sm font-black transition-colors ${
                          budget === b ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-black/30 text-slate-200 border-white/10 hover:border-amber-400/30'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </label>

                <div className="sm:col-span-2 space-y-3">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Interests</span>
                  <div className="flex flex-wrap gap-3">
                    {(['Culture', 'Food', 'Nature', 'Shopping', 'Nightlife', 'Family'] as Interest[]).map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleInterest(i)}
                        className={`px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest transition-colors ${
                          interests.includes(i) ? 'bg-white/[0.06] border-amber-400/40 text-amber-200/90' : 'bg-black/20 border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">Choose 2–3 interests for the cleanest visa-supporting itinerary.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={generate}
                disabled={isLoading || interests.length === 0}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-5 w-5" />
                    Generate Itinerary
                  </>
                )}
              </button>

              <div className="mt-6 flex items-start gap-3 text-slate-500 text-sm">
                <CalendarDays className="h-4 w-4 mt-0.5 text-amber-200/70" />
                <p>{plan.costHint}</p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <AnimatePresence mode="wait">
                {show ? (
                  <motion.div
                    key="itinerary"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-black">Itinerary Preview</h2>
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
                        {destination} • {days} days
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {plan.blocks.map((b, idx) => (
                        <div key={`${b.label}-${idx}`} className="bg-black/25 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-amber-200/80">
                            <b.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-200">{b.label}</p>
                            <p className="text-xs text-slate-500">Optimized routing</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 space-y-4">
                      {plan.dayCards.slice(0, 6).map((d) => (
                        <div key={d.day} className="bg-black/25 border border-white/10 rounded-2xl p-5">
                          <div className="flex items-center justify-between">
                            <p className="font-black text-white">{d.title}</p>
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Plan</span>
                          </div>
                          <ul className="mt-3 space-y-2">
                            {d.bullets.map((b) => (
                              <li key={b} className="text-sm text-slate-300 flex items-start gap-2">
                                <BadgeCheck className="h-4 w-4 text-emerald-400 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 bg-amber-500/10 border border-amber-400/20 rounded-2xl p-5">
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-200/80">Visa-smart tips</p>
                      <ul className="mt-3 space-y-2">
                        {plan.visaSmartTips.map((t) => (
                          <li key={t} className="text-sm text-slate-200 flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-amber-300 mt-0.5" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-center text-center"
                  >
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                      <Plane className="h-7 w-7 text-amber-200/80" />
                    </div>
                    <h2 className="mt-6 text-2xl font-black">Your itinerary will appear here</h2>
                    <p className="mt-3 text-slate-400">
                      Generate a visa-smart plan with a clean structure, day cards, and documentation tips.
                    </p>
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
