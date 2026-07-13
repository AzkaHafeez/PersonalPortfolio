import { siteConfig } from "@/content/site";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

export function ContactSection() {
  return (
    <SectionShell id="contact" className="!pb-32">
      <SectionLabel number="08" label="Contact" />

      <FadeIn className="mt-12">
        <h2 className="font-serif-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight tracking-tight">
          Let&apos;s build
          <br />
          <em className="italic">something.</em>
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-10">
        <p className="text-fg-muted">{siteConfig.availability}</p>
      </FadeIn>

      <FadeIn delay={0.15} className="mt-12">
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-serif-display text-2xl underline decoration-border underline-offset-8 transition-colors hover:decoration-fg md:text-3xl"
        >
          {siteConfig.email}
        </a>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-12 flex flex-wrap gap-8">
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps border-b border-border pb-1 transition-colors hover:border-fg"
        >
          GitHub ↗
        </a>
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps border-b border-border pb-1 transition-colors hover:border-fg"
        >
          LinkedIn ↗
        </a>
        <a
          href="/resume.pdf"
          className="label-caps border-b border-border pb-1 transition-colors hover:border-fg"
        >
          Resume ↓
        </a>
      </FadeIn>
    </SectionShell>
  );
}
