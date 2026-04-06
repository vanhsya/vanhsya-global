export type VisaCountry = 'usa' | 'uk' | 'canada' | 'australia' | 'eu';

export type InterviewQuestion = {
  id: string;
  country: VisaCountry;
  category: 'intent' | 'finance' | 'ties' | 'study' | 'work' | 'documents' | 'history';
  prompt: string;
  redFlags: string[];
  strongSignals: string[];
};

export const VISA_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'usa_intent_1',
    country: 'usa',
    category: 'intent',
    prompt: 'Why did you choose the United States and this institution/company specifically?',
    redFlags: ['Vague reasons', 'Does not know program details', 'Mentions working as primary intent on a visitor route'],
    strongSignals: ['Specific program fit', 'Clear career relevance', 'Understands location and timeline']
  },
  {
    id: 'usa_ties_1',
    country: 'usa',
    category: 'ties',
    prompt: 'What are your plans after you complete your program/assignment?',
    redFlags: ['No plan', 'Implies permanent stay without proper route', 'Contradictory answers'],
    strongSignals: ['Specific post-return plan', 'Career path mapped', 'Family/professional ties explained']
  },
  {
    id: 'canada_study_1',
    country: 'canada',
    category: 'study',
    prompt: 'Why this course and why now? How does it connect to your past education/work?',
    redFlags: ['Course mismatch', 'No progression logic', 'Overly generic motivation'],
    strongSignals: ['Logical progression', 'Clear outcomes', 'Relevant background linkage']
  },
  {
    id: 'canada_finance_1',
    country: 'canada',
    category: 'finance',
    prompt: 'How will you fund tuition and living expenses? Please explain sources clearly.',
    redFlags: ['Unclear source of funds', 'Inconsistent figures', 'Funds not readily accessible'],
    strongSignals: ['Clear funding breakdown', 'Documents align', 'Realistic budgeting']
  },
  {
    id: 'uk_intent_1',
    country: 'uk',
    category: 'intent',
    prompt: 'Why the UK for this program and how did you decide on this university?',
    redFlags: ['Cannot explain choice', 'Mentions working only', 'No understanding of course structure'],
    strongSignals: ['Specific course modules', 'Career mapping', 'Understands compliance rules']
  },
  {
    id: 'australia_documents_1',
    country: 'australia',
    category: 'documents',
    prompt: 'Walk me through your documents: offer letter, funds, and your genuine temporary entrant statement.',
    redFlags: ['Missing docs', 'Inconsistent story', 'Cannot explain GTE'],
    strongSignals: ['Document consistency', 'Clear narrative', 'Understands obligations']
  },
  {
    id: 'eu_work_1',
    country: 'eu',
    category: 'work',
    prompt: 'What is your role, salary, and why is your skillset needed in this position?',
    redFlags: ['Role unclear', 'Salary mismatch', 'No proof of qualification'],
    strongSignals: ['Role clarity', 'Qualification alignment', 'Contract details known']
  }
];

export const COUNTRY_LABELS: Record<VisaCountry, string> = {
  usa: 'USA',
  uk: 'UK',
  canada: 'Canada',
  australia: 'Australia',
  eu: 'EU'
};

