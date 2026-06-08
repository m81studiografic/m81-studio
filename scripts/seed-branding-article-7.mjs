// Articol Branding & Experience — Cum aleg clienții o firmă de avocatură (RO + EN, mockup-uri proprii).
import { readFileSync } from "node:fs";
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const DIR = "/Users/m81studio/Desktop/Imagini articole/Cum aleg clienții o firmă de avocatură astăzi";

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

async function uploadFile(path, filename) {
  const buf = readFileSync(path);
  const up = await fetch(`${BASE}/assets/images/${DATASET}?filename=${filename}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/png" },
    body: buf,
  });
  const d = (await up.json()).document;
  if (!d?._id) throw new Error("upload failed: " + filename);
  console.log(`  ${filename}: ${d._id} (${d.metadata?.dimensions?.width}x${d.metadata?.dimensions?.height})`);
  return d._id;
}

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");

  const coverId = await uploadFile(`${DIR}/openart-image_1780943013567_a313c42d_1780943013587_62f7a6d6.png`, "cumaleg-cover-cabinet.png");
  const fig1 = await uploadFile(`${DIR}/openart-image_1780943126997_46343b32_1780943127156_10e97a64.png`, "cumaleg-fig1-contract.png");
  const fig2 = await uploadFile(`${DIR}/openart-image_1780943245014_83d0a95a_1780943245531_c20fa399.png`, "cumaleg-fig2-intalnire.png");

  const capF1Ro = "Totul pornește de la o situație concretă — un contract, un litigiu, o tranzacție care cere o decizie juridică.";
  const capF1En = "It all starts from a concrete situation — a contract, a dispute, a transaction that calls for a legal decision.";
  const capF2Ro = "Decizia de a colabora se ia la prima întâlnire — dar încrederea începe să se formeze cu mult înainte.";
  const capF2En = "The decision to work together is made at the first meeting — but trust starts forming long before.";

  const bodyRo = [
    lead("Timp de mulți ani, alegerea unei firme de avocatură s-a bazat pe recomandări, reputație și relații profesionale. Aceste lucruri contează în continuare — dar modul în care clienții verifică, analizează și aleg o firmă s-a schimbat."),
    p("Astăzi, procesul începe mult mai devreme. Înainte de telefon. Înainte de email. Înainte de întâlnire. Înainte ca firma să aibă ocazia să explice cine este și cum poate ajuta."),
    p("De cele mai multe ori, primul contact are loc online. Clientul caută. Compară. Citește. Observă. Și își formează o impresie."),

    h2("Căutarea începe cu o nevoie"),
    p("Oamenii nu caută firme de avocatură fără motiv. Căutarea începe atunci când apare o situație care cere claritate, protecție sau decizie."),
    p("Poate fi un contract. Un litigiu. O tranzacție. O problemă de muncă. O investiție. O schimbare în companie."),
    p("În acel moment, clientul încearcă să înțeleagă ce opțiuni are. Cine îl poate ajuta. Cine pare relevant. Cine inspiră încredere."),
    p("De multe ori, primul pas nu este contactul direct. Primul pas este documentarea."),

    h2("Clientul verifică înainte să contacteze"),
    p("Chiar și atunci când primește o recomandare, clientul nu se oprește acolo."),
    p("Caută firma pe Google. Intră pe website. Se uită la echipă. Verifică domeniile de practică. Citește articole. Compară cu alte firme."),
    p("Încearcă să înțeleagă dacă firma respectivă este potrivită pentru problema lui."),
    p("Website-ul devine astfel mai mult decât o carte de vizită digitală. Devine un spațiu de evaluare."),
    p("Un loc în care clientul încearcă să răspundă la o întrebare simplă: pot avea încredere în această firmă?"),

    figure(fig1, "Document juridic — un contract care cere o decizie", capF1Ro, capF1En),

    h2("Prima impresie se formează din semnale"),
    p("Un client nu poate evalua imediat calitatea serviciilor juridice. Nu poate vedea direct experiența acumulată în ani de muncă. Nu poate înțelege instant complexitatea proiectelor gestionate."),
    p("Dar poate observa semnale."),
    p("Observă dacă informațiile sunt clare. Dacă website-ul este bine organizat. Dacă echipa este prezentată profesionist. Dacă serviciile sunt ușor de înțeles. Dacă tonul comunicării transmite siguranță. Dacă experiența digitală este simplă sau confuză."),
    p("Aceste detalii nu înlocuiesc expertiza. Dar influențează felul în care expertiza este percepută."),

    pullQuote("Clientul nu vede expertiza direct. Înainte de prima discuție, vede modul în care firma se prezintă, comunică și organizează informația."),

    h2("Compararea a devenit normală"),
    p("Astăzi, este foarte ușor să compari mai multe firme de avocatură."),
    p("În câteva minute, un client poate analiza:"),
    bullet("mai multe website-uri"),
    bullet("mai multe echipe"),
    bullet("mai multe specializări"),
    bullet("mai multe articole"),
    bullet("mai multe moduri de prezentare"),
    p("Din perspectiva clientului, multe firme pot părea asemănătoare. Folosesc un limbaj similar. Promit profesionalism. Vorbesc despre experiență. Prezintă domenii de practică apropiate."),
    p("În acest context, diferențele devin mai greu de observat. Iar claritatea devine importantă."),
    p("O firmă care explică mai bine cine este, ce face și pentru cine lucrează are șanse mai mari să fie înțeleasă corect."),

    h2("Conținutul ajută clientul să înțeleagă"),
    p("Articolele, ghidurile și resursele publicate pot avea un rol important în procesul de alegere."),
    p("Ele nu sunt doar materiale de imagine. Sunt dovezi indirecte ale modului în care firma gândește."),
    p("Prin conținut, clientul poate observa:"),
    bullet("cum explică firma un subiect complex"),
    bullet("ce tip de probleme înțelege"),
    bullet("cât de clar comunică"),
    bullet("ce nivel de atenție acordă educării publicului"),
    bullet("ce perspectivă are asupra domeniului"),
    p("Pentru mulți clienți, acesta este unul dintre puținele moduri prin care pot evalua o firmă înainte de contact."),

    callout("De reținut", "Clientul nu alege doar pe baza unei recomandări sau a unui website. Alegerea apare dintr-o combinație de semnale: reputație, claritate, experiență, comunicare, conținut și încrederea pe care firma reușește să o transmită înainte de prima discuție."),

    figure(fig2, "Prima întâlnire dintre client și avocat — confirmarea încrederii", capF2Ro, capF2En),

    h2("Alegerea este despre încredere"),
    p("În final, clientul caută expertiză. Dar caută și siguranță. Caută claritate. Caută un partener care pare să înțeleagă problema. Caută o firmă care transmite profesionalism înainte să înceapă colaborarea."),
    p("De aceea, modul în care o firmă se prezintă în mediul digital contează."),
    p("Nu pentru că înlocuiește reputația. Nu pentru că înlocuiește recomandările. Nu pentru că înlocuiește competența juridică."),
    p("Ci pentru că ajută clientul să le descopere, să le înțeleagă și să le evalueze mai ușor."),

    statement("Încrederea începe înainte de prima întâlnire", "Clienții continuă să aleagă firme de avocatură pe baza încrederii. Diferența este că astăzi încrederea începe să se formeze înainte de prima întâlnire — prin ceea ce clientul găsește, citește, compară și înțelege despre firmă."),
  ];

  const bodyEn = [
    lead("For many years, choosing a law firm relied on referrals, reputation and professional relationships. These still matter — but the way clients check, analyze and choose a firm has changed."),
    p("Today, the process begins much earlier. Before the phone call. Before the email. Before the meeting. Before the firm even has a chance to explain who it is and how it can help."),
    p("Most often, the first contact happens online. The client searches. Compares. Reads. Observes. And forms an impression."),

    h2("The search begins with a need"),
    p("People don't look for law firms without a reason. The search begins when a situation appears that calls for clarity, protection or a decision."),
    p("It can be a contract. A dispute. A transaction. An employment issue. An investment. A change within the company."),
    p("At that moment, the client tries to understand what options they have. Who can help them. Who seems relevant. Who inspires trust."),
    p("Often, the first step isn't direct contact. The first step is research."),

    h2("The client checks before getting in touch"),
    p("Even when they receive a referral, the client doesn't stop there."),
    p("They search the firm on Google. They visit the website. They look at the team. They check the practice areas. They read articles. They compare with other firms."),
    p("They try to understand whether that firm is right for their problem."),
    p("The website thus becomes more than a digital business card. It becomes a space for evaluation."),
    p("A place where the client tries to answer a simple question: can I trust this firm?"),

    figure(fig1, "A legal document — a contract that calls for a decision", capF1Ro, capF1En),

    h2("First impressions form from signals"),
    p("A client can't immediately assess the quality of the legal services. They can't directly see the experience built over years of work. They can't instantly understand the complexity of the projects handled."),
    p("But they can notice signals."),
    p("They notice whether the information is clear. Whether the website is well organized. Whether the team is presented professionally. Whether the services are easy to understand. Whether the tone of communication conveys confidence. Whether the digital experience is simple or confusing."),
    p("These details don't replace expertise. But they influence how that expertise is perceived."),

    pullQuote("The client doesn't see the expertise directly. Before the first conversation, they see how the firm presents itself, communicates and organizes information."),

    h2("Comparison has become normal"),
    p("Today, it's very easy to compare several law firms."),
    p("In a few minutes, a client can analyze:"),
    bullet("several websites"),
    bullet("several teams"),
    bullet("several specializations"),
    bullet("several articles"),
    bullet("several ways of presenting"),
    p("From the client's perspective, many firms can look similar. They use similar language. They promise professionalism. They talk about experience. They present close practice areas."),
    p("In this context, the differences become harder to notice. And clarity becomes important."),
    p("A firm that better explains who it is, what it does and who it works for has a better chance of being understood correctly."),

    h2("Content helps the client understand"),
    p("Published articles, guides and resources can play an important role in the selection process."),
    p("They aren't just image materials. They're indirect evidence of how the firm thinks."),
    p("Through content, the client can observe:"),
    bullet("how the firm explains a complex subject"),
    bullet("what kind of problems it understands"),
    bullet("how clearly it communicates"),
    bullet("how much attention it gives to educating the public"),
    bullet("what perspective it has on the field"),
    p("For many clients, this is one of the few ways they can evaluate a firm before making contact."),

    callout("Worth keeping in mind", "The client doesn't choose based only on a referral or a website. The choice emerges from a combination of signals: reputation, clarity, experience, communication, content and the trust the firm manages to convey before the first conversation."),

    figure(fig2, "The first meeting between client and lawyer — confirming trust", capF2Ro, capF2En),

    h2("The choice is about trust"),
    p("In the end, the client looks for expertise. But they also look for reassurance. They look for clarity. They look for a partner who seems to understand the problem. They look for a firm that conveys professionalism before the collaboration even begins."),
    p("That's why the way a firm presents itself in the digital environment matters."),
    p("Not because it replaces reputation. Not because it replaces referrals. Not because it replaces legal competence."),
    p("But because it helps the client discover, understand and evaluate them more easily."),

    statement("Trust begins before the first meeting", "Clients continue to choose law firms based on trust. The difference is that today trust starts forming before the first meeting — through what the client finds, reads, compares and understands about the firm."),
  ];

  const doc = {
    _type: "article",
    category: "branding",
    slug: { _type: "slug", current: "cum-aleg-clientii-o-firma-de-avocatura-astazi" },
    publishedAt: new Date().toISOString(),
    readTime: 5,
    featured: false,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Client care caută firma de avocatură potrivită pentru situația lui" },
    topics: ["Avocatură", "Branding", "Încredere"],
    titleRo: "Cum aleg clienții o firmă de avocatură astăzi",
    subtitleRo: "Înainte de primul contact, majoritatea clienților au format deja o primă impresie.",
    excerptRo: "Înainte de primul contact, clienții caută, compară și își formează o impresie online. Modul în care o firmă de avocatură se prezintă digital influențează încrederea — încă dinainte de prima discuție.",
    bodyRo,
    titleEn: "How clients choose a law firm today",
    subtitleEn: "Before the first contact, most clients have already formed a first impression.",
    excerptEn: "Before the first contact, clients search, compare and form an impression online. How a law firm presents itself digitally shapes trust — even before the first conversation.",
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
