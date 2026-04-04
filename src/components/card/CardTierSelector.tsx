'use client';

import type { CardTier } from '@/data/card/tiers';
import { CARD_TIERS } from '@/data/card/tiers';

type CardTierSelectorProps = {
  value: CardTier;
  onChange: (tier: CardTier) => void;
};

export default function CardTierSelector({ value, onChange }: CardTierSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CARD_TIERS.map((t) => (
        <button
          key={t.tier}
          type="button"
          onClick={() => onChange(t.tier)}
          aria-current={value === t.tier ? 'true' : undefined}
          className={`px-4 py-2 rounded-2xl border font-extrabold transition-colors ${
            value === t.tier
              ? 'bg-white/10 border-white/20 text-white'
              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
