export type ThemeMode = 'light' | 'dark';
export type PerformanceMode = 'ultra' | 'high' | 'medium' | 'low';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  techStack: string[];
  highlight: string;
  tagline?: string;
  description?: string;
  features?: string[];
  badge?: string;
  accent?: string;
}

export interface FlagshipProduct {
  id: string;
  name: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  metrics: string;
  status: string;
}

export interface VoiceCallTranscript {
  speaker: 'agent' | 'user';
  text: string;
  time: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  buttons?: string[];
  mediaTag?: string;
}

export interface BriefFormData {
  fullName: string;
  workEmail: string;
  company: string;
  productOrService?: string;
  service?: string;
  projectDetails: string;
  timeline: string;
  budget: string;
  consent: boolean;
}
