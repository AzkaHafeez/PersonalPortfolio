"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";
import { FadeIn } from "@/components/ui/FadeIn";
import { DeviceFrame } from "@/components/exhibition/DeviceFrame";

const SURFACES = [
  {
    role: "Student",
    body: "Browse societies, apply with join codes, RSVP to events, and join discussions without leaving campus flow.",
  },
  {
    role: "Handler",
    body: "Manage society events, memberships, and assets from a role-aware dashboard built for day-of coordination.",
  },
  {
    role: "Admin",
    body: "Approve handlers, monitor platform health, and keep oversight clear without cluttering student views.",
  },
] as const;

const CAPABILITIES = [
  {
    title: "Society & membership management",
    body: "Discover societies, request access, and maintain structured memberships for handlers and members.",
  },
  {
    title: "Event creation & RSVP flows",
    body: "Publish campus events, capture RSVPs, and keep attendance intent visible to organizers.",
  },
  {
    title: "Role-aware JWT dashboards",
    body: "Student, handler, and admin surfaces share one system — permissions stay obvious in the UI.",
  },
  {
    title: "Discussions & engagement",
    body: "Threaded conversation and feedback keep societies active between events.",
  },
  {
    title: "Admin oversight",
    body: "Central visibility into handlers, societies, and platform statistics for trustworthy operations.",
  },
] as const;

const SCREEN_CAPTIONS = [
  {
    label: "Society dashboard",
    purpose: "Home base for campus societies — overview, presence, and next actions.",
    variant: "macbook" as const,
  },
  {
    label: "Memberships",
    purpose: "Join codes, approvals, and member lists without spreadsheet chaos.",
    variant: "ipad" as const,
  },
  {
    label: "Events & RSVP",
    purpose: "Create events and capture student intent on the go.",
    variant: "iphone" as const,
  },
  {
    label: "Admin panel",
    purpose: "Handlers, stats, and platform control in one oversight surface.",
    variant: "browser" as const,
  },
] as const;

function padIndex(n: number) {
  return String(n).padStart(2, "0");
}

function StoryBlock({ label, body }: { label: string; body?: string }) {
  if (!body) return null;
  return (
    <div className="border-t border-border pt-6">
      <p className="label-caps mb-3">{label}</p>
      <p className="text-sm leading-relaxed text-fg-muted md:text-base">{body}</p>
    </div>
  );
}

interface EventHubShowcaseProps {
  project: Project;
  index: number;
}

export function EventHubShowcase({ project, index }: EventHubShowcaseProps) {
  const images = project.images ?? [];

  return (
    <div>
      {/* Editorial opening */}
      <FadeIn>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="font-serif-display text-5xl font-bold text-fg/15 md:text-7xl">
              {padIndex(index + 1)}
            </p>
            <h3 className="font-serif-display mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
              {project.description}
            </p>

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

            <div className="mt-6">
              <p className="label-caps mb-3">Tech Stack</p>
              <p className="text-sm text-fg-muted">
                {project.technologies.join(" · ")}
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <StoryBlock label="Problem" body={project.problem} />
              <StoryBlock label="Solution" body={project.solution} />
              <StoryBlock label="Process" body={project.process} />
              <StoryBlock label="Outcome" body={project.outcome} />
            </div>

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
          </div>

          <div className="lg:col-span-6 lg:pt-16">
            <p className="label-caps mb-8">Role surfaces</p>
            <ul className="space-y-0">
              {SURFACES.map((s) => (
                <li
                  key={s.role}
                  className="border-t border-border py-6 first:border-t-0 first:pt-0"
                >
                  <h4 className="font-serif-display text-xl font-bold md:text-2xl">
                    {s.role}
                  </h4>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted md:text-base">
                    {s.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>

      {/* Capabilities */}
      <FadeIn className="mt-24 md:mt-32">
        <p className="label-caps mb-8">Platform capabilities</p>
        <div className="grid gap-0 border-t border-border md:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <div
              key={c.title}
              className="border-b border-border py-8 md:odd:pr-10 md:even:border-l md:even:pl-10"
            >
              <h4 className="font-serif-display text-xl font-bold md:text-2xl">
                {c.title}
              </h4>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-muted md:text-base">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Exhibition wall climax */}
      <FadeIn className="mt-28 md:mt-36">
        <p className="label-caps mb-4">Exhibition Wall</p>
        <h4 className="font-serif-display max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-tight">
          One campus. Three roles. Full event lifecycle.
        </h4>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
          From discovery to RSVP to admin oversight — EventHub keeps society
          operations in one cohesive interface so students, handlers, and admins
          never lose the thread of campus life.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Primary device board */}
          <div className="space-y-10 lg:col-span-8">
            {images[0] && (
              <figure>
                <DeviceFrame
                  src={images[0].src}
                  alt={images[0].alt}
                  variant={SCREEN_CAPTIONS[0].variant}
                  priority
                />
                <figcaption className="mt-4 border-t border-border pt-4">
                  <p className="label-caps">{SCREEN_CAPTIONS[0].label}</p>
                  <p className="mt-2 text-sm text-fg-muted">
                    {SCREEN_CAPTIONS[0].purpose}
                  </p>
                </figcaption>
              </figure>
            )}

            <div className="grid gap-10 sm:grid-cols-2">
              {images[1] && (
                <figure>
                  <DeviceFrame
                    src={images[1].src}
                    alt={images[1].alt}
                    variant={SCREEN_CAPTIONS[1].variant}
                  />
                  <figcaption className="mt-4 border-t border-border pt-4">
                    <p className="label-caps">{SCREEN_CAPTIONS[1].label}</p>
                    <p className="mt-2 text-sm text-fg-muted">
                      {SCREEN_CAPTIONS[1].purpose}
                    </p>
                  </figcaption>
                </figure>
              )}
              {images[2] && (
                <figure className="sm:pt-12">
                  <div className="mx-auto max-w-[200px]">
                    <DeviceFrame
                      src={images[2].src}
                      alt={images[2].alt}
                      variant={SCREEN_CAPTIONS[2].variant}
                    />
                  </div>
                  <figcaption className="mt-4 border-t border-border pt-4">
                    <p className="label-caps">{SCREEN_CAPTIONS[2].label}</p>
                    <p className="mt-2 text-sm text-fg-muted">
                      {SCREEN_CAPTIONS[2].purpose}
                    </p>
                  </figcaption>
                </figure>
              )}
            </div>

            {images[3] && (
              <figure>
                <DeviceFrame
                  src={images[3].src}
                  alt={images[3].alt}
                  variant={SCREEN_CAPTIONS[3].variant}
                />
                <figcaption className="mt-4 border-t border-border pt-4">
                  <p className="label-caps">{SCREEN_CAPTIONS[3].label}</p>
                  <p className="mt-2 text-sm text-fg-muted">
                    {SCREEN_CAPTIONS[3].purpose}
                  </p>
                </figcaption>
              </figure>
            )}
          </div>

          {/* Narrative sidebar */}
          <aside className="space-y-10 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border bg-bg-muted/50 p-6 md:p-8">
              <p className="label-caps mb-4">Lifecycle</p>
              <ol className="space-y-5">
                {[
                  "Discover a society",
                  "Join with a code",
                  "RSVP to an event",
                  "Discuss & leave feedback",
                  "Handlers & admins keep order",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-serif-display text-lg font-bold text-fg/30">
                      {padIndex(i + 1)}
                    </span>
                    <span className="text-sm leading-relaxed text-fg-muted md:text-base">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="label-caps mb-3">Collaboration</p>
              <p className="text-sm leading-relaxed text-fg-muted md:text-base">
                Frontend by Azka Hafeez and Saneha Akhtar. Backend by Sohail.
                Built as a university team project with Django REST, SimpleJWT,
                and role-aware JavaScript dashboards.
              </p>
            </div>

            <div>
              <p className="label-caps mb-3">Stack on the wall</p>
              <p className="text-sm leading-relaxed text-fg-muted">
                {project.technologies.join(" · ")}
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-6">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-caps border-b border-fg pb-1 self-start transition-opacity hover:opacity-60"
                >
                  Open live demo ↗
                </a>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="label-caps border-b border-border pb-1 self-start text-fg-muted transition-colors hover:border-fg hover:text-fg"
              >
                Read full case study
              </Link>
            </div>
          </aside>
        </div>
      </FadeIn>
    </div>
  );
}
