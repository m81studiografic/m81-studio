// Articol Technology & Experience #4 — așteptările de la experiențele digitale (RO + EN, mockup-uri proprii).
import { readFileSync } from "node:fs";
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const DIR = "/Users/m81studio/Desktop/Dosar Imagini articole/Ce așteaptă oamenii de la experiențele digitale moderne";

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

async function uploadFile(path, filename) {
  const buf = readFileSync(path);
  const up = await fetch(`${BASE}/assets/images/${DATASET}?filename=${filename}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/png" },
    body: buf,
  });
  const d = (await up.json()).document;
  if (!d?._id) throw new Error("upload failed: " + filename);
  console.log(`  ${filename}: ${d._id} (${d.metadata?.dimensions?.width}x${d.metadata?.dimensions?.height})`);
  return d._id;
}

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");

  const coverId = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780430557943_3604d51d.png`, "asteptari-cover-zilnic.png");
  const fig1 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780430792558_8ecb411a.png`, "asteptari-fig1-infohub.png");
  const fig2 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780430890031_bed13d39.png`, "asteptari-fig2-ecosistem.png");

  const capF1Ro = "Experiență digitală construită pentru claritate, orientare și acces rapid la informații.";
  const capF1En = "A digital experience built for clarity, orientation and fast access to information.";
  const capF2Ro = "Ecosistem digital modern care combină personalizarea, automatizarea și interacțiunile intuitive.";
  const capF2En = "A modern digital ecosystem that combines personalization, automation and intuitive interactions.";

  const bodyRo = [
    lead("Oamenii nu compară experiența ta cu cea a concurenței. O compară cu cele mai bune experiențe digitale pe care le folosesc în fiecare zi."),
    p("În fiecare zi interacționăm cu zeci de produse digitale."),
    p("Aplicații bancare. Magazine online. Platforme de streaming. Servicii de livrare. Instrumente de comunicare."),
    p("Fiecare dintre acestea contribuie la formarea unor așteptări."),
    p("Atunci când utilizatorii ajung pe website-ul unei companii sau folosesc o aplicație nouă, ei nu pornesc de la zero."),
    p("Vin deja cu un set de standarde construite de experiențele pe care le folosesc zilnic."),

    h2("Oamenii se așteaptă la claritate"),
    p("Una dintre cele mai importante schimbări este nevoia de claritate."),
    p("Utilizatorii nu vor să petreacă timp încercând să înțeleagă un sistem."),
    p("Vor să știe rapid:"),
    bullet("ce oferă compania"),
    bullet("cum funcționează serviciul"),
    bullet("care este următorul pas"),
    bullet("cum pot obține ajutor"),
    p("Experiențele digitale moderne reduc incertitudinea. Ele ghidează utilizatorul. Nu îl obligă să descopere singur totul."),

    figure(fig1, "Experiență digitală construită pentru claritate și orientare", capF1Ro, capF1En),

    h2("Viteza a devenit normalitate"),
    p("Utilizatorii sunt obișnuiți cu răspunsuri rapide. Cu procese rapide. Cu acces instant la informații."),
    p("Această schimbare influențează toate industriile. Nu doar tehnologia."),
    p("Atunci când o experiență digitală pare lentă, complicată sau dificil de utilizat, percepția asupra întregii organizații poate fi afectată."),
    p("De multe ori, oamenii asociază experiența digitală cu nivelul de organizare și profesionalism al companiei."),

    h2("Personalizarea devine tot mai importantă"),
    p("Experiențele identice pentru toți utilizatorii încep să fie mai puțin eficiente."),
    p("Oamenii apreciază sisteme care înțeleg contextul. Recomandări relevante. Conținut adaptat. Procese simplificate."),
    p("Nu pentru că vor mai multă tehnologie. Ci pentru că vor mai puțin efort."),
    p("Pe măsură ce inteligența artificială și automatizările devin mai accesibile, personalizarea începe să fie percepută ca o componentă naturală a experienței."),

    pullQuote("Utilizatorii nu caută experiențe mai complexe. Caută experiențe care necesită mai puțin efort."),

    h2("Experiența este parte din brand"),
    p("Mult timp, brandingul a fost asociat în principal cu identitatea vizuală."),
    p("Astăzi, experiența utilizatorului influențează la fel de mult percepția unui brand."),
    p("Un proces simplu. Un răspuns rapid. O interacțiune intuitivă."),
    p("Toate contribuie la încredere. Toate contribuie la memorabilitate."),
    p("În multe cazuri, experiența digitală devine una dintre cele mai importante expresii ale brandului."),

    callout("De reținut", ""),
    bullet("utilizatorii se așteaptă la claritate și simplitate"),
    bullet("viteza influențează percepția profesionalismului"),
    bullet("personalizarea devine tot mai importantă"),
    bullet("experiențele bune reduc efortul utilizatorului"),
    bullet("experiența digitală contribuie direct la imaginea brandului"),

    figure(fig2, "Ecosistem digital modern — personalizare, automatizare și interacțiuni intuitive", capF2Ro, capF2En),

    h2("Ce urmează"),
    p("Pe măsură ce tehnologia continuă să evolueze, așteptările utilizatorilor vor continua să crească."),
    p("Companiile nu vor fi evaluate doar prin serviciile pe care le oferă. Vor fi evaluate și prin experiența pe care o construiesc în jurul acestora."),
    p("Organizațiile care înțeleg această schimbare au oportunitatea de a transforma tehnologia într-un avantaj competitiv real."),

    statement("Experiența devine standard", "Experiențele digitale moderne nu sunt definite de funcționalități spectaculoase, ci de capacitatea lor de a fi clare, rapide și ușor de utilizat. Pe măsură ce așteptările utilizatorilor cresc, experiența devine unul dintre cei mai importanți factori în modul în care oamenii percep și aleg un brand."),
  ];

  const bodyEn = [
    lead("People don't compare your experience with the competition's. They compare it with the best digital experiences they use every day."),
    p("Every day we interact with dozens of digital products."),
    p("Banking apps. Online stores. Streaming platforms. Delivery services. Communication tools."),
    p("Each of these contributes to forming expectations."),
    p("When users land on a company's website or use a new app, they don't start from scratch."),
    p("They already come with a set of standards built by the experiences they use every day."),

    h2("People expect clarity"),
    p("One of the most important shifts is the need for clarity."),
    p("Users don't want to spend time trying to understand a system."),
    p("They want to quickly know:"),
    bullet("what the company offers"),
    bullet("how the service works"),
    bullet("what the next step is"),
    bullet("how they can get help"),
    p("Modern digital experiences reduce uncertainty. They guide the user. They don't force them to figure out everything on their own."),

    figure(fig1, "A digital experience built for clarity and orientation", capF1Ro, capF1En),

    h2("Speed has become the norm"),
    p("Users are used to fast answers. To fast processes. To instant access to information."),
    p("This shift influences every industry. Not just technology."),
    p("When a digital experience feels slow, complicated or hard to use, the perception of the entire organization can be affected."),
    p("People often associate the digital experience with the company's level of organization and professionalism."),

    h2("Personalization is becoming increasingly important"),
    p("Identical experiences for all users are starting to be less effective."),
    p("People appreciate systems that understand context. Relevant recommendations. Adapted content. Simplified processes."),
    p("Not because they want more technology. But because they want less effort."),
    p("As artificial intelligence and automations become more accessible, personalization starts to be perceived as a natural component of the experience."),

    pullQuote("Users aren't looking for more complex experiences. They're looking for experiences that require less effort."),

    h2("Experience is part of the brand"),
    p("For a long time, branding was associated mainly with visual identity."),
    p("Today, user experience influences the perception of a brand just as much."),
    p("A simple process. A fast answer. An intuitive interaction."),
    p("They all contribute to trust. They all contribute to memorability."),
    p("In many cases, the digital experience becomes one of the most important expressions of the brand."),

    callout("Worth keeping in mind", ""),
    bullet("users expect clarity and simplicity"),
    bullet("speed influences the perception of professionalism"),
    bullet("personalization is becoming increasingly important"),
    bullet("good experiences reduce the user's effort"),
    bullet("the digital experience directly shapes the brand's image"),

    figure(fig2, "A modern digital ecosystem — personalization, automation and intuitive interactions", capF2Ro, capF2En),

    h2("What comes next"),
    p("As technology continues to evolve, user expectations will keep rising."),
    p("Companies won't be judged only by the services they offer. They'll also be judged by the experience they build around them."),
    p("Organizations that understand this shift have the opportunity to turn technology into a real competitive advantage."),

    statement("Experience becomes the standard", "Modern digital experiences aren't defined by spectacular features, but by their ability to be clear, fast and easy to use. As user expectations rise, experience becomes one of the most important factors in how people perceive and choose a brand."),
  ];

  const doc = {
    _type: "article",
    category: "technology",
    slug: { _type: "slug", current: "ce-asteapta-oamenii-de-la-experientele-digitale-moderne" },
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: false,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Oameni folosind servicii digitale moderne în viața de zi cu zi" },
    topics: ["Experiență digitală", "UX", "Tehnologie"],
    titleRo: "Ce așteaptă oamenii de la experiențele digitale moderne",
    subtitleRo: "Pe măsură ce tehnologia evoluează, utilizatorii nu mai caută doar informații. Ei caută experiențe simple, rapide și relevante.",
    excerptRo: "Utilizatorii nu mai compară experiența ta cu a concurenței, ci cu cele mai bune produse digitale pe care le folosesc zilnic. Claritatea, viteza și personalizarea devin standardul.",
    bodyRo,
    titleEn: "What people expect from modern digital experiences",
    subtitleEn: "As technology evolves, users no longer look just for information. They look for experiences that are simple, fast and relevant.",
    excerptEn: "Users no longer compare your experience with the competition, but with the best digital products they use every day. Clarity, speed and personalization become the standard.",
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
