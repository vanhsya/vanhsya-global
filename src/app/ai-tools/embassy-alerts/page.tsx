'use client';

import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import { addProgressEvent } from '@/lib/toolProgress';
import { countries } from '@/lib/countries';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bell, ShieldAlert, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

type AlertType = 'processing_times' | 'document_changes' | 'intake_windows' | 'policy_updates';

type Subscription = {
  id: string;
  countryId: string;
  countryName: string;
  type: AlertType;
  createdAt: string;
};

const STORAGE_KEY = 'vanhsya.embassyAlerts.v1';

const uid = () => `ea_${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`}`;

const safeParse = (raw: string | null): Subscription[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => x && typeof x === 'object') as Subscription[];
  } catch {
    return [];
  }
};

const typeLabel: Record<AlertType, string> = {
  processing_times: 'Processing time changes',
  document_changes: 'Document requirement changes',
  intake_windows: 'New intake windows',
  policy_updates: 'Policy updates'
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

export default function EmbassyAlertsPage() {
  const [countryId, setCountryId] = useState('canada');
  const [type, setType] = useState<AlertType>('processing_times');
  const [subs, setSubs] = useState<Subscription[]>(() => {
    if (typeof window === 'undefined') return [];
    return safeParse(window.localStorage.getItem(STORAGE_KEY));
  });

  const country = useMemo(() => countries.find((c) => c.id === countryId) ?? null, [countryId]);

  const save = (next: Subscription[]) => {
    setSubs(next);
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const add = () => {
    if (!country) return;
    const next: Subscription = { id: uid(), countryId: country.id, countryName: country.name, type, createdAt: new Date().toISOString() };
    const updated = [next, ...subs].slice(0, 30);
    save(updated);
    addProgressEvent({
      toolId: 'embassy-alerts',
      label: `Alert (${country.name})`,
      score: 70,
      meta: { country: country.name, type }
    });
  };

  const remove = (id: string) => {
    save(subs.filter((s) => s.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#0A0A10] text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(168,85,247,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 header-blur-vanhsya">
              <Bell className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Embassy Alerts</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Stay aligned with changing requirements.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Create local alert subscriptions for destination changes. Use this as a “watchlist” while you prepare documents and timelines.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-5 p-7 border-white/10" hover={false}>
              <div className="text-white font-extrabold text-xl">Create an alert</div>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="ea-destination" className="text-xs font-black uppercase tracking-[0.25em] text-white/60">
                    Destination
                  </label>
                  <select
                    id="ea-destination"
                    value={countryId}
                    onChange={(e) => setCountryId(e.target.value)}
                    className="mt-2 w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="ea-type" className="text-xs font-black uppercase tracking-[0.25em] text-white/60">
                    Alert type
                  </label>
                  <select
                    id="ea-type"
                    value={type}
                    onChange={(e) => setType(e.target.value as AlertType)}
                    className="mt-2 w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    {Object.entries(typeLabel).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={add}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 font-extrabold"
                >
                  Add to watchlist
                </button>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-2 text-amber-200">
                    <ShieldAlert className="w-4 h-4" />
                    <div className="text-sm font-black">How to use this</div>
                  </div>
                  <div className="mt-2 text-sm text-white/70 leading-relaxed">
                    This watchlist is stored on this device only. For email/WhatsApp delivery, connect the notification service in production.
                  </div>
                  {country ? (
                    <div className="mt-4 text-sm">
                      <Link className="text-indigo-200 hover:text-indigo-100 font-bold" href={`/countries/${country.id}`}>
                        Open {country.name} guide →
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-7 p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-white font-extrabold text-xl">Your watchlist</div>
                  <div className="text-white/60 text-sm font-semibold">Track changes for your destinations.</div>
                </div>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">{subs.length} saved</div>
              </div>

              <div className="mt-5 space-y-3">
                {!subs.length ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70 font-semibold">
                    No alerts yet. Add one on the left.
                  </div>
                ) : (
                  subs.map((s) => (
                    <div key={s.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-white font-extrabold">{s.countryName}</div>
                          <div className="mt-1 text-sm text-white/70 font-semibold">{typeLabel[s.type]}</div>
                          <div className="mt-2 text-xs text-white/50 font-bold">{new Date(s.createdAt).toLocaleString()}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(s.id)}
                          className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 font-bold hover:bg-white/10"
                          aria-label="Remove alert"
                        >
                          <span className="inline-flex items-center gap-2">
                            <Trash2 className="w-4 h-4" /> Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
