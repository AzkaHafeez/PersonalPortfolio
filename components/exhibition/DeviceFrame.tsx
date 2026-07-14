"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type FrameVariant = "browser" | "macbook" | "iphone" | "ipad";

interface DeviceFrameProps {
  src: string;
  alt: string;
  variant?: FrameVariant;
  className?: string;
  priority?: boolean;
}

const variantStyles: Record<
  FrameVariant,
  { shell: string; screen: string; aspect: string }
> = {
  browser: {
    shell: "rounded-t-md border border-border bg-fg/5 shadow-lg",
    screen: "rounded-b-sm",
    aspect: "aspect-[16/10]",
  },
  macbook: {
    shell: "rounded-lg border border-border bg-obsidian/90 p-2 shadow-xl md:p-3",
    screen: "rounded-sm",
    aspect: "aspect-[16/10]",
  },
  iphone: {
    shell:
      "mx-auto max-w-[220px] rounded-[1.75rem] border border-border bg-obsidian p-2 shadow-xl",
    screen: "rounded-[1.35rem]",
    aspect: "aspect-[9/19]",
  },
  ipad: {
    shell: "rounded-2xl border border-border bg-obsidian/90 p-2 shadow-xl md:p-3",
    screen: "rounded-lg",
    aspect: "aspect-[4/3]",
  },
};

export function DeviceFrame({
  src,
  alt,
  variant = "browser",
  className = "",
  priority = false,
}: DeviceFrameProps) {
  const prefersReducedMotion = useReducedMotion();
  const styles = variantStyles[variant];

  return (
    <motion.div
      className={`${styles.shell} ${className}`}
      whileHover={prefersReducedMotion ? undefined : { y: -4, rotateX: 2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 800 }}
    >
      {variant === "browser" && (
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-cherry/70" />
          <span className="h-2 w-2 rounded-full bg-lime/70" />
          <span className="h-2 w-2 rounded-full bg-lavender/70" />
          <span className="ml-3 h-5 flex-1 rounded-sm bg-bg-muted/80" />
        </div>
      )}
      <div className={`relative overflow-hidden bg-bg-muted ${styles.screen} ${styles.aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading={priority ? undefined : "lazy"}
          priority={priority}
        />
      </div>
      {variant === "macbook" && (
        <div className="mx-auto mt-1 h-1.5 w-[30%] rounded-b-sm bg-fg/20" />
      )}
    </motion.div>
  );
}
