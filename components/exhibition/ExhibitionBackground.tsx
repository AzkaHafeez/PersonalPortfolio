"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function SeededParticles({ count }: { count: number }) {
  const particles = useMemo(() => {
    const items: { id: number; x: number; y: number; size: number; delay: number }[] =
      [];
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        x: rand() * 100,
        y: rand() * 100,
        size: 1 + rand() * 2,
        delay: rand() * 6,
      });
    }
    return items;
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-obsidian/20 dark:bg-cream/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `exhibition-pulse 6s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Fixed atmospheric layer - blueprint grid, lines, particles, soft depth.
 * Opacity shifts gently with page scroll.
 */
export function ExhibitionBackground() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const gridOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 1], [0.35, 0.5, 0.4, 0.25]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0.2, 0.35, 0.15]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft cream depth gradients */}
      <div
        className="absolute inset-0 bg-bg"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 50% at 10% 20%, color-mix(in srgb, #c6c2f2 12%, transparent), transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 60%, color-mix(in srgb, #d86072 6%, transparent), transparent 55%),
            radial-gradient(ellipse 40% 30% at 50% 100%, color-mix(in srgb, #d6dc82 8%, transparent), transparent 50%)
          `,
        }}
      />

      {/* Architectural grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: prefersReducedMotion ? 0.3 : gridOpacity,
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--foreground) 6%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--foreground) 6%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Finer secondary grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: prefersReducedMotion ? 0.15 : lineOpacity,
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--foreground) 4%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--foreground) 4%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "16px 16px",
        }}
      />

      {/* Construction lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="8%" y1="0" x2="8%" y2="100%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="92%" y1="0" x2="92%" y2="100%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="12%" x2="100%" y2="12%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="88%" x2="100%" y2="88%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="18%" y2="18%" stroke="currentColor" strokeWidth="0.4" />
        <line x1="100%" y1="0" x2="82%" y2="18%" stroke="currentColor" strokeWidth="0.4" />
      </svg>

      {!prefersReducedMotion && <SeededParticles count={28} />}

      {/* Soft noise */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
