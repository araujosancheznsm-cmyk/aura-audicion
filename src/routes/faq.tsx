import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "¿Cuánto dura una evaluación auditiva?", a: "Entre 30 y 45 minutos. Incluye anamnesis, otoscopía y audiometría tonal y vocal en cabina." },
  { q: "¿Cuál es el costo de la evaluación?", a: "La primera evaluación es gratuita y sin compromiso. Recibirás tu informe audiológico al finalizar." },
  { q: "¿Cuánto tiempo se demora la adaptación de un audífono?", a: "El proceso inicial toma una sesión. Programamos controles a los 7, 30 y 90 días para ajustes finos." },
  { q: "¿Los audífonos tienen garantía?", a: "Sí, todos los modelos Oticon y Unitron cuentan con garantía oficial del fabricante (2 a 3 años según modelo)." },
  { q: "¿Puedo probar el audífono antes de comprarlo?", a: "Sí, ofrecemos pruebas controladas en consulta para que escuches la diferencia en distintos entornos." },
  { q: "¿Atienden a niños?", a: "Sí, contamos con protocolos pediátricos y el modelo Oticon Play PX diseñado para niños." },
  { q: "¿Hacen reparaciones?", a: "Sí, reparamos audífonos Oticon y Unitron con repuestos originales y servicio técnico certificado." },
  { q: "¿Tienen facilidades de pago?", a: "Aceptamos efectivo, tarjetas y financiamiento. Consulta con un asesor por las promociones vigentes." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Preguntas frecuentes sobre audífonos · Aura Audición" },
      { name: "description", content: "Resolvemos dudas sobre audífonos, audiometría, adaptación, garantías, reparaciones, pruebas y financiamiento en Aura Audición, Lima." },
      { property: "og:title", content: "FAQ · Aura Audición" },
      { property: "og:description", content: "Preguntas frecuentes sobre nuestros servicios audiológicos." },
      { property: "og:url", content: "https://aura-audicion.lovable.app/faq" },
    ],
    links: [{ rel: "canonical", href: "https://aura-audicion.lovable.app/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Preguntas frecuentes">
        Lo que nuestros pacientes suelen consultar antes de su primera visita.
      </PageHero>
      <Section>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="rounded-xl border border-border bg-card px-5">
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </>
  );
}
