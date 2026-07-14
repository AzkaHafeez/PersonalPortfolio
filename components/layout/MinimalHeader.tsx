import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function MinimalHeader() {
  return (
    <header className="border-b border-border/40">
      <div className="container-editorial flex items-center justify-between gap-4 px-6 py-5 md:px-10 lg:px-16 xl:px-24">
        <Link
          href="/"
          className="font-serif-display text-lg font-bold tracking-tight"
        >
          AZKA.
        </Link>
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="/projects"
            className="label-caps rounded-full bg-cherry px-3.5 py-1.5 !text-cream shadow-[0_8px_20px_-10px_rgba(216,96,114,0.7)] transition-opacity hover:opacity-90 md:px-4 md:py-2"
          >
            View all projects
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
