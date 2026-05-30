// Actualizează articolul de branding existent cu noul conținut editorial.
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

const TITLE = "Ce transformă o afacere într-un brand";
const SUBTITLE =
  "Produsele și serviciile sunt doar începutul. Oamenii își amintesc afacerile care reușesc să transmită ceva mai mult.";
const EXCERPT =
  "Un brand nu este ceea ce spui despre afacerea ta, ci ceea ce înțeleg, simt și își amintesc oamenii după ce interacționează cu ea.";
const SLUG = "ce-transforma-o-afacere-intr-un-brand";

const body = [
  lead("O afacere poate oferi un produs excelent. Un brand oferă și un motiv pentru care oamenii își amintesc de el."),

  p("Atunci când construiești o afacere, cea mai mare parte din muncă rămâne invizibilă."),
  p("Oamenii văd rezultatul. Văd produsele. Văd serviciile. Văd website-ul. Văd prețurile. Dar rareori văd drumul care a dus acolo."),
  p("Nu văd experiențele care te-au format. Nu văd alegerile pe care le faci în fiecare zi. Nu văd standardele pe care refuzi să le cobori. Nu văd motivele pentru care ai început."),
  p("Și totuși, exact aceste lucruri dau personalitate unei afaceri."),

  h2("O afacere este construită din decizii"),
  p("Fiecare afacere face alegeri."),
  p("Alege cum vorbește cu oamenii. Alege ce promite. Alege ce consideră important. Alege câtă atenție acordă detaliilor. Alege ce fel de experiență oferă."),
  p("În timp, aceste alegeri creează ceva mai valoros decât un produs sau un serviciu. Creează identitate."),
  p("Iar identitatea este ceea ce îi ajută pe oameni să înțeleagă cu cine au de-a face."),

  h2("Oamenii caută claritate"),
  p("În aproape orice industrie există produse asemănătoare. Există servicii asemănătoare. Există promisiuni asemănătoare."),
  p("Din perspectiva clientului, diferențele sunt adesea greu de observat."),
  p("De aceea oamenii caută indicii. Caută semnale. Caută motive pentru care să aibă încredere. Caută afaceri care par să știe exact cine sunt și ce oferă."),
  p("În momentul în care o afacere reușește să exprime clar aceste lucruri, începe să fie percepută diferit."),

  pullQuote("Brandingul nu înseamnă să inventezi ceva nou despre afacerea ta. Înseamnă să exprimi mai clar ceea ce există deja."),

  h2("Aici începe rolul brandingului"),
  p("Brandingul nu creează valorile unei afaceri. Nu creează pasiunea. Nu creează experiența. Nu creează calitatea."),
  p("Acestea există deja."),
  p("Rolul brandingului este să le facă vizibile. Să transforme lucrurile pe care le simți în interiorul afacerii în lucruri pe care oamenii le pot înțelege din exterior."),
  p("Prin limbaj. Prin identitate vizuală. Prin experiență. Prin comunicare. Prin fiecare punct de contact dintre afacere și client."),

  h2("Încrederea se construiește în timp"),
  p("Cele mai memorabile branduri nu apar peste noapte."),
  p("Ele se construiesc prin consecvență. Prin experiențe bune repetate. Prin promisiuni respectate. Prin atenție la detalii. Prin modul în care oamenii se simt după ce interacționează cu ele."),
  p("În timp, aceste experiențe se transformă în percepție. Iar percepția se transformă în încredere."),

  callout("De reținut", "Înainte să te gândești la logo, culori sau website, încearcă să răspunzi la câteva întrebări simple:"),
  bullet("Ce apreciem cel mai mult în ceea ce facem?"),
  bullet("Ce experiență vrem să oferim?"),
  bullet("Ce ne-a făcut să începem?"),
  bullet("Cum vrem să fim percepuți?"),
  bullet("Ce vrem să își amintească oamenii despre noi?"),

  statement(
    "Un brand nu este ceea ce spui despre afacerea ta.",
    "Un brand este ceea ce înțeleg, simt și își amintesc oamenii după ce interacționează cu ea. Iar totul începe cu o înțelegere clară a ceea ce reprezintă cu adevărat afacerea ta.",
  ),
];

async function findArticleId() {
  const q = encodeURIComponent(`*[_type=="article" && category=="branding"][0]._id`);
  const res = await fetch(`${BASE}/data/query/${DATASET}?query=${q}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const json = await res.json();
  return json.result;
}

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");
  const id = await findArticleId();
  if (!id) throw new Error("articolul de branding nu a fost găsit");
  console.log("articol:", id);

  const patch = {
    id,
    set: {
      titleRo: TITLE,
      subtitleRo: SUBTITLE,
      excerptRo: EXCERPT,
      "slug": { _type: "slug", current: SLUG },
      bodyRo: body,
    },
  };

  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch }] }),
  });
  const out = await mut.json();
  console.log(JSON.stringify(out, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
