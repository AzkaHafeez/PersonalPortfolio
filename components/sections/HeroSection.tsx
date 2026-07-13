import { aboutContent, siteConfig } from "@/content/site";
import { SectionShell } from "@/components/layout/SectionShell";
import { FadeIn } from "@/components/ui/FadeIn";

export function HeroSection() {
  return (
    <SectionShell id="hero" className="!pb-16 !pt-20 md:!pt-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <FadeIn>
            <p className="label-caps mb-6">{siteConfig.availability}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif-display text-balance text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight">
              {siteConfig.tagline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 space-y-1">
              {siteConfig.sublines.map((line) => (
                <p key={line} className="text-lg text-fg-muted md:text-xl">
                  {line}
                </p>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              {siteConfig.description}
            </p>
          </FadeIn>
        </div>

        <div className="lg:col-span-4">
          <FadeIn delay={0.2} className="space-y-8 border-t border-border pt-8 lg:border-t-0 lg:pt-0">
            <div>
              <p className="label-caps mb-2">Current role</p>
              <p className="text-sm md:text-base">{siteConfig.role}</p>
            </div>
            <div>
              <p className="label-caps mb-2">Focus</p>
              <p className="text-sm text-fg-muted md:text-base">{siteConfig.focus}</p>
            </div>
            <div>
              <p className="label-caps mb-2">Location</p>
              <p className="text-sm md:text-base">{siteConfig.location}</p>
            </div>
            <div>
              <p className="label-caps mb-2">Technologies</p>
              <p className="text-sm text-fg-muted md:text-base">
                {siteConfig.stack.join(" · ")}
              </p>
            </div>
            <div className="hidden lg:block">
              <p className="font-serif-display text-right text-lg italic text-fg-muted">
                &ldquo;{siteConfig.quote}&rdquo;
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionShell>
  );
}
