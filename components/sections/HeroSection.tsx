"use client";

import { siteConfig } from "@/content/site";
import { SectionShell } from "@/components/layout/SectionShell";
import { FadeIn } from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function HeroSection() {
  return (
    <SectionShell
      id="home"
      className="relative z-10 flex min-h-[100svh] flex-col justify-center !pb-24 !pt-28 md:!pt-32"
    >
      <div className="relative max-w-5xl">
        <FadeIn>
          <p className="label-caps mb-8 text-cherry">{siteConfig.availability}</p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="font-serif-display text-[clamp(2.75rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-tight">
            {siteConfig.fullName.toUpperCase()}
          </h1>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div className="mt-10 space-y-2 md:mt-12">
            {siteConfig.sublines.map((line) => (
              <p
                key={line}
                className="font-serif-display text-xl italic leading-snug text-fg-muted md:text-2xl lg:text-3xl"
              >
                {line}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.24}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-fg-muted md:text-base">
            {siteConfig.roles.join(" · ")}
          </p>
        </FadeIn>

        <FadeIn delay={0.32}>
          <div className="mt-12 flex flex-wrap items-center gap-4 md:gap-6">
            <MagneticButton
              href="#projects"
              className="label-caps border border-cherry bg-cherry px-6 py-3 !text-cream shadow-[0_12px_28px_-14px_rgba(216,96,114,0.85)] transition-opacity hover:opacity-90"
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              href="/projects"
              className="label-caps border border-border px-6 py-3 transition-colors hover:border-cherry hover:text-cherry"
            >
              View all projects
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="label-caps border border-border px-6 py-3 transition-colors hover:border-fg"
            >
              Contact Me
            </MagneticButton>
            <MagneticButton
              href="/resume.pdf"
              external
              className="label-caps border-b border-border pb-1 text-fg-muted transition-colors hover:border-fg hover:text-fg"
            >
              Resume ↓
            </MagneticButton>
          </div>
        </FadeIn>
      </div>

      {/* Hero-local measurement accent */}
      <div
        className="pointer-events-none absolute bottom-8 right-6 hidden text-[10px] uppercase tracking-[0.3em] text-fg-muted/50 md:block"
        aria-hidden="true"
      >
        01 - Entrance
      </div>
    </SectionShell>
  );
}
