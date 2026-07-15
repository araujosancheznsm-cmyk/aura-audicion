import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-700 ease-apple ${
        scrolled
          ? (open
              ? "top-4 mx-4 md:mx-auto max-w-5xl rounded-[2rem] border border-border/40 bg-background/80 shadow-luxe"
              : "top-4 mx-4 md:mx-auto max-w-5xl rounded-full border border-border/30 bg-background/55 shadow-soft")
          : "top-0 bg-transparent border-b border-transparent"
      }`}
      style={scrolled ? { backdropFilter: "blur(28px) saturate(1.8)", WebkitBackdropFilter: "blur(28px) saturate(1.8)" } : undefined}
    >
      <div
        className={`px-6 sm:px-8 flex items-center justify-between transition-all duration-700 ease-apple ${
          scrolled ? "h-14" : "h-20"
        }`}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <Logo size={scrolled ? 42 : 52} className="transition-all duration-500 ease-apple" />
          <span className="sr-only">Aura Audición</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="relative px-4 py-2 text-[13px] font-medium text-foreground/75 rounded-full hover:text-primary transition-colors duration-300"
              activeProps={{ className: "text-primary bg-secondary/80" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            size={scrolled ? "sm" : "default"}
            className="bg-gradient-primary text-primary-foreground hover:opacity-90 rounded-full shadow-soft transition-all duration-500 ease-apple"
          >
            <Link to="/contacto">Agenda tu evaluación</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/40 mt-1 px-4 py-4 space-y-1 animate-fade-up">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-foreground/80 hover:text-primary hover:bg-secondary"
                activeProps={{ className: "text-primary bg-secondary" }}
              >
                {n.label}
              </Link>
            ))}
            <Button asChild className="w-full bg-gradient-primary text-primary-foreground mt-2">
              <Link to="/contacto" onClick={() => setOpen(false)}>Agenda tu evaluación</Link>
            </Button>
          </div>
      )}
    </header>
  );
}
