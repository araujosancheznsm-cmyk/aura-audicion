import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, MapPin, Clock, Mail, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre").max(100),
  phone: z.string().trim().min(7, "Teléfono inválido").max(20),
  email: z.string().trim().email("Correo inválido").max(255).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Cuéntanos brevemente").max(1000),
});

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y evaluación auditiva gratuita · Aura Audición" },
      { name: "description", content: "Agenda tu evaluación auditiva en Aura Audición, Las Violetas 626, Independencia, Lima. Llámanos al +51 922 400 040 o escríbenos por WhatsApp." },
      { property: "og:title", content: "Contacto · Aura Audición" },
      { property: "og:description", content: "Agenda tu evaluación auditiva gratuita en Independencia, Lima." },
      { property: "og:url", content: "https://aura-audicion.lovable.app/contacto" },
    ],
    links: [{ rel: "canonical", href: "https://aura-audicion.lovable.app/contacto" }],
  }),
  component: Contacto,
});

function Contacto() {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email") ?? "",
      message: form.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisa los datos");
      return;
    }
    setLoading(true);
    const text = `Hola Aura Audición, soy ${parsed.data.name}.\nTeléfono: ${parsed.data.phone}\n${parsed.data.email ? "Correo: " + parsed.data.email + "\n" : ""}Mensaje: ${parsed.data.message}`;
    const url = `${SITE.whatsapp.split("?")[0]}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
    setTimeout(() => {
      setLoading(false);
      toast.success("Te redirigimos a WhatsApp. ¡Gracias!");
      (e.target as HTMLFormElement).reset();
    }, 400);
  }

  return (
    <>
      <Toaster />
      <PageHero eyebrow="Contacto" title="Estamos para escucharte">
        Agenda tu evaluación o escríbenos. Te respondemos el mismo día.
      </PageHero>

      <Section className="pt-4">
        <div className="grid lg:grid-cols-5 gap-8">
          <Card className="lg:col-span-2 hover-lift">
            <CardContent className="p-8 space-y-5">
              <h3 className="text-2xl font-display">Información de contacto</h3>
              <a href={SITE.phoneHref} className="flex items-start gap-3 hover:text-primary">
                <Phone className="text-primary size-5 mt-0.5" />
                <span><span className="block text-xs uppercase tracking-widest text-muted-foreground">Teléfono</span>{SITE.phone}</span>
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener" className="flex items-start gap-3 hover:text-primary">
                <MessageCircle className="text-primary size-5 mt-0.5" />
                <span><span className="block text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</span>Escríbenos ahora</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 hover:text-primary">
                <Mail className="text-primary size-5 mt-0.5" />
                <span><span className="block text-xs uppercase tracking-widest text-muted-foreground">Correo</span>{SITE.email}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="text-primary size-5 mt-0.5" />
                <span><span className="block text-xs uppercase tracking-widest text-muted-foreground">Dirección</span>{SITE.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-primary size-5 mt-0.5" />
                <div>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">Horario</span>
                  {SITE.hours.map((h) => (
                    <div key={h.d} className="text-sm"><span className="font-medium">{h.d}:</span> {h.h}</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 hover-lift">
            <CardContent className="p-8">
              <h3 className="text-2xl font-display">Agenda tu evaluación</h3>
              <p className="text-sm text-muted-foreground mt-2">Completa el formulario y te contactaremos por WhatsApp.</p>
              <form onSubmit={onSubmit} className="mt-6 grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input id="name" name="name" required maxLength={100} placeholder="Tu nombre" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input id="phone" name="phone" required maxLength={20} placeholder="+51 ..." className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Correo (opcional)</Label>
                  <Input id="email" name="email" type="email" maxLength={255} placeholder="tu@correo.com" className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea id="message" name="message" required maxLength={1000} rows={5} placeholder="Cuéntanos brevemente qué necesitas" className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={loading} size="lg" className="w-full bg-gradient-primary text-primary-foreground">
                    {loading ? "Enviando…" : "Enviar y abrir WhatsApp"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl overflow-hidden shadow-card border border-border">
          <iframe
            title="Aura Audición en Google Maps"
            src={`https://www.google.com/maps?q=${SITE.mapsQuery}&output=embed`}
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>
      </Section>
    </>
  );
}
