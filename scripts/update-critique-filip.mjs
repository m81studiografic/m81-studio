// Înlocuiește Design critique Filip (versiunea subțire) cu una concretă, respectuoasă, din studiul real.
// Folosește capturi REALE ale site-ului Filip (decupate landscape) — exthe subiectului analizat.
import fs from "node:fs";
const TOKEN = process.env.SANITY_TOKEN;
const DATASET = "production";
const BASE = "https://bkejlgaa.api.sanity.io/v2025-05-30";
const SLUG = "filip-and-company-cand-website-ul-nu-reflecta-nivelul-brandului";

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

async function uploadLocal(path, filename) {
  const buf = fs.readFileSync(path);
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

  const coverId = await uploadLocal("/tmp/hp_hero.jpg", "filip-real-home.jpg");
  const figContent = await uploadLocal("/tmp/hp_mid.jpg", "filip-real-insights.jpg");
  const figTeam = await uploadLocal("/tmp/team_a.jpg", "filip-real-team.jpg");

  // _id existent
  const q = encodeURIComponent(`*[_type=="article" && slug.current=="${SLUG}"][0]._id`);
  const id = (await (await fetch(`${BASE}/data/query/production?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } })).json()).result;
  if (!id) throw new Error("doc not found");

  const capContentRo = "Secțiunea de conținut și insights — bogată și serioasă, dar organizată în jurul afirmației („Leading Law Firm in Romania”), nu al dovezii concrete.";
  const capContentEn = "The content and insights section — rich and serious, but organized around a claim (“Leading Law Firm in Romania”) rather than concrete proof.";
  const capTeamRo = "Pagina „Echipă” — portrete puternice, dar prezentate ca un director filtrabil (caută, filtrează „by role”), nu ca o experiență.";
  const capTeamEn = "The “Team” page — strong portraits, but presented as a filterable directory (search, filter “by role”), not as an experience.";

  const bodyRo = [
    lead("Filip & Company este recunoscută drept una dintre cele mai importante firme de avocatură din România. Reputația este solidă, portofoliul impresionant, clasamentele internaționale o confirmă constant. Privită strict ca experiență digitală, însă, povestea este alta."),
    p("Acest text nu evaluează activitatea juridică a firmei — care nu este pusă la îndoială. Analizează un singur lucru: cât din nivelul real al organizației ajunge la cineva care o întâlnește prima dată online."),
    p("Pe scurt: problema nu este funcționalitatea. Este percepția. Experiența digitală nu reflectă încă nivelul real al firmei."),

    h2("Prima impresie: seriozitate, dar fără amprentă"),
    p("La prima vizită, website-ul transmite ordine și seriozitate. Totul este curat, organizat, controlat."),
    p("În același timp, experiența pare surprinzător de generică. Dacă logo-ul ar fi acoperit, multe secțiuni ar putea aparține unei firme de consultanță, audit sau servicii B2B. Identitatea este profesionistă. Dar nu este distinctă."),

    h2("Branding vizual: sigur, dar nememorabil"),
    p("Paleta este sigură, tipografia funcțională, layout-ul familiar. Toate contribuie la claritate — și mai puțin la memorabilitate."),
    p("Un element are potențial real: nuanța aubergine, mai rară într-o industrie dominată de albastru închis. Este însă folosită discret, fără să devină o semnătură."),

    h2("Oamenii: cel mai puternic activ, tratat funcțional"),
    p("Una dintre cele mai valoroase resurse ale firmei este echipa. Portretele transmit caracter, calm și încredere reală."),
    p("Paradoxal, secțiunea dedicată oamenilor este tratată mai degrabă ca un director intern decât ca prezentarea uneia dintre cele mai importante echipe juridice din țară. Aici se pierde cea mai mare oportunitate."),

    figure(figTeam, "Pagina Echipă a site-ului Filip & Company — portrete puternice prezentate ca un director filtrabil", capTeamRo, capTeamEn),

    h2("Două voci"),
    p("Analiza comunicării scoate la iveală două voci. Una vorbește despre firmă — abstractă, cu afirmații despre leadership și excelență. Cealaltă vorbește despre activitate — mandate, tranzacții, rezultate — și este mult mai credibilă."),
    p("Vocea care demonstrează este mai puternică decât vocea care afirmă. Dar, în comunicarea instituțională, prima domină."),

    figure(figContent, "Secțiunea de conținut și Legal News a site-ului Filip & Company", capContentRo, capContentEn),

    pullQuote("Website-ul transmite competență și stabilitate. Transmite însă mai puțin diferențiere, sofisticare și leadership."),

    callout("Puncte forte", "Ceea ce experiența digitală face deja bine:"),
    bullet("reputație excelentă"),
    bullet("structură clară"),
    bullet("UX peste media industriei"),
    bullet("poziționare bine definită"),
    bullet("credibilitate ridicată"),

    callout("Oportunități", "Unde experiența poate ajunge la nivelul firmei:"),
    bullet("identitate vizuală mai distinctă"),
    bullet("experiență premium mai puternică"),
    bullet("prezentarea expertizei într-un mod mai memorabil"),
    bullet("valorificarea oamenilor și a culturii"),
    bullet("diferențiere prin design și percepție"),

    h2("Ce înseamnă asta"),
    p("Filip & Company nu are nevoie de un redesign pentru a rezolva probleme funcționale. Website-ul își îndeplinește rolul. Întrebarea este alta: reflectă el nivelul real al firmei? Analiza sugerează că nu în totalitate."),
    p("În prezent, experiența digitală transmite competență și stabilitate. Mai puțin leadership, mai puțină sofisticare, mai puțină diferențiere. Aici este oportunitatea următoarei etape."),

    statement("Evaluare generală", "Filip & Company beneficiază de una dintre cele mai puternice reputații din industria juridică românească. Website-ul este clar, funcțional și bine organizat, însă experiența digitală nu capitalizează încă pe deplin valoarea brandului. Principala oportunitate nu este corectarea unor probleme, ci alinierea imaginii digitale la nivelul real de sofisticare, influență și expertiză al organizației."),

    p("Aceasta este o analiză independentă, realizată de M81 ca exercițiu de observație — nu un proiect comandat. Facem astfel de studii pentru firme de avocatură care vor ca experiența lor digitală să reflecte nivelul real al organizației. Dacă te recunoști în aceste întrebări, putem începe cu o discuție."),
  ];

  const bodyEn = [
    lead("Filip & Company is recognized as one of the most important law firms in Romania. The reputation is solid, the portfolio impressive, international rankings consistently confirm it. Looked at strictly as a digital experience, however, the story is different."),
    p("This text doesn't evaluate the firm's legal work — which isn't in question. It analyzes one thing only: how much of the organization's real level reaches someone encountering it online for the first time."),
    p("In short: the problem isn't functionality. It's perception. The digital experience doesn't yet reflect the firm's real level."),

    h2("First impression: seriousness, but no signature"),
    p("On the first visit, the website conveys order and seriousness. Everything is clean, organized, controlled."),
    p("At the same time, the experience feels surprisingly generic. If the logo were covered, many sections could belong to a consulting, audit or B2B services firm. The identity is professional. But it isn't distinctive."),

    h2("Visual branding: safe, but unmemorable"),
    p("The palette is safe, the typography functional, the layout familiar. All contribute to clarity — and less to memorability."),
    p("One element has real potential: the aubergine shade, rarer in an industry dominated by dark blue. But it's used discreetly, without becoming a signature."),

    h2("People: the strongest asset, treated functionally"),
    p("One of the firm's most valuable assets is its team. The portraits convey character, calm and real trust."),
    p("Paradoxically, the section dedicated to people is treated more like an internal directory than the presentation of one of the most important legal teams in the country. This is where the biggest opportunity is lost."),

    figure(figTeam, "The Team page of the Filip & Company website — strong portraits presented as a filterable directory", capTeamRo, capTeamEn),

    h2("Two voices"),
    p("Analyzing the communication reveals two voices. One speaks about the firm — abstract, with claims about leadership and excellence. The other speaks about the work — mandates, transactions, results — and is far more credible."),
    p("The voice that demonstrates is stronger than the voice that asserts. But in the institutional communication, the first dominates."),

    figure(figContent, "The content and Legal News section of the Filip & Company website", capContentRo, capContentEn),

    pullQuote("The website conveys competence and stability. But it conveys less differentiation, sophistication and leadership."),

    callout("Strengths", "What the digital experience already does well:"),
    bullet("excellent reputation"),
    bullet("clear structure"),
    bullet("UX above the industry average"),
    bullet("well-defined positioning"),
    bullet("high credibility"),

    callout("Opportunities", "Where the experience can reach the level of the firm:"),
    bullet("a more distinctive visual identity"),
    bullet("a stronger premium experience"),
    bullet("presenting expertise in a more memorable way"),
    bullet("making the most of the people and the culture"),
    bullet("differentiation through design and perception"),

    h2("What this means"),
    p("Filip & Company doesn't need a redesign to fix functional problems. The website does its job. The question is different: does it reflect the firm's real level? The analysis suggests not entirely."),
    p("Right now, the digital experience conveys competence and stability. Less leadership, less sophistication, less differentiation. This is the opportunity for the next stage."),

    statement("Overall assessment", "Filip & Company enjoys one of the strongest reputations in the Romanian legal industry. The website is clear, functional and well organized, but the digital experience doesn't yet fully capitalize on the brand's value. The main opportunity isn't fixing problems, but aligning the digital image with the organization's real level of sophistication, influence and expertise."),

    p("This is an independent analysis, carried out by M81 as an exercise in observation — not a commissioned project. We make studies like this for law firms that want their digital experience to reflect the organization's real level. If you recognize yourself in these questions, we can begin with a conversation."),
  ];

  const set = {
    titleRo: "Filip & Company: când website-ul nu reflectă încă nivelul firmei",
    titleEn: "Filip & Company: when the website doesn't yet reflect the firm's level",
    subtitleRo: "O analiză independentă a felului în care una dintre cele mai respectate firme de avocatură din România este reprezentată digital — și unde experiența rămâne în urma organizației.",
    subtitleEn: "An independent analysis of how one of Romania's most respected law firms is represented digitally — and where the experience lags behind the organization.",
    excerptRo: "Filip & Company are una dintre cele mai puternice reputații din avocatura românească. Analiza arată însă că experiența digitală nu reflectă încă pe deplin nivelul de sofisticare și diferențiere al firmei.",
    excerptEn: "Filip & Company has one of the strongest reputations in Romanian law. The analysis shows, however, that the digital experience doesn't yet fully reflect the firm's level of sophistication and differentiation.",
    caseClient: "Filip & Company",
    caseTimeline: "2026",
    caseServices: ["Branding", "Comunicare", "UX", "Experiență digitală"],
    metrics: [
      metric("9.5/10", "Credibilitate", "Credibility"),
      metric("8/10", "Structură website", "Website structure"),
      metric("7/10", "UX", "UX"),
      metric("5.5/10", "Branding vizual", "Visual branding"),
      metric("4.5/10", "Experiență premium", "Premium experience"),
      metric("4/10", "Diferențiere vizuală", "Visual differentiation"),
    ],
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Pagina principală a site-ului Filip & Company — analiză de branding și experiență digitală" },
    bodyRo,
    bodyEn,
  };

  const r = await fetch(`${BASE}/data/mutate/production`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id, set } }] }),
  });
  console.log(JSON.stringify((await r.json()).results));
}

main().catch((e) => { console.error(e); process.exit(1); });
