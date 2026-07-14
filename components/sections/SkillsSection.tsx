"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SkillCategory } from "@/lib/types";
import { FadeIn } from "@/components/ui/FadeIn";

export function SkillsSection({ categories }: { categories: SkillCategory[] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="section-padding container-editorial relative z-10 scroll-mt-20"
    >
      <FadeIn>
        <p className="label-caps mb-6 text-cherry">05 — Skills</p>
        <h2 className="font-serif-display max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight">
          Tools of the craft
        </h2>
        <p className="mt-6 max-w-xl text-fg-muted">
          Editorial blocks by domain — the technologies I reach for when
          building.
        </p>
      </FadeIn>

      <div className="mt-20 grid gap-0 border-t border-border md:grid-cols-2">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            className="border-b border-border py-10 md:odd:pr-10 md:even:border-l md:even:pl-10"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h3 className="font-serif-display text-2xl font-bold md:text-3xl">
              {category.name}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">
              {category.items.join(" · ")}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
