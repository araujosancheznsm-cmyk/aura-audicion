import logo from "@/assets/aura-logo.asset.json";

// Source PNG is transparent and wider than tall (~2.3:1). We drive height and
// let width flow to preserve proportions.
// variant="mono" collapses the mark to a single color via CSS filters — used on
// dark surfaces (e.g. footer) where the colored logo would fight the background.
export function Logo({
  className = "",
  size = 44,
  variant = "color",
}: {
  className?: string;
  size?: number;
  variant?: "color" | "mono";
}) {
  const monoStyle =
    variant === "mono"
      ? { filter: "brightness(0) invert(1)", opacity: 0.92 }
      : undefined;
  return (
    <img
      src={logo.url}
      alt="Aura Audición — Volver a escuchar la vida"
      height={size}
      className={`block object-contain ${className}`}
      style={{ height: size, width: "auto", ...monoStyle }}
      draggable={false}
    />
  );
}
