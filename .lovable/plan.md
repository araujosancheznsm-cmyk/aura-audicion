
# Catálogo Premium de Audífonos — Aura Audición

Voy a construir el catálogo respaldado por base de datos, un panel administrativo privado, y aplicar los ajustes globales solicitados (favicon, email, header, garantía, evaluaciones).

## 1. Backend (Lovable Cloud)

Activar Lovable Cloud y crear:

**Tabla `hearing_aids`**
- id, brand (Oticon/Unitron), model, type (BTE/CIC/ITC/RIC), technology, hearing_loss_level, short_description, full_description, bluetooth (bool), rechargeable (bool), color, warranty (default "1 año"), main_image_url, gallery (jsonb array de URLs), compatible_accessories (jsonb), features (jsonb), technologies (jsonb array), benefits (jsonb array), faqs (jsonb array), active (bool), sort_order, created_at, updated_at.

**Storage bucket `hearing-aids`** público para fotografías de producto.

**Roles**: tabla `user_roles` + enum `app_role` + función `has_role` (patrón estándar). Solo admin puede escribir; lectura pública de modelos activos.

**Seed**: insertar los 30 modelos exactos que listaste (Oticon 26 + Unitron 6) con `main_image_url = null` — se mostrará un placeholder elegante hasta que subas las fotos reales.

## 2. Rutas nuevas

- `/catalogo` — grid premium con filtros (marca, tipo, bluetooth, recargable, nivel de pérdida, búsqueda por nombre). Tarjetas con hover, scroll reveal, glassmorphism ligero.
- `/catalogo/$slug` — página individual: galería con thumbnails, descripción completa, beneficios, tecnologías, accesorios, FAQs, CTAs WhatsApp + agendar, productos relacionados.
- `/admin` — login (Lovable Cloud auth email/password).
- `/_authenticated/admin/catalogo` — panel CRUD: listar, crear, editar, activar/desactivar, reordenar (drag or sort_order input), subir imagen principal + galería múltiple al bucket.

El catálogo antiguo `/audifonos` seguirá funcionando pero el nuevo `/catalogo` es el oficial; agregar link en nav.

## 3. Placeholder elegante

Componente `<ProductImagePlaceholder />`: fondo blanco/gris muy claro, icono minimalista de audífono, texto "Fotografía en preparación" en tipografía ligera. Se usa cuando `main_image_url` es null. Nunca se muestran imágenes genéricas de otros modelos.

## 4. Ajustes globales

- **Favicon**: subir el ícono adjunto como `public/favicon.png`, referenciar en `__root.tsx`, borrar el `.ico` por defecto.
- **Email**: cambiar `contacto@auraaudicion.pe` → `sedegeneralaura@gmail.com` en `src/lib/site.ts`.
- **Header**: quitar el número telefónico de la barra superior (mantenerlo en footer y contacto).
- **Garantía**: cambiar textos a "1 año" donde aparezca.
- **Servicios**: actualizar a "Video otoscopia, Audiometría, Logoaudiometría" con duración "45 minutos" para evaluación completa.

## 5. Diseño premium

- Mucho whitespace, tipografía display existente.
- Cards: `rounded-3xl`, sombra ultra sutil, hover con `translateY(-4px)` y sombra suave.
- Animaciones `fade-in` + `scale-in` en scroll (IntersectionObserver ligero).
- Galería con thumbnails laterales estilo Apple; imagen principal grande con zoom sutil al hover.
- Filtros como chips minimalistas al estilo Oticon.
- Móvil: filtros en drawer, galería swipe.

## Detalles técnicos

- Server functions con `requireSupabaseAuth` para escrituras admin (verifican rol admin vía `has_role`).
- Lecturas públicas del catálogo activo vía server publishable client (política `TO anon SELECT WHERE active = true`).
- Subida de imágenes: input file → upload al bucket `hearing-aids` → guardar URL pública en la fila.
- Router: `catalogo.tsx` (index), `catalogo.$slug.tsx`, `_authenticated/admin.catalogo.tsx`, `_authenticated/admin.catalogo.$id.tsx`.

## Nota importante

El sitio ya tiene imágenes generadas para los modelos antiguos. Éstas quedarán solo en la ruta `/audifonos` legacy. El nuevo `/catalogo` arrancará **sin fotos** (placeholders) — tú subirás las reales desde el panel admin. ¿Confirmas que procedo, o prefieres que también elimine la ruta `/audifonos` antigua?
