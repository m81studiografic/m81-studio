// Înlocuiește cover + ambele figuri ale articolului 6 cu imagini business/branding.
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const SLUG = "de-ce-startupurile-au-nevoie-de-o-imagine-clara-de-la-inceput";

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

async function getArticle() {
  const q = encodeURIComponent(`*[_type=="article" && slug.current=="${SLUG}"][0]{_id, bodyRo, bodyEn}`);
  const res = await fetch(`${BASE}/data/query/${DATASET}?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  return (await res.json()).result;
}

function remapByOrder(body, oldRefs, mapping) {
  // mapping: { oldRef: { ref, alt, captionRo, captionEn } }
  return body.map((b) => {
    if (b._type !== "figure") return b;
    const m = mapping[b.asset?._ref];
    if (!m) return b;
    return {
      ...b,
      asset: { _type: "reference", _ref: m.ref },
      alt: m.alt,
      captionRo: m.captionRo,
      captionEn: m.captionEn,
    };
  });
}

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");
  const art = await getArticle();
  if (!art?._id) throw new Error("articol negăsit");

  const figsRo = art.bodyRo.filter((b) => b._type === "figure");
  const oldFig1 = figsRo[0].asset._ref; // fundație (plan arhitectural)
  const oldFig2 = figsRo[1].asset._ref; // creștere (răsaduri)
  console.log("old fig1:", oldFig1, "\nold fig2:", oldFig2);

  // upload imagini noi
  const coverId = await upload("https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=2400&q=80", "a6-cover-startup.jpg");
  const newFig1 = await upload("https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2000&q=80", "a6-fundatie-strategie.jpg");
  const newFig2 = await upload("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80", "a6-crestere-business.jpg");

  const mapping = {
    [oldFig1]: {
      ref: newFig1,
      alt: "Echipă care definește fundația și direcția unei afaceri",
      captionRo: "O fundație clară de la început dă structură și direcție afacerii.",
      captionEn: "A clear foundation from the start gives a business structure and direction.",
    },
    [oldFig2]: {
      ref: newFig2,
      alt: "Depozit plin de produse — o afacere care crește și se scalează",
      captionRo: "Pe măsură ce afacerea crește, o fundație clară ține totul coerent.",
      captionEn: "As the business grows, a clear foundation keeps everything coherent.",
    },
  };

  const coverImage = {
    _type: "image",
    asset: { _type: "reference", _ref: coverId },
    alt: "Birou de startup — o afacere la început de drum care își construiește imaginea",
  };

  const set = {
    coverImage,
    bodyRo: remapByOrder(art.bodyRo, [oldFig1, oldFig2], mapping),
    bodyEn: remapByOrder(art.bodyEn, [oldFig1, oldFig2], mapping),
  };

  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id: art._id, set } }] }),
  });
  console.log(JSON.stringify(await mut.json()));
}

main().catch((e) => { console.error(e); process.exit(1); });
