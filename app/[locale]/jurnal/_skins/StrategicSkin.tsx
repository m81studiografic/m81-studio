"use client";

import { useEffect, useState } from "react";
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

/* Bară de progres la citire (semnătura mockup-ului Strategic) */
function ReadingProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const h = el.scrollHeight - el.clientHeight;
      setW(h > 0 ? (el.scrollTop / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-0 left-0 h-[3px] bg-[var(--lime)] z-[60] transition-[width] duration-150 ease-out" style={{ width: `${w}%` }} />
  );
}

/* SKIN: Strategic Insights — sidebar Key Takeaways + progres + card raport */
export default function StrategicSkin({
  article,
  locale,
}: {
  article: ResolvedArticle;
  locale: Locale;
}) {
  const isRo = locale === "ro";
  const cur = isRo ? "Citește" : "Read";
  const back = isRo ? "Înapoi la Jurnal" : "Back to Jurnal";
  const takeawaysLabel = isRo ? "Puncte cheie" : "Key takeaways";
  const reportLabel = isRo ? "Descarcă raportul" : "Download the report";
  const reportText = isRo
    ? "Analiza completă a tendințelor strategice."
    : "The full analysis of strategic trends.";
  const reportBtn = isRo ? "DESCARCĂ PDF" : "DOWNLOAD PDF";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ARTICLE_CSS }} />
      <ReadingProgress />
      <main className="si bg-[var(--cream)] text-[var(--gray-900)] pt-20 overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto px-[var(--page-px)]">
          <div className="pt-[clamp(28px,4vw,48px)]">
            <Link href={`/${locale}/jurnal`} data-cur={isRo ? "Înapoi" : "Back"}
              className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase text-[rgba(13,13,11,0.55)] hover:text-[var(--black)] no-underline transition-colors">
              <span>←</span> {back}
            </Link>
          </div>

          {/* header */}
          <header className="pt-[clamp(36px,6vw,72px)] pb-[clamp(40px,6vw,80px)] max-w-[880px]">
            <div className="flex flex-wrap items-center gap-4 mb-7">
              <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-black bg-[var(--lime)] px-3 py-1.5 rounded-full">
                {categoryLabel(article.category)}
              </span>
              {article.subcategory === "legal" && <LegalBadge locale={locale} />}
              <span className="text-[13px] text-[rgba(13,13,11,0.5)]">
                {formatDate(article.publishedAt, locale)}
              </span>
            </div>
            <FadeUp>
              <h1 className="text-[clamp(34px,6vw,76px)] font-extrabold tracking-[-0.04em] leading-[1.02] text-[var(--black)] m-0">
                {article.title}
              </h1>
            </FadeUp>
            {article.subtitle && (
              <FadeUp delay={120}>
                <p className="text-[clamp(17px,1.9vw,22px)] font-light italic leading-[1.55] text-[rgba(13,13,11,0.55)] mt-7 max-w-[640px] m-0">
                  {article.subtitle}
                </p>
              </FadeUp>
            )}
          </header>

          {/* corp + sidebar (sidebar dreapta pe desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 pb-[clamp(56px,9vw,120px)]">
            {/* article */}
            <article className="md:col-span-8 order-1">
              <FadeUp>
                <div className="overflow-hidden rounded-lg bg-[#e8e7e3] mb-[clamp(36px,5vw,64px)]" style={{ aspectRatio: "16/9" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(article.coverImage).width(1600).fit("max").auto("format").url()}
                    alt={article.coverImage.alt || article.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)]"
                  />
                </div>
              </FadeUp>
              <ArticleBody body={article.body} locale={locale} audioUrl={article.audioUrl} minutes={article.readTime} />
            </article>

            {/* sidebar sticky */}
            <aside className="md:col-span-4 order-2 mt-12 md:mt-0">
              <div className="md:sticky md:top-28 space-y-10">
                {article.takeaways && article.takeaways.length > 0 && (
                  <div className="border-l-2 border-[var(--lime)] pl-6">
                    <h3 className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-[var(--gray-900)] mb-6">
                      {takeawaysLabel}
                    </h3>
                    <ul className="list-none m-0 p-0 space-y-6">
                      {article.takeaways.map((tk, i) => (
                        <li key={i} className="group">
                          <span className="block text-[11px] font-extrabold tracking-[0.1em] text-[rgba(13,13,11,0.4)] mb-1.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-[15px] font-semibold leading-[1.45] text-[var(--black)] m-0">
                            {tk}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {article.reportUrl && (
                  <div className="rounded-md border border-[rgba(13,13,11,0.14)] bg-[#f3f4f3] p-7">
                    <h4 className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-[var(--gray-900)] mb-3">
                      {reportLabel}
                    </h4>
                    <p className="text-[13px] leading-[1.6] text-[rgba(13,13,11,0.6)] mb-6 m-0">
                      {reportText}
                    </p>
                    <a href={article.reportUrl} target="_blank" rel="noopener noreferrer" data-cur={cur}
                      className="block text-center w-full border border-[var(--black)] py-3 text-[11px] font-black tracking-[0.16em] uppercase text-[var(--black)] no-underline transition-all duration-300 hover:bg-[var(--black)] hover:text-white">
                      {reportBtn}
                    </a>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        <BackCta locale={locale} cur={cur} />
      </main>
    </>
  );
}
