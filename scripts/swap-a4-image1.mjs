// Înlocuiește PRIMA imagine din corpul articolului 4 (pianistul) cu una de branding.
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const SLUG = "de-ce-un-produs-bun-nu-este-intotdeauna-suficient";

// candidați branding / claritate-organizare (landscape); primul valid e folosit
const CANDIDATES = [
  "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=2000&q=80",
];

async function uploadLandscape() {
  for (const url of CANDIDATES) {
    const res = await fetch(url);
    if (!res.ok) { console.log("skip (fetch):", res.status, url); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    const up = await fetch(`${BASE}/assets/images/${DATASET}?filename=a4-claritate-branding.jpg`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/jpeg" },
      body: buf,
    });
    const d = (await up.json()).document;
    if (!d?._id) { console.log("skip (upload)"); continue; }
    const dim = d.metadata?.dimensions;
    if (dim && dim.height > dim.width) { console.log("skip (portret):", `${dim.width}x${dim.height}`, url); continue; }
    console.log("folosesc:", d._id, dim ? `${dim.width}x${dim.height}` : "?");
    return d._id;
  }
  throw new Error("niciun candidat landscape valid");
}

async function getArticle() {
  const q = encodeURIComponent(`*[_type=="article" && slug.current=="${SLUG}"][0]{_id, bodyRo, bodyEn}`);
  const res = await fetch(`${BASE}/data/query/${DATASET}?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  return (await res.json()).result;
}

const figs = (body) => body.filter((b) => b._type === "figure");
const remap = (body, oldRef, newRef, newAlt) =>
  body.map((b) =>
    b._type === "figure" && b.asset?._ref === oldRef
      ? { ...b, asset: { _type: "reference", _ref: newRef }, alt: newAlt }
      : b,
  );

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");
  const art = await getArticle();
  if (!art?._id) throw new Error("articol negăsit");

  const roFigs = figs(art.bodyRo);
  if (roFigs.length < 1) throw new Error("nu am găsit figuri în bodyRo");
  const oldRef = roFigs[0].asset?._ref; // PRIMA figură din corp
  console.log("ref vechi (figura 1):", oldRef);

  const newRef = await uploadLandscape();
  const newAlt = "Identitate vizuală organizată — claritatea face valoarea unei afaceri vizibilă";

  const set = {
    bodyRo: remap(art.bodyRo, oldRef, newRef, newAlt),
    bodyEn: remap(art.bodyEn, oldRef, newRef, newAlt),
  };

  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id: art._id, set } }] }),
  });
  console.log(JSON.stringify(await mut.json()));
}

main().catch((e) => { console.error(e); process.exit(1); });
