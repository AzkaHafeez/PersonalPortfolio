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
  /** Secondary overlapping device (phone / tablet) in hero layouts */
  secondary?: string | null;
  /** Tall full-page escaping laptop mockup (left of copy) */
  scroll?: string | null;
  /** Exhibition wall: overlapping browser + phone cluster */
  browserPhone?: {
    browser: string;
    phone: string;
    browserAlt?: string;
    phoneAlt?: string;
  } | null;
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
  /** Optional named home slots — paths under /images/projects/home/* */
  placeholders?: ProjectPlaceholders;
  /** Case study dual escaping MacBooks — paths under /images/projects/case/* */
  escapeDuo?: {
    left: string;
    right: string;
    leftAlt?: string;
    rightAlt?: string;
  } | null;
  tags: string[];
  links: ProjectLinks;
  technologies: string[];
  /** Case study gallery — paths under /images/projects/case/* (do not reuse home URLs) */
  images?: { src: string; alt: string }[];
}

export interface ImageDims {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface Project extends ProjectFrontmatter {
  content: string;
  /** Computed from the real files on disk — src -> real dimensions. Never authored by hand. */
  imageDimensions: Record<string, ImageDims>;
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
