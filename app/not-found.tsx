import Link from "next/link";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <MinimalHeader />
      <main className="section-padding container-editorial flex min-h-[60vh] flex-col items-start justify-center">
        <h1 className="font-serif-display text-5xl font-bold">404</h1>
        <p className="mt-4 text-fg-muted">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="label-caps mt-8 border-b border-fg pb-1"
        >
          Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
