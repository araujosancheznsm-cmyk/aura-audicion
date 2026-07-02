import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { normalizeAid, type HearingAid } from "@/lib/hearing-aids";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Trash2, Upload, X, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/catalogo/$id")({
  head: () => ({ meta: [{ title: "Editar audífono · Admin" }, { name: "robots", content: "noindex" }] }),
  component: EditPage,
});

async function fetchAid(id: string): Promise<HearingAid | null> {
  const { data, error } = await supabase.from("hearing_aids").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? normalizeAid(data) : null;
}

async function uploadImage(id: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${id}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("hearing-aids").upload(path, file, { upsert: true });
  if (error) throw error;
  const { data, error: sErr } = await supabase.storage.from("hearing-aids").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (sErr) throw sErr;
  return data.signedUrl;
}

function EditPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-aid", id], queryFn: () => fetchAid(id) });
  const [form, setForm] = useState<HearingAid | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading || !form) return <div className="pt-32 text-center text-muted-foreground">Cargando…</div>;

  function set<K extends keyof HearingAid>(k: K, v: HearingAid[K]) {
    setForm((f) => (f ? { ...f, [k]: v } : f));
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    const { id: _, ...update } = form;
    const { error } = await supabase.from("hearing_aids").update(update).eq("id", id);
    setSaving(false);
    if (error) return alert(error.message);
    qc.invalidateQueries();
    alert("Guardado");
  }

  async function del() {
    if (!confirm("¿Eliminar definitivamente?")) return;
    const { error } = await supabase.from("hearing_aids").delete().eq("id", id);
    if (error) return alert(error.message);
    navigate({ to: "/admin/catalogo" });
  }

  async function onMainUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f || !form) return;
    setUploading(true);
    try {
      const url = await uploadImage(id, f);
      set("main_image_url", url);
    } catch (err: any) { alert(err.message); }
    finally { setUploading(false); }
  }

  async function onGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length || !form) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map((f) => uploadImage(id, f)));
      set("gallery", [...form.gallery, ...urls]);
    } catch (err: any) { alert(err.message); }
    finally { setUploading(false); }
  }

  const listInput = (label: string, key: "features" | "technologies" | "benefits" | "compatible_accessories") => (
    <div>
      <Label>{label} (una por línea)</Label>
      <Textarea
        rows={4}
        value={(form[key] as string[]).join("\n")}
        onChange={(e) => set(key, e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) as any)}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/20 pb-20">
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border/60">
        <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm"><Link to="/admin/catalogo"><ArrowLeft className="size-4 mr-1" /> Volver</Link></Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={del}><Trash2 className="size-4 mr-1" /> Eliminar</Button>
            <Button size="sm" onClick={save} disabled={saving} className="bg-gradient-primary text-primary-foreground">
              <Save className="size-4 mr-1" /> {saving ? "Guardando…" : "Guardar"}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <Card><CardContent className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Marca</Label><Input value={form.brand} onChange={(e) => set("brand", e.target.value)} /></div>
            <div><Label>Modelo</Label><Input value={form.model} onChange={(e) => set("model", e.target.value)} /></div>
            <div><Label>Tipo</Label><Input value={form.type} onChange={(e) => set("type", e.target.value)} /></div>
            <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => set("slug", e.target.value)} /></div>
            <div><Label>Tecnología</Label><Input value={form.technology ?? ""} onChange={(e) => set("technology", e.target.value)} /></div>
            <div><Label>Nivel de pérdida</Label><Input value={form.hearing_loss_level ?? ""} onChange={(e) => set("hearing_loss_level", e.target.value)} /></div>
            <div><Label>Color</Label><Input value={form.color ?? ""} onChange={(e) => set("color", e.target.value)} /></div>
            <div><Label>Garantía</Label><Input value={form.warranty} onChange={(e) => set("warranty", e.target.value)} /></div>
            <div><Label>Orden</Label><Input type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} /></div>
          </div>
          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2"><Switch checked={form.bluetooth} onCheckedChange={(v) => set("bluetooth", v)} /> Bluetooth</label>
            <label className="flex items-center gap-2"><Switch checked={form.rechargeable} onCheckedChange={(v) => set("rechargeable", v)} /> Recargable</label>
            <label className="flex items-center gap-2"><Switch checked={form.active} onCheckedChange={(v) => set("active", v)} /> Activo</label>
          </div>
        </CardContent></Card>

        <Card><CardContent className="p-6 space-y-4">
          <div><Label>Descripción corta</Label><Textarea rows={2} value={form.short_description ?? ""} onChange={(e) => set("short_description", e.target.value)} /></div>
          <div><Label>Descripción completa</Label><Textarea rows={6} value={form.full_description ?? ""} onChange={(e) => set("full_description", e.target.value)} /></div>
          {listInput("Beneficios", "benefits")}
          {listInput("Características", "features")}
          {listInput("Tecnologías", "technologies")}
          {listInput("Accesorios compatibles", "compatible_accessories")}
        </CardContent></Card>

        <Card><CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base">Imagen principal</Label>
            <Button size="sm" variant="outline" asChild><label className="cursor-pointer">
              <Upload className="size-4 mr-1" /> Subir
              <input type="file" accept="image/*" hidden onChange={onMainUpload} />
            </label></Button>
          </div>
          <div className="aspect-square max-w-xs mx-auto rounded-2xl bg-secondary/50 flex items-center justify-center overflow-hidden">
            {form.main_image_url
              ? <img src={form.main_image_url} className="size-full object-contain p-4" alt="" />
              : <ImageIcon className="size-10 text-muted-foreground/60" />}
          </div>
        </CardContent></Card>

        <Card><CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base">Galería</Label>
            <Button size="sm" variant="outline" asChild><label className="cursor-pointer">
              <Upload className="size-4 mr-1" /> Subir varias
              <input type="file" accept="image/*" multiple hidden onChange={onGalleryUpload} />
            </label></Button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {form.gallery.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl bg-secondary/50 overflow-hidden group">
                <img src={src} className="size-full object-contain p-2" alt="" />
                <button
                  onClick={() => set("gallery", form.gallery.filter((_, j) => j !== i))}
                  className="absolute top-1 right-1 size-6 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center"
                ><X className="size-3.5" /></button>
              </div>
            ))}
            {form.gallery.length === 0 && <div className="col-span-full text-sm text-muted-foreground text-center py-6">Sin imágenes en la galería.</div>}
          </div>
          {uploading && <div className="text-sm text-muted-foreground">Subiendo…</div>}
        </CardContent></Card>
      </div>
    </div>
  );
}
