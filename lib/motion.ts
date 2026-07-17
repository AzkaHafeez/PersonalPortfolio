/** Shared easing + duration tokens so every component moves the same way. */

/** Matches --ease-editorial in globals.css — a soft, premium ease-out. */
export const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.5,
  slow: 0.7,
  reveal: 0.8,
} as const;

/** Standard scroll-reveal transition: fade + slight rise, once per element. */
export const revealTransition = (delay = 0) => ({
  duration: DURATION.reveal,
  delay,
  ease: EASE_EDITORIAL,
});

/** Positive rootMargin so reveals trigger *before* a section is actually
 * scrolled into view (docs: framer-motion viewport.margin === IntersectionObserver
 * rootMargin — positive values grow the observed box outward). Without this,
 * fast scrolling or a slow hydration can show a section still at opacity:0
 * for a moment, i.e. "blank while scrolling". */
export const revealViewport = { once: true, margin: "180px" } as const;
