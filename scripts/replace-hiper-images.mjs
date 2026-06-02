// Înlocuiește imaginile articolului Hiper Ambrozia cu screenshot-uri reale decupate.
import { readFileSync } from "node:fs";
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const SLUG = "hiper-ambrozia-cand-brandul-nu-comunica-valoarea-produsului";

async function uploadFile(path, filename) {
  const buf = readFileSync(path);
  const up = await fetch(`${BASE}/assets/images/${DATASET}?filename=${filename}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/png" },
    body: buf,
  });
  const d = (await up.json()).document;
  if (!d?._id) throw new Error("upload failed: " + filename);
  const dim = d.metadata?.dimensions;
  console.log(`  ${filename}: ${d._id} (${dim ? dim.width + "x" + dim.height : "?"})`);
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
  console.log("old fig1:", oldFig1, "\nold fig2:", oldFig2);

  const D = "/tmp";
  const coverId = await uploadFile(`${D}/pa_cover.png`, "hiper-cover-home-hero.png");
  const fig1 = await uploadFile(`${D}/pa_fig1.png`, "hiper-fig1-homepage.png");
  const fig2 = await uploadFile(`${D}/pa_fig2.png`, "hiper-fig2-biscuiti.png");

  const cap = {
    [oldFig1]: {
      ref: fig1,
      alt: "Pagina principală Hiper Ambrozia",
      captionRo: "Pagina principală Hiper Ambrozia și elementele percepute în primele secunde de navigare.",
      captionEn: "The Hiper Ambrozia homepage and the elements perceived in the first seconds of browsing.",
    },
    [oldFig2]: {
      ref: fig2,
      alt: "Grila de produse (biscuiți) de pe website-ul Hiper Ambrozia",
      captionRo: "Produse și elemente vizuale care ilustrează lipsa unui sistem coerent de brand.",
      captionEn: "Products and visual elements that illustrate the lack of a coherent brand system.",
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
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Hiper Ambrozia — pagina principală (hero) a website-ului",
    },
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
