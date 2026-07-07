import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const aidValuesSchema = z.object({
  slug: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  type: z.string().min(1),
  technology: z.string().nullable().optional(),
  hearing_loss_level: z.string().nullable().optional(),
  short_description: z.string().nullable().optional(),
  full_description: z.string().nullable().optional(),
  bluetooth: z.boolean(),
  rechargeable: z.boolean(),
  color: z.string().nullable().optional(),
  warranty: z.string().min(1),
  main_image_url: z.string().nullable().optional(),
  gallery: z.array(z.string()),
  compatible_accessories: z.array(z.string()),
  features: z.array(z.string()),
  technologies: z.array(z.string()),
  benefits: z.array(z.string()),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  active: z.boolean(),
  sort_order: z.number(),
});

export const getAdminHearingAids = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: role, error: roleError } = await context.supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !role) throw new Error("No tienes permisos de administrador.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("hearing_aids")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getAdminHearingAid = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: role, error: roleError } = await context.supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !role) throw new Error("No tienes permisos de administrador.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: aid, error } = await supabaseAdmin
      .from("hearing_aids")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return aid;
  });

export const createHearingAid = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({
      slug: z.string().min(1),
      brand: z.string().min(1),
      model: z.string().min(1),
      type: z.string().min(1),
      sort_order: z.number(),
    }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { data: role, error: roleError } = await context.supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !role) throw new Error("No tienes permisos de administrador.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: aid, error } = await supabaseAdmin
      .from("hearing_aids")
      .insert(data)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return aid;
  });

export const toggleHearingAidActive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid(), active: z.boolean() }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: role, error: roleError } = await context.supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !role) throw new Error("No tienes permisos de administrador.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: aid, error } = await supabaseAdmin
      .from("hearing_aids")
      .update({ active: data.active, updated_at: new Date().toISOString() })
      .eq("id", data.id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return aid;
  });

export const saveHearingAid = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid(), values: aidValuesSchema }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: role, error: roleError } = await context.supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !role) throw new Error("No tienes permisos de administrador.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: aid, error } = await supabaseAdmin
      .from("hearing_aids")
      .update({ ...data.values, updated_at: new Date().toISOString() })
      .eq("id", data.id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return aid;
  });

export const deleteHearingAid = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: role, error: roleError } = await context.supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !role) throw new Error("No tienes permisos de administrador.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("hearing_aids").delete().eq("id", data.id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const uploadHearingAidImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({
      id: z.string().uuid(),
      filename: z.string().min(1),
      contentType: z.string().min(1),
      base64: z.string().min(1),
      placement: z.enum(["main", "gallery"]),
    }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { data: role, error: roleError } = await context.supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !role) throw new Error("No tienes permisos de administrador.");
    if (!data.contentType.startsWith("image/")) throw new Error("El archivo debe ser una imagen.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const safeName = data.filename.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
    const extension = safeName.includes(".") ? safeName.split(".").pop() : "png";
    const binary = atob(data.base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const path = `${data.id}/${data.placement}-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("hearing-aids")
      .upload(path, bytes, { contentType: data.contentType, upsert: true });

    if (uploadError) throw new Error(uploadError.message);

    const { data: signed, error: signError } = await supabaseAdmin.storage
      .from("hearing-aids")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);

    if (signError) throw new Error(signError.message);

    const { data: current, error: currentError } = await supabaseAdmin
      .from("hearing_aids")
      .select("gallery")
      .eq("id", data.id)
      .maybeSingle();

    if (currentError) throw new Error(currentError.message);

    const gallery = Array.isArray(current?.gallery) ? current.gallery : [];
    const update = data.placement === "main"
      ? { main_image_url: signed.signedUrl, updated_at: new Date().toISOString() }
      : { gallery: [...gallery, signed.signedUrl], updated_at: new Date().toISOString() };

    const { data: aid, error: updateError } = await supabaseAdmin
      .from("hearing_aids")
      .update(update)
      .eq("id", data.id)
      .select("*")
      .single();

    if (updateError) throw new Error(updateError.message);
    return aid;
  });

export const removeHearingAidImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({
      id: z.string().uuid(),
      placement: z.enum(["main", "gallery"]),
      url: z.string().optional(),
    }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { data: role, error: roleError } = await context.supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !role) throw new Error("No tienes permisos de administrador.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: current, error: currentError } = await supabaseAdmin
      .from("hearing_aids")
      .select("gallery")
      .eq("id", data.id)
      .maybeSingle();

    if (currentError) throw new Error(currentError.message);

    const gallery = Array.isArray(current?.gallery) ? current.gallery : [];
    const update = data.placement === "main"
      ? { main_image_url: null, updated_at: new Date().toISOString() }
      : { gallery: gallery.filter((item) => item !== data.url), updated_at: new Date().toISOString() };

    const { data: aid, error } = await supabaseAdmin
      .from("hearing_aids")
      .update(update)
      .eq("id", data.id)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return aid;
  });