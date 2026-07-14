import { siteConfig } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border">
      <div className="container-editorial flex flex-col items-start justify-between gap-4 px-6 py-10 md:flex-row md:items-center md:px-10 lg:px-16 xl:px-24">
        <p className="text-sm text-fg-muted">
          Designed &amp; Developed by {siteConfig.fullName}
        </p>
        <span className="label-caps">{year}</span>
      </div>
    </footer>
  );
}
