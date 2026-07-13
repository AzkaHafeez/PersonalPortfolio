"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { siteConfig } from "@/content/site";
import { AbstractSphere } from "./AbstractSphere";
import { StarField } from "./StarField";
import { FilmGrain } from "./FilmGrain";
import { CornerAnnotations } from "./CornerAnnotations";

interface CinematicSceneProps {
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
}

/**
 * Themed cinematic landing — Obsidian / Cream / Lavender / Lime / Cherry.
 */
export function CinematicScene({
  scrollProgress,
  reducedMotion,
}: CinematicSceneProps) {
  const sceneOpacity = useTransform(
    scrollProgress,
    [0, 0.4, 0.7, 0.9, 1],
    [1, 1, 0.7, 0.2, 0]
  );

  const nameOpacity = useTransform(
    scrollProgress,
    [0, 0.35, 0.6, 0.85],
    [1, 1, 0.45, 0]
  );

  const nameY = useTransform(scrollProgress, [0, 0.4, 1], ["0vh", "-2vh", "-12vh"]);
  const nameScale = useTransform(scrollProgress, [0, 1], [1, 0.88]);

  const annotationsOpacity = useTransform(
    scrollProgress,
    [0, 0.3, 0.55],
    [1, 0.6, 0]
  );

  const veilOpacity = useTransform(scrollProgress, [0.35, 0.75, 1], [0, 0.4, 0.8]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ opacity: sceneOpacity }}
      aria-hidden="true"
    >
      {/* Obsidian base */}
      <div className="absolute inset-0 bg-obsidian" />

      {/* Lavender atmosphere + soft cream edge */}
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

      {/* Thin lime accent edge — whisper only */}
      <div
        className="absolute left-0 top-0 h-full w-px opacity-20"
        style={{ background: "linear-gradient(to bottom, transparent, #d6dc82, transparent)" }}
      />

      <AbstractSphere
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
      />

      <StarField reducedMotion={reducedMotion} />

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
          }}
        >
          {siteConfig.introName}
        </motion.h1>
      </div>

      {/* Veil → Obsidian (not pure black) before reveal */}
      <motion.div
        className="absolute inset-0 bg-obsidian"
        style={{ opacity: veilOpacity }}
      />
    </motion.div>
  );
}
