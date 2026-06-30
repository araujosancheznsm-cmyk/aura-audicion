import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIDS } from "@/lib/aids";
import { Battery, Bluetooth, Check, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/audifonos")({
  head: () => ({
    meta: [
      { title: "Audífonos Oticon y Unitron · Aura Audición" },
      { name: "description", content: "Catálogo de audífonos premium: Oticon Intent, Real, Own SI, Zircon, Xceed, Play PX y Unitron Vivante, Moxi V-RS, Moxi V-RT, Stride V, Insera, Max." },
      { property: "og:title", content: "Catálogo de audífonos · Aura Audición" },
      { property: "og:description", content: "Modelos modernos de Oticon y Unitron con tecnología de última generación." },
    ],
  }),
  component: Audifonos,
});

function AidCard({ a }: { a: (typeof AIDS)[number] }) {
  const requestUrl = `${SITE.whatsapp.split("?")[0]}?text=${encodeURIComponent(`Hola Aura, me interesa el modelo ${a.brand} ${a.name}.`)}`;
  return (
    <Card className="hover-lift overflow-hidden group flex flex-col">
      <div className="aspect-square bg-secondary/40 overflow-hidden">
        <img src={a.image} alt={`${a.brand} ${a.name}`} width={1024} height={1024} loading="lazy" className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <CardContent className="p-6 flex flex-col flex-1">
        <span className="text-xs uppercase tracking-widest text-gold font-semibold">{a.brand}</span>
        <h3 className="font-display text-2xl mt-1">{a.name}</h3>
        <p className="text-sm text-muted-foreground mt-2">{a.tagline}</p>
        <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{a.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {a.tech.map((t) => (
            <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">{t}</span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2"><Battery className="size-4 text-primary" /> {a.battery}</div>
          <div className="flex items-center gap-2"><Bluetooth className="size-4 text-primary" /> {a.connectivity}</div>
        </div>

        <ul className="mt-4 space-y-1.5">
          {a.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm"><Check className="size-4 text-gold mt-0.5 shrink-0" /> {b}</li>
          ))}
        </ul>

        <Button asChild className="mt-6 bg-gradient-primary text-primary-foreground">
          <a href={requestUrl} target="_blank" rel="noopener">Solicitar información <ArrowRight className="ml-1 size-4" /></a>
        </Button>
      </CardContent>
    </Card>
  );
}

function Audifonos() {
  const oticon = AIDS.filter((a) => a.brand === "Oticon");
  const unitron = AIDS.filter((a) => a.brand === "Unitron");
  return (
    <>
      <PageHero eyebrow="Catálogo" title="Audífonos modernos Oticon y Unitron">
        Selecciona el modelo ideal según tu pérdida auditiva, tu estilo de vida y tu presupuesto.
      </PageHero>

      <Section>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mx-auto flex w-fit mb-10">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="oticon">Oticon</TabsTrigger>
            <TabsTrigger value="unitron">Unitron</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AIDS.map((a) => <AidCard key={a.slug} a={a} />)}
            </div>
          </TabsContent>
          <TabsContent value="oticon">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {oticon.map((a) => <AidCard key={a.slug} a={a} />)}
            </div>
          </TabsContent>
          <TabsContent value="unitron">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {unitron.map((a) => <AidCard key={a.slug} a={a} />)}
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      {/* Comparador rápido */}
      <Section eyebrow="Comparador" title="Oticon vs Unitron" className="bg-secondary/40">
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60">
              <tr className="text-left">
                <th className="p-4 font-semibold">Característica</th>
                <th className="p-4 font-semibold">Oticon</th>
                <th className="p-4 font-semibold">Unitron</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Plataforma estrella", "Sirius / Polaris R", "Vivante"],
                ["IA propietaria", "Deep Neural Network", "Integra OS · HyperFocus"],
                ["Procesamiento del entorno", "MoreSound Intelligence", "SoundNav 4.0 · AutoFocus 360"],
                ["Conectividad", "Bluetooth LE · Auracast", "Bluetooth Multipoint · Remote Plus"],
                ["Súper potencia", "Xceed (BTE SP)", "Max (BTE SP)"],
                ["Pediátrico", "Play PX", "—"],
                ["Invisible / a medida", "Own SI", "Insera"],
              ].map((row) => (
                <tr key={row[0]} className="hover:bg-secondary/30">
                  {row.map((c, i) => <td key={i} className="p-4">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground">
            <Link to="/contacto">Asesoría personalizada</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
