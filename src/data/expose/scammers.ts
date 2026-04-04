export type ScammerProfile = {
  id: string;
  slug: string;
  displayName: string;
  type: 'agency' | 'individual' | 'website';
  risk: 'high' | 'critical';
  countries: string[];
  aliases: string[];
  summary: string;
  knownPatterns: string[];
  verificationSteps: string[];
  publicLinks: { label: string; url: string }[];
  publishedAt: string;
};

export const SCAMMER_PROFILES: ScammerProfile[] = [
  {
    id: 'scam_profile_sample_001',
    slug: 'sample-unverified-consultancy',
    displayName: 'Sample Unverified Consultancy',
    type: 'agency',
    risk: 'high',
    countries: ['UAE', 'India'],
    aliases: ['Sample Migration Experts', 'Sample Global Visas'],
    summary:
      'Example profile structure for organizing reports. Replace with verified information before publishing.',
    knownPatterns: [
      'Guarantee language and urgency tactics',
      'Split payment requests',
      'Refusal to provide written refund policy'
    ],
    verificationSteps: [
      'Request license number and verify with regulator',
      'Verify company registration and office address',
      'Confirm payment account belongs to registered entity'
    ],
    publicLinks: [{ label: 'How to report safely', url: '/expose/victim-stories' }],
    publishedAt: '2026-04-04'
  }
];

