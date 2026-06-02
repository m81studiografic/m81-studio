// Articol Strategic Insights #3 — Consistența este subestimată (RO + EN, mockup-uri proprii).
import { readFileSync } from "node:fs";
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const DIR = "/Users/m81studio/Desktop/Imagini articole/Consistența este subestimată";

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

  const coverId = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780437310697_a6fb7aff.png`, "consistenta-cover-strategie.png");
  const fig1 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780437639306_69a51976.png`, "consistenta-fig1-verde.png");
  const fig2 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780437937278_064206ef.png`, "consistenta-fig2-altura.png");

  const capF1Ro = "Experiențe și puncte de contact construite consecvent în jurul aceleiași identități de brand.";
  const capF1En = "Experiences and touchpoints built consistently around the same brand identity.";
  const capF2Ro = "Elemente de identitate, comunicare și experiență utilizate coerent în cadrul aceluiași ecosistem de brand.";
  const capF2En = "Identity, communication and experience elements used coherently within the same brand ecosystem.";

  const bodyRo = [
    lead("Majoritatea oamenilor nu își amintesc o afacere după o singură interacțiune."),
    p("Își formează o percepție în timp. Prin experiențe repetate. Prin promisiuni respectate. Prin lucruri mici care se acumulează."),
    p("Aici intervine consistența."),
    p("Un element aparent simplu, dar care influențează profund modul în care o afacere este percepută."),
    p("Într-o perioadă în care atenția este limitată și opțiunile sunt numeroase, consistența poate deveni un avantaj competitiv mai important decât pare la prima vedere."),

    h2("Oamenii au încredere în ceea ce recunosc"),
    p("În fiecare zi suntem expuși la sute de mesaje, reclame și branduri."),
    p("Puține rămân în memorie."),
    p("Cele care reușesc acest lucru nu sunt întotdeauna cele mai zgomotoase. Sunt adesea cele mai consecvente."),
    p("Același mesaj. Aceleași valori. Aceeași experiență. Aceeași atenție la detalii."),
    p("În timp, această repetiție creează familiaritate. Iar familiaritatea contribuie la încredere."),
    p("Brandurile puternice nu sunt recunoscute doar pentru ceea ce spun. Sunt recunoscute pentru faptul că spun și fac lucruri coerente în mod repetat."),

    figure(fig1, "Sistem de identitate de brand aplicat coerent pe mai multe puncte de contact", capF1Ro, capF1En),

    h2("Consistența nu înseamnă rigiditate"),
    p("Există o idee greșită conform căreia consistența înseamnă să faci mereu același lucru."),
    p("În realitate, afacerile evoluează permanent. Produsele se schimbă. Serviciile se dezvoltă. Tehnologia avansează."),
    p("Consistența nu înseamnă lipsa schimbării. Înseamnă păstrarea unei direcții clare în timp ce evoluezi."),
    p("Organizațiile sănătoase se adaptează constant. Dar își păstrează identitatea."),
    p("Oamenii trebuie să poată recunoaște afacerea chiar și atunci când aceasta crește și se transformă."),

    h2("Inconsistența creează confuzie"),
    p("Multe afaceri construiesc elementele identității în momente diferite."),
    p("Un logo realizat într-o etapă. Un website construit câțiva ani mai târziu. Materiale de comunicare create de furnizori diferiți. Mesaje formulate diferit pe fiecare canal."),
    p("Rezultatul este adesea o experiență fragmentată."),
    p("Pentru echipa internă, toate aceste elemente par conectate. Pentru client, ele pot părea organizații diferite."),
    p("Iar atunci când percepția devine neclară, încrederea este mai greu de construit."),

    pullQuote("Încrederea nu se construiește printr-o experiență extraordinară. Se construiește prin experiențe bune repetate în mod constant."),

    h2("Ce observăm frecvent"),
    p("Atunci când analizăm branduri și experiențe digitale, observăm că multe probleme nu apar din lipsa calității. Apar din lipsa coerenței."),
    p("Mesaje diferite. Ton diferit. Experiențe diferite. Promisiuni diferite."),
    p("Fiecare element funcționează individual. Dar sistemul nu funcționează împreună."),
    p("În multe cazuri, consistența nu este o problemă vizibilă. Este o problemă care se acumulează în timp și influențează modul în care oamenii percep profesionalismul unei organizații."),

    callout("De reținut", ""),
    bullet("consistența contribuie la recunoașterea brandului"),
    bullet("familiaritatea influențează încrederea"),
    bullet("experiențele coerente sunt mai ușor de memorat"),
    bullet("claritatea crește atunci când mesajele sunt aliniate"),
    bullet("profesionalismul este perceput prin detalii repetate în mod consecvent"),
    bullet("consistența susține creșterea pe termen lung"),

    figure(fig2, "Identitate, comunicare și experiență coerente într-un ecosistem de brand", capF2Ro, capF2En),

    h2("Ce înseamnă asta pentru afaceri"),
    p("Multe organizații caută permanent următoarea idee. Următorul canal. Următoarea campanie. Următoarea tehnologie."),
    p("Însă uneori progresul nu vine din a face mai multe lucruri. Vine din a face aceleași lucruri importante într-un mod mai consecvent."),
    p("Pe termen lung, consistența poate deveni unul dintre cele mai valoroase active ale unei afaceri."),
    p("Nu pentru că atrage atenția imediat. Ci pentru că ajută oamenii să recunoască, să înțeleagă și să aibă încredere în brand."),

    statement("Consistența construiește încredere", "Consistența este adesea mai puțin vizibilă decât inovația sau promovarea, însă contribuie semnificativ la modul în care o afacere este recunoscută, înțeleasă și memorată. În timp, experiențele coerente construiesc încredere, iar încrederea construiește branduri puternice."),
  ];

  const bodyEn = [
    lead("Most people don't remember a business after a single interaction."),
    p("They form a perception over time. Through repeated experiences. Through promises kept. Through small things that add up."),
    p("This is where consistency comes in."),
    p("A seemingly simple element, but one that profoundly influences how a business is perceived."),
    p("In a time when attention is limited and options are numerous, consistency can become a more important competitive advantage than it seems at first glance."),

    h2("People trust what they recognize"),
    p("Every day we're exposed to hundreds of messages, ads and brands."),
    p("Few stay in memory."),
    p("The ones that manage to aren't always the loudest. They're often the most consistent."),
    p("The same message. The same values. The same experience. The same attention to detail."),
    p("Over time, this repetition creates familiarity. And familiarity contributes to trust."),
    p("Strong brands aren't recognized just for what they say. They're recognized for saying and doing coherent things repeatedly."),

    figure(fig1, "A brand identity system applied coherently across several touchpoints", capF1Ro, capF1En),

    h2("Consistency doesn't mean rigidity"),
    p("There's a misconception that consistency means always doing the same thing."),
    p("In reality, businesses constantly evolve. Products change. Services develop. Technology advances."),
    p("Consistency doesn't mean a lack of change. It means keeping a clear direction while you evolve."),
    p("Healthy organizations adapt constantly. But they keep their identity."),
    p("People need to be able to recognize the business even as it grows and transforms."),

    h2("Inconsistency creates confusion"),
    p("Many businesses build the elements of their identity at different moments."),
    p("A logo made in one stage. A website built a few years later. Communication materials created by different suppliers. Messages worded differently on each channel."),
    p("The result is often a fragmented experience."),
    p("To the internal team, all these elements seem connected. To the client, they can look like different organizations."),
    p("And when perception becomes unclear, trust is harder to build."),

    pullQuote("Trust isn't built through one extraordinary experience. It's built through good experiences repeated consistently."),

    h2("What we frequently observe"),
    p("When we analyze brands and digital experiences, we notice that many problems don't come from a lack of quality. They come from a lack of coherence."),
    p("Different messages. A different tone. Different experiences. Different promises."),
    p("Each element works individually. But the system doesn't work together."),
    p("In many cases, consistency isn't a visible problem. It's a problem that builds up over time and influences how people perceive an organization's professionalism."),

    callout("Worth keeping in mind", ""),
    bullet("consistency contributes to brand recognition"),
    bullet("familiarity influences trust"),
    bullet("coherent experiences are easier to remember"),
    bullet("clarity increases when messages are aligned"),
    bullet("professionalism is perceived through details repeated consistently"),
    bullet("consistency supports long-term growth"),

    figure(fig2, "Coherent identity, communication and experience within a brand ecosystem", capF2Ro, capF2En),

    h2("What this means for businesses"),
    p("Many organizations are constantly looking for the next idea. The next channel. The next campaign. The next technology."),
    p("But sometimes progress doesn't come from doing more things. It comes from doing the same important things more consistently."),
    p("In the long run, consistency can become one of a business's most valuable assets."),
    p("Not because it grabs attention immediately. But because it helps people recognize, understand and trust the brand."),

    statement("Consistency builds trust", "Consistency is often less visible than innovation or promotion, but it contributes significantly to how a business is recognized, understood and remembered. Over time, coherent experiences build trust, and trust builds strong brands."),
  ];

  const doc = {
    _type: "article",
    category: "strategic",
    slug: { _type: "slug", current: "consistenta-este-subestimata" },
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: false,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Ședință de strategie de brand — consistența ca avantaj competitiv" },
    topics: ["Branding", "Consistență", "Strategie"],
    takeawaysRo: [
      "Încrederea se construiește prin repetiție.",
      "Familiaritatea contribuie la recunoaștere.",
      "Consistența nu înseamnă rigiditate.",
      "Inconsistența creează confuzie.",
      "Experiențele coerente consolidează brandul.",
    ],
    takeawaysEn: [
      "Trust is built through repetition.",
      "Familiarity contributes to recognition.",
      "Consistency doesn't mean rigidity.",
      "Inconsistency creates confusion.",
      "Coherent experiences strengthen the brand.",
    ],
    titleRo: "Consistența este subestimată",
    subtitleRo: "Multe afaceri caută soluții noi pentru creștere, în timp ce unul dintre cele mai importante avantaje competitive rămâne adesea ignorat: consistența.",
    excerptRo: "Multe afaceri caută mereu următoarea idee, în timp ce consistența — un avantaj competitiv subestimat — construiește recunoaștere, familiaritate și încredere în timp.",
    bodyRo,
    titleEn: "Consistency is underrated",
    subtitleEn: "Many businesses look for new solutions for growth, while one of the most important competitive advantages is often ignored: consistency.",
    excerptEn: "Many businesses keep looking for the next idea, while consistency — an underrated competitive advantage — builds recognition, familiarity and trust over time.",
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
