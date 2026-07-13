"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

/**
 * Editorial 2×2 (or wider) screenshot gallery with fullscreen lightbox.
 */
export function ImageGallery({ images }: ImageGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <motion.button
            key={`${image.src}-${index}`}
            type="button"
            className="group relative aspect-[16/10] overflow-hidden rounded-sm bg-lavender/20 text-left dark:bg-lavender/10"
            onClick={() => setLightbox(index)}
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian/70 to-transparent px-4 pb-3 pt-10">
              <span className="label-caps text-cream/80">
                {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <span className="mt-1 block truncate text-sm text-cream">
                {image.alt}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[lightbox].src}
                alt={images[lightbox].alt}
                className="max-h-[85vh] max-w-[90vw] object-contain"
              />
              <p className="mt-4 text-center text-sm text-cream/70">
                {images[lightbox].alt}
              </p>
              <div className="mt-4 flex items-center justify-center gap-6">
                <button
                  type="button"
                  className="label-caps text-cream/60 hover:text-cream disabled:opacity-30"
                  disabled={lightbox === 0}
                  onClick={() => setLightbox((i) => (i !== null && i > 0 ? i - 1 : i))}
                >
                  ← Prev
                </button>
                <span className="label-caps text-cream/50">
                  {lightbox + 1} / {images.length}
                </span>
                <button
                  type="button"
                  className="label-caps text-cream/60 hover:text-cream disabled:opacity-30"
                  disabled={lightbox === images.length - 1}
                  onClick={() =>
                    setLightbox((i) =>
                      i !== null && i < images.length - 1 ? i + 1 : i
                    )
                  }
                >
                  Next →
                </button>
                <button
                  type="button"
                  className="label-caps text-cream/60 hover:text-cherry"
                  onClick={() => setLightbox(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
