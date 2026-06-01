// Articol Industry Research / Legal #2 (RO + EN, cover + 2 imagini).
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

  const coverId = await upload("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2400&q=80", "legal2-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=2000&q=80", "legal2-conventii.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2000&q=80", "legal2-digital.jpg");

  const capF1Ro = "Website-urile și identitățile vizuale din industria legală utilizează frecvent aceleași convenții vizuale pentru a transmite încredere și profesionalism.";
  const capF1En = "Websites and visual identities in the legal industry frequently use the same visual conventions to convey trust and professionalism.";
  const capF2Ro = "Pe măsură ce competiția crește, claritatea experienței digitale devine un factor important în modul în care firmele sunt percepute.";
  const capF2En = "As competition grows, the clarity of the digital experience becomes an important factor in how firms are perceived.";

  const bodyRo = [
    lead("Într-o industrie construită pe expertiză și încredere, multe firme de avocatură transmit imagini surprinzător de asemănătoare, ceea ce face diferențierea mai dificilă atât pentru clienți, cât și pentru firme."),
    p("Industria de avocatură este una dintre cele mai competitive și mai mature industrii profesionale. Firmele investesc ani întregi în construirea reputației, în dezvoltarea expertizei și în consolidarea relațiilor cu clienții."),
    p("Cu toate acestea, atunci când analizăm website-urile, identitățile vizuale și comunicarea multor firme, observăm un tipar repetitiv. Deși organizațiile sunt diferite, experiența percepută de client este adesea foarte asemănătoare."),
    p("Această observație nu spune nimic despre calitatea serviciilor juridice oferite. Ea evidențiază însă o oportunitate interesantă la nivel de branding, experiență digitală și poziționare."),

    h2("Profesionalismul a creat un limbaj vizual comun"),
    p("Industria juridică este asociată în mod natural cu stabilitatea, seriozitatea și profesionalismul. Pentru a transmite aceste valori, multe firme au adoptat în timp soluții asemănătoare."),
    p("Palete cromatice conservatoare. Tipografii clasice. Fotografii corporate. Mesaje instituționale. Structuri similare de website."),
    p("Rezultatul este apariția unui limbaj vizual comun care ajută la transmiterea profesionalismului, dar care reduce diferențierea."),
    p("Pentru un potențial client aflat în procesul de căutare, diferențele dintre firme devin adesea greu de observat la prima vedere."),

    figure(fig1, "Fațadă de tribunal cu coloane — convențiile vizuale clasice ale industriei juridice", capF1Ro, capF1En),

    h2("Experiența digitală a rămas în urma serviciilor oferite"),
    p("O altă observație recurentă este diferența dintre nivelul serviciilor și experiența digitală."),
    p("Multe firme oferă servicii premium. Au echipe puternice. Gestionează proiecte complexe. Reprezintă clienți importanți."),
    p("Cu toate acestea, experiența online nu reflectă întotdeauna acest nivel."),
    p("Website-urile sunt deseori încărcate cu text. Navigarea poate fi dificilă. Serviciile sunt prezentate într-un mod greu de parcurs pentru cineva fără experiență juridică. Procesul prin care un client ajunge să contacteze firma este adesea puțin explicat."),
    p("Din perspectiva utilizatorului, apare un decalaj între competența reală și modul în care aceasta este prezentată."),

    pullQuote("Diferențierea nu înseamnă să renunți la profesionalism. Înseamnă să faci mai clar ceea ce te face diferit."),

    h2("Ce evaluează clienții înainte de primul contact"),
    p("Înainte să programeze o întâlnire sau să trimită un email, majoritatea clienților își formează deja o impresie."),
    p("Această impresie este construită din elemente aparent simple:"),
    bullet("website-ul"),
    bullet("claritatea informațiilor"),
    bullet("prezentarea echipei"),
    bullet("structura serviciilor"),
    bullet("ușurința de contact"),
    p("În multe situații, experiența digitală devine primul punct real de interacțiune dintre firmă și potențialul client."),

    callout("De reținut", "În analiza preliminară a industriei am observat frecvent:"),
    bullet("identități vizuale foarte asemănătoare"),
    bullet("poziționare insuficient diferențiată"),
    bullet("website-uri construite după tipare similare"),
    bullet("limbaj dificil pentru publicul non-juridic"),
    bullet("experiențe digitale care nu reflectă nivelul serviciilor oferite"),

    figure(fig2, "Laptop modern cu ecran luminos — experiența digitală a unei firme", capF2Ro, capF2En),

    h2("Ce înseamnă asta pentru industrie"),
    p("Pe măsură ce clienții devin mai obișnuiți cu experiențe digitale moderne în alte domenii, așteptările lor cresc și în relația cu firmele de avocatură."),
    p("Diferențierea nu mai depinde exclusiv de reputație și recomandări. Modul în care o firmă comunică, se prezintă și își organizează experiența digitală începe să influențeze percepția încă din primele minute."),
    p("Această schimbare creează oportunități pentru organizațiile care investesc în claritate, experiență și poziționare."),

    statement("Observație principală", "Industria de avocatură beneficiază de un nivel ridicat de expertiză și profesionalism, însă diferențierea prin branding și experiență digitală rămâne limitată. Într-un context tot mai competitiv, firmele care reușesc să își exprime mai clar identitatea și valoarea oferită au oportunitatea de a deveni mai ușor de înțeles, memorat și ales."),
  ];

  const bodyEn = [
    lead("In an industry built on expertise and trust, many law firms project surprisingly similar images — which makes differentiation harder for clients and firms alike."),
    p("The legal industry is one of the most competitive and mature professional industries. Firms invest years in building reputation, developing expertise and strengthening client relationships."),
    p("And yet, when we analyze the websites, visual identities and communication of many firms, we notice a repetitive pattern. Although the organizations are different, the experience perceived by the client is often very similar."),
    p("This observation says nothing about the quality of the legal services offered. But it highlights an interesting opportunity in branding, digital experience and positioning."),

    h2("Professionalism has created a shared visual language"),
    p("The legal industry is naturally associated with stability, seriousness and professionalism. To convey these values, many firms have over time adopted similar solutions."),
    p("Conservative color palettes. Classic typography. Corporate photography. Institutional messaging. Similar website structures."),
    p("The result is the emergence of a shared visual language that helps convey professionalism but reduces differentiation."),
    p("For a potential client in the search process, the differences between firms often become hard to notice at first glance."),

    figure(fig1, "A courthouse façade with columns — the classic visual conventions of the legal industry", capF1Ro, capF1En),

    h2("The digital experience has fallen behind the services offered"),
    p("Another recurring observation is the gap between the level of services and the digital experience."),
    p("Many firms offer premium services. They have strong teams. They handle complex projects. They represent important clients."),
    p("And yet, the online experience doesn't always reflect this level."),
    p("Websites are often overloaded with text. Navigation can be difficult. Services are presented in a way that's hard to follow for someone without legal experience. The process by which a client comes to contact the firm is often barely explained."),
    p("From the user's perspective, a gap appears between real competence and the way it's presented."),

    pullQuote("Differentiation doesn't mean giving up professionalism. It means making clearer what makes you different."),

    h2("What clients evaluate before the first contact"),
    p("Before scheduling a meeting or sending an email, most clients have already formed an impression."),
    p("This impression is built from seemingly simple elements:"),
    bullet("the website"),
    bullet("the clarity of the information"),
    bullet("how the team is presented"),
    bullet("the structure of the services"),
    bullet("the ease of getting in touch"),
    p("In many situations, the digital experience becomes the first real point of interaction between the firm and the potential client."),

    callout("Worth keeping in mind", "In our preliminary analysis of the industry, we frequently observed:"),
    bullet("very similar visual identities"),
    bullet("insufficiently differentiated positioning"),
    bullet("websites built on similar patterns"),
    bullet("language that's difficult for a non-legal audience"),
    bullet("digital experiences that don't reflect the level of services offered"),

    figure(fig2, "A modern laptop with a bright screen — a firm's digital experience", capF2Ro, capF2En),

    h2("What this means for the industry"),
    p("As clients grow accustomed to modern digital experiences in other fields, their expectations rise in their relationship with law firms too."),
    p("Differentiation no longer depends solely on reputation and referrals. The way a firm communicates, presents itself and organizes its digital experience starts to influence perception from the very first minutes."),
    p("This shift creates opportunities for organizations that invest in clarity, experience and positioning."),

    statement("Main observation", "The legal industry benefits from a high level of expertise and professionalism, but differentiation through branding and digital experience remains limited. In an increasingly competitive context, firms that manage to express their identity and value more clearly have the opportunity to become easier to understand, remember and choose."),
  ];

  const doc = {
    _type: "article",
    category: "research",
    subcategory: "legal",
    slug: { _type: "slug", current: "de-ce-majoritatea-firmelor-de-avocatura-arata-la-fel" },
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Statueta Justiției — analiză a diferențierii în industria de avocatură",
    },
    topics: ["Avocatură", "Branding", "Diferențiere"],
    titleRo: "De ce majoritatea firmelor de avocatură arată la fel",
    subtitleRo: "O analiză a modului în care brandingul, comunicarea și experiența digitală contribuie la o diferențiere redusă în industria de avocatură.",
    excerptRo: "Multe firme de avocatură transmit imagini surprinzător de asemănătoare. O analiză a modului în care brandingul, comunicarea și experiența digitală reduc diferențierea — și unde apare oportunitatea.",
    bodyRo,
    titleEn: "Why most law firms look the same",
    subtitleEn: "An analysis of how branding, communication and digital experience contribute to low differentiation in the legal industry.",
    excerptEn: "Many law firms project surprisingly similar images. An analysis of how branding, communication and digital experience reduce differentiation — and where the opportunity lies.",
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
