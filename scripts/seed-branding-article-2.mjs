// Creează al doilea articol de branding în Sanity (cover + corp RO).
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;

const k = () => Math.random().toString(36).slice(2, 12);

const span = (text) => ({ _type: "span", _key: k(), text, marks: [] });
const block = (style, text) => ({
  _type: "block",
  _key: k(),
  style,
  markDefs: [],
  children: [span(text)],
});
const p = (text) => block("normal", text);
const h2 = (text) => block("h2", text);
const lead = (text) => block("blockquote", text);
const pullQuote = (text) => ({ _type: "pullQuote", _key: k(), text });
const callout = (label, text) => ({ _type: "callout", _key: k(), label, text });
const statement = (heading, text) => ({ _type: "statement", _key: k(), heading, text });
const bullet = (text) => ({
  _type: "block",
  _key: k(),
  style: "normal",
  level: 1,
  listItem: "bullet",
  markDefs: [],
  children: [span(text)],
});

const body = [
  lead("Înainte de identitate vizuală, există identitate. Înainte de branding, există o afacere care știe ce reprezintă."),

  p("Atunci când oamenii aud cuvântul branding, se gândesc adesea la partea vizibilă a unei afaceri."),
  p("Logo-ul. Culorile. Website-ul. Materialele de comunicare."),
  p("Acestea sunt elementele pe care le observăm prima dată."),
  p("Dar cele mai puternice branduri încep mult mai devreme. Încep cu o înțelegere clară a ceea ce sunt și a valorii pe care vor să o aducă oamenilor."),
  p("Aceasta este fundația pe care se construiește tot restul."),

  h2("Fiecare afacere are o identitate"),
  p("În spatele fiecărei afaceri există un motiv pentru care a fost creată."),
  p("Poate ai observat o problemă care merita rezolvată. Poate ai vrut să oferi o experiență mai bună. Poate ai transformat o pasiune într-un proiect. Poate ai continuat o tradiție. Poate ai văzut o oportunitate și ai ales să construiești ceva în jurul ei."),
  p("Aceste lucruri influențează felul în care lucrezi. Influențează alegerile pe care le faci. Influențează experiența pe care o creezi."),
  p("În timp, ele devin parte din personalitatea afacerii."),

  h2("Oamenii își amintesc ceea ce simt"),
  p("Produsele pot fi asemănătoare. Serviciile pot fi asemănătoare. Experiențele însă sunt diferite."),
  p("Oamenii observă atenția la detalii. Observă grija. Observă consecvența. Observă atunci când există o idee clară în spatele unei afaceri."),
  p("În timp, aceste lucruri construiesc încredere. Iar încrederea este unul dintre cele mai valoroase active pe care le poate avea un brand."),

  pullQuote("Un brand puternic apare atunci când ceea ce crezi, ceea ce faci și ceea ce comunici spun aceeași poveste."),

  h2("Brandingul exprimă ceea ce există deja"),
  p("Identitatea vizuală are un rol important. La fel și website-ul. La fel și comunicarea."),
  p("Dar valoarea lor apare atunci când exprimă ceva real. Valorile unei afaceri. Personalitatea ei. Experiența pe care dorește să o ofere. Modul în care lucrează."),
  p("Atunci când toate aceste elemente sunt aliniate, oamenii înțeleg mai ușor cine ești și ce reprezinți."),

  h2("Claritatea creează conexiune"),
  p("Multe afaceri investesc timp și resurse în dezvoltarea produselor și serviciilor."),
  p("Pasul următor este să transforme această valoare într-o experiență pe care oamenii o pot recunoaște și înțelege."),
  p("Claritatea ajută oamenii să își formeze o imagine. Consecvența îi ajută să își amintească. Experiența îi ajută să aibă încredere."),
  p("În timp, aceste lucruri construiesc ceva mai mare decât o identitate vizuală. Construiesc un brand."),

  callout("Întrebări care merită explorate", ""),
  bullet("Ce reprezintă afacerea noastră?"),
  bullet("Ce apreciem cel mai mult?"),
  bullet("Ce experiență vrem să oferim?"),
  bullet("Ce ne motivează să construim în fiecare zi?"),
  bullet("Ce vrem să își amintească oamenii despre noi?"),

  statement(
    "Cele mai puternice branduri se construiesc pe claritate, valori și consecvență.",
    "Designul, comunicarea și experiența devin instrumentele prin care această identitate capătă formă și ajunge la oameni.",
  ),
];

async function uploadCover() {
  const imgUrl = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2400&q=80";
  const res = await fetch(imgUrl);
  if (!res.ok) throw new Error("unsplash fetch failed: " + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  const up = await fetch(`${BASE}/assets/images/${DATASET}?filename=brand-foundation.jpg`, {
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
  const assetId = await uploadCover();
  console.log("asset:", assetId);

  const doc = {
    _type: "article",
    category: "branding",
    slug: { _type: "slug", current: "ce-sta-la-baza-unui-brand-puternic" },
    publishedAt: new Date().toISOString(),
    readTime: 4,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
      alt: "O echipă lucrând împreună — fundația unui brand puternic stă în claritate, valori și consecvență",
    },
    topics: ["Branding", "Claritate", "Valori"],
    titleRo: "Ce stă la baza unui brand puternic",
    subtitleRo: "Cele mai memorabile branduri pornesc din claritate, valori și o înțelegere profundă a ceea ce reprezintă.",
    excerptRo: "Cele mai puternice branduri se construiesc pe claritate, valori și consecvență — iar designul, comunicarea și experiența sunt doar instrumentele prin care această identitate ajunge la oameni.",
    bodyRo: body,
  };

  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ create: doc }] }),
  });
  const out = await mut.json();
  console.log(JSON.stringify(out, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
