import type { Metadata } from "next";
import Link from "next/link";
import { getArchiveProjects } from "@/lib/content";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { ProjectsArchive } from "@/components/projects/ProjectsArchive";

export const metadata: Metadata = {
  title: "View All Projects",
  description:
    "Additional case studies from Azka Hafeez — campus platforms, AI products, and product experiments.",
};

export default function ProjectsArchivePage() {
  const projects = getArchiveProjects();

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
            Selected work beyond the home exhibition — each board opens a full
            case study.
          </p>

          <ProjectsArchive projects={projects} />
        </section>
      </main>
      <Footer />
    </>
  );
}
