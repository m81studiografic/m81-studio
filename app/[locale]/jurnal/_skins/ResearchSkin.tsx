"use client";

import Link from "next/link";
import { FadeUp } from "@/app/components/m81-components";
import { urlFor } from "@/sanity/lib/image";
import { ArticleBody } from "../_lib/ArticleBody";
import { LegalBadge } from "../_lib/LegalBadge";
import { ARTICLE_CSS } from "../_lib/css";
import {
  type Locale,
  type ResolvedArticle,
  categoryLabel,
  formatDate,
} from "../_lib/types";

/* SKIN: Industry Research — editorial, report-style, grayscale hero */
export default function ResearchSkin({
  article,
  locale,
}: {
  article: ResolvedArticle;
  locale: Locale;
}) {
  const isRo = locale === "ro";
  const cur = isRo ? "Citește" : "Read";
  const back = isRo ? "Înapoi la Jurnal" : "Back to Jurnal";
  const dateLabel = isRo ? "Publicat" : "Published";
  const readLabel = isRo ? "Timp citire" : "Read time";
  const min = isRo ? "min" : "min";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ARTICLE_CSS }} />
      <main className="si bg-[var(--cream)] text-[var(--gray-900)] pt-20 overflow-x-hidden">
        <article className="max-w-[1440px] mx-auto px-[var(--page-px)]">
          {/* back */}
          <div className="pt-[clamp(28px,4vw,48px)]">
            <Link href={`/${locale}/jurnal`} data-cur={isRo ? "Înapoi" : "Back"}
              className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase text-[rgba(13,13,11,0.55)] hover:text-[var(--black)] no-underline transition-colors">
              <span>←</span> {back}
            </Link>
          </div>

          {/* hero header */}
          <header className="pt-[clamp(32px,5vw,64px)] pb-[clamp(32px,5vw,56px)] max-w-[920px]">
            <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[var(--gray-900)]">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--lime)] mr-2.5 align-middle" />
              {categoryLabel(article.category)}
            </span>
            {article.subcategory === "legal" && (
              <LegalBadge locale={locale} className="ml-3 align-middle" />
            )}
            <FadeUp>
              <h1 className="text-[clamp(32px,5.5vw,64px)] font-extrabold tracking-[-0.035em] leading-[1.05] text-[var(--black)] mt-6 m-0">
                {article.title}
              </h1>
            </FadeUp>
            {article.subtitle && (
              <FadeUp delay={120}>
                <p className="text-[clamp(17px,1.9vw,22px)] font-light leading-[1.6] text-[rgba(13,13,11,0.55)] mt-6 max-w-[640px] m-0">
                  {article.subtitle}
                </p>
              </FadeUp>
            )}
            {/* meta */}
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mt-9 pt-7 border-t border-[rgba(13,13,11,0.1)]">
              <Meta label={dateLabel} value={formatDate(article.publishedAt, locale)} />
              {article.readTime && (
                <Meta label={readLabel} value={`${article.readTime} ${min}`} />
              )}
            </div>
          </header>

          {/* hero image */}
          <FadeUp>
            <div className="overflow-hidden rounded-lg bg-[#e8e7e3] mb-[clamp(40px,6vw,80px)]" style={{ aspectRatio: "16/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(article.coverImage).width(1800).fit("max").auto("format").url()}
                alt={article.coverImage.alt || article.title}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1100ms] ease-[cubic-bezier(.23,1,.32,1)]"
              />
            </div>
          </FadeUp>

          {/* body — coloană centrată de lectură */}
          <div className="max-w-[760px] mx-auto pb-[clamp(56px,9vw,120px)]">
            <ArticleBody body={article.body} locale={locale} audioUrl={article.audioUrl} minutes={article.readTime} />
          </div>
        </article>

        <BackCta locale={locale} cur={cur} />
      </main>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-[rgba(13,13,11,0.45)]">{label}</span>
      <span className="text-[14px] font-semibold text-[var(--black)]">{value}</span>
    </div>
  );
}

export function BackCta({ locale, cur }: { locale: Locale; cur: string }) {
  const isRo = locale === "ro";
  return (
    <div className="max-w-[1440px] mx-auto px-[var(--page-px)] pb-[clamp(64px,9vw,120px)]">
      <div className="border-t border-[rgba(13,13,11,0.1)] pt-10">
        <Link href={`/${locale}/jurnal`} data-cur={isRo ? "Înapoi" : "Back"}
          className="group inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase text-[var(--black)] no-underline">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          {isRo ? "Toate articolele" : "All articles"}
        </Link>
      </div>
    </div>
  );
}
