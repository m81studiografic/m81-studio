// Articol Design critique — Filip & Company (RO + EN, cover + 2 imagini placeholder).
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
const metric = (value, labelRo, labelEn) => ({ _type: "metric", _key: k(), value, labelRo, labelEn });

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

  // PLACEHOLDERE — de înlocuit cu screenshot-uri reale ale site-ului Filip & Company
  const coverId = await upload("https://images.unsplash.com/photo-1423592707957-3b212afa6733?auto=format&fit=crop&w=2520&q=80", "filip-cover.jpg");
  const fig1 = await upload("https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=2000&q=80", "filip-fig1.jpg");
  const fig2 = await upload("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=2000&q=80", "filip-fig2.jpg");

  const bodyRo = [
    lead("Filip & Company este recunoscută ca una dintre cele mai importante firme de avocatură din România."),
    p("Reputația este puternică. Portofoliul este impresionant. Clasamentele internaționale confirmă constant poziția firmei în piață."),
    p("Privit însă strict ca experiență digitală și produs de brand, website-ul spune o poveste diferită."),
    p("Problema nu este funcționalitatea. Problema este percepția. Experiența digitală nu pare să reflecte nivelul real al organizației."),

    h2("Prima impresie"),
    p("La prima vizită, website-ul transmite seriozitate și ordine."),
    p("Totul este curat. Totul este organizat. Totul este controlat."),
    p("În același timp, experiența pare surprinzător de generică."),
    p("Dacă logo-ul ar fi eliminat, multe secțiuni ar putea aparține unei firme de consultanță, audit, resurse umane sau servicii B2B."),
    p("Identitatea este profesionistă. Dar nu este distinctă."),

    figure(fig1, "Direcția vizuală și structura paginii principale a unui website de avocatură", "Direcția vizuală și structura paginii principale a unui website de avocatură.", "The visual direction and structure of a law firm's homepage."),

    h2("Branding vizual"),
    p("Aici apare cea mai mare diferență dintre firmă și reprezentarea sa digitală."),
    p("Paleta cromatică este sigură. Tipografia este funcțională. Layout-ul este familiar."),
    p("Toate aceste decizii contribuie la claritate. Însă contribuie mai puțin la memorabilitate."),
    p("Website-ul transmite imaginea unei organizații mari și stabile. Nu transmite însă o identitate vizuală puternică sau un limbaj de brand ușor de recunoscut."),
    p("Există foarte puține elemente care să creeze o amprentă distinctă în memoria utilizatorului."),

    h2("Experiența utilizatorului"),
    p("Structura este bine construită. Navigarea este intuitivă. Informațiile sunt organizate logic."),
    p("Din această perspectivă, website-ul performează peste media industriei."),
    p("Totuși, experiența este predominant informativă."),
    p("Utilizatorul citește. Navighează. Descoperă informații. Interacționează foarte puțin."),
    p("Pentru standardele actuale ale serviciilor profesionale, acest lucru este suficient. Pentru standardele digitale către care ne îndreptăm, există spațiu semnificativ de evoluție."),

    pullQuote("Website-ul transmite competență și stabilitate. Transmite însă mai puțin diferențiere, sofisticare și leadership."),

    h2("Oamenii și expertiza"),
    p("Una dintre cele mai valoroase resurse ale firmei este echipa."),
    p("Paradoxal, secțiunea dedicată oamenilor este tratată mai degrabă funcțional decât experiențial."),
    p("Profilurile sunt bine organizate. Informațiile sunt accesibile."),
    p("Însă experiența amintește mai mult de un director intern decât de prezentarea uneia dintre cele mai importante echipe juridice din România."),
    p("Pentru o firmă construită în jurul expertizei umane, aceasta reprezintă o oportunitate importantă."),

    callout("Puncte forte", ""),
    bullet("reputație excelentă"),
    bullet("structură clară"),
    bullet("UX peste media industriei"),
    bullet("poziționare foarte bine definită"),
    bullet("credibilitate ridicată"),

    callout("Oportunități", ""),
    bullet("identitate vizuală mai distinctă"),
    bullet("experiență premium mai puternică"),
    bullet("prezentarea expertizei într-un mod mai memorabil"),
    bullet("experiențe digitale interactive"),
    bullet("diferențiere prin design și percepție"),

    figure(fig2, "Exemple de structură editorială și prezentare a conținutului pe website", "Exemple de structură editorială și prezentare a conținutului pe website.", "Examples of editorial structure and content presentation on the website."),

    h2("Ce înseamnă asta"),
    p("Filip & Company nu are nevoie de un redesign pentru a rezolva probleme funcționale. Website-ul își îndeplinește rolul."),
    p("Întrebarea este alta. Reflectă el nivelul real al firmei?"),
    p("Analiza sugerează că nu în totalitate."),
    p("În prezent, experiența digitală transmite competență și stabilitate. Mai puțin leadership. Mai puțin sofisticare. Mai puțin diferențiere."),
    p("Aceasta este oportunitatea următoarei etape de evoluție."),

    statement("Evaluare generală", "Filip & Company beneficiază de una dintre cele mai puternice reputații din industria juridică românească. Website-ul este clar, funcțional și bine organizat, însă experiența digitală nu capitalizează pe deplin valoarea brandului. Principala oportunitate identificată nu este corectarea unor probleme majore, ci alinierea imaginii digitale la nivelul real de sofisticare, influență și expertiză al organizației."),
  ];

  const bodyEn = [
    lead("Filip & Company is recognized as one of the most important law firms in Romania."),
    p("The reputation is strong. The portfolio is impressive. International rankings consistently confirm the firm's position in the market."),
    p("Looked at strictly as a digital experience and a brand product, however, the website tells a different story."),
    p("The problem isn't functionality. The problem is perception. The digital experience doesn't seem to reflect the real level of the organization."),

    h2("First impression"),
    p("On the first visit, the website conveys seriousness and order."),
    p("Everything is clean. Everything is organized. Everything is controlled."),
    p("At the same time, the experience feels surprisingly generic."),
    p("If the logo were removed, many sections could belong to a consulting, audit, HR or B2B services firm."),
    p("The identity is professional. But it isn't distinctive."),

    figure(fig1, "The visual direction and structure of a law firm's homepage", "Direcția vizuală și structura paginii principale a unui website de avocatură.", "The visual direction and structure of a law firm's homepage."),

    h2("Visual branding"),
    p("This is where the biggest difference between the firm and its digital representation appears."),
    p("The color palette is safe. The typography is functional. The layout is familiar."),
    p("All these decisions contribute to clarity. But they contribute less to memorability."),
    p("The website conveys the image of a large, stable organization. It doesn't, however, convey a strong visual identity or an easily recognizable brand language."),
    p("There are very few elements that create a distinctive imprint in the user's memory."),

    h2("User experience"),
    p("The structure is well built. The navigation is intuitive. The information is logically organized."),
    p("From this perspective, the website performs above the industry average."),
    p("Still, the experience is predominantly informational."),
    p("The user reads. Navigates. Discovers information. Interacts very little."),
    p("By the current standards of professional services, this is enough. By the digital standards we're heading toward, there's significant room to evolve."),

    pullQuote("The website conveys competence and stability. It conveys less differentiation, sophistication and leadership."),

    h2("People and expertise"),
    p("One of the firm's most valuable assets is its team."),
    p("Paradoxically, the section dedicated to people is treated functionally rather than experientially."),
    p("The profiles are well organized. The information is accessible."),
    p("But the experience feels more like an internal directory than the presentation of one of the most important legal teams in Romania."),
    p("For a firm built around human expertise, this represents an important opportunity."),

    callout("Strengths", ""),
    bullet("excellent reputation"),
    bullet("clear structure"),
    bullet("UX above the industry average"),
    bullet("very well-defined positioning"),
    bullet("high credibility"),

    callout("Opportunities", ""),
    bullet("a more distinctive visual identity"),
    bullet("a stronger premium experience"),
    bullet("presenting expertise in a more memorable way"),
    bullet("interactive digital experiences"),
    bullet("differentiation through design and perception"),

    figure(fig2, "Examples of editorial structure and content presentation on the website", "Exemple de structură editorială și prezentare a conținutului pe website.", "Examples of editorial structure and content presentation on the website."),

    h2("What this means"),
    p("Filip & Company doesn't need a redesign to fix functional problems. The website does its job."),
    p("The question is different. Does it reflect the real level of the firm?"),
    p("The analysis suggests not entirely."),
    p("Right now, the digital experience conveys competence and stability. Less leadership. Less sophistication. Less differentiation."),
    p("This is the opportunity for the next stage of evolution."),

    statement("Overall assessment", "Filip & Company enjoys one of the strongest reputations in the Romanian legal industry. The website is clear, functional and well organized, but the digital experience doesn't fully capitalize on the value of the brand. The main opportunity identified isn't fixing major problems, but aligning the digital image with the organization's real level of sophistication, influence and expertise."),
  ];

  const doc = {
    _type: "article",
    category: "case",
    slug: { _type: "slug", current: "filip-and-company-cand-website-ul-nu-reflecta-nivelul-brandului" },
    publishedAt: new Date().toISOString(),
    readTime: 8,
    featured: false,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: "Filip & Company — analiză de branding și experiență digitală",
    },
    topics: ["Design critique", "Avocatură", "Branding"],
    caseClient: "Filip & Company",
    caseTimeline: "2026",
    caseServices: ["Branding", "UX", "Experiență digitală", "Comunicare vizuală"],
    metrics: [
      metric("9.5/10", "Credibilitate", "Credibility"),
      metric("8/10", "Structură website", "Website structure"),
      metric("7/10", "UX", "UX"),
      metric("5.5/10", "Branding vizual", "Visual branding"),
      metric("4.5/10", "Experiență premium", "Premium experience"),
      metric("4/10", "Diferențiere vizuală", "Visual differentiation"),
    ],
    titleRo: "Filip & Company: când website-ul nu reflectă nivelul brandului",
    subtitleRo: "O analiză a modului în care una dintre cele mai respectate firme de avocatură din România este reprezentată digital și a diferenței dintre reputația organizației și experiența oferită de website.",
    excerptRo: "Filip & Company beneficiază de o reputație excepțională în industria juridică. Analiza arată însă că experiența digitală și identitatea vizuală nu reușesc să transmită pe deplin nivelul de sofisticare și diferențiere al firmei.",
    bodyRo,
    titleEn: "Filip & Company: when the website doesn't reflect the brand's level",
    subtitleEn: "An analysis of how one of Romania's most respected law firms is represented digitally — and the gap between the organization's reputation and the experience its website offers.",
    excerptEn: "Filip & Company enjoys an exceptional reputation in the legal industry. The analysis shows, however, that the digital experience and visual identity don't fully convey the firm's level of sophistication and differentiation.",
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
