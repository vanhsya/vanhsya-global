'use client';

import { useMemo, useState } from 'react';
import type { CardTier } from '@/data/card/tiers';

const STORAGE_KEY = 'vanhsya_card_tier';

const isTier = (v: string | null): v is CardTier =>
  v === 'standard' || v === 'pro' || v === 'elite' || v === 'black';

export function useCardTier() {
  const [tier, setTier] = useState<CardTier>(() => {
    if (typeof window === 'undefined') return 'standard';
    try {
      const url = new URL(window.location.href);
      const qp = url.searchParams.get('tier');
      if (isTier(qp)) {
        localStorage.setItem(STORAGE_KEY, qp);
        return qp;
      }
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isTier(stored)) return stored;
    } catch {}
    return 'standard';
  });

  const api = useMemo(
    () => ({
      tier,
      setTier: (t: CardTier) => {
        setTier(t);
        try {
          localStorage.setItem(STORAGE_KEY, t);
        } catch {}

        const url = new URL(window.location.href);
        url.searchParams.set('tier', t);
        window.history.replaceState(null, '', url.toString());
      }
    }),
    [tier]
  );

  return api;
}
