"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { DeviceVariant, Project } from "@/lib/types";
import { FadeIn } from "@/components/ui/FadeIn";
import { DeviceFrame } from "@/components/exhibition/DeviceFrame";
import { EscapingLaptopFrame } from "@/components/exhibition/WebsiteScrollFrame";
import { BrowserPhoneSplit } from "@/components/exhibition/BrowserPhoneSplit";
import { EdunetMobileShowcase } from "@/components/exhibition/EdunetMobileShowcase";
import { EventHubShowcase } from "@/components/exhibition/EventHubShowcase";

function padIndex(n: number) {
  return String(n).padStart(2, "0");
}

/** Named home slots from MDX — never invents URLs. */
function getPlaceholders(project: Project) {
  return project.placeholders ?? {};
}

function StoryBlock({
  label,
  body,
}: {
  label: string;
  body?: string;
}) {
  if (!body) return null;
  return (
    <div className="border-t border-border pt-6">
      <p className="label-caps mb-3">{label}</p>
      <p className="text-sm leading-relaxed text-fg-muted md:text-base">{body}</p>
    </div>
  );
}

function MetaGrid({ project }: { project: Project }) {
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

function TechStack({ technologies }: { technologies: string[] }) {
  return (
    <div className="mt-6">
      <p className="label-caps mb-3">Tech Stack</p>
      <p className="text-sm text-fg-muted">{technologies.join(" · ")}</p>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
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

const WALL_FALLBACK_VARIANTS: DeviceVariant[] = [
  "macbook",
  "ipad",
  "iphone",
  "browser",
];
const WALL_SPANS = [
  "md:col-span-7",
  "md:col-span-5 md:pt-12",
  "md:col-span-4 md:pt-8",
  "md:col-span-8",
  "md:col-span-6",
  "md:col-span-6",
] as const;

/**
 * Exhibition wall.
 * If `placeholders` is set: only those URLs (browserPhone / wall / card).
 * Never falls back to case-study `images[]` — keeps home and case assets separate.
 * Otherwise (legacy): uses `images[]`.
 */
function ExhibitionWall({ project }: { project: Project }) {
  const explicit = project.placeholders;
  const wall = explicit
    ? (explicit.wall ?? [])
    : (project.images ?? []).map((img) => ({
        src: img.src,
        alt: img.alt,
        variant: undefined as DeviceVariant | undefined,
      }));
  const card = explicit ? (explicit.card ?? null) : null;
  const combo = explicit?.browserPhone ?? null;
  const hasCombo = Boolean(combo?.browser && combo?.phone);

  if (wall.length === 0 && !card && !hasCombo) return null;

  return (
    <FadeIn className="mt-20">
      <p className="label-caps mb-8">Exhibition Wall</p>
      <div className="grid gap-4 md:grid-cols-12 md:gap-5">
        {hasCombo && combo && (
          <div className="md:col-span-8 lg:col-span-7">
            <BrowserPhoneSplit
              browserSrc={combo.browser}
              phoneSrc={combo.phone}
              browserAlt={combo.browserAlt ?? `${project.title} — desktop`}
              phoneAlt={combo.phoneAlt ?? `${project.title} — mobile`}
            />
          </div>
        )}

        {wall.map((image, i) => (
          <div
            key={`${image.src}-${i}`}
            className={
              hasCombo
                ? "md:col-span-6"
                : WALL_SPANS[i % WALL_SPANS.length]
            }
          >
            <DeviceFrame
              src={image.src}
              alt={image.alt}
              variant={
                image.variant ??
                WALL_FALLBACK_VARIANTS[i % WALL_FALLBACK_VARIANTS.length]
              }
            />
          </div>
        ))}

        <div
          className={`flex flex-col overflow-hidden border border-border bg-bg-muted/40 md:col-span-12 ${
            hasCombo
              ? "lg:col-span-5 lg:col-start-8 lg:row-start-1"
              : "lg:col-span-4 lg:col-start-9 lg:row-start-1"
          }`}
        >
          {card && (
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-bg-muted">
              <Image
                src={card}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-end gap-3 p-6">
            <p className="font-serif-display text-2xl font-bold">{project.title}</p>
            <p className="text-sm text-fg-muted">{project.description}</p>
            <p className="label-caps mt-2">
              {project.technologies.slice(0, 4).join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function ContentColumn({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div>
      <p className="font-serif-display text-5xl font-bold text-fg/15 md:text-7xl">
        {padIndex(index + 1)}
      </p>
      <h3 className="font-serif-display mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {project.title}
      </h3>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-fg-muted">
        {project.description}
      </p>
      <MetaGrid project={project} />
      <TechStack technologies={project.technologies} />
      <div className="mt-10 space-y-6">
        <StoryBlock label="Problem" body={project.problem} />
        <StoryBlock label="Solution" body={project.solution} />
        <StoryBlock label="Process" body={project.process} />
        <StoryBlock label="Outcome" body={project.outcome} />
      </div>
      <ProjectLinks project={project} />
    </div>
  );
}

/** Artisan: laptop + escaping tall page left, details right (devices on Exhibition Wall). */
function LayoutArtisanScroll({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ph = getPlaceholders(project);
  // Homepage-only: never read case-study images[]
  const scrollSrc = ph.scroll ?? null;

  return (
    <div className="grid items-start gap-16 lg:grid-cols-2">
      <FadeIn>
        {scrollSrc && (
          <EscapingLaptopFrame
            src={scrollSrc}
            alt={`${project.title} full-page design`}
            priority
          />
        )}
      </FadeIn>
      <FadeIn delay={0.1}>
        <ContentColumn project={project} index={index} />
      </FadeIn>
    </div>
  );
}

function LayoutSplitLeft({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ph = getPlaceholders(project);
  const explicit = Boolean(project.placeholders);
  const cover = explicit
    ? (ph.primary ?? null)
    : (ph.primary ?? project.coverImage ?? project.images?.[0]?.src ?? null);
  const phone = explicit
    ? (ph.secondary ?? null)
    : (ph.secondary ?? project.images?.[1]?.src ?? null);

  return (
    <div className="grid items-start gap-16 lg:grid-cols-2">
      <FadeIn>
        <div className="relative pr-4 pt-4">
          {cover && (
            <DeviceFrame src={cover} alt={project.title} variant="browser" priority />
          )}
          {phone && (
            <div className="absolute -bottom-10 right-0 w-[38%] md:right-4">
              <DeviceFrame src={phone} alt={project.title} variant="iphone" />
            </div>
          )}
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <ContentColumn project={project} index={index} />
      </FadeIn>
    </div>
  );
}

function LayoutSplitRight({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ph = getPlaceholders(project);
  const explicit = Boolean(project.placeholders);
  const cover = explicit
    ? (ph.primary ?? null)
    : (ph.primary ?? project.coverImage ?? project.images?.[0]?.src ?? null);
  const tablet = explicit
    ? (ph.secondary ?? null)
    : (ph.secondary ?? project.images?.[1]?.src ?? null);

  return (
    <div className="grid items-start gap-16 lg:grid-cols-2">
      <FadeIn>
        <ContentColumn project={project} index={index} />
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="relative space-y-6 lg:pt-8">
          {cover && (
            <DeviceFrame src={cover} alt={project.title} variant="macbook" priority />
          )}
          {tablet && (
            <div className="ml-auto w-[70%]">
              <DeviceFrame src={tablet} alt={project.title} variant="ipad" />
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

function LayoutCentered({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cover = project.coverImage ?? project.images?.[0]?.src;
  const imgs = project.images ?? [];

  return (
    <div className="mx-auto max-w-4xl text-center">
      <FadeIn>
        <p className="font-serif-display text-6xl font-bold text-fg/15 md:text-8xl">
          {padIndex(index + 1)}
        </p>
        <h3 className="font-serif-display mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {project.title}
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-fg-muted">{project.description}</p>
        <p className="label-caps mt-6">
          {[project.category ?? project.tag, project.role, project.duration]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="relative mx-auto mt-16 max-w-3xl">
        {cover && (
          <DeviceFrame src={cover} alt={project.title} variant="macbook" priority />
        )}
        {imgs[1] && (
          <div className="absolute -bottom-6 -left-4 w-[28%] md:-left-10">
            <DeviceFrame src={imgs[1].src} alt={imgs[1].alt} variant="iphone" />
          </div>
        )}
        {imgs[2] && (
          <div className="absolute -bottom-4 -right-2 w-[40%] md:-right-8">
            <DeviceFrame src={imgs[2].src} alt={imgs[2].alt} variant="ipad" />
          </div>
        )}
      </FadeIn>

      <FadeIn delay={0.15} className="mx-auto mt-28 max-w-2xl space-y-6 text-left">
        <StoryBlock label="Problem" body={project.problem} />
        <StoryBlock label="Solution" body={project.solution} />
        <StoryBlock label="Process" body={project.process} />
        <StoryBlock label="Outcome" body={project.outcome} />
        <TechStack technologies={project.technologies} />
        <ProjectLinks project={project} />
      </FadeIn>
    </div>
  );
}

function LayoutMagazine({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const imgs = project.images ?? [];
  const cover = project.coverImage ?? imgs[0]?.src;

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <FadeIn className="lg:col-span-5">
          <p className="font-serif-display text-5xl font-bold text-fg/15 md:text-6xl">
            {padIndex(index + 1)}
          </p>
          <h3 className="font-serif-display mt-2 text-3xl font-bold md:text-4xl">
            {project.title}
          </h3>
          <p className="label-caps mt-4">{project.category ?? project.tag}</p>
          <p className="mt-6 text-sm leading-relaxed text-fg-muted md:text-base">
            {project.description}
          </p>
          <MetaGrid project={project} />
        </FadeIn>

        <FadeIn delay={0.08} className="lg:col-span-7">
          {cover && (
            <DeviceFrame src={cover} alt={project.title} variant="browser" priority />
          )}
        </FadeIn>

        {imgs[1] && (
          <FadeIn delay={0.1} className="lg:col-span-4 lg:pt-8">
            <DeviceFrame src={imgs[1].src} alt={imgs[1].alt} variant="iphone" />
          </FadeIn>
        )}

        <FadeIn delay={0.12} className="space-y-6 lg:col-span-8">
          <StoryBlock label="Problem" body={project.problem} />
          <StoryBlock label="Solution" body={project.solution} />
          <div className="grid gap-6 md:grid-cols-2">
            <StoryBlock label="Process" body={project.process} />
            <StoryBlock label="Outcome" body={project.outcome} />
          </div>
          <TechStack technologies={project.technologies} />
          <ProjectLinks project={project} />
        </FadeIn>

        {imgs[2] && (
          <FadeIn delay={0.14} className="lg:col-span-6">
            <DeviceFrame src={imgs[2].src} alt={imgs[2].alt} variant="ipad" />
          </FadeIn>
        )}
        {imgs[3] && (
          <FadeIn delay={0.16} className="lg:col-span-6">
            <DeviceFrame src={imgs[3].src} alt={imgs[3].alt} variant="macbook" />
          </FadeIn>
        )}
      </div>
    </div>
  );
}

function ProjectRoom({ project, index }: { project: Project; index: number }) {
  const layout = index % 4;
  const prefersReducedMotion = useReducedMotion();

  if (project.slug === "edunet") {
    return (
      <motion.article
        className="border-t border-border py-24 first:border-t-0 md:py-32"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <EdunetMobileShowcase project={project} index={index} />
      </motion.article>
    );
  }

  if (project.slug === "eventhub") {
    return (
      <motion.article
        className="border-t border-border py-24 first:border-t-0 md:py-32"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <EventHubShowcase project={project} index={index} />
      </motion.article>
    );
  }

  if (project.slug === "artisan-bakeries") {
    return (
      <motion.article
        className="border-t border-border py-24 first:border-t-0 md:py-32"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <LayoutArtisanScroll project={project} index={index} />
        <ExhibitionWall project={project} />
      </motion.article>
    );
  }

  return (
    <motion.article
      className="border-t border-border py-24 first:border-t-0 md:py-32"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {layout === 0 && <LayoutSplitLeft project={project} index={index} />}
      {layout === 1 && <LayoutSplitRight project={project} index={index} />}
      {layout === 2 && <LayoutCentered project={project} index={index} />}
      {layout === 3 && <LayoutMagazine project={project} index={index} />}
      <ExhibitionWall project={project} />
    </motion.article>
  );
}

export function ProjectRooms({ projects }: { projects: Project[] }) {
  return (
    <section
      id="projects"
      className="section-padding container-editorial relative z-10 scroll-mt-20"
    >
      <FadeIn>
        <p className="label-caps mb-6 text-cherry">03 — Projects</p>
        <h2 className="font-serif-display max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight">
          Featured work
        </h2>
        <p className="mt-6 max-w-xl text-fg-muted">
          Each project is a room in the exhibition — a full case study, not a
          thumbnail in a grid.
        </p>
      </FadeIn>

      <div className="mt-8">
        {projects.map((project, index) => (
          <ProjectRoom key={project.slug} project={project} index={index} />
        ))}
      </div>

      <FadeIn className="mt-8 border-t border-border pt-16 md:pt-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="label-caps mb-3 text-cherry">Archive</p>
            <p className="font-serif-display max-w-md text-2xl font-bold md:text-3xl">
              More case studies in the vault
            </p>
          </div>
          <Link
            href="/projects"
            className="label-caps rounded-full bg-cherry px-5 py-2.5 !text-cream shadow-[0_10px_24px_-12px_rgba(216,96,114,0.8)] transition-opacity hover:opacity-90"
          >
            View all projects →
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
