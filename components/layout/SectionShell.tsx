import type { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionShell({ id, children, className = "" }: SectionShellProps) {
  return (
    <section
      id={id}
      className={`section-padding container-editorial scroll-mt-20 ${className}`}
    >
      {children}
    </section>
  );
}
