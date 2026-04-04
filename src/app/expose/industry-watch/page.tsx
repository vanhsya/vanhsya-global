import type { Metadata } from 'next';
import IndustryWatch from '@/components/expose/IndustryWatch';

export const metadata: Metadata = {
  title: 'Migration Industry Watch | VANHSYA Expose',
  description: 'A verified ledger of fraud patterns, verification workflows, and migration-industry risk signals.'
};

export default function IndustryWatchPage() {
  return <IndustryWatch />;
}
