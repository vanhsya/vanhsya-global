import { CountryType } from '@/types/countries';

export const countries: CountryType[] = [
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    description: 'Experience the beauty and opportunity of Canada with our comprehensive immigration services.',
    shortDescription: 'Maple leaf nation with excellent quality of life',
    continent: 'North America',
    language: ['English', 'French'],
    currency: 'CAD',
    population: '38.2 million',
    capital: 'Ottawa',
    majorCities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton'],
    visaTypes: ['work-visa', 'study-visa', 'business-visa', 'family-visa', 'tourist-visa', 'permanent-residence'],
    popularPrograms: [
      'Express Entry System',
      'Provincial Nominee Program',
      'Quebec Immigration',
      'Start-up Visa Program',
      'Self-employed Persons Program'
    ],
    benefits: [
      'Universal healthcare system',
      'High quality of life',
      'Multicultural society',
      'Strong economy',
      'Excellent education system',
      'Path to citizenship in 3 years'
    ],
    requirements: {
      'work-visa': ['LMIA or job offer', 'Language proficiency', 'Educational credentials'],
      'study-visa': ['Letter of acceptance', 'Proof of funds', 'Language test'],
      'permanent-residence': ['Express Entry profile', 'Minimum CRS score', 'Language tests']
    },
    processingTimes: {
      'work-visa': '4-16 weeks',
      'study-visa': '4-12 weeks',
      'permanent-residence': '6-8 months',
      'tourist-visa': '2-4 weeks'
    },
    costOfLiving: {
      housing: '$1,200-$2,500/month',
      food: '$300-$500/month',
      transport: '$100-$200/month',
      utilities: '$150-$250/month'
    },
    keyStats: {
      immigrationRate: '1.2% annually',
      unemploymentRate: '5.8%',
      averageSalary: '$54,000 CAD',
      qualityOfLifeRank: '8th globally'
    }
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    description: 'Discover unlimited opportunities in Australia with our expert immigration guidance.',
    shortDescription: 'Land down under with diverse opportunities',
    continent: 'Oceania',
    language: ['English'],
    currency: 'AUD',
    population: '25.7 million',
    capital: 'Canberra',
    majorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    visaTypes: ['work-visa', 'study-visa', 'business-visa', 'family-visa', 'tourist-visa', 'permanent-residence'],
    popularPrograms: [
      'SkillSelect (EOI) System',
      'Employer Nomination Scheme',
      'Regional Sponsored Migration',
      'Business Innovation and Investment',
      'Global Talent Independent Program'
    ],
    benefits: [
      'Medicare healthcare system',
      'High standard of living',
      'Beautiful climate and beaches',
      'Strong job market',
      'World-class universities',
      'Multicultural environment'
    ],
    requirements: {
      'work-visa': ['Skills assessment', 'English proficiency', 'Health and character checks'],
      'study-visa': ['CoE from institution', 'GTE requirement', 'Financial capacity'],
      'permanent-residence': ['Points test', 'Skills assessment', 'English requirement']
    },
    processingTimes: {
      'work-visa': '3-6 months',
      'study-visa': '4-8 weeks',
      'permanent-residence': '8-12 months',
      'tourist-visa': '1-4 weeks'
    },
    costOfLiving: {
      housing: '$1,500-$3,000/month',
      food: '$400-$600/month',
      transport: '$150-$300/month',
      utilities: '$200-$300/month'
    },
    keyStats: {
      immigrationRate: '1.6% annually',
      unemploymentRate: '4.1%',
      averageSalary: '$68,000 AUD',
      qualityOfLifeRank: '5th globally'
    }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    description: 'Unlock opportunities in the UK with our comprehensive visa and immigration services.',
    shortDescription: 'Historic nation with global business opportunities',
    continent: 'Europe',
    language: ['English'],
    currency: 'GBP',
    population: '67.5 million',
    capital: 'London',
    majorCities: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool'],
    visaTypes: ['work-visa', 'study-visa', 'business-visa', 'family-visa', 'tourist-visa'],
    popularPrograms: [
      'Skilled Worker Visa',
      'Global Talent Visa',
      'Innovator Founder Visa',
      'Graduate Visa',
      'Health and Care Worker Visa'
    ],
    benefits: [
      'NHS healthcare system',
      'Rich cultural heritage',
      'Gateway to Europe',
      'Leading financial center',
      'Prestigious universities',
      'English-speaking environment'
    ],
    requirements: {
      'work-visa': ['Job offer from licensed sponsor', 'English language requirement', 'Salary threshold'],
      'study-visa': ['CAS from licensed institution', 'Financial requirements', 'English proficiency'],
      'business-visa': ['Business plan', 'Investment funds', 'English requirement']
    },
    processingTimes: {
      'work-visa': '3-8 weeks',
      'study-visa': '3-6 weeks',
      'business-visa': '8-12 weeks',
      'tourist-visa': '2-3 weeks'
    },
    costOfLiving: {
      housing: '$1,800-$4,000/month',
      food: '$350-$550/month',
      transport: '$200-$400/month',
      utilities: '$180-$280/month'
    },
    keyStats: {
      immigrationRate: '0.6% annually',
      unemploymentRate: '3.9%',
      averageSalary: '$42,000 GBP',
      qualityOfLifeRank: '12th globally'
    }
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    description: 'Achieve the American Dream with our expert US immigration services.',
    shortDescription: 'Land of opportunity with diverse pathways',
    continent: 'North America',
    language: ['English'],
    currency: 'USD',
    population: '331.9 million',
    capital: 'Washington D.C.',
    majorCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    visaTypes: ['work-visa', 'study-visa', 'business-visa', 'family-visa', 'tourist-visa'],
    popularPrograms: [
      'H-1B Specialty Occupation',
      'EB-5 Investor Program',
      'L-1 Intracompany Transfer',
      'O-1 Extraordinary Ability',
      'Family-based Immigration'
    ],
    benefits: [
      'World\'s largest economy',
      'Innovation and technology hub',
      'Diverse opportunities',
      'Higher education excellence',
      'Cultural diversity',
      'Entrepreneurial environment'
    ],
    requirements: {
      'work-visa': ['Job offer from US employer', 'Specialty occupation', 'Bachelor\'s degree'],
      'study-visa': ['I-20 from SEVP school', 'SEVIS fee payment', 'Financial support'],
      'business-visa': ['Substantial investment', 'Job creation', 'Business plan']
    },
    processingTimes: {
      'work-visa': '3-12 months',
      'study-visa': '2-6 weeks',
      'business-visa': '12-18 months',
      'tourist-visa': '1-4 weeks'
    },
    costOfLiving: {
      housing: '$1,500-$4,500/month',
      food: '$400-$700/month',
      transport: '$200-$500/month',
      utilities: '$200-$350/month'
    },
    keyStats: {
      immigrationRate: '0.3% annually',
      unemploymentRate: '3.7%',
      averageSalary: '$56,000 USD',
      qualityOfLifeRank: '15th globally'
    }
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    description: 'Build your future in Europe\'s economic powerhouse with our German immigration expertise.',
    shortDescription: 'Europe\'s economic engine with excellent benefits',
    continent: 'Europe',
    language: ['German'],
    currency: 'EUR',
    population: '83.2 million',
    capital: 'Berlin',
    majorCities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
    visaTypes: ['work-visa', 'study-visa', 'business-visa', 'family-visa', 'tourist-visa'],
    popularPrograms: [
      'EU Blue Card',
      'Skilled Immigration Act',
      'Job Seeker Visa',
      'Student Visa',
      'Family Reunification'
    ],
    benefits: [
      'Strong social security system',
      'Excellent work-life balance',
      'Free higher education',
      'Central European location',
      'Industrial and tech opportunities',
      'High job security'
    ],
    requirements: {
      'work-visa': ['Job offer or job search', 'Recognized qualifications', 'German language skills'],
      'study-visa': ['University admission', 'Financial proof', 'German/English proficiency'],
      'business-visa': ['Business plan', 'Financial requirements', 'Qualifications']
    },
    processingTimes: {
      'work-visa': '1-3 months',
      'study-visa': '6-12 weeks',
      'business-visa': '3-6 months',
      'tourist-visa': '2-4 weeks'
    },
    costOfLiving: {
      housing: '$800-$2,000/month',
      food: '$250-$400/month',
      transport: '$80-$150/month',
      utilities: '$200-$300/month'
    },
    keyStats: {
      immigrationRate: '1.1% annually',
      unemploymentRate: '3.1%',
      averageSalary: '$52,000 EUR',
      qualityOfLifeRank: '7th globally'
    }
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    flag: '🇳🇿',
    description: 'Experience the natural beauty and quality lifestyle of New Zealand.',
    shortDescription: 'Scenic islands with work-life balance focus',
    continent: 'Oceania',
    language: ['English', 'Māori'],
    currency: 'NZD',
    population: '5.1 million',
    capital: 'Wellington',
    majorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
    visaTypes: ['work-visa', 'study-visa', 'business-visa', 'family-visa', 'tourist-visa', 'permanent-residence'],
    popularPrograms: [
      'Skilled Migrant Category',
      'Essential Skills Work Visa',
      'Entrepreneur Work Visa',
      'Working Holiday Scheme',
      'Family Category'
    ],
    benefits: [
      'Stunning natural environment',
      'Excellent work-life balance',
      'Safe and peaceful society',
      'Strong economy',
      'Quality education system',
      'Easy pathway to citizenship'
    ],
    requirements: {
      'work-visa': ['Job offer or skill shortage', 'Health and character checks', 'English proficiency'],
      'study-visa': ['Letter of acceptance', 'Financial support', 'English requirement'],
      'permanent-residence': ['Points system', 'Age and skill requirements', 'Health checks']
    },
    processingTimes: {
      'work-visa': '3-6 months',
      'study-visa': '4-8 weeks',
      'permanent-residence': '6-12 months',
      'tourist-visa': '2-4 weeks'
    },
    costOfLiving: {
      housing: '$1,200-$2,500/month',
      food: '$350-$500/month',
      transport: '$120-$200/month',
      utilities: '$150-$250/month'
    },
    keyStats: {
      immigrationRate: '1.8% annually',
      unemploymentRate: '3.4%',
      averageSalary: '$58,000 NZD',
      qualityOfLifeRank: '9th globally'
    }
  }
];

export const getCountryById = (id: string): CountryType | undefined => {
  return countries.find(country => country.id === id);
};

export const getCountriesByContinent = (continent: string): CountryType[] => {
  return countries.filter(country => country.continent === continent);
};

export const getCountriesByVisaType = (visaType: string): CountryType[] => {
  return countries.filter(country => country.visaTypes.includes(visaType));
};
