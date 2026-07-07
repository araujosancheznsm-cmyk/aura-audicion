import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { normalizeAid, type HearingAid } from "@/lib/hearing-aids";
import { createHearingAid, getAdminHearingAids, toggleHearingAidActive } from "@/lib/admin-catalog.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, LogOut, Pencil, Image as ImageIcon } from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/_authenticated/admin/catalogo/")({
  head: () => ({ meta: [{ title: "Admin · Catálogo" }, { name: "robots", content: "noindex" }] }),
  component: AdminList,
});

function AdminList() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchAll = useServerFn(getAdminHearingAids);
  const createAid = useServerFn(createHearingAid);
  const toggleAid = useServerFn(toggleHearingAidActive);
  const { data, isLoading } = useQuery({
    queryKey: ["admin-catalog"],
    queryFn: async () => (await fetchAll()).map(normalizeAid),
  });
  const [q, setQ] = useState("");

  const filtered = (data ?? []).filter((a) => `${a.brand} ${a.model}`.toLowerCase().includes(q.toLowerCase()));

  async function toggleActive(a: HearingAid) {
    try {
      await toggleAid({ data: { id: a.id, active: !a.active } });
      qc.invalidateQueries({ queryKey: ["admin-catalog"] });
    } catch (error: any) {
      alert(error.message ?? "No se pudo cambiar el estado.");
    }
  }

  async function createNew() {
    const slug = prompt("Slug único (ej: oticon-nuevo-modelo)");
    if (!slug) return;
    const brand = prompt("Marca (Oticon / Unitron)") ?? "Oticon";
    const model = prompt("Modelo") ?? "Nuevo";
    const type = prompt("Tipo (BTE / CIC / ITC / etc)") ?? "BTE";
    try {
      const data = await createAid({ data: { slug, brand, model, type, sort_order: (filtered.length + 1) * 10 } });
      navigate({ to: "/admin/catalogo/$id", params: { id: data.id } });
    } catch (error: any) {
      alert(error.message ?? "No se pudo crear el modelo.");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Panel</div>
              <div className="font-display text-lg leading-none">Catálogo</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm"><Link to="/">Ver sitio</Link></Button>
            <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="size-4 mr-1" /> Salir</Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar…" className="pl-9 h-11 rounded-full" />
          </div>
          <Button onClick={createNew} className="rounded-full bg-gradient-primary text-primary-foreground">
            <Plus className="mr-1 size-4" /> Nuevo modelo
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-16">Cargando…</div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((a) => (
              <Card key={a.id} className="flex items-center gap-4 p-4 rounded-2xl border-border/60 hover:shadow-soft transition-shadow">
                <div className="size-16 rounded-xl bg-secondary/50 flex items-center justify-center overflow-hidden shrink-0">
                  {a.main_image_url
                    ? <img src={a.main_image_url} className="size-full object-contain p-1" alt="" />
                    : <ImageIcon className="size-6 text-muted-foreground/60" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-widest text-gold font-semibold">{a.brand}</div>
                  <div className="font-medium truncate">{a.model}</div>
                  <div className="text-xs text-muted-foreground">{a.type} · orden {a.sort_order}</div>
                </div>
                <div className="flex items-center gap-2">
                  {a.active ? <Badge>Activo</Badge> : <Badge variant="outline">Oculto</Badge>}
                  <Button size="sm" variant="ghost" onClick={() => toggleActive(a)}>{a.active ? "Ocultar" : "Activar"}</Button>
                  <Button size="sm" asChild><Link to="/admin/catalogo/$id" params={{ id: a.id }}><Pencil className="size-3.5 mr-1" /> Editar</Link></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
