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
  };
};

const formatIso = (iso: string | null | undefined) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString();
};

export default function StatusPage() {
  const [online, setOnline] = useState(true);
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState<HealthResponse | null>(null);
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
      const res = await fetch('/api/health', { cache: 'no-store' });
      const json = (await res.json().catch(() => null)) as HealthResponse | null;
      setHealth(json);
      setError(!res.ok);
      setCheckedAt(new Date().toISOString());
    } catch {
      setHealth(null);
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
        </div>
      </section>

      <Footer />
    </main>
  );
}

