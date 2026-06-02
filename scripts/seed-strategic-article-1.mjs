// Articol Strategic Insights #1 — marketing & claritate (RO + EN, mockup-uri proprii).
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

  const coverId = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780432825226_df3d329b.png`, "marketing-cover-comparatie.png");
  const fig1 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780432895458_00ae403c.png`, "marketing-fig1-pozitionare.png");
  const fig2 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780433073357_92072ab7.png`, "marketing-fig2-analiza.png");

  const capF1Ro = "Campaniile de marketing pot genera atenție, dar nu garantează înțelegerea unei afaceri.";
  const capF1En = "Marketing campaigns can generate attention, but they don't guarantee that a business is understood.";
  const capF2Ro = "Experiența și comunicarea influențează modul în care oamenii reacționează la promovare.";
  const capF2En = "Experience and communication influence how people react to promotion.";

  const bodyRo = [
    lead("Atunci când rezultatele întârzie să apară, primul instinct al multor afaceri este să investească mai mult în marketing."),
    p("Mai multe reclame. Mai multe postări. Mai multe campanii. Mai mult trafic."),
    p("Logica pare simplă. Dacă mai mulți oameni află despre afacere, rezultatele ar trebui să crească."),
    p("În practică, lucrurile sunt adesea mai complicate."),

    h2("Marketingul amplifică ceea ce există deja"),
    p("Marketingul are rolul de a aduce atenție. De a crește vizibilitatea. De a ajuta oamenii să descopere o afacere."),
    p("Însă marketingul nu poate rezolva singur probleme de claritate."),
    p("Dacă oamenii nu înțeleg rapid ce face o companie. Dacă nu înțeleg cui se adresează. Dacă nu înțeleg de ce ar trebui să o aleagă."),
    p("Mai multă promovare va amplifica aceeași confuzie. În loc să rezolve problema."),

    figure(fig1, "Comparație de poziționare și comunicare între branduri", capF1Ro, capF1En),

    h2("Oamenii decid mai repede decât credem"),
    p("Atunci când descoperă o afacere nouă, oamenii își formează impresii foarte rapid."),
    p("În câteva secunde încearcă să răspundă la întrebări simple."),
    p("Ce oferă această companie? Este relevantă pentru mine? Pot avea încredere în ea?"),
    p("Dacă răspunsurile nu sunt evidente, interesul începe să scadă."),
    p("Nu pentru că produsul este slab. Nu pentru că serviciul este slab. Ci pentru că valoarea oferită nu este suficient de clară."),

    h2("Problema poate apărea înainte de promovare"),
    p("În multe situații, provocarea nu este lipsa vizibilității. Provocarea este lipsa clarității."),
    p("Mesaje prea generale. Poziționare neclară. Experiențe fragmentate. Website-uri care explică prea mult și clarifică prea puțin."),
    p("Toate acestea pot reduce eficiența marketingului."),
    p("Pentru că oamenii ajung la afacere, dar nu înțeleg suficient de repede de ce ar trebui să continue."),

    pullQuote("Marketingul poate aduce oamenii la ușă. Claritatea îi ajută să intre."),

    h2("Ce observăm frecvent"),
    p("Pe măsură ce analizăm afaceri din industrii diferite, observăm câteva tipare recurente."),

    callout("De reținut", ""),
    bullet("claritatea poziționării influențează performanța marketingului"),
    bullet("diferențierea ajută oamenii să înțeleagă mai repede valoarea oferită"),
    bullet("experiența utilizatorului contribuie la conversie"),
    bullet("coerența comunicării consolidează încrederea"),
    bullet("promovarea este mai eficientă atunci când mesajul este clar"),
    bullet("vizibilitatea fără claritate produce rezultate limitate"),

    figure(fig2, "Analiză de produs — experiență de brand, comunicare și verdict", capF2Ro, capF2En),

    h2("Ce înseamnă asta pentru afaceri"),
    p("Marketingul rămâne un instrument esențial pentru creștere."),
    p("Însă înainte de a investi mai mult în promovare, merită analizat dacă afacerea transmite suficientă claritate."),
    p("Oamenii înțeleg ce face compania? Înțeleg pentru cine este? Înțeleg de ce este diferită? Înțeleg care este următorul pas?"),
    p("Atunci când aceste răspunsuri sunt clare, marketingul are o fundație mai solidă pe care să construiască."),

    statement("Claritatea înaintea promovării", "Unele afaceri investesc în marketing fără să obțină rezultatele așteptate deoarece problema nu este întotdeauna lipsa vizibilității. În multe cazuri, provocarea este cât de clar reușesc oamenii să înțeleagă valoarea, diferențierea și relevanța afacerii."),
  ];

  const bodyEn = [
    lead("When results are slow to come, the first instinct of many businesses is to invest more in marketing."),
    p("More ads. More posts. More campaigns. More traffic."),
    p("The logic seems simple. If more people find out about the business, results should grow."),
    p("In practice, things are often more complicated."),

    h2("Marketing amplifies what already exists"),
    p("Marketing's role is to bring attention. To increase visibility. To help people discover a business."),
    p("But marketing can't solve clarity problems on its own."),
    p("If people don't quickly understand what a company does. If they don't understand who it's for. If they don't understand why they should choose it."),
    p("More promotion will amplify the same confusion. Instead of solving the problem."),

    figure(fig1, "A comparison of positioning and communication across brands", capF1Ro, capF1En),

    h2("People decide faster than we think"),
    p("When they discover a new business, people form impressions very quickly."),
    p("In a few seconds they try to answer simple questions."),
    p("What does this company offer? Is it relevant to me? Can I trust it?"),
    p("If the answers aren't obvious, interest starts to fade."),
    p("Not because the product is weak. Not because the service is weak. But because the value offered isn't clear enough."),

    h2("The problem can appear before promotion"),
    p("In many situations, the challenge isn't a lack of visibility. The challenge is a lack of clarity."),
    p("Messages that are too general. Unclear positioning. Fragmented experiences. Websites that explain too much and clarify too little."),
    p("All of this can reduce the effectiveness of marketing."),
    p("Because people reach the business but don't understand quickly enough why they should continue."),

    pullQuote("Marketing can bring people to the door. Clarity helps them walk in."),

    h2("What we frequently observe"),
    p("As we analyze businesses across different industries, we notice a few recurring patterns."),

    callout("Worth keeping in mind", ""),
    bullet("the clarity of positioning influences marketing performance"),
    bullet("differentiation helps people understand the value offered faster"),
    bullet("user experience contributes to conversion"),
    bullet("consistent communication strengthens trust"),
    bullet("promotion is more effective when the message is clear"),
    bullet("visibility without clarity produces limited results"),

    figure(fig2, "A product analysis — brand experience, communication and verdict", capF2Ro, capF2En),

    h2("What this means for businesses"),
    p("Marketing remains an essential tool for growth."),
    p("But before investing more in promotion, it's worth analyzing whether the business communicates enough clarity."),
    p("Do people understand what the company does? Do they understand who it's for? Do they understand why it's different? Do they understand what the next step is?"),
    p("When these answers are clear, marketing has a more solid foundation to build on."),

    statement("Clarity before promotion", "Some businesses invest in marketing without getting the results they expect because the problem isn't always a lack of visibility. In many cases, the challenge is how clearly people manage to understand the value, differentiation and relevance of the business."),
  ];

  const doc = {
    _type: "article",
    category: "strategic",
    slug: { _type: "slug", current: "de-ce-unele-afaceri-investesc-in-marketing-fara-sa-obtina-rezultate" },
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: false,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Persoană comparând mai multe produse înainte de a alege" },
    topics: ["Marketing", "Branding", "Strategie"],
    takeawaysRo: [
      "Marketingul amplifică ceea ce există deja.",
      "Claritatea influențează eficiența promovării.",
      "Oamenii își formează impresii foarte rapid.",
      "Poziționarea și diferențierea influențează rezultatele.",
      "Vizibilitatea nu garantează înțelegerea.",
    ],
    takeawaysEn: [
      "Marketing amplifies what already exists.",
      "Clarity influences the effectiveness of promotion.",
      "People form impressions very quickly.",
      "Positioning and differentiation influence results.",
      "Visibility doesn't guarantee understanding.",
    ],
    titleRo: "De ce unele afaceri investesc în marketing fără să obțină rezultate",
    subtitleRo: "Mai multă promovare nu rezolvă întotdeauna problema. Uneori dificultatea apare înainte ca marketingul să intre în joc.",
    excerptRo: "Mai mult marketing nu rezolvă întotdeauna problema. De multe ori provocarea nu este lipsa vizibilității, ci lipsa clarității — oamenii ajung la afacere, dar nu înțeleg suficient de repede valoarea ei.",
    bodyRo,
    titleEn: "Why some businesses invest in marketing without getting results",
    subtitleEn: "More promotion doesn't always solve the problem. Sometimes the difficulty appears before marketing even comes into play.",
    excerptEn: "More marketing doesn't always solve the problem. Often the challenge isn't a lack of visibility, but a lack of clarity — people reach the business but don't understand its value fast enough.",
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
