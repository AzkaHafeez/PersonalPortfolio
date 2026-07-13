import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getWritingBySlug, getWritingSlugs } from "@/lib/content";
import { compileMdxContent } from "@/lib/mdx";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getWritingBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function WritingPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getWritingBySlug(slug);

  if (!article) notFound();

  const content = await compileMdxContent(article.content);

  return (
    <>
      <MinimalHeader />
      <main className="min-h-screen">
        <article className="section-padding container-editorial">
          <Link
            href="/#writing"
            className="label-caps mb-12 inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
          >
            ← Back to writing
          </Link>

          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="label-caps">{article.date}</span>
              <span className="label-caps">{article.readingTime}</span>
            </div>

            <h1 className="font-serif-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
              {article.title}
            </h1>

            <p className="mt-6 text-lg text-fg-muted">{article.excerpt}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs text-fg-muted">
                  {tag}
                </span>
              ))}
            </div>

            <div className="editorial-rule my-12" />

            <div className="prose-editorial">{content}</div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
