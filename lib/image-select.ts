import type { ImageDims } from "./types";

/** Anything wider than this ratio reads as a desktop/landscape capture. */
const LANDSCAPE_THRESHOLD = 1.1;

interface GalleryImage {
  src: string;
  alt: string;
}

/**
 * Splits a gallery into landscape (desktop/browser) vs portrait (phone)
 * shots using each image's *real* measured aspect ratio, so hero clusters
 * can automatically drop the right kind of screenshot into the right kind
 * of device frame without anyone hand-picking indexes per project.
 */
export function classifyByOrientation<T extends GalleryImage>(
  images: T[],
  dimensions: Record<string, ImageDims>
): { landscape: T[]; portrait: T[] } {
  const landscape: T[] = [];
  const portrait: T[] = [];
  for (const image of images) {
    const ratio = dimensions[image.src]?.aspectRatio ?? LANDSCAPE_THRESHOLD + 1;
    (ratio >= LANDSCAPE_THRESHOLD ? landscape : portrait).push(image);
  }
  return { landscape, portrait };
}

export function withAspect<T extends GalleryImage>(
  image: T | null | undefined,
  dimensions: Record<string, ImageDims>
): (T & { aspectRatio?: number }) | null {
  if (!image) return null;
  return { ...image, aspectRatio: dimensions[image.src]?.aspectRatio };
}
