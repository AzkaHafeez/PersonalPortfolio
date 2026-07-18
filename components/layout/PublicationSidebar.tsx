import type { Project } from "@/lib/types";
import { siteConfig } from "@/content/site";

interface PublicationSidebarProps {
  projects: Project[];
  activeTab: string;
}

export function PublicationSidebar({ projects, activeTab }: PublicationSidebarProps) {
  const series = [
    {
      name: "AI Products",
      count: projects.filter((p) =>
        p.tags.some((t) => ["TensorFlow", "Firebase", "Python"].includes(t))
      ).length,
    },
    {
      name: "Platforms",
      count: projects.filter((p) =>
        ["Django", "Flutter"].some((t) => p.tags.includes(t))
      ).length,
    },
    {
      name: "Editorial Web",
      count: projects.filter((p) =>
        ["GSAP", "Three.js", "React"].some((t) => p.tags.includes(t))
      ).length,
    },
  ];

  return (
    <aside className="space-y-10 lg:sticky lg:top-8 lg:self-start">
      <div>
        <p className="label-caps mb-5">Curated series</p>
        <ul className="space-y-4">
          {series.map((s) => (
            <li
              key={s.name}
              className="flex items-center justify-between border-b border-border pb-3"
            >
              <span className="text-sm">{s.name}</span>
              <span className="font-serif-display text-lg tabular-nums text-cherry">
                {s.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="label-caps mb-3">Current stack</p>
        <p className="text-sm leading-relaxed text-fg-muted">
          {siteConfig.stack.join(" · ")}
        </p>
      </div>

      {activeTab === "projects" && (
        <div>
          <p className="label-caps mb-3">Focus</p>
          <p className="text-sm text-fg-muted">{siteConfig.focus}</p>
        </div>
      )}

      {/* The Digest - Obsidian card with lime CTA */}
      <div className="rounded-md bg-obsidian p-6 text-cream">
        <p className="font-serif-display mb-2 text-xl font-bold">The Digest</p>
        <p className="mb-5 text-sm leading-relaxed text-cream/80">
          Notes on building AI products, shipping software, and editorial
          interfaces. No spam - just craft.
        </p>
        <form
          action={`mailto:${siteConfig.email}?subject=Subscribe to The Digest`}
          className="flex items-center gap-2 border-b border-cream/25 pb-2"
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="min-w-0 flex-1 bg-transparent text-sm text-cream placeholder:text-cream/45 outline-none"
            aria-label="Email for newsletter"
          />
          <button
            type="submit"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime text-obsidian transition-transform hover:scale-105"
            aria-label="Subscribe"
          >
            →
          </button>
        </form>
      </div>

      <div className="space-y-3 border-t border-border pt-6">
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-fg-muted transition-colors hover:text-cherry"
        >
          GitHub ↗
        </a>
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-fg-muted transition-colors hover:text-cherry"
        >
          LinkedIn ↗
        </a>
        <a
          href="/resume.pdf"
          className="block text-sm text-fg-muted transition-colors hover:text-cherry"
        >
          Resume ↓
        </a>
      </div>
    </aside>
  );
}
