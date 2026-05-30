import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/lib/image";
import type { Locale, SanityImage } from "./types";

/* ──────────────────────────────────────────────────────────────
   Randează corpul articolului (Portable Text) în limbajul vizual M81.
   Folosit identic de toate skin-urile de categorie.
   ────────────────────────────────────────────────────────────── */

function buildComponents(locale: Locale): PortableTextComponents {
  const cap = (ro?: string, en?: string) =>
    (locale === "en" ? en || ro : ro) || "";

  return {
    block: {
      normal: ({ children }) => (
        <p className="text-[clamp(16px,1.25vw,18px)] font-light leading-[1.85] text-[rgba(13,13,11,0.78)] my-6">
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className="text-[clamp(26px,3.2vw,38px)] font-extrabold tracking-[-0.03em] leading-[1.12] text-[var(--black)] mt-16 mb-5">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-[clamp(20px,2.2vw,26px)] font-extrabold tracking-[-0.02em] leading-[1.2] text-[var(--black)] mt-12 mb-4">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-[rgba(13,13,11,0.55)] mt-10 mb-3">
          {children}
        </h4>
      ),
      /* "blockquote" = lead/intro: text mai mare cu bară lime în stânga */
      blockquote: ({ children }) => (
        <p className="text-[clamp(19px,2vw,24px)] font-light leading-[1.55] text-[var(--black)] border-l-2 border-[var(--lime)] pl-6 my-8">
          {children}
        </p>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className="my-6 pl-5 space-y-2.5 list-none">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-6 pl-6 space-y-2.5 list-decimal marker:text-[rgba(13,13,11,0.4)] marker:font-bold">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="relative pl-5 text-[clamp(15px,1.2vw,17px)] font-light leading-[1.75] text-[rgba(13,13,11,0.78)] before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-2 before:rounded-full before:bg-[var(--lime)]">
          {children}
        </li>
      ),
      number: ({ children }) => (
        <li className="text-[clamp(15px,1.2vw,17px)] font-light leading-[1.75] text-[rgba(13,13,11,0.78)] pl-1.5">
          {children}
        </li>
      ),
    },

    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-[var(--black)]">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="mono text-[0.9em] bg-[rgba(13,13,11,0.06)] text-[var(--black)] rounded px-1.5 py-0.5">
          {children}
        </code>
      ),
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--black)] underline decoration-[var(--lime)] decoration-2 underline-offset-[3px] hover:decoration-[var(--black)] transition-colors"
        >
          {children}
        </a>
      ),
    },

    types: {
      /* Imagine cu legendă — grayscale → color la hover */
      figure: ({ value }: { value: SanityImage & { captionRo?: string; captionEn?: string } }) => {
        const caption = cap(value.captionRo, value.captionEn);
        return (
          <figure className="group my-12 -mx-[var(--page-px)] sm:mx-0">
            <div className="overflow-hidden sm:rounded-md bg-[#e8e7e3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(value).width(1600).fit("max").auto("format").url()}
                alt={value.alt || caption}
                className="w-full h-auto object-cover grayscale transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)] group-hover:grayscale-0"
              />
            </div>
            {caption && (
              <figcaption className="mt-3 px-[var(--page-px)] sm:px-0 text-[12px] tracking-[0.04em] text-[rgba(13,13,11,0.5)]">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      },

      /* Citat evidențiat */
      pullQuote: ({ value }: { value: { text?: string; attribution?: string } }) => (
        <blockquote className="my-12 border-y border-[rgba(13,13,11,0.12)] py-9">
          <p className="text-[clamp(24px,3.4vw,40px)] font-extrabold tracking-[-0.03em] leading-[1.15] text-[var(--black)] m-0">
            {value.text}
          </p>
          {value.attribution && (
            <cite className="mt-4 block not-italic text-[11px] font-extrabold tracking-[0.16em] uppercase text-[rgba(13,13,11,0.5)]">
              {value.attribution}
            </cite>
          )}
        </blockquote>
      ),

      /* Notă / callout */
      callout: ({ value }: { value: { label?: string; text?: string } }) => (
        <aside className="my-10 rounded-md bg-[#e7e6e2] border-l-4 border-[var(--lime)] px-7 py-6">
          {value.label && (
            <span className="block text-[10px] font-extrabold tracking-[0.18em] uppercase text-[var(--gray-900)] mb-2.5">
              {value.label}
            </span>
          )}
          <p className="text-[15px] leading-[1.7] text-[rgba(13,13,11,0.8)] m-0">
            {value.text}
          </p>
        </aside>
      ),

      /* Declarație / concluzie — bloc dark cu accent lime */
      statement: ({ value }: { value: { heading?: string; text?: string } }) => (
        <div className="my-12 rounded-lg bg-[var(--gray-900)] px-[clamp(28px,4vw,56px)] py-[clamp(32px,5vw,56px)]">
          <span className="block w-10 h-[3px] bg-[var(--lime)] mb-6" />
          {value.heading && (
            <h2 className="text-[clamp(22px,2.8vw,34px)] font-extrabold tracking-[-0.025em] leading-[1.12] text-white m-0 mb-4">
              {value.heading}
            </h2>
          )}
          <p className="text-[clamp(16px,1.5vw,21px)] font-light leading-[1.6] text-[rgba(255,255,255,0.72)] m-0">
            {value.text}
          </p>
        </div>
      ),

      /* Bloc de cod — dark, mono, cu 3 puncte (primul lime) */
      codeBlock: ({ value }: { value: { language?: string; filename?: string; code?: string } }) => (
        <div className="my-12 overflow-hidden rounded-lg bg-[var(--gray-900)]">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[rgba(255,255,255,0.08)]">
            <span className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--lime)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.18)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.18)]" />
            </span>
            <span className="mono text-[11px] tracking-[0.04em] text-[rgba(255,255,255,0.45)]">
              {value.filename || value.language || "code"}
            </span>
          </div>
          <pre className="mono text-[13px] leading-[1.7] text-[rgba(255,255,255,0.85)] p-6 overflow-x-auto m-0">
            <code>{value.code}</code>
          </pre>
        </div>
      ),
    },
  };
}

export function ArticleBody({
  body,
  locale,
}: {
  body?: PortableTextBlock[];
  locale: Locale;
}) {
  if (!body || body.length === 0) return null;
  return <PortableText value={body} components={buildComponents(locale)} />;
}
