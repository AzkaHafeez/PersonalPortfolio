"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

interface BlueprintOverlayProps {
  scrollProgress: MotionValue<number>;
}

/**
 * Scroll-driven blueprint lines, measurement marks, and architectural grid
 * that fade in mid-intro and dissolve before the hero reveal.
 */
export function BlueprintOverlay({ scrollProgress }: BlueprintOverlayProps) {
  const linesOpacity = useTransform(
    scrollProgress,
    [0.15, 0.35, 0.55, 0.75],
    [0, 0.7, 0.85, 0]
  );
  const gridOpacity = useTransform(
    scrollProgress,
    [0.25, 0.45, 0.65, 0.85],
    [0, 0.35, 0.45, 0]
  );
  const marksOpacity = useTransform(
    scrollProgress,
    [0.2, 0.4, 0.6, 0.8],
    [0, 0.6, 0.7, 0]
  );

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(rgba(255,246,238,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,246,238,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ opacity: linesOpacity }}
      >
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="100"
          stroke="#fff6ee"
          strokeWidth="0.08"
          opacity="0.5"
        />
        <line
          x1="95"
          y1="0"
          x2="95"
          y2="100"
          stroke="#fff6ee"
          strokeWidth="0.08"
          opacity="0.5"
        />
        <line
          x1="0"
          y1="10"
          x2="100"
          y2="10"
          stroke="#fff6ee"
          strokeWidth="0.08"
          opacity="0.4"
        />
        <line
          x1="0"
          y1="90"
          x2="100"
          y2="90"
          stroke="#fff6ee"
          strokeWidth="0.08"
          opacity="0.4"
        />
        <line
          x1="20"
          y1="20"
          x2="80"
          y2="20"
          stroke="#d6dc82"
          strokeWidth="0.06"
          opacity="0.35"
          strokeDasharray="1 1.5"
        />
        <line
          x1="20"
          y1="80"
          x2="80"
          y2="80"
          stroke="#d6dc82"
          strokeWidth="0.06"
          opacity="0.35"
          strokeDasharray="1 1.5"
        />
        <line
          x1="20"
          y1="20"
          x2="20"
          y2="80"
          stroke="#c6c2f2"
          strokeWidth="0.06"
          opacity="0.3"
        />
        <line
          x1="80"
          y1="20"
          x2="80"
          y2="80"
          stroke="#c6c2f2"
          strokeWidth="0.06"
          opacity="0.3"
        />
        <circle
          cx="50"
          cy="50"
          r="18"
          fill="none"
          stroke="#fff6ee"
          strokeWidth="0.05"
          opacity="0.25"
        />
      </motion.svg>

      <motion.div
        className="absolute inset-0 font-sans text-[9px] tracking-[0.25em] text-cream/40 uppercase"
        style={{ opacity: marksOpacity }}
      >
        <span className="absolute left-[6%] top-[8%]">00</span>
        <span className="absolute right-[6%] top-[8%]">01</span>
        <span className="absolute bottom-[8%] left-[6%]">GRID // 64</span>
        <span className="absolute bottom-[8%] right-[6%]">SCALE 1:1</span>
        <span className="absolute left-[22%] top-[18%]">— ref</span>
        <span className="absolute right-[22%] bottom-[18%]">azka · studio</span>
      </motion.div>
    </div>
  );
}
