// Audit imagini: înlocuiește figurile off-topic / portret cu imagini de branding/afaceri.
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;

async function upload(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${filename}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const up = await fetch(`${BASE}/assets/images/${DATASET}?filename=${filename}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/jpeg" },
    body: buf,
  });
  const d = (await up.json()).document;
  if (!d?._id) throw new Error("upload failed: " + filename);
  const dim = d.metadata?.dimensions;
  if (dim && dim.height > dim.width) throw new Error(`${filename} portret (${dim.width}x${dim.height})`);
  console.log(`  ${filename}: ${d._id} (${dim ? dim.width + "x" + dim.height : "?"})`);
  return d._id;
}

async function getArticle(slug) {
  const q = encodeURIComponent(`*[_type=="article" && slug.current=="${slug}"][0]{_id, bodyRo, bodyEn}`);
  const res = await fetch(`${BASE}/data/query/${DATASET}?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  return (await res.json()).result;
}
const figs = (body) => body.filter((b) => b._type === "figure");
const remap = (body, oldRef, newRef, alt) =>
  body.map((b) =>
    b._type === "figure" && b.asset?._ref === oldRef
      ? { ...b, asset: { _type: "reference", _ref: newRef }, alt }
      : b,
  );
async function patch(id, set) {
  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id, set } }] }),
  });
  return mut.json();
}

const JOBS = [
  {
    slug: "ce-sta-la-baza-unui-brand-puternic",
    figIndex: 0, // paletă portret → identitate vizuală landscape
    url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=2000&q=80",
    filename: "a2-identitate-vizuala.jpg",
    alt: "Design de identitate vizuală — typografie și sistem de brand",
  },
  {
    slug: "de-ce-consistenta-creeaza-incredere",
    figIndex: 1, // cod (tech) → client la punctul de vânzare (afacere)
    url: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=2000&q=80",
    filename: "a3-punct-contact.jpg",
    alt: "Client la punctul de vânzare — un punct de contact al afacerii",
  },
];

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");
  for (const j of JOBS) {
    const art = await getArticle(j.slug);
    if (!art?._id) throw new Error("negăsit: " + j.slug);
    const oldRef = figs(art.bodyRo)[j.figIndex]?.asset?._ref;
    if (!oldRef) throw new Error(`fără figură ${j.figIndex} la ${j.slug}`);
    console.log(j.slug, "fig", j.figIndex, "ref vechi:", oldRef);
    const newRef = await upload(j.url, j.filename);
    const set = {
      bodyRo: remap(art.bodyRo, oldRef, newRef, j.alt),
      bodyEn: remap(art.bodyEn, oldRef, newRef, j.alt),
    };
    console.log("  patch:", JSON.stringify((await patch(art._id, set)).results?.[0]));
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
