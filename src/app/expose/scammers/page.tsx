import type { Metadata } from 'next';
import ScammersList from '@/components/expose/ScammersList';

export const metadata: Metadata = {
  title: 'Scammer Profiles | VANHSYA Expose',
  description: 'Organized profiles and verification checklists for high-risk entities and fraud patterns.'
};

export default function ScammersPage() {
  return <ScammersList />;
}
