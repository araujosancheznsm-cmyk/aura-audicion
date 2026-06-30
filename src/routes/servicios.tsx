import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, AudioLines, Settings2, SlidersHorizontal, ShoppingBag, Package, Sparkles, Wrench, ShieldCheck } from "lucide-react";

const SERVICES = [
  { i: Stethoscope, t: "Evaluación audiológica", d: "Diagnóstico integral con anamnesis, otoscopía y pruebas funcionales." },
  { i: AudioLines, t: "Audiometría tonal y vocal", d: "Medición precisa de umbrales auditivos en cabina insonorizada." },
  { i: Settings2, t: "Adaptación de audífonos", d: "Selección del modelo ideal según pérdida, estilo de vida y presupuesto." },
  { i: SlidersHorizontal, t: "Programación", d: "Ajuste fino en tiempo real con software certificado de Oticon y Unitron." },
  { i: ShoppingBag, t: "Venta de audífonos", d: "Modelos premium recargables, invisibles, pediátricos y de súper potencia." },
  { i: Package, t: "Accesorios", d: "TV Connector, micrófonos remotos, cargadores, domos, filtros y más." },
  { i: Sparkles, t: "Limpieza profesional", d: "Servicio de mantenimiento preventivo para prolongar la vida útil." },
  { i: Wrench, t: "Reparación", d: "Diagnóstico técnico y reparación con repuestos originales." },
  { i: ShieldCheck, t: "Mantenimiento", d: "Planes de seguimiento programado para garantizar el mejor rendimiento." },
];

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios · Aura Audición" },
      { name: "description", content: "Evaluación audiológica, audiometría, adaptación, programación, venta, accesorios, limpieza, reparación y mantenimiento de audífonos." },
      { property: "og:title", content: "Servicios audiológicos · Aura Audición" },
      { property: "og:description", content: "Servicios completos para tu salud auditiva en Lima." },
    ],
  }),
  component: Servicios,
});

function Servicios() {
  return (
    <>
      <PageHero eyebrow="Servicios" title="Soluciones auditivas integrales">
        Acompañamiento desde el primer diagnóstico hasta el mantenimiento de por vida.
      </PageHero>
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ i: Icon, t, d }) => (
            <Card key={t} className="hover-lift">
              <CardContent className="p-6">
                <div className="size-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <Icon className="text-primary-foreground size-6" />
                </div>
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground">
            <Link to="/contacto">Agenda tu evaluación</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
