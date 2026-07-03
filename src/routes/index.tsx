import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-patient.jpg";
import clinic from "@/assets/clinic.jpg";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Ear, Stethoscope, HeadphonesIcon, Wrench, Star, ShieldCheck, Sparkles, ArrowRight, MessageCircle, Phone } from "lucide-react";

import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura Audición · Centro audiológico premium en Lima" },
      { name: "description", content: "Evaluación auditiva, audiometría y adaptación de audífonos Oticon y Unitron. Vuelve a escuchar la vida con Aura Audición en Independencia, Lima." },
      { property: "og:title", content: "Aura Audición · Volver a escuchar la vida" },
      { property: "og:description", content: "Centro audiológico premium con tecnología Oticon y Unitron." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-gradient-hero">
        <div className="absolute -top-32 -right-32 size-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-[460px] rounded-full bg-gold/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-gold">
              <Sparkles className="size-4" /> Centro audiológico premium
            </span>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-display font-medium leading-[1.02] text-foreground">
              Vuelve a <span className="text-gradient-primary">escuchar</span> la vida
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              En Aura Audición acompañamos cada paso de tu salud auditiva con
              tecnología Oticon y Unitron, evaluaciones precisas y un trato cálido.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-soft">
                <Link to="/contacto">Agenda tu evaluación <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-secondary">
                <a href={SITE.whatsapp} target="_blank" rel="noopener"><MessageCircle className="mr-1 size-4" /> WhatsApp</a>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "+15", l: "Años de experiencia" },
                { n: "+5k", l: "Pacientes atendidos" },
                { n: "2", l: "Marcas premium" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-display text-primary">{s.n}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-up">
            <div className="absolute -inset-4 bg-gradient-primary opacity-10 blur-2xl rounded-[3rem]" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-card">
              <img src={hero} alt="Paciente sonriendo con audífono moderno" width={1600} height={1200} className="w-full h-auto object-cover" />
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

      {/* TRUST */}
      <Section eyebrow="Por qué elegirnos" title="Atención auditiva con estándares de clínica privada" center>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { i: ShieldCheck, t: "Diagnóstico certificado", d: "Audiometrías con equipos calibrados y protocolos clínicos." },
            { i: HeadphonesIcon, t: "Audífonos premium", d: "Distribuidor de Oticon y Unitron con tecnología de última generación." },
            { i: Stethoscope, t: "Adaptación personalizada", d: "Programación fina basada en tu estilo de vida y entorno sonoro." },
            { i: Star, t: "Seguimiento de por vida", d: "Acompañamiento continuo, limpieza, reparación y mantenimiento." },
          ].map(({ i: Icon, t, d }) => (
            <Card key={t} className="hover-lift border-border/60">
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
      </Section>

      {/* SERVICES preview */}
      <Section eyebrow="Servicios" title="Todo lo que tu audición necesita, en un solo lugar" className="bg-secondary/40">
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

      {/* CATALOG CTA */}
      <Section eyebrow="Catálogo" title="Modelos modernos Oticon y Unitron" center>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Explora nuestra selección completa de audífonos con tecnología de última generación,
          desde soluciones invisibles hasta modelos súper potentes.
        </p>
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground">
            <Link to="/catalogo">Ver catálogo completo <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 sm:p-16 text-primary-foreground shadow-card">
          <div className="absolute -top-20 -right-20 size-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-5xl font-display leading-tight">Agenda tu evaluación auditiva gratuita</h2>
              <p className="mt-4 text-primary-foreground/85 max-w-md">Sin compromiso. Te explicamos paso a paso el estado de tu audición y las mejores opciones para ti.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90"><Link to="/contacto">Agendar ahora</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
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
