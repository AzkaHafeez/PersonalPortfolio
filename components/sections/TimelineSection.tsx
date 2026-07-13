import type { TimelineEvent } from "@/lib/types";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

const typeLabels: Record<string, string> = {
  project: "Project",
  education: "Education",
  leadership: "Leadership",
  research: "Research",
  award: "Award",
};

export function TimelineSection({ events }: { events: TimelineEvent[] }) {
  return (
    <SectionShell id="timeline">
      <SectionLabel number="07" label="Timeline" />

      <FadeIn className="mt-8">
        <h2 className="font-serif-display text-3xl font-bold tracking-tight md:text-4xl">
          A coherent journey
        </h2>
      </FadeIn>

      <div className="relative mt-16">
        <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:left-[60px] md:block" />

        <div className="space-y-0">
          {events.map((event, index) => (
            <FadeIn key={`${event.year}-${event.title}`} delay={index * 0.05}>
              <div className="relative grid gap-4 border-t border-border py-8 md:grid-cols-[120px_100px_1fr] md:gap-8">
                <span className="font-serif-display text-2xl font-bold md:text-right">
                  {event.year}
                </span>
                <span className="label-caps hidden md:block">
                  {typeLabels[event.type] ?? event.type}
                </span>
                <div>
                  <h3 className="font-serif-display text-lg font-bold md:text-xl">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted">{event.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
