export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: ValidationError[];
  meta?: ResponseMeta;
}

export interface ResponseMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiError {
  status: number;
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  category?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  country?: string;
  service?: string;
}

export interface ConsultationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceInterest?: string;
  country?: string;
}

export interface NewsletterSubscription {
  email: string;
  firstName?: string;
  interests?: string[];
  source?: string;
}

export interface EligibilityAssessment {
  age: number;
  education: string;
  workExperience: number;
  languageSkills: string;
  jobOffer: boolean;
  preferredCountry: string;
  maritalStatus: string;
  dependents: number;
}

export interface EligibilityResult {
  score: number;
  eligibility: 'high' | 'medium' | 'low' | 'not-eligible';
  recommendations: string[];
  suitablePrograms: string[];
  nextSteps: string[];
}

export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  required: boolean;
  category: string;
  acceptedFormats: string[];
  maxSize: number;
}

export interface Application {
  id: string;
  userId: string;
  serviceType: string;
  country: string;
  status: 'draft' | 'submitted' | 'in-review' | 'approved' | 'rejected' | 'completed';
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  completedAt?: Date;
  documents: ApplicationDocument[];
  timeline: ApplicationEvent[];
}

export interface ApplicationDocument {
  id: string;
  documentType: string;
  file: FileUpload;
  status: 'pending' | 'approved' | 'rejected';
  reviewNotes?: string;
  uploadedAt: Date;
}

export interface ApplicationEvent {
  id: string;
  type: 'created' | 'submitted' | 'document_uploaded' | 'status_changed' | 'note_added';
  title: string;
  description: string;
  createdAt: Date;
  createdBy: string;
}
