"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "@/content/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Nav() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sectionIds = navLinks
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const linkClass = (href: string) => {
    const id = href.startsWith("#") ? href.slice(1) : "";
    const isActive = id && activeSection === id;
    return `label-caps relative transition-colors hover:text-fg ${
      isActive ? "text-fg after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-fg" : "text-fg-muted"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-md">
      <nav
        className="container-editorial flex items-center justify-between px-6 py-4 md:px-10 lg:px-16 xl:px-24"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-serif-display text-xl font-bold tracking-tight md:text-2xl"
        >
          AZKA.
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="label-caps text-fg-muted transition-colors hover:text-fg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            )
          )}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`h-px w-5 bg-fg transition-transform ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-fg transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-5 bg-fg transition-transform ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-bg px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-serif-display text-2xl"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-serif-display text-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
