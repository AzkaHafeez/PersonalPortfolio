interface TechGridProps {
  technologies: string[];
}

export function TechGrid({ technologies }: TechGridProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {technologies.map((tech) => (
        <div
          key={tech}
          className="border border-border px-4 py-3 text-center text-sm transition-colors hover:border-cherry hover:bg-lavender/20"
        >
          {tech}
        </div>
      ))}
    </div>
  );
}
