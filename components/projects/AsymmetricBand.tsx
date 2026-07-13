"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AsymmetricBandProps {
  index: number;
  title: string;
  children: React.ReactNode;
  image?: { src: string; alt: string } | null;
  /** When true, image sits on the left */
  imageLeft?: boolean;
}

/**
 * Magazine band: image + text, alternating sides for editorial rhythm.
 */
export function AsymmetricBand({
  index,
  title,
  children,
  image,
  imageLeft = true,
}: AsymmetricBandProps) {
  const [lightbox, setLightbox] = useState(false);

  const media = image ? (
    <button
      type="button"
      onClick={() => setLightbox(true)}
      className="group relative w-full overflow-hidden rounded-sm bg-lavender/20 text-left dark:bg-lavender/10"
    >
      <div className="aspect-[4/3] w-full overflow-hidden md:aspect-[5/4] lg:aspect-[4/3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <span className="absolute bottom-3 left-3 label-caps rounded bg-obsidian/60 px-2 py-1 text-cream/90 backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")}
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
      {image && (
        <p className="mt-6 text-xs text-fg-muted italic">{image.alt}</p>
      )}
    </div>
  );

  return (
    <>
      <motion.section
        className="border-t border-border py-16 md:py-24"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`flex flex-col gap-10 lg:items-center lg:gap-14 xl:gap-20 ${
            imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          {media && (
            <div
              className={`w-full shrink-0 lg:w-[52%] ${
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
