// Înlocuiește imaginile articolului Technology #1 cu mockup-uri proprii (RO).
import { readFileSync } from "node:fs";
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const SLUG = "cum-poate-tehnologia-sa-imbunatateasca-experienta-clientilor-in-avocatura";
const DIR = "/Users/m81studio/Desktop/Cum poate tehnologia să îmbunătățească experiența clienților în avocatură";

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

  const coverId = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780427705481_7bf87111.png`, "tech1-client-care.png");
  const fig1 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780427424156_cedd9bfd.png`, "tech1-website-lexiusta.png");
  const fig2 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780427510900_cae9cd2c.png`, "tech1-portal-clienti.png");

  const cap = {
    [oldFig1]: {
      ref: fig1,
      alt: "Website modern de avocatură cu opțiuni de contact și programare",
      captionRo: "Website modern de avocatură cu opțiuni de contact și programare accesibile.",
      captionEn: "A modern law firm website with accessible contact and scheduling options.",
    },
    [oldFig2]: {
      ref: fig2,
      alt: "Portal clienți pentru comunicare și schimb de documente",
      captionRo: "Portal digital utilizat pentru comunicarea și schimbul de documente cu clienții.",
      captionEn: "A digital portal used for communication and document exchange with clients.",
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
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Experiența digitală a clientului într-o firmă de avocatură — portal și comunicare" },
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
