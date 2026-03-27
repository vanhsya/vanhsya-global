'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Shield, FileText, AlertTriangle, CheckCircle2, ArrowRight, Globe2 } from 'lucide-react';

type Nationality = 'India' | 'UAE' | 'USA' | 'UK' | 'Canada' | 'Australia' | 'Philippines';
type Destination = 'Canada' | 'Australia' | 'United Kingdom' | 'United States' | 'Germany' | 'UAE' | 'Singapore';
type TripPurpose = 'Tourism' | 'Business' | 'Visit Family' | 'Conference' | 'Transit';

const requirementsLibrary: Record<Destination, string[]> = {
  Canada: [
    'Valid passport (6+ months validity recommended)',
    'Travel history summary',
    'Proof of funds and sponsor documents (if applicable)',
    'Employment / enrollment proof',
    'Travel insurance (recommended)',
  ],
  Australia: [
    'Valid passport and digital copies',
    'Financial evidence (bank statements / payslips)',
    'Accommodation proof and itinerary',
    'Character declaration where applicable',
    'Travel insurance (recommended)',
  ],
  'United Kingdom': [
    'Valid passport',
    'Bank statements and proof of income',
    'Hotel bookings or invitation letter',
    'Employment letter or enrollment letter',
    'Ties to home country evidence',
  ],
  'United States': [
    'Valid passport',
    'DS-160 confirmation (if applicable)',
    'Interview preparation checklist',
    'Financial proof and sponsor docs (if applicable)',
    'Intent evidence (return ticket / ties)',
  ],
  Germany: [
    'Schengen checklist: passport + photos',
    'Travel insurance meeting coverage requirements',
    'Accommodation and travel itinerary',
    'Employment / leave approval letter',
    'Proof of funds (minimum daily amount guideline)',
  ],
  UAE: [
    'Passport copy and photo',
    'Return ticket / onward travel',
    'Accommodation details',
    'Travel insurance (recommended)',
    'Sponsor documents (if applicable)',
  ],
  Singapore: [
    'Valid passport',
    'Flight + hotel itinerary',
    'Proof of funds',
    'Employment / enrollment proof',
    'Local contact (recommended)',
  ],
};

function riskBand(nationality: Nationality, destination: Destination, purpose: TripPurpose) {
  const base = 34;
  const nDelta: Record<Nationality, number> = {
    India: 14,
    UAE: 6,
    USA: -6,
    UK: -8,
    Canada: -8,
    Australia: -8,
    Philippines: 10,
  };
  const dDelta: Record<Destination, number> = {
    Canada: 10,
    Australia: 10,
    'United Kingdom': 8,
    'United States': 12,
    Germany: 6,
    UAE: 2,
    Singapore: 6,
  };
  const pDelta: Record<TripPurpose, number> = {
    Tourism: 6,
    Business: 4,
    'Visit Family': 8,
    Conference: 5,
    Transit: 1,
  };
  const score = Math.max(10, Math.min(90, base + nDelta[nationality] + dDelta[destination] + pDelta[purpose]));
  if (score < 35) return { label: 'Low', score };
  if (score < 60) return { label: 'Moderate', score };
  return { label: 'High', score };
}

export default function EntryRequirementsRadarPage() {
  const [nationality, setNationality] = useState<Nationality>('India');
  const [destination, setDestination] = useState<Destination>('UAE');
  const [purpose, setPurpose] = useState<TripPurpose>('Tourism');
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const result = useMemo(() => {
    const list = requirementsLibrary[destination] ?? [];
    const risk = riskBand(nationality, destination, purpose);
    const extras: string[] = [];
    if (purpose === 'Business') extras.push('Business invitation letter and company registration proof');
    if (purpose === 'Visit Family') extras.push('Invitation letter + sponsor ID and address proof');
    if (destination === 'United States') extras.push('Appointment readiness pack: intent narrative + interview Q&A');
    if (destination === 'Germany') extras.push('Schengen travel route plan (cities + dates) and cover letter');
    if (destination === 'Canada') extras.push('Purpose letter + ties proof checklist');
    return { list: [...list, ...extras], risk };
  }, [destination, nationality, purpose]);

  const generate = async () => {
    setIsLoading(true);
    setShow(false);
    await new Promise((r) => setTimeout(r, 900));
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
              <Shield className="h-4 w-4" />
              Entry Requirements Radar
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Border-ready
              </span>{' '}
              <span className="bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                in minutes
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Generates a travel-ready requirements pack—documents, insurance, and risk flags—tailored to your route and purpose.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Nationality</span>
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value as Nationality)}
                    className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                  >
                    {(['India', 'UAE', 'USA', 'UK', 'Canada', 'Australia', 'Philippines'] as Nationality[]).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>

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

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Purpose</span>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value as TripPurpose)}
                    className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                  >
                    {(['Tourism', 'Business', 'Visit Family', 'Conference', 'Transit'] as TripPurpose[]).map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="button"
                onClick={generate}
                disabled={isLoading}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Globe2 className="h-5 w-5 animate-spin" />
                    Scanning…
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-5 w-5" />
                    Generate My Pack
                  </>
                )}
              </button>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-black/25 border border-white/10 rounded-2xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Risk Band</p>
                  <p className="mt-2 text-lg font-black text-white">{result.risk.label}</p>
                </div>
                <div className="bg-black/25 border border-white/10 rounded-2xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Risk Score</p>
                  <p className="mt-2 text-lg font-black text-amber-200/80">{result.risk.score}/100</p>
                </div>
                <div className="bg-black/25 border border-white/10 rounded-2xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Pack Items</p>
                  <p className="mt-2 text-lg font-black text-white">{result.list.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <AnimatePresence mode="wait">
                {show ? (
                  <motion.div
                    key="pack"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-black">Border-ready Pack</h2>
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
                        {nationality} → {destination}
                      </span>
                    </div>

                    <div className="mt-6 space-y-3">
                      {result.list.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 bg-black/25 border border-white/10 rounded-2xl px-4 py-3"
                        >
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                          <p className="text-sm text-slate-200 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>

                    {result.risk.label !== 'Low' && (
                      <div className="mt-8 flex items-start gap-3 bg-amber-500/10 border border-amber-400/20 rounded-2xl px-4 py-4">
                        <AlertTriangle className="h-5 w-5 text-amber-300 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-amber-200/90">Risk flag detected</p>
                          <p className="text-sm text-slate-300 mt-1">
                            Consider adding stronger ties evidence (employment, property, return plan) and a clearer purpose letter.
                          </p>
                        </div>
                      </div>
                    )}
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
                      <FileText className="h-7 w-7 text-amber-200/80" />
                    </div>
                    <h2 className="mt-6 text-2xl font-black">Your requirements pack will appear here</h2>
                    <p className="mt-3 text-slate-400">
                      Choose your route and generate a border-ready pack with risk flags.
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
