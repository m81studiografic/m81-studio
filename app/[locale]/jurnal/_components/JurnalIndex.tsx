"use client";

import Link from "next/link";
import { HeroBadge, FadeUp } from "@/app/components/m81-components";
import { urlFor } from "@/sanity/lib/image";
import {
  type Locale,
  type ResolvedArticle,
  categoryLabel,
  formatDate,
} from "../_lib/types";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap');
.si { font-family: 'Manrope', system-ui, -apple-system, sans-serif; }
.si ::selection { background: var(--black); color: #fff; }
`;

const T = {
  ro: {
    badge: "Studio Insights",
    titleBold: "Perspective din studio",
    titleMuted: " — despre design, brand și produsul digital.",
    intro: "Observații, cercetare și gânduri despre cum construim identități și experiențe care contează.",
    read: "Citește", min: "min", readTime: "Timp citire",
    featuredLabel: "Eseu principal",
    recentLabel: "Insight-uri recente",
    viewInsight: "Vezi insight",
    researchLabel: "Industry Research",
    researchTitle: "Cercetare & prognoze de industrie",
    researchIntro: "Rapoarte tehnice aprofundate pentru lideri de piață și echipe de produs.",
    reportView: "Vezi cercetarea",
    caseLabel: "Studiu de caz selectat",
    caseView: "Vezi studiul complet",
    archiveLabel: "Arhivă",
    helpText: "Ai nevoie de ajutor cu brandul tău?",
    helpLink: "Hai să vorbim →",
    empty: "Încă nu am publicat articole. Revino curând.",
  },
  en: {
    badge: "Studio Insights",
    titleBold: "Insights from the studio",
    titleMuted: " — on design, brand and digital product.",
    intro: "Observations, research and thoughts on how we build identities and experiences that matter.",
    read: "Read", min: "min", readTime: "Read time",
    featuredLabel: "Feature Essay",
    recentLabel: "Recent insights",
    viewInsight: "View insight",
    researchLabel: "Industry Research",
    researchTitle: "Research & industry forecasting",
    researchIntro: "Deep-dive technical reports for market leaders and product teams.",
    reportView: "View research",
    caseLabel: "Selected case study",
    caseView: "View full case study",
    archiveLabel: "Archive",
    ctaBadge: "Ready to start?",
    ctaTitle: "Let's build<br/>something together.",
    helpText: "Need a hand with your brand?",
    helpLink: "Let's talk →",
    empty: "We haven't published any articles yet. Check back soon.",
  },
} as const;

function Label({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3.5 mb-14">
      <span className="w-2 h-2 rounded-full bg-[var(--lime)] shrink-0" />
      <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[var(--gray-900)]">{text}</span>
      <span className="flex-1 h-px bg-[rgba(13,13,11,0.1)]" />
    </div>
  );
}

const img = (a: ResolvedArticle, w: number) =>
  urlFor(a.coverImage).width(w).fit("max").auto("format").url();

function InsightCard({ a, n, view, cur, href }: { a: ResolvedArticle; n: string; view: string; cur: string; href: string }) {
  const cat = categoryLabel(a.category);
  return (
    <Link href={href} data-cur={cur} className="group block no-underline">
      <div className="relative overflow-hidden rounded-md bg-[#e8e7e3]" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(a, 900)} alt={a.title}
          className="w-full h-full object-cover transition-all duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] scale-100 brightness-95 group-hover:scale-[1.06] group-hover:brightness-[0.85]" />
        <div className="absolute bottom-3.5 left-3.5 bg-[var(--lime)] text-black text-[9px] font-black tracking-[0.12em] uppercase py-1.5 px-3 rounded-full transition-all duration-300 ease-out opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0">
          {cat}
        </div>
      </div>
      <div className="mt-5">
        <span className="text-[11px] font-extrabold tracking-[0.1em] uppercase"><span className="text-[var(--gray-900)]">{n}</span> <span className="text-[rgba(13,13,11,0.5)]">/ {cat}</span></span>
        <h3 className="text-[clamp(20px,2vw,26px)] font-extrabold tracking-[-0.025em] text-[var(--black)] leading-[1.15] mt-3 mb-3 m-0">{a.title}</h3>
        <p className="text-[14px] leading-[1.7] text-[rgba(13,13,11,0.6)] m-0 mb-5 line-clamp-3">{a.excerpt}</p>
        <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase text-[var(--black)]">
          {view} <span className="transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span>
        </span>
      </div>
    </Link>
  );
}

export default function JurnalIndex({
  locale,
  featured,
  recent,
  research,
  cases,
  archive,
}: {
  locale: Locale;
  featured: ResolvedArticle | null;
  recent: ResolvedArticle[];
  research: ResolvedArticle[];
  cases: ResolvedArticle[];
  archive: { head: string; items: ResolvedArticle[] }[];
}) {
  const isRo = locale === "ro";
  const t = isRo ? T.ro : T.en;
  const cur = isRo ? "Citește" : "Read";
  const href = (a: ResolvedArticle) => `/${locale}/jurnal/${a.slug}`;
  const featuredCase = cases[0];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <main className="si bg-[var(--cream)] text-[var(--gray-900)] pt-20 overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto px-[var(--page-px)]">

          {/* HERO */}
          <header className="pt-[clamp(48px,7vw,88px)] pb-[clamp(56px,8vw,104px)] border-b border-[rgba(13,13,11,0.08)]">
            <HeroBadge text={t.badge} />
            <FadeUp>
              <h1 className="text-[clamp(40px,7vw,84px)] font-extrabold tracking-[-0.04em] leading-[1.02] max-w-[1100px] m-0">
                <span className="text-[var(--black)]">{t.titleBold}</span>
                <span className="text-[rgba(13,13,11,0.5)]">{t.titleMuted}</span>
              </h1>
            </FadeUp>
            <FadeUp delay={150}>
              <p className="text-[clamp(16px,1.8vw,20px)] font-light leading-[1.7] text-[rgba(13,13,11,0.55)] max-w-[620px] mt-8 m-0">
                {t.intro}
              </p>
            </FadeUp>
          </header>

          {!featured && (
            <div className="py-[clamp(80px,12vw,160px)] text-center text-[rgba(13,13,11,0.5)] text-[clamp(16px,2vw,20px)] font-light">
              {t.empty}
            </div>
          )}

          {/* FEATURED */}
          {featured && (
            <section className="py-[clamp(56px,9vw,120px)]">
              <FadeUp>
                <Link href={href(featured)} data-cur={cur} className="group block no-underline">
                  <div className="relative overflow-hidden rounded-lg bg-[#e8e7e3]" style={{ aspectRatio: "21/9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(featured, 1400)} alt={featured.title}
                      className="w-full h-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)] scale-100 brightness-95 group-hover:scale-[1.04] group-hover:brightness-[0.82]" />
                    <div className="absolute top-4 left-4 bg-[var(--lime)] text-black text-[10px] font-black tracking-[0.12em] uppercase py-2 px-4 rounded-full">
                      {t.featuredLabel}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-9">
                    <div className="md:col-span-8">
                      <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[var(--gray-900)]">{categoryLabel(featured.category)}</span>
                      <h2 className="text-[clamp(28px,4vw,52px)] font-extrabold tracking-[-0.035em] leading-[1.06] text-[var(--black)] mt-4 mb-5 m-0">{featured.title}</h2>
                      <p className="text-[clamp(15px,1.6vw,18px)] font-light leading-[1.7] text-[rgba(13,13,11,0.6)] max-w-[560px] m-0">{featured.excerpt}</p>
                    </div>
                    <div className="md:col-span-4 flex md:flex-col md:items-end gap-8 md:gap-5 md:justify-end">
                      {featured.readTime && (
                        <div className="flex flex-col gap-1 md:items-end">
                          <span className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-[rgba(13,13,11,0.5)]">{t.readTime}</span>
                          <span className="text-[14px] font-semibold text-[var(--black)]">{featured.readTime} {t.min}</span>
                        </div>
                      )}
                      <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase text-[var(--black)] border-b border-[var(--black)] pb-[3px] transition-colors group-hover:border-[var(--lime)] md:mt-2">
                        {t.read} <span className="transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            </section>
          )}

          {/* RECENT INSIGHTS */}
          {recent.length > 0 && (
            <section className="pb-[clamp(56px,9vw,120px)]">
              <Label text={t.recentLabel} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-9 gap-y-14">
                {recent.map((a, i) => (
                  <FadeUp key={a._id} delay={i * 90}>
                    <InsightCard a={a} n={`0${i + 1}`} view={t.viewInsight} cur={cur} href={href(a)} />
                  </FadeUp>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* INDUSTRY RESEARCH (dark) */}
        {research.length > 0 && (
          <div className="max-w-[1440px] mx-auto px-[var(--page-px)] pb-[clamp(56px,9vw,120px)]">
            <FadeUp>
              <div className="relative overflow-hidden rounded-[28px] bg-[var(--gray-900)] px-[clamp(28px,5vw,72px)] py-[clamp(48px,7vw,88px)]">
                <div className="absolute -right-16 -top-16 w-[280px] h-[280px] rounded-full border border-[rgba(196,242,13,0.12)] pointer-events-none" />
                <div className="max-w-[460px]">
                  <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[var(--lime)]">{t.researchLabel}</span>
                  <h3 className="text-[clamp(26px,3.4vw,42px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-white mt-4 mb-4 m-0">{t.researchTitle}</h3>
                  <p className="text-[15px] leading-[1.7] text-[rgba(255,255,255,0.5)] m-0">{t.researchIntro}</p>
                </div>
                <div className="mt-[clamp(36px,5vw,64px)]">
                  {research.map((a, i) => (
                    <Link key={a._id} href={href(a)} data-cur={isRo ? "Vezi" : "View"}
                      className="group flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 no-underline border-t border-[rgba(255,255,255,0.12)] last:border-b py-[clamp(22px,3.5vw,34px)] transition-[padding] duration-[350ms] ease-[cubic-bezier(.23,1,.32,1)] md:hover:pl-3">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-[var(--lime)]">{isRo ? "Raport" : "Report"} {String(i + 1).padStart(3, "0")}</span>
                        <h5 className="text-[clamp(19px,2.2vw,28px)] font-extrabold tracking-[-0.02em] text-white leading-[1.15] m-0">{a.title}</h5>
                      </div>
                      <div className="flex items-center gap-8 shrink-0">
                        {a.readTime && <span className="hidden lg:block text-[13px] text-[rgba(255,255,255,0.4)]">{a.readTime} {t.min}</span>}
                        <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase text-white whitespace-nowrap">
                          {t.reportView} <span className="transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        )}

        <div className="max-w-[1440px] mx-auto px-[var(--page-px)]">
          {/* CASE STUDY */}
          {featuredCase && (
            <section className="pb-[clamp(56px,9vw,120px)]">
              <Label text={t.caseLabel} />
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                <aside className="lg:w-1/3 lg:sticky lg:top-28 h-fit">
                  <h4 className="text-[clamp(24px,3vw,38px)] font-extrabold tracking-[-0.03em] leading-[1.12] text-[var(--black)] mb-5 m-0">{featuredCase.title}</h4>
                  <p className="text-[15px] leading-[1.7] text-[var(--muted)] mb-7 m-0 line-clamp-4">{featuredCase.excerpt}</p>
                  <Link href={href(featuredCase)} data-cur={isRo ? "Vezi" : "View"}
                    className="group inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase text-[var(--black)] border-b border-[var(--black)] pb-[3px] no-underline transition-colors hover:border-[var(--lime)]">
                    {t.caseView} <span className="transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span>
                  </Link>
                </aside>
                <div className="lg:w-2/3 grid grid-cols-2 gap-4">
                  <Link href={href(featuredCase)} data-cur={cur} className="group col-span-2 relative overflow-hidden rounded-md bg-[#e8e7e3]" style={{ aspectRatio: "16/9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(featuredCase, 1200)} alt={featuredCase.title} className="w-full h-full object-cover transition-all duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] brightness-95 group-hover:scale-[1.05] group-hover:brightness-[0.85]" />
                  </Link>
                  {cases.slice(1, 3).map((c) => (
                    <Link key={c._id} href={href(c)} data-cur={cur} className="group relative overflow-hidden rounded-md bg-[#e8e7e3]" style={{ aspectRatio: "1/1" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img(c, 700)} alt={c.title} className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-[1.05]" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ARCHIVE */}
          {archive.length > 0 && (
            <section className="pb-[clamp(56px,9vw,120px)]">
              <Label text={t.archiveLabel} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(40px,8vw,96px)] gap-y-12">
                {archive.map((group) => (
                  <div key={group.head}>
                    <h4 className="text-[10px] font-extrabold tracking-[0.16em] uppercase text-[rgba(13,13,11,0.55)] pb-3 mb-2 border-b border-[rgba(13,13,11,0.1)] m-0">{group.head}</h4>
                    <ul className="list-none m-0 p-0">
                      {group.items.map((it) => (
                        <li key={it._id} className="flex justify-between items-baseline gap-4 border-b border-[rgba(13,13,11,0.06)]">
                          <Link href={href(it)} data-cur={cur}
                            className="text-[clamp(15px,1.6vw,17px)] font-semibold text-[var(--black)] no-underline py-3.5 transition-[padding] duration-200 ease-out hover:pl-2 block">
                            {it.title}
                          </Link>
                          <span className="text-[12px] text-[rgba(13,13,11,0.45)] whitespace-nowrap">{formatDate(it.publishedAt, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA discret — ton editorial, nu bannerul de pe site */}
          <section className="pt-[clamp(40px,6vw,72px)] pb-[clamp(64px,9vw,128px)] border-t border-[rgba(13,13,11,0.1)]">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
              <p className="text-[clamp(15px,1.4vw,18px)] font-light text-[rgba(13,13,11,0.6)] m-0">
                {t.helpText}
              </p>
              <Link
                href={`/${locale}/incepe-un-proiect`}
                data-cur={locale === "ro" ? "Scrie-ne" : "Reach out"}
                className="text-[clamp(15px,1.4vw,18px)] font-semibold text-[var(--black)] no-underline border-b border-[var(--black)] pb-0.5 hover:border-[var(--lime)] transition-colors w-fit"
              >
                {t.helpLink}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
