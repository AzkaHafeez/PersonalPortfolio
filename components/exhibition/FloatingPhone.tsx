"use client";

import { memo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EDITORIAL } from "@/lib/motion";

export interface FloatingPhoneProps {
  src: string;
  alt: string;
  rotate?: number;
  floatDelay?: number;
  depth?: number;
  className?: string;
  priority?: boolean;
  parallaxX?: number;
  parallaxY?: number;
  /** Real screenshot aspect ratio (width / height); falls back to a
   * standard phone-screenshot ratio when the source isn't measured yet. */
  aspectRatio?: number;
}

export const FloatingPhone = memo(function FloatingPhone({
  src,
  alt,
  rotate = 0,
  floatDelay = 0,
  depth = 1,
  className = "w-[200px] md:w-[240px]",
  priority = false,
  parallaxX = 0,
  parallaxY = 0,
  aspectRatio = 9 / 16,
}: FloatingPhoneProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ zIndex: Math.round(depth * 10), transformStyle: "preserve-3d" }}
      animate={
        prefersReducedMotion
          ? { rotate, x: parallaxX, y: parallaxY, scale: depth }
          : {
              rotate,
              x: parallaxX,
              y: [parallaxY, parallaxY - 10, parallaxY],
              scale: depth,
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.4, ease: EASE_EDITORIAL }
          : {
              y: {
                duration: 4.5 + floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
              },
              rotate: { duration: 0.5, ease: EASE_EDITORIAL },
              x: { duration: 0.4, ease: EASE_EDITORIAL },
              scale: { duration: 0.5, ease: EASE_EDITORIAL },
            }
      }
    >
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(38,38,40,0.28), transparent 70%)",
        }}
        aria-hidden
      />

      <div
        className="relative overflow-hidden rounded-[2.4rem] border border-obsidian/20 bg-obsidian p-[10px] shadow-[0_25px_50px_-12px_rgba(38,38,40,0.35)] dark:border-cream/15"
        style={{ aspectRatio }}
      >
        <span
          className="absolute -left-[2px] top-[18%] h-8 w-[2px] rounded-l-sm bg-obsidian/80"
          aria-hidden
        />
        <span
          className="absolute -left-[2px] top-[28%] h-12 w-[2px] rounded-l-sm bg-obsidian/80"
          aria-hidden
        />
        <span
          className="absolute -right-[2px] top-[24%] h-16 w-[2px] rounded-r-sm bg-obsidian/80"
          aria-hidden
        />

        <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-bg-muted">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 200px, 280px"
            loading={priority ? undefined : "lazy"}
            priority={priority}
          />
          <div
            className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-obsidian"
            aria-hidden
          />
          <div
            className="absolute bottom-2 left-1/2 z-20 h-[3px] w-[28%] -translate-x-1/2 rounded-full bg-cream/40"
            aria-hidden
          />
          {!prefersReducedMotion && (
            <div
              className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[1.85rem]"
              aria-hidden
            >
              <div className="absolute inset-y-0 w-1/2 animate-glass-beam -skew-x-12 bg-gradient-to-r from-transparent via-cream/25 to-transparent opacity-80" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});
