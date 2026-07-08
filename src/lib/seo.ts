export const SITE_URL = "https://aura-audicion.lovable.app";

export const canonical = (path: string) => ({
  rel: "canonical" as const,
  href: `${SITE_URL}${path}`,
});

export const ogUrl = (path: string) => ({
  property: "og:url",
  content: `${SITE_URL}${path}`,
});
