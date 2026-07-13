import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="font-serif-display mb-6 mt-16 text-3xl font-bold tracking-tight first:mt-0 md:text-4xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif-display mb-4 mt-10 text-2xl font-semibold">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-6 text-base leading-relaxed text-fg-muted md:text-lg">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-fg-muted">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6 text-fg-muted">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-fg">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="underline decoration-lavender underline-offset-4 transition-colors hover:text-cherry hover:decoration-cherry"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
};
