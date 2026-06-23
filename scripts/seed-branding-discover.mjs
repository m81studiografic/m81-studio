// Articol Branding & Experience — "Un brand nu se inventează, se descoperă" (RO + EN).
// Inspirat din investigația Filip & Company: brandingul exprimă fidel fondul, nu inventează o fațadă.
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

  // Imagini verificate vizual: business/produs/spațiu, landscape, fără text/valută străină.
  const coverId = await upload("https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=2400&q=80", "branding-disc-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?auto=format&fit=crop&w=2000&q=80", "branding-disc-distinct.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=2000&q=80", "branding-disc-spatiu.jpg");

  const capF1Ro = "Diferențierea reală nu se adaugă — iese la suprafață din ceea ce o afacere este deja.";
  const capF1En = "Real differentiation isn't added — it surfaces from what a business already is.";
  const capF2Ro = "Brandul trăiește în lucruri concrete: un spațiu, un detaliu, un fel propriu de a face lucrurile.";
  const capF2En = "A brand lives in concrete things: a space, a detail, a particular way of doing things.";

  const bodyRo = [
    lead("Cele mai puternice branduri nu sunt inventate. Sunt descoperite — în ceea ce o afacere face deja, nu în ceea ce și-ar dori să pară."),
    p("Multe afaceri încep construirea unui brand de la o întrebare: „cum vrem să fim văzuți?”. Este o întrebare firească. Dar nu este prima."),
    p("Întrebarea care vine înainte este mai simplă și mai greu de evitat: „cine suntem deja, cu adevărat?”."),
    p("Un brand nu este o imagine adăugată peste o afacere. Este expresia fidelă a ceea ce afacerea este deja."),

    h2("Forma vine din fond"),
    p("Înainte de logo, culoare și font, există ceva mai important. Fondul. Valorile reale. Modul de lucru. Deciziile luate când nu se uită nimeni. Oamenii din spate."),
    p("Când forma vine din fond, brandul sună adevărat. Când forma este împrumutată, brandul sună a altcineva."),
    p("Iar oamenii simt diferența, chiar dacă nu o pot explica."),

    h2("Unde se ascunde brandul"),
    p("Brandul real nu stă în logo. Stă în lucruri pe care afacerea le face deja, adesea fără să le observe."),
    p("În felul în care răspunde unui client. În atenția pentru un detaliu mic. În ceea ce alege să nu facă. În coerența dintre ce promite și ce livrează."),
    p("Aceste lucruri există deja. Rolul brandingului nu este să le inventeze, ci să le facă vizibile."),

    figure(fig1, "Farfurii de ceramică, una distinctă față de celelalte — diferențierea care iese din ceea ce există deja", capF1Ro, capF1En),

    pullQuote("Nu inventăm identități. Descoperim ceea ce există deja și îl traducem."),

    h2("De ce inventarea se vede"),
    p("Un brand inventat încearcă să convingă. Un brand descoperit doar arată."),
    p("Inventarea se trădează prin afirmații — „cei mai buni”, „lideri”, „inovatori”. Descoperirea se exprimă prin dovezi — fapte, oameni, rezultate."),
    p("Una cere încredere. Cealaltă o inspiră."),

    figure(fig2, "Un spațiu cald și bine gândit — brandul exprimat prin lucruri concrete, nu prin afirmații", capF2Ro, capF2En),

    h2("Rolul nostru: traducere, nu ficțiune"),
    p("A construi un brand nu înseamnă a inventa o poveste. Înseamnă a observa atent, a înțelege fondul și a-l traduce într-o formă pe care oamenii o pot vedea, înțelege și ține minte."),
    p("Mai puțină ficțiune. Mai multă fidelitate. Mai puțină fațadă. Mai mult adevăr."),

    callout("Un brand descoperit", "Recunoști un brand descoperit, nu inventat, după câteva semne:"),
    bullet("pornește de la ceea ce există deja"),
    bullet("exprimă fondul, nu îl ascunde"),
    bullet("folosește dovezi, nu afirmații"),
    bullet("este fidel și, în același timp, distinct"),
    bullet("rezistă în timp, pentru că este adevărat"),

    statement("Observație", "Un brand puternic nu se construiește împotriva realității unei afaceri, ci din ea. Cele mai memorabile branduri nu inventează ceva nou — fac vizibil ceea ce era deja acolo. Rolul brandingului nu este să transforme o afacere în altceva, ci să o ajute să fie înțeleasă și ținută minte pentru ceea ce este deja."),
  ];

  const bodyEn = [
    lead("The strongest brands aren't invented. They're discovered — in what a business already does, not in what it wishes it looked like."),
    p("Many businesses start building a brand from one question: “how do we want to be seen?” It's a natural question. But it isn't the first."),
    p("The question that comes before is simpler and harder to avoid: “who are we already, truly?”"),
    p("A brand isn't an image added on top of a business. It's the faithful expression of what the business already is."),

    h2("Form comes from substance"),
    p("Before logo, color and font, there is something more important. The substance. The real values. The way of working. The decisions made when no one is watching. The people behind it."),
    p("When form comes from substance, the brand rings true. When form is borrowed, the brand sounds like someone else."),
    p("And people feel the difference, even when they can't explain it."),

    h2("Where the brand hides"),
    p("The real brand isn't in the logo. It's in things the business already does, often without noticing."),
    p("In the way it answers a client. In the attention to a small detail. In what it chooses not to do. In the consistency between what it promises and what it delivers."),
    p("These things already exist. The role of branding isn't to invent them, but to make them visible."),

    figure(fig1, "Ceramic plates, one distinct from the rest — the differentiation that emerges from what already exists", capF1Ro, capF1En),

    pullQuote("We don't invent identities. We discover what already exists and translate it."),

    h2("Why invention shows"),
    p("An invented brand tries to convince. A discovered brand simply shows."),
    p("Invention gives itself away through claims — “the best,” “leaders,” “innovators.” Discovery expresses itself through proof — facts, people, results."),
    p("One asks for trust. The other inspires it."),

    figure(fig2, "A warm, considered space — the brand expressed through concrete things, not claims", capF2Ro, capF2En),

    h2("Our role: translation, not fiction"),
    p("Building a brand doesn't mean inventing a story. It means observing closely, understanding the substance, and translating it into a form people can see, understand and remember."),
    p("Less fiction. More fidelity. Less façade. More truth."),

    callout("A discovered brand", "You recognize a discovered brand, not an invented one, by a few signs:"),
    bullet("it starts from what already exists"),
    bullet("it expresses the substance rather than hiding it"),
    bullet("it uses proof, not claims"),
    bullet("it is faithful and, at the same time, distinct"),
    bullet("it lasts over time, because it is true"),

    statement("Observation", "A strong brand isn't built against the reality of a business, but out of it. The most memorable brands don't invent something new — they make visible what was already there. The role of branding isn't to turn a business into something else, but to help it be understood and remembered for what it already is."),
  ];

  const doc = {
    _type: "article",
    category: "branding",
    slug: { _type: "slug", current: "un-brand-nu-se-inventeaza-se-descopera" },
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Mâini care modelează lut — un brand se descoperă și se traduce din ceea ce există deja",
    },
    topics: ["Branding", "Identitate", "Autenticitate"],
    titleRo: "Un brand nu se inventează, se descoperă",
    subtitleRo: "Cele mai puternice branduri nu sunt construite peste o afacere, ci scoase la lumină din ea. Despre branding ca traducere fidelă a fondului, nu ca ficțiune.",
    excerptRo: "Un brand nu este o imagine adăugată peste o afacere, ci expresia fidelă a ceea ce afacerea este deja. Despre branding ca descoperire și traducere — nu ca invenție.",
    bodyRo,
    titleEn: "A brand isn't invented — it's discovered",
    subtitleEn: "The strongest brands aren't built on top of a business, but drawn out of it. On branding as a faithful translation of substance, not as fiction.",
    excerptEn: "A brand isn't an image added on top of a business, but the faithful expression of what the business already is. On branding as discovery and translation — not invention.",
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
