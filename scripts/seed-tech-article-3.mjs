// Articol Technology & Experience #3 — încredere & website-uri (RO + EN, mockup-uri proprii).
import { readFileSync } from "node:fs";
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const DIR = "/Users/m81studio/Desktop/Dosar Imagini articole/De ce website-urile devin tot mai importante pentru încredere";

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

  const coverId = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780429220783_d90497b2.png`, "trust-cover-persoana.png");
  const fig1 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780429282125_e50d7022.png`, "trust-fig1-constructpro.png");
  const fig2 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780429360228_83522d01.png`, "trust-fig2-portal.png");

  const capF1Ro = "Website modern construit pentru claritate, structură și acces rapid la informațiile esențiale.";
  const capF1En = "A modern website built for clarity, structure and fast access to essential information.";
  const capF2Ro = "Experiență digitală integrată care combină informația, interacțiunea și accesul simplificat la servicii.";
  const capF2En = "An integrated digital experience that combines information, interaction and simplified access to services.";

  const bodyRo = [
    lead("Pentru mulți clienți, încrederea începe cu o experiență digitală."),
    p("Cu doar câțiva ani în urmă, majoritatea relațiilor profesionale începeau prin recomandări, apeluri telefonice sau întâlniri."),
    p("Astăzi, primul contact are loc de cele mai multe ori online."),
    p("Utilizatorii caută informații. Compară opțiuni. Analizează website-uri. Își formează primele impresii."),
    p("În acest context, website-ul nu mai este doar o carte de vizită digitală. El devine una dintre cele mai importante expresii ale unui brand."),

    h2("Prima impresie se formează rapid"),
    p("Atunci când un utilizator ajunge pe un website, începe imediat să evalueze ceea ce vede."),
    p("Fără să își dea seama, observă:"),
    bullet("claritatea mesajului"),
    bullet("organizarea informațiilor"),
    bullet("calitatea designului"),
    bullet("ușurința navigării"),
    bullet("modul în care sunt prezentate serviciile"),
    p("Aceste elemente nu demonstrează expertiza unei organizații. Ele influențează însă percepția asupra profesionalismului și seriozității acesteia."),
    p("În multe cazuri, utilizatorii decid în primele secunde dacă vor continua să exploreze sau vor căuta o alternativă."),

    figure(fig1, "Website modern construit pentru claritate și structură", capF1Ro, capF1En),

    h2("Utilizatorii compară experiențe"),
    p("O firmă de avocatură nu este comparată doar cu alte firme de avocatură. O clinică nu este comparată doar cu alte clinici. O companie de consultanță nu este comparată doar cu alte companii de consultanță."),
    p("Utilizatorii compară experiențele pe care le întâlnesc în fiecare zi."),
    p("Aplicații bancare. Magazine online. Platforme de rezervări. Servicii digitale moderne."),
    p("Pe măsură ce aceste experiențe evoluează, cresc și așteptările."),
    p("Un website care era considerat modern acum câțiva ani poate părea astăzi dificil de utilizat sau depășit."),

    h2("Website-ul este parte din experiența de brand"),
    p("Brandingul este adesea asociat cu identitatea vizuală."),
    p("Logo. Culori. Tipografie."),
    p("Însă experiența digitală influențează din ce în ce mai mult modul în care oamenii percep un brand."),
    p("Un website clar transmite organizare. Un proces simplu transmite eficiență. O experiență intuitivă transmite profesionalism."),
    p("Din acest motiv, website-ul începe să joace un rol tot mai important în construirea încrederii."),

    pullQuote("În multe industrii, website-ul nu mai este doar o sursă de informații. Este o demonstrație a modului în care funcționează organizația."),

    h2("Tehnologia schimbă așteptările"),
    p("În ultimii ani, experiențele digitale au devenit mai rapide, mai simple și mai intuitive."),
    p("Programări online. Formulare inteligente. Portaluri pentru clienți. Automatizări. Asistență digitală."),
    p("Pe măsură ce aceste instrumente devin obișnuite, utilizatorii încep să le considere standard."),
    p("Website-urile care nu țin pasul cu aceste schimbări riscă să creeze o percepție de stagnare, chiar și atunci când serviciile oferite sunt de calitate."),

    callout("De reținut", ""),
    bullet("website-ul este adesea primul punct de contact cu un brand"),
    bullet("utilizatorii își formează impresii în câteva secunde"),
    bullet("experiența influențează percepția profesionalismului"),
    bullet("claritatea și simplitatea contribuie la construirea încrederii"),
    bullet("tehnologia ridică permanent așteptările utilizatorilor"),

    figure(fig2, "Experiență digitală integrată — informație, interacțiune și acces la servicii", capF2Ro, capF2En),

    h2("Ce urmează"),
    p("Rolul website-ului continuă să se schimbe."),
    p("Nu mai este suficient să existe. Nu mai este suficient să ofere informații."),
    p("Utilizatorii caută experiențe clare, rapide și relevante."),
    p("Pe măsură ce tehnologia evoluează, organizațiile au oportunitatea de a transforma website-ul într-un instrument activ de construire a încrederii și de consolidare a relațiilor cu clienții."),

    statement("Încrederea începe online", "Pentru multe afaceri, website-ul reprezintă prima experiență pe care un client o are cu brandul. Într-un mediu digital în care opțiunile sunt la un click distanță, claritatea, accesibilitatea și experiența utilizatorului devin factori tot mai importanți în construirea încrederii."),
  ];

  const bodyEn = [
    lead("For many clients, trust begins with a digital experience."),
    p("Just a few years ago, most professional relationships began through referrals, phone calls or meetings."),
    p("Today, the first contact most often happens online."),
    p("Users look for information. They compare options. They analyze websites. They form their first impressions."),
    p("In this context, the website is no longer just a digital business card. It becomes one of the most important expressions of a brand."),

    h2("First impressions form quickly"),
    p("When a user lands on a website, they immediately start evaluating what they see."),
    p("Without realizing it, they notice:"),
    bullet("the clarity of the message"),
    bullet("the organization of the information"),
    bullet("the quality of the design"),
    bullet("the ease of navigation"),
    bullet("the way the services are presented"),
    p("These elements don't prove an organization's expertise. But they influence the perception of its professionalism and seriousness."),
    p("In many cases, users decide in the first seconds whether they'll keep exploring or look for an alternative."),

    figure(fig1, "A modern website built for clarity and structure", capF1Ro, capF1En),

    h2("Users compare experiences"),
    p("A law firm isn't compared only with other law firms. A clinic isn't compared only with other clinics. A consulting company isn't compared only with other consulting companies."),
    p("Users compare the experiences they encounter every day."),
    p("Banking apps. Online stores. Booking platforms. Modern digital services."),
    p("As these experiences evolve, expectations rise too."),
    p("A website that was considered modern a few years ago can feel hard to use or outdated today."),

    h2("The website is part of the brand experience"),
    p("Branding is often associated with visual identity."),
    p("Logo. Colors. Typography."),
    p("But the digital experience increasingly influences how people perceive a brand."),
    p("A clear website conveys organization. A simple process conveys efficiency. An intuitive experience conveys professionalism."),
    p("For this reason, the website starts to play an increasingly important role in building trust."),

    pullQuote("In many industries, the website is no longer just a source of information. It's a demonstration of how the organization works."),

    h2("Technology changes expectations"),
    p("In recent years, digital experiences have become faster, simpler and more intuitive."),
    p("Online scheduling. Smart forms. Client portals. Automations. Digital assistance."),
    p("As these tools become common, users start to consider them standard."),
    p("Websites that don't keep up with these changes risk creating a perception of stagnation, even when the services offered are high quality."),

    callout("Worth keeping in mind", ""),
    bullet("the website is often the first point of contact with a brand"),
    bullet("users form impressions in a few seconds"),
    bullet("experience influences the perception of professionalism"),
    bullet("clarity and simplicity contribute to building trust"),
    bullet("technology constantly raises user expectations"),

    figure(fig2, "An integrated digital experience — information, interaction and access to services", capF2Ro, capF2En),

    h2("What comes next"),
    p("The role of the website keeps changing."),
    p("It's no longer enough for it to exist. It's no longer enough for it to provide information."),
    p("Users look for experiences that are clear, fast and relevant."),
    p("As technology evolves, organizations have the opportunity to turn the website into an active tool for building trust and strengthening relationships with their clients."),

    statement("Trust begins online", "For many businesses, the website is the first experience a client has with the brand. In a digital environment where options are a click away, clarity, accessibility and user experience become increasingly important factors in building trust."),
  ];

  const doc = {
    _type: "article",
    category: "technology",
    slug: { _type: "slug", current: "de-ce-website-urile-devin-tot-mai-importante-pentru-incredere" },
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: false,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Persoană formându-și prima impresie pe website-ul unei companii" },
    topics: ["Website", "Încredere", "Experiență digitală"],
    titleRo: "De ce website-urile devin tot mai importante pentru încredere",
    subtitleRo: "În multe industrii, website-ul este primul loc în care oamenii descoperă o companie. Modul în care este construit influențează percepția înainte de orice conversație, recomandare sau colaborare.",
    excerptRo: "Website-ul este adesea primul loc în care oamenii descoperă o companie. Claritatea, accesibilitatea și experiența digitală influențează percepția profesionalismului — și încrederea — înainte de orice conversație.",
    bodyRo,
    titleEn: "Why websites matter more and more for trust",
    subtitleEn: "In many industries, the website is the first place people discover a company. How it's built shapes perception before any conversation, referral or collaboration.",
    excerptEn: "The website is often the first place people discover a company. Clarity, accessibility and the digital experience shape the perception of professionalism — and trust — before any conversation.",
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
