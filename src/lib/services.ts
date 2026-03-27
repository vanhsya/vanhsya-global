import { ServiceType } from '@/types/services';

export const services: ServiceType[] = [
  {
    id: 'work-visa',
    title: 'Work Visa',
    description: 'Professional work permits for skilled workers seeking employment opportunities abroad.',
    icon: 'FaBriefcase',
    category: 'visa',
    price: 'From $3,500',
    duration: '4-8 months',
    successRate: '95%',
    features: [
      'Job market assessment',
      'Resume optimization',
      'Work permit application',
      'Employer liaison',
      'Post-arrival support'
    ],
    requirements: [
      'Valid passport',
      'Educational credentials',
      'Work experience letters',
      'Language proficiency test',
      'Medical examination',
      'Police clearance certificate'
    ],
    countries: ['canada', 'australia', 'uk', 'usa', 'germany', 'new-zealand'],
    processSteps: [
      'Initial assessment and consultation',
      'Document preparation and verification',
      'Application submission',
      'Interview preparation (if required)',
      'Visa approval and travel arrangements'
    ],
    faqs: [
      {
        question: 'How long does a work visa application take?',
        answer: 'Processing times vary by country but typically range from 4-8 months from submission to approval.'
      },
      {
        question: 'Do I need a job offer before applying?',
        answer: 'Most countries require a valid job offer from an approved employer, though some have skilled worker programs that don\'t require pre-arranged employment.'
      }
    ]
  },
  {
    id: 'study-visa',
    title: 'Study Visa',
    description: 'Student permits for academic pursuits at recognized educational institutions worldwide.',
    icon: 'FaGraduationCap',
    category: 'visa',
    price: 'From $2,500',
    duration: '2-6 months',
    successRate: '98%',
    features: [
      'University selection guidance',
      'Application assistance',
      'Scholarship consultation',
      'Study permit processing',
      'Accommodation support'
    ],
    requirements: [
      'Valid passport',
      'Letter of acceptance',
      'Proof of financial support',
      'Language proficiency test',
      'Medical examination',
      'Statement of purpose'
    ],
    countries: ['canada', 'australia', 'uk', 'usa', 'germany', 'new-zealand'],
    processSteps: [
      'Educational assessment and university selection',
      'Application to educational institutions',
      'Study permit application preparation',
      'Financial documentation',
      'Visa interview and approval'
    ],
    faqs: [
      {
        question: 'Can I work while studying?',
        answer: 'Most study visas allow part-time work (typically 20 hours per week) during studies and full-time during breaks.'
      },
      {
        question: 'What are the financial requirements?',
        answer: 'You must demonstrate sufficient funds to cover tuition fees, living expenses, and return transportation, typically $15,000-$30,000 annually.'
      }
    ]
  },
  {
    id: 'business-visa',
    title: 'Business Visa',
    description: 'Investment and entrepreneur visas for business owners and investors.',
    icon: 'FaChartLine',
    category: 'visa',
    price: 'From $8,000',
    duration: '8-18 months',
    successRate: '88%',
    features: [
      'Business plan development',
      'Investment guidance',
      'Investor visa processing',
      'Business setup assistance',
      'Ongoing compliance support'
    ],
    requirements: [
      'Valid passport',
      'Business plan',
      'Proof of investment funds',
      'Management experience',
      'Language proficiency',
      'Net worth documentation'
    ],
    countries: ['canada', 'australia', 'uk', 'usa', 'germany'],
    processSteps: [
      'Business concept evaluation',
      'Investment planning and documentation',
      'Business plan preparation',
      'Visa application submission',
      'Business establishment and compliance'
    ],
    faqs: [
      {
        question: 'What is the minimum investment required?',
        answer: 'Investment requirements vary by country and program, ranging from $100,000 to $1.8 million depending on the destination and visa type.'
      },
      {
        question: 'Can my family accompany me?',
        answer: 'Yes, most business visa programs allow you to include your spouse and dependent children in the application.'
      }
    ]
  },
  {
    id: 'family-visa',
    title: 'Family Visa',
    description: 'Family reunification and sponsorship programs for relatives of citizens and residents.',
    icon: 'FaHeart',
    category: 'visa',
    price: 'From $2,000',
    duration: '6-24 months',
    successRate: '92%',
    features: [
      'Relationship documentation',
      'Sponsorship applications',
      'Family class processing',
      'Interview preparation',
      'Settlement planning'
    ],
    requirements: [
      'Valid passport',
      'Relationship proof',
      'Sponsor eligibility',
      'Financial support evidence',
      'Medical examinations',
      'Background checks'
    ],
    countries: ['canada', 'australia', 'uk', 'usa', 'new-zealand'],
    processSteps: [
      'Sponsor eligibility assessment',
      'Relationship documentation',
      'Application preparation and submission',
      'Processing and communication with authorities',
      'Landing and settlement support'
    ],
    faqs: [
      {
        question: 'Who can sponsor family members?',
        answer: 'Citizens and permanent residents can typically sponsor spouses, children, parents, and grandparents. Eligibility requirements vary by country.'
      },
      {
        question: 'How long does family sponsorship take?',
        answer: 'Processing times vary significantly by relationship type and country, ranging from 6 months for spouses to 2+ years for parents.'
      }
    ]
  },
  {
    id: 'tourist-visa',
    title: 'Tourist Visa',
    description: 'Visitor visas for tourism, family visits, and short-term business trips.',
    icon: 'FaPlane',
    category: 'visa',
    price: 'From $500',
    duration: '2-8 weeks',
    successRate: '96%',
    features: [
      'Purpose documentation',
      'Itinerary planning',
      'Financial proof assistance',
      'Application processing',
      'Travel insurance guidance'
    ],
    requirements: [
      'Valid passport',
      'Travel itinerary',
      'Proof of funds',
      'Return ticket',
      'Accommodation proof',
      'Travel insurance'
    ],
    countries: ['canada', 'australia', 'uk', 'usa', 'germany', 'new-zealand'],
    processSteps: [
      'Purpose and itinerary planning',
      'Document preparation',
      'Application submission',
      'Biometrics and interview (if required)',
      'Visa approval and travel preparation'
    ],
    faqs: [
      {
        question: 'How long can I stay as a tourist?',
        answer: 'Tourist visa validity and stay duration vary by country, typically allowing stays of 30 days to 6 months.'
      },
      {
        question: 'Can I extend my tourist visa?',
        answer: 'Some countries allow tourist visa extensions under specific circumstances, though it\'s generally easier to apply for the correct duration initially.'
      }
    ]
  },
  {
    id: 'permanent-residence',
    title: 'Permanent Residence',
    description: 'Pathways to permanent residency and citizenship for long-term settlement.',
    icon: 'FaHome',
    category: 'immigration',
    price: 'From $5,500',
    duration: '12-36 months',
    successRate: '89%',
    features: [
      'Eligibility assessment',
      'Points calculation',
      'Document preparation',
      'Application processing',
      'Settlement services'
    ],
    requirements: [
      'Valid passport',
      'Educational credentials',
      'Work experience proof',
      'Language test results',
      'Medical examinations',
      'Police clearances'
    ],
    countries: ['canada', 'australia', 'new-zealand'],
    processSteps: [
      'Eligibility assessment and program selection',
      'Points optimization and documentation',
      'Expression of interest submission',
      'Invitation and formal application',
      'Landing and permanent residence'
    ],
    faqs: [
      {
        question: 'What are the benefits of permanent residence?',
        answer: 'Permanent residents can live, work, and study anywhere in the country, access healthcare and social services, and eventually apply for citizenship.'
      },
      {
        question: 'How is eligibility determined?',
        answer: 'Most countries use points-based systems considering factors like age, education, work experience, language ability, and adaptability factors.'
      }
    ]
  }
];

export const getServiceById = (id: string): ServiceType | undefined => {
  return services.find(service => service.id === id);
};

export const getServicesByCategory = (category: string): ServiceType[] => {
  return services.filter(service => service.category === category);
};

export const getServicesByCountry = (countryCode: string): ServiceType[] => {
  return services.filter(service => service.countries.includes(countryCode));
};
