import type { Locale } from "./types";

/* Marcaj discret pentru articolele dedicate firmelor de avocatură.
   Se afișează doar când article.subcategory === "legal". */
export function LegalBadge({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const label = locale === "en" ? "For law firms" : "Pentru firme de avocatură";
  return (
    <span
      className={`inline-flex items-center text-[10px] font-extrabold tracking-[0.14em] uppercase text-[rgba(13,13,11,0.6)] border border-[rgba(13,13,11,0.22)] rounded-full px-2.5 py-1 leading-none ${className}`}
    >
      {label}
    </span>
  );
}
