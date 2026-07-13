"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

interface AbstractSphereProps {
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
}

/**
 * Abstract matte sphere on Obsidian with Cream / Lavender light.
 */
export function AbstractSphere({
  scrollProgress,
  reducedMotion,
}: AbstractSphereProps) {
  const scale = useTransform(scrollProgress, [0, 0.4, 0.75, 1], [1, 1.15, 1.4, 1.55]);

  return (
    <motion.div
      className="absolute -bottom-[35%] -left-[25%] h-[130vw] w-[130vw] max-h-[1400px] max-w-[1400px] will-change-transform md:-bottom-[40%] md:-left-[20%] md:h-[110vw] md:w-[110vw] lg:-bottom-[45%] lg:left-[-10%] lg:h-[min(90vw,1100px)] lg:w-[min(90vw,1100px)]"
      style={{ scale }}
      aria-hidden="true"
    >
      <motion.div
        className="relative h-full w-full rounded-full"
        style={{
          background: `
            radial-gradient(
              circle at 32% 28%,
              color-mix(in srgb, #c6c2f2 16%, #3d3d42) 0%,
              color-mix(in srgb, #262628 70%, #4a4a50) 28%,
              #2a2a2e 50%,
              #262628 72%,
              #1c1c1e 100%
            )
          `,
          boxShadow: `
            inset -50px -40px 90px rgba(0, 0, 0, 0.45),
            inset 24px 18px 50px color-mix(in srgb, #c6c2f2 8%, transparent),
            0 0 80px color-mix(in srgb, #c6c2f2 6%, transparent)
          `,
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -6, 0],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        {/* Cream highlight from upper-left */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 30% 25%, color-mix(in srgb, #fff6ee 18%, transparent) 0%, transparent 70%)",
          }}
        />
        {/* Soft cherry rim whisper */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 40% 35% at 75% 70%, color-mix(in srgb, #d86072 12%, transparent) 0%, transparent 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-[0.14] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
