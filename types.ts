export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  homepage: string | null;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  icon?: string;
}

export type ThemeColor = 'cyan' | 'emerald' | 'orange' | 'gold';