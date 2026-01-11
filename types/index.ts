import { OpenGraphData } from "@/app/api/og/route";

export interface TBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
}

export interface TProject {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  link: string;
  // Optional Open Graph data (can be populated automatically)
  ogData?: OpenGraphData | null;
}

export interface TExperience {
  title: string;
  company: string;
  period: string;
  description?: string;
  points?: string[];
}

export * from "./star";
