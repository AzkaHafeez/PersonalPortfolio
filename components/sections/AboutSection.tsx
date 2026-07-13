import { aboutContent } from "@/content/site";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

export function AboutSection() {
  return (
    <SectionShell id="about">
      <SectionLabel number="01" label="About" />

      <div className="mt-12 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FadeIn>
            <h2 className="font-serif-display text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {aboutContent.story}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-8 text-base leading-relaxed text-fg-muted md:text-lg">
              {aboutContent.secondary}
            </p>
          </FadeIn>
        </div>

        <div className="space-y-10 lg:col-span-5">
          <FadeIn delay={0.15}>
            <div>
              <p className="label-caps mb-4">Quick facts</p>
              <dl className="space-y-3">
                {aboutContent.quickFacts.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-4 border-b border-border pb-3">
                    <dt className="text-sm text-fg-muted">{fact.label}</dt>
                    <dd className="text-right text-sm font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <p className="label-caps mb-4">Current interests</p>
              <ul className="space-y-2">
                {aboutContent.interests.map((item) => (
                  <li key={item} className="text-sm text-fg-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div>
              <p className="label-caps mb-4">Learning</p>
              <ul className="space-y-2">
                {aboutContent.learning.map((item) => (
                  <li key={item} className="text-sm text-fg-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div>
              <p className="label-caps mb-4">Values</p>
              <ul className="space-y-2">
                {aboutContent.values.map((item) => (
                  <li key={item} className="text-sm text-fg-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={0.2} className="mt-20">
        <p className="label-caps mb-8">Journey</p>
        <div className="space-y-6">
          {aboutContent.journey.map((item) => (
            <div
              key={item.year}
              className="grid gap-2 border-t border-border pt-6 md:grid-cols-[120px_1fr]"
            >
              <span className="font-serif-display text-2xl font-bold">{item.year}</span>
              <p className="text-fg-muted">{item.event}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </SectionShell>
  );
}
