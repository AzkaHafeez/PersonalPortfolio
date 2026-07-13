interface SectionLabelProps {
  number: string;
  label: string;
}

export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="label-caps">{number}</span>
      <span className="h-px w-8 bg-border" />
      <span className="label-caps">{label}</span>
    </div>
  );
}
