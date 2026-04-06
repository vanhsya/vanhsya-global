import type { Metadata } from 'next';
import AIToolsLanding from '@/components/ai/AIToolsLanding';

export const metadata: Metadata = {
  title: 'AI Tools | VANHSYA',
  description: 'Advanced AI-powered tools for international students and professionals.'
};

export default function AIToolsPage() {
  return <AIToolsLanding />;
}
