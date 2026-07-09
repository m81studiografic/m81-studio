import type { PortableTextBlock } from "@portabletext/types";

export type Locale = "ro" | "en";

export type Category =
  | "branding"
  | "technology"
  | "research"
  | "strategic"
  | "case";

export interface Metric {
  value: string;
  label: string;
}

/* Imagine Sanity (referință) */
export interface SanityImage {
  _type: "image";
  asset?: { _ref?: string; _id?: string; url?: string };
  alt?: string;
  hotspot?: { x: number; y: number };
  [key: string]: unknown;
}

/* Articolul așa cum vine din GROQ (câmpuri ro/en separate) */
export interface ArticleDoc {
  _id: string;
  category: Category;
  subcategory?: string;
  slug: string;
  publishedAt: string;
  readTime?: number;
  featured?: boolean;
  coverImage: SanityImage;
  topics?: string[];
  reportUrl?: string;
  caseClient?: string;
  caseTimeline?: string;
  caseServices?: string[];
  metrics?: { value: string; labelRo?: string; labelEn?: string }[];
  testimonialAuthor?: string;
  testimonialRo?: string;
  testimonialEn?: string;
  titleRo: string;
  titleEn?: string;
  subtitleRo?: string;
  subtitleEn?: string;
  excerptRo: string;
  excerptEn?: string;
  takeawaysRo?: string[];
  takeawaysEn?: string[];
  bodyRo?: PortableTextBlock[];
  bodyEn?: PortableTextBlock[];
  audioRoUrl?: string;
  audioEnUrl?: string;
}

/* Articol rezolvat pe o singură limbă (cu fallback pe RO) */
export interface ResolvedArticle {
  _id: string;
  category: Category;
  subcategory?: string;
  slug: string;
  publishedAt: string;
  readTime?: number;
  featured?: boolean;
  coverImage: SanityImage;
  topics?: string[];
  reportUrl?: string;
  caseClient?: string;
  caseTimeline?: string;
  caseServices?: string[];
  metrics?: Metric[];
  testimonialAuthor?: string;
  testimonial?: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  takeaways?: string[];
  body?: PortableTextBlock[];
  audioUrl?: string;
}

const CATEGORY_LABELS: Record<Category, string> = {
  branding: "Branding & Experience",
  technology: "Technology & Experience",
  research: "Industry Research",
  strategic: "Strategic Insights",
  case: "Design critique",
};

export function categoryLabel(c: Category): string {
  return CATEGORY_LABELS[c] ?? c;
}

/* Alege valoarea pe limbă, cu fallback pe RO (autorul scriem mereu RO) */
function pick<T>(locale: Locale, ro: T, en: T | undefined): T {
  return locale === "en" && en != null && en !== "" ? en : ro;
}

export function resolveArticle(
  doc: ArticleDoc,
  locale: Locale,
): ResolvedArticle {
  return {
    _id: doc._id,
    category: doc.category,
    subcategory: doc.subcategory,
    slug: doc.slug,
    publishedAt: doc.publishedAt,
    readTime: doc.readTime,
    featured: doc.featured,
    coverImage: doc.coverImage,
    topics: doc.topics,
    reportUrl: doc.reportUrl,
    caseClient: doc.caseClient,
    caseTimeline: doc.caseTimeline,
    caseServices: doc.caseServices,
    metrics: doc.metrics?.map((m) => ({
      value: m.value,
      label: pick(locale, m.labelRo || "", m.labelEn) || "",
    })),
    testimonialAuthor: doc.testimonialAuthor,
    testimonial: pick(locale, doc.testimonialRo || "", doc.testimonialEn) || undefined,
    title: pick(locale, doc.titleRo, doc.titleEn),
    subtitle: pick(locale, doc.subtitleRo, doc.subtitleEn),
    excerpt: pick(locale, doc.excerptRo, doc.excerptEn),
    takeaways:
      locale === "en" && doc.takeawaysEn && doc.takeawaysEn.length
        ? doc.takeawaysEn
        : doc.takeawaysRo,
    body:
      locale === "en" && doc.bodyEn && doc.bodyEn.length
        ? doc.bodyEn
        : doc.bodyRo,
    /* audio: fără fallback între limbi (o voce RO n-ar trebui să citească pagina EN) */
    audioUrl: locale === "en" ? doc.audioEnUrl : doc.audioRoUrl,
  };
}

/* Data formatată scurt pe limbă */
export function formatDate(iso: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "ro-RO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
