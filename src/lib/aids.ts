import intent from "@/assets/aid-oticon-intent.jpg";
import real from "@/assets/aid-oticon-real.jpg";
import ownsi from "@/assets/aid-oticon-ownsi.jpg";
import zircon from "@/assets/aid-oticon-zircon.jpg";
import xceed from "@/assets/aid-oticon-xceed.jpg";
import play from "@/assets/aid-oticon-play.jpg";
import vivante from "@/assets/aid-unitron-vivante.jpg";
import moxivrs from "@/assets/aid-unitron-moxivrs.jpg";
import moxivrt from "@/assets/aid-unitron-moxivrt.jpg";
import stride from "@/assets/aid-unitron-stride.jpg";
import insera from "@/assets/aid-unitron-insera.jpg";
import maxAid from "@/assets/aid-unitron-max.jpg";

export type Aid = {
  slug: string;
  brand: "Oticon" | "Unitron";
  name: string;
  image: string;
  tagline: string;
  description: string;
  tech: string[];
  battery: string;
  connectivity: string;
  benefits: string[];
};

export const AIDS: Aid[] = [
  {
    slug: "oticon-intent",
    brand: "Oticon",
    name: "Intent",
    image: intent,
    tagline: "El primer audífono que entiende tu intención de escucha",
    description:
      "Sensores 4D que adaptan el sonido a tu movimiento, conversación y entorno en tiempo real.",
    tech: ["BrainHearing™", "Deep Neural Network 2.0", "4D Sensor", "MoreSound Intelligence"],
    battery: "Recargable · 20 h de uso",
    connectivity: "Bluetooth LE Audio · Auracast",
    benefits: ["Escucha intuitiva 360°", "Diseño ultra discreto", "Streaming directo iOS/Android"],
  },
  {
    slug: "oticon-real",
    brand: "Oticon",
    name: "Real",
    image: real,
    tagline: "Sonido natural y nítido en la vida real",
    description: "Diseñado para enfrentar los sonidos molestos repentinos sin sacrificar el habla.",
    tech: ["Polaris R Platform", "MoreSound Intelligence", "RealSound Technology"],
    battery: "Recargable · 24 h",
    connectivity: "Bluetooth 2.4 GHz",
    benefits: ["Reducción inteligente de ruido", "Conversaciones claras", "App Oticon Companion"],
  },
  {
    slug: "oticon-own-si",
    brand: "Oticon",
    name: "Own SI",
    image: ownsi,
    tagline: "Hecho a medida, completamente invisible",
    description: "Tecnología premium dentro del canal auditivo: nadie nota que lo llevas puesto.",
    tech: ["MoreSound Amplifier", "Deep Neural Network", "Personalized Fit"],
    battery: "Pila 10 · ~80 horas",
    connectivity: "Discreto, sin antena externa",
    benefits: ["100% invisible", "Personalización 3D", "Adaptación cómoda"],
  },
  {
    slug: "oticon-zircon",
    brand: "Oticon",
    name: "Zircon",
    image: zircon,
    tagline: "Tecnología avanzada accesible",
    description: "La plataforma Polaris en una solución equilibrada para la vida diaria.",
    tech: ["Polaris Platform", "OpenSound Navigator", "SuddenSound Stabilizer"],
    battery: "Recargable o pila 312",
    connectivity: "Bluetooth Low Energy",
    benefits: ["Excelente relación valor", "Diseño robusto", "Soporta IP68"],
  },
  {
    slug: "oticon-xceed",
    brand: "Oticon",
    name: "Xceed",
    image: xceed,
    tagline: "El BTE súper potente más avanzado del mundo",
    description: "Para pérdidas auditivas severas y profundas, con mínima realimentación.",
    tech: ["Velox S Platform", "OpenSound Navigator", "OpenSound Optimizer"],
    battery: "Pila 13 · alta autonomía",
    connectivity: "Bluetooth + ConnectClip opcional",
    benefits: ["Hasta 146 dB SPL", "Cero feedback audible", "Voz clara en grupo"],
  },
  {
    slug: "oticon-play-px",
    brand: "Oticon",
    name: "Play PX",
    image: play,
    tagline: "Diseñado para que los niños escuchen y aprendan",
    description: "Pensado en pequeños usuarios: resistente, seguro y con sonido natural.",
    tech: ["Polaris Platform", "MoreSound Intelligence Kids", "Tamper-proof"],
    battery: "Recargable Li-ion",
    connectivity: "Bluetooth + EduMic",
    benefits: ["Carcasa anti-manipulación", "Streaming desde iPad", "Acceso a sonidos del aula"],
  },
  {
    slug: "unitron-vivante",
    brand: "Unitron",
    name: "Vivante",
    image: vivante,
    tagline: "La plataforma más potente de Unitron",
    description:
      "Procesamiento inteligente que se ajusta automáticamente al entorno con HyperFocus.",
    tech: ["Vivante Platform", "Integra OS", "HyperFocus", "SoundNav 4.0"],
    battery: "Recargable · 24 h",
    connectivity: "Bluetooth LE · Remote Plus",
    benefits: ["Concentración en una voz", "Auto-ajuste 360°", "Streaming dual"],
  },
  {
    slug: "unitron-moxi-v-rs",
    brand: "Unitron",
    name: "Moxi V‑RS",
    image: moxivrs,
    tagline: "RIC recargable, discreto y potente",
    description: "Diseño minimalista con autonomía extendida para todo el día.",
    tech: ["Vivante Platform", "AutoFocus 360", "HyperFocus"],
    battery: "Recargable Li-ion · 24 h",
    connectivity: "Bluetooth Multipoint · iOS/Android",
    benefits: ["Diseño elegante", "Carga rápida", "Conexión doble dispositivo"],
  },
  {
    slug: "unitron-moxi-v-rt",
    brand: "Unitron",
    name: "Moxi V‑RT",
    image: moxivrt,
    tagline: "Recargable con telecoil integrado",
    description: "La opción ideal para entornos con bucles inductivos y espacios públicos.",
    tech: ["Vivante Platform", "Telecoil", "SoundNav 4.0"],
    battery: "Recargable Li-ion · 24 h",
    connectivity: "Bluetooth + T-coil",
    benefits: ["Accesibilidad pública", "Sonido ultra claro", "Carga inalámbrica"],
  },
  {
    slug: "unitron-stride-v",
    brand: "Unitron",
    name: "Stride V",
    image: stride,
    tagline: "BTE robusto para estilos de vida activos",
    description: "Resistente, confiable y potente: pensado para el día a día sin pausas.",
    tech: ["Vivante Platform", "Integra OS", "Wind Block"],
    battery: "Pila 13 · larga duración",
    connectivity: "Bluetooth + Remote Plus",
    benefits: ["Resistencia IP68", "Bajo viento exterior", "Controles físicos amplios"],
  },
  {
    slug: "unitron-insera",
    brand: "Unitron",
    name: "Insera",
    image: insera,
    tagline: "Audífonos intra-auriculares hechos a medida",
    description: "Discreción total con el rendimiento de la plataforma Vivante.",
    tech: ["Vivante Platform", "Custom Shell", "AutoFocus 360"],
    battery: "Pila 10/312 · hasta 7 días",
    connectivity: "Bluetooth (modelos seleccionados)",
    benefits: ["Confección personalizada", "Casi invisibles", "Comodidad prolongada"],
  },
  {
    slug: "unitron-max",
    brand: "Unitron",
    name: "Max",
    image: maxAid,
    tagline: "Súper potencia para pérdidas severas",
    description: "Hasta 141 dB SPL con control de feedback de última generación.",
    tech: ["Vivante Platform", "Super Power Amplifier", "Anti-feedback"],
    battery: "Pila 675 · alta autonomía",
    connectivity: "Bluetooth + accesorios FM",
    benefits: ["Máxima ganancia", "Robusto IP68", "Programas dedicados"],
  },
];
