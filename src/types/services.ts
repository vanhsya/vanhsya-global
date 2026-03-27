export interface ServiceType {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'visa' | 'immigration' | 'consultation';
  price: string;
  duration: string;
  successRate: string;
  features: string[];
  requirements: string[];
  countries: string[];
  processSteps: string[];
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: string[];
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  requirements?: string[];
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  services: string[];
  price: string;
  savings: string;
  popular?: boolean;
}
