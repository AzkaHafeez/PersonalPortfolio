"use client";

import { aboutContent, siteConfig } from "@/content/site";
import { SectionShell } from "@/components/layout/SectionShell";
import { FadeIn } from "@/components/ui/FadeIn";

export function AboutSection() {
  return (
    <SectionShell id="about" className="relative z-10">
      <FadeIn>
        <p className="label-caps mb-6 text-cherry">02 — About</p>
      </FadeIn>

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <FadeIn>
            <h2 className="font-serif-display text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.9] tracking-tight">
              {aboutContent.headline}
            </h2>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="mt-12 font-serif-display text-2xl leading-snug md:text-3xl lg:text-4xl">
              {aboutContent.lead}
            </p>
          </FadeIn>

          <FadeIn delay={0.14}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              {aboutContent.story}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-fg-muted md:text-base">
              {aboutContent.secondary}
            </p>
          </FadeIn>

          <FadeIn delay={0.26}>
            <div className="mt-16 space-y-6 border-t border-border pt-10">
              {aboutContent.focusAreas.map((area, i) => (
                <div
                  key={area.label}
                  className="grid items-baseline gap-2 md:grid-cols-[140px_1fr]"
                >
                  <span
                    className={`font-serif-display font-bold ${
                      i === 0 ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    {area.label}
                  </span>
                  <span className="text-sm text-fg-muted md:text-base">
                    {area.detail}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <aside className="space-y-12 lg:col-span-4 lg:pt-24">
          <FadeIn delay={0.15}>
            <div className="relative flex aspect-[4/5] max-w-xs items-end justify-start overflow-hidden border border-border bg-bg-muted p-6">
              {siteConfig.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={siteConfig.portrait}
                  alt={siteConfig.fullName}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="font-serif-display text-[6rem] font-bold leading-none text-fg/10">
                  A
                </span>
              )}
              <div className="relative z-10">
                <p className="label-caps">Portrait</p>
                <p className="mt-1 font-serif-display text-lg">{siteConfig.fullName}</p>
              </div>
              {/* Blueprint corner marks */}
              <span
                className="absolute left-2 top-2 h-3 w-3 border-l border-t border-fg/30"
                aria-hidden
              />
              <span
                className="absolute right-2 top-2 h-3 w-3 border-r border-t border-fg/30"
                aria-hidden
              />
              <span
                className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-fg/30"
                aria-hidden
              />
              <span
                className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-fg/30"
                aria-hidden
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-4">
              <p className="label-caps">Annotations</p>
              {aboutContent.annotations.map((a) => (
                <p
                  key={a.id}
                  className="border-l border-lavender/60 pl-4 font-serif-display text-sm italic text-fg-muted"
                >
                  {a.text}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <dl className="space-y-3">
              {aboutContent.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex justify-between gap-4 border-b border-border pb-3"
                >
                  <dt className="label-caps">{fact.label}</dt>
                  <dd className="text-right text-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </aside>
      </div>

      <FadeIn delay={0.2} className="mt-24">
        <p className="label-caps mb-8">Timeline fragments</p>
        <div className="grid gap-8 md:grid-cols-3">
          {aboutContent.journey.map((item) => (
            <div key={item.year} className="border-t border-border pt-6">
              <span className="font-serif-display text-3xl font-bold">{item.year}</span>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.event}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </SectionShell>
  );
}
