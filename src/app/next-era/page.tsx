import type { Metadata } from 'next';
import VisionLanding from '@/components/vision/VisionLanding';

export const metadata: Metadata = {
  title: 'Vanhsya Vision | The Mobility Operating System',
  description:
    'A trust-first platform for verified cross-border outcomes: policy intelligence, workflow automation, fraud resistance, and milestone-aligned settlement.'
};

export default function NextEraPage() {
  return <VisionLanding />;
}
