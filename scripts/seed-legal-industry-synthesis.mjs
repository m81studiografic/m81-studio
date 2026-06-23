// Articol Industry Research / Legal — sinteză de industrie (RO + EN, cover + 2 figuri).
// Teza: avocatura din România e puternică în fond, uniformă în formă.
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

  // Imagini verificate vizual: business/branding, landscape, fără text/valută străină.
  const coverId = await upload("https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=80", "legal-synth-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80", "legal-synth-forma.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80", "legal-synth-incredere.jpg");

  const capF1Ro = "Spațiile și identitățile vizuale ale firmelor de avocatură converg adesea către aceleași convenții premium.";
  const capF1En = "Law firms' spaces and visual identities often converge on the same premium conventions.";
  const capF2Ro = "Încrederea și relațiile rămân fondul industriei — dar se formează tot mai devreme, online.";
  const capF2En = "Trust and relationships remain the industry's foundation — but they now form earlier, online.";

  const bodyRo = [
    lead("Industria de avocatură din România este puternică în fond. Privită însă prin felul în care firmele se prezintă, este surprinzător de uniformă în formă."),
    p("Această sinteză nu evaluează calitatea serviciilor juridice. Observă felul în care valoarea firmelor este exprimată — prin branding, comunicare și experiență digitală — pornind de la analiza unor firme reale din piață."),
    p("Concluzia se repetă de la o firmă la alta. Organizațiile sunt diferite, dar experiența percepută de client este aproape aceeași."),

    h2("Fondul este real"),
    p("Firmele de avocatură de business investesc ani întregi în expertiză, reputație și relații. Gestionează mandate complexe, reprezintă clienți importanți, ocupă poziții solide în piață."),
    p("Valoarea există. Experiența există. Reputația există. Rareori acestea sunt puse la îndoială."),

    h2("Forma este comună"),
    p("Problema apare la suprafață. Palete cromatice conservatoare. Tipografii clasice. Fotografii corporate. Structuri de website aproape identice — Servicii, Echipă, Insighturi, Contact."),
    p("Profesionalismul a creat un limbaj vizual comun. Transmite seriozitate, dar șterge diferențierea."),
    p("Dacă ai elimina logo-ul, multe firme ar deveni interschimbabile. Pentru un client aflat în căutare, diferențele reale sunt greu de observat."),

    figure(fig1, "Coridor modern de birou cu pereți de sticlă — convențiile vizuale comune ale industriei juridice", capF1Ro, capF1En),

    pullQuote("În avocatură, premiumul este moștenit din reputație, nu construit din brand. Reputația susține brandul mai mult decât brandul susține reputația."),

    h2("Două voci"),
    p("Analiza comunicării scoate la iveală două voci distincte."),
    p("Prima vorbește despre organizație: abstractă, autoreferențială, declarativă — „leading”, „excellence”, „top-quality”."),
    p("A doua vorbește despre activitate: concretă, precisă, sigură pe sine — mandate, tranzacții, rezultate."),
    p("A doua voce este mult mai credibilă. Și totuși, prima domină. Firmele afirmă acolo unde ar putea demonstra."),

    h2("Oamenii — cel mai puternic activ, cel mai puțin valorificat"),
    p("Cel mai autentic element de brand din industrie sunt oamenii. Portretele transmit caracter, calm și încredere reală."),
    p("Însă secțiunea dedicată echipei este tratată aproape peste tot ca un director intern, nu ca o experiență. Într-o industrie construită pe încredere și relații, aceasta este cea mai mare oportunitate lăsată neatinsă."),

    figure(fig2, "Strângere de mână într-un birou — încrederea și relațiile, fondul industriei juridice", capF2Ro, capF2En),

    callout("Tipare observate în industrie", "Recurente, de la o firmă la alta:"),
    bullet("identități vizuale aproape identice"),
    bullet("poziționare premium declarată, nu demonstrată"),
    bullet("experiență digitală informativă, nu experiențială"),
    bullet("oamenii, principalul activ, subexploatați"),
    bullet("conținut bogat, publicat, dar nevalorificat"),

    h2("Încrederea se mută online"),
    p("Pentru un domeniu care a trăit din recomandări, schimbarea este de fond. Astăzi, clientul își formează percepția pe website, înainte de primul contact."),
    p("Experiența digitală devine primul punct real de interacțiune. Iar prima impresie se construiește din claritate, structură și felul în care firma își prezintă oamenii."),

    h2("Oportunitatea nu este reinventare, ci aliniere"),
    p("Concluzia transversală este simplă. Firmele de avocatură sunt mai puternice decât expresia lor."),
    p("Oportunitatea nu este să pară altceva. Este să exprime mai clar ceea ce sunt deja. Mai fidel. Mai distinct. Mai aproape de caracterul real."),
    p("Mai puțină declarație. Mai multă demonstrație. Demonstrează înainte să afirme."),

    statement("Observație de industrie", "Industria de avocatură din România beneficiază de expertiză, reputație și încredere reale. Diferențierea prin branding și experiență digitală rămâne însă limitată — premiumul este declarat mai des decât demonstrat. Firmele care își aliniază imaginea digitală la valoarea reală a organizației au oportunitatea de a deveni mai ușor de înțeles, memorat și ales."),
  ];

  const bodyEn = [
    lead("Romania's legal industry is strong in substance. Seen through the way firms present themselves, however, it is surprisingly uniform in form."),
    p("This synthesis doesn't evaluate the quality of legal services. It observes how firms' value is expressed — through branding, communication and digital experience — based on the analysis of real firms in the market."),
    p("The conclusion repeats from one firm to the next. The organizations are different, but the experience perceived by the client is almost the same."),

    h2("The substance is real"),
    p("Business law firms invest years in expertise, reputation and relationships. They handle complex mandates, represent important clients, hold solid positions in the market."),
    p("The value exists. The experience exists. The reputation exists. These are rarely in doubt."),

    h2("The form is shared"),
    p("The problem appears at the surface. Conservative color palettes. Classic typography. Corporate photography. Near-identical website structures — Services, Team, Insights, Contact."),
    p("Professionalism has created a shared visual language. It conveys seriousness, but erases differentiation."),
    p("If you removed the logo, many firms would become interchangeable. For a client in the search process, the real differences are hard to notice."),

    figure(fig1, "A modern glass-walled office corridor — the shared visual conventions of the legal industry", capF1Ro, capF1En),

    pullQuote("In law, premium is inherited from reputation, not built from the brand. Reputation supports the brand more than the brand supports the reputation."),

    h2("Two voices"),
    p("Analyzing the communication reveals two distinct voices."),
    p("The first speaks about the organization: abstract, self-referential, declarative — “leading,” “excellence,” “top-quality.”"),
    p("The second speaks about the work: concrete, precise, self-assured — mandates, transactions, results."),
    p("The second voice is far more credible. And yet, the first dominates. Firms assert where they could demonstrate."),

    h2("People — the strongest asset, the least leveraged"),
    p("The most authentic brand element in the industry is the people. Portraits convey character, calm and real trust."),
    p("But the team section is treated almost everywhere as an internal directory, not as an experience. In an industry built on trust and relationships, this is the biggest opportunity left untouched."),

    figure(fig2, "A handshake in an office — trust and relationships, the foundation of the legal industry", capF2Ro, capF2En),

    callout("Patterns observed across the industry", "Recurring, from one firm to the next:"),
    bullet("near-identical visual identities"),
    bullet("premium positioning declared, not demonstrated"),
    bullet("digital experience that's informative, not experiential"),
    bullet("people, the main asset, underused"),
    bullet("rich content, published but not leveraged"),

    h2("Trust is moving online"),
    p("For a field that lived on referrals, the shift is fundamental. Today, the client forms a perception on the website, before the first contact."),
    p("The digital experience becomes the first real point of interaction. And the first impression is built from clarity, structure and the way the firm presents its people."),

    h2("The opportunity isn't reinvention — it's alignment"),
    p("The cross-cutting conclusion is simple. Law firms are stronger than their expression."),
    p("The opportunity isn't to seem like something else. It's to express more clearly what they already are. More faithfully. More distinctly. Closer to their real character."),
    p("Less declaration. More demonstration. Demonstrate before you claim."),

    statement("Industry observation", "Romania's legal industry benefits from real expertise, reputation and trust. But differentiation through branding and digital experience remains limited — premium is declared more often than demonstrated. Firms that align their digital image with the organization's real value have the opportunity to become easier to understand, remember and choose."),
  ];

  const doc = {
    _type: "article",
    category: "research",
    subcategory: "legal",
    slug: { _type: "slug", current: "avocatura-din-romania-puternica-in-fond-uniforma-in-forma" },
    publishedAt: new Date().toISOString(),
    readTime: 7,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Sală de ședințe a unei firme de avocatură — cercetare despre branding și experiență digitală în industria juridică",
    },
    topics: ["Avocatură", "Industry Research", "Branding", "Diferențiere"],
    titleRo: "Avocatura din România: puternică în fond, uniformă în formă",
    subtitleRo: "Ce ne arată felul în care firmele de avocatură se prezintă online — o sinteză de cercetare despre branding, comunicare și experiență digitală în industria juridică.",
    excerptRo: "Industria de avocatură are expertiză, reputație și încredere reale. Dar premiumul este mai des declarat decât demonstrat. O sinteză despre distanța dintre fondul firmelor și forma prin care se exprimă.",
    bodyRo,
    titleEn: "Romanian law firms: strong in substance, uniform in form",
    subtitleEn: "What the way law firms present themselves online reveals — a research synthesis on branding, communication and digital experience in the legal industry.",
    excerptEn: "The legal industry has real expertise, reputation and trust. But premium is declared more often than demonstrated. A synthesis on the gap between firms' substance and the form in which they express it.",
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
