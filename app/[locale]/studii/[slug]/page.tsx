import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { type Locale, STUDIES, getStudy } from "../_data/studies";
import StudyDetail from "./_components/StudyDetail";

export const dynamicParams = false;

export function generateStaticParams() {
  const locales: Locale[] = ["ro", "en"];
  return STUDIES.flatMap((s) => locales.map((locale) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = getStudy(slug);
  if (!study) return {};
  const loc: Locale = locale === "en" ? "en" : "ro";
  return {
    title: `${study.client} — M81 Studies`,
    description: study.heroIntro[loc],
    openGraph: {
      title: `${study.client} — ${study.kicker[loc]}`,
      description: study.heroIntro[loc],
      type: "article",
      images: [{ url: study.heroImage.src, width: study.heroImage.w, height: study.heroImage.h, alt: study.client }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.client} — ${study.kicker[loc]}`,
      description: study.heroIntro[loc],
      images: [study.heroImage.src],
    },
  };
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();
  return <StudyDetail study={study} locale={locale === "en" ? "en" : "ro"} />;
}
