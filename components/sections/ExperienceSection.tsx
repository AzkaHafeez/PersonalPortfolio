import type { ExperienceEntry } from "@/lib/types";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

export function ExperienceSection({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <SectionShell id="experience">
      <SectionLabel number="03" label="Experience" />

      <FadeIn className="mt-8">
        <h2 className="font-serif-display text-3xl font-bold tracking-tight md:text-4xl">
          Building products, not just writing code
        </h2>
      </FadeIn>

      <div className="mt-16 space-y-0">
        {entries.map((entry, index) => (
          <FadeIn key={entry.id} delay={index * 0.05}>
            <article className="grid gap-6 border-t border-border py-12 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <p className="label-caps">{entry.duration}</p>
                <h3 className="font-serif-display mt-2 text-2xl font-bold md:text-3xl">
                  {entry.company}
                </h3>
                <p className="mt-1 text-sm text-fg-muted">{entry.role}</p>
              </div>

              <div className="md:col-span-6">
                <p className="text-base leading-relaxed text-fg-muted">
                  {entry.summary}
                </p>
                <ul className="mt-6 space-y-2">
                  {entry.contributions.map((c) => (
                    <li key={c} className="text-sm text-fg-muted">
                      — {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-3">
                <p className="label-caps mb-3">Technologies</p>
                <p className="text-sm text-fg-muted">
                  {entry.technologies.join(" · ")}
                </p>
                <div className="mt-4 flex gap-4">
                  {entry.links?.live && (
                    <a
                      href={entry.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-caps border-b border-border pb-0.5 hover:border-fg"
                    >
                      Live ↗
                    </a>
                  )}
                  {entry.links?.github && (
                    <a
                      href={entry.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-caps border-b border-border pb-0.5 hover:border-fg"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}
