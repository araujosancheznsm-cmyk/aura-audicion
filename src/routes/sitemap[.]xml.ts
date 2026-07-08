import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

const BASE_URL = "https://aura-audicion.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          { path: "/nosotros", changefreq: "monthly", priority: "0.7", lastmod: today },
          { path: "/servicios", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/catalogo", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/marcas", changefreq: "monthly", priority: "0.7", lastmod: today },
          { path: "/accesorios", changefreq: "monthly", priority: "0.7", lastmod: today },
          { path: "/blog", changefreq: "weekly", priority: "0.7", lastmod: today },
          { path: "/faq", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/contacto", changefreq: "monthly", priority: "0.9", lastmod: today },
        ];

        try {
          const { data } = await supabase
            .from("hearing_aids")
            .select("slug,updated_at")
            .eq("active", true);
          for (const row of data ?? []) {
            if (!row.slug) continue;
            entries.push({
              path: `/catalogo/${row.slug}`,
              changefreq: "monthly",
              priority: "0.8",
              lastmod: row.updated_at ? String(row.updated_at).slice(0, 10) : today,
            });
          }
        } catch {
          // Sitemap still returned with static routes if catalog fetch fails.
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
