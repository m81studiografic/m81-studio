// Articol Design critique — Hiper Ambrozia (RO + EN, cover + 2 imagini placeholder).
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
const metric = (value, labelRo, labelEn) => ({ _type: "metric", _key: k(), value, labelRo, labelEn });

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

  // PLACEHOLDERE — de înlocuit cu screenshot-uri / foto reale Hiper Ambrozia
  const coverId = await upload("https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=2520&q=80", "hiper-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=2000&q=80", "hiper-fig1.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=2000&q=80", "hiper-fig2.jpg");

  const bodyRo = [
    lead("Atunci când analizăm un brand, încercăm să ignorăm ceea ce știm despre companie."),
    p("Nu ne interesează istoricul. Nu ne interesează distribuția. Nu ne interesează produsele."),
    p("Privim doar ceea ce vede un utilizator care ajunge pentru prima dată pe website."),
    p("În cazul Hiper Ambrozia, prima impresie este una de confuzie."),
    p("Este dificil să înțelegi rapid cine este brandul, ce îl diferențiază și de ce ar trebui să îl alegi."),
    p("Aceasta devine observația centrală a întregii analize."),

    h2("Prima impresie"),
    p("În primele secunde, website-ul transmite câteva lucruri generale."),
    p("Natură. Produse sănătoase. Magazin online. Ingrediente alternative."),
    p("Însă nu transmite suficient de clar ce reprezintă brandul."),
    p("Nu există un mesaj central puternic. Nu există o promisiune clară. Nu există o poziționare care să poată fi înțeleasă imediat."),
    p("Pentru un utilizator nou, experiența începe cu întrebări, nu cu răspunsuri."),

    figure(fig1, "Pagina principală a unui brand alimentar și elementele percepute în primele secunde", "Pagina principală a unui brand alimentar și elementele percepute în primele secunde de navigare.", "The homepage of a food brand and the elements perceived in the first seconds of browsing."),

    h2("Naming și identitate"),
    p("Numele Hiper Ambrozia ridică o provocare interesantă."),
    p("Nu explică categoria. Nu sugerează produsul. Nu indică foarte clar domeniul în care activează brandul."),
    p("Utilizatorul trebuie să descopere singur contextul."),
    p("Acest lucru nu este neapărat o problemă atunci când identitatea vizuală și comunicarea completează povestea."),
    p("În cazul de față însă, brandingul nu oferă suficiente indicii pentru a construi rapid înțelegerea."),
    p("Logo-ul și limbajul vizual par inspirate din estetica magazinelor naturiste tradiționale."),
    p("Rezultatul este o identitate care pare familiară, dar greu de diferențiat."),

    h2("Packaging și coerență"),
    p("Una dintre cele mai importante observații este lipsa unui sistem vizual unitar."),
    p("Privite împreună, produsele nu creează întotdeauna impresia unei familii de brand."),
    p("Există diferențe de stil. Diferențe de ierarhie. Diferențe de prezentare."),
    p("Acest lucru reduce recunoașterea și consistența."),
    p("În brandingul alimentar, packagingul este adesea cel mai important punct de contact."),
    p("Atunci când sistemul nu este clar, brandul pierde o parte din forța sa de memorare."),

    pullQuote("Un brand puternic nu obligă utilizatorul să descopere singur cine este. Îi spune clar din primele secunde."),

    h2("Website și experiență digitală"),
    p("Website-ul pare construit într-o logică funcțională."),
    p("Există produse. Există informații. Există categorii. Există posibilitatea de cumpărare."),
    p("Însă experiența este limitată aproape exclusiv la aceste funcții."),
    p("Lipsește ritmul. Lipsește atmosfera. Lipsește povestea. Lipsește sentimentul că utilizatorul intră într-un univers de brand."),
    p("Experiența seamănă mai mult cu un catalog online decât cu o experiență construită în jurul unui brand alimentar contemporan."),

    callout("Probleme observate", ""),
    bullet("poziționare dificil de înțeles"),
    bullet("identitate vizuală insuficient diferențiată"),
    bullet("packaging fără sistem clar"),
    bullet("website construit în jurul funcționalității, nu al experienței"),
    bullet("lipsă de storytelling și univers de brand"),

    figure(fig2, "Elemente vizuale și produse de brand — context pentru analiză", "Elemente vizuale și produse de brand — context pentru analiză.", "Brand visual elements and products — context for the analysis."),

    h2("Ce înseamnă asta"),
    p("Analiza sugerează că principala provocare a Hiper Ambrozia nu este una tehnică."),
    p("Nu este nici măcar una de website."),
    p("Problema pare să fie lipsa unui sistem de brand coerent care să lege toate elementele împreună."),
    p("Naming. Identitate. Packaging. Comunicare. Experiență digitală."),
    p("În prezent, acestea funcționează mai degrabă separat decât ca parte a aceluiași ecosistem."),

    statement("Evaluare generală", "Cea mai mare provocare identificată în cazul Hiper Ambrozia este lipsa unei relații clare între branding, packaging și experiența digitală. Analiza sugerează că oportunitatea principală nu este modernizarea unui website, ci construirea unui sistem de brand coerent care să comunice mai clar identitatea, diferențierea și valoarea percepută a companiei."),
  ];

  const bodyEn = [
    lead("When we analyze a brand, we try to ignore what we know about the company."),
    p("We're not interested in the history. We're not interested in the distribution. We're not interested in the products."),
    p("We look only at what a user sees when they land on the website for the first time."),
    p("In the case of Hiper Ambrozia, the first impression is one of confusion."),
    p("It's hard to quickly understand who the brand is, what sets it apart and why you should choose it."),
    p("This becomes the central observation of the entire analysis."),

    h2("First impression"),
    p("In the first seconds, the website conveys a few general things."),
    p("Nature. Healthy products. Online store. Alternative ingredients."),
    p("But it doesn't convey clearly enough what the brand stands for."),
    p("There's no strong central message. There's no clear promise. There's no positioning that can be understood immediately."),
    p("For a new user, the experience begins with questions, not answers."),

    figure(fig1, "The homepage of a food brand and the elements perceived in the first seconds", "Pagina principală a unui brand alimentar și elementele percepute în primele secunde de navigare.", "The homepage of a food brand and the elements perceived in the first seconds of browsing."),

    h2("Naming and identity"),
    p("The name Hiper Ambrozia raises an interesting challenge."),
    p("It doesn't explain the category. It doesn't suggest the product. It doesn't clearly indicate the field the brand operates in."),
    p("The user has to discover the context on their own."),
    p("This isn't necessarily a problem when the visual identity and communication complete the story."),
    p("In this case, however, the branding doesn't offer enough clues to build understanding quickly."),
    p("The logo and visual language seem inspired by the aesthetic of traditional health-food stores."),
    p("The result is an identity that feels familiar but hard to differentiate."),

    h2("Packaging and coherence"),
    p("One of the most important observations is the lack of a unified visual system."),
    p("Seen together, the products don't always create the impression of a brand family."),
    p("There are differences in style. Differences in hierarchy. Differences in presentation."),
    p("This reduces recognition and consistency."),
    p("In food branding, packaging is often the most important touchpoint."),
    p("When the system isn't clear, the brand loses part of its memorability."),

    pullQuote("A strong brand doesn't force the user to figure out who it is on their own. It tells them clearly from the first seconds."),

    h2("Website and digital experience"),
    p("The website seems built on functional logic."),
    p("There are products. There's information. There are categories. There's the possibility to buy."),
    p("But the experience is limited almost exclusively to these functions."),
    p("It lacks rhythm. It lacks atmosphere. It lacks story. It lacks the feeling that the user is entering a brand universe."),
    p("The experience resembles an online catalog more than an experience built around a contemporary food brand."),

    callout("Problems observed", ""),
    bullet("positioning that's hard to understand"),
    bullet("an insufficiently differentiated visual identity"),
    bullet("packaging without a clear system"),
    bullet("a website built around functionality, not experience"),
    bullet("a lack of storytelling and brand universe"),

    figure(fig2, "Brand visual elements and products — context for the analysis", "Elemente vizuale și produse de brand — context pentru analiză.", "Brand visual elements and products — context for the analysis."),

    h2("What this means"),
    p("The analysis suggests that Hiper Ambrozia's main challenge isn't a technical one."),
    p("It isn't even a website one."),
    p("The problem seems to be the lack of a coherent brand system that ties all the elements together."),
    p("Naming. Identity. Packaging. Communication. Digital experience."),
    p("Right now, these work separately rather than as part of the same ecosystem."),

    statement("Overall assessment", "The biggest challenge identified in the case of Hiper Ambrozia is the lack of a clear relationship between branding, packaging and digital experience. The analysis suggests that the main opportunity isn't modernizing a website, but building a coherent brand system that communicates the company's identity, differentiation and perceived value more clearly."),
  ];

  const doc = {
    _type: "article",
    category: "case",
    slug: { _type: "slug", current: "hiper-ambrozia-cand-brandul-nu-comunica-valoarea-produsului" },
    publishedAt: new Date().toISOString(),
    readTime: 7,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Hiper Ambrozia — analiză de branding, packaging și experiență digitală",
    },
    topics: ["Design critique", "Branding", "Packaging"],
    caseClient: "Hiper Ambrozia",
    caseTimeline: "2026",
    caseServices: ["Branding", "Identitate vizuală", "Packaging", "Website", "Experiență digitală"],
    metrics: [
      metric("3/10", "Naming", "Naming"),
      metric("2/10", "Logo", "Logo"),
      metric("2/10", "Website", "Website"),
      metric("2/10", "UX", "UX"),
      metric("1.5/10", "Diferențiere", "Differentiation"),
      metric("2/10", "Valoare percepută", "Perceived value"),
    ],
    titleRo: "Hiper Ambrozia: când brandul nu reușește să comunice valoarea produsului",
    subtitleRo: "O analiză a modului în care brandingul, packagingul și experiența digitală influențează percepția unui brand alimentar în primele momente de contact.",
    excerptRo: "Prima impresie este esențială pentru orice brand alimentar. În cazul Hiper Ambrozia, analiza evidențiază un decalaj important între ceea ce percepe utilizatorul și valoarea pe care brandul încearcă să o transmită.",
    bodyRo,
    titleEn: "Hiper Ambrozia: when the brand fails to communicate the product's value",
    subtitleEn: "An analysis of how branding, packaging and digital experience shape the perception of a food brand in the first moments of contact.",
    excerptEn: "First impressions are essential for any food brand. In the case of Hiper Ambrozia, the analysis reveals a significant gap between what the user perceives and the value the brand is trying to convey.",
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
