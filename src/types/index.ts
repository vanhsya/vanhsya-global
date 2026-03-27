// VANHSYA TypeScript Interfaces

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  preferredDestination?: string;
  registrationDate: Date;
}

export interface VisaService {
  id: string;
  name: string;
  category: 'work' | 'study' | 'tourist' | 'business' | 'permanent' | 'family';
  country: string;
  duration: string;
  price: number;
  description: string;
  requirements: string[];
  processingTime: string;
  successRate: number;
}

export interface Consultation {
  id: string;
  userId: string;
  consultantId: string;
  date: Date;
  type: 'initial' | 'follow-up' | 'document-review' | 'interview-prep';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  price: number;
}

export interface Document {
  id: string;
  userId: string;
  name: string;
  type: string;
  uploadDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'requires-update';
  fileUrl: string;
  comments?: string;
}

export interface Case {
  id: string;
  userId: string;
  serviceId: string;
  status: 'submitted' | 'in-review' | 'documents-required' | 'approved' | 'rejected';
  submissionDate: Date;
  expectedCompletion?: Date;
  assignedConsultant?: string;
  documents: Document[];
  updates: CaseUpdate[];
}

export interface CaseUpdate {
  id: string;
  caseId: string;
  message: string;
  date: Date;
  type: 'info' | 'action-required' | 'success' | 'warning';
}

export interface Testimonial {
  id: string;
  userId: string;
  userName: string;
  userCountry: string;
  serviceUsed: string;
  rating: number;
  comment: string;
  date: Date;
  isVerified: boolean;
  profileImage?: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  visaTypes: string[];
  popularDestination: boolean;
  processingTime: string;
  requirements: string[];
}

export interface Consultant {
  id: string;
  name: string;
  specializations: string[];
  experience: number;
  rating: number;
  profileImage: string;
  bio: string;
  languages: string[];
  certifications: string[];
}

export interface LuckyDrawEntry {
  id: string;
  userId: string;
  entryDate: Date;
  prize?: string;
  isWinner: boolean;
}

export interface WalletBalance {
  userId: string;
  balance: number;
  currency: string;
  lastUpdated: Date;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: Date;
  reference?: string;
}
