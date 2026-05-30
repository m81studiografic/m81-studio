// Creează un articol real de branding în Sanity (cover + corp RO).
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;

const k = () => Math.random().toString(36).slice(2, 12);

// span helper
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
const statement = (heading, text) => ({ _type: "statement", _key: k(), heading, text });

const body = [
  p("Dacă ai construit vreodată o afacere, probabil știi cât de multe lucruri rămân nevăzute."),
  p("Oamenii văd produsul. Văd serviciul. Văd prețul. Dar nu văd anii de muncă. Nu văd greșelile din care ai învățat. Nu văd serile în care ai rămas peste program. Nu văd grija pentru detalii. Nu văd motivul pentru care ai început."),
  p("Și totuși, toate aceste lucruri există. Ele fac parte din afacerea ta. Ele îi dau personalitate. Ele îi dau sens."),

  h2("O afacere este mai mult decât ceea ce vinde"),
  p("Poți vinde gogoși. Poți avea o cafenea. Poți conduce o firmă de avocatură. Poți construi case."),
  p("La suprafață, acestea sunt doar produse și servicii. Dar în spatele lor există întotdeauna ceva mai mult."),
  p("Există oameni. Există valori. Există alegeri. Există o anumită atenție pentru detalii. Există un mod propriu de a face lucrurile. Există un motiv pentru care afacerea există."),
  p("Iar oamenii simt aceste lucruri, chiar și atunci când nu le pot explica."),

  h2("Problema este că multe afaceri nu reușesc să exprime ceea ce sunt"),
  p("Nu pentru că nu au valoare. Ci pentru că valoarea lor rămâne ascunsă."),
  p("Se pierd în mesaje generice. În website-uri care arată la fel. În promisiuni pe care le fac toți ceilalți."),
  p("În încercarea de a părea profesioniști, multe afaceri ajung să pară identice. Iar atunci devine greu pentru oameni să înțeleagă diferențele reale."),

  h2("Aici începe rolul brandingului"),
  p("Nu este să inventeze o poveste. Nu este să creeze aparențe. Nu este să transforme o afacere în ceva ce nu este."),
  lead("Rolul brandingului este să exprime mai clar ceea ce există deja. Să transforme identitatea unei afaceri într-o experiență pe care oamenii o pot înțelege."),
  p("Să facă vizibil ceea ce înainte era invizibil. Să creeze o legătură între ceea ce simți în interiorul afacerii și ceea ce percep oamenii din exterior."),

  h2("Cele mai puternice branduri nu sunt construite din marketing"),
  p("Sunt construite din consecvență. Din experiențe. Din încredere. Din lucruri făcute bine, în mod repetat."),
  p("În timp, oamenii încep să recunoască aceste lucruri. Încep să le asocieze cu un nume. Cu un loc. Cu o companie. Cu o experiență."),
  pullQuote("Și astfel apare ceva mult mai valoros decât vizibilitatea. Apare încrederea."),

  h2("Oamenii nu aleg întotdeauna cea mai bună opțiune"),
  p("Aleg opțiunea pe care o înțeleg. Pe cea care le inspiră încredere. Pe cea pe care și-o amintesc. Pe cea care le transmite ceva."),
  p("Acesta este motivul pentru care brandingul contează. Nu pentru că face o afacere mai frumoasă. Ci pentru că ajută o afacere să fie înțeleasă."),

  h2("În final"),
  p("Brandingul nu este despre logo-uri. Nu este despre culori. Nu este despre tendințe."),
  p("Este despre exprimare. Despre autenticitate. Despre încredere."),
  p("Despre modul în care o afacere reușește să transforme ceea ce este în ceva ce oamenii pot vedea, înțelege și simți."),
  statement("O afacere bună merită mai mult decât să existe.", "Merită să însemne ceva pentru oameni."),
];

async function uploadCover() {
  const imgUrl = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2400&q=80";
  const res = await fetch(imgUrl);
  const buf = Buffer.from(await res.arrayBuffer());
  const up = await fetch(`${BASE}/assets/images/${DATASET}?filename=branding-meaning.jpg`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/jpeg" },
    body: buf,
  });
  const json = await up.json();
  if (!json.document?._id) throw new Error("upload failed: " + JSON.stringify(json));
  return json.document._id;
}

async function main() {
  const assetId = await uploadCover();
  console.log("asset:", assetId);

  const doc = {
    _type: "article",
    category: "branding",
    slug: { _type: "slug", current: "de-ce-unele-afaceri-ajung-sa-insemne-ceva-pentru-oameni" },
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
      alt: "Vitrina unei afaceri locale — brandingul ca expresie a ceea ce o afacere reprezintă cu adevărat",
    },
    topics: ["Branding", "Încredere", "Identitate"],
    titleRo: "De ce unele afaceri ajung să însemne ceva pentru oameni",
    subtitleRo: "Brandingul nu este despre logo-uri sau culori. Este despre modul în care o afacere își exprimă valorile, construiește încredere și ajunge să fie ținută minte.",
    excerptRo: "Brandingul nu este despre logo-uri sau culori. Este despre modul în care o afacere își exprimă valorile, construiește încredere și ajunge să fie ținută minte de oameni.",
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
