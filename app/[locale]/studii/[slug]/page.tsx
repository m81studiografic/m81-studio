import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { type Locale, STUDIES, getStudy } from "../_data/studies";
import StudyDetail from "./_components/StudyDetail";

/* Secțiune ascunsă: nu o indexăm până la lansarea oficială. */
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
