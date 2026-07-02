import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acceso administrativo · Aura Audición" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/catalogo" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/catalogo` },
        });
        if (error) throw error;
      }
      navigate({ to: "/admin/catalogo" });
    } catch (err: any) {
      setError(err.message ?? "Error de autenticación");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 flex items-start justify-center bg-secondary/30">
      <Card className="w-full max-w-md rounded-3xl border-border/60 shadow-card">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-3 mb-6">
            <Logo size={56} />
            <h1 className="font-display text-2xl">Panel administrativo</h1>
            <p className="text-sm text-muted-foreground text-center">
              {mode === "login" ? "Ingresa a tu cuenta para gestionar el catálogo." : "Crea la cuenta del administrador."}
            </p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <div className="text-sm text-destructive">{error}</div>}
            <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-primary-foreground">
              {loading ? "Cargando…" : mode === "login" ? "Ingresar" : "Crear cuenta"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary hover:underline">
              {mode === "login" ? "Crear cuenta nueva" : "Ya tengo cuenta"}
            </button>
          </div>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">← Volver al sitio</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
