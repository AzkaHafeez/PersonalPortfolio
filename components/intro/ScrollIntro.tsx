"use client";

import { useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
import { CinematicScene } from "./CinematicScene";

/**
 * Cinematic intro landing.
 * Fixed overlay + spacer scrub — portfolio content sits AFTER
 * the spacer so when the scene dissolves, the hero is at top.
 */
export function ScrollIntro({ children }: { children: React.ReactNode }) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = !!prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end start"],
  });

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      <CinematicScene
        scrollProgress={scrollYProgress}
        reducedMotion={reducedMotion}
      />

      {/* Extended scrub for blueprint → grid → zoom → dissolve */}
      <div
        ref={spacerRef}
        className="h-[150vh] md:h-[170vh]"
        aria-hidden="true"
      />

      {children}
    </>
  );
}
