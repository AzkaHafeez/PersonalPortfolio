import Link from "next/link";
import type { Project } from "@/lib/types";
import { getAllProjects } from "@/lib/content";
import { classifyByOrientation, withAspect } from "@/lib/image-select";
import { TechGrid } from "./TechGrid";
import { ImageGallery } from "./ImageGallery";
import { AsymmetricBand } from "./AsymmetricBand";
import { ProjectTitle } from "./ProjectHeroMotion";
import { CaseStudyDeviceCluster } from "@/components/projects/CaseStudyDeviceCluster";
import { EscapingLaptopDuo } from "@/components/projects/EscapingLaptopDuo";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { compileSections, splitMdxByH2 } from "@/lib/project-sections";

interface CaseStudyLayoutProps {
  project: Project;
}

export async function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  const all = getAllProjects();
  const index = all.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;
  const dims = project.imageDimensions;
  const gallery = (project.images ?? []).map((img) => withAspect(img, dims)!);
  const preferPhone =
    project.slug === "edunet" ||
    (project.category ?? "").toLowerCase().includes("mobile");
  const escapeDuo = project.escapeDuo ?? null;

  // Auto-match each screenshot's real orientation to the right device slot
  // in the hero cluster instead of assuming a fixed index per project — a
  // slot only ever gets an image whose orientation actually fits its
  // silhouette (landscape into laptop/tablet, portrait into phone), so a
  // mobile-only case study never stretches a portrait shot into the laptop
  // frame, and one without any mobile screens keeps a clean placeholder in
  // the phone slot instead of squeezing in a mismatched desktop shot.
  const { landscape, portrait } = classifyByOrientation(gallery, dims);
  const clusterLaptop = withAspect(landscape[0] ?? null, dims);
  const clusterTablet = withAspect(landscape[1] ?? null, dims);
  const clusterPhone = withAspect(portrait[0] ?? null, dims);

  const rawSections = splitMdxByH2(project.content);
  const sections = await compileSections(rawSections);

  return (
    <>
      <MinimalHeader />
      <main className="min-h-screen bg-bg">
        <article>
          {/* Asymmetric hero — copy left, device right */}
          <header className="section-padding container-editorial !pb-8 md:!pb-12">
            <Link
              href="/projects"
              className="label-caps mb-10 inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-cherry"
            >
              ← All projects
            </Link>

            <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6 xl:col-span-5">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  {project.tag && (
                    <span className="rounded-full bg-cherry/15 px-2.5 py-0.5 text-xs font-medium text-cherry">
                      {project.tag}
                    </span>
                  )}
                  <span className="label-caps">{project.year}</span>
                </div>

                <ProjectTitle slug={project.slug} title={project.title} />

                <p className="mt-6 text-base leading-relaxed text-fg-muted md:text-lg">
                  {project.description}
                </p>

                <dl className="mt-10 space-y-4 border-t border-border pt-8">
                  <div className="flex justify-between gap-4 border-b border-border pb-3">
                    <dt className="label-caps">Role</dt>
                    <dd className="text-right text-sm font-medium">{project.role}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-3">
                    <dt className="label-caps">Duration</dt>
                    <dd className="text-right text-sm font-medium">{project.duration}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-3">
                    <dt className="label-caps">Stack</dt>
                    <dd className="max-w-[60%] text-right text-sm text-fg-muted">
                      {project.tags.slice(0, 4).join(" · ")}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap gap-4">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-caps border border-obsidian bg-obsidian px-5 py-2.5 text-cream transition-colors hover:border-cherry hover:bg-cherry hover:text-cream"
                    >
                      View Live ↗
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-caps border border-border px-5 py-2.5 transition-colors hover:border-cherry hover:text-cherry"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6 xl:col-span-7 lg:translate-y-4">
                <CaseStudyDeviceCluster
                  title={project.title}
                  captions={
                    preferPhone
                      ? ["Overview", "Classroom", "Mobile View"]
                      : ["Dashboard", "Management", "Mobile View"]
                  }
                  laptop={clusterLaptop}
                  tablet={clusterTablet}
                  phone={clusterPhone}
                />
              </div>
            </div>
          </header>

          {escapeDuo && (
            <EscapingLaptopDuo
              left={escapeDuo.left}
              right={escapeDuo.right}
              leftAlt={escapeDuo.leftAlt}
              rightAlt={escapeDuo.rightAlt}
              leftAspectRatio={dims[escapeDuo.left]?.aspectRatio}
              rightAspectRatio={dims[escapeDuo.right]?.aspectRatio}
              title="Full-page views"
              lead="Two tall page compositions escaping past the laptop base."
            />
          )}

          {/* Alternating chapter bands */}
          <div className="container-editorial px-6 md:px-10 lg:px-16 xl:px-24">
            {sections.map((section, i) => (
              <AsymmetricBand
                key={`${section.title}-${i}`}
                index={i}
                title={section.title}
                image={gallery.length ? gallery[i % gallery.length] : null}
                imageLeft={i % 2 === 0}
                preferPhone={preferPhone}
              >
                {section.content}
              </AsymmetricBand>
            ))}
          </div>

          {gallery.length > sections.length && (
            <div className="section-padding container-editorial !pt-8">
              <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-serif-display text-3xl font-bold md:text-4xl">
                    More frames
                  </h2>
                  <p className="mt-2 text-sm text-fg-muted">
                    Additional device views from the product.
                  </p>
                </div>
              </div>
              <ImageGallery
                images={gallery.slice(sections.length)}
                preferPhone={preferPhone}
              />
            </div>
          )}

          {gallery.length > 0 && gallery.length <= sections.length && (
            <div className="section-padding container-editorial !pt-4">
              <div className="border-t border-border pt-16">
                <h2 className="font-serif-display text-3xl font-bold md:text-4xl">
                  Gallery
                </h2>
                <p className="mt-3 text-sm text-fg-muted">
                  Device frames — click for fullscreen.
                </p>
                <ImageGallery images={gallery} preferPhone={preferPhone} />
              </div>
            </div>
          )}

          {/* Tech — offset column */}
          <div className="section-padding container-editorial">
            <div className="grid gap-10 border-t border-border pt-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 className="font-serif-display text-3xl font-bold">
                  Technologies
                </h2>
                <p className="mt-3 text-sm text-fg-muted">
                  Tools and platforms behind the build.
                </p>
              </div>
              <div className="lg:col-span-8">
                <TechGrid technologies={project.technologies} />
              </div>
            </div>
          </div>

          {/* Next / prev — asymmetric */}
          <nav
            className="section-padding container-editorial !pt-8"
            aria-label="Adjacent projects"
          >
            <div className="grid gap-10 border-t border-border pt-12 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="group block max-w-sm transition-colors"
                >
                  <p className="label-caps mb-2 text-fg-muted">Previous</p>
                  <p className="font-serif-display text-2xl font-bold group-hover:text-cherry">
                    ← {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/projects/${next.slug}`}
                  className="group block max-w-sm justify-self-end text-right transition-colors"
                >
                  <p className="label-caps mb-2 text-fg-muted">Next</p>
                  <p className="font-serif-display text-2xl font-bold group-hover:text-cherry">
                    {next.title} →
                  </p>
                </Link>
              ) : null}
            </div>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
