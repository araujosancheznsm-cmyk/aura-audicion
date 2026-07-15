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
      {/* HERO — full viewport, image background with text overlay */}
      <section className="relative min-h-[75svh] overflow-hidden flex items-center">
        {/* Background image */}
        <img
          src="/hero-couple.jpg"
          alt="Pareja adulta recuperando su calidad de vida auditiva"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[60%_center]"
        />

        {/* Gradient overlay — lighter, left side only */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08192b]/60 via-[#08192b]/25 to-transparent" />
        {/* Subtle bottom vignette */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#08192b]/30 to-transparent" />

        {/* Content */}
        <div className="relative w-full mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-24">
          <div className="max-w-[520px] animate-fade-up">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.32em] uppercase text-gold">
              <Sparkles className="size-3.5" /> Centro audiológico premium
            </span>

            <h1 className="mt-7 font-display font-medium leading-[0.88] tracking-[-0.04em] text-white
                           text-[3.8rem] sm:text-[5rem] lg:text-[6.5rem]">
              Vuelve a<br />
              <em className="not-italic"
                style={{ background: "linear-gradient(135deg,#7EC8D8 0%,#A8D5E2 100%)",
                         WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                         backgroundClip: "text" }}>
                escuchar
              </em><br />
              la vida.
            </h1>

            <p className="mt-8 text-base sm:text-lg text-white/75 max-w-[400px] leading-relaxed">
              Tecnología Oticon y Unitron, evaluaciones precisas y un
              acompañamiento humano en cada paso de tu salud auditiva.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg"
                className="bg-white text-[#08192b] hover:bg-white/90 rounded-full h-12 px-8 text-[15px] font-semibold shadow-luxe">
                <Link to="/contacto">Agenda tu evaluación <ArrowRight className="ml-1.5 size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline"
                className="rounded-full h-12 px-8 border-white/70 text-white bg-white/15 hover:bg-white/25 transition-all duration-500 text-[15px] backdrop-blur-sm">
                <a href={SITE.whatsapp} target="_blank" rel="noopener">
                  <MessageCircle className="mr-1.5 size-4" /> WhatsApp
                </a>
              </Button>
            </div>

            <div className="mt-16 flex gap-10">
              {[
                { n: "+15", l: "Años de experiencia" },
                { n: "+5k", l: "Pacientes atendidos" },
                { n: "2",   l: "Marcas premium" },
              ].map((s) => (
                <div key={s.l} className="border-l border-white/20 pl-5 first:border-l-0 first:pl-0">
                  <div className="text-4xl font-display text-white font-semibold">{s.n}</div>
                  <div className="text-xs text-white/55 mt-1.5 leading-tight">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <div className="border-y border-border/70 overflow-hidden py-5 bg-background">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-16 items-center shrink-0">
              {["Oticon", "Unitron", "Bluetooth®", "Recargable", "Made for iPhone", "Adaptación clínica", "Garantía extendida"].map((t) => (
                <span key={t + k} className="font-display text-xl text-foreground/65 tracking-tight transition-colors duration-500 hover:text-primary">
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT SHOWCASE */}
      <section className="relative py-32 sm:py-40 bg-gradient-ink text-white overflow-hidden reveal">
        <div className="absolute inset-0 opacity-[0.04] noise text-white pointer-events-none" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/25 blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-[10px] tracking-[0.32em] uppercase text-gold font-semibold">Catálogo</div>
            <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[0.94] tracking-[-0.03em]">
              Tecnología que se<br />
              <span className="italic text-white/70">siente invisible.</span>
            </h2>
            <p className="mt-8 text-white/60 text-lg font-light leading-relaxed max-w-xl mx-auto">
              Modelos Oticon y Unitron con inteligencia artificial, conectividad
              Bluetooth y batería recargable para todo el día.
            </p>
          </div>

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(featured ?? Array.from({ length: 4 })).map((a: any, i) => (
              <Link
                key={a?.id ?? i}
                to={a ? "/catalogo/$slug" : "/catalogo"}
                params={a ? { slug: a.slug } : undefined as any}
                className="group"
              >
                <div className="relative aspect-[4/5] rounded-3xl bg-gradient-product overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-700">
                  <div className="absolute inset-10 rounded-full bg-primary/25 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  {a?.main_image_url ? (
                    <img
                      src={a.main_image_url}
                      alt={`${a.brand} ${a.model}`}
                      className="relative z-10 size-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="size-full bg-white/5 animate-pulse" />
                  )}
                  {a && (
                    <div className="absolute top-4 left-4 flex gap-1.5 z-20">
                      {a.bluetooth && (
                        <span className="text-[9px] font-semibold px-2 py-1 rounded-full bg-white/90 text-ink tracking-wider shadow-soft">BT</span>
                      )}
                      {a.rechargeable && (
                        <span className="text-[9px] font-semibold px-2 py-1 rounded-full bg-white/90 text-ink tracking-wider shadow-soft">RC</span>
                      )}
                    </div>
                  )}
                </div>
                {a && (
                  <div className="pt-5 px-1">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-gold/90 font-semibold">{a.brand}</div>
                    <div className="mt-1.5 font-display text-xl leading-tight transition-colors duration-500 group-hover:text-primary-light">{a.model}</div>
                    <div className="mt-1 text-sm text-white/50">{a.type}</div>
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-white text-ink hover:bg-white/90 rounded-full h-12 px-8 btn-premium">
              <Link to="/catalogo">Explorar el catálogo completo <ArrowRight className="ml-1 size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <Section eyebrow="Por qué elegirnos" title="Atención con estándares de clínica privada" center className="reveal-soft">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { i: ShieldCheck,    t: "Diagnóstico certificado",  d: "Audiometrías con equipos calibrados y protocolos clínicos." },
            { i: HeadphonesIcon, t: "Audífonos premium",        d: "Distribuidor de Oticon y Unitron con tecnología de última generación." },
            { i: Stethoscope,    t: "Adaptación personalizada", d: "Programación fina basada en tu estilo de vida y entorno sonoro." },
            { i: Star,           t: "Seguimiento de por vida",  d: "Acompañamiento continuo, limpieza, reparación y mantenimiento." },
          ].map(({ i: Icon, t, d }) => (
            <Card key={t} className="hover-lift border-border/60 group">
              <CardContent className="p-8">
                <div className="size-12 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 transition-transform duration-700 group-hover:scale-110">
                  <Icon className="text-primary-foreground size-6" />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-500">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* TECH STRIP */}
      <section className="py-28 bg-secondary/40 border-y border-border/60 reveal">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[10px] tracking-[0.32em] uppercase text-gold font-semibold">Tecnología</div>
            <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.0] tracking-[-0.03em]">
              Conectividad total,<br />
              <span className="italic text-primary">un solo toque.</span>
            </h2>
            <p className="mt-8 text-muted-foreground leading-relaxed max-w-lg">
              Nuestros audífonos se conectan directo a tu smartphone, TV o
              transmisor personal, con calidad de estudio y control desde una app.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { i: Bluetooth,      t: "Bluetooth LE",  d: "Audio de baja latencia" },
              { i: BatteryCharging,t: "Recarga rápida", d: "24 h con una carga" },
              { i: Sparkles,       t: "IA integrada",  d: "Filtra ruido de fondo" },
              { i: ShieldCheck,    t: "IP68",          d: "Resistente a humedad" },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="rounded-2xl bg-background border border-border/60 p-6 hover-lift group">
                <I className="size-6 text-primary transition-transform duration-700 group-hover:scale-110" />
                <div className="mt-4 font-semibold group-hover:text-primary transition-colors duration-500">{t}</div>
                <div className="text-xs text-muted-foreground mt-1.5">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES preview */}
      <Section eyebrow="Servicios" title="Todo lo que tu audición necesita, en un solo lugar" className="reveal-soft">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Video otoscopia",
            "Audiometría",
            "Logoaudiometría",
            "Adaptación de audífonos",
            "Programación y ajuste fino",
            "Venta de audífonos premium",
            "Accesorios y conectividad",
            "Limpieza y mantenimiento",
            "Reparación técnica",
          ].map((s, i) => (
            <Card key={s} className="hover-lift group">
              <CardContent className="p-8 flex items-start gap-5">
                <span className="font-display text-3xl text-gold/70 transition-transform duration-700 group-hover:scale-110 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors duration-500">{s}</h3>
                  <Link to="/servicios" className="text-sm text-primary hover:underline mt-2 inline-flex items-center gap-1">
                    Saber más <ArrowRight className="size-3 transition-transform duration-500 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Testimonios" title="Historias que vuelven a sonar" className="bg-secondary/40 reveal-soft" center>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "Carmen R.", t: "Volví a escuchar a mis nietos con claridad. El equipo de Aura es paciente y muy profesional.", a: "Lima" },
            { n: "Luis P.",   t: "La diferencia con mis audífonos anteriores es enorme. Los ajustes son precisos y el seguimiento impecable.", a: "Independencia" },
            { n: "Marta S.",  t: "Una atención cálida, instalaciones modernas y tecnología de primer nivel. Recomendado al 100%.", a: "Los Olivos" },
          ].map((t) => (
            <Card key={t.n} className="text-left hover-lift group">
              <CardContent className="p-8">
                <div className="flex gap-1 text-gold mb-4 transition-transform duration-700 group-hover:scale-102">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div>
                <p className="text-foreground/80 leading-relaxed text-[15px]">"{t.t}"</p>
                <div className="mt-6 text-sm"><span className="font-semibold group-hover:text-primary transition-colors duration-500">{t.n}</span> <span className="text-muted-foreground">· {t.a}</span></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="reveal-soft">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-ink p-12 sm:p-20 text-white shadow-luxe">
          <div className="absolute -top-20 -right-20 size-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[10px] tracking-[0.32em] uppercase text-gold/90 font-semibold">Evaluación gratuita</div>
              <h2 className="mt-5 text-5xl sm:text-6xl font-display leading-[0.95] tracking-[-0.03em]">
                Agenda tu<br />
                <span className="italic text-white/70">primera cita.</span>
              </h2>
              <p className="mt-7 text-white/70 max-w-md font-light leading-relaxed">Sin compromiso. Te explicamos paso a paso el estado de tu audición y las mejores opciones para ti.</p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Button asChild size="lg" className="bg-white text-ink hover:bg-white/90 rounded-full h-13 px-8 btn-premium text-[15px]"><Link to="/contacto">Agendar ahora</Link></Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Clinic */}
      <Section eyebrow="Nuestro espacio" title="Una clínica pensada para tu comodidad" className="pb-40 reveal-soft">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="rounded-2xl overflow-hidden shadow-card transition-all duration-700 hover:shadow-luxe hover:-translate-y-1">
            <img src={clinic} alt="Cabina audiológica Aura" width={1600} height={1000} loading="lazy" className="w-full h-auto transition-transform duration-[2s] hover:scale-[1.03]" />
          </div>
          <div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Cabina insonorizada, equipos audiométricos calibrados y espacios pensados para
              que tu visita sea tranquila y precisa. Nuestro equipo audiológico te acompañará
              en cada etapa.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {[Wrench, ShieldCheck, HeadphonesIcon, Star].map((I, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-border p-5 hover:border-primary/50 transition-colors duration-500 group">
                  <I className="text-primary size-5 transition-transform duration-700 group-hover:rotate-12 shrink-0" />
                  <span className="text-sm font-medium group-hover:text-primary transition-colors duration-500">{["Equipos calibrados","Protocolos clínicos","Audífonos premium","Atención 5 estrellas"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
