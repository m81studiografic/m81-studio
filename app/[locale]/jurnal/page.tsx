import { client } from "@/sanity/lib/client";
import { allArticlesQuery } from "@/sanity/lib/queries";
import {
  type ArticleDoc,
  type Locale,
  type ResolvedArticle,
  categoryLabel,
  resolveArticle,
} from "./_lib/types";
import JurnalIndex from "./_components/JurnalIndex";

export const revalidate = 60; // reîmprospătare la 60s (articole zilnice)

async function getArticles(): Promise<ArticleDoc[]> {
  try {
    return await client.fetch(allArticlesQuery);
  } catch {
    return [];
  }
}

export default async function JurnalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  const docs = await getArticles();
  const all: ResolvedArticle[] = docs.map((d) => resolveArticle(d, loc));

  /* eseu principal: cel marcat featured, altfel cel mai nou */
  const featured = all.find((a) => a.featured) ?? all[0] ?? null;

  /* insight-uri recente: excludem eseul principal, primele 3 */
  const recent = all.filter((a) => a._id !== featured?._id).slice(0, 3);

  /* cercetare de industrie (bloc dark) */
  const research = all.filter((a) => a.category === "research").slice(0, 3);

  /* studii de caz */
  const cases = all.filter((a) => a.category === "case").slice(0, 3);

  /* arhivă: grupată pe categorie, fără cele deja afișate sus */
  const shownIds = new Set<string>(
    [featured, ...recent, ...research, ...cases]
      .filter(Boolean)
      .map((a) => (a as ResolvedArticle)._id),
  );
  const grouped = new Map<string, ResolvedArticle[]>();
  for (const a of all) {
    if (shownIds.has(a._id)) continue;
    const head = categoryLabel(a.category);
    const list = grouped.get(head) ?? [];
    list.push(a);
    grouped.set(head, list);
  }
  const archive = Array.from(grouped.entries()).map(([head, items]) => ({
    head,
    items,
  }));

  return (
    <JurnalIndex
      locale={loc}
      featured={featured}
      recent={recent}
      research={research}
      cases={cases}
      archive={archive}
    />
  );
}
