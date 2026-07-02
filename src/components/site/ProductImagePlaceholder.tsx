import { Ear } from "lucide-react";

export function ProductImagePlaceholder({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-secondary/60 via-white to-secondary/40 border border-border/60 ${className}`}
    >
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_60%)] pointer-events-none" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <div className="size-16 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-soft">
          <Ear className="size-7 text-primary/70" strokeWidth={1.4} />
        </div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/80 font-medium">
          Fotografía en preparación
        </div>
        {label ? <div className="text-sm font-medium text-foreground/70">{label}</div> : null}
      </div>
    </div>
  );
}
