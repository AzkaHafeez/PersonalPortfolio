import Link from "next/link";
import type { WritingArticle } from "@/lib/types";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

export function WritingSection({ articles }: { articles: WritingArticle[] }) {
  return (
    <SectionShell id="writing">
      <SectionLabel number="05" label="Writing" />

      <FadeIn className="mt-8">
        <h2 className="font-serif-display text-3xl font-bold tracking-tight md:text-4xl">
          Notes & articles
        </h2>
      </FadeIn>

      <div className="mt-16 space-y-0">
        {articles.map((article, index) => (
          <FadeIn key={article.slug} delay={index * 0.05}>
            <article className="grid gap-6 border-t border-border py-10 md:grid-cols-12">
              <div className="aspect-[16/10] rounded-sm bg-fg md:col-span-4">
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-serif-display text-center text-lg italic text-bg/70">
                    {article.title}
                  </span>
                </div>
              </div>
              <div className="md:col-span-8">
                <div className="mb-2 flex items-center gap-3">
                  <span className="label-caps">{article.date}</span>
                  <span className="label-caps">{article.readingTime}</span>
                </div>
                <Link href={`/writing/${article.slug}`}>
                  <h3 className="font-serif-display text-2xl font-bold transition-colors hover:text-fg-muted md:text-3xl">
                    {article.title}
                  </h3>
                </Link>
                <p className="mt-4 text-fg-muted">{article.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-xs text-fg-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}
