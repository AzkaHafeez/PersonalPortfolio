"use client";

import { useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { CinematicScene } from "./CinematicScene";

/**
 * Cinematic intro landing.
 * Fixed overlay + spacer scrub - portfolio content sits AFTER
 * the spacer so when the scene dissolves, the hero is at top.
 */
export function ScrollIntro({ children }: { children: React.ReactNode }) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = !!prefersReducedMotion;
  // Once the scene has fully dissolved, unmount it instead of leaving a
  // fixed full-viewport layer with looping animations (starfield, film
  // grain, sphere float) running under the rest of the page forever.
  const [sceneDone, setSceneDone] = useState(false);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setSceneDone((prev) => {
      if (!prev && v >= 0.995) return true;
      if (prev && v < 0.98) return false;
      return prev;
    });
  });

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {!sceneDone && (
        <CinematicScene
          scrollProgress={scrollYProgress}
          reducedMotion={reducedMotion}
        />
      )}

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
