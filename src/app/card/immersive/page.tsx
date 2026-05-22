import type { Metadata } from 'next';
import ImmersiveCardLanding from '@/components/card/ImmersiveCardLanding';

export const metadata: Metadata = {
  title: 'VANHSYA Card | Immersive 3D Experience',
  description:
    'An immersive WebGL-powered card experience: physics-based 3D hover, parallax depth, and performance-tuned visuals with graceful fallbacks.'
};

export default function VanhsyaImmersiveCardPage() {
  return <ImmersiveCardLanding />;
}
