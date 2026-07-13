import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "./mdx-components";

export async function compileMdxContent(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });
  return content;
}
