export type DocumentChecklist = {
  id: string;
  title: string;
  country: 'usa' | 'uk' | 'canada' | 'australia' | 'eu';
  pathway: 'study' | 'work' | 'visitor' | 'pr' | 'investment';
  items: { label: string; required: boolean; notes?: string }[];
};

export const DOCUMENT_CHECKLISTS: DocumentChecklist[] = [
  {
    id: 'canada_study_core',
    title: 'Canada Study (Core Pack)',
    country: 'canada',
    pathway: 'study',
    items: [
      { label: 'Passport (valid for full period)', required: true },
      { label: 'Offer letter / LOA', required: true },
      { label: 'Tuition payment proof', required: false, notes: 'If paid; improves clarity' },
      { label: 'Proof of funds (statements + sponsor evidence)', required: true },
      { label: 'Statement of Purpose / study plan', required: true },
      { label: 'Education transcripts + certificates', required: true },
      { label: 'Work experience letters (if applicable)', required: false },
      { label: 'Medical / biometrics (as instructed)', required: false }
    ]
  },
  {
    id: 'usa_study_core',
    title: 'USA Student (Core Pack)',
    country: 'usa',
    pathway: 'study',
    items: [
      { label: 'Passport', required: true },
      { label: 'Form I-20 / DS-2019', required: true },
      { label: 'SEVIS fee receipt', required: true },
      { label: 'Financial evidence (bank/sponsor)', required: true },
      { label: 'Academic transcripts', required: true },
      { label: 'Standardized tests (if applicable)', required: false },
      { label: 'Ties & intent evidence', required: false, notes: 'Employment plan, family ties, assets' }
    ]
  },
  {
    id: 'uk_study_core',
    title: 'UK Student (Core Pack)',
    country: 'uk',
    pathway: 'study',
    items: [
      { label: 'Passport', required: true },
      { label: 'CAS statement', required: true },
      { label: 'Tuberculosis test (if applicable)', required: false },
      { label: 'Proof of funds (maintenance)', required: true },
      { label: 'Academic documents', required: true },
      { label: 'English proficiency (IELTS/other)', required: false }
    ]
  }
];

