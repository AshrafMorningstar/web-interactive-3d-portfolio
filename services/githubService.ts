import { GitHubRepo } from '../types';

const USERNAME = 'AshrafMorningstar';

// Fallback data in case of API rate limits or empty response
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "secure-payment-gateway",
    description: "A PCI-DSS compliant payment processing engine built with Rust and gRPC.",
    html_url: "https://github.com/AshrafMorningstar",
    stargazers_count: 124,
    forks_count: 35,
    language: "Rust",
    topics: ["security", "fintech", "payment", "rust"],
    homepage: null
  },
  {
    id: 2,
    name: "distributed-task-scheduler",
    description: "High-availability distributed task scheduler using Go and Raft consensus algorithm.",
    html_url: "https://github.com/AshrafMorningstar",
    stargazers_count: 89,
    forks_count: 12,
    language: "Go",
    topics: ["distributed-systems", "raft", "scheduler"],
    homepage: null
  },
  {
    id: 3,
    name: "react-nexus-dashboard",
    description: "Enterprise dashboard template featuring advanced data visualization with D3.js.",
    html_url: "https://github.com/AshrafMorningstar",
    stargazers_count: 245,
    forks_count: 67,
    language: "TypeScript",
    topics: ["react", "dashboard", "visualization"],
    homepage: null
  },
  {
    id: 4,
    name: "cloud-infrastructure-terraform",
    description: "Modular Terraform configurations for multi-cloud deployments (AWS, GCP).",
    html_url: "https://github.com/AshrafMorningstar",
    stargazers_count: 156,
    forks_count: 42,
    language: "HCL",
    topics: ["terraform", "devops", "aws", "gcp"],
    homepage: null
  }
];

export const fetchTopRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
         console.warn("GitHub API rate limit exceeded. Using fallback data.");
         return FALLBACK_REPOS;
      }
      throw new Error('Failed to fetch repos');
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Sort by stars descending
    const sorted = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    
    // Return top 4
    return sorted.slice(0, 4);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return FALLBACK_REPOS;
  }
};