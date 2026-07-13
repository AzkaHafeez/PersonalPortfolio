"use client";

import { motion } from "framer-motion";

interface ProjectHeroImageProps {
  slug: string;
  title: string;
  coverImage?: string | null;
}

export function ProjectHeroImage({ slug, title, coverImage }: ProjectHeroImageProps) {
  if (coverImage) {
    return (
      <motion.div layoutId={`project-cover-${slug}`} className="h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      layoutId={`project-cover-${slug}`}
      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-lavender/40 via-bg-muted to-obsidian/10 p-8 dark:from-lavender/15 dark:via-bg-muted dark:to-obsidian"
    >
      <span className="label-caps text-cherry">Case study</span>
      <span className="font-serif-display max-w-lg text-center text-2xl font-bold italic text-obsidian dark:text-cream md:text-4xl">
        {title}
      </span>
    </motion.div>
  );
}

export function ProjectTitle({ slug, title }: { slug: string; title: string }) {
  return (
    <motion.h1
      layoutId={`project-title-${slug}`}
      className="font-serif-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-tight tracking-tight"
    >
      {title}
    </motion.h1>
  );
}
