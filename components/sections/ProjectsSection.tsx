"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { siteConfig } from "@/content/site";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

function ProjectCover({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-fg md:aspect-[16/10] md:w-48 lg:w-56">
      {project.coverImage ? (
        <motion.div
          layoutId={`project-cover-${project.slug}`}
          className="h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </motion.div>
      ) : (
        <motion.div
          layoutId={`project-cover-${project.slug}`}
          className="flex h-full w-full items-center justify-center p-4"
        >
          <span className="font-serif-display text-center text-lg italic text-bg/80 md:text-xl">
            {project.title}
          </span>
        </motion.div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <FadeIn delay={index * 0.05}>
      <article className="group border-t border-border py-10 first:border-t-0 md:py-14">
        <div
          className={`flex flex-col gap-8 md:gap-12 ${
            reversed ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          <div className="shrink-0">
            <Link href={`/projects/${project.slug}`} className="block overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCover project={project} />
              </motion.div>
            </Link>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <div className="mb-3 flex items-center gap-3">
              {project.tag && (
                <span className="label-caps text-fg">{project.tag}</span>
              )}
              <span className="label-caps">{project.year}</span>
            </div>

            <Link href={`/projects/${project.slug}`}>
              <h3 className="font-serif-display text-2xl font-bold tracking-tight transition-colors group-hover:text-fg-muted md:text-3xl lg:text-4xl">
                {project.title}
              </h3>
            </Link>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="text-xs text-fg-muted">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-6">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-caps border-b border-fg pb-0.5 transition-opacity hover:opacity-60"
                >
                  View Project ↗
                </a>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="label-caps border-b border-border pb-0.5 text-fg-muted transition-colors hover:border-fg hover:text-fg"
              >
                Case Study
              </Link>
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-caps text-fg-muted transition-colors hover:text-fg"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </FadeIn>
  );
}

function Sidebar({ projects }: { projects: Project[] }) {
  const series = [
    { name: "AI Products", count: projects.filter((p) => p.tags.some((t) => ["TensorFlow", "Firebase", "Python"].includes(t))).length },
    { name: "Platforms", count: projects.filter((p) => ["Django", "Flutter"].some((t) => p.tags.includes(t))).length },
    { name: "Editorial Web", count: projects.filter((p) => ["GSAP", "Three.js", "React"].some((t) => p.tags.includes(t))).length },
  ];

  return (
    <aside className="space-y-12 lg:sticky lg:top-28 lg:self-start">
      <div>
        <p className="label-caps mb-6">Curated series</p>
        <ul className="space-y-3">
          {series.map((s) => (
            <li key={s.name} className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm">{s.name}</span>
              <span className="font-serif-display text-lg">{s.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="label-caps mb-4">Current stack</p>
        <p className="text-sm leading-relaxed text-fg-muted">
          {siteConfig.stack.join(" · ")}
        </p>
      </div>

      <div className="rounded-sm bg-fg p-6 text-bg dark:bg-bg-muted dark:text-fg">
        <p className="font-serif-display mb-2 text-xl font-bold">Let&apos;s build</p>
        <p className="mb-4 text-sm opacity-80">
          Open to freelance projects, internships, and startup collaborations.
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
        >
          Get in touch →
        </a>
      </div>
    </aside>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <SectionShell id="projects">
      <SectionLabel number="02" label="Projects" />

      <FadeIn className="mt-8">
        <h2 className="font-serif-display max-w-3xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Work that reads like <em className="italic">publication</em>
        </h2>
        <p className="mt-4 max-w-2xl text-fg-muted">
          Each project is a case study — not a thumbnail in a grid, but a story
          about problems solved and products shipped.
        </p>
      </FadeIn>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px]">
        <div>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <Sidebar projects={projects} />
      </div>
    </SectionShell>
  );
}
