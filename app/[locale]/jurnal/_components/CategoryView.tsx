"use client";

import Link from "next/link";
import { FadeUp } from "@/app/components/m81-components";
import { urlFor } from "@/sanity/lib/image";
import { type Locale, type ResolvedArticle, categoryLabel } from "../_lib/types";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap');
.si { font-family: 'Manrope', system-ui, -apple-system, sans-serif; }
.si ::selection { background: var(--black); color: #fff; }
`;

const img = (a: ResolvedArticle, w: number) =>
  urlFor(a.coverImage).width(w).fit("max").auto("format").url();

function GridCard({ a, href, read, min, n }: { a: ResolvedArticle; href: string; read: string; min: string; n: string }) {
  return (
    <Link href={href} data-cur={read} className="group block no-underline">
      <div className="relative overflow-hidden rounded-md bg-[#e8e7e3]" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(a, 900)} alt={a.title}
          className="w-full h-full object-cover transition-all duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] brightness-95 group-hover:scale-[1.06] group-hover:brightness-[0.85]" />
      </div>
      <div className="mt-5">
        <span className="text-[11px] font-extrabold tracking-[0.1em] uppercase"><span className="text-[var(--gray-900)]">{n}</span> <span className="text-[rgba(13,13,11,0.5)]">/ {categoryLabel(a.category)}</span></span>
        <h3 className="text-[clamp(19px,1.9vw,24px)] font-extrabold tracking-[-0.025em] text-[var(--black)] leading-[1.18] mt-3 mb-3 m-0">{a.title}</h3>
        <p className="text-[14px] leading-[1.7] text-[rgba(13,13,11,0.6)] m-0 mb-4 line-clamp-2">{a.excerpt}</p>
        {a.readTime && <span className="text-[12px] text-[rgba(13,13,11,0.45)]">{a.readTime} {min}</span>}
      </div>
    </Link>
  );
}

export default function CategoryView({
  locale,
  label,
  intro,
  items,
}: {
  locale: Locale;
  label: string;
  intro: string;
  items: ResolvedArticle[];
}) {
  const isRo = locale === "ro";
  const read = isRo ? "Citește" : "Read";
  const min = "min";
  const back = isRo ? "Înapoi la Jurnal" : "Back to Jurnal";
  const countLabel = isRo ? "articole" : "articles";
  const empty = isRo ? "Încă nu am publicat articole în această secțiune." : "No articles in this section yet.";
  const href = (a: ResolvedArticle) => `/${locale}/jurnal/${a.slug}`;

  const lead = items[0];
  const rest = items.slice(1);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <main className="si bg-[var(--cream)] text-[var(--gray-900)] pt-20 overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto px-[var(--page-px)]">
          <div className="pt-[clamp(28px,4vw,48px)]">
            <Link href={`/${locale}/jurnal`} data-cur={isRo ? "Înapoi" : "Back"}
              className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase text-[rgba(13,13,11,0.55)] hover:text-[var(--black)] no-underline transition-colors">
              <span>←</span> {back}
            </Link>
          </div>

          {/* HERO categorie */}
          <header className="pt-[clamp(36px,6vw,72px)] pb-[clamp(40px,6vw,72px)] border-b border-[rgba(13,13,11,0.08)]">
            <div className="flex items-center gap-3.5 mb-7">
              <span className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-black bg-[var(--lime)] px-3 py-1.5 rounded-full">{label}</span>
              <span className="text-[13px] text-[rgba(13,13,11,0.5)]">{items.length} {countLabel}</span>
            </div>
            <FadeUp>
              <h1 className="text-[clamp(36px,6vw,76px)] font-extrabold tracking-[-0.04em] leading-[1.03] text-[var(--black)] max-w-[1000px] m-0">{label}</h1>
            </FadeUp>
            <FadeUp delay={120}>
              <p className="text-[clamp(16px,1.8vw,20px)] font-light leading-[1.7] text-[rgba(13,13,11,0.55)] max-w-[620px] mt-7 m-0">{intro}</p>
            </FadeUp>
          </header>

          {items.length === 0 && (
            <div className="py-[clamp(80px,12vw,160px)] text-center text-[rgba(13,13,11,0.5)] text-[clamp(16px,2vw,20px)] font-light">{empty}</div>
          )}

          {/* LEAD mare */}
          {lead && (
            <section className="py-[clamp(40px,6vw,80px)]">
              <FadeUp>
                <Link href={href(lead)} data-cur={read} className="group block no-underline grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 items-center">
                  <div className="lg:col-span-7 relative overflow-hidden rounded-lg bg-[#e8e7e3]" style={{ aspectRatio: "16/9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(lead, 1400)} alt={lead.title}
                      className="w-full h-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)] brightness-95 group-hover:scale-[1.04] group-hover:brightness-[0.85]" />
                  </div>
                  <div className="lg:col-span-5">
                    <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[rgba(13,13,11,0.5)]">{categoryLabel(lead.category)}</span>
                    <h2 className="text-[clamp(26px,3.2vw,44px)] font-extrabold tracking-[-0.035em] leading-[1.08] text-[var(--black)] mt-4 mb-5 m-0">{lead.title}</h2>
                    <p className="text-[clamp(15px,1.5vw,18px)] font-light leading-[1.7] text-[rgba(13,13,11,0.6)] m-0 mb-5 line-clamp-3">{lead.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.16em] uppercase text-[var(--black)] border-b border-[var(--black)] pb-[3px] group-hover:border-[var(--lime)] transition-colors">
                      {read} <span className="transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span>
                    </span>
                  </div>
                </Link>
              </FadeUp>
            </section>
          )}

          {/* GRILĂ restul */}
          {rest.length > 0 && (
            <section className="pb-[clamp(56px,9vw,120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-9 gap-y-14">
                {rest.map((a, i) => (
                  <FadeUp key={a._id} delay={(i % 3) * 90}>
                    <GridCard a={a} href={href(a)} read={read} min={min} n={String(i + 2).padStart(2, "0")} />
                  </FadeUp>
                ))}
              </div>
            </section>
          )}

          {/* CTA discret */}
          <section className="pt-[clamp(40px,6vw,72px)] pb-[clamp(64px,9vw,128px)] border-t border-[rgba(13,13,11,0.1)]">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
              <p className="text-[clamp(15px,1.4vw,18px)] font-light text-[rgba(13,13,11,0.6)] m-0">{isRo ? "Ai nevoie de ajutor cu brandul tău?" : "Need a hand with your brand?"}</p>
              <Link href={`/${locale}/incepe-un-proiect`} data-cur={isRo ? "Scrie-ne" : "Reach out"}
                className="text-[clamp(15px,1.4vw,18px)] font-semibold text-[var(--black)] no-underline border-b border-[var(--black)] pb-0.5 hover:border-[var(--lime)] transition-colors w-fit">
                {isRo ? "Hai să vorbim →" : "Let's talk →"}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
