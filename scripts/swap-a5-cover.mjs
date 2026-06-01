// Schimbă coperta articolului 5 cu o imagine cu senzație românească, fără text englez/$.
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const SLUG = "cum-ajung-oamenii-sa-isi-aminteasca-un-brand";

const CANDIDATES = [
  "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=2400&q=80", // culoar de supermarket plin de produse, fără text englez/$
];

async function uploadLandscape() {
  for (const url of CANDIDATES) {
    const res = await fetch(url);
    if (!res.ok) { console.log("skip fetch", res.status); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    const up = await fetch(`${BASE}/assets/images/${DATASET}?filename=a5-cover-supermarket.jpg`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/jpeg" },
      body: buf,
    });
    const d = (await up.json()).document;
    if (!d?._id) { console.log("skip upload"); continue; }
    const dim = d.metadata?.dimensions;
    if (dim && dim.height > dim.width) { console.log("skip portret", `${dim.width}x${dim.height}`); continue; }
    console.log("folosesc:", d._id, dim ? `${dim.width}x${dim.height}` : "?");
    return d._id;
  }
  throw new Error("niciun candidat landscape valid");
}

async function getId() {
  const q = encodeURIComponent(`*[_type=="article" && slug.current=="${SLUG}"][0]._id`);
  const res = await fetch(`${BASE}/data/query/${DATASET}?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  return (await res.json()).result;
}

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");
  const id = await getId();
  if (!id) throw new Error("articol negăsit");
  const ref = await uploadLandscape();
  const coverImage = {
    _type: "image",
    asset: { _type: "reference", _ref: ref },
    alt: "Culoar de supermarket plin de produse — întâlnim sute în fiecare zi, dar doar câteva branduri rămân în memorie",
  };
  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id, set: { coverImage } } }] }),
  });
  console.log(JSON.stringify(await mut.json()));
}

main().catch((e) => { console.error(e); process.exit(1); });
