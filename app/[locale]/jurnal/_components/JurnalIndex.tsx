"use client";

import Link from "next/link";
import { HeroBadge, FadeUp } from "@/app/components/m81-components";
import { urlFor } from "@/sanity/lib/image";
import {
  type Locale,
  type ResolvedArticle,
  categoryLabel,
} from "../_lib/types";
import type { CategoryGroup } from "../page";
import { LegalBadge } from "../_lib/LegalBadge";

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
    viewAll: "Vezi toate",
    reportView: "Vezi cercetarea",
    caseView: "Vezi critica",
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
    viewAll: "View all",
    reportView: "View research",
    caseView: "View critique",
    helpText: "Need a hand with your brand?",
    helpLink: "Let's talk →",
    empty: "We haven't published any articles yet. Check back soon.",
  },
} as const;

type Dict = { readonly [K in keyof typeof T.ro]: string };

const img = (a: ResolvedArticle, w: number) =>
  urlFor(a.coverImage).width(w).fit("max").auto("format").url();

/* ── Antet de secțiune: etichetă + „Vezi toate (N) →” ── */
function SectionHeader({ label, total, allHref, viewAll, dark }: { label: string; total: number; allHref: string; viewAll: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="w-2 h-2 rounded-full bg-[var(--lime)] shrink-0" />
      <span className={`text-[11px] font-extrabold tracking-[0.2em] uppercase ${dark ? "text-[var(--lime)]" : "text-[var(--gray-900)]"}`}>{label}</span>
      <span className={`flex-1 h-px ${dark ? "bg-[rgba(255,255,255,0.15)]" : "bg-[rgba(13,13,11,0.1)]"}`} />
      <Link href={allHref} data-cur={viewAll}
        className={`group inline-flex items-center gap-2 text-[11px] font-black tracking-[0.14em] uppercase no-underline whitespace-nowrap ${dark ? "text-white" : "text-[var(--black)]"}`}>
        {viewAll} <span className="text-[rgba(13,13,11,0.4)]">({total})</span>
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-[3px]">→</span>
      </Link>
    </div>
  );
}

/* ── Card mare (lead-ul unei secțiuni) ── */
function FeatureCard({ a, href, read, min, locale, className = "" }: { a: ResolvedArticle; href: string; read: string; min: string; locale: Locale; className?: string }) {
  return (
    <Link href={href} data-cur={read} className={`group block no-underline ${className}`}>
      <div className="relative overflow-hidden rounded-lg bg-[#e8e7e3]" style={{ aspectRatio: "16/9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(a, 1200)} alt={a.title}
          className="w-full h-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)] brightness-95 group-hover:scale-[1.04] group-hover:brightness-[0.85]" />
      </div>
      <span className="mt-6 inline-block text-[11px] font-extrabold tracking-[0.1em] uppercase text-[rgba(13,13,11,0.5)]">{categoryLabel(a.category)}</span>
      {a.subcategory === "legal" && <LegalBadge locale={locale} className="ml-2.5 align-middle" />}
      <h3 className="text-[clamp(24px,2.8vw,38px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--black)] mt-3 mb-4 m-0">{a.title}</h3>
      <p className="text-[clamp(14px,1.4vw,17px)] font-light leading-[1.7] text-[rgba(13,13,11,0.6)] m-0 line-clamp-2 max-w-[620px]">{a.excerpt}</p>
      {a.readTime && <span className="mt-4 block text-[12px] text-[rgba(13,13,11,0.45)]">{a.readTime} {min}</span>}
    </Link>
  );
}

/* ── Rând mic (item secundar, orizontal) ── */
function SmallRow({ a, href, read }: { a: ResolvedArticle; href: string; read: string }) {
  return (
    <Link href={href} data-cur={read} className="group flex gap-5 no-underline items-start py-1">
      <div className="relative overflow-hidden rounded-md bg-[#e8e7e3] shrink-0 w-[112px] sm:w-[140px]" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(a, 360)} alt={a.title}
          className="w-full h-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-[1.07]" />
      </div>
      <div className="min-w-0">
        <span className="text-[10px] font-extrabold tracking-[0.1em] uppercase text-[rgba(13,13,11,0.45)]">{categoryLabel(a.category)}</span>
        <h4 className="text-[clamp(16px,1.5vw,19px)] font-extrabold tracking-[-0.02em] leading-[1.22] text-[var(--black)] mt-1.5 mb-0 m-0 group-hover:text-[rgba(13,13,11,0.65)] transition-colors">{a.title}</h4>
      </div>
    </Link>
  );
}

/* ── Secțiune de categorie: lead mare + coloană de iteme mici (ritm tip revistă) ── */
function CategoryBlock({ group, locale, t }: { group: CategoryGroup; locale: Locale; t: Dict; }) {
  const href = (a: ResolvedArticle) => `/${locale}/jurnal/${a.slug}`;
  const allHref = `/${locale}/jurnal/c/${group.slug}`;
  const read = t.read;
  const items = group.items;
  const lead = items[0];
  const rest = items.slice(1, 4);

  return (
    <section className="pb-[clamp(56px,9vw,112px)]">
      <SectionHeader label={group.label} total={group.total} allHref={allHref} viewAll={t.viewAll} />
      <FadeUp>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
          <FeatureCard a={lead} href={href(lead)} read={read} min={t.min} locale={locale} className="lg:col-span-7" />
          {rest.length > 0 && (
            <div className="lg:col-span-5 flex flex-col gap-7 lg:border-l lg:border-[rgba(13,13,11,0.1)] lg:pl-12">
              {rest.map((a) => (
                <SmallRow key={a._id} a={a} href={href(a)} read={read} />
              ))}
            </div>
          )}
        </div>
      </FadeUp>
    </section>
  );
}

/* ── Industry Research — bloc dark, distinct ── */
function ResearchBlock({ group, locale, t, isRo }: { group: CategoryGroup; locale: Locale; t: Dict; isRo: boolean }) {
  const href = (a: ResolvedArticle) => `/${locale}/jurnal/${a.slug}`;
  const allHref = `/${locale}/jurnal/c/${group.slug}`;
  const items = group.items.slice(0, 4);
  return (
    <div className="pb-[clamp(56px,9vw,112px)]">
      <FadeUp>
        <div className="relative overflow-hidden rounded-[28px] bg-[var(--gray-900)] px-[clamp(28px,5vw,72px)] py-[clamp(44px,6vw,80px)]">
          <div className="absolute -right-16 -top-16 w-[280px] h-[280px] rounded-full border border-[rgba(196,242,13,0.12)] pointer-events-none" />
          <div className="flex flex-wrap items-end justify-between gap-6 max-w-[640px]">
            <div>
              <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[var(--lime)]">{group.label}</span>
              <h3 className="text-[clamp(26px,3.4vw,42px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-white mt-4 mb-4 m-0">{isRo ? "Cercetare de industrie" : "Industry research"}</h3>
              <p className="text-[15px] leading-[1.7] text-[rgba(255,255,255,0.5)] m-0">{group.intro}</p>
            </div>
          </div>
          <div className="mt-[clamp(32px,5vw,56px)]">
            {items.map((a, i) => (
              <Link key={a._id} href={href(a)} data-cur={isRo ? "Vezi" : "View"}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 no-underline border-t border-[rgba(255,255,255,0.12)] last:border-b py-[clamp(20px,3vw,30px)] transition-[padding] duration-[350ms] ease-[cubic-bezier(.23,1,.32,1)] md:hover:pl-3">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-[var(--lime)]">{isRo ? "Raport" : "Report"} {String(i + 1).padStart(3, "0")}</span>
                  <h5 className="text-[clamp(18px,2.1vw,27px)] font-extrabold tracking-[-0.02em] text-white leading-[1.15] m-0">{a.title}</h5>
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
          <div className="mt-9">
            <Link href={allHref} data-cur={t.viewAll}
              className="group inline-flex items-center gap-2 text-[11px] font-black tracking-[0.14em] uppercase text-white no-underline border-b border-[rgba(255,255,255,0.4)] pb-1 hover:border-[var(--lime)] transition-colors">
              {t.viewAll} <span className="text-[rgba(255,255,255,0.5)]">({group.total})</span>
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-[3px]">→</span>
            </Link>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ── Design critique — bloc asimetric ── */
function CaseBlock({ group, locale, t, isRo }: { group: CategoryGroup; locale: Locale; t: Dict; isRo: boolean }) {
  const href = (a: ResolvedArticle) => `/${locale}/jurnal/${a.slug}`;
  const allHref = `/${locale}/jurnal/c/${group.slug}`;
  const lead = group.items[0];
  const rest = group.items.slice(1, 3);
  return (
    <section className="pb-[clamp(56px,9vw,112px)]">
      <SectionHeader label={group.label} total={group.total} allHref={allHref} viewAll={t.viewAll} />
      <FadeUp>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <aside className="lg:w-1/3 lg:sticky lg:top-28 h-fit">
            <h4 className="text-[clamp(24px,3vw,38px)] font-extrabold tracking-[-0.03em] leading-[1.12] text-[var(--black)] mb-5 m-0">{lead.title}</h4>
            <p className="text-[15px] leading-[1.7] text-[var(--muted)] mb-7 m-0 line-clamp-4">{lead.excerpt}</p>
            <Link href={href(lead)} data-cur={isRo ? "Vezi" : "View"}
              className="group inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase text-[var(--black)] border-b border-[var(--black)] pb-[3px] no-underline transition-colors hover:border-[var(--lime)]">
              {t.caseView} <span className="transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span>
            </Link>
          </aside>
          <div className="lg:w-2/3 grid grid-cols-2 gap-4">
            <Link href={href(lead)} data-cur={t.read} className="group col-span-2 relative overflow-hidden rounded-md bg-[#e8e7e3]" style={{ aspectRatio: "16/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(lead, 1200)} alt={lead.title} className="w-full h-full object-cover transition-all duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] brightness-95 group-hover:scale-[1.05] group-hover:brightness-[0.85]" />
            </Link>
            {rest.map((c) => (
              <Link key={c._id} href={href(c)} data-cur={t.read} className="group relative overflow-hidden rounded-md bg-[#e8e7e3]" style={{ aspectRatio: "1/1" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(c, 700)} alt={c.title} className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-[1.05]" />
              </Link>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

export default function JurnalIndex({
  locale,
  featured,
  groups,
}: {
  locale: Locale;
  featured: ResolvedArticle | null;
  groups: CategoryGroup[];
}) {
  const isRo = locale === "ro";
  const t = isRo ? T.ro : T.en;
  const cur = isRo ? "Citește" : "Read";
  const href = (a: ResolvedArticle) => `/${locale}/jurnal/${a.slug}`;

  /* În secțiuni, nu repetăm eseul principal afișat în hero */
  const sectionGroups = groups.map((g) => ({
    ...g,
    items: g.items.filter((a) => a._id !== featured?._id),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <main className="si bg-[var(--cream)] text-[var(--gray-900)] pt-20 overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto px-[var(--page-px)]">

          {/* HERO */}
          <header className="pt-[clamp(48px,7vw,88px)] pb-[clamp(48px,7vw,88px)] border-b border-[rgba(13,13,11,0.08)]">
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

          {/* CATEGORII — click pentru toate articolele din categorie */}
          {groups.length > 0 && (
            <nav aria-label={isRo ? "Categorii jurnal" : "Journal categories"}
              className="py-[clamp(20px,3vw,32px)] border-b border-[rgba(13,13,11,0.08)] flex flex-wrap gap-2.5">
              {groups.map((g) => (
                <Link key={g.slug} href={`/${locale}/jurnal/c/${g.slug}`} data-cur={t.viewAll}
                  className="group inline-flex items-center gap-2 text-[12px] font-extrabold tracking-[0.06em] uppercase text-[var(--gray-900)] border border-[rgba(13,13,11,0.18)] rounded-full px-4 py-2 no-underline transition-colors hover:bg-[var(--black)] hover:text-[var(--cream)] hover:border-[var(--black)]">
                  {g.label}
                  <span className="text-[rgba(13,13,11,0.4)] group-hover:text-[rgba(255,255,255,0.55)]">{g.total}</span>
                </Link>
              ))}
            </nav>
          )}

          {!featured && (
            <div className="py-[clamp(80px,12vw,160px)] text-center text-[rgba(13,13,11,0.5)] text-[clamp(16px,2vw,20px)] font-light">
              {t.empty}
            </div>
          )}

          {/* FEATURED */}
          {featured && (
            <section className="py-[clamp(48px,8vw,104px)]">
              <FadeUp>
                <Link href={href(featured)} data-cur={cur} className="group block no-underline">
                  <div className="relative overflow-hidden rounded-lg bg-[#e8e7e3]" style={{ aspectRatio: "21/9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(featured, 1400)} alt={featured.title}
                      className="w-full h-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)] brightness-95 group-hover:scale-[1.04] group-hover:brightness-[0.82]" />
                    <div className="absolute top-4 left-4 bg-[var(--lime)] text-black text-[10px] font-black tracking-[0.12em] uppercase py-2 px-4 rounded-full">
                      {t.featuredLabel}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-9">
                    <div className="md:col-span-8">
                      <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[var(--gray-900)]">{categoryLabel(featured.category)}</span>
                      {featured.subcategory === "legal" && <LegalBadge locale={locale} className="ml-2.5 align-middle" />}
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

          {/* SECȚIUNI PE CATEGORIE */}
          {sectionGroups.map((g) =>
            g.value === "research" ? (
              <ResearchBlock key={g.value} group={g} locale={locale} t={t} isRo={isRo} />
            ) : g.value === "case" ? (
              <CaseBlock key={g.value} group={g} locale={locale} t={t} isRo={isRo} />
            ) : (
              <CategoryBlock key={g.value} group={g} locale={locale} t={t} />
            ),
          )}

          {/* CTA discret */}
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
