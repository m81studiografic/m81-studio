// Al șaselea articol de branding (RO + EN, cover + 2 imagini body).
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

  const coverId = await upload("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80", "a6-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80", "a6-fundatie.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=2000&q=80", "a6-crestere.jpg");

  const capF1Ro = "O fundație clară de la început dă structură și direcție afacerii.";
  const capF1En = "A clear foundation from the start gives a business structure and direction.";
  const capF2Ro = "O identitate bine definită crește odată cu afacerea.";
  const capF2En = "A well-defined identity grows together with the business.";

  const bodyRo = [
    lead("Atunci când lansezi o afacere, aproape totul pare mai important decât brandingul. Și totuși, primele luni sunt exact perioada în care se formează primele percepții."),
    p("Produsul trebuie finalizat. Website-ul trebuie lansat. Trebuie găsiți primii clienți. Trebuie rezolvate problemele care apar în fiecare zi."),
    p("În acest context, mulți antreprenori privesc brandingul ca pe ceva ce poate fi făcut mai târziu. Mai întâi pornim. Apoi vedem."),
    p("Pare o decizie logică. În realitate, primele luni ale unei afaceri sunt exact perioada în care se formează primele percepții. Iar percepțiile se construiesc mai repede decât credem."),

    h2("Oamenii își formează o imagine înainte să te cunoască"),
    p("Înainte să testeze produsul. Înainte să vorbească cu tine. Înainte să citească despre afacerea ta."),
    p("Oamenii văd anumite semnale. Numele. Website-ul. Ambalajul. Fotografiile. Mesajele. Prezentarea."),
    p("Din aceste elemente își construiesc o imagine despre cine ești. Despre cât de profesionist pari. Despre câtă încredere inspiri. Despre valoarea pe care cred că o oferi."),
    p("Această imagine apare înainte ca experiența propriu-zisă să înceapă. De aceea este atât de important ca afacerea să transmită clar cine este încă de la început."),

    h2("O afacere comunică din prima zi"),
    p("Chiar și atunci când nu există o strategie. Chiar și atunci când nu există un brand definit. Fiecare alegere transmite ceva."),
    p("Un logo. Un website. Un ambalaj. O postare. O prezentare. Un email."),
    p("Problema apare atunci când toate aceste elemente sunt create separat. Logo-ul este realizat într-un context. Website-ul apare câteva luni mai târziu. Ambalajul este făcut de altcineva. Materialele de promovare urmează alte reguli."),
    p("În timp, afacerea începe să arate ca o colecție de piese care nu au fost gândite împreună. Iar oamenilor le este mai greu să înțeleagă cine este cu adevărat brandul."),

    figure(fig1, "Schiță de plan arhitectural — fundație, structură și direcție", capF1Ro, capF1En),

    h2("Claritatea face creșterea mai ușoară"),
    p("La început, numărul deciziilor este relativ mic. Ai puține produse. Puține servicii. Puține puncte de contact."),
    p("Este momentul ideal pentru a construi o fundație clară."),
    p("Pe măsură ce afacerea crește, lucrurile devin mai complexe. Apar produse noi. Apar servicii noi. Apar canale noi de comunicare. Apar colaboratori noi."),
    p("Fără o direcție clară, fiecare element nou adaugă încă un strat de confuzie. În schimb, atunci când există o identitate bine definită, fiecare decizie nouă poate fi construită pe aceeași fundație."),

    h2("O lume competitivă cere claritate"),
    p("Astăzi oamenii compară zeci de opțiuni în doar câteva minute. Vizitează website-uri. Privesc produse. Analizează fotografii. Citesc recenzii."),
    p("În multe cazuri, diferențele dintre produse sunt greu de observat la prima vedere. De aceea claritatea devine un avantaj competitiv."),
    p("O afacere care știe cine este și exprimă acest lucru coerent are șanse mai mari să fie observată, înțeleasă și ținută minte."),

    pullQuote("O imagine clară nu ajută doar oamenii să te recunoască. Te ajută și pe tine să iei decizii mai coerente pe măsură ce afacerea crește."),

    h2("Brandingul este o fundație, nu o etapă finală"),
    p("Mulți antreprenori văd brandingul ca pe ultimul pas. Ceva ce se face după ce afacerea funcționează."),
    p("În realitate, brandingul funcționează mai bine atunci când este privit ca o fundație. El oferă răspunsuri la întrebări esențiale:"),
    bullet("Cine suntem?"),
    bullet("Ce ne diferențiază?"),
    bullet("Ce valori ne ghidează?"),
    bullet("Cum vrem să fim percepuți?"),
    bullet("Ce experiență vrem să oferim?"),
    p("Aceste răspunsuri influențează toate deciziile care urmează. De la website și ambalaj până la comunicare și experiența clientului."),

    callout("De reținut", "Dacă ești la început de drum, întreabă-te:"),
    bullet("Oamenii înțeleg rapid cine suntem?"),
    bullet("Putem explica clar ce ne diferențiază?"),
    bullet("Toate elementele afacerii transmit aceeași idee?"),
    bullet("Construim o imagine coerentă sau adăugăm piese separate?"),
    bullet("Va putea această identitate să crească odată cu afacerea?"),

    figure(fig2, "Răsaduri care cresc — evoluție, consistență și creștere", capF2Ro, capF2En),

    statement("O afacere nu are nevoie doar de un logo pentru a începe.", "Are nevoie de o imagine clară despre cine este, ce reprezintă și cum vrea să fie percepută. Cu cât această fundație este construită mai devreme, cu atât creșterea devine mai coerentă, mai eficientă și mai ușor de recunoscut într-o piață tot mai competitivă."),
  ];

  const bodyEn = [
    lead("When you launch a business, almost everything feels more important than branding. And yet, the first months are exactly when the first perceptions form."),
    p("The product needs to be finished. The website needs to launch. The first customers need to be found. The problems that come up every day need to be solved."),
    p("In this context, many entrepreneurs see branding as something that can be done later. First we start. Then we'll see."),
    p("It seems like a logical decision. In reality, the first months of a business are exactly when the first perceptions form. And perceptions build faster than we think."),

    h2("People form an image before they know you"),
    p("Before they try the product. Before they talk to you. Before they read about your business."),
    p("People see certain signals. The name. The website. The packaging. The photos. The messages. The presentation."),
    p("From these elements they build an image of who you are. Of how professional you seem. Of how much trust you inspire. Of the value they think you offer."),
    p("This image appears before the actual experience even begins. That's why it's so important for a business to clearly convey who it is from the very start."),

    h2("A business communicates from day one"),
    p("Even when there's no strategy. Even when there's no defined brand. Every choice conveys something."),
    p("A logo. A website. A package. A post. A presentation. An email."),
    p("The problem appears when all these elements are created separately. The logo is made in one context. The website shows up a few months later. The packaging is done by someone else. The promotional materials follow other rules."),
    p("Over time, the business starts to look like a collection of pieces that weren't thought through together. And it becomes harder for people to understand who the brand really is."),

    figure(fig1, "An architectural plan sketch — foundation, structure and direction", capF1Ro, capF1En),

    h2("Clarity makes growth easier"),
    p("At the start, the number of decisions is relatively small. You have few products. Few services. Few touchpoints."),
    p("This is the ideal moment to build a clear foundation."),
    p("As the business grows, things become more complex. New products appear. New services appear. New communication channels appear. New collaborators appear."),
    p("Without a clear direction, each new element adds another layer of confusion. When there's a well-defined identity, on the other hand, every new decision can be built on the same foundation."),

    h2("A competitive world demands clarity"),
    p("Today people compare dozens of options in just a few minutes. They visit websites. They look at products. They analyze photos. They read reviews."),
    p("In many cases, the differences between products are hard to notice at first glance. That's why clarity becomes a competitive advantage."),
    p("A business that knows who it is and expresses it coherently has a better chance of being noticed, understood and remembered."),

    pullQuote("A clear image doesn't just help people recognize you. It also helps you make more coherent decisions as the business grows."),

    h2("Branding is a foundation, not a final step"),
    p("Many entrepreneurs see branding as the last step. Something done after the business is working."),
    p("In reality, branding works best when it's seen as a foundation. It answers essential questions:"),
    bullet("Who are we?"),
    bullet("What sets us apart?"),
    bullet("What values guide us?"),
    bullet("How do we want to be perceived?"),
    bullet("What experience do we want to offer?"),
    p("These answers influence all the decisions that follow. From the website and packaging to communication and the customer experience."),

    callout("Worth keeping in mind", "If you're just starting out, ask yourself:"),
    bullet("Do people quickly understand who we are?"),
    bullet("Can we clearly explain what sets us apart?"),
    bullet("Do all elements of the business convey the same idea?"),
    bullet("Are we building a coherent image or adding separate pieces?"),
    bullet("Will this identity be able to grow with the business?"),

    figure(fig2, "Seedlings growing — evolution, consistency and growth", capF2Ro, capF2En),

    statement("A business doesn't just need a logo to start.", "It needs a clear image of who it is, what it represents and how it wants to be perceived. The earlier this foundation is built, the more coherent, efficient and recognizable growth becomes in an increasingly competitive market."),
  ];

  const doc = {
    _type: "article",
    category: "branding",
    slug: { _type: "slug", current: "de-ce-startupurile-au-nevoie-de-o-imagine-clara-de-la-inceput" },
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Echipă de startup la început de drum — momentul ideal pentru a construi o imagine clară",
    },
    topics: ["Branding", "Startup", "Strategie"],
    titleRo: "De ce startupurile au nevoie de o imagine clară încă de la început",
    subtitleRo: "Primele luni sunt exact perioada în care se formează percepțiile. O imagine clară de la început face creșterea mai coerentă.",
    excerptRo: "Brandingul nu este ultimul pas, ci fundația. O afacere care știe cine este și exprimă clar acest lucru încă de la început crește mai coerent și e mai ușor de recunoscut.",
    bodyRo,
    titleEn: "Why startups need a clear image from the very start",
    subtitleEn: "The first months are exactly when perceptions form. A clear image from the start makes growth more coherent.",
    excerptEn: "Branding isn't the last step — it's the foundation. A business that knows who it is and expresses it clearly from the start grows more coherently and is easier to recognize.",
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
