import logo from "@/assets/aura-logo.asset.json";

export function Logo({ className = "", size = 44 }: { className?: string; size?: number }) {
  return (
    <img
      src={logo.url}
      alt="Aura Audición — Volver a escuchar la vida"
      width={size}
      height={size}
      className={`logo-blend object-contain ${className}`}
      style={{ height: size, width: "auto" }}
    />
  );
}
