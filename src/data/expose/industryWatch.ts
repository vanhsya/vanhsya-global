export type IndustryWatchItem = {
  id: string;
  title: string;
  publishedAt: string;
  category: 'fraud-pattern' | 'verification' | 'policy' | 'case-study';
  severity: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  details: string;
  signals: string[];
};

export const INDUSTRY_WATCH: IndustryWatchItem[] = [
  {
    id: 'watch_fake_guarantee_claims',
    title: '“Guaranteed Visa” Claims: How They Trap Victims',
    publishedAt: '2026-04-04',
    category: 'fraud-pattern',
    severity: 'high',
    summary:
      'Fraudsters sell certainty. Real immigration does not provide guaranteed approvals from private agents.',
    details:
      'Common patterns include urgency tactics, vague scope, hidden add-on fees, and refusing written refund terms. The safest response is to demand written scope + a lawful contract, verify licensing, and never pay into personal accounts.',
    signals: [
      'Guarantee language without legal basis',
      'Refusal to provide written scope, invoice, and refund terms',
      'Payment requests to personal accounts',
      'Pressure tactics (“quota ends tonight”)'
    ]
  },
  {
    id: 'watch_domain_spoofing',
    title: 'Company Domain Spoofing and Fake Offer Letters',
    publishedAt: '2026-03-30',
    category: 'verification',
    severity: 'critical',
    summary:
      'Lookalike domains and cloned employer names are widely used to create fake job offers and LMIA scams.',
    details:
      'Verify the domain ownership, check if the business email matches the official domain, and cross-check registry data. Avoid “offer letter first, payment now” scams.',
    signals: [
      'Free email providers used for “corporate” communication',
      'Domain differs by one character',
      'Missing employer registry references',
      'Upfront payments for job offers'
    ]
  }
];

