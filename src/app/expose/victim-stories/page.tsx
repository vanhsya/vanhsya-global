import type { Metadata } from 'next';
import VictimStories from '@/components/expose/VictimStories';

export const metadata: Metadata = {
  title: 'Victim Stories & Case Submissions | VANHSYA Expose',
  description:
    'Submit your migration scam case for verification and exposure. Upload evidence, get a tracking ID, and help protect others.'
};

export default function VictimStoriesPage() {
  return <VictimStories />;
}
