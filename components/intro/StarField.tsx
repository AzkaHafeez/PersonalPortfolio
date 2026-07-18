"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface StarFieldProps {
  reducedMotion: boolean;
}

/** Sparse monochromatic stars - barely twinkling */
export function StarField({ reducedMotion }: StarFieldProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => {
        // Deterministic positions - avoid hydration mismatch
        const seed = (i * 137.5) % 100;
        const seed2 = (i * 89.3) % 100;
        return {
          id: i,
          left: `${(seed * 0.9 + 5).toFixed(2)}%`,
          top: `${(seed2 * 0.55 + 2).toFixed(2)}%`,
          size: i % 5 === 0 ? 1.5 : 1,
          delay: (i % 8) * 0.7,
          duration: 4 + (i % 5),
          baseOpacity: 0.12 + (i % 4) * 0.05,
        };
      }),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-cream"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: star.baseOpacity }}
          animate={
            reducedMotion
              ? { opacity: star.baseOpacity }
              : {
                  opacity: [
                    star.baseOpacity,
                    star.baseOpacity + 0.15,
                    star.baseOpacity,
                  ],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
