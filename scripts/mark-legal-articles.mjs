// Marchează/demarchează articolele dedicate avocaturii (subcategory: "legal").
// Regula: explicit despre firme de avocatură (titlu sau subiect). Research e deja marcat.
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "bkejlgaa",
  dataset: "production",
  apiVersion: "2025-05-30",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const MARK = [
  "cum-aleg-clientii-o-firma-de-avocatura-astazi",
  "un-brand-nu-se-inventeaza-se-descopera",
  "tehnologia-nu-inlocuieste-increderea-o-amplifica",
  "cum-poate-tehnologia-sa-imbunatateasca-experienta-clientilor-in-avocatura",
  "indrumari-juridice-intre-autoritate-si-complexitate",
  "distanta-dintre-cat-de-buna-e-o-firma-si-cat-de-buna-pare",
];

const UNMARK = [
  "autoritatea-nu-se-afirma-se-demonstreaza",
  "organizatiile-evolueaza-imaginea-nu-tine-pasul",
];

async function main() {
  if (!process.env.SANITY_TOKEN) throw new Error("SANITY_TOKEN lipsește");
  const slugs = [...MARK, ...UNMARK];
  const docs = await client.fetch(
    `*[_type=="article" && slug.current in $s]{_id,"slug":slug.current}`,
    { s: slugs },
  );
  const bySlug = Object.fromEntries(docs.map((d) => [d.slug, d._id]));

  let tx = client.transaction();
  for (const slug of MARK) {
    if (!bySlug[slug]) { console.log("  ⚠ lipsă:", slug); continue; }
    tx = tx.patch(bySlug[slug], (p) => p.set({ subcategory: "legal" }));
    console.log("  [+legal]", slug);
  }
  for (const slug of UNMARK) {
    if (!bySlug[slug]) { console.log("  ⚠ lipsă:", slug); continue; }
    tx = tx.patch(bySlug[slug], (p) => p.unset(["subcategory"]));
    console.log("  [-legal]", slug);
  }
  const res = await tx.commit();
  console.log("Commit:", res.results?.length ?? 0, "patch-uri.");
}

main().catch((e) => { console.error(e); process.exit(1); });
