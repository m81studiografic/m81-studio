// Articol Industry Research / Legal #4 (RO + EN, cover + 2 imagini).
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

  const coverId = await upload("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=2400&q=80", "legal4-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=2000&q=80", "legal4-wireframe.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?auto=format&fit=crop&w=2000&q=80", "legal4-mobil.jpg");

  const capF1Ro = "Pagina principală a unei firme de avocatură și elementele care contribuie la prima impresie.";
  const capF1En = "A law firm's homepage and the elements that shape the first impression.";
  const capF2Ro = "Utilizator navigând website-ul unei firme de avocatură de pe un dispozitiv mobil.";
  const capF2En = "A user browsing a law firm's website on a mobile device.";

  const bodyRo = [
    lead("Primele 30 de secunde petrecute pe website-ul unei firme de avocatură pot influența dacă un potențial client continuă să exploreze sau decide să plece."),
    p("Pentru multe firme de avocatură, website-ul reprezintă primul punct de contact cu un potențial client. Înainte de un telefon. Înainte de un email. Înainte de o întâlnire."),
    p("Clientul ajunge pe website și încearcă să înțeleagă rapid dacă se află în locul potrivit."),
    p("Această evaluare se întâmplă surprinzător de repede. De cele mai multe ori, oamenii nu citesc fiecare paragraf. Ei caută indicii. Semnale. Elemente care îi ajută să decidă dacă merită să continue."),

    h2("Prima impresie se formează înainte de lectură"),
    p("Atunci când ajunge pe homepage, un vizitator observă mai întâi aspecte generale."),
    p("Designul. Structura. Ordinea informațiilor. Calitatea imaginilor. Claritatea mesajului principal."),
    p("În primele secunde, clientul nu analizează competența juridică. Încearcă să răspundă la întrebări simple:"),
    bullet("Cine sunt acești oameni?"),
    bullet("Par profesioniști?"),
    bullet("Înțeleg rapid ce fac?"),
    bullet("Pot avea încredere în ei?"),
    p("Website-ul devine astfel un sistem de semnale care contribuie la prima impresie."),

    figure(fig1, "Wireframe al unei pagini web — structura unei homepage de firmă de avocatură", capF1Ro, capF1En),

    h2("Claritatea este mai importantă decât cantitatea de informații"),
    p("O observație frecventă în industrie este tendința de a include foarte mult conținut încă de la început."),
    p("Servicii. Descrieri. Istoric. Echipă. Premii. Publicații."),
    p("Pentru client, această cantitate mare de informații poate deveni dificil de parcurs."),
    p("În primele 30 de secunde oamenii caută claritate. Vor să înțeleagă rapid:"),
    bullet("Ce face firma?"),
    bullet("Pentru cine lucrează?"),
    bullet("Ce tip de probleme rezolvă?"),
    bullet("Cum poate fi contactată?"),
    p("Atunci când aceste răspunsuri sunt ușor de găsit, experiența devine mai eficientă."),

    h2("Ce observă clienții fără să își dea seama"),
    p("Există și elemente care influențează percepția în mod indirect."),
    p("Viteza website-ului. Experiența pe mobil. Coerența designului. Calitatea fotografiilor. Modul în care sunt prezentate informațiile."),
    p("Aceste detalii contribuie la percepția generală asupra firmei. Deși rareori sunt analizate conștient, ele influențează nivelul de încredere pe care utilizatorul îl dezvoltă în primele minute."),

    pullQuote("În primele 30 de secunde, oamenii nu caută toate răspunsurile. Caută suficiente motive pentru a continua."),

    h2("Ce evaluăm atunci când analizăm experiența inițială"),
    p("În cadrul research-ului observăm mai multe elemente care influențează primele impresii."),

    callout("De reținut", "Analizăm frecvent:"),
    bullet("claritatea mesajului principal"),
    bullet("organizarea informațiilor"),
    bullet("ușurința navigării"),
    bullet("experiența pe mobil"),
    bullet("vizibilitatea opțiunilor de contact"),
    bullet("consistența identității vizuale"),

    figure(fig2, "Persoană navigând pe telefon — experiența mobilă a website-ului", capF2Ro, capF2En),

    h2("Ce înseamnă asta pentru industrie"),
    p("Pe măsură ce comportamentul utilizatorilor se schimbă, website-ul devine tot mai important în procesul de selecție."),
    p("Mulți clienți compară mai multe firme înainte de primul contact."),
    p("În acest context, experiența inițială poate influența dacă o firmă este explorată în continuare sau eliminată din procesul de selecție."),
    p("Nu pentru că website-ul înlocuiește expertiza. Ci pentru că reprezintă primul contact cu aceasta."),

    statement("Observație principală", "Primele 30 de secunde petrecute pe website-ul unei firme de avocatură sunt dedicate evaluării încrederii, clarității și profesionalismului perceput. În această etapă, utilizatorii caută semnale care să îi ajute să decidă dacă merită să continue relația cu firma."),
  ];

  const bodyEn = [
    lead("The first 30 seconds spent on a law firm's website can influence whether a potential client keeps exploring or decides to leave."),
    p("For many law firms, the website is the first point of contact with a potential client. Before a phone call. Before an email. Before a meeting."),
    p("The client lands on the website and tries to quickly understand whether they're in the right place."),
    p("This evaluation happens surprisingly fast. Most of the time, people don't read every paragraph. They look for clues. Signals. Elements that help them decide whether it's worth continuing."),

    h2("The first impression forms before reading"),
    p("When they land on the homepage, a visitor first notices the general aspects."),
    p("The design. The structure. The order of the information. The quality of the images. The clarity of the main message."),
    p("In the first seconds, the client isn't analyzing legal competence. They're trying to answer simple questions:"),
    bullet("Who are these people?"),
    bullet("Do they seem professional?"),
    bullet("Do I quickly understand what they do?"),
    bullet("Can I trust them?"),
    p("The website thus becomes a system of signals that contributes to the first impression."),

    figure(fig1, "A website wireframe — the structure of a law firm's homepage", capF1Ro, capF1En),

    h2("Clarity matters more than the amount of information"),
    p("A frequent observation in the industry is the tendency to include a great deal of content right from the start."),
    p("Services. Descriptions. History. Team. Awards. Publications."),
    p("For the client, this large amount of information can become hard to navigate."),
    p("In the first 30 seconds, people look for clarity. They want to quickly understand:"),
    bullet("What does the firm do?"),
    bullet("Who does it work for?"),
    bullet("What kind of problems does it solve?"),
    bullet("How can it be contacted?"),
    p("When these answers are easy to find, the experience becomes more efficient."),

    h2("What clients notice without realizing it"),
    p("There are also elements that influence perception indirectly."),
    p("The website's speed. The mobile experience. The consistency of the design. The quality of the photos. The way the information is presented."),
    p("These details contribute to the overall perception of the firm. Although they're rarely analyzed consciously, they influence the level of trust the user develops in the first minutes."),

    pullQuote("In the first 30 seconds, people aren't looking for all the answers. They're looking for enough reasons to continue."),

    h2("What we evaluate when we analyze the initial experience"),
    p("As part of the research, we observe several elements that influence first impressions."),

    callout("Worth keeping in mind", "We frequently analyze:"),
    bullet("the clarity of the main message"),
    bullet("the organization of the information"),
    bullet("the ease of navigation"),
    bullet("the mobile experience"),
    bullet("the visibility of contact options"),
    bullet("the consistency of the visual identity"),

    figure(fig2, "A person browsing on a phone — the website's mobile experience", capF2Ro, capF2En),

    h2("What this means for the industry"),
    p("As user behavior changes, the website becomes increasingly important in the selection process."),
    p("Many clients compare several firms before the first contact."),
    p("In this context, the initial experience can influence whether a firm keeps being explored or is eliminated from the selection process."),
    p("Not because the website replaces expertise. But because it's the first contact with it."),

    statement("Main observation", "The first 30 seconds spent on a law firm's website are devoted to evaluating trust, clarity and perceived professionalism. At this stage, users look for signals that help them decide whether it's worth continuing the relationship with the firm."),
  ];

  const doc = {
    _type: "article",
    category: "research",
    subcategory: "legal",
    slug: { _type: "slug", current: "primele-30-de-secunde-pe-website-ul-unei-firme-de-avocatura" },
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Laptop modern — primele secunde pe website-ul unei firme de avocatură",
    },
    topics: ["Avocatură", "Website", "Experiență digitală"],
    titleRo: "Ce vede un potențial client în primele 30 de secunde pe website-ul unei firme de avocatură",
    subtitleRo: "Înainte să citească despre servicii sau să contacteze firma, un potențial client își formează deja o primă impresie despre profesionalism, claritate și încredere.",
    excerptRo: "Primele 30 de secunde pe website-ul unei firme de avocatură pot decide dacă un client continuă sau pleacă — cu mult înainte ca el să poată evalua competența juridică.",
    bodyRo,
    titleEn: "What a potential client sees in the first 30 seconds on a law firm's website",
    subtitleEn: "Before reading about services or contacting the firm, a potential client already forms a first impression of professionalism, clarity and trust.",
    excerptEn: "The first 30 seconds on a law firm's website can decide whether a potential client keeps exploring or leaves — long before they assess any legal competence.",
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
