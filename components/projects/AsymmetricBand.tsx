"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { DeviceFrame } from "@/components/exhibition/DeviceFrame";
import { revealTransition, revealViewport } from "@/lib/motion";

interface AsymmetricBandProps {
  index: number;
  title: string;
  children: React.ReactNode;
  image?: { src: string; alt: string; aspectRatio?: number } | null;
  /** When true, image sits on the left */
  imageLeft?: boolean;
  /** Prefer phone chrome for mobile-first case studies */
  preferPhone?: boolean;
}

/**
 * Magazine band: DeviceFrame media + text, alternating sides.
 */
export function AsymmetricBand({
  index,
  title,
  children,
  image,
  imageLeft = true,
  preferPhone = false,
}: AsymmetricBandProps) {
  const [lightbox, setLightbox] = useState(false);
  const variant = preferPhone
    ? index % 2 === 0
      ? "iphone"
      : "ipad"
    : index % 2 === 0
      ? "macbook"
      : "iphone";

  const media = image ? (
    <button
      type="button"
      onClick={() => setLightbox(true)}
      className="group w-full text-left"
    >
      <div
        className={
          variant === "iphone" ? "mx-auto max-w-[220px] md:max-w-[240px]" : ""
        }
      >
        <DeviceFrame
          src={image.src}
          alt={image.alt}
          variant={variant}
          aspectRatio={image.aspectRatio}
        />
      </div>
      <span className="label-caps mt-3 block text-fg-muted">
        {String(index + 1).padStart(2, "0")} — {image.alt}
      </span>
    </button>
  ) : null;

  const copy = (
    <div className={imageLeft ? "lg:pl-2 xl:pl-6" : "lg:pr-2 xl:pr-6"}>
      <p className="label-caps mb-3 text-cherry">
        {String(index + 1).padStart(2, "0")} — Chapter
      </p>
      <h2 className="font-serif-display text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      <div className="prose-editorial mt-6 max-w-xl">{children}</div>
    </div>
  );

  return (
    <>
      <motion.section
        className="border-t border-border py-16 md:py-24"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={revealTransition()}
      >
        <div
          className={`flex flex-col gap-10 lg:items-center lg:gap-14 xl:gap-20 ${
            imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          {media && (
            <div
              className={`w-full shrink-0 lg:w-[48%] ${
                imageLeft ? "lg:-ml-2 xl:-ml-6" : "lg:-mr-2 xl:-mr-6"
              }`}
            >
              {media}
            </div>
          )}
          <div className="min-w-0 flex-1">{copy}</div>
        </div>
      </motion.section>

      {lightbox && image && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 p-6"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
            <p className="mt-3 text-center text-sm text-cream/70">{image.alt}</p>
            <button
              type="button"
              className="label-caps mt-4 block w-full text-center text-cream/60 hover:text-cherry"
              onClick={() => setLightbox(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
