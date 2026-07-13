import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function MinimalHeader() {
  return (
    <header className="border-b border-border/40">
      <div className="container-editorial flex items-center justify-between px-6 py-5 md:px-10 lg:px-16 xl:px-24">
        <Link
          href="/"
          className="font-serif-display text-lg font-bold tracking-tight"
        >
          AZKA.
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
