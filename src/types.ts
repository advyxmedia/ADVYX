export type ThemeMode = 'auto' | 'light' | 'dark';
export type DayPeriod = 'dawn' | 'day' | 'golden' | 'night';

export interface Inquiry {
  id: string;
  clientName: string;
  businessName: string;
  email: string;
  service: string;
  budget: string;
  country?: string;
  countryCode?: string;
  currency?: string;
  currencySymbol?: string;
  budgetMin?: number;
  budgetMax?: number | null;
  message: string;
  status: 'New' | 'Contacted' | 'In Review' | 'Proposal Sent' | 'Closed Won' | 'Archived';
  createdAt: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  name: string;
  businessName: string;
  email: string;
  service: string;
  callType: '15-min Intro' | '30-min Strategy Session' | '45-min Growth Audit';
  date: string;
  time: string;
  timezone: string;
  status: 'Upcoming' | 'Completed' | 'Rescheduled' | 'Cancelled';
  createdAt: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  tagline: string;
  category: 'Branding & Identity' | 'Social Media Management' | 'Performance Ads' | 'Content Creation';
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  solution: string;
  deliverables: string[];
  clientQuote?: string;
  period: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  projectType: string;
  date: string;
  isVerified: boolean;
}

export interface ServiceTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  deliverables: string[];
  idealFor: string;
  turnaround: string;
  popular?: boolean;
}
