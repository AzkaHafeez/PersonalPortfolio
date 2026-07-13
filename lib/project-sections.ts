import { compileMdxContent } from "@/lib/mdx";

export interface NarrativeSection {
  title: string;
  body: string;
}

/** Split MDX source into ## heading sections for asymmetric layout. */
export function splitMdxByH2(content: string): NarrativeSection[] {
  const trimmed = content.trim();
  if (!trimmed) return [];

  const chunks = trimmed.split(/^## /m).filter((c) => c.trim().length > 0);

  return chunks.map((chunk) => {
    const lines = chunk.trim().split("\n");
    const title = lines[0].replace(/\r$/, "").trim();
    const body = lines.slice(1).join("\n").trim();
    return { title, body };
  });
}

export async function compileSections(sections: NarrativeSection[]) {
  return Promise.all(
    sections.map(async (section) => ({
      title: section.title,
      content: section.body
        ? await compileMdxContent(section.body)
        : null,
    }))
  );
}
