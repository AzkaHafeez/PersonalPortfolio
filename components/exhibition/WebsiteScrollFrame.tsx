"use client";

import Image from "next/image";

interface EscapingLaptopFrameProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Real full-page screenshot aspect ratio (width / height) — these vary a
   * lot page to page, so the strip's height is driven by the actual capture
   * rather than a fixed guess (which either crops long pages or leaves the
   * short ones stretched). Falls back to a tall default when unmeasured. */
  aspectRatio?: number;
}

/**
 * MacBook with a tall full-page screenshot that starts in the screen
 * and escapes downward past the laptop base (static — not a scroll scrubber).
 */
export function EscapingLaptopFrame({
  src,
  alt,
  className = "",
  priority = false,
  aspectRatio = 10 / 28,
}: EscapingLaptopFrameProps) {
  return (
    <div
      className={`relative mx-auto w-full ${
        className || "max-w-md lg:max-w-lg"
      }`}
    >
      {/* Ambient shadow under the full composition */}
      <div
        className="pointer-events-none absolute -inset-x-6 top-[8%] bottom-0 -z-10 rounded-[2rem] opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(38,38,40,0.22), transparent 65%)",
        }}
        aria-hidden
      />

      {/* Tall page strip — defines height; top peeks through laptop screen */}
      <div className="relative z-0 mx-[calc(3.5%+7px)]">
        <div
          className="relative w-full overflow-hidden rounded-sm bg-bg-muted shadow-[0_32px_64px_-28px_rgba(38,38,40,0.45)]"
          style={{ aspectRatio }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 90vw, 420px"
            priority={priority}
          />
        </div>
      </div>

      {/* Laptop lid + base overlaid on the top of the tall page */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
        {/* Screen bezel — hollow so the page shows through */}
        <div
          className="mx-[3.5%] rounded-t-[10px] border-[7px] border-b-0 border-[#1c1c1e] shadow-[0_20px_40px_-18px_rgba(0,0,0,0.35)]"
          style={{
            aspectRatio: "16 / 10",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.12), 0 20px 40px -18px rgba(0,0,0,0.35)",
          }}
          aria-hidden
        />

        {/* Chin + deck */}
        <div className="relative -mt-px">
          <div className="mx-auto h-1.5 w-[26%] rounded-b-sm bg-[#2a2a2c]" />
          <div className="mx-auto h-[9px] w-[108%] max-w-none -translate-x-[3.7%] rounded-b-md bg-gradient-to-b from-[#2e2e30] to-[#1a1a1c] shadow-md" />
        </div>
      </div>
    </div>
  );
}

/** @deprecated Use EscapingLaptopFrame — kept as alias for existing imports */
export const WebsiteScrollFrame = EscapingLaptopFrame;
