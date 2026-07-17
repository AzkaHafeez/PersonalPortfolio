"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DeviceFrame } from "@/components/exhibition/DeviceFrame";
import { EASE_EDITORIAL } from "@/lib/motion";

interface ImageGalleryProps {
  images: { src: string; alt: string; aspectRatio?: number }[];
  preferPhone?: boolean;
}

const DESKTOP_VARIANTS = ["macbook", "browser", "ipad", "iphone"] as const;
const MOBILE_VARIANTS = ["iphone", "iphone", "ipad", "iphone"] as const;

/**
 * Device-frame gallery (laptop / phone) with fullscreen lightbox.
 */
export function ImageGallery({
  images,
  preferPhone = false,
}: ImageGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const variants = preferPhone ? MOBILE_VARIANTS : DESKTOP_VARIANTS;

  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-8 grid items-end gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {images.map((image, index) => {
          const variant = variants[index % variants.length];
          return (
            <motion.button
              key={`${image.src}-${index}`}
              type="button"
              className={`group text-left ${
                variant === "iphone" ? "mx-auto w-full max-w-[200px]" : "w-full"
              }`}
              onClick={() => setLightbox(index)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
            >
              <DeviceFrame
                src={image.src}
                alt={image.alt}
                variant={variant}
                aspectRatio={image.aspectRatio}
              />
              <span className="label-caps mt-4 block text-fg-muted">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
              <span className="mt-1 block text-sm text-fg">{image.alt}</span>
            </motion.button>
          );
        })}
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
                  onClick={() =>
                    setLightbox((i) => (i !== null && i > 0 ? i - 1 : i))
                  }
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
