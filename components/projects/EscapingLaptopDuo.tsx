"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { EscapingLaptopFrame } from "@/components/exhibition/WebsiteScrollFrame";

interface EscapingLaptopDuoProps {
  left: string;
  right: string;
  leftAlt?: string;
  rightAlt?: string;
  title?: string;
  lead?: string;
  leftAspectRatio?: number;
  rightAspectRatio?: number;
}

/**
 * Two static escaping-MacBook pages side by side — mid case-study beat.
 */
export function EscapingLaptopDuo({
  left,
  right,
  leftAlt = "Full-page view",
  rightAlt = "Full-page view",
  title = "Full-page views",
  lead = "Tall page compositions escaping the laptop — static, no scroll scrub.",
  leftAspectRatio,
  rightAspectRatio,
}: EscapingLaptopDuoProps) {
  return (
    <section className="section-padding container-editorial !py-16 md:!py-24">
      <FadeIn className="mb-12 md:mb-16">
        <p className="label-caps text-cherry">Product pages</p>
        <h2 className="font-serif-display mt-3 text-3xl font-bold md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-sm text-fg-muted md:text-base">{lead}</p>
      </FadeIn>

      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
        <FadeIn>
          <EscapingLaptopFrame
            src={left}
            alt={leftAlt}
            className="max-w-none"
            aspectRatio={leftAspectRatio}
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <EscapingLaptopFrame
            src={right}
            alt={rightAlt}
            className="max-w-none"
            aspectRatio={rightAspectRatio}
          />
        </FadeIn>
      </div>
    </section>
  );
}
