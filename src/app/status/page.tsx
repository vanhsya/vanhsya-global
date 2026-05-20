"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import { AlertTriangle, CheckCircle2, Clock, RefreshCw, WifiOff } from 'lucide-react';
import { COMPANY } from '@/lib/company';

type HealthResponse = {
  status?: string;
  time?: string;
  retryAfter?: string | null;
  checks?: {
    maintenance?: boolean;
    serverOverload?: boolean;
    dependencyFailure?: boolean;
    forced503?: boolean;
    videoPointer?: boolean;
    openaiKeyConfigured?: boolean;
    supabaseConfigured?: boolean;
    mongoConfigured?: boolean;
    binancePayConfigured?: boolean;
  };
};

type ServiceState = 'operational' | 'degraded' | 'down';

type ServiceSample = { t: string; state: ServiceState; latencyMs: number | null };

type Incident = { id: string; startedAt: string; endedAt: string | null; message: string };

type ServicesResponse = {
  generatedAt: string;
  config: { openaiKeyConfigured: boolean; mongoConfigured: boolean };
  services: {
    id: string;
    name: string;
    description: string;
    state: ServiceState;
    latencyMs: number | null;
    checkedAt: string;
    uptime24h: number;
    responseP50Ms: number | null;
    message?: string;
    recent: ServiceSample[];
    incidents: Incident[];
  }[];
};

const formatIso = (iso: string | null | undefined) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString();
};

function Sparkline({ samples }: { samples: ServiceSample[] }) {
  const points = samples
    .slice()
    .reverse()
    .map((s) => (typeof s.latencyMs === 'number' ? s.latencyMs : null));

  const valid = points.filter((v): v is number => typeof v === 'number');
  const max = valid.length ? Math.max(...valid) : 1;
  const min = valid.length ? Math.min(...valid) : 0;
  const span = Math.max(1, max - min);

  const w = 120;
  const h = 28;

  const toY = (v: number) => {
    const n = (v - min) / span;
    return Math.round((h - 3) - n * (h - 6));
  };

  const toX = (i: number, n: number) => (n <= 1 ? 0 : Math.round((i / (n - 1)) * (w - 2)) + 1);

  const n = points.length || 1;
  const d = points
    .map((v, i) => {
      const x = toX(i, n);
      const y = v == null ? h - 3 : toY(v);
      return `${x},${y}`;
    })
    .join(' ');

  const last = samples[0]?.state;
  const stroke = last === 'down' ? '#fb7185' : last === 'degraded' ? '#fbbf24' : '#34d399';

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-90">
      <polyline fill="none" stroke={stroke} strokeWidth="2" points={d} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function StatusPage() {
  const [online, setOnline] = useState(true);
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [services, setServices] = useState<ServicesResponse | null>(null);
  const [error, setError] = useState(false);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);

  useEffect(() => {
    const updateOnline = () => setOnline(navigator.onLine);
    updateOnline();
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    return () => {
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    };
  }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      const [healthRes, servicesRes] = await Promise.all([
        fetch('/api/health', { cache: 'no-store' }),
        fetch('/api/status/services', { cache: 'no-store' })
      ]);
      const healthJson = (await healthRes.json().catch(() => null)) as HealthResponse | null;
      const servicesJson = (await servicesRes.json().catch(() => null)) as ServicesResponse | null;
      setHealth(healthJson);
      setServices(servicesJson);
      const hasServiceDown = Boolean(servicesJson?.services?.some((s) => s.state === 'down'));
      setError(!healthRes.ok || !servicesRes.ok || hasServiceDown);
      setCheckedAt(new Date().toISOString());
    } catch {
      setHealth(null);
      setServices(null);
      setError(true);
      setCheckedAt(new Date().toISOString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
    const id = window.setInterval(refresh, 30000);
    return () => window.clearInterval(id);
  }, []);

  const badge = useMemo(() => {
    if (!online) return { label: 'Offline', tone: 'border-white/15 bg-white/5 text-white/80', icon: WifiOff };
    if (error) return { label: 'Incident', tone: 'border-amber-300/25 bg-amber-400/10 text-amber-100', icon: AlertTriangle };
    if (health?.checks?.maintenance) return { label: 'Maintenance', tone: 'border-purple-300/25 bg-purple-400/10 text-purple-100', icon: Clock };
    return { label: 'Operational', tone: 'border-emerald-300/25 bg-emerald-400/10 text-emerald-100', icon: CheckCircle2 };
  }, [online, error, health]);

  const BadgeIcon = badge.icon;

  return (
    <main className="min-h-screen bg-[#0A0A10] text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${badge.tone} header-blur-vanhsya`}>
                <BadgeIcon className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em]">{badge.label}</span>
              </div>
              <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                System Status
              </h1>
              <p className="mt-3 text-white/70">
                Live service health, maintenance windows, and what to do if something is down.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-4 font-extrabold transition-colors disabled:opacity-60"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-7 p-7 border-white/10" hover={false}>
              <div className="text-white font-extrabold text-xl">Health details</div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-white/60 text-xs font-bold uppercase tracking-[0.18em]">Status</div>
                  <div className="mt-1 font-extrabold text-white">{health?.status || (error ? 'error' : 'unknown')}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-white/60 text-xs font-bold uppercase tracking-[0.18em]">Checked</div>
                  <div className="mt-1 font-extrabold text-white">{formatIso(checkedAt) || '—'}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-white/60 text-xs font-bold uppercase tracking-[0.18em]">Maintenance until</div>
                  <div className="mt-1 font-extrabold text-white">{formatIso(health?.retryAfter) || '—'}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-white/60 text-xs font-bold uppercase tracking-[0.18em]">AI key configured</div>
                  <div className="mt-1 font-extrabold text-white">{health?.checks?.openaiKeyConfigured ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-5 p-7 border-white/10" hover={false}>
              <div className="text-white font-extrabold text-xl">Need help?</div>
              <div className="mt-2 text-white/70 text-sm leading-relaxed">
                If you’re blocked, contact support and include a screenshot of this page.
              </div>
              <div className="mt-6 space-y-3">
                <Link
                  href="/contact"
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-5 py-4 transition-colors"
                >
                  <div className="text-white font-extrabold">Contact Support</div>
                  <div className="mt-1 text-sm text-white/60">Get help from the team</div>
                </Link>
                <Link
                  href="/webmail"
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-5 py-4 transition-colors"
                >
                  <div className="text-white font-extrabold">Email Login</div>
                  <div className="mt-1 text-sm text-white/60">Secure webmail portal</div>
                </Link>
                <a
                  href={`mailto:${COMPANY.emails.founder}`}
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-5 py-4 transition-colors"
                >
                  <div className="text-white font-extrabold">Investor Support</div>
                  <div className="mt-1 text-sm text-white/60">{COMPANY.emails.founder}</div>
                </a>
                <a
                  href={`mailto:${COMPANY.emails.career}`}
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-5 py-4 transition-colors"
                >
                  <div className="text-white font-extrabold">Careers</div>
                  <div className="mt-1 text-sm text-white/60">{COMPANY.emails.career}</div>
                </a>
              </div>
            </GlassCard>
          </div>

          <div className="mt-8">
            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-white font-extrabold text-xl">AI Tools Status</div>
                  <div className="mt-2 text-sm text-white/70">
                    Live checks for each AI tool endpoint with uptime, response time, and incident history.
                  </div>
                </div>
                <div className="text-xs text-white/60 font-semibold">
                  {services?.generatedAt ? `Updated ${formatIso(services.generatedAt)}` : '—'}
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[820px]">
                  <div className="grid grid-cols-12 gap-3 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/50">
                    <div className="col-span-4">Service</div>
                    <div className="col-span-2">State</div>
                    <div className="col-span-2">Uptime (24h)</div>
                    <div className="col-span-2">Latency</div>
                    <div className="col-span-2">Trend</div>
                  </div>

                  <div className="divide-y divide-white/10 rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]">
                    {(services?.services || []).map((s) => {
                      const dot =
                        s.state === 'down'
                          ? 'bg-pink-400'
                          : s.state === 'degraded'
                            ? 'bg-amber-300'
                            : 'bg-emerald-300';
                      const stateLabel = s.state === 'down' ? 'Down' : s.state === 'degraded' ? 'Degraded' : 'Operational';
                      const latency = typeof s.latencyMs === 'number' ? `${s.latencyMs}ms` : '—';
                      const p50 = typeof s.responseP50Ms === 'number' ? `${s.responseP50Ms}ms p50` : '—';
                      return (
                        <div key={s.id} className="grid grid-cols-12 gap-3 px-4 py-4 items-center">
                          <div className="col-span-4 min-w-0">
                            <div className="flex items-start gap-3">
                              <div className={`mt-1 w-2.5 h-2.5 rounded-full ${dot}`} />
                              <div className="min-w-0">
                                <div className="text-white font-extrabold truncate">{s.name}</div>
                                <div className="mt-1 text-xs text-white/60 truncate">{s.description}</div>
                                {s.message ? <div className="mt-1 text-xs text-amber-200/90 truncate">{s.message}</div> : null}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-black/30 text-xs font-extrabold text-white/80">
                              {stateLabel}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-white font-extrabold">{typeof s.uptime24h === 'number' ? `${s.uptime24h}%` : '—'}</div>
                            <div className="mt-1 text-xs text-white/60">Last 24h</div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-white font-extrabold">{latency}</div>
                            <div className="mt-1 text-xs text-white/60">{p50}</div>
                          </div>
                          <div className="col-span-2 flex items-center justify-end">
                            <Sparkline samples={s.recent.slice(0, 30)} />
                          </div>
                        </div>
                      );
                    })}
                    {!services?.services?.length ? (
                      <div className="px-4 py-6 text-white/60">No data yet. Refresh to run checks.</div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {(services?.services || [])
                  .filter((s) => (s.incidents || []).length)
                  .slice(0, 4)
                  .map((s) => (
                    <div key={`${s.id}-inc`} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4">
                      <div className="text-white font-extrabold">{s.name} incidents</div>
                      <div className="mt-3 space-y-2">
                        {s.incidents.slice(0, 3).map((i) => (
                          <div key={i.id} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-xs text-white/70 font-semibold truncate">{i.message}</div>
                              <div className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">
                                {formatIso(i.startedAt) || '—'}
                              </div>
                            </div>
                            <div className="mt-1 text-[11px] text-white/60">
                              {i.endedAt ? `Resolved: ${formatIso(i.endedAt)}` : 'Ongoing'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                {!services?.services?.some((s) => (s.incidents || []).length) ? (
                  <div className="text-white/60">No incident history recorded in this runtime session.</div>
                ) : null}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
