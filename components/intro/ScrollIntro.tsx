"use client";

import { useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
import { CinematicScene } from "./CinematicScene";

/**
 * Cinematic intro landing.
 * Fixed overlay + spacer-only scrub — portfolio content sits AFTER
 * the spacer so when the scene dissolves, the profile header is at top.
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

      {/* Scroll scrub distance — no content underneath */}
      <div
        ref={spacerRef}
        className="h-[120vh] md:h-[140vh]"
        aria-hidden="true"
      />

      {/* Portfolio — lands at top when intro ends */}
      {children}
    </>
  );
}
