import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import hero from "@/assets/hero-patient.jpg";
import clinic from "@/assets/clinic.jpg";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { Card, CardContent } from "@/components/ui/card";
import {
  Ear,
  Stethoscope,
  HeadphonesIcon,
  Wrench,
  Star,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Phone,
  Bluetooth,
  BatteryCharging,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { supabase } from "@/integrations/supabase/client";
import { normalizeAid, type HearingAid } from "@/lib/hearing-aids";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura Audición · Centro audiológico premium en Lima" },
      { name: "description", content: "Evaluación auditiva gratuita, audiometría y adaptación de audífonos Oticon y Unitron. Vuelve a escuchar la vida con Aura Audición en Independencia, Lima." },
      { property: "og:title", content: "Aura Audición · Volver a escuchar la vida" },
      { property: "og:description", content: "Centro audiológico premium con tecnología Oticon y Unitron en Lima." },
      { property: "og:url", content: "https://aura-audicion.lovable.app/" },
      { name: "twitter:title", content: "Aura Audición · Volver a escuchar la vida" },
      { name: "twitter:description", content: "Centro audiológico premium con tecnología Oticon y Unitron en Lima." },
    ],
    links: [{ rel: "canonical", href: "https://aura-audicion.lovable.app/" }],
  }),
  component: Home,
});

async function fetchFeatured(): Promise<HearingAid[]> {
  const { data, error } = await supabase
    .from("hearing_aids")
    .select("id,slug,brand,model,type,short_description,bluetooth,rechargeable,main_image_url")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .limit(4);
  if (error) throw error;
  return (data ?? []).map(normalizeAid);
}

function Home() {
  const { data: featured } = useQuery({ queryKey: ["home-featured"], queryFn: fetchFeatured });

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-gradient-hero">
        <div className="absolute -top-32 -right-32 size-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-[460px] rounded-full bg-gold/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.32em] uppercase text-gold">
              <Sparkles className="size-3.5" /> Centro audiológico premium
            </span>
            <h1 className="mt-6 text-6xl sm:text-7xl lg:text-[5.5rem] font-display font-medium leading-[0.98] tracking-[-0.03em] text-foreground">
              Vuelve a<br />
              <span className="italic text-gradient-primary">escuchar</span> la vida.
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Tecnología Oticon y Unitron, evaluaciones precisas y un
              acompañamiento humano en cada paso de tu salud auditiva.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 px-6">
                <Link to="/contacto">Agenda tu evaluación <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-6 border-foreground/20 hover:bg-secondary">
                <a href={SITE.whatsapp} target="_blank" rel="noopener"><MessageCircle className="mr-1 size-4" /> WhatsApp</a>
              </Button>
            </div>
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "+15", l: "Años de experiencia" },
                { n: "+5k", l: "Pacientes atendidos" },
                { n: "2", l: "Marcas premium" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-4xl font-display text-foreground">{s.n}</div>
                  <div className="text-xs text-muted-foreground mt-1.5 tracking-wide">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-up">
            <div className="absolute -inset-8 bg-gradient-primary opacity-10 blur-3xl rounded-[3rem]" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-luxe">
              <img src={hero} alt="Paciente sonriendo con audífono moderno" width={1600} height={1200} fetchPriority="high" decoding="async" className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-soft hidden sm:block animate-float">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-primary flex items-center justify-center"><Ear className="text-primary-foreground size-5" /></div>
                <div>
                  <div className="text-sm font-semibold">Audiometría digital</div>
                  <div className="text-xs text-muted-foreground">Evaluación en 30 minutos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <div className="border-y border-border/60 overflow-hidden py-6 bg-background">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-16 items-center shrink-0">
              {["Oticon", "Unitron", "Bluetooth®", "Recargable", "Made for iPhone", "Adaptación clínica", "Garantía extendida"].map((t) => (
                <span key={t + k} className="font-display text-2xl text-foreground/40 tracking-tight">
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT SHOWCASE — Apple/Tesla style dark */}
      <section className="relative py-24 sm:py-32 bg-gradient-ink text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] noise text-white pointer-events-none" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/25 blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-[10px] tracking-[0.32em] uppercase text-gold font-semibold">Catálogo</div>
            <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.98] tracking-tight">
              Tecnología que se<br />
              <span className="italic text-white/70">siente invisible.</span>
            </h2>
            <p className="mt-6 text-white/60 text-lg font-light">
              Modelos Oticon y Unitron con inteligencia artificial, conectividad
              Bluetooth y batería recargable para todo el día.
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(featured ?? Array.from({ length: 4 })).map((a: any, i) => (
              <Link
                key={a?.id ?? i}
                to={a ? "/catalogo/$slug" : "/catalogo"}
                params={a ? { slug: a.slug } : undefined as any}
                className="group"
              >
                <div className="relative aspect-[4/5] rounded-3xl bg-gradient-product overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-500">
                  {a?.main_image_url ? (
                    <img
                      src={a.main_image_url}
                      alt={`${a.brand} ${a.model}`}
                      className="size-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="size-full bg-white/5 animate-pulse" />
                  )}
                  {a && (
                    <div className="absolute top-4 left-4 flex gap-1.5">
                      {a.bluetooth && (
                        <span className="text-[9px] font-semibold px-2 py-1 rounded-full bg-white/90 text-ink tracking-wider">BT</span>
                      )}
                      {a.rechargeable && (
                        <span className="text-[9px] font-semibold px-2 py-1 rounded-full bg-white/90 text-ink tracking-wider">RC</span>
                      )}
                    </div>
                  )}
                </div>
                {a && (
                  <div className="pt-4 px-1">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-gold/90 font-semibold">{a.brand}</div>
                    <div className="mt-1.5 font-display text-xl leading-tight">{a.model}</div>
                    <div className="mt-1 text-sm text-white/50">{a.type}</div>
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button asChild size="lg" className="bg-white text-ink hover:bg-white/90 rounded-full h-12 px-6">
              <Link to="/catalogo">Explorar el catálogo completo <ArrowRight className="ml-1 size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <Section eyebrow="Por qué elegirnos" title="Atención con estándares de clínica privada" center>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { i: ShieldCheck, t: "Diagnóstico certificado", d: "Audiometrías con equipos calibrados y protocolos clínicos." },
            { i: HeadphonesIcon, t: "Audífonos premium", d: "Distribuidor de Oticon y Unitron con tecnología de última generación." },
            { i: Stethoscope, t: "Adaptación personalizada", d: "Programación fina basada en tu estilo de vida y entorno sonoro." },
            { i: Star, t: "Seguimiento de por vida", d: "Acompañamiento continuo, limpieza, reparación y mantenimiento." },
          ].map(({ i: Icon, t, d }) => (
            <Card key={t} className="hover-lift border-border/60">
              <CardContent className="p-6">
                <div className="size-12 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4">
                  <Icon className="text-primary-foreground size-6" />
                </div>
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* TECH STRIP — interactive-looking capability chips */}
      <section className="py-20 bg-secondary/40 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[10px] tracking-[0.32em] uppercase text-gold font-semibold">Tecnología</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
              Conectividad total,<br />
              <span className="italic text-primary">un solo toque.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">
              Nuestros audífonos se conectan directo a tu smartphone, TV o
              transmisor personal, con calidad de estudio y control desde una app.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { i: Bluetooth, t: "Bluetooth LE", d: "Audio de baja latencia" },
              { i: BatteryCharging, t: "Recarga rápida", d: "24 h con una carga" },
              { i: Sparkles, t: "IA integrada", d: "Filtra ruido de fondo" },
              { i: ShieldCheck, t: "IP68", d: "Resistente a humedad" },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="rounded-2xl bg-background border border-border/60 p-5 hover-lift">
                <I className="size-6 text-primary" />
                <div className="mt-3 font-semibold">{t}</div>
                <div className="text-xs text-muted-foreground mt-1">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES preview */}
      <Section eyebrow="Servicios" title="Todo lo que tu audición necesita, en un solo lugar">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Evaluación audiológica integral",
            "Audiometría tonal y vocal",
            "Adaptación de audífonos",
            "Programación y ajuste fino",
            "Venta de audífonos premium",
            "Accesorios y conectividad",
            "Limpieza y mantenimiento",
            "Reparación técnica",
            "Asesoría familiar",
          ].map((s, i) => (
            <Card key={s} className="hover-lift">
              <CardContent className="p-6 flex items-start gap-4">
                <span className="font-display text-3xl text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-semibold">{s}</h3>
                  <Link to="/servicios" className="text-sm text-primary hover:underline mt-1 inline-flex items-center gap-1">
                    Saber más <ArrowRight className="size-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Testimonios" title="Historias que vuelven a sonar" className="bg-secondary/40" center>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "Carmen R.", t: "Volví a escuchar a mis nietos con claridad. El equipo de Aura es paciente y muy profesional.", a: "Lima" },
            { n: "Luis P.", t: "La diferencia con mis audífonos anteriores es enorme. Los ajustes son precisos y el seguimiento impecable.", a: "Independencia" },
            { n: "Marta S.", t: "Una atención cálida, instalaciones modernas y tecnología de primer nivel. Recomendado al 100%.", a: "Los Olivos" },
          ].map((t) => (
            <Card key={t.n} className="text-left hover-lift">
              <CardContent className="p-6">
                <div className="flex gap-1 text-gold mb-3">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div>
                <p className="text-foreground/80 leading-relaxed">"{t.t}"</p>
                <div className="mt-4 text-sm"><span className="font-semibold">{t.n}</span> <span className="text-muted-foreground">· {t.a}</span></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-ink p-10 sm:p-16 text-white shadow-luxe">
          <div className="absolute -top-20 -right-20 size-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[10px] tracking-[0.32em] uppercase text-gold/90 font-semibold">Evaluación gratuita</div>
              <h2 className="mt-4 text-4xl sm:text-6xl font-display leading-[1] tracking-tight">
                Agenda tu<br />
                <span className="italic text-white/70">primera cita.</span>
              </h2>
              <p className="mt-5 text-white/70 max-w-md font-light">Sin compromiso. Te explicamos paso a paso el estado de tu audición y las mejores opciones para ti.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild size="lg" className="bg-white text-ink hover:bg-white/90 rounded-full h-12 px-6"><Link to="/contacto">Agendar ahora</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full h-12 px-6">
                <a href={SITE.phoneHref}><Phone className="mr-2 size-4" />{SITE.phone}</a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Clinic */}
      <Section eyebrow="Nuestro espacio" title="Una clínica pensada para tu comodidad" className="pb-32">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-card">
            <img src={clinic} alt="Cabina audiológica Aura" width={1600} height={1000} loading="lazy" className="w-full h-auto" />
          </div>
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cabina insonorizada, equipos audiométricos calibrados y espacios pensados para
              que tu visita sea tranquila y precisa. Nuestro equipo audiológico te acompañará
              en cada etapa.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[Wrench, ShieldCheck, HeadphonesIcon, Star].map((I, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-border p-4">
                  <I className="text-primary size-5" />
                  <span className="text-sm font-medium">{["Equipos calibrados","Protocolos clínicos","Audífonos premium","Atención 5 estrellas"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
