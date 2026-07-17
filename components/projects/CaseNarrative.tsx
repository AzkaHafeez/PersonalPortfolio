"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";

/**
 * Shared narrative primitives reused across every project-room layout
 * (ProjectRooms, EdunetMobileShowcase, EventHubShowcase) so the same
 * problem/solution/process/outcome story, meta grid, tech stack, and link
 * row don't drift out of sync between homepage layouts.
 */

export function StoryBlock({ label, body }: { label: string; body?: string }) {
  if (!body) return null;
  return (
    <div className="border-t border-border pt-6">
      <p className="label-caps mb-3">{label}</p>
      <p className="text-sm leading-relaxed text-fg-muted md:text-base">{body}</p>
    </div>
  );
}

export function MetaGrid({ project }: { project: Project }) {
  return (
    <dl className="mt-8 grid gap-4 sm:grid-cols-2">
      {[
        { label: "Category", value: project.category ?? project.tag },
        { label: "Role", value: project.role },
        { label: "Duration", value: project.duration },
        { label: "Year", value: project.year },
      ].map((item) => (
        <div key={item.label} className="border-t border-border pt-3">
          <dt className="label-caps">{item.label}</dt>
          <dd className="mt-1 text-sm md:text-base">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TechStack({ technologies }: { technologies: string[] }) {
  return (
    <div className="mt-6">
      <p className="label-caps mb-3">Tech Stack</p>
      <p className="text-sm text-fg-muted">{technologies.join(" · ")}</p>
    </div>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-10 flex flex-wrap gap-6">
      {project.links.live && (
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps border-b border-fg pb-0.5 transition-opacity hover:opacity-60"
        >
          Live Project ↗
        </a>
      )}
      {project.links.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps border-b border-border pb-0.5 text-fg-muted transition-colors hover:border-fg hover:text-fg"
        >
          GitHub ↗
        </a>
      )}
      <Link
        href={`/projects/${project.slug}`}
        className="label-caps border-b border-border pb-0.5 text-fg-muted transition-colors hover:border-fg hover:text-fg"
      >
        Full Case Study
      </Link>
    </div>
  );
}

export function padIndex(n: number) {
  return String(n).padStart(2, "0");
}
