import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-editorial flex flex-col items-start justify-between gap-4 px-6 py-8 md:flex-row md:items-center md:px-10 lg:px-16 xl:px-24">
        <span className="font-serif-display text-lg font-bold">{siteConfig.name}</span>
        <span className="label-caps">© {new Date().getFullYear()}</span>
        <span className="text-sm text-fg-muted">Crafted with intention</span>
      </div>
    </footer>
  );
}
