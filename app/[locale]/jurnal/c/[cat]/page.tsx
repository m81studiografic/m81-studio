import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { articlesByCategoryQuery } from "@/sanity/lib/queries";
import {
  type ArticleDoc,
  type Locale,
  resolveArticle,
} from "../../_lib/types";
import { metaBySlug, allCategorySlugs } from "../../_lib/categories";
import CategoryView from "../../_components/CategoryView";

export const revalidate = 60;

export async function generateStaticParams() {
  const locales = ["ro", "en"];
  return allCategorySlugs().flatMap((cat) =>
    locales.map((locale) => ({ locale, cat })),
  );
}

async function getArticles(category: string): Promise<ArticleDoc[]> {
  try {
    return await client.fetch(
      articlesByCategoryQuery,
      { category },
      { next: { revalidate: 60 } },
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; cat: string }>;
}): Promise<Metadata> {
  const { locale, cat } = await params;
  const meta = metaBySlug(cat);
  if (!meta) return {};
  return {
    title: `${meta.label} — M81 Jurnal`,
    description: locale === "en" ? meta.introEn : meta.introRo,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; cat: string }>;
}) {
  const { locale, cat } = await params;
  const meta = metaBySlug(cat);
  if (!meta) notFound();

  const loc = locale as Locale;
  const docs = await getArticles(meta.value);
  const items = docs.map((d) => resolveArticle(d, loc));

  return (
    <CategoryView
      locale={loc}
      label={meta.label}
      intro={loc === "en" ? meta.introEn : meta.introRo}
      items={items}
    />
  );
}
