import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Card, CardContent } from "@/components/ui/card";
import accessoriesImg from "@/assets/accessories.jpg";
import { BatteryCharging, CircleDot, Filter, Ear, Sparkles, Tv, Mic, Briefcase } from "lucide-react";

const ITEMS = [
  { i: BatteryCharging, t: "Cargadores", d: "Estaciones de carga inalámbrica y portátiles para todos los modelos recargables." },
  { i: CircleDot, t: "Domos", d: "Domos de silicona en distintos tamaños y aperturas para máximo confort." },
  { i: Filter, t: "Filtros antiparásitos", d: "Filtros de cera originales que protegen el receptor del audífono." },
  { i: Ear, t: "Moldes a medida", d: "Moldes personalizados fabricados a partir de impresión 3D." },
  { i: Sparkles, t: "Kits de limpieza", d: "Cepillos, herramientas multipropósito y pastillas deshumidificadoras." },
  { i: Tv, t: "TV Connector", d: "Streaming directo del televisor al audífono en estéreo de alta calidad." },
  { i: Mic, t: "Micrófonos remotos", d: "Oticon ConnectClip y Unitron Remote Plus para conversaciones a distancia." },
  { i: Briefcase, t: "Estuches", d: "Estuches rígidos y deshumidificadores para conservar tus audífonos." },
];

export const Route = createFileRoute("/accesorios")({
  head: () => ({
    meta: [
      { title: "Accesorios para audífonos Oticon y Unitron · Aura" },
      { name: "description", content: "Cargadores, domos, filtros, moldes a medida, kits de limpieza, TV Connector, micrófonos remotos y estuches para audífonos Oticon y Unitron." },
      { property: "og:title", content: "Accesorios para audífonos · Aura Audición" },
      { property: "og:description", content: "Todo lo que necesitas para sacar el máximo a tus audífonos." },
      { property: "og:url", content: "https://aura-audicion.lovable.app/accesorios" },
    ],
    links: [{ rel: "canonical", href: "https://aura-audicion.lovable.app/accesorios" }],
  }),
  component: Accesorios,
});

function Accesorios() {
  return (
    <>
      <PageHero eyebrow="Accesorios" title="Saca el máximo provecho a tus audífonos">
        Productos originales y consumibles seleccionados por audiólogos.
      </PageHero>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-3xl overflow-hidden shadow-card">
            <img src={accessoriesImg} alt="Accesorios para audífonos" width={1600} height={1000} loading="lazy" />
          </div>
          <div>
            <h2 className="text-3xl font-display">Conectividad y cuidado en un solo lugar</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              En Aura Audición contamos con stock permanente de accesorios originales para
              Oticon y Unitron. Te asesoramos para elegir lo más conveniente según tu modelo.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map(({ i: Icon, t, d }) => (
            <Card key={t} className="hover-lift">
              <CardContent className="p-6">
                <div className="size-11 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <Icon className="text-primary-foreground size-5" />
                </div>
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
