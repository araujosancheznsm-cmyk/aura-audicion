export type HearingAid = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  type: string;
  technology: string | null;
  hearing_loss_level: string | null;
  short_description: string | null;
  full_description: string | null;
  bluetooth: boolean;
  rechargeable: boolean;
  color: string | null;
  warranty: string;
  main_image_url: string | null;
  gallery: string[];
  compatible_accessories: string[];
  features: string[];
  technologies: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  active: boolean;
  sort_order: number;
};

export function normalizeAid(row: any): HearingAid {
  const asArr = (v: any) => (Array.isArray(v) ? v : []);
  return {
    ...row,
    gallery: asArr(row.gallery),
    compatible_accessories: asArr(row.compatible_accessories),
    features: asArr(row.features),
    technologies: asArr(row.technologies),
    benefits: asArr(row.benefits),
    faqs: asArr(row.faqs),
  };
}
