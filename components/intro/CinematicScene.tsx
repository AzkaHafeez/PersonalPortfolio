"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { siteConfig } from "@/content/site";
import { AbstractSphere } from "./AbstractSphere";
import { StarField } from "./StarField";
import { FilmGrain } from "./FilmGrain";
import { CornerAnnotations } from "./CornerAnnotations";
import { BlueprintOverlay } from "./BlueprintOverlay";

interface CinematicSceneProps {
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
}

/**
 * Themed cinematic landing - Obsidian / Cream / Lavender / Lime / Cherry.
 * Expanded with blueprint lines, grid fade, and soft zoom toward the hero.
 */
export function CinematicScene({
  scrollProgress,
  reducedMotion,
}: CinematicSceneProps) {
  const sceneOpacity = useTransform(
    scrollProgress,
    [0, 0.45, 0.7, 0.88, 1],
    [1, 1, 0.75, 0.25, 0]
  );

  const sceneScale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.02, 1.08]);

  const nameOpacity = useTransform(
    scrollProgress,
    [0, 0.3, 0.55, 0.78],
    [1, 1, 0.5, 0]
  );

  const nameY = useTransform(scrollProgress, [0, 0.4, 1], ["0vh", "-3vh", "-14vh"]);
  const nameScale = useTransform(scrollProgress, [0, 0.5, 1], [1, 0.96, 0.86]);
  const nameLetterSpacing = useTransform(
    scrollProgress,
    [0, 0.4, 0.7],
    ["-0.02em", "0.04em", "0.08em"]
  );

  const annotationsOpacity = useTransform(
    scrollProgress,
    [0, 0.25, 0.5],
    [1, 0.55, 0]
  );

  const veilOpacity = useTransform(scrollProgress, [0.5, 0.78, 1], [0, 0.35, 0.7]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ opacity: sceneOpacity, scale: reducedMotion ? 1 : sceneScale }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-obsidian" />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 85% 65% at 18% 12%,
              color-mix(in srgb, #c6c2f2 14%, #262628) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 50% 40% at 85% 75%,
              color-mix(in srgb, #d86072 6%, #262628) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 40% 30% at 40% 90%,
              color-mix(in srgb, #d6dc82 5%, transparent) 0%,
              transparent 50%
            )
          `,
        }}
      />

      <div
        className="absolute left-0 top-0 h-full w-px opacity-20"
        style={{
          background: "linear-gradient(to bottom, transparent, #d6dc82, transparent)",
        }}
      />

      <AbstractSphere
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
      />

      <StarField reducedMotion={reducedMotion} />

      {!reducedMotion && <BlueprintOverlay scrollProgress={scrollProgress} />}

      <FilmGrain reducedMotion={reducedMotion} />

      <motion.div style={{ opacity: annotationsOpacity }}>
        <CornerAnnotations />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1
          className="font-serif-display text-[clamp(3rem,12vw,9rem)] font-bold tracking-tight text-cream"
          style={{
            opacity: nameOpacity,
            y: nameY,
            scale: nameScale,
            letterSpacing: nameLetterSpacing,
          }}
        >
          {siteConfig.introName}
        </motion.h1>
      </div>

      <motion.div
        className="absolute inset-0 bg-obsidian"
        style={{ opacity: veilOpacity }}
      />
    </motion.div>
  );
}
