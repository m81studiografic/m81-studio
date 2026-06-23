// Articol Technology & Experience — "Tehnologia nu înlocuiește încrederea, o amplifică" (RO + EN).
// Inspirat din investigația Filip & Company (planșa "Experiență inteligentă" + "Looking Forward").
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

  // Imagini verificate vizual: business/tech, landscape, fără text/valută străină lizibil.
  const coverId = await upload("https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=2400&q=80", "tech-trust-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80", "tech-trust-expertiza.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80", "tech-trust-uman.jpg");

  const capF1Ro = "Tehnologia bine gândită stă în spatele oamenilor și al expertizei, nu în fața lor.";
  const capF1En = "Well-considered technology stands behind people and expertise, not in front of them.";
  const capF2Ro = "Încrederea se construiește între oameni; tehnologia doar susține conversația.";
  const capF2En = "Trust is built between people; technology only supports the conversation.";

  const bodyRo = [
    lead("În serviciile profesionale, tehnologia nu construiește încrederea. O face mai ușor de găsit, de înțeles și de simțit."),
    p("Multe organizații privesc tehnologia ca pe un scop. Mai multe funcții. Mai multă automatizare. Mai mult „digital”."),
    p("Întrebarea reală nu este însă „câtă tehnologie?”, ci „în slujba cui?”."),

    h2("Încrederea rămâne umană"),
    p("Oamenii nu au încredere în platforme. Au încredere în oameni, în judecată, în experiență, în felul în care sunt tratați."),
    p("Tehnologia nu poate înlocui acest lucru. Dar îl poate face mai vizibil. Un website nu inspiră încredere prin animații, ci prin claritate și prin felul în care prezintă oamenii și expertiza din spate."),

    h2("De la arhivă la experiență"),
    p("Multe organizații publică mult și valorifică puțin. Conținut bogat, dar greu de parcurs. Informația există, însă rămâne închisă într-o arhivă."),
    p("Tehnologia bine folosită transformă arhiva în experiență. Informația devine conectată, contextualizată, ușor de descoperit."),
    p("Nu adaugi mai mult. Faci ca ceea ce există deja să fie mai accesibil."),

    figure(fig1, "Mâini care lucrează între laptop și schițe pe hârtie — tehnologia în spatele gândirii și al expertizei", capF1Ro, capF1En),

    pullQuote("Tehnologia nu este o promisiune nouă. Este un mod de a face vizibilă valoarea care există deja."),

    h2("Tehnologia care dispare"),
    p("Cea mai bună tehnologie nu se vede. Nu impresionează. Reduce frecarea, scoate barierele și lasă omul și expertiza în prim-plan."),
    p("Când tehnologia devine spectacol, atrage atenția asupra ei. Când este bine gândită, atrage atenția asupra a ceea ce contează."),

    figure(fig2, "O conversație în jurul unui laptop — tehnologia susține schimbul uman, nu îl înlocuiește", capF2Ro, capF2En),

    h2("Tehnologia în slujba expertizei, nu invers"),
    p("Oportunitatea nu este să urmărim tendințe sau să adoptăm tehnologie de dragul tehnologiei. Este să folosim tehnologia pentru a susține ceea ce este deja valoros: oamenii, judecata, experiența, cunoașterea."),
    p("Mai puțină tehnologie de dragul ei. Mai multă tehnologie în slujba înțelegerii. Mai puțin zgomot. Mai multă claritate."),

    callout("Tehnologie bine folosită", "Recunoști tehnologia care servește, nu impresionează, după câteva semne:"),
    bullet("pornește de la oameni și expertiză, nu de la funcții"),
    bullet("face informația conectată și ușor de descoperit"),
    bullet("reduce frecarea, nu o adaugă"),
    bullet("susține încrederea, nu o înlocuiește"),
    bullet("dispare în spatele experienței"),

    statement("Observație", "Tehnologia nu este un scop, ci un instrument. În serviciile bazate pe încredere, rolul ei nu este să impresioneze, ci să facă mai accesibilă valoarea reală a organizației — oamenii, judecata și experiența. Cele mai bune experiențe digitale nu se remarcă prin tehnologie, ci prin claritatea cu care lasă valoarea să se vadă."),
  ];

  const bodyEn = [
    lead("In professional services, technology doesn't build trust. It makes it easier to find, understand and feel."),
    p("Many organizations treat technology as a goal. More features. More automation. More “digital.”"),
    p("But the real question isn't “how much technology?” — it's “in service of what?”"),

    h2("Trust remains human"),
    p("People don't trust platforms. They trust people, judgment, experience, the way they're treated."),
    p("Technology can't replace this. But it can make it more visible. A website doesn't inspire trust through animations, but through clarity and the way it presents the people and the expertise behind it."),

    h2("From archive to experience"),
    p("Many organizations publish a lot and leverage little. Rich content, but hard to navigate. The information exists, yet stays locked in an archive."),
    p("Well-used technology turns the archive into an experience. Information becomes connected, contextualized, easy to discover."),
    p("You don't add more. You make what already exists more accessible."),

    figure(fig1, "Hands working between a laptop and paper sketches — technology behind thinking and expertise", capF1Ro, capF1En),

    pullQuote("Technology isn't a new promise. It's a way to make visible the value that already exists."),

    h2("Technology that disappears"),
    p("The best technology isn't seen. It doesn't show off. It reduces friction, removes barriers and keeps the person and the expertise in the foreground."),
    p("When technology becomes a spectacle, it draws attention to itself. When it's well-considered, it draws attention to what matters."),

    figure(fig2, "A conversation around a laptop — technology supports the human exchange, it doesn't replace it", capF2Ro, capF2En),

    h2("Technology in service of expertise, not the other way around"),
    p("The opportunity isn't to chase trends or adopt technology for its own sake. It's to use technology to support what is already valuable: people, judgment, experience, knowledge."),
    p("Less technology for its own sake. More technology in service of understanding. Less noise. More clarity."),

    callout("Well-used technology", "You recognize technology that serves rather than impresses by a few signs:"),
    bullet("it starts from people and expertise, not from features"),
    bullet("it makes information connected and easy to discover"),
    bullet("it reduces friction rather than adding it"),
    bullet("it supports trust rather than replacing it"),
    bullet("it disappears behind the experience"),

    statement("Observation", "Technology isn't a goal, but a tool. In trust-based services, its role isn't to impress, but to make the organization's real value more accessible — the people, the judgment and the experience. The best digital experiences don't stand out through technology, but through the clarity with which they let the value show."),
  ];

  const doc = {
    _type: "article",
    category: "technology",
    slug: { _type: "slug", current: "tehnologia-nu-inlocuieste-increderea-o-amplifica" },
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Spațiu de lucru digital modern și calm — tehnologia în slujba oamenilor și a experienței",
    },
    topics: ["Tehnologie", "Experiență digitală", "Încredere"],
    titleRo: "Tehnologia nu înlocuiește încrederea, o amplifică",
    subtitleRo: "În serviciile profesionale, tehnologia nu construiește încrederea — o face mai ușor de găsit, de înțeles și de simțit. Despre tehnologia care servește oamenii, nu invers.",
    excerptRo: "Întrebarea nu este „câtă tehnologie?”, ci „în slujba cui?”. Despre tehnologia care nu impresionează, ci face mai accesibilă valoarea reală a unei organizații: oamenii, judecata și experiența.",
    bodyRo,
    titleEn: "Technology doesn't replace trust — it amplifies it",
    subtitleEn: "In professional services, technology doesn't build trust — it makes it easier to find, understand and feel. On technology that serves people, not the other way around.",
    excerptEn: "The question isn't “how much technology?” but “in service of what?”. On technology that doesn't impress, but makes an organization's real value more accessible: people, judgment and experience.",
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
