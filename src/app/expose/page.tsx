import type { Metadata } from 'next';
import ExposeLanding from '@/components/expose/ExposeLanding';

export const metadata: Metadata = {
  title: 'Expose Migration Fraud | VANHSYA',
  description:
    'A complete platform for exposing migration fraud, supporting victims, and publishing verified, public-safe information.'
};

export default function ExposePage() {
  return <ExposeLanding />;
}
