import type { SkillCategory } from "@/lib/types";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

export function SkillsSection({ categories }: { categories: SkillCategory[] }) {
  return (
    <SectionShell id="skills">
      <SectionLabel number="06" label="Skills" />

      <FadeIn className="mt-8">
        <h2 className="font-serif-display text-3xl font-bold tracking-tight md:text-4xl">
          Tools of the craft
        </h2>
        <p className="mt-4 max-w-2xl text-fg-muted">
          Organized by domain — no progress bars, just the technologies I work
          with daily.
        </p>
      </FadeIn>

      <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <FadeIn key={category.name} delay={index * 0.03}>
            <div className="border-t border-border pt-6">
              <h3 className="label-caps mb-4">{category.name}</h3>
              <p className="font-serif-display text-lg leading-relaxed md:text-xl">
                {category.items.join(" · ")}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}
