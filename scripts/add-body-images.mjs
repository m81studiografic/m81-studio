// Adaugă 2 imagini în corpul fiecărui articol de branding (block-uri figure).
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;

const k = () => Math.random().toString(36).slice(2, 12);

async function uploadImage(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${filename} failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const up = await fetch(`${BASE}/assets/images/${DATASET}?filename=${filename}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/jpeg" },
    body: buf,
  });
  const json = await up.json();
  if (!json.document?._id) throw new Error("upload failed: " + JSON.stringify(json));
  return json.document._id;
}

const figure = (assetId, alt, captionRo, captionEn) => ({
  _type: "figure",
  _key: k(),
  asset: { _type: "reference", _ref: assetId },
  alt,
  captionRo,
  captionEn,
});

async function getArticle(slug) {
  const q = encodeURIComponent(`*[_type=="article" && slug.current=="${slug}"][0]{_id, bodyRo}`);
  const res = await fetch(`${BASE}/data/query/${DATASET}?query=${q}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const json = await res.json();
  return json.result;
}

const textOf = (b) => (b?._type === "block" ? b.children?.[0]?.text || "" : "");
const isH2 = (b) => b?._type === "block" && b.style === "h2";

/* Inserează fig1 înainte de PRIMUL h2, fig2 înainte de h2-ul cu textul `anchor2`. */
function withFigures(body, fig1, fig2, anchor2) {
  let firstH2Done = false;
  const out = [];
  for (const b of body) {
    if (!firstH2Done && isH2(b)) {
      out.push(fig1);
      firstH2Done = true;
    }
    if (isH2(b) && textOf(b) === anchor2) {
      out.push(fig2);
    }
    out.push(b);
  }
  return out;
}

async function patchBody(id, body) {
  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id, set: { bodyRo: body } } }] }),
  });
  return mut.json();
}

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");

  /* ── Articol 1: Ce transformă o afacere într-un brand ── */
  const a1 = await getArticle("ce-transforma-o-afacere-intr-un-brand");
  if (!a1?._id) throw new Error("articol 1 negăsit");
  const a1img1 = await uploadImage(
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80",
    "a1-decizii.jpg",
  );
  const a1img2 = await uploadImage(
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80",
    "a1-incredere.jpg",
  );
  const a1body = withFigures(
    a1.bodyRo,
    figure(a1img1, "Echipă lucrând la deciziile unei afaceri",
      "Identitatea unei afaceri se construiește din deciziile zilnice, nu din elemente vizuale.",
      "A business's identity is built from everyday decisions, not visual elements."),
    figure(a1img2, "Spațiu de lucru ordonat, atenție la detalii",
      "Încrederea apare din experiențe consecvente, repetate în timp.",
      "Trust comes from consistent experiences, repeated over time."),
    "Încrederea se construiește în timp",
  );
  console.log("a1 patch:", JSON.stringify(await patchBody(a1._id, a1body)));

  /* ── Articol 2: Ce stă la baza unui brand puternic ── */
  const a2 = await getArticle("ce-sta-la-baza-unui-brand-puternic");
  if (!a2?._id) throw new Error("articol 2 negăsit");
  const a2img1 = await uploadImage(
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=2000&q=80",
    "a2-identitate.jpg",
  );
  const a2img2 = await uploadImage(
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
    "a2-claritate.jpg",
  );
  const a2body = withFigures(
    a2.bodyRo,
    figure(a2img1, "Idee notată la începutul unui proiect",
      "Fiecare afacere pornește de la un motiv — acolo începe identitatea.",
      "Every business starts from a reason — that's where identity begins."),
    figure(a2img2, "Plan vizual și notițe pe birou",
      "Claritatea și consecvența transformă valoarea într-un brand recognoscibil.",
      "Clarity and consistency turn value into a recognizable brand."),
    "Claritatea creează conexiune",
  );
  console.log("a2 patch:", JSON.stringify(await patchBody(a2._id, a2body)));
}

main().catch((e) => { console.error(e); process.exit(1); });
