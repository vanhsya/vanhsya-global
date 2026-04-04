import type { Metadata } from 'next';
import ExposeInterviews from '@/components/expose/ExposeInterviews';

export const metadata: Metadata = {
  title: 'YouTube Interviews | VANHSYA Expose',
  description: 'Client interviews, safety desk explainers, and scam-prevention breakdowns.'
};

export default function ExposeInterviewsPage() {
  return <ExposeInterviews />;
}
