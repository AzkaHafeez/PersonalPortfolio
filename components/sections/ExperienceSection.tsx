"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ExperienceEntry } from "@/lib/types";
import { FadeIn } from "@/components/ui/FadeIn";
import { EASE_EDITORIAL, revealViewport } from "@/lib/motion";

function TimelineMilestone({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="relative grid gap-6 pl-10 md:grid-cols-12 md:gap-8 md:pl-16"
      initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={revealViewport}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: EASE_EDITORIAL,
      }}
    >
      <span
        className="absolute left-[-5px] top-2 h-3 w-3 rounded-full border-2 border-fg bg-bg md:left-[-1px]"
        aria-hidden
      />

      <div className="md:col-span-4">
        <p className="label-caps">{entry.duration}</p>
        <h3 className="font-serif-display mt-2 text-3xl font-bold md:text-4xl">
          {entry.company}
        </h3>
        <p className="mt-2 text-base text-fg-muted md:text-lg">{entry.role}</p>
      </div>

      <div className="md:col-span-5">
        <p className="text-base leading-relaxed text-fg-muted">{entry.summary}</p>
        <ul className="mt-6 space-y-2">
          {entry.contributions.map((c) => (
            <li key={c} className="text-sm text-fg-muted">
              - {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-3">
        <p className="label-caps mb-3">Focus</p>
        <p className="text-sm text-fg-muted">{entry.technologies.join(" · ")}</p>
      </div>
    </motion.article>
  );
}

export function ExperienceSection({ entries }: { entries: ExperienceEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="section-padding container-editorial relative z-10 scroll-mt-20"
    >
      <FadeIn>
        <p className="label-caps mb-6 text-cherry">04 - Experience</p>
        <h2 className="font-serif-display max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight">
          Path through the field
        </h2>
        <p className="mt-6 max-w-xl text-fg-muted">
          Research, product, leadership, and craft - milestones that shaped how
          I build.
        </p>
      </FadeIn>

      <div ref={ref} className="relative mt-20">
        <div
          className="absolute bottom-0 left-[6px] top-0 w-px bg-border md:left-[11px]"
          aria-hidden
        />
        <motion.div
          className="absolute left-[6px] top-0 w-px origin-top bg-fg md:left-[11px]"
          style={{
            scaleY: prefersReducedMotion ? 1 : lineScale,
            height: "100%",
          }}
          aria-hidden
        />

        <div className="space-y-16 md:space-y-24">
          {entries.map((entry, index) => (
            <TimelineMilestone key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
