import type { Category } from "./types";

/* Metadate de categorie: slug URL + etichetă + intro (RO/EN).
   Folosite pe /jurnal (secțiuni) și pe paginile /jurnal/c/<slug>. */
export interface CategoryMeta {
  value: Category;
  slug: string; // segment URL: /jurnal/c/<slug>
  label: string; // etichetă afișată (la fel pe ambele limbi, ca restul categoriilor)
  introRo: string;
  introEn: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  {
    value: "branding",
    slug: "branding",
    label: "Branding & Experience",
    introRo: "Eseuri despre cum o afacere devine un brand — identitate, percepție și încredere.",
    introEn: "Essays on how a business becomes a brand — identity, perception and trust.",
  },
  {
    value: "research",
    slug: "research",
    label: "Industry Research",
    introRo: "Observații, analize și oportunități identificate în industriile pe care le investigăm.",
    introEn: "Observations, analyses and opportunities identified in the industries we investigate.",
  },
  {
    value: "case",
    slug: "design-critique",
    label: "Design critique",
    introRo: "Analize de branding, UX și experiență digitală pentru branduri reale.",
    introEn: "Branding, UX and digital-experience analyses of real brands.",
  },
  {
    value: "technology",
    slug: "technology",
    label: "Technology & Experience",
    introRo: "Cum tehnologia și AI schimbă experiențele digitale și produsul.",
    introEn: "How technology and AI reshape digital experiences and product.",
  },
  {
    value: "strategic",
    slug: "strategic",
    label: "Strategic Insights",
    introRo: "Idei strategice despre creștere, claritate și diferențiere.",
    introEn: "Strategic ideas on growth, clarity and differentiation.",
  },
];

export const metaBySlug = (slug: string): CategoryMeta | undefined =>
  CATEGORY_META.find((c) => c.slug === slug);

export const metaByValue = (v: Category): CategoryMeta | undefined =>
  CATEGORY_META.find((c) => c.value === v);

export const allCategorySlugs = (): string[] => CATEGORY_META.map((c) => c.slug);
