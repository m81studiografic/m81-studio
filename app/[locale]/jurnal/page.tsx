import { client } from "@/sanity/lib/client";
import { allArticlesQuery } from "@/sanity/lib/queries";
import {
  type ArticleDoc,
  type Locale,
  type ResolvedArticle,
  resolveArticle,
} from "./_lib/types";
import { CATEGORY_META } from "./_lib/categories";
import JurnalIndex from "./_components/JurnalIndex";

export const revalidate = 60; // reîmprospătare la 60s

async function getArticles(): Promise<ArticleDoc[]> {
  try {
    return await client.fetch(allArticlesQuery, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}

export interface CategoryGroup {
  value: string;
  slug: string;
  label: string;
  intro: string;
  items: ResolvedArticle[]; // toate articolele din categorie (cele mai noi primele)
  total: number;
}

export default async function JurnalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  const docs = await getArticles();
  const all: ResolvedArticle[] = docs.map((d) => resolveArticle(d, loc));

  /* eseu principal: cel marcat featured, altfel cel mai nou */
  const featured = all.find((a) => a.featured) ?? all[0] ?? null;

  /* grupuri pe categorie, în ordinea din CATEGORY_META */
  const groups: CategoryGroup[] = CATEGORY_META.map((meta) => {
    const items = all.filter((a) => a.category === meta.value);
    return {
      value: meta.value,
      slug: meta.slug,
      label: meta.label,
      intro: loc === "en" ? meta.introEn : meta.introRo,
      items,
      total: items.length,
    };
  }).filter((g) => g.total > 0);

  return <JurnalIndex locale={loc} featured={featured} groups={groups} />;
}
