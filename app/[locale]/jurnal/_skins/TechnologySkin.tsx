"use client";

import Link from "next/link";
import { FadeUp } from "@/app/components/m81-components";
import { urlFor } from "@/sanity/lib/image";
import { ArticleBody } from "../_lib/ArticleBody";
import { ARTICLE_CSS } from "../_lib/css";
import { BackCta } from "./ResearchSkin";
import {
  type Locale,
  type ResolvedArticle,
  categoryLabel,
  formatDate,
} from "../_lib/types";

/* SKIN: Technology & Experience — accente mono, hero tehnic, meta mono */
export default function TechnologySkin({
  article,
  locale,
}: {
  article: ResolvedArticle;
  locale: Locale;
}) {
  const isRo = locale === "ro";
  const cur = isRo ? "Citește" : "Read";
  const back = isRo ? "Înapoi la Jurnal" : "Back to Jurnal";
  const readLabel = isRo ? "READ_TIME" : "READ_TIME";
  const dateLabel = isRo ? "PUBLISHED" : "PUBLISHED";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ARTICLE_CSS }} />
      <main className="si bg-[var(--cream)] text-[var(--gray-900)] pt-20 overflow-x-hidden">
        <article className="max-w-[1440px] mx-auto px-[var(--page-px)]">
          <div className="pt-[clamp(28px,4vw,48px)]">
            <Link href={`/${locale}/jurnal`} data-cur={isRo ? "Înapoi" : "Back"}
              className="inline-flex items-center gap-2 mono text-[11px] font-medium tracking-[0.06em] uppercase text-[rgba(13,13,11,0.55)] hover:text-[var(--black)] no-underline transition-colors">
              <span>←</span> {back}
            </Link>
          </div>

          <header className="pt-[clamp(32px,5vw,64px)] pb-[clamp(28px,4vw,48px)] max-w-[940px]">
            <span className="mono text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--gray-900)]">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--lime)] mr-2.5 align-middle" />
              {categoryLabel(article.category)}
            </span>
            <FadeUp>
              <h1 className="text-[clamp(32px,5.5vw,66px)] font-extrabold tracking-[-0.04em] leading-[1.03] text-[var(--black)] mt-6 m-0">
                {article.title}
              </h1>
            </FadeUp>
            {article.subtitle && (
              <FadeUp delay={120}>
                <p className="text-[clamp(16px,1.8vw,21px)] font-light leading-[1.6] text-[rgba(13,13,11,0.55)] mt-6 max-w-[620px] m-0">
                  {article.subtitle}
                </p>
              </FadeUp>
            )}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-9 pt-6 border-t border-[rgba(13,13,11,0.1)]">
              <span className="mono text-[12px] text-[rgba(13,13,11,0.6)]">
                <span className="text-[rgba(13,13,11,0.4)]">{dateLabel}:</span> {formatDate(article.publishedAt, locale)}
              </span>
              {article.readTime && (
                <span className="mono text-[12px] text-[rgba(13,13,11,0.6)]">
                  <span className="text-[rgba(13,13,11,0.4)]">{readLabel}:</span> {article.readTime}min
                </span>
              )}
            </div>
          </header>

          <FadeUp>
            <figure className="m-0 mb-[clamp(40px,6vw,80px)]">
              <div className="overflow-hidden rounded-lg bg-[#e8e7e3]" style={{ aspectRatio: "16/9" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlFor(article.coverImage).width(1800).fit("max").auto("format").url()}
                  alt={article.coverImage.alt || article.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1100ms] ease-[cubic-bezier(.23,1,.32,1)]"
                />
              </div>
              {article.coverImage.alt && (
                <figcaption className="mono mt-3 text-[11px] tracking-[0.04em] text-[rgba(13,13,11,0.45)]">
                  {"// "}{article.coverImage.alt}
                </figcaption>
              )}
            </figure>
          </FadeUp>

          <div className="max-w-[760px] mx-auto pb-[clamp(56px,9vw,120px)]">
            <ArticleBody body={article.body} locale={locale} />
          </div>
        </article>

        <BackCta locale={locale} cur={cur} />
      </main>
    </>
  );
}
