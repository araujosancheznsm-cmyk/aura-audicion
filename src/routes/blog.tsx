import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Card, CardContent } from "@/components/ui/card";

const POSTS = [
  {
    t: "5 señales tempranas de pérdida auditiva que no debes ignorar",
    e: "Subir el volumen, pedir que te repitan o evitar reuniones pueden ser síntomas iniciales.",
    d: "15 jun 2026",
    c: "Salud auditiva",
  },
  {
    t: "Audífonos recargables: ventajas y mitos",
    e: "Comparamos autonomía, costo a largo plazo y comodidad frente a los modelos a pila.",
    d: "02 jun 2026",
    c: "Tecnología",
  },
  {
    t: "BrainHearing™: cómo el cerebro vuelve a procesar el sonido",
    e: "La filosofía detrás de los audífonos Oticon explicada paso a paso.",
    d: "20 may 2026",
    c: "Oticon",
  },
  {
    t: "Vivante de Unitron: la plataforma que escucha por ti",
    e: "HyperFocus, AutoFocus 360 y SoundNav 4.0 trabajando juntos en tiempo real.",
    d: "08 may 2026",
    c: "Unitron",
  },
  {
    t: "Cuidado diario de tus audífonos en climas húmedos",
    e: "Buenas prácticas, kits de limpieza y deshumidificadores para Lima.",
    d: "24 abr 2026",
    c: "Mantenimiento",
  },
  {
    t: "Audífonos para niños: lo que toda familia debe saber",
    e: "Adaptación pediátrica con Oticon Play PX y conectividad en el aula.",
    d: "10 abr 2026",
    c: "Pediatría",
  },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog de salud auditiva y audífonos · Aura Audición" },
      { name: "description", content: "Artículos sobre pérdida auditiva, audiometría, tecnologías Oticon y Unitron, cuidado de audífonos y consejos de salud auditiva." },
      { property: "og:title", content: "Blog · Aura Audición" },
      { property: "og:description", content: "Consejos y tecnología en salud auditiva." },
      { property: "og:url", content: "https://aura-audicion.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://aura-audicion.lovable.app/blog" }],
  }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Salud auditiva, en palabras claras">
        Artículos cortos sobre tecnología, cuidados y novedades en audiología.
      </PageHero>
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <Card key={p.t} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-semibold">{p.c}</span>
                  <span className="text-muted-foreground">{p.d}</span>
                </div>
                <h3 className="mt-4 font-display text-xl leading-snug">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.e}</p>
                <button className="mt-4 text-sm text-primary font-medium hover:underline">Leer artículo →</button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
