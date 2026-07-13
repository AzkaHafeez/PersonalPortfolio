"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ProfileTabId } from "@/content/site";
import { aboutContent, siteConfig } from "@/content/site";
import type {
  ExperienceEntry,
  Project,
  SkillCategory,
  TimelineEvent,
} from "@/lib/types";
import { ProfileTabs } from "@/components/layout/ProfileTabs";
import { PublicationSidebar } from "@/components/layout/PublicationSidebar";

function FeedThumbnail({
  title,
  coverImage,
}: {
  title: string;
  slug?: string;
  coverImage?: string | null;
  variant?: "project" | "writing" | "experience";
}) {
  return (
    <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-md bg-obsidian sm:h-[100px] sm:w-[100px]">
      {coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-lavender/30 p-2 dark:bg-lavender/20">
          <span className="font-serif-display text-center text-xs italic text-obsidian dark:text-cream/80 sm:text-sm">
            {title.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>
      )}
    </div>
  );
}

function FeedActions({
  liveUrl,
  githubUrl,
  shareTitle,
}: {
  liveUrl?: string;
  githubUrl?: string;
  shareTitle?: string;
}) {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (shareTitle && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: window.location.href });
      } catch {
        /* user cancelled */
      }
    }
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-fg-muted">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 transition-colors hover:text-cherry"
        >
          <span aria-hidden>↗</span> View Live
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 transition-colors hover:text-cherry"
        >
          <span aria-hidden>⌥</span> GitHub
        </a>
      )}
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1 transition-colors hover:text-cherry"
      >
        <span aria-hidden>↗</span> Share
      </button>
    </div>
  );
}

function ProjectsFeed({ projects }: { projects: Project[] }) {
  return (
    <div className="divide-y divide-border">
      {projects.map((project) => (
        <article key={project.slug} className="group relative py-8 first:pt-0">
          <Link
            href={`/projects/${project.slug}`}
            className="absolute inset-0 z-0"
            aria-label={`Open case study: ${project.title}`}
          />
          <div className="pointer-events-none relative z-10 flex gap-5 sm:gap-6">
            <div className="pointer-events-none shrink-0">
              <FeedThumbnail
                title={project.title}
                coverImage={project.coverImage}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-fg-muted">
                {project.tag && (
                  <span className="font-medium text-cherry">{project.tag}</span>
                )}
                <span>{project.year}</span>
              </div>
              <h3 className="font-serif-display text-xl font-bold leading-snug transition-colors group-hover:text-cherry sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fg-muted">
                {project.description}
              </p>
              <div className="pointer-events-auto">
                <FeedActions
                  liveUrl={project.links.live}
                  githubUrl={project.links.github}
                  shareTitle={project.title}
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ExperienceFeed({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div className="divide-y divide-border">
      {entries.map((entry) => (
        <article key={entry.id} className="flex gap-5 py-8 first:pt-0 sm:gap-6">
          <FeedThumbnail title={entry.company} variant="experience" />
          <div className="min-w-0 flex-1">
            <div className="mb-2 text-xs text-fg-muted">{entry.duration}</div>
            <h3 className="font-serif-display text-xl font-bold sm:text-2xl">
              {entry.company}
            </h3>
            <p className="mt-1 text-sm text-fg-muted">{entry.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {entry.summary}
            </p>
            <FeedActions
              liveUrl={entry.links?.live}
              githubUrl={entry.links?.github}
              shareTitle={entry.company}
            />
          </div>
        </article>
      ))}
    </div>
  );
}

function AboutFeed({
  skills,
  timeline,
}: {
  skills: SkillCategory[];
  timeline: TimelineEvent[];
}) {
  return (
    <div className="space-y-12">
      <div>
        <p className="font-serif-display text-2xl font-bold leading-snug md:text-3xl">
          {aboutContent.story}
        </p>
        <p className="mt-6 text-sm leading-relaxed text-fg-muted md:text-base">
          {aboutContent.secondary}
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {aboutContent.quickFacts.map((fact) => (
          <div key={fact.label} className="border-t border-border pt-4">
            <p className="label-caps mb-1">{fact.label}</p>
            <p className="text-sm">{fact.value}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="label-caps mb-4">Values</p>
        <ul className="space-y-2">
          {aboutContent.values.map((v) => (
            <li key={v} className="text-sm text-fg-muted">
              — {v}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="label-caps mb-6">Skills</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.slice(0, 6).map((cat) => (
            <div key={cat.name} className="border-t border-border pt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-fg-muted">
                {cat.name}
              </p>
              <p className="font-serif-display text-sm leading-relaxed">
                {cat.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="label-caps mb-6">Timeline</p>
        <div className="space-y-6">
          {timeline.map((event) => (
            <div
              key={`${event.year}-${event.title}`}
              className="grid gap-1 border-t border-border pt-4 sm:grid-cols-[80px_1fr]"
            >
              <span className="font-serif-display font-bold">{event.year}</span>
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="mt-1 text-sm text-fg-muted">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-10">
        <h3 className="font-serif-display text-3xl font-bold">
          Let&apos;s build <em className="italic">something.</em>
        </h3>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-4 inline-block font-serif-display text-xl underline decoration-lavender underline-offset-8 hover:decoration-cherry"
        >
          {siteConfig.email}
        </a>
      </div>
    </div>
  );
}

interface PublicationHomeProps {
  projects: Project[];
  experience: ExperienceEntry[];
  skills: SkillCategory[];
  timeline: TimelineEvent[];
}

export function PublicationHome({
  projects,
  experience,
  skills,
  timeline,
}: PublicationHomeProps) {
  const [activeTab, setActiveTab] = useState<ProfileTabId>("projects");

  const counts: Record<ProfileTabId, number> = {
    projects: projects.length,
    experience: experience.length,
    about: 0,
  };

  return (
    <>
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      <div className="container-editorial grid gap-12 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[1fr_280px] lg:gap-16 lg:px-16 xl:grid-cols-[1fr_300px] xl:px-24">
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === "projects" && <ProjectsFeed projects={projects} />}
              {activeTab === "experience" && (
                <ExperienceFeed entries={experience} />
              )}
              {activeTab === "about" && (
                <AboutFeed skills={skills} timeline={timeline} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <PublicationSidebar projects={projects} activeTab={activeTab} />
      </div>
    </>
  );
}
