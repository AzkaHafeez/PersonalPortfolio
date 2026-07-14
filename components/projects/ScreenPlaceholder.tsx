interface ScreenPlaceholderProps {
  title: string;
  subtitle: string;
  index: number;
  total?: number;
}

/** Empty editorial screen content matching the keynote placeholder board. */
export function ScreenPlaceholder({
  title,
  subtitle,
  index,
  total = 8,
}: ScreenPlaceholderProps) {
  return (
    <div className="relative flex h-full w-full flex-col bg-[#F4F2ED]">
      <div className="relative m-[5.5%] flex min-h-0 flex-1 flex-col border border-black/[0.08] px-[7%] py-[6%]">
        <p className="text-[0.55rem] font-medium uppercase tracking-[0.18em] text-[#d86072] md:text-[0.62rem]">
          Case Study
        </p>
        <h3 className="font-serif-display mt-1.5 truncate text-[clamp(0.95rem,2.6vw,1.55rem)] font-bold leading-none tracking-tight text-[#1a1a1a]">
          {title}
        </h3>
        <p className="mt-1.5 text-[0.58rem] text-black/40 md:text-[0.7rem]">
          {subtitle}
        </p>
        <div className="min-h-0 flex-1" />
        <div className="mt-auto pt-2">
          <p className="text-[0.5rem] tracking-wide text-black/35 md:text-[0.55rem]">
            {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <p className="mt-0.5 text-[0.45rem] text-black/28 md:text-[0.5rem]">
            Replace with Screenshot
          </p>
        </div>
      </div>
      {/* Soft glass sheen */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(125deg, rgba(255,255,255,0.35) 0%, transparent 42%, transparent 62%, rgba(255,255,255,0.08) 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}
