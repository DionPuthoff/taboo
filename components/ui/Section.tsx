import { ReactNode } from "react";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
}

export function Section({ title, subtitle, children, className = "", headerRight }: SectionProps) {
  return (
    <section className={`glass rounded-4xl p-5 shadow-glass ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-haze-400">{subtitle}</p>}
        </div>
        {headerRight}
      </div>
      {children}
    </section>
  );
}
