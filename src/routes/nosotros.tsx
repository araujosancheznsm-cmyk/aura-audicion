import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import clinic from "@/assets/clinic.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Compass } from "lucide-react";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros · Aura Audición" },
      { name: "description", content: "Conoce a Aura Audición: un centro audiológico premium en Lima dedicado a la salud auditiva con tecnología Oticon y Unitron." },
      { property: "og:title", content: "Nosotros · Aura Audición" },
      { property: "og:description", content: "Centro audiológico con enfoque humano y tecnología premium." },
      { property: "og:url", content: "https://aura-audicion.lovable.app/nosotros" },
    ],
    links: [{ rel: "canonical", href: "https://aura-audicion.lovable.app/nosotros" }],
  }),
  component: Nosotros,
});

function Nosotros() {
  return (
    <>
      <PageHero eyebrow="Nuestra historia" title="Cuidamos lo que más importa: tu manera de conectar con el mundo">
        Aura Audición nace con la misión de devolverle a las personas la riqueza del sonido,
        combinando tecnología premium y un acompañamiento humano de principio a fin.
      </PageHero>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-card">
            <img src={clinic} alt="Clínica Aura Audición" width={1600} height={1000} loading="lazy" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-display">Una experiencia auditiva sin precedentes</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Somos un equipo apasionado por la audiología, formado en las mejores prácticas
              clínicas y certificado por marcas líderes mundiales como Oticon y Unitron.
              Cada paciente recibe un plan personalizado, con seguimiento continuo y
              servicio post-venta de por vida.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              En nuestro espacio en Independencia, Lima, encontrarás cabinas audiométricas
              certificadas, tecnología digital de última generación y un trato cercano.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { i: Heart, t: "Misión", d: "Mejorar la calidad de vida de nuestros pacientes a través de soluciones auditivas de excelencia." },
            { i: Target, t: "Visión", d: "Ser el centro audiológico de referencia en el Perú por nuestra calidez, ética y tecnología." },
            { i: Compass, t: "Valores", d: "Empatía, transparencia, profesionalismo y compromiso con cada historia que escuchamos." },
          ].map(({ i: Icon, t, d }) => (
            <Card key={t} className="hover-lift">
              <CardContent className="p-8">
                <div className="size-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <Icon className="text-primary-foreground size-6" />
                </div>
                <h3 className="text-xl font-display">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
