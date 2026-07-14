export interface ProjectLinks {
  live?: string;
  github?: string;
  caseStudy?: boolean;
}

export type DeviceVariant = "macbook" | "ipad" | "iphone" | "browser";

/** Explicit home-room image slots — set each URL yourself; nothing auto-fills. */
export interface ProjectPlaceholders {
  /** Main hero device (laptop / browser) */
  primary?: string | null;
  /** Secondary overlapping device (phone / tablet) */
  secondary?: string | null;
  /** Exhibition wall frames, in order */
  wall?: { src: string; alt: string; variant?: DeviceVariant }[];
  /** Info card image stuck to the top of the wall card */
  card?: string | null;
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
  category?: string;
  problem?: string;
  solution?: string;
  process?: string;
  outcome?: string;
  coverImage?: string | null;
  /** Optional named home slots — preferred over auto cover/images mapping */
  placeholders?: ProjectPlaceholders;
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
