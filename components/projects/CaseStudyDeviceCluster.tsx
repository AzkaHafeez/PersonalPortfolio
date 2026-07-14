"use client";

import { ScreenPlaceholder } from "@/components/projects/ScreenPlaceholder";

interface CaseStudyDeviceClusterProps {
  title: string;
  captions?: [string, string, string];
  totalFrames?: number;
  className?: string;
}

/**
 * Keynote-style hero board for case study starting media:
 * laptop (center) + phone (left) + tablet (lower-right).
 */
export function CaseStudyDeviceCluster({
  title,
  captions = ["Dashboard", "Management", "Mobile View"],
  totalFrames = 8,
  className = "",
}: CaseStudyDeviceClusterProps) {
  return (
    <div
      className={`relative w-full bg-transparent ${className}`}
      aria-label={`${title} product lineup placeholder`}
    >
      <div className="relative mx-auto aspect-[5/4] w-full max-w-2xl sm:aspect-[16/11]">
        {/* Laptop — center back */}
        <div className="absolute left-[14%] right-[14%] top-[10%] z-10 sm:left-[16%] sm:right-[16%] sm:top-[12%]">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-4 top-4 -z-10 rounded-3xl opacity-50 blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 80%, rgba(0,0,0,0.22), transparent 70%)",
              }}
              aria-hidden
            />
            <div className="rounded-[10px] border border-black/30 bg-[#1c1c1e] p-[6px] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.35)] sm:p-[8px]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[4px]">
                <ScreenPlaceholder
                  title={title}
                  subtitle={captions[0]}
                  index={1}
                  total={totalFrames}
                />
              </div>
            </div>
            {/* Laptop chin + base */}
            <div className="mx-auto mt-0.5 h-1 w-[28%] rounded-b-sm bg-[#2a2a2c]" />
            <div className="mx-auto h-[5px] w-[112%] max-w-none -translate-x-[5.5%] rounded-b-md bg-gradient-to-b from-[#2e2e30] to-[#1a1a1c] shadow-md" />
          </div>
        </div>

        {/* Tablet — lower right */}
        <div className="absolute bottom-[8%] right-[3%] z-20 w-[40%] sm:bottom-[10%] sm:right-[5%] sm:w-[38%]">
          <div
            className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl opacity-45 blur-xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 80%, rgba(0,0,0,0.2), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="rounded-[14px] border border-black/30 bg-[#1c1c1e] p-[5px] shadow-[0_20px_40px_-14px_rgba(0,0,0,0.35)] sm:p-[6px]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
              <ScreenPlaceholder
                title={title}
                subtitle={captions[1]}
                index={2}
                total={totalFrames}
              />
            </div>
          </div>
        </div>

        {/* Phone — left front */}
        <div className="absolute bottom-[6%] left-[3%] z-30 w-[22%] max-w-[120px] sm:bottom-[8%] sm:left-[5%] sm:w-[20%] sm:max-w-[140px]">
          <div
            className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] opacity-45 blur-xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 80%, rgba(0,0,0,0.22), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="rounded-[1.35rem] border border-black/30 bg-[#1c1c1e] p-[5px] shadow-[0_22px_40px_-12px_rgba(0,0,0,0.4)] sm:rounded-[1.55rem] sm:p-[6px]">
            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.05rem] sm:rounded-[1.2rem]">
              <ScreenPlaceholder
                title={title}
                subtitle={captions[2]}
                index={3}
                total={totalFrames}
              />
              <div
                className="absolute left-1/2 top-1.5 z-20 h-[14px] w-[42%] -translate-x-1/2 rounded-full bg-black sm:top-2 sm:h-[16px]"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
