// Înlocuiește imaginile articolului "investesc în marketing" cu mockup-urile proprii corecte.
import { readFileSync } from "node:fs";
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const SLUG = "de-ce-unele-afaceri-investesc-in-marketing-fara-sa-obtina-rezultate";
const DIR = "/Users/m81studio/Desktop/Imagini articole/De ce unele afaceri investesc în marketing fără să obțină rezultate";

async function uploadFile(path, filename) {
  const buf = readFileSync(path);
  const up = await fetch(`${BASE}/assets/images/${DATASET}?filename=${filename}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/png" },
    body: buf,
  });
  const d = (await up.json()).document;
  if (!d?._id) throw new Error("upload failed: " + filename);
  console.log(`  ${filename}: ${d._id} (${d.metadata?.dimensions?.width}x${d.metadata?.dimensions?.height})`);
  return d._id;
}

async function getArticle() {
  const q = encodeURIComponent(`*[_type=="article" && slug.current=="${SLUG}"][0]{_id, bodyRo, bodyEn}`);
  const res = await fetch(`${BASE}/data/query/${DATASET}?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  return (await res.json()).result;
}

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");
  const art = await getArticle();
  if (!art?._id) throw new Error("articol negăsit");

  const figsRo = art.bodyRo.filter((b) => b._type === "figure");
  const oldFig1 = figsRo[0].asset._ref;
  const oldFig2 = figsRo[1].asset._ref;

  const coverId = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780435425484_6c55bb21 (1).png`, "marketing2-cover-elevate.png");
  const fig1 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780436144175_65e89069.png`, "marketing2-fig1-growth.png");
  const fig2 = await uploadFile(`${DIR}/openart-image_1780435183351_4eda335f_1780435183414_8d80a394.png`, "marketing2-fig2-material.png");

  const cap = {
    [oldFig1]: {
      ref: fig1,
      alt: "Evoluția marketingului — de la tradițional la transformativ",
      captionRo: "Campaniile de marketing pot genera atenție, dar nu garantează înțelegerea unei afaceri.",
      captionEn: "Marketing campaigns can generate attention, but they don't guarantee that a business is understood.",
    },
    [oldFig2]: {
      ref: fig2,
      alt: "Materiale de brand — experiență și comunicare coerentă",
      captionRo: "Experiența și comunicarea influențează modul în care oamenii reacționează la promovare.",
      captionEn: "Experience and communication influence how people react to promotion.",
    },
  };

  const remap = (body) =>
    body.map((b) => {
      if (b._type !== "figure") return b;
      const m = cap[b.asset?._ref];
      if (!m) return b;
      return { ...b, asset: { _type: "reference", _ref: m.ref }, alt: m.alt, captionRo: m.captionRo, captionEn: m.captionEn };
    });

  const set = {
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Strategie de marketing care pune accent pe claritate și creștere" },
    bodyRo: remap(art.bodyRo),
    bodyEn: remap(art.bodyEn),
  };

  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id: art._id, set } }] }),
  });
  console.log(JSON.stringify(await mut.json()));
}

main().catch((e) => { console.error(e); process.exit(1); });
