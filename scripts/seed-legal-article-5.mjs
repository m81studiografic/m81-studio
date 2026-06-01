// Articol Industry Research / Legal #5 (RO + EN, cover + 2 imagini).
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

  const coverId = await upload("https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2400&q=80", "legal5-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=2000&q=80", "legal5-organizare.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?auto=format&fit=crop&w=2000&q=80", "legal5-mobil.jpg");

  const capF1Ro = "Website modern de avocatură cu informații organizate și accesibile.";
  const capF1En = "A modern law firm website with organized, accessible information.";
  const capF2Ro = "Utilizator accesând informații juridice de pe un dispozitiv mobil.";
  const capF2En = "A user accessing legal information on a mobile device.";

  const bodyRo = [
    lead("Pentru mulți potențiali clienți, website-ul unei firme de avocatură reprezintă primul contact cu organizația și unul dintre primele criterii prin care aceasta este evaluată."),
    p("În trecut, website-urile aveau în principal rolul de a oferi informații de bază. Astăzi, ele au devenit parte din experiența prin care oamenii descoperă, înțeleg și compară firmele de avocatură."),
    p("Înainte de primul apel sau prima întâlnire, clienții caută răspunsuri. Vor să înțeleagă dacă au ajuns în locul potrivit. Vor să afle dacă firma are experiență relevantă. Vor să știe cât de ușor pot intra în contact."),
    p("Din acest motiv, așteptările față de experiența digitală sunt diferite față de cele de acum câțiva ani."),

    h2("Clienții caută claritate"),
    p("Atunci când cineva ajunge pe website-ul unei firme de avocatură, una dintre primele întrebări este simplă: cu ce se ocupă această firmă?"),
    p("Mulți utilizatori nu caută explicații complexe. Ei caută orientare."),
    p("Domenii de practică prezentate clar. Servicii ușor de înțeles. Informații accesibile. O structură logică."),
    p("Website-urile care facilitează această orientare permit utilizatorilor să înțeleagă mai rapid dacă firma este relevantă pentru nevoile lor."),

    figure(fig1, "Organizarea structurii și informațiilor unui website modern de avocatură", capF1Ro, capF1En),

    h2("Utilizatorii se așteaptă la experiențe digitale simple"),
    p("În viața de zi cu zi, oamenii utilizează aplicații și platforme care oferă experiențe rapide și intuitive. Aceste așteptări se transferă și în relația cu firmele de avocatură."),
    p("Navigarea simplă. Website-uri optimizate pentru mobil. Timp de încărcare redus. Informații ușor de găsit. Procese de contact clare."),
    p("Aceste elemente contribuie la o experiență mai eficientă și mai confortabilă pentru utilizatori."),
    p("În multe cazuri, experiența digitală influențează prima impresie înainte ca expertiza juridică să poată fi evaluată."),

    h2("Încrederea se construiește prin transparență"),
    p("O altă așteptare importantă este accesul la informații relevante. Clienții vor să înțeleagă cu cine urmează să lucreze."),
    p("Vor să descopere echipa. Vor să înțeleagă domeniile de expertiză. Vor să afle experiența și specializările firmei."),
    p("Transparența contribuie la reducerea incertitudinii și facilitează procesul de selecție."),

    pullQuote("Un website modern nu trebuie să impresioneze prin complexitate. Trebuie să ajute oamenii să găsească rapid informațiile de care au nevoie."),

    h2("Ce evaluăm atunci când analizăm website-urile din industrie"),
    p("În cadrul research-ului observăm mai multe elemente care influențează experiența utilizatorilor."),

    callout("De reținut", "Analizăm frecvent:"),
    bullet("claritatea structurii și a navigării"),
    bullet("prezentarea serviciilor și a domeniilor de practică"),
    bullet("experiența pe mobil"),
    bullet("accesibilitatea informațiilor de contact"),
    bullet("prezentarea echipei"),
    bullet("viteza și performanța website-ului"),

    figure(fig2, "Persoană accesând informații de pe telefon — experiența mobilă", capF2Ro, capF2En),

    h2("Ce înseamnă asta pentru industrie"),
    p("Pe măsură ce competiția crește și comportamentul utilizatorilor evoluează, website-ul devine o componentă tot mai importantă a experienței generale."),
    p("Clienții continuă să aleagă firme de avocatură pe baza expertizei, reputației și recomandărilor. Însă înainte de toate acestea există o etapă de documentare."),
    p("În această etapă, website-ul contribuie la modul în care firma este înțeleasă și percepută."),
    p("Experiențele digitale clare și bine organizate răspund mai bine așteptărilor utilizatorilor și facilitează procesul de informare."),

    statement("Observație principală", "Clienții se așteaptă ca website-urile firmelor de avocatură să ofere claritate, accesibilitate și o experiență digitală simplă. Pe măsură ce aceste așteptări continuă să crească, website-ul devine un element important în modul în care firmele sunt evaluate și înțelese înainte de primul contact."),
  ];

  const bodyEn = [
    lead("For many potential clients, a law firm's website is the first contact with the organization and one of the first criteria by which it's evaluated."),
    p("In the past, websites mainly served to provide basic information. Today, they've become part of the experience through which people discover, understand and compare law firms."),
    p("Before the first call or first meeting, clients look for answers. They want to understand whether they've come to the right place. They want to find out whether the firm has relevant experience. They want to know how easily they can get in touch."),
    p("For this reason, expectations of the digital experience are different from those of a few years ago."),

    h2("Clients look for clarity"),
    p("When someone lands on a law firm's website, one of the first questions is simple: what does this firm do?"),
    p("Many users aren't looking for complex explanations. They're looking for orientation."),
    p("Practice areas presented clearly. Services that are easy to understand. Accessible information. A logical structure."),
    p("Websites that make this orientation easier let users understand more quickly whether the firm is relevant to their needs."),

    figure(fig1, "Organizing the structure and information of a modern law firm website", capF1Ro, capF1En),

    h2("Users expect simple digital experiences"),
    p("In everyday life, people use apps and platforms that offer fast, intuitive experiences. These expectations carry over into their relationship with law firms too."),
    p("Simple navigation. Mobile-optimized websites. Short loading times. Information that's easy to find. Clear contact processes."),
    p("These elements contribute to a more efficient and more comfortable experience for users."),
    p("In many cases, the digital experience shapes the first impression before legal expertise can be assessed."),

    h2("Trust is built through transparency"),
    p("Another important expectation is access to relevant information. Clients want to understand who they're going to work with."),
    p("They want to discover the team. They want to understand the areas of expertise. They want to find out the firm's experience and specializations."),
    p("Transparency helps reduce uncertainty and makes the selection process easier."),

    pullQuote("A modern website doesn't have to impress through complexity. It has to help people quickly find the information they need."),

    h2("What we evaluate when we analyze industry websites"),
    p("As part of the research, we observe several elements that influence the user experience."),

    callout("Worth keeping in mind", "We frequently analyze:"),
    bullet("the clarity of the structure and navigation"),
    bullet("how services and practice areas are presented"),
    bullet("the mobile experience"),
    bullet("the accessibility of contact information"),
    bullet("how the team is presented"),
    bullet("the speed and performance of the website"),

    figure(fig2, "A person accessing information on a phone — the mobile experience", capF2Ro, capF2En),

    h2("What this means for the industry"),
    p("As competition grows and user behavior evolves, the website becomes an increasingly important part of the overall experience."),
    p("Clients continue to choose law firms based on expertise, reputation and referrals. But before all of this, there's a research stage."),
    p("At this stage, the website contributes to how the firm is understood and perceived."),
    p("Clear, well-organized digital experiences respond better to user expectations and make the information process easier."),

    statement("Main observation", "Clients expect law firm websites to offer clarity, accessibility and a simple digital experience. As these expectations keep rising, the website becomes an important element in how firms are evaluated and understood before the first contact."),
  ];

  const doc = {
    _type: "article",
    category: "research",
    subcategory: "legal",
    slug: { _type: "slug", current: "ce-asteapta-clientii-de-la-un-website-modern-de-avocatura" },
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Spațiu modern de birou — așteptările clienților față de o firmă de avocatură modernă",
    },
    topics: ["Avocatură", "Website", "Experiență digitală"],
    titleRo: "Ce așteaptă clienții de la un website modern de avocatură",
    subtitleRo: "Pe măsură ce experiențele digitale devin parte din procesul de selecție, așteptările clienților față de website-urile firmelor de avocatură continuă să evolueze.",
    excerptRo: "Website-ul unei firme de avocatură e adesea primul contact și unul dintre primele criterii de evaluare — clienții așteaptă claritate, accesibilitate și o experiență digitală simplă.",
    bodyRo,
    titleEn: "What clients expect from a modern law firm website",
    subtitleEn: "As digital experiences become part of the selection process, clients' expectations of law firm websites keep evolving.",
    excerptEn: "A law firm's website is often the first contact and one of the first criteria by which it's evaluated — clients expect clarity, accessibility and a simple digital experience.",
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
