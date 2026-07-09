"use client";

import Link from "next/link";
import { FadeUp } from "@/app/components/m81-components";
import { urlFor } from "@/sanity/lib/image";
import { ArticleBody } from "../_lib/ArticleBody";
import { LegalBadge } from "../_lib/LegalBadge";
import { ARTICLE_CSS } from "../_lib/css";
import { BackCta } from "./ResearchSkin";
import {
  type Locale,
  type ResolvedArticle,
  categoryLabel,
  formatDate,
} from "../_lib/types";

/* SKIN: Branding & Experience — hero asimetric, subtitlu italic, sidebar topicuri */
export default function BrandingSkin({
  article,
  locale,
}: {
  article: ResolvedArticle;
  locale: Locale;
}) {
  const isRo = locale === "ro";
  const cur = isRo ? "Citește" : "Read";
  const back = isRo ? "Înapoi la Jurnal" : "Back to Jurnal";
  const readLabel = isRo ? "Timp citire" : "Read time";
  const dateLabel = isRo ? "Publicat" : "Published";
  const topicsLabel = isRo ? "Topicuri" : "Topics";
  const min = "min";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ARTICLE_CSS }} />
      <main className="si bg-[var(--cream)] text-[var(--gray-900)] pt-20 overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto px-[var(--page-px)]">
          <div className="pt-[clamp(28px,4vw,48px)]">
            <Link href={`/${locale}/jurnal`} data-cur={isRo ? "Înapoi" : "Back"}
              className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase text-[rgba(13,13,11,0.55)] hover:text-[var(--black)] no-underline transition-colors">
              <span>←</span> {back}
            </Link>
          </div>

          {/* hero asimetric */}
          <header className="pt-[clamp(36px,6vw,72px)] pb-[clamp(36px,5vw,64px)] grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[var(--gray-900)]">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--lime)] mr-2.5 align-middle" />
                {categoryLabel(article.category)}
              </span>
              {article.subcategory === "legal" && (
                <LegalBadge locale={locale} className="ml-3 align-middle" />
              )}
              <FadeUp>
                <h1 className="text-[clamp(34px,6vw,76px)] font-extrabold tracking-[-0.04em] leading-[1.02] text-[var(--black)] mt-6 m-0">
                  {article.title}
                </h1>
              </FadeUp>
            </div>
            {article.subtitle && (
              <div className="md:col-span-4">
                <FadeUp delay={120}>
                  <p className="text-[clamp(17px,1.7vw,21px)] font-light italic leading-[1.55] text-[rgba(13,13,11,0.6)] m-0">
                    {article.subtitle}
                  </p>
                </FadeUp>
              </div>
            )}
          </header>

          {/* impact image 16:9 cu pill legendă */}
          <FadeUp>
            <div className="relative overflow-hidden rounded-lg bg-[#e8e7e3] mb-[clamp(40px,6vw,80px)]" style={{ aspectRatio: "16/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(article.coverImage).width(1800).fit("max").auto("format").url()}
                alt={article.coverImage.alt || article.title}
                className="w-full h-full object-cover transition-all duration-[1000ms] ease-[cubic-bezier(.23,1,.32,1)] hover:scale-[1.03]"
              />
            </div>
          </FadeUp>

          {/* corp asimetric: sidebar meta + articol offset */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 pb-[clamp(56px,9vw,120px)]">
            <aside className="md:col-span-3 md:sticky md:top-28 h-fit mb-10 md:mb-0">
              <div className="flex flex-col gap-7">
                <MetaCol label={dateLabel} value={formatDate(article.publishedAt, locale)} />
                {article.readTime && (
                  <MetaCol label={readLabel} value={`${article.readTime} ${min}`} />
                )}
                {article.topics && article.topics.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-extrabold tracking-[0.14em] uppercase text-[rgba(13,13,11,0.45)] mb-3">{topicsLabel}</span>
                    <ul className="list-none m-0 p-0 flex flex-col gap-2">
                      {article.topics.map((tp) => (
                        <li key={tp} className="flex items-center gap-2.5 text-[14px] font-semibold text-[var(--black)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] shrink-0" />
                          {tp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
            <div className="md:col-start-5 md:col-span-8">
              <ArticleBody body={article.body} locale={locale} audioUrl={article.audioUrl} minutes={article.readTime} />
            </div>
          </div>
        </div>

        <BackCta locale={locale} cur={cur} />
      </main>
    </>
  );
}

function MetaCol({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-[rgba(13,13,11,0.45)]">{label}</span>
      <span className="text-[15px] font-semibold text-[var(--black)]">{value}</span>
    </div>
  );
}
