"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, WifiOff } from 'lucide-react';

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

const formatRetry = (iso: string | null | undefined) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString();
};

export default function SystemStatusBanner() {
  const [online, setOnline] = useState(true);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [healthError, setHealthError] = useState(false);

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

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const res = await fetch('/api/health', { cache: 'no-store' });
        const json = (await res.json().catch(() => null)) as HealthResponse | null;
        if (cancelled) return;
        setHealth(json);
        setHealthError(!res.ok);
      } catch {
        if (cancelled) return;
        setHealth(null);
        setHealthError(true);
      }
    };
    void run();
    const id = window.setInterval(run, 30000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const view = useMemo(() => {
    if (!online) {
      return {
        kind: 'offline' as const,
        icon: WifiOff,
        title: 'You are offline',
        detail: 'Some features may not load. Check your connection.',
        href: '/status',
        cta: 'Status'
      };
    }

    if (healthError) {
      return {
        kind: 'incident' as const,
        icon: AlertTriangle,
        title: 'Service disruption',
        detail: 'Some services are temporarily unavailable.',
        href: '/maintenance',
        cta: 'Updates'
      };
    }

    const maintenance = Boolean(health?.checks?.maintenance);
    if (maintenance) {
      const retry = formatRetry(health?.retryAfter);
      return {
        kind: 'maintenance' as const,
        icon: Info,
        title: 'Scheduled maintenance',
        detail: retry ? `Expected back: ${retry}` : 'We’ll be back shortly.',
        href: '/maintenance',
        cta: 'Details'
      };
    }

    const openai = Boolean(health?.checks?.openaiKeyConfigured);
    if (!openai) {
      return {
        kind: 'degraded' as const,
        icon: Info,
        title: 'Concierge offline mode',
        detail: 'Instant guidance is available; AI responses are limited.',
        href: '/ai-tools',
        cta: 'AI Tools'
      };
    }

    return null;
  }, [health, healthError, online]);

  if (!view) return null;

  const Icon = view.icon;
  const palette =
    view.kind === 'offline'
      ? 'bg-white/5 border-white/10 text-white/80'
      : view.kind === 'incident'
        ? 'bg-amber-400/10 border-amber-300/20 text-amber-100'
        : view.kind === 'maintenance'
          ? 'bg-purple-400/10 border-purple-300/20 text-purple-100'
          : 'bg-indigo-400/10 border-indigo-300/20 text-indigo-100';

  return (
    <div className={`w-full border-b ${palette}`}>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Icon className="w-4 h-4 shrink-0" />
          <div className="text-xs sm:text-[13px] font-extrabold tracking-wide truncate">
            {view.title}
            <span className="ml-2 font-bold opacity-80">{view.detail}</span>
          </div>
        </div>
        <Link
          href={view.href}
          className="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1 text-xs font-extrabold transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 opacity-80" />
          <span>{view.cta}</span>
        </Link>
      </div>
    </div>
  );
}

