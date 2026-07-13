import { introAnnotations } from "@/content/site";

/**
 * Magazine-style corner annotations — Cream with Cherry/Lime whispers.
 */
export function CornerAnnotations() {
  const base =
    "text-[0.58rem] font-medium uppercase tracking-[0.25em] sm:text-[0.62rem]";

  return (
    <div className="pointer-events-none absolute inset-0 z-10 p-6 sm:p-8 md:p-10 lg:p-12">
      <p
        className={`absolute left-6 top-6 hidden text-cream/40 sm:left-8 sm:top-8 sm:block md:left-10 md:top-10 lg:left-12 lg:top-12 ${base}`}
      >
        {introAnnotations.topLeft}
      </p>
      <p
        className={`absolute right-6 top-6 text-right text-cream/40 sm:right-8 sm:top-8 md:right-10 md:top-10 lg:right-12 lg:top-12 ${base}`}
      >
        <span className="text-cherry/50">{introAnnotations.topRight}</span>
      </p>
      <p
        className={`absolute bottom-6 left-6 hidden text-cream/40 md:bottom-10 md:left-10 md:block lg:bottom-12 lg:left-12 ${base}`}
      >
        {introAnnotations.bottomLeft}
      </p>
      <p
        className={`absolute bottom-6 right-6 text-right text-cream/40 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 lg:bottom-12 lg:right-12 ${base}`}
      >
        <span className="text-lime/40">{introAnnotations.bottomRight}</span>
      </p>
    </div>
  );
}
