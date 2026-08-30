import { ReactNode } from "react";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, subtitle, children, className = "" }: SectionProps) {
  return (
    <section className={`glass rounded-4xl p-5 shadow-glass ${className}`}>
      <div className="mb-4">
        <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-haze-400">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
