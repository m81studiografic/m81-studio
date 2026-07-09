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
} from "../_lib/types";

/* SKIN: Design critique — hero full-bleed, brief de proiect, metrici, testimonial */
export default function CaseStudySkin({
  article,
  locale,
}: {
  article: ResolvedArticle;
  locale: Locale;
}) {
  const isRo = locale === "ro";
  const cur = isRo ? "Citește" : "Read";
  const back = isRo ? "Înapoi la Jurnal" : "Back to Jurnal";
  const briefLabel = isRo ? "Sumar analiză" : "Analysis summary";
  const clientLabel = isRo ? "Subiect analizat" : "Subject";
  const timelineLabel = isRo ? "Evaluare" : "Reviewed";
  const servicesLabel = isRo ? "Dimensiuni analizate" : "Dimensions";

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

          {/* hero */}
          <header className="pt-[clamp(32px,5vw,64px)] pb-[clamp(28px,4vw,48px)]">
            <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[var(--gray-900)]">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--lime)] mr-2.5 align-middle" />
              {categoryLabel(article.category)}
            </span>
            {article.subcategory === "legal" && (
              <LegalBadge locale={locale} className="ml-3 align-middle" />
            )}
            <FadeUp>
              <h1 className="text-[clamp(36px,6.5vw,82px)] font-extrabold tracking-[-0.04em] leading-[1.0] text-[var(--black)] mt-6 max-w-[1080px] m-0">
                {article.title}
              </h1>
            </FadeUp>
          </header>
        </div>

        {/* hero image full-bleed */}
        <FadeUp>
          <div className="group overflow-hidden bg-[#e8e7e3] mb-[clamp(48px,7vw,96px)]" style={{ aspectRatio: "21/9" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(article.coverImage).width(2000).fit("max").auto("format").url()}
              alt={article.coverImage.alt || article.title}
              className="w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-[1.04]"
            />
          </div>
        </FadeUp>

        <div className="max-w-[1440px] mx-auto px-[var(--page-px)]">
          {/* project brief */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-10 pb-[clamp(48px,7vw,96px)] border-t border-[rgba(13,13,11,0.1)] pt-[clamp(40px,6vw,80px)]">
            <div className="md:col-span-4">
              <h2 className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-[var(--gray-900)] mb-6">{briefLabel}</h2>
              <dl className="space-y-5 m-0">
                {article.caseClient && <BriefRow label={clientLabel} value={article.caseClient} />}
                {article.caseTimeline && <BriefRow label={timelineLabel} value={article.caseTimeline} />}
                {article.caseServices && article.caseServices.length > 0 && (
                  <BriefRow label={servicesLabel} value={article.caseServices.join(", ")} />
                )}
              </dl>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              {article.subtitle && (
                <p className="text-[clamp(19px,2.2vw,28px)] font-light leading-[1.5] text-[var(--black)] m-0 mb-8">
                  {article.subtitle}
                </p>
              )}
              <span className="block h-px w-24 bg-[var(--black)] mb-8" />
              <p className="text-[15px] leading-[1.7] text-[rgba(13,13,11,0.6)] m-0">
                {article.excerpt}
              </p>
            </div>
          </section>

          {/* body / proces */}
          {article.body && article.body.length > 0 && (
            <section className="max-w-[820px] pb-[clamp(40px,6vw,80px)]">
              <ArticleBody body={article.body} locale={locale} audioUrl={article.audioUrl} minutes={article.readTime} />
            </section>
          )}

          {/* metrici de impact */}
          {article.metrics && article.metrics.length > 0 && (
            <section className="py-[clamp(48px,7vw,96px)] border-t border-[rgba(13,13,11,0.1)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-14 text-center">
                {article.metrics.map((m, i) => (
                  <FadeUp key={i} delay={i * 90}>
                    <div className="px-4">
                      <div className="text-[clamp(48px,7vw,84px)] font-extrabold tracking-[-0.04em] leading-none text-[var(--black)] mb-3">
                        {m.value}
                      </div>
                      <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[rgba(13,13,11,0.55)]">
                        {m.label}
                      </span>
                      <span className="block h-px w-8 bg-[rgba(13,13,11,0.2)] mx-auto mt-6" />
                    </div>
                  </FadeUp>
                ))}
              </div>
            </section>
          )}

          {/* testimonial */}
          {article.testimonial && (
            <section className="py-[clamp(40px,6vw,80px)]">
              <FadeUp>
                <blockquote className="max-w-[860px] mx-auto text-center m-0">
                  <span className="block w-10 h-[3px] bg-[var(--lime)] mx-auto mb-9" />
                  <p className="text-[clamp(24px,3.6vw,42px)] font-light italic leading-[1.3] text-[var(--black)] m-0">
                    {article.testimonial}
                  </p>
                  {article.testimonialAuthor && (
                    <cite className="mt-9 block not-italic text-[11px] font-extrabold tracking-[0.16em] uppercase text-[rgba(13,13,11,0.5)]">
                      — {article.testimonialAuthor}
                    </cite>
                  )}
                </blockquote>
              </FadeUp>
            </section>
          )}
        </div>

        <BackCta locale={locale} cur={cur} />
      </main>
    </>
  );
}

function BriefRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-[rgba(13,13,11,0.45)]">{label}</dt>
      <dd className="text-[15px] font-semibold text-[var(--black)] m-0">{value}</dd>
    </div>
  );
}
