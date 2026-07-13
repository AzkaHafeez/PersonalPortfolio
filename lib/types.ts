export interface ProjectLinks {
  live?: string;
  github?: string;
  caseStudy?: boolean;
}

export interface ProjectFrontmatter {
  slug: string;
  title: string;
  description: string;
  role: string;
  duration: string;
  year: string;
  featured: boolean;
  tag?: string;
  coverImage?: string | null;
  tags: string[];
  links: ProjectLinks;
  technologies: string[];
  images?: { src: string; alt: string }[];
}

export interface Project extends ProjectFrontmatter {
  content: string;
}

export interface WritingFrontmatter {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string | null;
  excerpt: string;
}

export interface WritingArticle extends WritingFrontmatter {
  content: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  summary: string;
  contributions: string[];
  technologies: string[];
  links?: {
    live?: string;
    github?: string;
  };
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
}

export interface TimelineEvent {
  year: string;
  type: string;
  title: string;
  description: string;
}
