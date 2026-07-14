"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { exhibitionNavLinks, siteConfig } from "@/content/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = exhibitionNavLinks
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const linkClass = (href: string) => {
    const id = href.startsWith("#") ? href.slice(1) : "";
    const isActive = id && activeSection === id;
    return `label-caps relative transition-colors hover:text-fg ${
      isActive
        ? "text-fg after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-fg"
        : "text-fg-muted"
    }`;
  };

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-cherry"
        style={
          prefersReducedMotion
            ? { scaleX: 0 }
            : { scaleX: scrollYProgress }
        }
        aria-hidden="true"
      />

      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-editorial)] ${
          scrolled
            ? "border-b border-border/50 bg-bg/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="container-editorial flex items-center justify-between px-6 py-4 md:px-10 lg:px-16 xl:px-24"
          aria-label="Main navigation"
        >
          <Link
            href="#home"
            className="font-serif-display text-xl font-bold tracking-tight md:text-2xl"
            onClick={() => setMobileOpen(false)}
          >
            {siteConfig.name}
          </Link>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {exhibitionNavLinks.map((link) => (
              <a key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </a>
            ))}
            <Link
              href="/projects"
              className="label-caps rounded-full bg-cherry px-4 py-2 !text-cream shadow-[0_8px_20px_-10px_rgba(216,96,114,0.75)] transition-opacity hover:opacity-90"
            >
              View all projects
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/projects"
              className="label-caps rounded-full bg-cherry px-3 py-1.5 text-[0.65rem] !text-cream"
              onClick={() => setMobileOpen(false)}
            >
              Projects
            </Link>
            <ThemeToggle />
            <button
              type="button"
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className={`h-px w-5 bg-fg transition-transform ${
                  mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-fg transition-opacity ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-fg transition-transform ${
                  mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="border-t border-border bg-bg/95 px-6 py-6 backdrop-blur-md lg:hidden">
            <div className="flex flex-col gap-4">
              {exhibitionNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-serif-display text-2xl"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/projects"
                className="label-caps mt-2 inline-flex w-fit rounded-full bg-cherry px-5 py-2.5 !text-cream"
                onClick={() => setMobileOpen(false)}
              >
                View all projects
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
