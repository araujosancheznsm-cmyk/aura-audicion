import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { normalizeAid, type HearingAid } from "@/lib/hearing-aids";
import {
  deleteHearingAid,
  getAdminHearingAid,
  removeHearingAidImage,
  saveHearingAid,
  uploadHearingAidImage,
} from "@/lib/admin-catalog.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ImageIcon, Save, Trash2, Upload, X } from "lucide-react";

export function HearingAidEditor({
  aidId,
  onBack,
  onDeleted,
}: {
  aidId: string;
  onBack: () => void;
  onDeleted: () => void;
}) {
  const qc = useQueryClient();
  const fetchAid = useServerFn(getAdminHearingAid);
  const saveAid = useServerFn(saveHearingAid);
  const deleteAid = useServerFn(deleteHearingAid);
  const uploadAidImage = useServerFn(uploadHearingAidImage);
  const removeAidImage = useServerFn(removeHearingAidImage);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-aid", aidId],
    queryFn: async () => {
      const aid = await fetchAid({ data: { id: aidId } });
      return aid ? normalizeAid(aid) : null;
    },
  });
  const [form, setForm] = useState<HearingAid | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading) return <div className="py-16 text-center text-muted-foreground">Cargando editor…</div>;
  if (error) return <div className="py-16 text-center text-destructive">{error.message}</div>;
  if (!form) return <div className="py-16 text-center text-muted-foreground">No se encontró este producto.</div>;

  function set<K extends keyof HearingAid>(key: K, value: HearingAid[K]) {
    setForm((current) => (current ? { ...current, [key]: value } : current));
  }

  function fileToBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
      reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
      reader.readAsDataURL(file);
    });
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    try {
      const updated = await saveAid({
        data: {
          id: aidId,
          values: {
            slug: form.slug,
            brand: form.brand,
            model: form.model,
            type: form.type,
            technology: form.technology,
            hearing_loss_level: form.hearing_loss_level,
            short_description: form.short_description,
            full_description: form.full_description,
            bluetooth: form.bluetooth,
            rechargeable: form.rechargeable,
            color: form.color,
            warranty: form.warranty,
            main_image_url: form.main_image_url,
            gallery: form.gallery,
            compatible_accessories: form.compatible_accessories,
            features: form.features,
            technologies: form.technologies,
            benefits: form.benefits,
            faqs: form.faqs,
            active: form.active,
            sort_order: form.sort_order,
          },
        },
      });
      setForm(normalizeAid(updated));
      qc.invalidateQueries();
      alert("Guardado");
    } catch (saveError: any) {
      alert(saveError.message ?? "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  async function del() {
    if (!confirm("¿Eliminar definitivamente?")) return;
    try {
      await deleteAid({ data: { id: aidId } });
      qc.invalidateQueries({ queryKey: ["admin-catalog"] });
      onDeleted();
    } catch (deleteError: any) {
      alert(deleteError.message ?? "No se pudo eliminar.");
    }
  }

  async function onMainUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const updated = await uploadAidImage({
        data: { aidId, id: aidId, filename: file.name, contentType: file.type || "image/png", base64, placement: "main" },
      });
      setForm(normalizeAid(updated));
      qc.invalidateQueries();
    } catch (uploadError: any) {
      alert(uploadError.message ?? "No se pudo subir la imagen.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function onGalleryUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      let latest = form;
      for (const file of files) {
        const base64 = await fileToBase64(file);
        const updated = await uploadAidImage({
          data: { aidId, id: aidId, filename: file.name, contentType: file.type || "image/png", base64, placement: "gallery" },
        });
        latest = normalizeAid(updated);
      }
      setForm(latest);
      qc.invalidateQueries();
    } catch (uploadError: any) {
      alert(uploadError.message ?? "No se pudieron subir las imágenes.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function removeImage(placement: "main" | "gallery", url?: string) {
    try {
      const updated = await removeAidImage({ data: { id: aidId, placement, url } });
      setForm(normalizeAid(updated));
      qc.invalidateQueries();
    } catch (removeError: any) {
      alert(removeError.message ?? "No se pudo quitar la imagen.");
    }
  }

  const listInput = (label: string, key: "features" | "technologies" | "benefits" | "compatible_accessories") => (
    <div>
      <Label>{label} (una por línea)</Label>
      <Textarea
        rows={4}
        value={(form[key] as string[]).join("\n")}
        onChange={(event) => set(key, event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) as any)}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="size-4 mr-1" /> Volver al catálogo</Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={del}><Trash2 className="size-4 mr-1" /> Eliminar</Button>
          <Button size="sm" onClick={save} disabled={saving} className="bg-gradient-primary text-primary-foreground">
            <Save className="size-4 mr-1" /> {saving ? "Guardando…" : "Guardar"}
          </Button>
        </div>
      </div>

      <Card><CardContent className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Marca</Label><Input value={form.brand} onChange={(event) => set("brand", event.target.value)} /></div>
          <div><Label>Modelo</Label><Input value={form.model} onChange={(event) => set("model", event.target.value)} /></div>
          <div><Label>Tipo</Label><Input value={form.type} onChange={(event) => set("type", event.target.value)} /></div>
          <div><Label>Slug</Label><Input value={form.slug} onChange={(event) => set("slug", event.target.value)} /></div>
          <div><Label>Tecnología</Label><Input value={form.technology ?? ""} onChange={(event) => set("technology", event.target.value)} /></div>
          <div><Label>Nivel de pérdida</Label><Input value={form.hearing_loss_level ?? ""} onChange={(event) => set("hearing_loss_level", event.target.value)} /></div>
          <div><Label>Color</Label><Input value={form.color ?? ""} onChange={(event) => set("color", event.target.value)} /></div>
          <div><Label>Garantía</Label><Input value={form.warranty} onChange={(event) => set("warranty", event.target.value)} /></div>
          <div><Label>Orden</Label><Input type="number" value={form.sort_order} onChange={(event) => set("sort_order", Number(event.target.value))} /></div>
        </div>
        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-2"><Switch checked={form.bluetooth} onCheckedChange={(value) => set("bluetooth", value)} /> Bluetooth</label>
          <label className="flex items-center gap-2"><Switch checked={form.rechargeable} onCheckedChange={(value) => set("rechargeable", value)} /> Recargable</label>
          <label className="flex items-center gap-2"><Switch checked={form.active} onCheckedChange={(value) => set("active", value)} /> Activo</label>
        </div>
      </CardContent></Card>

      <Card><CardContent className="p-6 space-y-4">
        <div><Label>Descripción corta</Label><Textarea rows={2} value={form.short_description ?? ""} onChange={(event) => set("short_description", event.target.value)} /></div>
        <div><Label>Descripción completa</Label><Textarea rows={6} value={form.full_description ?? ""} onChange={(event) => set("full_description", event.target.value)} /></div>
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
            ? <img src={form.main_image_url} className="size-full object-contain p-4" alt={`Imagen principal de ${form.brand} ${form.model}`} />
            : <ImageIcon className="size-10 text-muted-foreground/60" />}
        </div>
        {form.main_image_url && <div className="text-center"><Button size="sm" variant="outline" onClick={() => removeImage("main")}>Quitar imagen principal</Button></div>}
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
          {form.gallery.map((src, index) => (
            <div key={`${src}-${index}`} className="relative aspect-square rounded-xl bg-secondary/50 overflow-hidden group">
              <img src={src} className="size-full object-contain p-2" alt={`Galería ${index + 1} de ${form.brand} ${form.model}`} />
              <button
                onClick={() => removeImage("gallery", src)}
                className="absolute top-1 right-1 size-6 rounded-full bg-background/90 text-foreground opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-soft"
                aria-label="Quitar imagen"
              ><X className="size-3.5" /></button>
            </div>
          ))}
          {form.gallery.length === 0 && <div className="col-span-full text-sm text-muted-foreground text-center py-6">Sin imágenes en la galería.</div>}
        </div>
        {uploading && <div className="text-sm text-muted-foreground">Subiendo…</div>}
      </CardContent></Card>
    </div>
  );
}