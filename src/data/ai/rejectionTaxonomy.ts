export type RejectionReason = {
  id: string;
  title: string;
  indicators: string[];
  fixes: string[];
};

export const VISA_REJECTION_TAXONOMY: RejectionReason[] = [
  {
    id: 'insufficient_ties',
    title: 'Insufficient ties / return intent not established',
    indicators: ['not satisfied you will leave', 'insufficient ties', 'temporary stay not credible', 'no compelling reasons to return'],
    fixes: [
      'Strengthen post-return plan with credible career milestones and dates',
      'Add documented ties: employment letters, family responsibilities, property, ongoing commitments',
      'Align travel/education plan with realistic timeline and funding'
    ]
  },
  {
    id: 'funds_insufficient_or_unclear',
    title: 'Funds insufficient or source of funds unclear',
    indicators: ['insufficient funds', 'source of funds', 'funds not readily available', 'financial capacity not satisfied'],
    fixes: [
      'Provide a simple funding table (tuition, living, travel, buffer) matching statements',
      'Explain source and history of funds; avoid unexplained large deposits',
      'Use sponsor letter and evidence of sponsor income/assets where applicable'
    ]
  },
  {
    id: 'purpose_unclear',
    title: 'Purpose of travel/study/work not credible or unclear',
    indicators: ['purpose not credible', 'unclear purpose', 'inconsistent information', 'insufficient explanation'],
    fixes: [
      'Rewrite SOP/cover letter with a single consistent narrative',
      'Tie choices to your background: course selection, job role relevance, progression logic',
      'Remove contradictions across forms, letters, and interviews'
    ]
  },
  {
    id: 'documents_insufficient',
    title: 'Documents missing or inadequate',
    indicators: ['insufficient documentation', 'documents provided are not sufficient', 'unable to verify', 'incomplete application'],
    fixes: [
      'Create a checklist mapped to requirements; upload in logical order',
      'Add verifiable evidence: employment, education, assets, bank statements, sponsorship',
      'Use a cover index referencing each document and what it proves'
    ]
  },
  {
    id: 'history_or_compliance',
    title: 'Previous history/compliance concerns',
    indicators: ['previous refusal', 'overstay', 'non-compliance', 'immigration history', 'misrepresentation'],
    fixes: [
      'Disclose history accurately with dates and supporting evidence',
      'Explain remediation steps and compliance improvements',
      'Get professional review for any potential misrepresentation risk'
    ]
  }
];

