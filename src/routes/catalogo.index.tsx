import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, ArrowRight, Bluetooth, BatteryCharging } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { normalizeAid, type HearingAid } from "@/lib/hearing-aids";
import { ProductImagePlaceholder } from "@/components/site/ProductImagePlaceholder";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/catalogo/")({
  head: () => ({
    meta: [
      { title: "Catálogo de audífonos Oticon y Unitron · Aura Audición" },
      { name: "description", content: "Catálogo premium de audífonos Oticon y Unitron: modelos BTE, MiniRITE, MiniBTE, CIC e ITC recargables, con Bluetooth y hechos a medida." },
      { property: "og:title", content: "Catálogo de Audífonos · Aura Audición" },
      { property: "og:description", content: "Explora audífonos recargables, con Bluetooth, súper potencia y a medida." },
      { property: "og:url", content: "https://aura-audicion.lovable.app/catalogo" },
    ],
    links: [{ rel: "canonical", href: "https://aura-audicion.lovable.app/catalogo" }],
  }),
  component: CatalogoPage,
});

const BRANDS = ["Todas", "Oticon", "Unitron"] as const;
const TYPES = ["Todos", "BTE", "MiniRITE", "MiniBTE", "CIC", "ITC"] as const;

const CARD_COLS = "id,slug,brand,model,type,short_description,bluetooth,rechargeable,main_image_url,sort_order,active";

async function fetchCatalog(): Promise<HearingAid[]> {
  const { data, error } = await supabase
    .from("hearing_aids")
    .select(CARD_COLS)
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(normalizeAid);
}

function CatalogoPage() {
  const { data, isLoading } = useQuery({ queryKey: ["catalog", "public"], queryFn: fetchCatalog });
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState<(typeof BRANDS)[number]>("Todas");
  const [type, setType] = useState<(typeof TYPES)[number]>("Todos");
  const [bt, setBt] = useState(false);
  const [rc, setRc] = useState(false);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((a) => {
      if (brand !== "Todas" && a.brand !== brand) return false;
      if (type !== "Todos" && !a.type.toUpperCase().includes(type)) return false;
      if (bt && !a.bluetooth) return false;
      if (rc && !a.rechargeable) return false;
      if (q && !`${a.brand} ${a.model}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [data, brand, type, bt, rc, q]);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/40 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block text-xs uppercase tracking-[0.28em] text-gold font-semibold">
            Catálogo
          </div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05] tracking-tight text-foreground">
            Audífonos que devuelven <br />
            <span className="italic text-primary">la claridad</span> a tu vida.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            Explora los modelos Oticon y Unitron que comercializamos oficialmente en nuestro centro
            audiológico. Cada equipo es adaptado y programado por especialistas.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-background/85 backdrop-blur-xl border-y border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar modelo…"
              className="pl-9 h-11 rounded-full bg-secondary/60 border-transparent focus-visible:border-primary"
            />
          </div>
          <ChipGroup value={brand} options={[...BRANDS]} onChange={(v) => setBrand(v as any)} />
          <ChipGroup value={type} options={[...TYPES]} onChange={(v) => setType(v as any)} />
          <ToggleChip active={bt} onClick={() => setBt((v) => !v)} icon={<Bluetooth className="size-3.5" />}>Bluetooth</ToggleChip>
          <ToggleChip active={rc} onClick={() => setRc((v) => !v)} icon={<BatteryCharging className="size-3.5" />}>Recargable</ToggleChip>
          <div className="ml-auto text-xs text-muted-foreground flex items-center gap-1.5">
            <Filter className="size-3.5" /> {filtered.length} modelos
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-3xl bg-secondary/40 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-lg text-muted-foreground">No encontramos modelos con esos filtros.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((a) => <CatalogCard key={a.id} a={a} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ChipGroup({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-secondary/50 p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-3.5 h-9 text-xs font-medium rounded-full transition-all ${
            value === o ? "bg-white shadow-soft text-primary" : "text-foreground/70 hover:text-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function ToggleChip({ active, onClick, children, icon }: { active: boolean; onClick: () => void; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`h-9 px-3.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all border ${
        active ? "bg-primary text-primary-foreground border-primary" : "bg-secondary/50 text-foreground/70 border-transparent hover:text-foreground"
      }`}
    >
      {icon} {children}
    </button>
  );
}

function CatalogCard({ a }: { a: HearingAid }) {
  return (
    <Link
      to="/catalogo/$slug"
      params={{ slug: a.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-border/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-card group-hover:-translate-y-1">
        {a.main_image_url ? (
          <img
            src={a.main_image_url}
            alt={`${a.brand} ${a.model}`}
            className="size-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <ProductImagePlaceholder className="size-full rounded-none" />
        )}
        <div className="absolute top-4 left-4 flex gap-1.5">
          {a.bluetooth && (
            <Badge variant="secondary" className="bg-white/90 backdrop-blur text-primary border-transparent text-[10px] font-semibold uppercase tracking-wider">BT</Badge>
          )}
          {a.rechargeable && (
            <Badge variant="secondary" className="bg-white/90 backdrop-blur text-primary border-transparent text-[10px] font-semibold uppercase tracking-wider">Recargable</Badge>
          )}
        </div>
      </div>
      <div className="pt-5 px-1">
        <div className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold">{a.brand}</div>
        <h3 className="mt-1.5 font-display text-2xl leading-tight text-foreground group-hover:text-primary transition-colors">
          {a.model}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{a.type}</p>
        {a.short_description && (
          <p className="mt-3 text-sm text-foreground/75 line-clamp-2 leading-relaxed">{a.short_description}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1 text-primary font-medium">
            Ver detalles <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// suppress unused import warning
void Button; void SITE;
