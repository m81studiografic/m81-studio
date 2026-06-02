// Articol Technology & Experience #1 (RO + EN, cover + 2 imagini).
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

  const coverId = await upload("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80", "tech1-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=2000&q=80", "tech1-website.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80", "tech1-portal.jpg");

  const capF1Ro = "Website modern de avocatură cu opțiuni de contact și programare accesibile.";
  const capF1En = "A modern law firm website with accessible contact and scheduling options.";
  const capF2Ro = "Portal digital utilizat pentru comunicarea și schimbul de documente cu clienții.";
  const capF2En = "A digital portal used for communication and document exchange with clients.";

  const bodyRo = [
    lead("Pentru mulți clienți, experiența juridică începe înainte de prima conversație cu un avocat."),
    p("În trecut, relația dintre client și firma de avocatură începea aproape întotdeauna printr-un apel telefonic sau o întâlnire."),
    p("Astăzi, primul contact are loc de cele mai multe ori online."),
    p("Utilizatorii caută informații. Compară opțiuni. Analizează website-uri. Caută răspunsuri. Încearcă să înțeleagă dacă au ajuns în locul potrivit."),
    p("În acest context, tehnologia nu mai este doar un instrument intern. Ea devine parte din experiența pe care firma o oferă."),

    h2("Experiența începe înainte de primul apel"),
    p("Un potențial client ajunge adesea pe website înainte să vorbească cu cineva din echipă."),
    p("Dacă informațiile sunt greu de găsit. Dacă serviciile sunt dificil de înțeles. Dacă următorul pas nu este clar."),
    p("Există șanse mari ca utilizatorul să părăsească website-ul înainte de a lua legătura cu firma."),
    p("Tehnologia poate reduce această fricțiune."),
    p("Formulare mai clare. Programări online. Confirmări automate. Fluxuri simple și intuitive."),
    p("Toate contribuie la o experiență mai ușor de parcurs."),

    figure(fig1, "Website modern de avocatură cu contact și programare", capF1Ro, capF1En),

    h2("Așteptările utilizatorilor se schimbă"),
    p("În fiecare zi, oamenii folosesc aplicații bancare, servicii de livrare și platforme digitale care funcționează rapid și intuitiv."),
    p("Aceste experiențe influențează modul în care percep toate celelalte servicii. Inclusiv serviciile juridice."),
    p("Clienții apreciază:"),
    bullet("programări online"),
    bullet("formulare eficiente"),
    bullet("acces rapid la informații"),
    bullet("confirmări automate"),
    bullet("comunicare clară"),
    p("Nu pentru că tehnologia înlocuiește relația umană. Ci pentru că elimină pașii inutili dintre client și expertiza de care are nevoie."),

    h2("Portalurile pentru clienți devin tot mai relevante"),
    p("Una dintre cele mai interesante evoluții din ultimii ani este apariția portalurilor dedicate clienților."),
    p("Acestea permit accesul la:"),
    bullet("documente"),
    bullet("actualizări"),
    bullet("mesaje"),
    bullet("informații despre proiecte sau dosare"),
    p("Pentru client, beneficiul principal este transparența."),
    p("Pentru firmă, avantajul este reducerea activităților administrative repetitive și o comunicare mai eficientă."),
    p("Pe măsură ce aceste sisteme devin mai accesibile, ele încep să fie adoptate inclusiv în industrii tradițional conservatoare."),

    pullQuote("Tehnologia nu înlocuiește încrederea dintre avocat și client. Ea poate face însă experiența mai clară, mai rapidă și mai ușor de parcurs."),

    h2("Dincolo de website"),
    p("Discuția despre tehnologie nu se limitează la designul unui website. Este vorba despre întregul parcurs al clientului."),
    p("Cum solicită informații. Cum programează o întâlnire. Cum transmite documente. Cum urmărește progresul unui proiect. Cum primește actualizări."),
    p("Experiența digitală începe să includă tot mai multe puncte de contact care până de curând erau gestionate exclusiv manual."),

    callout("De reținut", ""),
    bullet("formularele inteligente reduc timpul de răspuns"),
    bullet("programările online simplifică accesul la servicii"),
    bullet("portalurile pentru clienți cresc transparența"),
    bullet("automatizările reduc activitățile repetitive"),
    bullet("AI poate susține comunicarea și accesul la informații"),

    figure(fig2, "Portal digital pentru comunicarea și schimbul de documente cu clienții", capF2Ro, capF2En),

    h2("Ce înseamnă asta pentru industrie"),
    p("Expertiza juridică va rămâne întotdeauna fundamentul unei firme de avocatură. Tehnologia nu schimbă acest lucru."),
    p("Schimbă însă modul în care clienții accesează și experimentează această expertiză."),
    p("Pe măsură ce așteptările digitale continuă să crească, experiența devine un factor tot mai important în percepția serviciilor profesionale."),
    p("Firmele care investesc în procese mai clare și interacțiuni mai eficiente au oportunitatea de a reduce fricțiunea și de a construi relații mai bune cu clienții lor."),

    statement("Experiența este parte din serviciu", "În avocatură, valoarea este creată prin expertiză. Modul în care această expertiză este accesată și experimentată începe însă să conteze tot mai mult. Tehnologia oferă oportunitatea de a transforma procese complexe în experiențe mai clare, mai eficiente și mai ușor de utilizat."),
  ];

  const bodyEn = [
    lead("For many clients, the legal experience begins before the first conversation with a lawyer."),
    p("In the past, the relationship between a client and a law firm almost always began with a phone call or a meeting."),
    p("Today, the first contact most often happens online."),
    p("Users look for information. They compare options. They analyze websites. They look for answers. They try to understand whether they've come to the right place."),
    p("In this context, technology is no longer just an internal tool. It becomes part of the experience the firm offers."),

    h2("The experience begins before the first call"),
    p("A potential client often lands on the website before talking to anyone on the team."),
    p("If the information is hard to find. If the services are hard to understand. If the next step isn't clear."),
    p("There's a good chance the user will leave the website before getting in touch with the firm."),
    p("Technology can reduce this friction."),
    p("Clearer forms. Online scheduling. Automatic confirmations. Simple, intuitive flows."),
    p("All of this contributes to an experience that's easier to navigate."),

    figure(fig1, "A modern law firm website with contact and scheduling", capF1Ro, capF1En),

    h2("User expectations are changing"),
    p("Every day, people use banking apps, delivery services and digital platforms that work fast and intuitively."),
    p("These experiences shape how they perceive all other services. Including legal services."),
    p("Clients appreciate:"),
    bullet("online scheduling"),
    bullet("efficient forms"),
    bullet("fast access to information"),
    bullet("automatic confirmations"),
    bullet("clear communication"),
    p("Not because technology replaces the human relationship. But because it removes the unnecessary steps between the client and the expertise they need."),

    h2("Client portals are becoming increasingly relevant"),
    p("One of the most interesting developments in recent years is the emergence of dedicated client portals."),
    p("They provide access to:"),
    bullet("documents"),
    bullet("updates"),
    bullet("messages"),
    bullet("information about projects or cases"),
    p("For the client, the main benefit is transparency."),
    p("For the firm, the advantage is reducing repetitive administrative work and more efficient communication."),
    p("As these systems become more accessible, they start being adopted even in traditionally conservative industries."),

    pullQuote("Technology doesn't replace the trust between a lawyer and a client. But it can make the experience clearer, faster and easier to navigate."),

    h2("Beyond the website"),
    p("The conversation about technology isn't limited to the design of a website. It's about the entire client journey."),
    p("How they request information. How they schedule a meeting. How they send documents. How they track a project's progress. How they receive updates."),
    p("The digital experience starts to include more and more touchpoints that until recently were handled exclusively by hand."),

    callout("Worth keeping in mind", ""),
    bullet("smart forms reduce response time"),
    bullet("online scheduling simplifies access to services"),
    bullet("client portals increase transparency"),
    bullet("automations reduce repetitive work"),
    bullet("AI can support communication and access to information"),

    figure(fig2, "A digital portal for communication and document exchange with clients", capF2Ro, capF2En),

    h2("What this means for the industry"),
    p("Legal expertise will always remain the foundation of a law firm. Technology doesn't change this."),
    p("It does change how clients access and experience that expertise."),
    p("As digital expectations keep rising, experience becomes an increasingly important factor in how professional services are perceived."),
    p("Firms that invest in clearer processes and more efficient interactions have the opportunity to reduce friction and build better relationships with their clients."),

    statement("Experience is part of the service", "In law, value is created through expertise. But how that expertise is accessed and experienced is starting to matter more and more. Technology offers the opportunity to turn complex processes into experiences that are clearer, more efficient and easier to use."),
  ];

  const doc = {
    _type: "article",
    category: "technology",
    slug: { _type: "slug", current: "cum-poate-tehnologia-sa-imbunatateasca-experienta-clientilor-in-avocatura" },
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: false,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Tehnologie și experiență digitală în serviciile de avocatură" },
    topics: ["Tehnologie", "Avocatură", "Experiență digitală"],
    titleRo: "Cum poate tehnologia să îmbunătățească experiența clienților în avocatură",
    subtitleRo: "De la formulare inteligente și programări online până la portaluri dedicate, tehnologia începe să transforme modul în care firmele de avocatură comunică și livrează servicii.",
    excerptRo: "Primul contact cu o firmă de avocatură are loc tot mai des online. Tehnologia — formulare, programări, portaluri — devine parte din experiența pe care firma o oferă, nu doar un instrument intern.",
    bodyRo,
    titleEn: "How technology can improve client experience in law",
    subtitleEn: "From smart forms and online scheduling to dedicated portals, technology is starting to transform how law firms communicate and deliver services.",
    excerptEn: "The first contact with a law firm increasingly happens online. Technology — forms, scheduling, portals — becomes part of the experience a firm offers, not just an internal tool.",
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
