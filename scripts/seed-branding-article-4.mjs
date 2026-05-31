// Creează al patrulea articol de branding (cover + corp RO + EN + 2 imagini body).
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
  const d = json.document;
  if (!d?._id) throw new Error("upload failed: " + JSON.stringify(json));
  const dim = d.metadata?.dimensions;
  if (dim && dim.height > dim.width) throw new Error(`${filename} e portret (${dim.width}x${dim.height}) — schimbă URL-ul`);
  console.log(`  ${filename}: ${d._id} (${dim ? dim.width + "x" + dim.height : "?"})`);
  return d._id;
}

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");

  const coverId = await uploadImage(
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2400&q=80",
    "a4-cover.jpg",
  );
  const img1 = await uploadImage(
    "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=2000&q=80",
    "a4-claritate.jpg",
  );
  const img2 = await uploadImage(
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80",
    "a4-recunoastere.jpg",
  );
  console.log("assets:", coverId, img1, img2);

  const bodyRo = [
    lead("Calitatea contează. Experiența contează. Munca depusă contează. Și totuși, un produs bun nu garantează succesul unei afaceri."),

    p("În fiecare industrie există exemple de produse excelente care rămân aproape necunoscute. În același timp, există afaceri care reușesc să crească, să fie recunoscute și să fie alese constant."),
    p("Diferența nu este întotdeauna produsul. De multe ori, diferența este modul în care valoarea este percepută."),

    h2("Oamenii văd doar o parte din poveste"),
    p("Ca antreprenor, cunoști fiecare detaliu al afacerii tale. Știi cât timp ai investit. Știi cât ai testat. Știi cât ai îmbunătățit produsul. Știi câtă atenție acorzi detaliilor."),
    p("Clientul nu vede toate aceste lucruri. El vede ceea ce ajunge la suprafață."),
    p("Vede numele. Vede ambalajul. Vede website-ul. Vede fotografiile. Vede comunicarea. Vede experiența."),
    p("Pe baza acestor elemente își formează prima impresie. Iar prima impresie influențează mai mult decât ne place să credem."),

    h2("Oamenii aleg ceea ce înțeleg"),
    p("Atunci când avem de ales între zeci de produse sau servicii, rareori analizăm fiecare opțiune în profunzime."),
    p("Căutăm indicii. Căutăm claritate. Căutăm semnale care să ne ajute să înțelegem rapid cine este o afacere și ce promite."),
    p("Atunci când mesajele sunt neclare, când produsele par să aparțină unor lumi diferite sau când experiența nu este coerentă, valoarea devine mai greu de observat."),
    p("Nu pentru că nu există. Ci pentru că este ascunsă."),

    figure(img1, "Spațiu de lucru organizat, cu atenție la detalii",
      "Claritatea și organizarea ajută valoarea unei afaceri să devină vizibilă.",
      "Clarity and organization help a business's value become visible."),

    h2("Brandingul face valoarea vizibilă"),
    p("Unul dintre cele mai mari mituri despre branding este că acesta înseamnă doar logo-uri și culori."),
    p("În realitate, brandingul este procesul prin care o afacere devine mai ușor de înțeles."),
    p("El ajută oamenii să răspundă la întrebări simple:"),
    bullet("Cine sunteți?"),
    bullet("Ce oferiți?"),
    bullet("Ce vă face diferiți?"),
    bullet("De ce ar trebui să am încredere?"),
    p("Atunci când răspunsurile sunt clare, oamenii pot lua decizii mai ușor. Iar atunci când deciziile sunt mai ușoare, afacerea începe să fie remarcată."),

    pullQuote("Valoarea unui produs și percepția valorii sunt două lucruri diferite. Brandingul le ajută să se întâlnească."),

    h2("Produsele construiesc vânzări. Brandurile construiesc memorie."),
    p("Multe afaceri dezvoltă produse foarte bune."),
    p("Problema apare atunci când fiecare produs comunică altceva. Ambalajele arată diferit. Mesajele sunt diferite. Experiențele sunt diferite. Website-ul transmite altceva decât produsul."),
    p("În aceste situații, fiecare produs trebuie să își câștige singur atenția. Brandul nu reușește să acumuleze valoare în jurul unui singur nume."),
    p("În schimb, atunci când există claritate și consistență, fiecare experiență contribuie la aceeași percepție."),
    p("În timp, oamenii încep să recunoască afacerea. Încep să o țină minte. Încep să o recomande."),
    p("Valoarea nu mai rămâne blocată în produs. Începe să se acumuleze în jurul brandului."),

    callout("De reținut", "Dacă produsul este bun, întreabă-te:"),
    bullet("Oamenii înțeleg rapid valoarea lui?"),
    bullet("Pot explica de ce este diferit?"),
    bullet("Își amintesc cine l-a creat?"),
    bullet("Toate punctele de contact transmit aceeași idee?"),
    bullet("Experiența confirmă promisiunea?"),

    figure(img2, "Echipă și clienți care recunosc un brand familiar",
      "Recunoașterea și consistența construiesc, în timp, încrederea.",
      "Recognition and consistency build trust over time."),

    statement(
      "Un produs bun poate genera o vânzare. Un brand clar poate genera recunoaștere, încredere și creștere pe termen lung.",
      "Succesul apare atunci când valoarea pe care o construiești în interiorul afacerii devine ușor de înțeles pentru oamenii din exterior.",
    ),
  ];

  const bodyEn = [
    lead("Quality matters. Experience matters. The work you put in matters. And yet, a good product doesn't guarantee a business's success."),

    p("In every industry there are excellent products that remain almost unknown. At the same time, there are businesses that manage to grow, to be recognized and to be chosen consistently."),
    p("The difference isn't always the product. Often, the difference is the way value is perceived."),

    h2("People see only part of the story"),
    p("As an entrepreneur, you know every detail of your business. You know how much time you invested. You know how much you tested. You know how much you improved the product. You know how much attention you give to detail."),
    p("The customer doesn't see all of this. They see what reaches the surface."),
    p("They see the name. They see the packaging. They see the website. They see the photos. They see the communication. They see the experience."),
    p("Based on these elements they form a first impression. And the first impression influences more than we like to admit."),

    h2("People choose what they understand"),
    p("When we have to choose between dozens of products or services, we rarely analyze each option in depth."),
    p("We look for clues. We look for clarity. We look for signals that help us quickly understand who a business is and what it promises."),
    p("When messages are unclear, when products seem to belong to different worlds, or when the experience isn't coherent, value becomes harder to notice."),
    p("Not because it doesn't exist. But because it's hidden."),

    figure(img1, "An organized workspace with attention to detail", undefined,
      "Clarity and organization help a business's value become visible."),

    h2("Branding makes value visible"),
    p("One of the biggest myths about branding is that it's only about logos and colors."),
    p("In reality, branding is the process through which a business becomes easier to understand."),
    p("It helps people answer simple questions:"),
    bullet("Who are you?"),
    bullet("What do you offer?"),
    bullet("What makes you different?"),
    bullet("Why should I trust you?"),
    p("When the answers are clear, people can make decisions more easily. And when decisions are easier, the business starts to be noticed."),

    pullQuote("The value of a product and the perception of that value are two different things. Branding helps them meet."),

    h2("Products build sales. Brands build memory."),
    p("Many businesses develop very good products."),
    p("The problem appears when each product communicates something different. The packaging looks different. The messages are different. The experiences are different. The website conveys something other than the product."),
    p("In these situations, each product has to earn attention on its own. The brand never manages to accumulate value around a single name."),
    p("When there's clarity and consistency, on the other hand, every experience contributes to the same perception."),
    p("Over time, people begin to recognize the business. They begin to remember it. They begin to recommend it."),
    p("Value no longer stays locked inside the product. It begins to accumulate around the brand."),

    callout("Worth keeping in mind", "If the product is good, ask yourself:"),
    bullet("Do people quickly understand its value?"),
    bullet("Can they explain why it's different?"),
    bullet("Do they remember who created it?"),
    bullet("Do all touchpoints convey the same idea?"),
    bullet("Does the experience confirm the promise?"),

    figure(img2, "A team and customers recognizing a familiar brand", undefined,
      "Recognition and consistency build trust over time."),

    statement(
      "A good product can generate a sale. A clear brand can generate recognition, trust and long-term growth.",
      "Success appears when the value you build inside the business becomes easy to understand for the people outside it.",
    ),
  ];

  const doc = {
    _type: "article",
    category: "branding",
    slug: { _type: "slug", current: "de-ce-un-produs-bun-nu-este-intotdeauna-suficient" },
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Un produs bun pe un fundal editorial — valoarea care așteaptă să fie observată",
    },
    topics: ["Branding", "Percepție", "Valoare"],
    titleRo: "De ce un produs bun nu este întotdeauna suficient",
    subtitleRo: "Calitatea deschide ușa, însă oamenii aleg ceea ce înțeleg — iar brandingul face valoarea ușor de observat.",
    excerptRo: "Un produs bun nu garantează succesul. Diferența o face adesea modul în care valoarea este percepută — brandingul transformă calitatea într-o valoare ușor de înțeles, de recunoscut și de ales.",
    bodyRo,
    titleEn: "Why a good product isn't always enough",
    subtitleEn: "Quality opens the door, but people choose what they understand — and branding makes value easy to see.",
    excerptEn: "A good product doesn't guarantee success. The difference is often the way value is perceived — branding turns quality into value that's easy to understand, recognize and choose.",
    bodyEn,
  };

  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ create: doc }] }),
  });
  console.log(JSON.stringify(await mut.json(), null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
