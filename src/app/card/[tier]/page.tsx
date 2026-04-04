import type { Metadata } from 'next';
import CardTierDetails from '@/components/card/CardTierDetails';
import type { CardTier } from '@/data/card/tiers';

const isTier = (v: string): v is CardTier => v === 'standard' || v === 'pro' || v === 'elite' || v === 'black';

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }): Promise<Metadata> {
  const { tier } = await params;
  const label = isTier(tier) ? tier.toUpperCase() : 'STANDARD';
  return {
    title: `VANHSYA Card — ${label}`,
    description: 'Explore VANHSYA Card tier details, limits, perks, and premium design preview.'
  };
}

export default async function CardTierPage({ params }: { params: Promise<{ tier: string }> }) {
  const { tier } = await params;
  const t: CardTier = isTier(tier) ? tier : 'standard';
  return <CardTierDetails tier={t} />;
}

