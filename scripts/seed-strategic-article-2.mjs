// Articol Strategic Insights #2 — de ce oamenii nu cumpără cel mai bun produs (RO + EN).
import { readFileSync } from "node:fs";
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const DIR = "/Users/m81studio/Desktop/Imagini articole/De ce oamenii nu cumpără întotdeauna cel mai bun produs";

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

  const coverId = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780432825226_df3d329b.png`, "nucumpara-cover-comparatie.png");
  const fig1 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780432895458_00ae403c.png`, "nucumpara-fig1-pozitionare.png");
  const fig2 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780433073357_92072ab7.png`, "nucumpara-fig2-analiza.png");

  const capF1Ro = "Decizia dintre produse similare este influențată de modul în care acestea sunt prezentate și percepute.";
  const capF1En = "The decision between similar products is influenced by how they are presented and perceived.";
  const capF2Ro = "Brandingul, experiența și încrederea influențează modul în care oamenii aleg între mai multe opțiuni.";
  const capF2En = "Branding, experience and trust influence how people choose between several options.";

  const bodyRo = [
    lead("Mulți antreprenori pornesc de la o presupunere simplă: dacă produsul este mai bun, oamenii îl vor alege."),
    p("În realitate, piața funcționează diferit."),
    p("Istoria este plină de exemple în care produse excelente au rămas aproape necunoscute, în timp ce alternative mai puțin performante au devenit lideri de piață."),
    p("Diferența nu a fost întotdeauna produsul. De multe ori, diferența a fost percepția."),
    p("Calitatea este importantă. Dar înainte ca oamenii să poată aprecia calitatea, trebuie să înțeleagă valoarea."),

    h2("Oamenii nu cumpără ceea ce nu înțeleg"),
    p("Înainte să compare caracteristici, beneficii sau performanțe, oamenii încearcă să răspundă la câteva întrebări simple."),
    p("Ce este acest produs? Pentru cine este? Cum mă ajută? De ce este diferit?"),
    p("Dacă răspunsurile nu sunt evidente, produsul pornește cu un dezavantaj. Indiferent cât de bun este."),
    p("Pentru majoritatea oamenilor, claritatea apare înaintea evaluării. Înțelegerea precede aprecierea."),

    figure(fig1, "Comparație de poziționare și prezentare între produse similare", capF1Ro, capF1En),

    h2("Încrederea influențează decizia"),
    p("Atunci când aleg între mai multe opțiuni, oamenii încearcă să reducă riscul. Caută semnale care îi ajută să ia o decizie mai sigură."),
    p("Recenzii. Recomandări. Experiențe anterioare. Branduri cunoscute. Prezență profesională."),
    p("Toate acestea contribuie la construirea încrederii."),
    p("În multe situații, produsul perceput ca fiind mai sigur este ales înaintea celui perceput ca fiind mai performant."),
    p("Nu pentru că este neapărat mai bun. Ci pentru că pare o alegere mai sigură."),

    h2("Percepția face parte din valoare"),
    p("Calitatea unui produs există indiferent dacă este observată sau nu."),
    p("Percepția însă influențează modul în care oamenii interpretează această calitate."),
    p("Brandingul. Comunicarea. Website-ul. Ambalajul. Experiența."),
    p("Toate contribuie la modul în care valoarea este înțeleasă."),
    p("Un produs excelent prezentat neclar poate părea obișnuit. Un produs bine poziționat poate fi perceput ca fiind mai valoros înainte ca utilizatorul să îl experimenteze."),

    pullQuote("Un produs excelent nu creează automat înțelegere. Oamenii trebuie să înțeleagă valoarea înainte să o poată aprecia."),

    h2("Ce observăm frecvent"),
    p("În multe industrii întâlnim afaceri care oferă produse și servicii foarte bune, dar care întâmpină dificultăți în a comunica această valoare."),
    p("Problema nu este întotdeauna produsul. Problema este modul în care produsul este perceput."),

    callout("De reținut", ""),
    bullet("claritatea influențează percepția valorii"),
    bullet("încrederea reduce riscul perceput"),
    bullet("diferențierea ajută oamenii să aleagă mai ușor"),
    bullet("brandingul contribuie la modul în care este interpretată calitatea"),
    bullet("experiența utilizatorului influențează decizia"),
    bullet("consistența consolidează credibilitatea"),

    figure(fig2, "Analiză de produs — branding, experiență și încredere în decizia de cumpărare", capF2Ro, capF2En),

    h2("Ce înseamnă asta pentru afaceri"),
    p("Investiția într-un produs mai bun rămâne esențială."),
    p("Însă performanța produsului și percepția produsului sunt două lucruri diferite."),
    p("Pentru ca valoarea să fie recunoscută, ea trebuie să fie și înțeleasă."),
    p("Afacerile care reușesc să comunice clar ceea ce le face relevante au șanse mai mari să transforme atenția în încredere și încrederea în decizie."),
    p("În piețele aglomerate, diferența dintre succes și anonimat nu este întotdeauna produsul. De multe ori este modul în care valoarea acestuia este percepută."),

    statement("Percepția influențează alegerea", "Oamenii nu aleg întotdeauna cel mai bun produs din punct de vedere tehnic. În multe situații, aleg produsul pe care îl înțeleg mai repede, în care au mai multă încredere și a cărui valoare este comunicată mai clar."),
  ];

  const bodyEn = [
    lead("Many entrepreneurs start from a simple assumption: if the product is better, people will choose it."),
    p("In reality, the market works differently."),
    p("History is full of examples where excellent products remained almost unknown, while less capable alternatives became market leaders."),
    p("The difference wasn't always the product. Often, the difference was perception."),
    p("Quality matters. But before people can appreciate quality, they have to understand value."),

    h2("People don't buy what they don't understand"),
    p("Before comparing features, benefits or performance, people try to answer a few simple questions."),
    p("What is this product? Who is it for? How does it help me? Why is it different?"),
    p("If the answers aren't obvious, the product starts at a disadvantage. No matter how good it is."),
    p("For most people, clarity comes before evaluation. Understanding precedes appreciation."),

    figure(fig1, "A comparison of positioning and presentation between similar products", capF1Ro, capF1En),

    h2("Trust influences the decision"),
    p("When choosing between several options, people try to reduce risk. They look for signals that help them make a safer decision."),
    p("Reviews. Recommendations. Past experiences. Familiar brands. A professional presence."),
    p("All of these contribute to building trust."),
    p("In many situations, the product perceived as safer is chosen over the one perceived as higher-performing."),
    p("Not because it's necessarily better. But because it seems like a safer choice."),

    h2("Perception is part of value"),
    p("A product's quality exists whether it's noticed or not."),
    p("Perception, however, influences how people interpret that quality."),
    p("Branding. Communication. The website. The packaging. The experience."),
    p("They all contribute to how value is understood."),
    p("An excellent product presented unclearly can look ordinary. A well-positioned product can be perceived as more valuable before the user even experiences it."),

    pullQuote("An excellent product doesn't automatically create understanding. People have to understand the value before they can appreciate it."),

    h2("What we frequently observe"),
    p("In many industries we meet businesses that offer very good products and services, but struggle to communicate that value."),
    p("The problem isn't always the product. The problem is how the product is perceived."),

    callout("Worth keeping in mind", ""),
    bullet("clarity influences the perception of value"),
    bullet("trust reduces perceived risk"),
    bullet("differentiation helps people choose more easily"),
    bullet("branding contributes to how quality is interpreted"),
    bullet("user experience influences the decision"),
    bullet("consistency strengthens credibility"),

    figure(fig2, "A product analysis — branding, experience and trust in the purchase decision", capF2Ro, capF2En),

    h2("What this means for businesses"),
    p("Investing in a better product remains essential."),
    p("But a product's performance and a product's perception are two different things."),
    p("For value to be recognized, it also has to be understood."),
    p("Businesses that manage to clearly communicate what makes them relevant have a better chance of turning attention into trust and trust into a decision."),
    p("In crowded markets, the difference between success and anonymity isn't always the product. Often it's how its value is perceived."),

    statement("Perception influences the choice", "People don't always choose the technically best product. In many situations, they choose the product they understand faster, trust more and whose value is communicated more clearly."),
  ];

  const doc = {
    _type: "article",
    category: "strategic",
    slug: { _type: "slug", current: "de-ce-oamenii-nu-cumpara-intotdeauna-cel-mai-bun-produs" },
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: false,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Persoană comparând mai multe produse înainte de a alege" },
    topics: ["Branding", "Percepție", "Decizie de cumpărare"],
    takeawaysRo: [
      "Calitatea nu garantează alegerea.",
      "Claritatea influențează percepția valorii.",
      "Încrederea reduce riscul perceput.",
      "Brandingul contribuie la decizia de cumpărare.",
      "Oamenii aleg ceea ce înțeleg mai ușor.",
    ],
    takeawaysEn: [
      "Quality doesn't guarantee the choice.",
      "Clarity influences the perception of value.",
      "Trust reduces perceived risk.",
      "Branding contributes to the purchase decision.",
      "People choose what they understand more easily.",
    ],
    titleRo: "De ce oamenii nu cumpără întotdeauna cel mai bun produs",
    subtitleRo: "În multe situații, deciziile de cumpărare sunt influențate nu doar de calitate, ci și de percepție, încredere și claritate.",
    excerptRo: "Oamenii nu aleg întotdeauna cel mai bun produs din punct de vedere tehnic. Aleg produsul pe care îl înțeleg mai repede, în care au încredere și a cărui valoare este comunicată mai clar.",
    bodyRo,
    titleEn: "Why people don't always buy the best product",
    subtitleEn: "In many situations, purchasing decisions are influenced not only by quality, but also by perception, trust and clarity.",
    excerptEn: "People don't always choose the technically best product. They choose the one they understand faster, trust more and whose value is communicated more clearly.",
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
