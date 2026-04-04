"use client";

import { motion } from 'framer-motion';
import { Phone, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';
import { COMPANY } from '@/lib/company';
import { useEffect, useMemo, useState } from 'react';

export default function TrustRibbon() {
  const [sr, setSr] = useState(0);
  const [clients, setClients] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);

  const baseItems = useMemo(
    () => [
      { key: 'sr', label: `${sr}% Success Rate` },
      { key: 'clients', label: `${clients.toLocaleString()} Clients Served` },
      { key: 'countries', label: `${countriesCount} Countries` },
      { key: 'uae', label: 'UAE Partnerships' },
      { key: 'emirates', label: `7 Emirates: ${COMPANY.uae.emirates.join(' • ')}` }
    ],
    [sr, clients, countriesCount]
  );

  useEffect(() => {
    let start: number | null = null;
    const targetSr = 99.9;
    const targetClients = 15623;
    const targetCountries = 50;
    let rafId = 0;

    const step = (t: number) => {
      if (start == null) start = t;
      const p = Math.min(1, (t - start) / 1200);
      setSr(Number((p * targetSr).toFixed(1)));
      setClients(Math.floor(p * targetClients));
      setCountriesCount(Math.floor(p * targetCountries));
      if (p < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="w-full h-10 bg-black/30 backdrop-blur-xl border-b border-white/10 text-white">
      <div className="container-max px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex items-center gap-8 text-[11px] font-extrabold tracking-[0.22em] uppercase whitespace-nowrap text-white/80"
            animate={{ x: [0, -720] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            {baseItems.concat(baseItems).map((it, idx) => (
              <span key={`${it.key}_${idx}`} className="inline-flex items-center gap-2">
                {it.key === 'sr' ? <ShieldCheck className="w-4 h-4 text-amber-200/90" /> : null}
                {it.key === 'emirates' ? <MapPin className="w-4 h-4 text-purple-200/90" /> : null}
                <span>{it.label}</span>
                <span className="opacity-30">•</span>
              </span>
            ))}
          </motion.div>
        </div>
        <Link
          href={`tel:${COMPANY.phoneE164}`}
          className="hidden sm:inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-full px-3 py-1 transition-colors border border-white/10"
        >
          <Phone className="w-4 h-4 text-white/80" />
          <span className="font-extrabold text-[12px] tracking-wide">{COMPANY.phoneDisplay}</span>
        </Link>
      </div>
    </div>
  );
}
