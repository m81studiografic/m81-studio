// Al cincilea articol de branding (RO + EN, cover + 2 imagini body).
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;

const k = () => Math.random().toString(36).slice(2, 12);
const span = (t) => ({ _type: "span", _key: k(), text: t, marks: [] });
const block = (style, t) => ({ _type: "block", _key: k(), style, markDefs: [], children: [span(t)] });
const p = (t) => block("normal", t);
const h2 = (t) => block("h2", t);
const lead = (t) => block("blockquote", t);
const pullQuote = (t) => ({ _type: "pullQuote", _key: k(), text: t });
const callout = (label, text) => ({ _type: "callout", _key: k(), label, text });
const statement = (heading, text) => ({ _type: "statement", _key: k(), heading, text });
const bullet = (t) => ({ _type: "block", _key: k(), style: "normal", level: 1, listItem: "bullet", markDefs: [], children: [span(t)] });
const figure = (ref, alt, captionRo, captionEn) => ({ _type: "figure", _key: k(), asset: { _type: "reference", _ref: ref }, alt, captionRo, captionEn });

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

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");

  const coverId = await upload("https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=2400&q=80", "a5-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1633533452148-a9657d2c9a5f?auto=format&fit=crop&w=2000&q=80", "a5-recunoastere.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=2000&q=80", "a5-consistenta.jpg");

  const capFig1Ro = "Identitatea vizuală consecventă face produsele ușor de recunoscut.";
  const capFig1En = "A consistent visual identity makes products easy to recognize.";
  const capFig2Ro = "Familiaritatea și consistența fac un brand ușor de recunoscut.";
  const capFig2En = "Familiarity and consistency make a brand easy to recognize.";

  const bodyRo = [
    lead("În fiecare zi întâlnim sute de produse, servicii și afaceri. Majoritatea acestor interacțiuni dispar din memorie aproape imediat. Doar câteva reușesc să rămână."),
    p("Vedem reclame. Vizităm website-uri. Trecem pe lângă magazine. Primim emailuri. Navigăm pe rețele sociale."),
    p("Acesta este unul dintre cele mai importante roluri ale brandingului: să ajute o afacere să fie recunoscută și ținută minte."),

    h2("Memoria nu funcționează prin acumulare"),
    p("Mulți antreprenori cred că oamenii își vor aminti toate detaliile despre afacerea lor. În realitate, memoria funcționează diferit."),
    p("Oamenii nu rețin liste lungi de informații. Nu rețin toate caracteristicile unui produs. Nu rețin fiecare mesaj."),
    p("În schimb, rețin impresii. Rețin emoții. Rețin experiențe. Rețin lucrurile care apar constant și au sens împreună."),
    p("Atunci când o afacere transmite aceeași idee prin toate punctele de contact, șansele de a fi memorată cresc considerabil."),

    figure(fig1, "Produse cu identitate vizuală consecventă, ușor de recunoscut", capFig1Ro, capFig1En),

    h2("Recunoașterea apare înaintea memorării"),
    p("Înainte ca oamenii să își amintească un brand, trebuie să îl recunoască. Recunoașterea apare atunci când există elemente familiare."),
    p("Poate fi vorba despre:"),
    bullet("un stil vizual"),
    bullet("un ton al comunicării"),
    bullet("o experiență"),
    bullet("o promisiune"),
    bullet("un mod de a face lucrurile"),
    p("Atunci când aceste elemente sunt consecvente, ele încep să construiască familiaritate. Iar familiaritatea reduce incertitudinea."),
    p("Oamenii tind să aibă mai multă încredere în ceea ce recunosc."),

    h2("Brandurile memorabile transmit o idee clară"),
    p("Unele afaceri încearcă să comunice prea multe lucruri în același timp."),
    p("Vor să fie premium. Vor să fie accesibile. Vor să fie inovatoare. Vor să fie tradiționale. Vor să vorbească tuturor."),
    p("Rezultatul este adesea confuzia."),
    p("Brandurile memorabile au, de regulă, o idee centrală clară. O idee pe care oamenii o pot înțelege și asocia rapid cu afacerea respectivă."),

    pullQuote("Oamenii nu își amintesc tot ce spui. Își amintesc ceea ce repeți în mod consecvent."),

    h2("Fiecare experiență contribuie la memorie"),
    p("Memoria unui brand nu este construită printr-o singură reclamă. Nici printr-un singur logo. Ea se construiește prin acumularea experiențelor."),
    p("Website-ul. Ambalajul. Comunicarea. Serviciul. Fotografiile. Produsele. Toate contribuie la aceeași percepție."),
    p("Atunci când experiențele confirmă aceeași idee, oamenii încep să creeze o asociere puternică între brand și ceea ce reprezintă acesta."),

    callout("De reținut", "Dacă vrei ca oamenii să își amintească afacerea ta, întreabă-te:"),
    bullet("Ce idee principală vrem să asociem cu brandul nostru?"),
    bullet("Este această idee prezentă în toate experiențele pe care le oferim?"),
    bullet("Comunicăm consecvent?"),
    bullet("Suntem ușor de recunoscut?"),
    bullet("Ce își vor aminti oamenii după ce interacționează cu noi?"),

    figure(fig2, "Sistem de design consecvent — tipare repetate care construiesc recunoaștere", capFig2Ro, capFig2En),

    statement("Brandurile memorabile nu apar din întâmplare.", "Ele sunt construite prin claritate, consistență și experiențe care confirmă aceeași idee în timp. Oamenii își amintesc ceea ce înțeleg, recunosc și întâlnesc în mod repetat."),
  ];

  const bodyEn = [
    lead("Every day we encounter hundreds of products, services and businesses. Most of these interactions disappear from memory almost instantly. Only a few manage to stay."),
    p("We see ads. We visit websites. We walk past stores. We receive emails. We scroll through social media."),
    p("This is one of the most important roles of branding: to help a business be recognized and remembered."),

    h2("Memory doesn't work through accumulation"),
    p("Many entrepreneurs believe people will remember every detail about their business. In reality, memory works differently."),
    p("People don't retain long lists of information. They don't retain every feature of a product. They don't retain every message."),
    p("Instead, they retain impressions. They retain emotions. They retain experiences. They retain the things that appear consistently and make sense together."),
    p("When a business conveys the same idea across all touchpoints, the chances of being remembered increase considerably."),

    figure(fig1, "Products with a consistent visual identity, easy to recognize", capFig1Ro, capFig1En),

    h2("Recognition comes before memory"),
    p("Before people remember a brand, they have to recognize it. Recognition appears when there are familiar elements."),
    p("It can be:"),
    bullet("a visual style"),
    bullet("a tone of communication"),
    bullet("an experience"),
    bullet("a promise"),
    bullet("a way of doing things"),
    p("When these elements are consistent, they begin to build familiarity. And familiarity reduces uncertainty."),
    p("People tend to trust what they recognize more."),

    h2("Memorable brands convey a clear idea"),
    p("Some businesses try to communicate too many things at once."),
    p("They want to be premium. They want to be affordable. They want to be innovative. They want to be traditional. They want to speak to everyone."),
    p("The result is often confusion."),
    p("Memorable brands usually have one clear central idea. An idea people can quickly understand and associate with that business."),

    pullQuote("People don't remember everything you say. They remember what you repeat consistently."),

    h2("Every experience contributes to memory"),
    p("A brand's memory isn't built through a single ad. Nor through a single logo. It's built through the accumulation of experiences."),
    p("The website. The packaging. The communication. The service. The photos. The products. They all contribute to the same perception."),
    p("When experiences confirm the same idea, people begin to create a strong association between the brand and what it represents."),

    callout("Worth keeping in mind", "If you want people to remember your business, ask yourself:"),
    bullet("What main idea do we want associated with our brand?"),
    bullet("Is that idea present in all the experiences we offer?"),
    bullet("Do we communicate consistently?"),
    bullet("Are we easy to recognize?"),
    bullet("What will people remember after interacting with us?"),

    figure(fig2, "A consistent design system — repeated patterns that build recognition", capFig2Ro, capFig2En),

    statement("Memorable brands don't appear by chance.", "They're built through clarity, consistency and experiences that confirm the same idea over time. People remember what they understand, recognize and encounter repeatedly."),
  ];

  const doc = {
    _type: "article",
    category: "branding",
    slug: { _type: "slug", current: "cum-ajung-oamenii-sa-isi-aminteasca-un-brand" },
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Raft plin de produse — întâlnim sute în fiecare zi, dar doar câteva branduri rămân în memorie",
    },
    topics: ["Branding", "Memorabilitate", "Recunoaștere"],
    titleRo: "Cum ajung oamenii să își amintească un brand",
    subtitleRo: "Memoria nu funcționează prin acumulare, ci prin recunoaștere — oamenii rețin ceea ce întâlnesc constant și are sens împreună.",
    excerptRo: "Brandurile memorabile se construiesc prin claritate, consistență și experiențe care confirmă aceeași idee în timp — oamenii își amintesc ceea ce înțeleg, recunosc și întâlnesc repetat.",
    bodyRo,
    titleEn: "How people come to remember a brand",
    subtitleEn: "Memory doesn't work through accumulation, but through recognition — people retain what they encounter consistently and what makes sense together.",
    excerptEn: "Memorable brands are built through clarity, consistency and experiences that confirm the same idea over time — people remember what they understand, recognize and encounter repeatedly.",
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
