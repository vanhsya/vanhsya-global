export interface CountryType {
  id: string;
  name: string;
  flag: string;
  description: string;
  shortDescription: string;
  continent: string;
  language: string[];
  currency: string;
  population: string;
  capital: string;
  majorCities: string[];
  visaTypes: string[];
  popularPrograms: string[];
  benefits: string[];
  requirements: Record<string, string[]>;
  processingTimes: Record<string, string>;
  costOfLiving: {
    housing: string;
    food: string;
    transport: string;
    utilities: string;
  };
  keyStats: {
    immigrationRate: string;
    unemploymentRate: string;
    averageSalary: string;
    qualityOfLifeRank: string;
  };
}

export interface CountryStats {
  totalPopulation: string;
  immigrantPercentage: string;
  economicRank: string;
  happinessIndex: string;
}

export interface VisaRequirement {
  country: string;
  visaType: string;
  requirements: string[];
  processingTime: string;
  cost: string;
}

export interface CostOfLiving {
  country: string;
  city: string;
  housing: number;
  food: number;
  transport: number;
  utilities: number;
  total: number;
  currency: string;
}
