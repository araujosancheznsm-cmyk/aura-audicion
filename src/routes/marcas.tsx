import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Network, Radar, Headphones, Focus, Zap, Radio } from "lucide-react";

export const Route = createFileRoute("/marcas")({
  head: () => ({
    meta: [
      { title: "Marcas Oticon y Unitron · Aura Audición Lima" },
      { name: "description", content: "Distribuidores oficiales de Oticon (Dinamarca) y Unitron (Canadá) en Lima. Tecnologías BrainHearing, DNN, MoreSound Intelligence, Vivante e HyperFocus." },
      { property: "og:title", content: "Marcas premium · Aura Audición" },
      { property: "og:description", content: "Oticon y Unitron con tecnología audiológica de vanguardia." },
      { property: "og:url", content: "https://aura-audicion.lovable.app/marcas" },
    ],
    links: [{ rel: "canonical", href: "https://aura-audicion.lovable.app/marcas" }],
  }),
  component: Marcas,
});

function Marcas() {
  return (
    <>
      <PageHero eyebrow="Marcas" title="Tecnología audiológica de clase mundial">
        Trabajamos exclusivamente con dos de los fabricantes más innovadores del mundo:
        Oticon (Dinamarca) y Unitron (Canadá).
      </PageHero>

      <Section>
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="hover-lift overflow-hidden">
            <CardContent className="p-10">
              <div className="text-3xl font-display tracking-tight text-primary">Oticon</div>
              <div className="text-xs uppercase tracking-widest text-gold font-semibold mt-1">Dinamarca · Desde 1904</div>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Pionera mundial en audífonos basados en el funcionamiento natural del cerebro.
                Su filosofía BrainHearing™ y la red neuronal profunda integrada definen un
                estándar nuevo en claridad y naturalidad.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {[
                  { i: Brain, t: "BrainHearing™" },
                  { i: Network, t: "Deep Neural Network" },
                  { i: Radar, t: "MoreSound Intelligence" },
                  { i: Headphones, t: "OpenSound Navigator" },
                ].map(({ i: Icon, t }) => (
                  <div key={t} className="flex items-center gap-3 rounded-xl border border-border p-4">
                    <Icon className="text-primary size-5" /> <span className="text-sm font-medium">{t}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 bg-gradient-primary text-primary-foreground btn-premium"><Link to="/catalogo" search={{ brand: "Oticon" }}>Ver modelos Oticon</Link></Button>
            </CardContent>
          </Card>
 
          <Card className="hover-lift overflow-hidden">
            <CardContent className="p-10">
              <div className="text-3xl font-display tracking-tight text-primary">Unitron</div>
              <div className="text-xs uppercase tracking-widest text-gold font-semibold mt-1">Canadá · Desde 1964</div>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Centrada en la experiencia del usuario, Unitron crea audífonos que se ajustan
                automáticamente al entorno con tecnologías como HyperFocus y AutoFocus 360,
                respaldadas por la plataforma Vivante.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {[
                  { i: Zap, t: "Vivante Platform" },
                  { i: Focus, t: "HyperFocus" },
                  { i: Radar, t: "AutoFocus 360" },
                  { i: Network, t: "SoundNav 4.0" },
                  { i: Radio, t: "Remote Plus" },
                ].map(({ i: Icon, t }) => (
                  <div key={t} className="flex items-center gap-3 rounded-xl border border-border p-4">
                    <Icon className="text-primary size-5" /> <span className="text-sm font-medium">{t}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 bg-gradient-primary text-primary-foreground btn-premium"><Link to="/catalogo" search={{ brand: "Unitron" }}>Ver modelos Unitron</Link></Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
