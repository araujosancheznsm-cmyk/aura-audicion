export const SITE = {
  name: "Aura Audición",
  tagline: "Volver a escuchar la vida",
  phone: "+51 922 400 040",
  phoneHref: "tel:+51922400040",
  whatsapp: "https://wa.me/51922400040?text=Hola%20Aura%20Audici%C3%B3n%2C%20quisiera%20agendar%20una%20evaluaci%C3%B3n%20auditiva.",
  address: "Urb. Las Violetas Nº 626, Independencia, Lima",
  mapsQuery: "Urb.+Las+Violetas+626,+Independencia,+Lima",
  hours: [
    { d: "Lunes a Viernes", h: "9:00 a.m. – 6:30 p.m." },
    { d: "Sábados", h: "9:00 a.m. – 2:00 p.m." },
    { d: "Domingos", h: "Cerrado" },
  ],
  email: "sedegeneralaura@gmail.com",
};

export const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/servicios", label: "Servicios" },
  { to: "/audifonos", label: "Audífonos" },
  { to: "/marcas", label: "Marcas" },
  { to: "/accesorios", label: "Accesorios" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contacto", label: "Contacto" },
] as const;
