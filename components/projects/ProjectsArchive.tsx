"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/types";
import { ScreenPlaceholder } from "@/components/projects/ScreenPlaceholder";
import { EASE_EDITORIAL, revealViewport } from "@/lib/motion";

interface ProjectsArchiveProps {
  projects: Project[];
}

/**
 * Editorial list archive — row layout with a soft device preview.
 */
export function ProjectsArchive({ projects }: ProjectsArchiveProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mt-16 md:mt-20">
      {projects.map((project, index) => {
        const isMobile =
          project.slug === "edunet" ||
          (project.category ?? "").toLowerCase().includes("mobile");
        const subtitle =
          project.category ?? project.tag ?? (isMobile ? "Mobile View" : "Overview");
        const previewSrc = project.coverImage ?? project.images?.[0]?.src ?? null;
        const previewAlt = project.images?.[0]?.alt ?? project.title;
        const previewAspect =
          (previewSrc && project.imageDimensions[previewSrc]?.aspectRatio) ??
          (isMobile ? 9 / 16 : 16 / 10);

        return (
          <motion.div
            key={project.slug}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
            }
            viewport={revealViewport}
            transition={{
              duration: 0.7,
              delay: prefersReducedMotion ? 0 : index * 0.05,
              ease: EASE_EDITORIAL,
            }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group grid items-center gap-8 border-t border-border py-10 transition-colors md:grid-cols-12 md:gap-10 md:py-14"
            >
              <div className="md:col-span-1">
                <span className="font-serif-display text-2xl font-bold text-fg/20 md:text-3xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="md:col-span-6">
                <p className="label-caps mb-3 text-cherry">
                  {[project.category ?? project.tag, project.year]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <h2 className="font-serif-display text-2xl font-bold tracking-tight transition-colors group-hover:text-cherry md:text-3xl lg:text-4xl">
                  {project.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted md:text-base">
                  {project.description}
                </p>
                <p className="label-caps mt-5 text-fg transition-colors group-hover:text-cherry">
                  Open case study →
                </p>
              </div>

              <div className="md:col-span-5">
                <div
                  className={`ml-auto transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-translate-y-1 ${
                    isMobile ? "max-w-[120px]" : "max-w-[260px]"
                  }`}
                >
                  {/* Soft device — thin shell, no hard card border */}
                  <div
                    className={`bg-obsidian/90 p-[5px] shadow-[0_18px_36px_-18px_rgba(38,38,40,0.4)] ${
                      isMobile
                        ? "rounded-[1.35rem]"
                        : "rounded-lg"
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden bg-[#f4f2ed] ${
                        isMobile ? "rounded-[1.05rem]" : "rounded-sm"
                      }`}
                      style={{ aspectRatio: previewAspect }}
                    >
                      {previewSrc ? (
                        <Image
                          src={previewSrc}
                          alt={previewAlt}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 45vw, 260px"
                        />
                      ) : (
                        <ScreenPlaceholder
                          title={project.title}
                          subtitle={subtitle}
                          index={index + 1}
                          total={projects.length}
                        />
                      )}
                      {isMobile && (
                        <div
                          className="absolute left-1/2 top-1.5 z-20 h-3 w-[38%] -translate-x-1/2 rounded-full bg-obsidian"
                          aria-hidden
                        />
                      )}
                    </div>
                  </div>
                  {!isMobile && (
                    <div
                      className="mx-auto mt-0.5 h-1 w-[30%] rounded-b-sm bg-obsidian/50"
                      aria-hidden
                    />
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}

      {projects.length === 0 && (
        <p className="border-t border-border py-16 text-fg-muted">
          No additional projects yet.
        </p>
      )}
    </div>
  );
}
