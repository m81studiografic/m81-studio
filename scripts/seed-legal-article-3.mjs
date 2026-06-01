// Articol Industry Research / Legal #3 (RO + EN, cover + 2 imagini).
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

  const coverId = await upload("https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2400&q=80", "legal3-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=2000&q=80", "legal3-materiale.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80", "legal3-interactiune.jpg");

  const capF1Ro = "Website și materiale de prezentare utilizate de o firmă de avocatură.";
  const capF1En = "Website and presentation materials used by a law firm.";
  const capF2Ro = "Interacțiune profesională între client și reprezentanții unei firme de avocatură.";
  const capF2En = "A professional interaction between a client and the representatives of a law firm.";

  const bodyRo = [
    lead("Înainte ca un client să cunoască experiența și competențele unui avocat, își formează deja o impresie despre profesionalismul firmei prin intermediul brandingului, comunicării și experienței digitale."),
    p("Industria de avocatură funcționează pe baza încrederii. Clienții aleg firme și avocați pentru situații importante, adesea complexe și cu impact semnificativ asupra afacerilor sau vieții personale."),
    p("În majoritatea cazurilor, înainte de prima întâlnire există deja o etapă de documentare. Clientul vizitează website-ul. Citește informațiile disponibile. Analizează echipa. Compară mai multe opțiuni."),
    p("În această etapă, competența juridică nu poate fi evaluată direct. În schimb, oamenii se bazează pe semnale care îi ajută să își formeze o primă impresie."),

    h2("Profesionalismul este perceput înainte de a fi demonstrat"),
    p("În multe servicii profesionale, valoarea reală devine evidentă după începerea colaborării. Avocatura nu face excepție."),
    p("Înainte să lucreze efectiv cu o firmă, clientul încearcă să răspundă la câteva întrebări simple:"),
    bullet("Par organizați?"),
    bullet("Par credibili?"),
    bullet("Inspiră încredere?"),
    bullet("Înțeleg problema mea?"),
    p("Brandingul contribuie la aceste răspunsuri. Nu prin promisiuni. Nu prin marketing agresiv. Ci prin modul în care firma se prezintă și comunică."),

    figure(fig1, "Birou cu materiale de prezentare — comunicarea unei firme de avocatură", capF1Ro, capF1En),

    h2("Ce transmite brandingul unei firme de avocatură"),
    p("Brandingul este adesea asociat cu identitatea vizuală. În realitate, influența sa este mai amplă."),
    p("Website-ul. Structura informațiilor. Claritatea serviciilor. Prezentarea echipei. Experiența de contact."),
    p("Toate contribuie la imaginea pe care oamenii și-o formează despre firmă."),
    p("Atunci când aceste elemente sunt coerente și ușor de înțeles, profesionalismul este perceput mai clar. Atunci când sunt fragmentate sau confuze, apare incertitudinea."),
    p("Într-o industrie în care încrederea contează enorm, această percepție poate influența decizia de contact."),

    h2("Observații din industrie"),
    p("În analiza preliminară a firmelor de avocatură observăm frecvent un contrast interesant."),
    p("Nivelul expertizei este ridicat. Calitatea serviciilor este ridicată. Experiența digitală este însă mult mai variabilă."),
    p("Unele firme reușesc să comunice clar cine sunt și ce oferă. Altele transmit mai greu aceste informații, chiar dacă au competențe similare."),
    p("Această diferență poate influența modul în care profesionalismul este perceput de potențialii clienți."),

    pullQuote("În avocatură, brandingul nu înlocuiește expertiza. El contribuie la modul în care expertiza este percepută înainte de prima colaborare."),

    h2("Ce evaluăm atunci când analizăm profesionalismul perceput"),
    p("În cadrul research-ului observăm mai multe elemente care influențează percepția."),

    callout("De reținut", "Analizăm în mod frecvent:"),
    bullet("claritatea comunicării"),
    bullet("structura și organizarea website-ului"),
    bullet("coerența identității vizuale"),
    bullet("prezentarea serviciilor"),
    bullet("experiența de contact și accesibilitatea informațiilor"),

    figure(fig2, "Două persoane analizând documente împreună — interacțiune profesională", capF2Ro, capF2En),

    h2("Ce înseamnă asta pentru industrie"),
    p("Pe măsură ce experiențele digitale devin tot mai importante, brandingul începe să influențeze mai mult prima impresie."),
    p("Acest lucru nu înlocuiește experiența, reputația sau competența juridică. Acestea rămân fundamentale."),
    p("Totuși, înainte ca ele să poată fi evaluate direct, clienții se bazează pe semnale vizibile. Modul în care o firmă comunică și se prezintă devine parte din procesul prin care încrederea începe să fie construită."),

    statement("Observație principală", "În industria de avocatură, brandingul influențează percepția profesionalismului prin experiențele și semnalele pe care le transmite înainte de primul contact. Într-un domeniu bazat pe încredere, aceste elemente contribuie la formarea primei impresii și la modul în care o firmă este percepută de potențialii clienți."),
  ];

  const bodyEn = [
    lead("Before a client gets to know a lawyer's experience and skills, they already form an impression of the firm's professionalism through its branding, communication and digital experience."),
    p("The legal industry runs on trust. Clients choose firms and lawyers for important situations — often complex and with a significant impact on their business or personal life."),
    p("In most cases, before the first meeting there's already a research stage. The client visits the website. Reads the available information. Looks at the team. Compares several options."),
    p("At this stage, legal competence can't be assessed directly. Instead, people rely on signals that help them form a first impression."),

    h2("Professionalism is perceived before it is demonstrated"),
    p("In many professional services, the real value becomes evident after the collaboration begins. Law is no exception."),
    p("Before actually working with a firm, the client tries to answer a few simple questions:"),
    bullet("Do they seem organized?"),
    bullet("Do they seem credible?"),
    bullet("Do they inspire trust?"),
    bullet("Do they understand my problem?"),
    p("Branding contributes to these answers. Not through promises. Not through aggressive marketing. But through the way the firm presents itself and communicates."),

    figure(fig1, "A desk with presentation materials — a law firm's communication", capF1Ro, capF1En),

    h2("What a law firm's branding conveys"),
    p("Branding is often associated with visual identity. In reality, its influence is broader."),
    p("The website. The structure of the information. The clarity of the services. How the team is presented. The contact experience."),
    p("They all contribute to the image people form of the firm."),
    p("When these elements are coherent and easy to understand, professionalism is perceived more clearly. When they're fragmented or confusing, uncertainty appears."),
    p("In an industry where trust matters enormously, this perception can influence the decision to make contact."),

    h2("Observations from the industry"),
    p("In our preliminary analysis of law firms, we frequently notice an interesting contrast."),
    p("The level of expertise is high. The quality of services is high. The digital experience, however, is much more variable."),
    p("Some firms manage to clearly communicate who they are and what they offer. Others convey this information with more difficulty, even when they have similar skills."),
    p("This difference can influence how professionalism is perceived by potential clients."),

    pullQuote("In law, branding doesn't replace expertise. It shapes how that expertise is perceived before the first collaboration."),

    h2("What we evaluate when we analyze perceived professionalism"),
    p("As part of the research, we observe several elements that influence perception."),

    callout("Worth keeping in mind", "We frequently analyze:"),
    bullet("the clarity of communication"),
    bullet("the structure and organization of the website"),
    bullet("the consistency of the visual identity"),
    bullet("how the services are presented"),
    bullet("the contact experience and the accessibility of information"),

    figure(fig2, "Two people reviewing documents together — a professional interaction", capF2Ro, capF2En),

    h2("What this means for the industry"),
    p("As digital experiences become increasingly important, branding starts to influence the first impression more."),
    p("This doesn't replace experience, reputation or legal competence. These remain fundamental."),
    p("Still, before they can be assessed directly, clients rely on visible signals. The way a firm communicates and presents itself becomes part of the process through which trust begins to be built."),

    statement("Main observation", "In the legal industry, branding shapes the perception of professionalism through the experiences and signals it conveys before the first contact. In a field based on trust, these elements contribute to forming the first impression and to how a firm is perceived by potential clients."),
  ];

  const doc = {
    _type: "article",
    category: "research",
    subcategory: "legal",
    slug: { _type: "slug", current: "cum-influenteaza-brandingul-perceptia-profesionalismului-in-avocatura" },
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Strângere de mână profesională — percepția profesionalismului în avocatură, înainte de primul contact",
    },
    topics: ["Avocatură", "Branding", "Profesionalism"],
    titleRo: "Cum influențează brandingul percepția profesionalismului în avocatură",
    subtitleRo: "Într-o industrie bazată pe încredere, brandingul contribuie la modul în care profesionalismul este perceput înainte de primul contact.",
    excerptRo: "Înainte ca un client să evalueze experiența și competențele unui avocat, brandingul, comunicarea și experiența digitală au format deja o impresie despre profesionalismul firmei.",
    bodyRo,
    titleEn: "How branding shapes the perception of professionalism in law",
    subtitleEn: "In an industry based on trust, branding shapes how professionalism is perceived before the first contact.",
    excerptEn: "Before a client can assess a lawyer's experience and skills, branding, communication and digital experience have already formed an impression of the firm's professionalism.",
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
