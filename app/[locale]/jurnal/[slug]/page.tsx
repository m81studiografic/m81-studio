import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  articleBySlugQuery,
  allSlugsQuery,
} from "@/sanity/lib/queries";
import {
  type ArticleDoc,
  type Locale,
  resolveArticle,
} from "../_lib/types";
import ResearchSkin from "../_skins/ResearchSkin";
import BrandingSkin from "../_skins/BrandingSkin";
import TechnologySkin from "../_skins/TechnologySkin";
import StrategicSkin from "../_skins/StrategicSkin";
import CaseStudySkin from "../_skins/CaseStudySkin";

export const revalidate = 60; // reîmprospătare la 60s (articole zilnice)

export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(allSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

async function getArticle(slug: string): Promise<ArticleDoc | null> {
  return client.fetch(articleBySlugQuery, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = await getArticle(slug);
  if (!doc) return {};
  const a = resolveArticle(doc, locale as Locale);
  return {
    title: `${a.title} — M81 Jurnal`,
    description: a.excerpt,
    openGraph: {
      title: a.title,
      description: a.excerpt,
      type: "article",
      images: a.coverImage
        ? [urlFor(a.coverImage).width(1200).height(630).fit("crop").url()]
        : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const doc = await getArticle(slug);
  if (!doc) notFound();

  const article = resolveArticle(doc, locale as Locale);
  const loc = locale as Locale;

  switch (article.category) {
    case "branding":
      return <BrandingSkin article={article} locale={loc} />;
    case "technology":
      return <TechnologySkin article={article} locale={loc} />;
    case "strategic":
      return <StrategicSkin article={article} locale={loc} />;
    case "case":
      return <CaseStudySkin article={article} locale={loc} />;
    case "research":
    default:
      return <ResearchSkin article={article} locale={loc} />;
  }
}
