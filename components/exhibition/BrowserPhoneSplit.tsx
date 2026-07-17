"use client";

import { DeviceFrame } from "@/components/exhibition/DeviceFrame";

interface BrowserPhoneSplitProps {
  browserSrc: string;
  phoneSrc: string;
  browserAlt?: string;
  phoneAlt?: string;
  className?: string;
  browserAspectRatio?: number;
  phoneAspectRatio?: number;
}

/**
 * Generic exhibition cluster: browser frame + overlapping phone (bottom-right).
 */
export function BrowserPhoneSplit({
  browserSrc,
  phoneSrc,
  browserAlt = "Desktop view",
  phoneAlt = "Mobile view",
  className = "",
  browserAspectRatio,
  phoneAspectRatio,
}: BrowserPhoneSplitProps) {
  return (
    <div className={`relative pr-4 pt-4 pb-10 md:pb-12 ${className}`}>
      <DeviceFrame
        src={browserSrc}
        alt={browserAlt}
        variant="browser"
        aspectRatio={browserAspectRatio}
      />
      <div className="absolute -bottom-2 right-0 w-[34%] max-w-[160px] md:-bottom-4 md:right-2 md:w-[38%] md:max-w-[200px]">
        <DeviceFrame
          src={phoneSrc}
          alt={phoneAlt}
          variant="iphone"
          aspectRatio={phoneAspectRatio}
        />
      </div>
    </div>
  );
}
