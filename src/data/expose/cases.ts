export type ExposeCaseStatus = 'verified' | 'published';

export type ExposeEvidence = {
  label: string;
  url: string;
};

export type ExposeCase = {
  id: string;
  slug: string;
  title: string;
  coverImage?: string;
  youtubeId?: string;
  country: string;
  scamType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  amountLost?: string;
  occurredAt: string;
  publishedAt: string;
  status: ExposeCaseStatus;
  summary: string;
  fullStory: string;
  redFlags: string[];
  whatWorked: string[];
  evidence?: ExposeEvidence[];
  tags: string[];
};

export const EXPOSE_CASES: ExposeCase[] = [
  {
    id: 'case_uae_consultancy_fee_trap_001',
    slug: 'uae-consultancy-fee-trap',
    title: 'Consultancy Fee Trap with Fake “Guaranteed Visa” Claims',
    coverImage:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1400',
    country: 'United Arab Emirates',
    scamType: 'Fake Agent / Consultancy',
    severity: 'high',
    amountLost: 'AED 9,500',
    occurredAt: '2025-11-18',
    publishedAt: '2026-04-04',
    status: 'published',
    summary:
      'A victim paid “processing + guarantee” fees for a promised visa outcome. The agent avoided written commitments and delayed with repeated excuses.',
    fullStory:
      'The victim was approached with a “guaranteed approval” promise and urgency tactics. Payment was requested in multiple transfers. No official receipts were provided. The agent avoided written scope, timelines, and refund terms. When delays started, the victim was pushed to pay additional “escalation” fees. VANHSYA helped map the payment trail, identify missing documents, and structure the report for proper escalation pathways.',
    redFlags: [
      'Refused to provide written scope + refund policy',
      'Used urgency and “limited quota” pressure',
      'Split payments across personal accounts',
      'Promised guaranteed outcomes without lawful basis'
    ],
    whatWorked: [
      'Consolidated all payment proofs and chat logs',
      'Stopped further payments immediately',
      'Prepared a structured complaint packet with timelines'
    ],
    evidence: [
      { label: 'Public-safe redacted timeline', url: '/expose' }
    ],
    tags: ['UAE', 'fees', 'guarantee-claim', 'consultancy']
  },
  {
    id: 'case_canada_job_offer_fraud_002',
    slug: 'canada-job-offer-fraud',
    title: 'Fake Job Offer + LMIA Promise',
    coverImage:
      'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=1400',
    youtubeId: 'dQw4w9WgXcQ',
    country: 'Canada',
    scamType: 'Fake Job Offer',
    severity: 'critical',
    amountLost: 'USD 6,200',
    occurredAt: '2025-08-03',
    publishedAt: '2026-04-04',
    status: 'published',
    summary:
      'A victim paid for a job offer and LMIA that never existed. The “employer” domain and documents were fabricated.',
    fullStory:
      'The scam used a cloned company name and a lookalike email domain. Offer letters were issued with inconsistent signatures and missing regulatory details. The victim paid for “priority processing” and was told to keep it confidential. VANHSYA’s verification workflow identified the domain mismatch and invalid employer details early, preventing additional losses and enabling faster escalation.',
    redFlags: [
      'Lookalike domain and generic email signatures',
      'Confidentiality request to isolate the victim',
      'Upfront payment for a job offer',
      'Inconsistent employer details across documents'
    ],
    whatWorked: [
      'Validated domain ownership and company registry',
      'Checked document metadata inconsistencies',
      'Used structured reporting for evidence packaging'
    ],
    evidence: [],
    tags: ['Canada', 'LMIA', 'job-offer', 'domain-spoofing']
  }
];
