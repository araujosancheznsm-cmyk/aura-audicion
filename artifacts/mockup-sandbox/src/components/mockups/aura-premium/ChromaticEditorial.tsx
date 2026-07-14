import React, { useState } from "react";
import { ArrowRight, Menu, X, Phone, Star, Quote, ChevronRight, Activity } from "lucide-react";

export function ChromaticEditorial() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    "Nosotros", "Servicios", "Catálogo", "Marcas", "Accesorios", "Blog", "FAQ", "Contacto"
  ];

  const services = [
    "Video otoscopia", "Audiometría", "Logoaudiometría", "Adaptación de audífonos",
    "Programación", "Venta", "Accesorios", "Limpieza", "Reparación"
  ];

  const testimonials = [
    {
      name: "Carmen R.",
      location: "Lima",
      quote: "Volver a escuchar la voz de mis nietos ha sido el regalo más grande. La atención de Aura es incomparable, verdaderamente humana y precisa."
    },
    {
      name: "Luis P.",
      location: "Independencia",
      quote: "Desde la evaluación hasta la adaptación de mis audífonos Oticon, el proceso fue impecable. Tienen un dominio técnico que inspira total confianza."
    },
    {
      name: "Marta S.",
      location: "Los Olivos",
      quote: "La delicadeza con la que me atendieron y la calidad del dispositivo Unitron me devolvieron la independencia que creía haber perdido."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white selection:bg-[#C9A84C] selection:text-[#0D1B2A] overflow-x-hidden w-full">
      {/* Font imports and custom styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Montserrat:wght@100;200;300;400;500&display=swap');
        
        .font-editorial {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-sans-thin {
          font-family: 'Montserrat', sans-serif;
        }

        .gold-gradient-text {
          background: linear-gradient(to right, #D4AF37, #FFF8DC, #D4AF37);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#0D1B2A]/90 backdrop-blur-lg border-b border-[#C9A84C]/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-3xl font-bold tracking-wider text-[#C9A84C]">AURA</span>
            <span className="font-sans-thin text-xs font-light tracking-[0.3em] uppercase mt-1 hidden sm:block text-gray-400">Audición</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-sans-thin font-extralight text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-[#C9A84C] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-500 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-[#C9A84C] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-[#0D1B2A] border-b border-[#C9A84C]/30 py-6 px-6 flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-sans-thin font-light text-sm uppercase tracking-[0.2em] text-white/80"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] pt-28 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 overflow-hidden">
        
        {/* Background Oversized Numerals (Tension/Texture) */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-20 lg:-left-10 text-[18rem] md:text-[25rem] lg:text-[32rem] leading-none font-editorial font-bold italic text-[#C9A84C]/[0.03] select-none pointer-events-none z-0">
          +15
        </div>

        {/* Diagonal Gold Rule Background */}
        <div className="absolute -top-[20%] right-[-10%] w-[1px] h-[150%] bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent rotate-45 pointer-events-none"></div>
        <div className="absolute -top-[10%] right-[0%] w-[1px] h-[150%] bg-gradient-to-b from-transparent via-[#C9A84C]/10 to-transparent rotate-[40deg] pointer-events-none"></div>

        {/* Hero Content (Left) */}
        <div className="relative z-10 w-full lg:w-1/2 flex flex-col pt-10 lg:pt-0">
          {/* Tagline label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-[#C9A84C]"></div>
            <span className="font-sans-thin font-light text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">Aura Premium Audiology</span>
          </div>

          {/* Split Headline Layout */}
          <div className="flex flex-col mb-10 text-left">
            <span className="font-sans-thin font-thin text-4xl md:text-6xl lg:text-[5rem] tracking-[0.1em] uppercase text-white/90 leading-tight">
              Vuelve a
            </span>
            <span className="font-editorial italic font-light text-6xl md:text-[6.5rem] lg:text-[8.5rem] text-[#C9A84C] lowercase leading-[0.8] -ml-2 my-2">
              escuchar
            </span>
            <span className="font-editorial font-bold text-5xl md:text-7xl lg:text-[6rem] tracking-tight text-white leading-tight">
              la vida.
            </span>
          </div>

          {/* Subhead */}
          <p className="font-sans-thin font-light text-sm md:text-base tracking-wide text-white/60 max-w-md leading-relaxed mb-12">
            Tecnología <span className="text-[#C9A84C]">Oticon</span> y <span className="text-[#C9A84C]">Unitron</span>, evaluaciones precisas y un acompañamiento humano en cada paso de tu salud auditiva.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 mb-16 lg:mb-20">
            <button className="group relative overflow-hidden rounded-full border border-[#C9A84C] px-10 py-4 transition-all duration-500 hover:bg-[#C9A84C]">
              <div className="relative z-10 flex items-center justify-center gap-3 font-sans-thin font-medium text-xs tracking-[0.15em] uppercase text-[#C9A84C] group-hover:text-[#0D1B2A] transition-colors duration-500">
                Agenda tu evaluación
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button className="group rounded-full border border-white/20 px-10 py-4 transition-all duration-500 hover:border-[#C9A84C]/60 hover:bg-white/5">
              <div className="flex items-center justify-center gap-3 font-sans-thin font-medium text-xs tracking-[0.15em] uppercase text-white/80 transition-colors">
                <Phone size={14} />
                WhatsApp
              </div>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-[#C9A84C]/20">
            <div>
              <div className="font-editorial italic text-3xl text-[#C9A84C] mb-1">+15</div>
              <div className="font-sans-thin font-light text-[9px] uppercase tracking-[0.15em] text-white/50">Años de experiencia</div>
            </div>
            <div>
              <div className="font-editorial italic text-3xl text-[#C9A84C] mb-1">+5k</div>
              <div className="font-sans-thin font-light text-[9px] uppercase tracking-[0.15em] text-white/50">Pacientes atendidos</div>
            </div>
            <div>
              <div className="font-editorial italic text-3xl text-[#C9A84C] mb-1">02</div>
              <div className="font-sans-thin font-light text-[9px] uppercase tracking-[0.15em] text-white/50">Marcas premium</div>
            </div>
          </div>
        </div>

        {/* Hero Image (Right) */}
        <div className="relative z-10 w-full lg:w-1/2 h-[600px] lg:h-[750px] mt-10 lg:mt-0 flex justify-end">
          {/* Structural Frame Layer */}
          <div className="absolute top-8 left-8 right-0 bottom-0 border border-[#C9A84C]/40 z-0 hidden md:block"></div>
          
          <div className="relative z-10 w-full md:w-[90%] h-full overflow-hidden bg-[#1A2639]">
            <img 
              src="/__mockup/images/editorial-hero.jpg" 
              alt="Mujer elegante sonriendo con su audífono" 
              className="w-full h-full object-cover object-center opacity-90 transition-transform duration-1000 hover:scale-105"
            />
            {/* Subtle gradient overlay to merge image with background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent opacity-80"></div>
            
            {/* Brand overlay on image */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="flex flex-col gap-2">
                <span className="font-sans-thin text-[10px] tracking-[0.2em] uppercase text-white/70">Partners Oficiales</span>
                <div className="flex gap-4">
                  <span className="font-editorial text-xl italic text-white">Oticon</span>
                  <span className="font-editorial text-xl italic text-white">Unitron</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Editorial Grid Section (Transition to light) */}
      <section id="servicios" className="bg-[#F9F6F0] text-[#0D1B2A] pt-32 pb-32 px-6 lg:px-12 relative overflow-hidden">
        {/* Decorative thin lines */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-[#C9A84C]/20 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute top-32 left-0 w-full h-px bg-[#C9A84C]/20 pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-10">
            <div className="max-w-2xl relative">
              <div className="absolute -top-12 -left-8 text-[8rem] font-sans-thin font-thin text-[#0D1B2A]/5 pointer-events-none leading-none">
                01
              </div>
              <h2 className="font-editorial font-bold text-5xl md:text-6xl text-[#0D1B2A] leading-tight relative z-10">
                Precisión clínica <br/>
                <span className="italic font-light text-[#C9A84C]">en cada detalle.</span>
              </h2>
            </div>
            
            <p className="font-sans-thin font-light text-sm text-[#0D1B2A]/70 max-w-md tracking-wide leading-relaxed">
              Un enfoque meticuloso hacia la rehabilitación auditiva. Diseñamos planes de atención donde la tecnología suiza y danesa se encuentra con la calidez humana.
            </p>
          </div>

          {/* Asymmetrical Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {services.map((service, index) => (
              <div key={service} className="group relative border-t border-[#C9A84C]/30 pt-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-sans-thin font-thin text-xs tracking-[0.2em] text-[#C9A84C]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Activity size={14} className="text-[#0D1B2A]/20 group-hover:text-[#C9A84C] transition-colors" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold mb-3 group-hover:text-[#C9A84C] transition-colors">
                  {service}
                </h3>
                <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 ease-in-out">
                  <p className="font-sans-thin text-xs font-light text-[#0D1B2A]/60 leading-relaxed">
                    Evaluación exhaustiva y personalizada para asegurar el máximo rendimiento de tu capacidad auditiva, con tecnología de vanguardia.
                  </p>
                  <button className="mt-4 flex items-center gap-2 font-sans-thin text-[10px] uppercase tracking-[0.2em] text-[#0D1B2A] font-medium border-b border-[#0D1B2A] pb-1">
                    Conocer más <ChevronRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Parallax Banner Section */}
      <section className="relative py-40 bg-[#0D1B2A] text-center overflow-hidden border-y border-[#C9A84C]/20">
        <div className="absolute inset-0 bg-[#C9A84C]/5"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Quote size={40} strokeWidth={1} className="mx-auto text-[#C9A84C] mb-10 opacity-50" />
          <h2 className="font-editorial italic font-light text-4xl md:text-6xl text-white leading-snug mb-10">
            "No solo adaptamos audífonos. <br/> <span className="text-[#C9A84C] font-semibold">Reconectamos historias.</span>"
          </h2>
          <p className="font-sans-thin font-light text-sm uppercase tracking-[0.3em] text-white/50">
            El compromiso Aura
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="blog" className="bg-[#F9F6F0] text-[#0D1B2A] py-32 px-6 lg:px-12 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-20 relative">
             <div className="absolute top-1/2 -translate-y-1/2 text-[10rem] font-sans-thin font-thin text-[#0D1B2A]/5 pointer-events-none leading-none z-0">
                02
              </div>
            <span className="font-sans-thin text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-6 relative z-10">
              Testimonios
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl font-bold relative z-10">
              Voces que <span className="italic text-[#C9A84C] font-light">inspiran</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {testimonials.map((test, index) => (
              <div key={index} className="flex flex-col h-full bg-white p-10 border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-colors shadow-sm relative group">
                <Quote size={60} strokeWidth={0.5} className="absolute top-6 right-6 text-[#C9A84C]/10 group-hover:text-[#C9A84C]/20 transition-colors" />
                
                <div className="flex gap-1 mb-6 text-[#C9A84C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                
                <p className="font-editorial italic text-xl text-[#0D1B2A]/80 flex-grow leading-relaxed mb-10 relative z-10">
                  "{test.quote}"
                </p>
                
                <div className="mt-auto border-t border-[#0D1B2A]/10 pt-6">
                  <p className="font-editorial font-bold text-lg text-[#0D1B2A]">{test.name}</p>
                  <p className="font-sans-thin font-light text-[10px] uppercase tracking-widest text-[#0D1B2A]/50 mt-1">{test.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-[#0D1B2A] pt-24 pb-12 px-6 lg:px-12 border-t border-[#C9A84C]/30 relative overflow-hidden">
        {/* Background Logo Texture */}
        <div className="absolute -bottom-20 -right-20 text-[20rem] font-editorial font-bold italic text-[#C9A84C]/[0.02] select-none pointer-events-none">
          Aura
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
          
          <div className="flex flex-col">
             <div className="flex items-center gap-2 mb-8">
              <span className="font-editorial text-3xl font-bold tracking-wider text-[#C9A84C]">AURA</span>
            </div>
            <p className="font-sans-thin font-light text-xs text-white/50 leading-relaxed mb-8 max-w-xs">
              Centro especializado en salud auditiva premium. Distribuidores oficiales de Oticon y Unitron en Lima, Perú.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D1B2A] transition-colors">
                <span className="font-editorial italic text-lg">In</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D1B2A] transition-colors">
                <span className="font-editorial italic text-lg">Fb</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sans-thin font-medium text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-8">Navegación</h4>
            <ul className="flex flex-col gap-4">
              {["Nosotros", "Servicios", "Marcas", "FAQ"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="font-sans-thin font-light text-sm text-white/60 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans-thin font-medium text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-8">Contacto</h4>
            <ul className="flex flex-col gap-6 font-sans-thin font-light text-sm text-white/60">
              <li className="flex flex-col gap-1">
                <span className="uppercase text-[9px] tracking-widest text-[#C9A84C]/70">Teléfono</span>
                +51 987 654 321
              </li>
              <li className="flex flex-col gap-1">
                <span className="uppercase text-[9px] tracking-widest text-[#C9A84C]/70">Email</span>
                contacto@auraaudicion.pe
              </li>
              <li className="flex flex-col gap-1">
                <span className="uppercase text-[9px] tracking-widest text-[#C9A84C]/70">Dirección</span>
                Av. Principal 123, Miraflores, Lima
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans-thin font-medium text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-8">Newsletter</h4>
            <p className="font-sans-thin font-light text-xs text-white/50 mb-4">
              Recibe consejos sobre salud auditiva.
            </p>
            <div className="flex border-b border-[#C9A84C]/50 pb-2">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="bg-transparent border-none outline-none text-sm font-sans-thin text-white placeholder-white/30 w-full"
              />
              <button className="text-[#C9A84C] hover:text-white transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-8 border-t border-[#C9A84C]/20 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="font-sans-thin font-light text-[10px] tracking-widest text-white/40 uppercase">
            © {new Date().getFullYear()} Aura Audición. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 font-sans-thin font-light text-[10px] tracking-widest text-white/40 uppercase">
            <a href="#" className="hover:text-[#C9A84C] transition-colors">Términos</a>
            <a href="#" className="hover:text-[#C9A84C] transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
