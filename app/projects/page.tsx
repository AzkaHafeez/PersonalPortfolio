import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects, getHomeProjects } from "@/lib/content";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { ProjectsArchive } from "@/components/projects/ProjectsArchive";

export const metadata: Metadata = {
  title: "View All Projects",
  description:
    "All case studies from Azka Hafeez — featured exhibition work and archive projects.",
};

export default function ProjectsArchivePage() {
  const home = getHomeProjects();
  const homeSlugs = new Set(home.map((p) => p.slug));
  const rest = getAllProjects().filter((p) => !homeSlugs.has(p.slug));
  const projects = [...home, ...rest];

  return (
    <>
      <MinimalHeader />
      <main id="main-content" className="min-h-screen bg-bg">
        <section className="section-padding container-editorial">
          <Link
            href="/#projects"
            className="label-caps mb-10 inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-cherry"
          >
            ← Back to featured
          </Link>

          <p className="label-caps mb-4 text-cherry">Archive</p>
          <h1 className="font-serif-display max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
            View all projects
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
            Full lineup — featured exhibition work and everything else in the
            vault. Each row opens a case study.
          </p>

          <ProjectsArchive projects={projects} />
        </section>
      </main>
      <Footer />
    </>
  );
}
