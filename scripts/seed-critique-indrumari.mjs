// Articol Design critique — Indrumări Juridice (RO + EN, screenshot-uri reale).
import { readFileSync } from "node:fs";
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

  const coverId = await uploadFile("/tmp/ij_cover.png", "indrumari-cover.png");
  const fig1 = await uploadFile("/tmp/ij_fig1c.png", "indrumari-fig1-noutati.png");
  const fig2 = await uploadFile("/tmp/ij_fig2.png", "indrumari-fig2-servicii.png");

  const capF1Ro = "Pagina principală și structura informațională a platformei Indrumări Juridice.";
  const capF1En = "The homepage and information structure of the Indrumări Juridice platform.";
  const capF2Ro = "Articole, servicii și conținut juridic integrate într-un ecosistem digital complex.";
  const capF2En = "Articles, services and legal content integrated into a complex digital ecosystem.";

  const bodyRo = [
    lead("Puține organizații juridice din România au construit o prezență digitală la fel de vizibilă precum Indrumări Juridice."),
    p("Platforma reunește sute de articole, numeroase servicii și un volum impresionant de informații juridice."),
    p("Prima impresie este puternică. Există activitate. Există expertiză. Există experiență. Există autoritate."),
    p("În același timp, analiza relevă o întrebare importantă: cum poate fi păstrată claritatea atunci când ecosistemul digital devine atât de extins?"),

    h2("Prima impresie"),
    p("Website-ul transmite imediat ideea unei organizații active și foarte prezente în mediul online."),
    p("Utilizatorul este întâmpinat de articole, servicii, noutăți și multiple puncte de acces către informație."),
    p("Această abordare creează senzația de autoritate și expertiză."),
    p("Totuși, după primele momente, apare o provocare. Multe elemente concurează simultan pentru atenția utilizatorului."),
    p("Pentru cineva care descoperă platforma pentru prima dată, identificarea informațiilor esențiale necesită mai mult efort decât ar trebui."),

    figure(fig1, "Pagina principală Indrumări Juridice — structura informațională", capF1Ro, capF1En),

    h2("Claritatea mesajului"),
    p("Una dintre cele mai interesante observații este existența mai multor identități care coexistă în același ecosistem."),
    p("Indrumări Juridice. Cuculis & Asociații. Platforma de conținut. Prezența publică a fondatorului. Firma de avocatură."),
    p("Toate funcționează împreună. Însă relația dintre ele nu este întotdeauna evidentă pentru un utilizator nou."),
    p("Rezultatul este o identitate puternică, dar uneori dificil de înțeles la prima vedere."),

    h2("Experiența utilizatorului"),
    p("Experiența este construită în jurul accesului la informație. Din această perspectivă, platforma performează foarte bine."),
    p("Conținutul este abundent. Subiectele sunt numeroase. Punctele de contact sunt ușor de găsit."),
    p("Provocarea apare însă la nivelul organizării. Pentru utilizatorii care caută răspunsuri rapide, experiența poate deveni copleșitoare."),
    p("Multe categorii. Multe articole. Multe servicii. Multe opțiuni."),
    p("Volumul informației începe să influențeze claritatea experienței."),

    pullQuote("Problema nu este lipsa informației. Problema este cât de ușor poate fi găsită informația relevantă."),

    h2("Branding și identitate"),
    p("Indrumări Juridice beneficiază de un avantaj pe care multe firme de avocatură îl caută ani întregi."),
    p("Vizibilitate. Autoritate. Recunoaștere."),
    p("Problema principală nu este notorietatea. Problema este coerența."),
    p("Brandul pare construit în jurul mai multor centre de greutate care funcționează simultan."),
    p("Acest lucru creează oportunitatea unei identități mai clare și mai ușor de memorat."),

    callout("Puncte forte", ""),
    bullet("autoritate ridicată"),
    bullet("strategie de conținut foarte puternică"),
    bullet("vizibilitate organică excelentă"),
    bullet("accesibilitate pentru publicul larg"),
    bullet("prezență digitală extinsă"),

    callout("Oportunități", ""),
    bullet("simplificarea experienței utilizatorului"),
    bullet("structură informațională mai clară"),
    bullet("consolidarea identității de brand"),
    bullet("prioritizarea informațiilor"),
    bullet("diferențiere prin experiență, nu doar prin volum"),

    figure(fig2, "Sidebar de servicii și conținut juridic — ecosistem digital complex", capF2Ro, capF2En),

    h2("Ce înseamnă asta"),
    p("Majoritatea firmelor de avocatură încearcă să obțină mai multă vizibilitate. Indrumări Juridice a depășit deja această etapă."),
    p("Provocarea următoarei faze de evoluție nu pare să fie producerea unui volum și mai mare de conținut."),
    p("Provocarea este transformarea unui ecosistem complex într-o experiență mai clară și mai intuitivă."),
    p("Pe măsură ce așteptările utilizatorilor continuă să crească, experiența și claritatea pot deveni la fel de importante precum autoritatea."),

    statement("Evaluare generală", "Indrumări Juridice reprezintă unul dintre cele mai puternice ecosisteme de conținut juridic din România. Principala oportunitate identificată nu este creșterea vizibilității, ci transformarea acestei autorități într-o experiență digitală mai clară, mai coerentă și mai ușor de parcurs pentru utilizatori."),
  ];

  const bodyEn = [
    lead("Few legal organizations in Romania have built a digital presence as visible as Indrumări Juridice."),
    p("The platform brings together hundreds of articles, numerous services and an impressive volume of legal information."),
    p("The first impression is strong. There's activity. There's expertise. There's experience. There's authority."),
    p("At the same time, the analysis raises an important question: how can clarity be preserved when the digital ecosystem becomes this large?"),

    h2("First impression"),
    p("The website immediately conveys the idea of an active organization with a strong online presence."),
    p("The user is greeted by articles, services, news and multiple points of access to information."),
    p("This approach creates a sense of authority and expertise."),
    p("Still, after the first moments, a challenge appears. Many elements compete for the user's attention at once."),
    p("For someone discovering the platform for the first time, identifying the essential information takes more effort than it should."),

    figure(fig1, "The Indrumări Juridice homepage — information structure", capF1Ro, capF1En),

    h2("Message clarity"),
    p("One of the most interesting observations is the existence of several identities coexisting within the same ecosystem."),
    p("Indrumări Juridice. Cuculis & Asociații. The content platform. The founder's public presence. The law firm."),
    p("They all work together. But the relationship between them isn't always obvious to a new user."),
    p("The result is a strong identity that's sometimes hard to grasp at first glance."),

    h2("User experience"),
    p("The experience is built around access to information. From this perspective, the platform performs very well."),
    p("The content is abundant. The topics are numerous. The contact points are easy to find."),
    p("The challenge, however, appears at the level of organization. For users looking for quick answers, the experience can become overwhelming."),
    p("Many categories. Many articles. Many services. Many options."),
    p("The volume of information starts to affect the clarity of the experience."),

    pullQuote("The problem isn't the lack of information. The problem is how easily the relevant information can be found."),

    h2("Branding and identity"),
    p("Indrumări Juridice enjoys an advantage that many law firms seek for years."),
    p("Visibility. Authority. Recognition."),
    p("The main problem isn't fame. The problem is coherence."),
    p("The brand seems built around several centers of gravity operating at the same time."),
    p("This creates the opportunity for a clearer, more memorable identity."),

    callout("Strengths", ""),
    bullet("high authority"),
    bullet("a very strong content strategy"),
    bullet("excellent organic visibility"),
    bullet("accessibility for the general public"),
    bullet("an extensive digital presence"),

    callout("Opportunities", ""),
    bullet("simplifying the user experience"),
    bullet("a clearer information structure"),
    bullet("consolidating the brand identity"),
    bullet("prioritizing information"),
    bullet("differentiation through experience, not just volume"),

    figure(fig2, "A services sidebar and legal content — a complex digital ecosystem", capF2Ro, capF2En),

    h2("What this means"),
    p("Most law firms try to gain more visibility. Indrumări Juridice has already moved past this stage."),
    p("The challenge of the next stage of evolution doesn't seem to be producing an even larger volume of content."),
    p("The challenge is transforming a complex ecosystem into a clearer, more intuitive experience."),
    p("As user expectations keep rising, experience and clarity can become as important as authority."),

    statement("Overall assessment", "Indrumări Juridice is one of the strongest legal content ecosystems in Romania. The main opportunity identified isn't increasing visibility, but transforming this authority into a clearer, more coherent and easier-to-navigate digital experience."),
  ];

  const doc = {
    _type: "article",
    category: "case",
    slug: { _type: "slug", current: "indrumari-juridice-intre-autoritate-si-complexitate" },
    publishedAt: new Date().toISOString(),
    readTime: 7,
    featured: false,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Indrumări Juridice — pagina principală (hero) a website-ului" },
    topics: ["Design critique", "Avocatură", "UX"],
    caseClient: "Indrumări Juridice / Cuculis & Asociații",
    caseTimeline: "2026",
    caseServices: ["Branding", "UX", "Comunicare digitală", "Arhitectură informațională"],
    metrics: [
      metric("9/10", "Autoritate", "Authority"),
      metric("9/10", "Vizibilitate digitală", "Digital visibility"),
      metric("9/10", "Strategie de conținut", "Content strategy"),
      metric("5/10", "Claritate", "Clarity"),
      metric("5/10", "Experiența utilizatorului", "User experience"),
      metric("4/10", "Arhitectură informațională", "Information architecture"),
    ],
    titleRo: "Indrumări Juridice: între autoritate și complexitate",
    subtitleRo: "O analiză a modului în care un ecosistem juridic construit în jurul conținutului generează autoritate și vizibilitate, dar ridică și provocări de claritate pentru utilizatori.",
    excerptRo: "Indrumări Juridice beneficiază de una dintre cele mai puternice prezențe digitale din industria juridică românească. Analiza evidențiază relația dintre autoritate, volum de conținut și experiența utilizatorului.",
    bodyRo,
    titleEn: "Indrumări Juridice: between authority and complexity",
    subtitleEn: "An analysis of how a content-driven legal ecosystem generates authority and visibility — while also raising clarity challenges for users.",
    excerptEn: "Indrumări Juridice has one of the strongest digital presences in the Romanian legal industry. The analysis explores the relationship between authority, content volume and user experience.",
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
