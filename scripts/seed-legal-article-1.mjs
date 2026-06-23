// Primul articol Industry Research / subcategoria Legal (RO + EN, cover + 2 imagini).
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

  const coverId = await upload("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2400&q=80", "legal1-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80", "legal1-semnare.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1423592707957-3b212afa6733?auto=format&fit=crop&w=2000&q=80", "legal1-carti.jpg");

  const capF1Ro = "Decizia de a apela la un avocat se ia, de cele mai multe ori, înainte de prima semnătură.";
  const capF1En = "The decision to turn to a lawyer is most often made before the first signature.";
  const capF2Ro = "Competența juridică se presupune; clienții caută și semnale de claritate și încredere.";
  const capF2En = "Legal competence is assumed; clients also look for signals of clarity and trust.";

  const bodyRo = [
    lead("Industria de avocatură din România trece printr-o schimbare discretă, dar profundă: nu în ce face un avocat, ci în felul în care clienții îl descoperă, îl evaluează și îl aleg."),
    p("Multă vreme, un cabinet de avocatură creștea aproape exclusiv prin recomandări. Un client mulțumit spunea altcuiva. Reputația se construia în instanță și în comunitatea locală."),
    p("Recomandarea rămâne, în continuare, cel mai puternic factor. Dar nu mai este singurul. Înainte de a suna sau de a programa o întâlnire, tot mai mulți clienți caută cabinetul online."),

    h2("Decizia începe înainte de prima întâlnire"),
    p("Un potențial client îți caută numele. Îți vede website-ul. Citește câteva rânduri despre cabinet. Se uită la felul în care comunici."),
    p("Din aceste câteva minute își formează o primă impresie despre cât de profesionist pari, despre câtă încredere inspiri și despre cât de potrivit ești pentru problema lui."),
    p("Această evaluare are loc înainte ca tu să afli că există."),

    figure(fig1, "Persoană care semnează documente — consultanță juridică", capF1Ro, capF1En),

    h2("Competența se presupune. Încrederea se demonstrează."),
    p("Pentru un client, este aproape imposibil să evalueze competența juridică reală a unui avocat înainte de a lucra cu el."),
    p("De aceea caută altceva: semnale. Claritate. Un mod de a comunica din care înțelege că este pe mâini bune."),
    p("Doi avocați la fel de buni pot fi percepuți complet diferit, în funcție de cât de clar își prezintă fiecare cabinetul."),

    pullQuote("Clientul nu alege întotdeauna cel mai bun avocat. Alege avocatul în care are cea mai multă încredere — iar încrederea se construiește din claritate."),

    h2("Ce evaluează clienții, de fapt"),
    p("Dincolo de rezultate, clienții observă o serie de semnale care îi ajută să decidă rapid."),

    callout("De reținut", "Înainte de prima discuție, un client se uită la:"),
    bullet("claritatea cu care explici ce faci și pentru cine"),
    bullet("felul în care comunici — pe înțelesul lui, nu doar în limbaj juridic"),
    bullet("coerența dintre website, mesaje și prima conversație"),
    bullet("specializarea — pare cabinetul potrivit pentru problema mea?"),
    bullet("încrederea pe care o transmite, înainte de orice promisiune"),

    figure(fig2, "Cărți de drept și notițe — expertiză juridică", capF2Ro, capF2En),

    h2("Ce înseamnă asta pentru cabinete"),
    p("Nu înseamnă că un cabinet trebuie să devină o agenție de marketing. Înseamnă că prima impresie nu mai începe în sala de ședințe, ci online."),
    p("Un cabinet care își exprimă clar cine este, pentru cine lucrează și ce îl diferențiază are un avantaj real — nu pentru că este mai bun juridic, ci pentru că este mai ușor de înțeles și de ales."),

    statement("Competența aduce rezultate. Claritatea aduce clienți.", "Într-o piață în care tot mai mulți clienți evaluează un cabinet înainte de prima discuție, felul în care o firmă de avocatură comunică cine este devine la fel de important ca expertiza pe care o oferă."),
  ];

  const bodyEn = [
    lead("The legal industry in Romania is going through a quiet but profound shift — not in what a lawyer does, but in how clients discover, evaluate and choose one."),
    p("For a long time, a law firm grew almost entirely through referrals. A satisfied client told someone else. Reputation was built in the courtroom and in the local community."),
    p("Referral is still the most powerful factor. But it's no longer the only one. Before calling or scheduling a meeting, more and more clients look the firm up online."),

    h2("The decision begins before the first meeting"),
    p("A potential client searches your name. They see your website. They read a few lines about the firm. They look at the way you communicate."),
    p("From those few minutes they form a first impression of how professional you seem, how much trust you inspire and how suitable you are for their problem."),
    p("This evaluation happens before you even know they exist."),

    figure(fig1, "A person signing documents — legal consultation", capF1Ro, capF1En),

    h2("Competence is assumed. Trust is demonstrated."),
    p("For a client, it's nearly impossible to assess a lawyer's real legal competence before working with them."),
    p("So they look for something else: signals. Clarity. A way of communicating that tells them they're in good hands."),
    p("Two equally good lawyers can be perceived completely differently, depending on how clearly each presents their firm."),

    pullQuote("Clients don't always choose the best lawyer. They choose the lawyer they trust most — and trust is built from clarity."),

    h2("What clients actually evaluate"),
    p("Beyond results, clients notice a series of signals that help them decide quickly."),

    callout("Worth keeping in mind", "Before the first conversation, a client looks at:"),
    bullet("how clearly you explain what you do and for whom"),
    bullet("the way you communicate — in their language, not only in legal terms"),
    bullet("the consistency between website, messages and the first conversation"),
    bullet("specialization — does this seem like the right firm for my problem?"),
    bullet("the trust it conveys, before any promise"),

    figure(fig2, "Law books and notes — legal expertise", capF2Ro, capF2En),

    h2("What this means for firms"),
    p("It doesn't mean a firm has to become a marketing agency. It means the first impression no longer begins in the meeting room, but online."),
    p("A firm that clearly expresses who it is, who it works for and what sets it apart has a real advantage — not because it's better at law, but because it's easier to understand and to choose."),

    statement("Competence brings results. Clarity brings clients.", "In a market where more and more clients evaluate a firm before the first conversation, the way a law firm communicates who it is becomes as important as the expertise it offers."),
  ];

  const doc = {
    _type: "article",
    category: "research",
    subcategory: "legal",
    slug: { _type: "slug", current: "cum-isi-aleg-clientii-un-avocat" },
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Statueta Justiției — industria de avocatură și încrederea pe care o presupune",
    },
    topics: ["Avocatură", "Branding", "Încredere"],
    titleRo: "Cum își aleg clienții un avocat — și de ce s-a schimbat",
    subtitleRo: "Reputația și recomandările rămân esențiale, dar tot mai mulți clienți evaluează un cabinet de avocatură online, înainte de prima discuție.",
    excerptRo: "Modul în care clienții descoperă, evaluează și aleg un avocat s-a schimbat. Competența se presupune; diferența o fac claritatea, încrederea și felul în care cabinetul comunică cine este.",
    bodyRo,
    titleEn: "How clients choose a lawyer — and why it has changed",
    subtitleEn: "Reputation and referrals remain essential, but more and more clients evaluate a law firm online, before the first conversation.",
    excerptEn: "The way clients discover, evaluate and choose a lawyer has changed. Competence is assumed; the difference is made by clarity, trust and how the firm communicates who it is.",
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
