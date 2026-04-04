'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { CardTier } from '@/data/card/tiers';

type CardImageProps = {
  tier: CardTier;
  priority?: boolean;
  className?: string;
};

export default function CardImage({ tier, priority = false, className = '' }: CardImageProps) {
  const [errored, setErrored] = useState(false);

  const src = useMemo(() => {
    const safeTier = tier || 'standard';
    return `/api/card/image/${safeTier}`;
  }, [tier]);

  if (errored) {
    return (
      <div className={`w-full h-full ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end justify-between p-6">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.25em] text-white/60">VANHSYA Card</div>
            <div className="mt-2 text-white font-extrabold text-2xl">{tier.toUpperCase()}</div>
          </div>
          <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Preview unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`VANHSYA card preview (${tier})`}
      fill
      sizes="(max-width: 1024px) 100vw, 50vw"
      className={className}
      priority={priority}
      unoptimized
      onError={() => setErrored(true)}
    />
  );
}
