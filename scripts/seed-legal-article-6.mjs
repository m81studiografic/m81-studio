// Articol Industry Research / Legal #6 (RO + EN, cover + 2 imagini).
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

  const coverId = await upload("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80", "legal6-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=2000&q=80", "legal6-structura.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=2000&q=80", "legal6-digital.jpg");

  const capF1Ro = "Website de avocatură cu structură clară și informații ușor de parcurs.";
  const capF1En = "A law firm website with a clear structure and easy-to-scan information.";
  const capF2Ro = "Utilizator navigând și căutând informații juridice într-un mediu digital.";
  const capF2En = "A user browsing and searching for legal information in a digital environment.";

  const bodyRo = [
    lead("Atunci când expertiza și reputația sunt comparabile, experiența pe care o oferă o firmă poate deveni unul dintre elementele care o diferențiază."),
    p("Industria de avocatură este construită pe competență, încredere și relații profesionale. Aceste elemente rămân fundamentale."),
    p("Totuși, înainte ca un client să experimenteze serviciile unei firme, există numeroase interacțiuni care îi influențează percepția."),
    p("Website-ul. Procesul de contact. Claritatea informațiilor. Modul în care înțelege serviciile. Ușurința cu care găsește răspunsuri."),
    p("Toate acestea fac parte din experiența utilizatorului, cunoscută și sub numele de UX (User Experience)."),

    h2("UX-ul începe înainte de primul contact"),
    p("Mulți oameni asociază UX-ul exclusiv cu designul unui website. În realitate, UX-ul reprezintă întreaga experiență pe care o are o persoană atunci când interacționează cu o organizație."),
    p("În avocatură, această experiență începe adesea online."),
    p("Un potențial client ajunge pe website și încearcă să răspundă rapid la câteva întrebări:"),
    bullet("Înțeleg ce servicii oferă firma?"),
    bullet("Găsesc ușor informațiile?"),
    bullet("Știu care este următorul pas?"),
    bullet("Pot contacta rapid echipa?"),
    p("Atunci când răspunsurile apar natural, experiența devine mai simplă și mai confortabilă."),

    figure(fig1, "Structura clară a unui website de avocatură", capF1Ro, capF1En),

    h2("Clienții compară experiențe, nu doar servicii"),
    p("În multe situații, utilizatorii vizitează mai multe website-uri înainte de a contacta o firmă."),
    p("Serviciile pot părea similare. Domeniile de practică pot fi similare. Nivelul de expertiză poate fi dificil de evaluat."),
    p("În schimb, experiența este imediat vizibilă."),
    p("Un website rapid. O navigare intuitivă. Informații clare. Formulare simple. Procese ușor de înțeles."),
    p("Aceste detalii contribuie la percepția generală și influențează decizia de a continua explorarea."),

    h2("Reducerea incertitudinii este parte din experiență"),
    p("Persoanele care caută servicii juridice se confruntă adesea cu situații complexe și uneori stresante. În aceste momente, claritatea devine importantă."),
    p("Oamenii vor să știe:"),
    bullet("Cum funcționează colaborarea?"),
    bullet("Ce urmează după contact?"),
    bullet("Cine se ocupă de cazul lor?"),
    bullet("Cum pot obține răspunsuri?"),
    p("Firmele care reușesc să răspundă acestor întrebări într-un mod simplu reduc incertitudinea și creează o experiență mai bună pentru utilizatori."),

    pullQuote("În multe cazuri, clienții nu compară doar avocați. Compară experiențele pe care le întâlnesc înainte de primul contact."),

    h2("Ce evaluăm atunci când analizăm UX-ul în avocatură"),
    p("În cadrul research-ului observăm mai multe elemente care influențează experiența utilizatorului."),

    callout("De reținut", "Analizăm frecvent:"),
    bullet("claritatea structurii website-ului"),
    bullet("ușurința navigării"),
    bullet("experiența pe dispozitive mobile"),
    bullet("accesibilitatea informațiilor"),
    bullet("procesul de contact"),
    bullet("modul în care este explicată colaborarea cu firma"),

    figure(fig2, "Echipă într-un mediu digital de lucru — căutarea și organizarea informațiilor", capF2Ro, capF2En),

    h2("Ce înseamnă asta pentru industrie"),
    p("Pe măsură ce experiențele digitale din alte domenii continuă să evolueze, așteptările utilizatorilor cresc și în relația cu firmele de avocatură."),
    p("UX-ul nu înlocuiește expertiza juridică. Nu înlocuiește reputația. Nu înlocuiește rezultatele."),
    p("Însă poate influența modul în care o firmă este percepută înainte ca aceste aspecte să poată fi evaluate direct."),
    p("Într-o piață competitivă, experiența utilizatorului poate deveni un factor suplimentar de diferențiere."),

    statement("Observație principală", "În avocatură, experiența utilizatorului contribuie la modul în care firmele sunt percepute încă din primele interacțiuni. Pe măsură ce clienții compară tot mai multe opțiuni online, UX-ul devine un element care poate susține încrederea, claritatea și diferențierea într-o industrie competitivă."),
  ];

  const bodyEn = [
    lead("When expertise and reputation are comparable, the experience a firm offers can become one of the elements that sets it apart."),
    p("The legal industry is built on competence, trust and professional relationships. These elements remain fundamental."),
    p("Still, before a client experiences a firm's services, there are numerous interactions that shape their perception."),
    p("The website. The contact process. The clarity of the information. How they understand the services. How easily they find answers."),
    p("All of this is part of the user experience, also known as UX (User Experience)."),

    h2("UX begins before the first contact"),
    p("Many people associate UX exclusively with the design of a website. In reality, UX is the entire experience a person has when interacting with an organization."),
    p("In law, this experience often begins online."),
    p("A potential client lands on the website and tries to quickly answer a few questions:"),
    bullet("Do I understand what services the firm offers?"),
    bullet("Can I easily find the information?"),
    bullet("Do I know what the next step is?"),
    bullet("Can I quickly contact the team?"),
    p("When the answers come naturally, the experience becomes simpler and more comfortable."),

    figure(fig1, "The clear structure of a law firm website", capF1Ro, capF1En),

    h2("Clients compare experiences, not just services"),
    p("In many situations, users visit several websites before contacting a firm."),
    p("The services can look similar. The practice areas can be similar. The level of expertise can be hard to assess."),
    p("The experience, on the other hand, is immediately visible."),
    p("A fast website. Intuitive navigation. Clear information. Simple forms. Easy-to-understand processes."),
    p("These details contribute to the overall perception and influence the decision to keep exploring."),

    h2("Reducing uncertainty is part of the experience"),
    p("People looking for legal services often face complex and sometimes stressful situations. In these moments, clarity becomes important."),
    p("People want to know:"),
    bullet("How does the collaboration work?"),
    bullet("What happens after contact?"),
    bullet("Who handles their case?"),
    bullet("How can they get answers?"),
    p("Firms that manage to answer these questions in a simple way reduce uncertainty and create a better experience for users."),

    pullQuote("In many cases, clients aren't just comparing lawyers. They're comparing the experiences they encounter before the first contact."),

    h2("What we evaluate when we analyze UX in law"),
    p("As part of the research, we observe several elements that influence the user experience."),

    callout("Worth keeping in mind", "We frequently analyze:"),
    bullet("the clarity of the website's structure"),
    bullet("the ease of navigation"),
    bullet("the experience on mobile devices"),
    bullet("the accessibility of information"),
    bullet("the contact process"),
    bullet("how the collaboration with the firm is explained"),

    figure(fig2, "A team in a digital work environment — searching and organizing information", capF2Ro, capF2En),

    h2("What this means for the industry"),
    p("As digital experiences in other fields keep evolving, users' expectations rise in their relationship with law firms too."),
    p("UX doesn't replace legal expertise. It doesn't replace reputation. It doesn't replace results."),
    p("But it can influence how a firm is perceived before these aspects can be assessed directly."),
    p("In a competitive market, user experience can become an additional factor of differentiation."),

    statement("Main observation", "In law, user experience contributes to how firms are perceived from the very first interactions. As clients compare more and more options online, UX becomes an element that can support trust, clarity and differentiation in a competitive industry."),
  ];

  const doc = {
    _type: "article",
    category: "research",
    subcategory: "legal",
    slug: { _type: "slug", current: "cum-poate-ux-ul-sa-devina-un-avantaj-competitiv-in-avocatura" },
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Spațiu de birou modern — experiența ca avantaj competitiv în avocatură",
    },
    topics: ["Avocatură", "UX", "Experiență digitală"],
    titleRo: "Cum poate UX-ul să devină un avantaj competitiv în avocatură",
    subtitleRo: "Într-o industrie în care multe firme oferă servicii similare, experiența utilizatorului poate influența modul în care clienții percep și aleg o firmă de avocatură.",
    excerptRo: "Atunci când expertiza și reputația sunt comparabile, experiența utilizatorului poate deveni un factor real de diferențiere — UX-ul susține încrederea, claritatea și alegerea unei firme de avocatură.",
    bodyRo,
    titleEn: "How UX can become a competitive advantage in law",
    subtitleEn: "In an industry where many firms offer similar services, user experience can influence how clients perceive and choose a law firm.",
    excerptEn: "When expertise and reputation are comparable, user experience can become a real factor of differentiation — UX supports trust, clarity and the choice of a law firm.",
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
