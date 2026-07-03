import logo from "@/assets/aura-logo.asset.json";

// The source PNG is transparent and wider than tall (~2.3:1), so we drive height
// and let width flow naturally to preserve the mark's proportions.
export function Logo({ className = "", size = 44 }: { className?: string; size?: number }) {
  return (
    <img
      src={logo.url}
      alt="Aura Audición — Volver a escuchar la vida"
      height={size}
      className={`block object-contain ${className}`}
      style={{ height: size, width: "auto" }}
      draggable={false}
    />
  );
}
