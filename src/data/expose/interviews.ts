export type ExposeInterview = {
  id: string;
  title: string;
  guest: string;
  role?: string;
  publishedAt: string;
  youtubeId: string;
  summary: string;
  tags: string[];
};

export const EXPOSE_INTERVIEWS: ExposeInterview[] = [
  {
    id: 'yt_001',
    title: 'VANHSYA Live: How Migration Scams Work (And How to Protect Yourself)',
    guest: 'VANHSYA Live',
    role: 'Fraud Exposure',
    publishedAt: '2026-03-22',
    youtubeId: 'dQw4w9WgXcQ',
    summary:
      'Watch the VANHSYA Live channel for ongoing breakdowns of common fraud patterns: fake guarantees, job offer scams, embassy impersonation, and payment manipulation.',
    tags: ['fraud', 'education', 'prevention']
  },
  {
    id: 'yt_002',
    title: 'Victim Interview: Reclaiming Control After a Fake Consultancy',
    guest: 'VANHSYA Live',
    role: 'Victim Story',
    publishedAt: '2026-03-29',
    youtubeId: 'dQw4w9WgXcQ',
    summary:
      'A victim shares practical steps that helped them document, report, and recover — subscribe to get notified for new interviews.',
    tags: ['victim-story', 'documentation', 'recovery']
  }
];
