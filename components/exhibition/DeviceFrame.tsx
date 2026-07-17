"use client";

import { memo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EDITORIAL } from "@/lib/motion";

type FrameVariant = "browser" | "macbook" | "iphone" | "ipad";

interface DeviceFrameProps {
  src: string;
  alt: string;
  variant?: FrameVariant;
  className?: string;
  priority?: boolean;
  /** Real screenshot aspect ratio (width / height) — pass through from
   * `project.imageDimensions[src]` so the frame fits the actual image
   * instead of an assumed device shape. Falls back to a sane default
   * per variant when the source dimensions aren't known yet. */
  aspectRatio?: number;
  /** object-position for the inner image; defaults to variant-appropriate anchor. */
  objectPosition?: string;
}

const variantStyles: Record<
  FrameVariant,
  { shell: string; screen: string; defaultAspect: number; objectPosition: string }
> = {
  browser: {
    shell: "rounded-t-md border border-border bg-fg/5 shadow-lg",
    screen: "rounded-b-sm",
    defaultAspect: 16 / 10,
    objectPosition: "top",
  },
  macbook: {
    shell: "rounded-lg border border-border bg-obsidian/90 p-2 shadow-xl md:p-3",
    screen: "rounded-sm",
    defaultAspect: 16 / 10,
    objectPosition: "top",
  },
  iphone: {
    shell:
      "mx-auto max-w-[220px] rounded-[1.75rem] border border-border bg-obsidian p-2 shadow-xl",
    screen: "rounded-[1.35rem]",
    // Real phone screenshots in this project run ~9/16, not the taller
    // notched-iPhone ~9/19.5 the old default assumed — that mismatch is
    // what cropped the left/right edges off every mobile screenshot.
    defaultAspect: 9 / 16,
    objectPosition: "top",
  },
  ipad: {
    shell: "rounded-2xl border border-border bg-obsidian/90 p-2 shadow-xl md:p-3",
    screen: "rounded-lg",
    defaultAspect: 3 / 2,
    objectPosition: "top",
  },
};

export const DeviceFrame = memo(function DeviceFrame({
  src,
  alt,
  variant = "browser",
  className = "",
  priority = false,
  aspectRatio,
  objectPosition,
}: DeviceFrameProps) {
  const prefersReducedMotion = useReducedMotion();
  const styles = variantStyles[variant];
  const aspect = aspectRatio && aspectRatio > 0 ? aspectRatio : styles.defaultAspect;

  return (
    <motion.div
      className={`${styles.shell} ${className}`}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
      style={{ transformPerspective: 800 }}
    >
      {variant === "browser" && (
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-cherry/70" />
          <span className="h-2 w-2 rounded-full bg-lime/70" />
          <span className="h-2 w-2 rounded-full bg-lavender/70" />
          <span className="ml-3 h-5 flex-1 rounded-sm bg-bg-muted/80" />
        </div>
      )}
      <div
        className={`relative overflow-hidden bg-bg-muted ${styles.screen}`}
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectPosition: objectPosition ?? styles.objectPosition }}
          sizes="(max-width: 768px) 100vw, 50vw"
          loading={priority ? undefined : "lazy"}
          priority={priority}
        />
      </div>
      {variant === "macbook" && (
        <div className="mx-auto mt-1 h-1.5 w-[30%] rounded-b-sm bg-fg/20" />
      )}
    </motion.div>
  );
});
