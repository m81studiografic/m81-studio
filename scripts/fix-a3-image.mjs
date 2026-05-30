// Înlocuiește prima imagine body din articolul 3 cu una landscape.
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;

async function uploadImage(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const up = await fetch(`${BASE}/assets/images/${DATASET}?filename=${filename}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/jpeg" },
    body: buf,
  });
  const json = await up.json();
  if (!json.document?._id) throw new Error("upload failed: " + JSON.stringify(json));
  return json.document; // has _id and metadata.dimensions
}

async function getArticle(slug) {
  const q = encodeURIComponent(`*[_type=="article" && slug.current=="${slug}"][0]{_id, bodyRo}`);
  const res = await fetch(`${BASE}/data/query/${DATASET}?query=${q}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return (await res.json()).result;
}

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");

  // landscape candidate: doi oameni în conversație / punct de contact
  const doc = await uploadImage(
    "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=2000&q=80",
    "a3-contact-landscape.jpg",
  );
  const dim = doc.metadata?.dimensions;
  console.log("uploaded:", doc._id, dim ? `${dim.width}x${dim.height}` : "(no dims)");
  if (dim && dim.height > dim.width) throw new Error("candidatul e tot portret — schimbă URL-ul");

  const art = await getArticle("de-ce-consistenta-creeaza-incredere");
  const body = art.bodyRo.map((b) => {
    if (b._type === "figure" && (b.captionRo || "").startsWith("Fiecare punct de contact")) {
      return { ...b, asset: { _type: "reference", _ref: doc._id } };
    }
    return b;
  });

  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id: art._id, set: { bodyRo: body } } }] }),
  });
  console.log(JSON.stringify(await mut.json()));
}

main().catch((e) => { console.error(e); process.exit(1); });
