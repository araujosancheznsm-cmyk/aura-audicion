import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative pt-40 pb-20 bg-gradient-hero overflow-hidden">
      <div className="absolute -top-40 -right-32 size-[480px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-[420px] rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
        {eyebrow && <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold">{eyebrow}</span>}
        <h1 className="mt-3 text-4xl sm:text-6xl font-display font-medium text-foreground leading-[1.05]">
          {title}
        </h1>
        {children && <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">{children}</p>}
      </div>
    </section>
  );
}
