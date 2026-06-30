import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  center = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || subtitle) && (
          <div className={`max-w-3xl mb-12 ${center ? "mx-auto text-center" : ""}`}>
            {eyebrow && (
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-3xl sm:text-5xl font-display font-medium text-foreground leading-tight">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
