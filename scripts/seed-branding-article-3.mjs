// Creează al treilea articol de branding (cover + corp RO + 2 imagini body).
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;

const k = () => Math.random().toString(36).slice(2, 12);

const span = (text) => ({ _type: "span", _key: k(), text, marks: [] });
const block = (style, text) => ({
  _type: "block", _key: k(), style, markDefs: [], children: [span(text)],
});
const p = (text) => block("normal", text);
const h2 = (text) => block("h2", text);
const lead = (text) => block("blockquote", text);
const pullQuote = (text) => ({ _type: "pullQuote", _key: k(), text });
const callout = (label, text) => ({ _type: "callout", _key: k(), label, text });
const statement = (heading, text) => ({ _type: "statement", _key: k(), heading, text });
const bullet = (text) => ({
  _type: "block", _key: k(), style: "normal", level: 1, listItem: "bullet",
  markDefs: [], children: [span(text)],
});
const figure = (assetId, alt, captionRo, captionEn) => ({
  _type: "figure", _key: k(), asset: { _type: "reference", _ref: assetId },
  alt, captionRo, captionEn,
});

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

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");

  const coverId = await uploadImage(
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2400&q=80",
    "a3-cover.jpg",
  );
  const img1 = await uploadImage(
    "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=2000&q=80",
    "a3-contact.jpg",
  );
  const img2 = await uploadImage(
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2000&q=80",
    "a3-evolutie.jpg",
  );
  console.log("assets:", coverId, img1, img2);

  const body = [
    lead("Încrederea apare atunci când oamenii înțeleg cine ești și recunosc acest lucru de fiecare dată când interacționează cu afacerea ta."),

    p("Există afaceri pe care le recunoaștem imediat."),
    p("Le recunoaștem după felul în care comunică. După experiența pe care o oferă. După atenția la detalii. După modul în care ne fac să ne simțim."),
    p("În timp, aceste lucruri devin familiare. Iar familiaritatea este una dintre bazele încrederii."),
    p("Oamenii apreciază experiențele care au sens. Experiențele care sunt clare. Experiențele care transmit aceeași idee indiferent unde le întâlnesc."),

    figure(img1, "Conversație între un client și o afacere",
      "Fiecare punct de contact contribuie la imaginea pe care oamenii o au despre brand.",
      "Every touchpoint shapes the image people form about the brand."),

    h2("Fiecare interacțiune contribuie la imaginea unei afaceri"),
    p("O afacere comunică permanent."),
    p("Prin website. Prin social media. Prin emailuri. Prin produse. Prin servicii. Prin fiecare conversație cu un client."),
    p("Fiecare dintre aceste puncte de contact contribuie la modul în care oamenii percep brandul."),
    p("Atunci când toate transmit aceeași personalitate și aceeași direcție, imaginea devine mai clară."),
    p("Oamenii înțeleg mai repede cine ești. Înțeleg ce reprezinți. Înțeleg la ce se pot aștepta."),

    h2("Încrederea se construiește prin confirmare"),
    p("Cele mai puternice relații se dezvoltă în timp. Același lucru este valabil și pentru branduri."),
    p("Încrederea crește atunci când experiențele confirmă ceea ce ai promis. Atunci când valorile pe care le comunici se regăsesc în realitate. Atunci când atenția la detalii se observă în fiecare interacțiune."),
    p("Atunci când oamenii simt că afacerea pe care au descoperit-o ieri este aceeași afacere pe care o întâlnesc și mâine."),

    pullQuote("Consistența transformă experiențele individuale în încredere. În timp, încrederea transformă o afacere într-un brand memorabil."),

    h2("Claritatea ajută oamenii să te recunoască"),
    p("Atunci când o afacere are o direcție clară, oamenii încep să o recunoască mai ușor."),
    p("Recunosc limbajul. Recunosc stilul. Recunosc valorile. Recunosc experiența."),
    p("Această recunoaștere reduce efortul de înțelegere."),
    p("Oamenii nu mai încearcă să descifreze cine ești. Încep să se concentreze pe ceea ce oferi. Încep să construiască o relație cu brandul."),

    figure(img2, "Echipă lucrând în timp ce afacerea evoluează",
      "Consistența oferă continuitate chiar și atunci când afacerea evoluează.",
      "Consistency provides continuity even as the business evolves."),

    h2("Consistența susține evoluția"),
    p("Orice afacere evoluează."),
    p("Lansează servicii noi. Își actualizează website-ul. Își dezvoltă identitatea. Își îmbunătățește procesele."),
    p("Evoluția este firească."),
    p("În același timp, există anumite lucruri care oferă continuitate. Valorile. Personalitatea. Experiența. Modul în care afacerea alege să se raporteze la oameni."),
    p("Aceste elemente creează stabilitate și fac evoluția mai ușor de înțeles."),

    callout("Aspecte care contribuie la consistența unui brand", ""),
    bullet("Un mesaj clar și coerent"),
    bullet("O identitate vizuală recognoscibilă"),
    bullet("O experiență similară în toate punctele de contact"),
    bullet("Valori exprimate prin acțiuni"),
    bullet("Promisiuni respectate în mod constant"),

    statement(
      "Oamenii dezvoltă încredere în afacerile pe care le înțeleg și le recunosc.",
      "Atunci când experiența, comunicarea și valorile transmit aceeași direcție în timp, brandul devine mai clar, mai memorabil și mai ușor de ales.",
    ),
  ];

  const doc = {
    _type: "article",
    category: "branding",
    slug: { _type: "slug", current: "de-ce-consistenta-creeaza-incredere" },
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Echipă coerentă în jurul aceleiași direcții — consistența ca temelie a încrederii",
    },
    topics: ["Branding", "Consistență", "Încredere"],
    titleRo: "De ce consistența creează încredere",
    subtitleRo: "Oamenii își formează încrederea atunci când întâlnesc aceeași experiență, aceleași valori și aceeași atenție la detalii în timp.",
    excerptRo: "Încrederea apare atunci când experiența, comunicarea și valorile unei afaceri transmit aceeași direcție în timp — consistența transformă experiențele individuale într-un brand memorabil.",
    bodyRo: body,
  };

  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ create: doc }] }),
  });
  console.log(JSON.stringify(await mut.json(), null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
