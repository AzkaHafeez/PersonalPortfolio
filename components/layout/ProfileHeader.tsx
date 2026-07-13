import { aboutContent, siteConfig } from "@/content/site";
import { FadeIn } from "@/components/ui/FadeIn";

export function ProfileHeader({
  projectCount,
  experienceCount,
}: {
  projectCount: number;
  experienceCount: number;
}) {
  return (
    <section className="container-editorial px-6 pb-10 pt-10 md:px-10 md:pb-14 md:pt-14 lg:px-16 xl:px-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Avatar + identity */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start lg:col-span-7">
          <FadeIn>
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-obsidian ring-2 ring-lavender ring-offset-2 ring-offset-bg md:h-24 md:w-24">
              {siteConfig.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={siteConfig.portrait}
                  alt={siteConfig.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-obsidian">
                  <span className="font-serif-display text-2xl font-bold text-cream md:text-3xl">
                    A
                  </span>
                </div>
              )}
            </div>
          </FadeIn>

          <div className="min-w-0 flex-1">
            <FadeIn delay={0.05}>
              <h1 className="font-serif-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight tracking-tight">
                {siteConfig.fullName}
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg-muted md:text-base">
                {siteConfig.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted">
                <span className="text-cherry">{siteConfig.handle}</span>
                <span>
                  <strong className="font-medium text-fg">
                    {projectCount}
                  </strong>{" "}
                  Projects
                </span>
                <span>
                  <strong className="font-medium text-fg">
                    {experienceCount}
                  </strong>{" "}
                  Roles
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-4 text-xs text-fg-muted md:text-sm">
                {siteConfig.role} · {siteConfig.location} · {siteConfig.availability}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Pull quote */}
        <FadeIn
          delay={0.15}
          className="flex items-start justify-end lg:col-span-5"
        >
          <blockquote className="max-w-sm text-right">
            <p className="font-serif-display text-lg italic leading-relaxed text-fg-muted md:text-xl">
              &ldquo;{siteConfig.quote}&rdquo;
            </p>
          </blockquote>
        </FadeIn>
      </div>

      {/* Tagline strip */}
      <FadeIn delay={0.25} className="mt-10 border-t border-border pt-8">
        <p className="font-serif-display text-xl font-bold md:text-2xl">
          {siteConfig.tagline}
        </p>
        <p className="mt-2 text-sm text-fg-muted">
          {aboutContent.interests.slice(0, 2).join(" · ")}
        </p>
      </FadeIn>
    </section>
  );
}
