import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Bluetooth,
  BatteryCharging,
  ShieldCheck,
  MessageCircle,
  Calendar,
  Expand,
  Sparkles,
  CheckCircle2,
  Layers,
  Ear,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { normalizeAid, type HearingAid } from "@/lib/hearing-aids";
import { ProductImagePlaceholder } from "@/components/site/ProductImagePlaceholder";
import { Lightbox } from "@/components/site/Lightbox";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/catalogo/$slug")({
  head: ({ params }) => {
    const pretty = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const title = `${pretty} · Audífono premium · Aura Audición`;
    const description = `Conoce el audífono ${pretty}: características, tecnología, conectividad y garantía. Solicita tu evaluación gratuita en Aura Audición, Lima.`;
    const url = `https://aura-audicion.lovable.app/catalogo/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
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
    .select("id,slug,brand,model,type,main_image_url")
    .eq("active", true)
    .eq("brand", brand)
    .neq("id", excludeId)
    .limit(4);
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
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-3xl bg-secondary/60 animate-pulse" />
          <div className="space-y-4">
            <div className="h-4 w-24 bg-secondary/60 rounded animate-pulse" />
            <div className="h-12 w-3/4 bg-secondary/60 rounded animate-pulse" />
            <div className="h-4 w-full bg-secondary/60 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-secondary/60 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }
  if (!aid) throw notFound();

  const images = [aid.main_image_url, ...aid.gallery].filter(Boolean) as string[];
  const current = images[imgIdx] ?? null;

  const waUrl = `${SITE.whatsapp.split("?")[0]}?text=${encodeURIComponent(
    `Hola Aura, me interesa el modelo ${aid.brand} ${aid.model}. ¿Podrían darme más información?`,
  )}`;

  const specs = [
    { label: "Marca", value: aid.brand },
    { label: "Modelo", value: aid.model },
    { label: "Tipo", value: aid.type },
    aid.technology && { label: "Tecnología", value: aid.technology },
    aid.hearing_loss_level && { label: "Pérdida", value: aid.hearing_loss_level },
    aid.color && { label: "Color", value: aid.color },
    { label: "Bluetooth", value: aid.bluetooth ? "Sí" : "No" },
    { label: "Recargable", value: aid.rechargeable ? "Sí" : "No" },
    { label: "Garantía", value: aid.warranty },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-28 pb-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition"
          >
            <ArrowLeft className="size-4" /> Catálogo
          </Link>
        </div>
      </div>

      {/* HERO — Apple product layout with fully integrated image */}
      <section className="pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Gallery column — image floats freely, no card frame */}
          <div className="lg:sticky lg:top-24 animate-fade-up">
            <div className="relative group aspect-square flex items-center justify-center">
              {/* Ambient glow behind the product */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/5 h-6 rounded-full bg-ink/25 blur-2xl" />

              {current ? (
                <img
                  key={current}
                  src={current}
                  alt={`${aid.brand} ${aid.model}`}
                  className="relative z-10 max-w-[86%] max-h-[86%] object-contain animate-zoom-fade cursor-zoom-in transition-transform duration-[900ms] ease-apple group-hover:scale-[1.04] group-hover:-translate-y-1 drop-shadow-product"
                  onClick={() => setLightbox(imgIdx)}
                />
              ) : (
                <ProductImagePlaceholder label={`${aid.brand} ${aid.model}`} className="size-full rounded-none" />
              )}

              {images.length > 0 && (
                <button
                  onClick={() => setLightbox(imgIdx)}
                  className="absolute top-2 right-2 size-11 rounded-full glass hover:bg-white transition-all duration-500 ease-apple flex items-center justify-center text-primary shadow-soft z-20 opacity-0 group-hover:opacity-100"
                  aria-label="Ampliar imagen"
                >
                  <Expand className="size-4" />
                </button>
              )}
              {aid.brand && (
                <div className="absolute top-3 left-3 text-[10px] tracking-[0.32em] uppercase font-semibold text-ink/40 z-20">
                  {aid.brand}
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-5 flex flex-wrap gap-3 justify-center">
                {images.slice(0, 6).map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`size-16 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-500 ease-apple ${
                      i === imgIdx ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105" : "opacity-60 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img src={src} alt="" className="max-w-full max-h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
            {images.length > 1 && (
              <button
                onClick={() => setLightbox(0)}
                className="mt-4 mx-auto flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-500 ease-apple"
              >
                Ver las {images.length} fotos <ArrowRight className="size-4" />
              </button>
            )}
          </div>

          {/* Info column */}
          <div className="animate-fade-up">
            <div className="text-xs uppercase tracking-[0.32em] text-gold font-semibold">{aid.brand}</div>
            <h1 className="mt-3 font-editorial text-6xl md:text-7xl leading-[0.95] tracking-tight text-foreground">
              {aid.model}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground italic font-editorial">{aid.type}</p>

            {aid.short_description && (
              <p className="mt-8 text-xl leading-relaxed text-foreground/85 font-light">
                {aid.short_description}
              </p>
            )}

            {/* Spec chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              {aid.bluetooth && <SpecChip icon={<Bluetooth className="size-3.5" />}>Bluetooth</SpecChip>}
              {aid.rechargeable && <SpecChip icon={<BatteryCharging className="size-3.5" />}>Recargable</SpecChip>}
              {aid.warranty && <SpecChip icon={<ShieldCheck className="size-3.5" />}>Garantía {aid.warranty}</SpecChip>}
              {aid.technology && <SpecChip>{aid.technology}</SpecChip>}
              {aid.hearing_loss_level && <SpecChip>Pérdida {aid.hearing_loss_level.toLowerCase()}</SpecChip>}
            </div>

            {/* CTA card */}
            <div className="mt-10 rounded-3xl border border-border/60 bg-gradient-to-br from-secondary/40 to-transparent p-6">
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="size-4 text-gold" />
                <span className="font-medium">Evaluación auditiva gratuita</span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Te acompañamos en la adaptación y programación fina de tu audífono.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground rounded-full shadow-soft hover:scale-[1.03] transition-transform duration-500 ease-apple">
                  <Link to="/contacto">
                    <Calendar className="mr-2 size-4" /> Agendar evaluación
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-border/80 hover:scale-[1.03] transition-transform duration-500 ease-apple">
                  <a href={waUrl} target="_blank" rel="noopener">
                    <MessageCircle className="mr-2 size-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { i: Ear, t: "Adaptación", d: "personalizada" },
                { i: ShieldCheck, t: "Garantía", d: aid.warranty },
                { i: Layers, t: "Soporte", d: "de por vida" },
              ].map(({ i: Icon, t, d }) => (
                <div key={t} className="rounded-2xl bg-secondary/40 border border-border/40 p-4 hover:-translate-y-1 hover:shadow-soft transition-all duration-500 ease-apple">
                  <Icon className="size-5 text-primary" />
                  <div className="mt-2 text-sm font-semibold">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO SHOWCASE — full gallery display */}
      {images.length > 1 && (
        <section className="py-20 bg-gradient-ink text-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="text-[10px] tracking-[0.32em] uppercase text-gold/90 font-semibold">Galería</div>
                <h2 className="mt-3 font-editorial text-5xl md:text-6xl leading-[0.98]">
                  Cada detalle,<br />
                  <span className="italic text-white/60">en primer plano.</span>
                </h2>
              </div>
              <div className="hidden md:block text-sm text-white/60">
                Toca cualquier foto para ampliarla
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 auto-rows-[280px] md:auto-rows-[360px]">
              {images.map((src, i) => {
                const big = i === 0;
                return (
                  <button
                    key={i}
                    onClick={() => setLightbox(i)}
                    className={`group relative flex items-center justify-center overflow-visible transition-all duration-700 ease-apple ${
                      big ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  >
                    <div className="absolute inset-6 rounded-full bg-primary/20 blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-5 rounded-full bg-black/60 blur-2xl" />
                    <img
                      src={src}
                      alt={`${aid.brand} ${aid.model} — vista ${i + 1}`}
                      className="relative z-10 max-w-[82%] max-h-[82%] object-contain transition-transform duration-[900ms] ease-apple group-hover:scale-[1.06] group-hover:-translate-y-1 drop-shadow-product-dark"
                    />
                    <div className="absolute bottom-3 right-3 size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <Expand className="size-4 text-white" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* DESCRIPTION + BENEFITS */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {aid.full_description && (
              <>
                <div className="text-[10px] tracking-[0.32em] uppercase text-gold font-semibold">Descripción</div>
                <h2 className="mt-3 font-editorial text-5xl md:text-6xl leading-[1.0]">
                  Diseñado para <span className="italic text-primary">escucharlo todo</span>.
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-foreground/80 whitespace-pre-line font-light">
                  {aid.full_description}
                </p>
              </>
            )}

            {aid.features.length > 0 && (
              <div className="mt-16">
                <h3 className="font-display text-2xl">Características</h3>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {aid.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80">
                      <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {aid.technologies.length > 0 && (
              <div className="mt-16">
                <h3 className="font-display text-2xl">Tecnologías</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {aid.technologies.map((t) => (
                    <SpecChip key={t}>{t}</SpecChip>
                  ))}
                </div>
              </div>
            )}

            {aid.compatible_accessories.length > 0 && (
              <div className="mt-16">
                <h3 className="font-display text-2xl">Accesorios compatibles</h3>
                <ul className="mt-6 space-y-2 text-foreground/80">
                  {aid.compatible_accessories.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-gold shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar: benefits + specs */}
          <aside className="space-y-8 lg:sticky lg:top-24 h-fit">
            {aid.benefits.length > 0 && (
              <div className="rounded-3xl border border-border/60 p-6 bg-secondary/30">
                <h3 className="font-display text-xl">Beneficios</h3>
                <ul className="mt-4 space-y-3">
                  {aid.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                      <span className="mt-1.5 size-1.5 rounded-full bg-gold shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-3xl border border-border/60 p-6">
              <h3 className="font-display text-xl">Especificaciones</h3>
              <dl className="mt-4 divide-y divide-border/60">
                {specs.map((s) => (
                  <div key={s.label} className="py-2.5 flex items-center justify-between text-sm">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="font-medium text-foreground text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQs */}
      {aid.faqs.length > 0 && (
        <section className="py-20 bg-secondary/30 border-t border-border/40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-[10px] tracking-[0.32em] uppercase text-gold font-semibold">Preguntas frecuentes</div>
              <h2 className="mt-3 font-editorial text-5xl md:text-6xl italic">Antes de decidir</h2>
            </div>
            <Accordion type="single" collapsible className="mt-10">
              {aid.faqs.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`} className="border-border/60">
                  <AccordionTrigger className="text-left font-display text-lg">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/80 leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Related */}
      {related && related.length > 0 && (
        <section className="py-20 border-t border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="text-[10px] tracking-[0.32em] uppercase text-gold font-semibold">
                  Más de {aid.brand}
                </div>
                <h2 className="mt-3 font-editorial text-4xl md:text-5xl">También podrías considerar</h2>
              </div>
              <Link to="/catalogo" className="text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                Ver todo <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((r) => (
                <Link key={r.id} to="/catalogo/$slug" params={{ slug: r.slug }} className="group">
                  <div className="relative aspect-square flex items-center justify-center overflow-visible transition-all duration-700 ease-apple group-hover:-translate-y-2">
                    <div className="absolute inset-6 rounded-full bg-primary/10 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-4 rounded-full bg-ink/25 blur-xl" />
                    {r.main_image_url ? (
                      <img src={r.main_image_url} className="relative z-10 max-w-[80%] max-h-[80%] object-contain drop-shadow-product transition-transform duration-700 ease-apple group-hover:scale-[1.05]" alt="" />
                    ) : (
                      <ProductImagePlaceholder className="size-full rounded-3xl" />
                    )}
                  </div>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.28em] text-gold font-semibold">{r.brand}</div>
                  <div className="mt-1 font-editorial text-xl group-hover:text-primary transition-colors">{r.model}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {lightbox !== null && images.length > 0 && (
        <Lightbox
          images={images}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndex={setLightbox}
          alt={`${aid.brand} ${aid.model}`}
        />
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
      <Button asChild className="mt-6">
        <Link to="/catalogo">Volver al catálogo</Link>
      </Button>
    </div>
  );
}
