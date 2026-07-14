import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  ExperienceEntry,
  Project,
  ProjectFrontmatter,
  ResearchItem,
  SkillCategory,
  TimelineEvent,
  WritingArticle,
  WritingFrontmatter,
} from "./types";

const contentDir = path.join(process.cwd(), "content");

function readMdxFiles<T extends { slug: string }>(
  dir: string,
  sortFn?: (a: T, b: T) => number
): (T & { content: string })[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const items = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    return { ...(data as T), content };
  });

  return sortFn ? items.sort(sortFn) : items;
}

export const HOME_PROJECT_SLUGS = [
  "artisan-bakeries",
  "aura-pro",
  "edunet",
] as const;

export function getAllProjects(): Project[] {
  const projects = readMdxFiles<ProjectFrontmatter>(
    path.join(contentDir, "projects"),
    (a, b) => parseInt(b.year) - parseInt(a.year)
  );
  return projects;
}

export function getHomeProjects(): Project[] {
  const all = getAllProjects();
  return HOME_PROJECT_SLUGS.map((slug) =>
    all.find((p) => p.slug === slug)
  ).filter((p): p is Project => Boolean(p));
}

export function getArchiveProjects(): Project[] {
  const home = new Set<string>(HOME_PROJECT_SLUGS);
  return getAllProjects().filter((p) => !home.has(p.slug));
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProjects(): Project[] {
  return getHomeProjects();
}

export function getAllWriting(): WritingArticle[] {
  return readMdxFiles<WritingFrontmatter>(
    path.join(contentDir, "writing"),
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getWritingBySlug(slug: string): WritingArticle | null {
  const articles = getAllWriting();
  return articles.find((a) => a.slug === slug) ?? null;
}

export function getExperience(): ExperienceEntry[] {
  const filePath = path.join(contentDir, "experience.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data.entries;
}

export function getSkills(): SkillCategory[] {
  const filePath = path.join(contentDir, "skills.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data.categories;
}

export function getResearch(): ResearchItem[] {
  const filePath = path.join(contentDir, "research.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data.items;
}

export function getTimeline(): TimelineEvent[] {
  const filePath = path.join(contentDir, "timeline.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data.events;
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

export function getWritingSlugs(): string[] {
  return getAllWriting().map((a) => a.slug);
}
