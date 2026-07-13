# Project images

Each case study expects **at least 4 screenshots** plus a cover:

```
{slug}-cover.svg|.jpg|.png   → coverImage
{slug}-1 … {slug}-4          → images[] gallery (2×2)
```

Example frontmatter in `content/projects/{slug}.mdx`:

```yaml
coverImage: /images/projects/eventhub-cover.jpg
images:
  - src: /images/projects/eventhub-1.jpg
    alt: Dashboard overview
  - src: /images/projects/eventhub-2.jpg
    alt: Societies list
  - src: /images/projects/eventhub-3.jpg
    alt: Event detail
  - src: /images/projects/eventhub-4.jpg
    alt: Admin panel
```

Placeholder SVGs ship for every project so galleries render immediately.
Replace them with real screenshots using the same filenames (or update the paths in MDX).
