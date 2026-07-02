import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Bluetooth, BatteryCharging, ShieldCheck, MessageCircle, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { normalizeAid, type HearingAid } from "@/lib/hearing-aids";
import { ProductImagePlaceholder } from "@/components/site/ProductImagePlaceholder";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/catalogo/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ").toUpperCase()} · Aura Audición` },
      { name: "description", content: "Detalle del modelo, características técnicas y solicitud de evaluación." },
    ],
  }),
  component: DetailPage,
  errorComponent: () => <ErrorState />,
  notFoundComponent: () => <ErrorState />,
});

async function fetchOne(slug: string): Promise<HearingAid | null> {
  const { data, error } = await supabase.from("hearing_aids").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? normalizeAid(data) : null;
}

async function fetchRelated(brand: string, excludeId: string): Promise<HearingAid[]> {
  const { data, error } = await supabase
    .from("hearing_aids")
    .select("*")
    .eq("active", true)
    .eq("brand", brand)
    .neq("id", excludeId)
    .limit(3);
  if (error) throw error;
  return (data ?? []).map(normalizeAid);
}

function DetailPage() {
  const { slug } = Route.useParams();
  const { data: aid, isLoading } = useQuery({ queryKey: ["aid", slug], queryFn: () => fetchOne(slug) });
  const { data: related } = useQuery({
    queryKey: ["aid-related", aid?.brand, aid?.id],
    queryFn: () => (aid ? fetchRelated(aid.brand, aid.id) : Promise.resolve([])),
    enabled: !!aid,
  });
  const [imgIdx, setImgIdx] = useState(0);

  if (isLoading) return <div className="pt-40 text-center text-muted-foreground">Cargando…</div>;
  if (!aid) throw notFound();

  const images = [aid.main_image_url, ...aid.gallery].filter(Boolean) as string[];
  const current = images[imgIdx] ?? null;

  const waUrl = `${SITE.whatsapp.split("?")[0]}?text=${encodeURIComponent(`Hola Aura, me interesa el modelo ${aid.brand} ${aid.model}. ¿Podrían darme más información?`)}`;

  return (
    <>
      <div className="pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/catalogo" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="size-4" /> Volver al catálogo
          </Link>
        </div>
      </div>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-border/40 shadow-card">
              {current ? (
                <img src={current} alt={`${aid.brand} ${aid.model}`} className="size-full object-contain p-10" />
              ) : (
                <ProductImagePlaceholder label={`${aid.brand} ${aid.model}`} className="size-full rounded-none" />
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${i === imgIdx ? "border-primary" : "border-transparent hover:border-border"}`}
                  >
                    <img src={src} alt="" className="size-full object-contain bg-white p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-gold font-semibold">{aid.brand}</div>
            <h1 className="mt-3 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-foreground">
              {aid.model}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">{aid.type}</p>

            {aid.short_description && (
              <p className="mt-8 text-xl leading-relaxed text-foreground/85">{aid.short_description}</p>
            )}

            {/* Spec chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              {aid.bluetooth && <SpecChip icon={<Bluetooth className="size-3.5" />}>Bluetooth</SpecChip>}
              {aid.rechargeable && <SpecChip icon={<BatteryCharging className="size-3.5" />}>Recargable</SpecChip>}
              {aid.warranty && <SpecChip icon={<ShieldCheck className="size-3.5" />}>Garantía {aid.warranty}</SpecChip>}
              {aid.technology && <SpecChip>{aid.technology}</SpecChip>}
              {aid.hearing_loss_level && <SpecChip>Pérdida {aid.hearing_loss_level.toLowerCase()}</SpecChip>}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground rounded-full">
                <Link to="/contacto"><Calendar className="mr-2 size-4" /> Agendar evaluación</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href={waUrl} target="_blank" rel="noopener"><MessageCircle className="mr-2 size-4" /> Solicitar información</a>
              </Button>
            </div>

            {/* Full description */}
            {aid.full_description && (
              <div className="mt-12 prose prose-neutral max-w-none">
                <h2 className="font-display text-2xl">Descripción</h2>
                <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{aid.full_description}</p>
              </div>
            )}

            {/* Benefits */}
            {aid.benefits.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl">Beneficios</h2>
                <ul className="mt-4 space-y-2">
                  {aid.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80">
                      <span className="mt-2 size-1.5 rounded-full bg-gold shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Features */}
            {aid.features.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl">Características</h2>
                <ul className="mt-4 space-y-2 text-foreground/80">
                  {aid.features.map((f, i) => <li key={i}>• {f}</li>)}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {aid.technologies.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl">Tecnologías</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {aid.technologies.map((t) => <SpecChip key={t}>{t}</SpecChip>)}
                </div>
              </div>
            )}

            {/* Accessories */}
            {aid.compatible_accessories.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl">Accesorios compatibles</h2>
                <ul className="mt-4 space-y-2 text-foreground/80">
                  {aid.compatible_accessories.map((f, i) => <li key={i}>• {f}</li>)}
                </ul>
              </div>
            )}

            {/* FAQs */}
            {aid.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl">Preguntas frecuentes</h2>
                <Accordion type="single" collapsible className="mt-4">
                  {aid.faqs.map((f, i) => (
                    <AccordionItem key={i} value={`f-${i}`}>
                      <AccordionTrigger>{f.q}</AccordionTrigger>
                      <AccordionContent>{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      {related && related.length > 0 && (
        <section className="py-16 bg-secondary/30 border-t border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-3xl">Más de {aid.brand}</h2>
              <Link to="/catalogo" className="text-sm text-primary font-medium inline-flex items-center gap-1">
                Ver todo <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} to="/catalogo/$slug" params={{ slug: r.slug }} className="group">
                  <div className="aspect-square rounded-2xl bg-white border border-border/40 overflow-hidden shadow-soft group-hover:shadow-card transition-shadow">
                    {r.main_image_url ? (
                      <img src={r.main_image_url} className="size-full object-contain p-6" alt="" />
                    ) : (
                      <ProductImagePlaceholder className="size-full rounded-none" />
                    )}
                  </div>
                  <div className="mt-3 text-[11px] uppercase tracking-widest text-gold font-semibold">{r.brand}</div>
                  <div className="font-display text-xl group-hover:text-primary">{r.model}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function SpecChip({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full bg-secondary/80 text-xs font-medium text-foreground/80">
      {icon} {children}
    </span>
  );
}

function ErrorState() {
  return (
    <div className="pt-40 pb-24 text-center">
      <h1 className="font-display text-3xl">Modelo no encontrado</h1>
      <p className="mt-3 text-muted-foreground">El audífono que buscas no está disponible.</p>
      <Button asChild className="mt-6"><Link to="/catalogo">Volver al catálogo</Link></Button>
    </div>
  );
}
