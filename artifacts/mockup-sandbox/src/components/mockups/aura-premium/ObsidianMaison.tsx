import React, { useEffect, useState } from "react";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";

export function ObsidianMaison() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#050505] text-[#f4f0ec] min-h-screen selection:bg-[#c5a059] selection:text-[#050505] font-sans antialiased overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        .gold-accent {
          color: #c5a059;
        }

        .border-gold {
          border-color: rgba(197, 160, 89, 0.3);
        }

        .link-hover {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding-bottom: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          color: #f4f0ec;
          transition: color 0.4s ease;
        }

        .link-hover::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: rgba(197, 160, 89, 0.5);
          transform: scaleX(1);
          transform-origin: bottom right;
          transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
        }

        .link-hover:hover {
          color: #c5a059;
        }

        .link-hover:hover::after {
          transform: scaleX(0);
          transform-origin: bottom left;
        }

        .hero-headline {
          font-size: clamp(4rem, 12vw, 11rem);
          line-height: 0.85;
          letter-spacing: -0.02em;
          font-weight: 300;
        }

        .fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md border-b border-gold' : 'bg-transparent border-b border-gold/50'} py-6 px-8 lg:px-16 flex justify-between items-center`}>
        <div className="font-serif text-2xl tracking-widest uppercase">
          Aura
        </div>
        <div className="hidden md:flex space-x-12">
          {['Nosotros', 'Servicios', 'Catálogo', 'Marcas', 'Accesorios', 'Blog', 'FAQ'].map((item) => (
            <a key={item} href="#" className="text-[0.65rem] tracking-[0.2em] uppercase text-white/60 hover:text-[#c5a059] transition-colors duration-300">
              {item}
            </a>
          ))}
        </div>
        <div>
          <a href="#" className="text-[0.65rem] tracking-[0.2em] uppercase text-white hover:text-[#c5a059] transition-colors duration-300 flex items-center gap-2">
            Contacto
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] w-full flex items-end pb-32 px-8 lg:px-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/obsidian-hero.jpg" 
            alt="Cinematic sophisticated woman listening" 
            className="w-full h-full object-cover object-center transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[#050505]/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-16">
          <div className="w-full md:w-2/3">
            <h1 className="font-serif hero-headline text-[#f4f0ec] mb-8 fade-in-up">
              Vuelve a<br />
              <span className="italic text-[#c5a059] pr-8">escuchar</span><br />
              la vida.
            </h1>
          </div>
          
          <div className="w-full md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right fade-in-up delay-200">
            <p className="text-white/60 font-light text-sm md:text-base leading-relaxed mb-12 max-w-sm">
              Tecnología <span className="text-[#f4f0ec]">Oticon</span> y <span className="text-[#f4f0ec]">Unitron</span>, evaluaciones precisas y un acompañamiento humano en cada paso de tu salud auditiva.
            </p>
            <div className="flex flex-col gap-6 items-start md:items-end">
              <a href="#" className="link-hover">
                Agenda tu evaluación <ArrowRight className="w-3 h-3" />
              </a>
              <a href="#" className="link-hover text-white/50 hover:text-white">
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-8 lg:px-16 border-t border-gold relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { num: "+15", label: "Años de experiencia", suffix: "Años" },
              { num: "+5k", label: "Pacientes atendidos", suffix: "Vidas" },
              { num: "02", label: "Marcas premium", suffix: "Alianzas" }
            ].map((stat, i) => (
              <div key={i} className={`p-12 ${i !== 2 ? 'md:border-r' : ''} border-b md:border-b-0 border-gold/20 flex flex-col justify-between min-h-[300px] hover:bg-white/[0.02] transition-colors duration-500`}>
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40">{stat.suffix}</span>
                <div>
                  <div className="font-serif text-7xl md:text-8xl lg:text-9xl text-[#f4f0ec] mb-4 font-light">{stat.num}</div>
                  <div className="text-sm font-light text-white/60">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-40 px-8 lg:px-16 relative">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-24">
          <div className="lg:w-1/3">
            <h2 className="font-serif text-5xl md:text-6xl font-light mb-8">Nuestros<br/><i className="text-[#c5a059]">Servicios</i></h2>
            <p className="text-white/50 text-sm leading-relaxed mb-12 max-w-xs">
              La excelencia en audiología requiere precisión, tecnología de vanguardia y una dedicación absoluta al detalle.
            </p>
            <a href="#" className="link-hover">
              Ver todos los servicios <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          
          <div className="lg:w-2/3 border-t border-gold/20">
            {[
              "Video otoscopia",
              "Audiometría",
              "Logoaudiometría",
              "Adaptación de audífonos",
              "Programación",
              "Venta de accesorios",
              "Mantenimiento y limpieza",
              "Reparación especializada"
            ].map((service, idx) => (
              <div key={idx} className="group border-b border-gold/20 py-8 flex justify-between items-center cursor-pointer hover:pl-8 transition-all duration-500">
                <span className="font-serif text-2xl md:text-3xl text-white/80 group-hover:text-white transition-colors duration-500">
                  {service}
                </span>
                <ChevronRight className="w-5 h-5 text-white/0 group-hover:text-[#c5a059] transition-all duration-500 transform -translate-x-4 group-hover:translate-x-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Restrained Typography */}
      <section className="py-40 px-8 lg:px-16 bg-[#030303] border-y border-gold/20">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40 mb-20 block">Testimonios</span>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              { name: "Carmen R.", loc: "Lima", quote: "El silencio se había vuelto mi refugio, pero el sonido me devolvió la vida. Un servicio impecable y humano." },
              { name: "Luis P.", loc: "Independencia", quote: "La adaptación fue un proceso de absoluta precisión. Mis audífonos Oticon son invisibles, pero lo que escucho lo cambia todo." },
              { name: "Marta S.", loc: "Los Olivos", quote: "No sabía cuánto me estaba perdiendo hasta que me evaluaron aquí. Profesionales de primer nivel, tecnología que no imaginaba." }
            ].map((test, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-[#c5a059] font-serif text-6xl mb-6 leading-none opacity-50">"</div>
                <p className="font-serif text-xl md:text-2xl text-white/80 font-light italic leading-relaxed mb-8 px-4">
                  {test.quote}
                </p>
                <div className="text-[0.65rem] tracking-[0.1em] uppercase text-white/40 mt-auto">
                  <span className="text-white/80">{test.name}</span> — {test.loc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-12 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
            <div>
              <div className="font-serif text-3xl tracking-widest uppercase mb-8">Aura</div>
              <p className="text-white/40 text-sm max-w-xs font-light">
                Tecnología auditiva de clase mundial. Distribuidores autorizados de Oticon y Unitron.
              </p>
            </div>
            
            <div>
              <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40 mb-8">Navegación</h4>
              <ul className="space-y-4 text-sm text-white/70 font-light">
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Nosotros</a></li>
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Servicios</a></li>
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Catálogo de Audífonos</a></li>
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Marcas Premium</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40 mb-8">Legal</h4>
              <ul className="space-y-4 text-sm text-white/70 font-light">
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-[#c5a059] transition-colors">Libro de Reclamaciones</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40 mb-8">Contacto</h4>
              <div className="space-y-4 text-sm text-white/70 font-light">
                <p>Lima, Perú</p>
                <p>hola@auraaudicion.pe</p>
                <a href="#" className="inline-block mt-4 text-[#c5a059] hover:text-white transition-colors">
                  +51 987 654 321
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gold/20 text-xs text-white/30 tracking-wider">
            <p>&copy; {new Date().getFullYear()} Aura Audición. Todos los derechos reservados.</p>
            <p className="mt-4 md:mt-0">Diseñado con precisión.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
