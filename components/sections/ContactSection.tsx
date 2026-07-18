"use client";

import { siteConfig } from "@/content/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-padding container-editorial relative z-10 scroll-mt-20 !pb-32"
    >
      <FadeIn>
        <p className="label-caps mb-6 text-cherry">06 - Contact</p>
      </FadeIn>

      <FadeIn delay={0.08}>
        <h2 className="font-serif-display max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight">
          Let&apos;s build something{" "}
          <em className="italic">meaningful.</em>
        </h2>
      </FadeIn>

      <FadeIn delay={0.14}>
        <p className="mt-10 max-w-lg text-fg-muted">{siteConfig.availability}</p>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-14 flex flex-wrap gap-4 md:gap-6">
        <MagneticButton
          href={`mailto:${siteConfig.email}`}
          className="label-caps border border-fg bg-fg px-6 py-3 text-cream transition-opacity hover:opacity-80"
        >
          Email
        </MagneticButton>
        <MagneticButton
          href={siteConfig.github}
          external
          className="label-caps border border-border px-6 py-3 transition-colors hover:border-fg"
        >
          GitHub
        </MagneticButton>
        <MagneticButton
          href={siteConfig.linkedin}
          external
          className="label-caps border border-border px-6 py-3 transition-colors hover:border-fg"
        >
          LinkedIn
        </MagneticButton>
        <MagneticButton
          href="/AzkaHafeez_Resume.pdf"
          external
          className="label-caps border border-border px-6 py-3 transition-colors hover:border-fg"
        >
          Resume
        </MagneticButton>
      </FadeIn>
    </section>
  );
}
