import type { Metadata } from 'next';
import CardLanding from '@/components/card/CardLanding';

export const metadata: Metadata = {
  title: 'VANHSYA Card | Premium Tiered Card System',
  description:
    'A tier-based premium card experience built for global mobility: preview designs, compare tiers, and join early access.'
};

export default function VanhsyaCardPage() {
  return <CardLanding />;
}
