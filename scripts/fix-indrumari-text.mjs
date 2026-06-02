// Corectează corpul articolului Indrumări Juridice: distincție clară website vs firmă.
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const ID = "N4SbQ8230skgGtiVXXriIg";
const FIG1 = "image-25a3ad8b87ef21dc3d88284b19b77110573b05d9-1280x1050-png";
const FIG2 = "image-3809f6644feab6f13b6b26b3d8d495042215b98c-1280x1150-png";

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

const capF1Ro = "Pagina principală și structura informațională a website-ului Indrumări Juridice.";
const capF1En = "The homepage and information structure of the Indrumări Juridice website.";
const capF2Ro = "Articole, servicii și conținut juridic integrate într-un ecosistem digital complex.";
const capF2En = "Articles, services and legal content integrated into a complex digital ecosystem.";

const bodyRo = [
  lead("Puține firme de avocatură din România au o prezență digitală la fel de vizibilă precum Indrumări Juridice — platforma de conținut din spatele căreia se află firma Cuculis și Asociații."),
  p("Website-ul (indrumari-juridice.eu și indrumari-juridice.ro) reunește sute de articole, numeroase servicii și un volum impresionant de informații juridice."),
  p("Prima impresie este puternică. Există activitate. Există expertiză. Există experiență. Există autoritate."),
  p("În același timp, analiza relevă o întrebare importantă: cum poate fi păstrată claritatea atunci când ecosistemul digital devine atât de extins?"),

  h2("Prima impresie"),
  p("Website-ul transmite imediat ideea unei firme active și foarte prezente în mediul online."),
  p("Utilizatorul este întâmpinat de articole, servicii, noutăți și multiple puncte de acces către informație."),
  p("Această abordare creează senzația de autoritate și expertiză."),
  p("Totuși, după primele momente, apare o provocare. Multe elemente concurează simultan pentru atenția utilizatorului."),
  p("Pentru cineva care descoperă platforma pentru prima dată, identificarea informațiilor esențiale necesită mai mult efort decât ar trebui."),

  figure(FIG1, "Pagina principală a website-ului Indrumări Juridice — structura informațională", capF1Ro, capF1En),

  h2("Claritatea mesajului"),
  p("Una dintre cele mai interesante observații este existența mai multor identități care coexistă în același ecosistem."),
  p("Website-ul Indrumări Juridice (indrumari-juridice.eu și indrumari-juridice.ro). Firma de avocatură Cuculis și Asociații. Platforma de conținut. Prezența publică a fondatorului."),
  p("Toate funcționează împreună. Însă, pentru un vizitator nou, nu este imediat clar dacă „Indrumări Juridice” este website-ul, brandul sau firma — în timp ce „Cuculis și Asociații” apare ca un nume separat."),
  p("Rezultatul este o identitate puternică, dar uneori dificil de înțeles la prima vedere."),

  h2("Experiența utilizatorului"),
  p("Experiența este construită în jurul accesului la informație. Din această perspectivă, website-ul performează foarte bine."),
  p("Conținutul este abundent. Subiectele sunt numeroase. Punctele de contact sunt ușor de găsit."),
  p("Provocarea apare însă la nivelul organizării. Pentru utilizatorii care caută răspunsuri rapide, experiența poate deveni copleșitoare."),
  p("Multe categorii. Multe articole. Multe servicii. Multe opțiuni."),
  p("Volumul informației începe să influențeze claritatea experienței."),

  pullQuote("Problema nu este lipsa informației. Problema este cât de ușor poate fi găsită informația relevantă."),

  h2("Branding și identitate"),
  p("Indrumări Juridice beneficiază de un avantaj pe care multe firme de avocatură îl caută ani întregi."),
  p("Vizibilitate. Autoritate. Recunoaștere."),
  p("Problema principală nu este notorietatea. Problema este coerența."),
  p("Brandul pare construit în jurul mai multor centre de greutate — website-ul Indrumări Juridice, firma Cuculis și Asociații și prezența fondatorului — care funcționează simultan."),
  p("Acest lucru creează oportunitatea unei identități mai clare și mai ușor de memorat."),

  callout("Puncte forte", ""),
  bullet("autoritate ridicată"),
  bullet("strategie de conținut foarte puternică"),
  bullet("vizibilitate organică excelentă"),
  bullet("accesibilitate pentru publicul larg"),
  bullet("prezență digitală extinsă"),

  callout("Oportunități", ""),
  bullet("relație mai clară între website (Indrumări Juridice) și firmă (Cuculis și Asociații)"),
  bullet("structură informațională mai clară"),
  bullet("consolidarea identității de brand"),
  bullet("prioritizarea informațiilor"),
  bullet("diferențiere prin experiență, nu doar prin volum"),

  figure(FIG2, "Articole și servicii pe website-ul Indrumări Juridice — ecosistem digital complex", capF2Ro, capF2En),

  h2("Ce înseamnă asta"),
  p("Majoritatea firmelor de avocatură încearcă să obțină mai multă vizibilitate. Cuculis și Asociații, prin Indrumări Juridice, a depășit deja această etapă."),
  p("Provocarea următoarei faze de evoluție nu pare să fie producerea unui volum și mai mare de conținut."),
  p("Provocarea este transformarea unui ecosistem complex într-o experiență mai clară și mai intuitivă — în care website-ul și firma comunică o singură identitate."),
  p("Pe măsură ce așteptările utilizatorilor continuă să crească, experiența și claritatea pot deveni la fel de importante precum autoritatea."),

  statement("Evaluare generală", "Indrumări Juridice este unul dintre cele mai puternice ecosisteme de conținut juridic din România, iar Cuculis și Asociații beneficiază de o autoritate remarcabilă. Principala oportunitate identificată nu este creșterea vizibilității, ci transformarea acestei autorități într-o experiență digitală mai clară și mai coerentă, în care website-ul și firma sunt percepute ca o singură identitate."),
];

const bodyEn = [
  lead("Few law firms in Romania have a digital presence as visible as Indrumări Juridice — the content platform run by the firm Cuculis și Asociații."),
  p("The website (indrumari-juridice.eu and indrumari-juridice.ro) brings together hundreds of articles, numerous services and an impressive volume of legal information."),
  p("The first impression is strong. There's activity. There's expertise. There's experience. There's authority."),
  p("At the same time, the analysis raises an important question: how can clarity be preserved when the digital ecosystem becomes this large?"),

  h2("First impression"),
  p("The website immediately conveys the idea of an active firm with a strong online presence."),
  p("The user is greeted by articles, services, news and multiple points of access to information."),
  p("This approach creates a sense of authority and expertise."),
  p("Still, after the first moments, a challenge appears. Many elements compete for the user's attention at once."),
  p("For someone discovering the platform for the first time, identifying the essential information takes more effort than it should."),

  figure(FIG1, "The Indrumări Juridice website homepage — information structure", capF1Ro, capF1En),

  h2("Message clarity"),
  p("One of the most interesting observations is the existence of several identities coexisting within the same ecosystem."),
  p("The Indrumări Juridice website (indrumari-juridice.eu and indrumari-juridice.ro). The law firm Cuculis și Asociații. The content platform. The founder's public presence."),
  p("They all work together. But for a new visitor, it isn't immediately clear whether “Indrumări Juridice” is the website, the brand or the firm — while “Cuculis și Asociații” appears as a separate name."),
  p("The result is a strong identity that's sometimes hard to grasp at first glance."),

  h2("User experience"),
  p("The experience is built around access to information. From this perspective, the website performs very well."),
  p("The content is abundant. The topics are numerous. The contact points are easy to find."),
  p("The challenge, however, appears at the level of organization. For users looking for quick answers, the experience can become overwhelming."),
  p("Many categories. Many articles. Many services. Many options."),
  p("The volume of information starts to affect the clarity of the experience."),

  pullQuote("The problem isn't the lack of information. The problem is how easily the relevant information can be found."),

  h2("Branding and identity"),
  p("Indrumări Juridice enjoys an advantage that many law firms seek for years."),
  p("Visibility. Authority. Recognition."),
  p("The main problem isn't fame. The problem is coherence."),
  p("The brand seems built around several centers of gravity — the Indrumări Juridice website, the firm Cuculis și Asociății and the founder's presence — operating at the same time."),
  p("This creates the opportunity for a clearer, more memorable identity."),

  callout("Strengths", ""),
  bullet("high authority"),
  bullet("a very strong content strategy"),
  bullet("excellent organic visibility"),
  bullet("accessibility for the general public"),
  bullet("an extensive digital presence"),

  callout("Opportunities", ""),
  bullet("a clearer relationship between the website (Indrumări Juridice) and the firm (Cuculis și Asociății)"),
  bullet("a clearer information structure"),
  bullet("consolidating the brand identity"),
  bullet("prioritizing information"),
  bullet("differentiation through experience, not just volume"),

  figure(FIG2, "Articles and services on the Indrumări Juridice website — a complex digital ecosystem", capF2Ro, capF2En),

  h2("What this means"),
  p("Most law firms try to gain more visibility. Cuculis și Asociății, through Indrumări Juridice, has already moved past this stage."),
  p("The challenge of the next stage of evolution doesn't seem to be producing an even larger volume of content."),
  p("The challenge is transforming a complex ecosystem into a clearer, more intuitive experience — one where the website and the firm communicate a single identity."),
  p("As user expectations keep rising, experience and clarity can become as important as authority."),

  statement("Overall assessment", "Indrumări Juridice is one of the strongest legal content ecosystems in Romania, and Cuculis și Asociății enjoys remarkable authority. The main opportunity identified isn't increasing visibility, but transforming this authority into a clearer, more coherent digital experience — one where the website and the firm are perceived as a single identity."),
];

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");
  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id: ID, set: { bodyRo, bodyEn } } }] }),
  });
  console.log(JSON.stringify(await mut.json()));
}

main().catch((e) => { console.error(e); process.exit(1); });
