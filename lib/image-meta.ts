import fs from "fs";
import path from "path";

export interface ImageDims {
  width: number;
  height: number;
  aspectRatio: number;
}

const cache = new Map<string, ImageDims | null>();

function readPngSize(buf: Buffer): ImageDims | null {
  if (buf.length < 24 || buf.toString("hex", 0, 8) !== "89504e470d0a1a0a") {
    return null;
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  if (!width || !height) return null;
  return { width, height, aspectRatio: width / height };
}

function readJpegSize(buf: Buffer): ImageDims | null {
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return null;
  let offset = 2;
  while (offset + 4 <= buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buf[offset + 1];
    // Markers with no payload length to skip.
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
      offset += 2;
      continue;
    }
    const length = buf.readUInt16BE(offset + 2);
    const isSofMarker =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;
    if (isSofMarker && offset + 9 <= buf.length) {
      const height = buf.readUInt16BE(offset + 5);
      const width = buf.readUInt16BE(offset + 7);
      if (!width || !height) return null;
      return { width, height, aspectRatio: width / height };
    }
    offset += 2 + length;
  }
  return null;
}

function readWebpSize(buf: Buffer): ImageDims | null {
  if (
    buf.length < 30 ||
    buf.toString("ascii", 0, 4) !== "RIFF" ||
    buf.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return null;
  }
  const format = buf.toString("ascii", 12, 16);
  let width = 0;
  let height = 0;
  if (format === "VP8X") {
    width = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
    height = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
  } else if (format === "VP8 ") {
    width = buf.readUInt16LE(26) & 0x3fff;
    height = buf.readUInt16LE(28) & 0x3fff;
  } else if (format === "VP8L") {
    const bits = buf.readUInt32LE(21);
    width = (bits & 0x3fff) + 1;
    height = ((bits >> 14) & 0x3fff) + 1;
  }
  if (!width || !height) return null;
  return { width, height, aspectRatio: width / height };
}

function readSvgSize(buf: Buffer): ImageDims | null {
  const text = buf.toString("utf8");
  const viewBoxMatch = text.match(
    /viewBox=["']\s*[\d.+-]+\s+[\d.+-]+\s+([\d.]+)\s+([\d.]+)\s*["']/i
  );
  if (viewBoxMatch) {
    const width = parseFloat(viewBoxMatch[1]);
    const height = parseFloat(viewBoxMatch[2]);
    if (width > 0 && height > 0) {
      return { width, height, aspectRatio: width / height };
    }
  }
  const widthMatch = text.match(/<svg[^>]*\swidth=["']([\d.]+)/i);
  const heightMatch = text.match(/<svg[^>]*\sheight=["']([\d.]+)/i);
  if (widthMatch && heightMatch) {
    const width = parseFloat(widthMatch[1]);
    const height = parseFloat(heightMatch[1]);
    if (width > 0 && height > 0) {
      return { width, height, aspectRatio: width / height };
    }
  }
  return null;
}

/**
 * Reads the real pixel (or SVG viewBox) dimensions for an image under /public.
 * Server-only - never import this from a "use client" component. Memoized per
 * process; a fresh `next build` / dev reload re-reads the file, so replacing a
 * screenshot with a differently-shaped one is picked up automatically.
 * Returns null when the file is missing or unreadable so callers can fall back
 * to a sensible default instead of crashing on not-yet-added placeholders.
 */
export function getImageDimensions(publicSrc: string | null | undefined): ImageDims | null {
  if (!publicSrc) return null;
  if (cache.has(publicSrc)) return cache.get(publicSrc) ?? null;

  let dims: ImageDims | null = null;
  try {
    const filePath = path.join(process.cwd(), "public", publicSrc.replace(/^\//, ""));
    const buf = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    if (ext === ".png") dims = readPngSize(buf);
    else if (ext === ".jpg" || ext === ".jpeg") dims = readJpegSize(buf);
    else if (ext === ".webp") dims = readWebpSize(buf);
    else if (ext === ".svg") dims = readSvgSize(buf);
  } catch {
    dims = null;
  }

  cache.set(publicSrc, dims);
  return dims;
}

/** Convenience: real aspect ratio for a src, or a fallback when unknown. */
export function getAspectRatio(
  publicSrc: string | null | undefined,
  fallback: number
): number {
  return getImageDimensions(publicSrc)?.aspectRatio ?? fallback;
}
