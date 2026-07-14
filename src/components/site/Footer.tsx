import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Mail, MessageCircle, Instagram } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/lib/site";

function SgsLogo({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-11 hover:opacity-100 transition-opacity"
      style={{ opacity: 0.6 }}
      aria-label={`SGS ${label}`}
    >
      {/* outer ring */}
      <circle cx="32" cy="32" r="29" fill="none" stroke="white" strokeWidth="2.5" />
      {/* inner ring */}
      <circle cx="32" cy="32" r="22" fill="none" stroke="white" strokeWidth="1" />
      {/* checkmark */}
      <polyline
        points="19,33 27,41 45,22"
        fill="none"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* label top */}
      <text x="32" y="17" fontFamily="Arial, sans-serif" fontSize="5.5" fontWeight="600" textAnchor="middle" fill="white">{label}</text>
      {/* SGS bottom */}
      <text x="32" y="58" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle" fill="white">SGS</text>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo size={56} variant="mono" />

          <p className="mt-5 max-w-md text-background/70 leading-relaxed">
            Centro audiológico especializado en evaluación, adaptación y seguimiento
            con audífonos Oticon y Unitron. Tecnología de vanguardia con atención humana.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-background/80">
            <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-gold"><Phone className="size-4" /> {SITE.phone}</a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-gold"><MessageCircle className="size-4" /> WhatsApp</a>
            <span className="flex items-start gap-2"><MapPin className="size-4 mt-0.5" /> {SITE.address}</span>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-gold"><Mail className="size-4" /> {SITE.email}</a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold"><Instagram className="size-4" /> {SITE.instagramHandle}</a>
          </div>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm text-background/70">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-gold">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-4 flex items-center gap-2"><Clock className="size-4" /> Horario</h4>
          <ul className="space-y-2 text-sm text-background/70">
            {SITE.hours.map((h) => (
              <li key={h.d}><span className="block font-medium text-background">{h.d}</span>{h.h}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Marcas y certificaciones */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap items-center justify-center gap-10 md:gap-14">
          {/* Unitron */}
          <span
            className="text-2xl font-light tracking-wide text-background/60 hover:text-background transition-colors select-none"
            style={{ fontFamily: "Arial, sans-serif", letterSpacing: "0.04em" }}
            aria-label="Unitron"
          >
            unitron
          </span>

          {/* Oticon */}
          <span
            className="text-2xl font-light tracking-wide text-background/60 hover:text-background transition-colors select-none"
            style={{ fontFamily: "Arial, sans-serif", letterSpacing: "0.04em" }}
            aria-label="Oticon"
          >
            oticon
          </span>

          {/* Separador */}
          <span className="hidden md:block h-8 w-px bg-background/20" />

          {/* SGS ISO 9001 */}
          <SgsLogo label="ISO 9001" />

          {/* SGS ISO 13485 */}
          <SgsLogo label="ISO 13485" />
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between text-xs text-background/60">
          <p>© {new Date().getFullYear()} Aura Audición. Todos los derechos reservados.</p>
          <p>Volver a escuchar la vida.</p>
        </div>
      </div>
    </footer>
  );
}
