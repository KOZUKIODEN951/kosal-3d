export type PerformanceMode = 'low' | 'high' | 'ultra';

export type ThemeMode = 'dark' | 'light';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  techStack: string[];
  highlight: string;
}

export interface BriefFormData {
  fullName: string;
  workEmail: string;
  company: string;
  service: string;
  projectDetails: string;
  timeline: string;
  budget: string;
  consent: boolean;
}
