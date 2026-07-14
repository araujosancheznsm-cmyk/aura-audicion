import React from 'react';
import { ArrowRight, MessageCircle, Menu, Phone } from 'lucide-react';

export function ClinicalBlanc() {
  const navItems = ['Nosotros', 'Servicios', 'Catálogo', 'Marcas', 'Accesorios', 'Blog', 'FAQ', 'Contacto'];
  
  const stats = [
    { value: '+15', label: 'Años de experiencia' },
    { value: '+5k', label: 'Pacientes atendidos' },
    { value: '02', label: 'Marcas premium' }
  ];
  
  const services = [
    'Video otoscopia', 'Audiometría', 'Logoaudiometría', 'Adaptación de audífonos',
    'Programación', 'Venta', 'Accesorios', 'Limpieza', 'Reparación'
  ];
  
  const testimonials = [
    { quote: "Recuperé no solo la audición, sino la confianza para conversar con mi familia en la cena. El nivel de detalle en la adaptación fue excepcional.", author: "Carmen R.", location: "Lima" },
    { quote: "Desde la primera evaluación sentí un trato profesional y humano distinto. La tecnología de mis nuevos audífonos superó mis expectativas.", author: "Luis P.", location: "Independencia" },
    { quote: "Transparencia total en el diagnóstico. Me explicaron cada paso de la audiometría y la programación fue milimétrica. Impecable servicio.", author: "Marta S.", location: "Los Olivos" }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1A] selection:bg-[#4A7C59] selection:text-[#FAFAF8]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
        .font-dmsans { font-family: 'DM Sans', sans-serif; }
      `}} />

      <div className="font-dmsans flex flex-col w-full">
        
        {/* Navigation */}
        <header className="border-b border-[#E6E6DF] py-5 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-[#FAFAF8] z-50">
          <div className="text-2xl font-bold tracking-tighter">AURA.</div>
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(item => (
              <a key={item} href="#" className="text-sm font-medium tracking-wide hover:text-[#4A7C59] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#" className="hidden md:flex items-center gap-2 text-sm font-bold tracking-wide hover:text-[#4A7C59] transition-colors">
              <Phone className="w-4 h-4" /> (01) 555-0123
            </a>
            <button className="lg:hidden text-[#1C1C1A]">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 md:px-12 pt-16 md:pt-24 pb-16 flex flex-col lg:flex-row gap-12 border-b border-[#E6E6DF]">
          <div className="w-full lg:w-[70%] flex flex-col justify-center pr-0 lg:pr-12">
            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-bold leading-[0.92] tracking-tighter mb-8 text-[#1C1C1A]">
              Vuelve a<br />escuchar la vida.
            </h1>
            <p className="text-xl md:text-3xl font-light leading-relaxed max-w-3xl text-[#1C1C1A]/80 mb-12">
              Tecnología <strong className="font-bold text-[#1C1C1A]">Oticon</strong> y <strong className="font-bold text-[#1C1C1A]">Unitron</strong>, evaluaciones precisas y un acompañamiento humano en cada paso de tu salud auditiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#4A7C59] text-[#FAFAF8] px-10 py-5 text-lg font-medium flex items-center justify-center gap-3 hover:bg-[#3d664a] transition-colors rounded-none">
                Agenda tu evaluación <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-[#1C1C1A] text-[#1C1C1A] px-10 py-5 text-lg font-medium flex items-center justify-center gap-3 hover:bg-[#1C1C1A] hover:text-[#FAFAF8] transition-colors rounded-none">
                WhatsApp <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-[30%] h-[400px] lg:h-[700px]">
            <img 
              src="/__mockup/images/blanc-hero.jpg" 
              alt="Audífono moderno en superficie limpia" 
              className="w-full h-full object-cover grayscale-[0.2]"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-[#E6E6DF]">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E6E6DF]">
            {stats.map((stat, i) => (
              <div key={i} className="px-6 md:px-12 py-12 flex flex-col gap-3 hover:bg-[#4A7C59]/5 transition-colors">
                <span className="text-6xl font-bold tracking-tighter text-[#4A7C59]">{stat.value}</span>
                <span className="text-sm font-bold uppercase tracking-widest text-[#1C1C1A]/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="px-6 md:px-12 py-24 border-b border-[#E6E6DF] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 flex flex-col">
            <h2 className="text-5xl font-bold tracking-tighter mb-8">Precisión clínica.</h2>
            <p className="font-light text-2xl text-[#1C1C1A]/70 mb-12 leading-relaxed">
              Protocolos clínicos estandarizados y equipamiento de vanguardia para garantizar un diagnóstico exacto y una adaptación perfecta.
            </p>
            <div className="mt-auto h-[400px]">
              <img 
                src="/__mockup/images/blanc-service.jpg" 
                alt="Instrumentos de audiometría" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-center">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="group flex items-center border-t border-[#E6E6DF] py-6 lg:py-8 last:border-b hover:bg-[#4A7C59]/5 transition-colors cursor-pointer"
              >
                <span className="w-16 lg:w-24 text-[#4A7C59] font-light text-xl lg:text-2xl">
                  {(i+1).toString().padStart(2, '0')}
                </span>
                <span className="text-2xl lg:text-4xl font-medium tracking-tight text-[#1C1C1A] group-hover:translate-x-4 transition-transform duration-300">
                  {service}
                </span>
                <ArrowRight className="w-6 h-6 lg:w-8 lg:h-8 ml-auto text-[#1C1C1A]/10 group-hover:text-[#4A7C59] transition-colors" />
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-6 md:px-12 py-24 border-b border-[#E6E6DF] bg-[#FAFAF8]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter">Resultados.</h2>
            <p className="text-xl font-light text-[#1C1C1A]/60 max-w-md">
              Historias reales de pacientes que han confiado su salud auditiva a nuestros especialistas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {testimonials.map((test, i) => (
              <div key={i} className="flex flex-col gap-8 border-l border-[#4A7C59] pl-8 py-2">
                <p className="font-light text-2xl leading-relaxed text-[#1C1C1A]">
                  "{test.quote}"
                </p>
                <div className="mt-auto pt-4">
                  <p className="font-bold text-sm tracking-widest uppercase mb-1">{test.author}</p>
                  <p className="font-light text-sm text-[#1C1C1A]/50">{test.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 md:px-12 pt-24 pb-12 bg-[#1C1C1A] text-[#FAFAF8]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
            <div className="md:col-span-4">
              <div className="text-4xl font-bold tracking-tighter mb-6 text-[#FAFAF8]">AURA.</div>
              <p className="text-[#FAFAF8]/60 font-light max-w-sm leading-relaxed">
                El estándar en cuidado auditivo premium. Evaluaciones precisas, marcas líderes y acompañamiento continuo.
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-bold tracking-widest uppercase text-xs text-[#FAFAF8]/40 mb-6">Navegación</h4>
              <ul className="flex flex-col gap-4">
                {navItems.slice(0, 4).map(item => (
                  <li key={item}><a href="#" className="font-light hover:text-[#4A7C59] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-bold tracking-widest uppercase text-xs text-[#FAFAF8]/40 mb-6">Compañía</h4>
              <ul className="flex flex-col gap-4">
                {navItems.slice(4).map(item => (
                  <li key={item}><a href="#" className="font-light hover:text-[#4A7C59] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <h4 className="font-bold tracking-widest uppercase text-xs text-[#FAFAF8]/40 mb-6">Contacto</h4>
              <ul className="flex flex-col gap-4 font-light text-[#FAFAF8]/80">
                <li>Av. Principal 123, Lima</li>
                <li>contacto@auraaudicion.pe</li>
                <li>(01) 555-0123</li>
              </ul>
              <button className="mt-8 border border-[#FAFAF8]/20 text-[#FAFAF8] px-8 py-4 text-sm font-medium hover:bg-[#FAFAF8] hover:text-[#1C1C1A] transition-colors rounded-none w-full sm:w-auto">
                Reservar Cita
              </button>
            </div>
          </div>
          <div className="border-t border-[#FAFAF8]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-[#FAFAF8]/40">
            <p>© {new Date().getFullYear()} Aura Audición. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#FAFAF8] transition-colors">Términos</a>
              <a href="#" className="hover:text-[#FAFAF8] transition-colors">Privacidad</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
