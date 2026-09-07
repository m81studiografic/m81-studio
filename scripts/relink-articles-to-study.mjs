// Repoziționează cârligele celor 4 articole tematice de la vechiul studiu Filip
// (retras din publicare) la noul studiu independent "The Form of Authority".
// Al 5-lea articol din lista veche (critica Filip, cu numele real) a fost șters
// complet din Sanity — nu mai există, deci nu apare aici.
const TOKEN = process.env.SANITY_TOKEN;
const BASE = "https://bkejlgaa.api.sanity.io/v2025-05-30";
const k = () => Math.random().toString(36).slice(2, 12);

function lureBlock(parts, href) {
  const mk = "lnk" + k();
  return {
    _type: "block", _key: k(), style: "normal",
    markDefs: [{ _type: "link", _key: mk, href }],
    children: parts.map((pt) => ({ _type: "span", _key: k(), text: pt.t, marks: pt.l ? [mk] : [] })),
  };
}

function withLure(body, parts, href, marker) {
  const out = [...body];
  while (out.length) {
    const last = out[out.length - 1];
    const txt = (last?._type === "block" && last.children?.[0]?.text) || "";
    if (txt.startsWith(marker) || txt.startsWith("Aceasta este o analiză independentă") || txt.startsWith("This is an independent analysis")) out.pop();
    else break;
  }
  out.push(lureBlock(parts, href));
  return out;
}

const STUDY_RO = "/ro/studii/the-form-of-authority";
const STUDY_EN = "/en/studii/the-form-of-authority";

const thematicRo = [
  { t: "La M81 studiem și construim experiențe de brand și digitale pentru firme de avocatură — pornind de la ceea ce există deja, nu de la ceea ce ar putea părea. Am pus asta în practică într-" },
  { t: "un studiu independent: Forma Autorității", l: true },
  { t: ". Dacă te recunoști în aceste întrebări, putem începe cu o discuție." },
];
const thematicEn = [
  { t: "At M81 we study and build brand and digital experiences for law firms — starting from what already exists, not from what might appear. We put this into practice in " },
  { t: "an independent study: The Form of Authority", l: true },
  { t: ". If you recognize yourself in these questions, we can begin with a conversation." },
];

const ARTICLES = [
  { slug: "un-brand-nu-se-inventeaza-se-descopera", ro: thematicRo, en: thematicEn },
  { slug: "tehnologia-nu-inlocuieste-increderea-o-amplifica", ro: thematicRo, en: thematicEn },
  { slug: "avocatura-din-romania-puternica-in-fond-uniforma-in-forma", ro: thematicRo, en: thematicEn },
  { slug: "distanta-dintre-cat-de-buna-e-o-firma-si-cat-de-buna-pare", ro: thematicRo, en: thematicEn },
];

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");
  for (const a of ARTICLES) {
    const q = encodeURIComponent(`*[_type=="article" && slug.current=="${a.slug}"][0]{_id, bodyRo, bodyEn}`);
    const doc = (await (await fetch(`${BASE}/data/query/production?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } })).json()).result;
    if (!doc?._id) { console.log("NOT FOUND:", a.slug); continue; }
    const bodyRo = withLure(doc.bodyRo, a.ro, STUDY_RO, "La M81");
    const bodyEn = withLure(doc.bodyEn, a.en, STUDY_EN, "At M81");
    const r = await fetch(`${BASE}/data/mutate/production`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ mutations: [{ patch: { id: doc._id, set: { bodyRo, bodyEn } } }] }),
    });
    console.log(`${a.slug} → ${JSON.stringify((await r.json()).results)}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
