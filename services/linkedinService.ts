import { ExperienceItem, Certification } from '../types';

// Mock Data - In a real production app with a backend, this would fetch from a proxy server interacting with LinkedIn API.
// Direct client-side calls to LinkedIn API are not possible due to CORS and Security.

const MOCK_EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    role: "Senior Systems Engineer",
    company: "Tech Giant Corp",
    period: "2020 - Present",
    description: "Leading the architectural overhaul of legacy payment systems. Implemented distributed tracing improving debug time by 40%.",
    skills: ["Rust", "Kubernetes", "GCP", "System Design"]
  },
  {
    id: 2,
    role: "Lead Full-Stack Developer",
    company: "FinTech Solutions",
    period: "2016 - 2020",
    description: "Designed and built a secure banking portal serving 1M+ users. Spearheaded the migration from monolith to microservices.",
    skills: ["React", "Node.js", "AWS", "PostgreSQL"]
  },
  {
    id: 3,
    role: "Security Consultant",
    company: "CyberGuard",
    period: "2013 - 2016",
    description: "Conducted penetration testing and security audits for enterprise clients. Secured payment gateways achieving PCI-DSS compliance.",
    skills: ["Python", "Pen-Testing", "OWASP", "Encryption"]
  },
  {
    id: 4,
    role: "Software Engineer",
    company: "StartUp Inc",
    period: "2010 - 2013",
    description: "Early core contributor to open-source tooling. Developed high-throughput API endpoints for real-time data analytics.",
    skills: ["Java", "Spring Boot", "Redis"]
  }
];

const MOCK_CERTIFICATIONS: Certification[] = [
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "The Linux Foundation",
    date: "Issued Dec 2024",
    icon: "cloud"
  },
  {
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    date: "Issued Jun 2023",
    icon: "cloud"
  },
  {
    name: "Certified Information Systems Security Professional (CISSP)",
    issuer: "ISC2",
    date: "Issued Mar 2022",
    icon: "security"
  },
  {
    name: "Google Cloud Professional Data Engineer",
    issuer: "Google",
    date: "Issued Nov 2021",
    icon: "data"
  }
];

export const fetchExperience = async (): Promise<ExperienceItem[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(MOCK_EXPERIENCE);
    }, 1500);
  });
};

export const fetchCertifications = async (): Promise<Certification[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(MOCK_CERTIFICATIONS);
    }, 1200);
  });
};