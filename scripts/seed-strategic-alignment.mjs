// Articol Strategic Insights — "Distanța dintre cât de bună e o firmă și cât de bună pare" (RO + EN).
// Inspirat din investigația Filip & Company: aliniere, nu reinventare. Ancorat la avocatură + cârlig.
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

  // Imagini verificate vizual: business premium, landscape, fără text/valută străină.
  const coverId = await upload("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80", "strat-align-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=2000&q=80", "strat-align-discutie.jpg");

  const capF1Ro = "Alinierea pornește de la ceea ce o firmă are deja — oamenii, judecata, relațiile.";
  const capF1En = "Alignment starts from what a firm already has — the people, the judgment, the relationships.";

  const bodyRo = [
    lead("Există o distanță pe care puține firme de avocatură o măsoară: cea dintre cât de bună este firma și cât de bună pare."),
    p("O firmă poate avea expertiză reală, mandate importante și oameni valoroși — și totuși să fie percepută ca oricare alta. Nu pentru că nu are valoare, ci pentru că valoarea nu se vede."),
    p("Această distanță nu se rezolvă cu mai multă muncă. Firma muncește deja. Se rezolvă cu o exprimare mai fidelă."),

    h2("De unde vine distanța"),
    p("Distanța apare aproape mereu în același loc: în felul în care firma vorbește despre sine, nu despre ce face."),
    p("O firmă care a condus o tranzacție de sute de milioane scrie pe homepage „expertiză recunoscută în fuziuni și achiziții”. Adjectivul ajunge pe prima pagină; mandatul — dovada reală — rămâne îngropat într-un comunicat. Afirmația este mai slabă decât adevărul pe care îl înlocuiește."),

    h2("Cum se vede distanța, concret"),
    p("Pe site-urile multor firme, aceleași tipare se repetă:"),
    bullet("pagina „Echipă” este o listă de CV-uri, nu o prezentare a unor oameni care iau decizii;"),
    bullet("ariile de practică sunt un catalog de douăzeci de titluri, nu o dovadă a felului în care firma gândește;"),
    bullet("limbajul repetă ce spun toți: „soluții integrate”, „orientare către client”, „standarde internaționale”;"),
    bullet("rezultatele — partea cea mai convingătoare — apar rar, și atunci abstract."),
    p("Niciunul dintre aceste lucruri nu este o greșeală gravă. Împreună, însă, fac o firmă puternică să pară obișnuită."),

    figure(fig1, "Doi profesioniști în discuție — alinierea pornește de la oamenii și judecata care există deja", capF1Ro, capF1En),

    pullQuote("O firmă de avocatură nu are nevoie să devină altceva. Are nevoie de o expresie mai clară a ceea ce este deja."),

    h2("De ce reinventarea nu închide distanța"),
    p("Văzând că nu se diferențiază, multe firme cred că au nevoie de o reinventare. De obicei, nu au."),
    p("Reinventarea schimbă ceea ce firma este. Distanța, însă, nu vine din ceea ce firma este — vine din felul în care se exprimă. Un brand nou peste aceeași distanță o mută, nu o închide."),
    p("În plus, reinventarea poate fi imitată. Oricine își poate cumpăra un site nou. Ceea ce nu poate fi imitat este adevărul unei firme: mandatele ei, oamenii ei, judecata ei."),

    h2("Cum se închide distanța"),
    p("Alinierea pornește de la ce există deja și o face vizibil. Concret:"),
    bullet("în locul „expertizei vaste”, un mandat spus bine: ce era în joc, ce a fost greu, ce s-a rezolvat;"),
    bullet("în locul catalogului de arii, felul în care firma gândește în una care contează;"),
    bullet("în locul listei de CV-uri, oamenii care au luat deciziile — cu nume, cu judecată;"),
    bullet("în locul afirmațiilor, dovezi pe care clientul le poate verifica."),
    p("Nimic din toate astea nu cere o firmă nouă. Toate pornesc de la ce este deja acolo."),

    h2("De ce contează pentru client"),
    p("Clientul care alege un avocat nu citește afirmațiile. Le ignoră — pentru că le-a văzut la toți. Caută dovezi: un mandat asemănător cu al lui, un om în care poate avea încredere, o judecată pe care o poate anticipa."),
    p("Cu cât distanța dintre fond și formă este mai mică, cu atât decizia clientului este mai ușoară. Iar o firmă ușor de înțeles este o firmă ușor de ales."),

    callout("Un test de 30 de secunde", "Deschide propriul site și întreabă-te:"),
    bullet("prima dovadă concretă — un mandat, un rezultat — la cât scroll apare?"),
    bullet("pagina de echipă arată niște oameni sau niște funcții?"),
    bullet("câte afirmații despre noi aș putea înlocui cu o dovadă?"),
    bullet("ce ar pierde site-ul dacă aș șterge toate adjectivele?"),

    statement("Observație", "Pentru o firmă de avocatură matură, cea mai mare oportunitate nu este o imagine nouă, ci închiderea distanței dintre ceea ce este deja și felul în care este percepută. Nu se construiește valoare nouă — valoarea există. Se exprimă mai fidel cea care există de mult. Mai puțină declarație. Mai multă demonstrație."),

    p("La M81 pornim mereu de la ceea ce o firmă de avocatură este deja și îi aliniem expresia — brand, comunicare, experiență digitală — la valoarea reală a organizației. Dacă recunoști această distanță în propria firmă, putem începe cu o discuție."),
  ];

  const bodyEn = [
    lead("There's a distance few law firms measure: the one between how good the firm is and how good it looks."),
    p("A firm can have real expertise, important mandates and valuable people — and still be perceived as just another firm. Not because it lacks value, but because the value isn't visible."),
    p("This distance isn't closed with more work. The firm already works. It's closed with a more faithful expression."),

    h2("Where the distance comes from"),
    p("The distance almost always appears in the same place: in the way a firm talks about itself, rather than about what it does."),
    p("A firm that led a deal worth hundreds of millions writes “recognized expertise in mergers and acquisitions” on its homepage. The adjective makes it to the front page; the mandate — the real proof — stays buried in a press release. The claim is weaker than the truth it replaces."),

    h2("How the distance shows, concretely"),
    p("On many firms' websites, the same patterns repeat:"),
    bullet("the “Team” page is a list of CVs, not a presentation of people who make decisions;"),
    bullet("the practice areas are a catalog of twenty titles, not proof of how the firm thinks;"),
    bullet("the language repeats what everyone says: “integrated solutions,” “client-focused,” “international standards”;"),
    bullet("the results — the most convincing part — appear rarely, and then in the abstract."),
    p("None of these is a serious mistake on its own. Together, however, they make a strong firm look ordinary."),

    figure(fig1, "Two professionals in conversation — alignment starts from the people and judgment that already exist", capF1Ro, capF1En),

    pullQuote("A law firm doesn't need to become something else. It needs a clearer expression of what it already is."),

    h2("Why reinvention doesn't close the distance"),
    p("Seeing that they don't stand out, many firms believe they need a reinvention. Usually, they don't."),
    p("Reinvention changes what the firm is. But the distance doesn't come from what the firm is — it comes from how it expresses itself. A new brand over the same distance moves it, it doesn't close it."),
    p("What's more, reinvention can be imitated. Anyone can buy a new website. What can't be imitated is a firm's truth: its mandates, its people, its judgment."),

    h2("How the distance closes"),
    p("Alignment starts from what already exists and makes it visible. Concretely:"),
    bullet("instead of “broad expertise,” one mandate told well: what was at stake, what was hard, what was resolved;"),
    bullet("instead of a catalog of areas, the way the firm thinks in one that matters;"),
    bullet("instead of a list of CVs, the people who made the decisions — with names, with judgment;"),
    bullet("instead of claims, proof the client can verify."),
    p("None of this requires a new firm. It all starts from what is already there."),

    h2("Why it matters to the client"),
    p("The client choosing a lawyer doesn't read the claims. They ignore them — because they've seen them everywhere. They look for proof: a mandate similar to their own, a person they can trust, a judgment they can anticipate."),
    p("The smaller the distance between substance and form, the easier the client's decision. And a firm that's easy to understand is a firm that's easy to choose."),

    callout("A 30-second test", "Open your own website and ask yourself:"),
    bullet("the first concrete proof — a mandate, a result — appears after how much scrolling?"),
    bullet("does the team page show people or functions?"),
    bullet("how many claims about us could I replace with proof?"),
    bullet("what would the site lose if I deleted every adjective?"),

    statement("Observation", "For a mature law firm, the biggest opportunity isn't a new image, but closing the distance between what it already is and how it's perceived. No new value is built — the value exists. The value that has long existed is expressed more faithfully. Less declaration. More demonstration."),

    p("At M81 we always start from what a law firm already is and align its expression — brand, communication, digital experience — with the organization's real value. If you recognize this distance in your own firm, we can begin with a conversation."),
  ];

  const doc = {
    _type: "article",
    category: "strategic",
    slug: { _type: "slug", current: "distanta-dintre-cat-de-buna-e-o-firma-si-cat-de-buna-pare" },
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Spațiu de firmă premium și calm — maturitatea unei organizații care nu are nevoie să se reinventeze",
    },
    topics: ["Strategie", "Avocatură", "Diferențiere"],
    titleRo: "Distanța dintre cât de bună e o firmă și cât de bună pare",
    subtitleRo: "Pentru o firmă de avocatură matură, cea mai mare oportunitate nu este o imagine nouă, ci închiderea distanței dintre ceea ce este deja și felul în care este percepută.",
    excerptRo: "O firmă de avocatură poate fi mai puternică decât pare — nu pentru că nu are valoare, ci pentru că valoarea nu se vede. Despre distanța dintre fond și formă, și de ce se închide prin aliniere, nu prin reinventare.",
    bodyRo,
    titleEn: "The distance between how good a firm is and how good it looks",
    subtitleEn: "For a mature law firm, the biggest opportunity isn't a new image, but closing the distance between what it already is and how it's perceived.",
    excerptEn: "A law firm can be stronger than it looks — not because it lacks value, but because the value isn't visible. On the distance between substance and form, and why it closes through alignment, not reinvention.",
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
