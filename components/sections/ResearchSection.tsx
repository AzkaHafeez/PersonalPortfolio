import type { ResearchItem } from "@/lib/types";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

export function ResearchSection({ items }: { items: ResearchItem[] }) {
  return (
    <SectionShell id="research">
      <SectionLabel number="04" label="Research" />

      <FadeIn className="mt-8">
        <h2 className="font-serif-display text-3xl font-bold tracking-tight md:text-4xl">
          Experiments & ongoing work
        </h2>
        <p className="mt-4 max-w-2xl text-fg-muted">
          Things I&apos;m exploring — AI systems, offline networks, editorial
          interfaces, and open ideas.
        </p>
      </FadeIn>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {items.map((item, index) => (
          <FadeIn key={item.id} delay={index * 0.05}>
            <article className="border-t border-border pt-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="label-caps">{item.status}</span>
              </div>
              <h3 className="font-serif-display text-xl font-bold md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-xs text-fg-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}
