// Re-ancorează 2 articole generale la targetul avocatură (RO + EN) + cârlig elegant spre colaborare.
// Reutilizează imaginile deja încărcate (nu re-uploadează). Patch pe documentele live, după slug.
const TOKEN = process.env.SANITY_TOKEN;
const BASE = "https://bkejlgaa.api.sanity.io/v2025-05-30";

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

// asset-uri deja încărcate (din rularea seed-urilor)
const IMG = {
  brandDistinct: "image-8a87fa13aad4371996973b9a4c737041dcceb72d-2000x1333-jpg",
  brandSpatiu: "image-d4af0df1869033d03d60d92e4c90c9d1714aff33-2000x1333-jpg",
  techExpertiza: "image-e4be2c5fbb8f3e5f91e5a25b37c94ed983f23750-2000x1335-jpg",
  techUman: "image-02644550a75c1e051d6cd599ebf17287591cbb15-2000x1333-jpg",
};

async function idBySlug(slug) {
  const q = encodeURIComponent(`*[_type=="article" && slug.current=="${slug}"][0]._id`);
  const r = await fetch(`${BASE}/data/query/production?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  return (await r.json()).result;
}

async function patch(id, set) {
  const r = await fetch(`${BASE}/data/mutate/production`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id, set } }] }),
  });
  return (await r.json()).results;
}

/* ════ ARTICOL 1 — BRANDING (ancorat avocatură) ════ */
const branding = {
  slug: "un-brand-nu-se-inventeaza-se-descopera",
  set: {
    titleRo: "Brandul unei firme de avocatură nu se inventează, se descoperă",
    titleEn: "A law firm's brand isn't invented — it's discovered",
    subtitleRo: "Cele mai puternice firme de avocatură nu își construiesc un brand peste organizație, ci îl scot la lumină din ea — din oameni, mandate și felul propriu de a lucra.",
    subtitleEn: "The strongest law firms don't build a brand on top of the organization — they draw it out of it: from people, mandates and their own way of working.",
    excerptRo: "Într-o industrie în care multe firme arată la fel, brandul nu se inventează cu un logo nou. Se descoperă în ceea ce firma este deja — și se traduce într-o formă pe care clienții o pot vedea și ține minte.",
    excerptEn: "In an industry where many firms look alike, a brand isn't invented with a new logo. It's discovered in what the firm already is — and translated into a form clients can see and remember.",
    topics: ["Branding", "Avocatură", "Identitate"],
    bodyRo: [
      lead("Cele mai puternice firme de avocatură nu își inventează un brand. Îl descoperă — în ceea ce fac deja, nu în ceea ce și-ar dori să pară."),
      p("Într-o industrie în care multe firme arată la fel, tentația este să cauți diferențierea într-un logo nou, o culoare nouă, un site nou. Dar diferențierea reală nu se adaugă la suprafață."),
      p("Întrebarea nu este „cum vrem să arătăm?”, ci „cine suntem deja, cu adevărat?”."),
      p("Brandul unei firme de avocatură nu este o imagine așezată peste firmă. Este expresia fidelă a ceea ce firma este deja."),

      h2("Forma vine din fond"),
      p("Înainte de identitatea vizuală, există ceva mai important: fondul. Expertiza reală. Mandatele. Cultura de parteneriat. Felul în care firma tratează un client la ora opt seara."),
      p("Când forma vine din fond, brandul transmite autoritate. Când forma este împrumutată din convențiile industriei, firma sună ca oricare alta."),

      h2("Unde se ascunde brandul unei firme"),
      p("Brandul real nu stă în logo. Stă în lucruri pe care firma le face deja, adesea fără să le observe."),
      p("În oamenii din echipă și în felul în care sunt prezentați. În mandatele importante, lăsate să vorbească prin rezultate. În judecata profesională din spatele fiecărei decizii. În coerența dintre ce promite firma și ce livrează."),
      p("Aceste lucruri există deja. Rolul brandingului nu este să le inventeze, ci să le facă vizibile."),

      figure(IMG.brandDistinct, "Diferențierea reală nu se adaugă — iese la suprafață din ceea ce firma este deja", "Diferențierea reală nu se adaugă — iese la suprafață din ceea ce firma este deja.", "Real differentiation isn't added — it surfaces from what the firm already is."),

      pullQuote("O firmă de avocatură nu are nevoie de o identitate mai puternică. Are nevoie de o expresie mai fidelă a identității pe care o deține deja."),

      h2("De ce inventarea se vede"),
      p("Un brand inventat încearcă să convingă. Un brand descoperit doar arată."),
      p("Inventarea se trădează prin afirmații — „lideri”, „excelență”, „cei mai buni”. Descoperirea se exprimă prin dovezi — mandate, oameni, rezultate."),
      p("Clienții simt diferența. Una cere încredere. Cealaltă o inspiră — exact ceea ce caută cineva care alege un avocat."),

      figure(IMG.brandSpatiu, "Brandul unei firme trăiește în lucruri concrete: un birou, un detaliu, un fel propriu de a lucra", "Brandul unei firme trăiește în lucruri concrete: un birou, un detaliu, un fel propriu de a lucra.", "A firm's brand lives in concrete things: an office, a detail, a particular way of working."),

      h2("Rolul brandingului: traducere, nu ficțiune"),
      p("A construi brandul unei firme de avocatură nu înseamnă a inventa o poveste. Înseamnă a observa atent, a înțelege fondul și a-l traduce într-o formă pe care clienții o pot vedea, înțelege și ține minte."),
      p("Mai puțină declarație. Mai multă demonstrație. Mai puțină fațadă. Mai mult adevăr."),

      callout("Un brand descoperit", "Recunoști brandul unei firme construit din fond, nu inventat, după câteva semne:"),
      bullet("pornește de la expertiza și oamenii care există deja"),
      bullet("exprimă fondul, nu îl ascunde sub convenții de industrie"),
      bullet("folosește dovezi — mandate, rezultate —, nu afirmații"),
      bullet("este fidel firmei și, în același timp, distinct în piață"),
      bullet("rezistă în timp, pentru că este adevărat"),

      statement("Observație", "O firmă de avocatură puternică nu își construiește brandul împotriva realității ei, ci din ea. Cele mai memorabile firme nu inventează ceva nou — fac vizibil ceea ce era deja acolo: expertiza, oamenii, judecata. Rolul brandingului nu este să transforme firma în altceva, ci să o ajute să fie înțeleasă și aleasă pentru ceea ce este deja."),

      p("La M81 studiem și construim experiențe de brand pentru firme de avocatură — pornind mereu de la ceea ce există deja, nu de la ceea ce ar putea părea. Dacă întrebările din acest articol îți sună cunoscut, putem începe cu o discuție."),
    ],
    bodyEn: [
      lead("The strongest law firms don't invent a brand. They discover it — in what they already do, not in what they wish they looked like."),
      p("In an industry where many firms look alike, the temptation is to look for differentiation in a new logo, a new color, a new website. But real differentiation isn't added at the surface."),
      p("The question isn't “how do we want to look?” — it's “who are we already, truly?”"),
      p("A law firm's brand isn't an image placed on top of the firm. It's the faithful expression of what the firm already is."),

      h2("Form comes from substance"),
      p("Before the visual identity, there is something more important: the substance. The real expertise. The mandates. The partnership culture. The way the firm treats a client at eight in the evening."),
      p("When form comes from substance, the brand conveys authority. When form is borrowed from the conventions of the industry, the firm sounds like any other."),

      h2("Where a firm's brand hides"),
      p("The real brand isn't in the logo. It's in things the firm already does, often without noticing."),
      p("In the people on the team and the way they're presented. In the important mandates, left to speak through results. In the professional judgment behind every decision. In the consistency between what the firm promises and what it delivers."),
      p("These things already exist. The role of branding isn't to invent them, but to make them visible."),

      figure(IMG.brandDistinct, "Real differentiation isn't added — it surfaces from what the firm already is", "Diferențierea reală nu se adaugă — iese la suprafață din ceea ce firma este deja.", "Real differentiation isn't added — it surfaces from what the firm already is."),

      pullQuote("A law firm doesn't need a stronger identity. It needs a more faithful expression of the identity it already holds."),

      h2("Why invention shows"),
      p("An invented brand tries to convince. A discovered brand simply shows."),
      p("Invention gives itself away through claims — “leaders,” “excellence,” “the best.” Discovery expresses itself through proof — mandates, people, results."),
      p("Clients feel the difference. One asks for trust. The other inspires it — exactly what someone choosing a lawyer is looking for."),

      figure(IMG.brandSpatiu, "A firm's brand lives in concrete things: an office, a detail, a particular way of working", "Brandul unei firme trăiește în lucruri concrete: un birou, un detaliu, un fel propriu de a lucra.", "A firm's brand lives in concrete things: an office, a detail, a particular way of working."),

      h2("The role of branding: translation, not fiction"),
      p("Building a law firm's brand doesn't mean inventing a story. It means observing closely, understanding the substance, and translating it into a form clients can see, understand and remember."),
      p("Less declaration. More demonstration. Less façade. More truth."),

      callout("A discovered brand", "You recognize a firm's brand built from substance, not invented, by a few signs:"),
      bullet("it starts from the expertise and people that already exist"),
      bullet("it expresses the substance rather than hiding it under industry conventions"),
      bullet("it uses proof — mandates, results — not claims"),
      bullet("it is faithful to the firm and, at the same time, distinct in the market"),
      bullet("it lasts over time, because it is true"),

      statement("Observation", "A strong law firm doesn't build its brand against its own reality, but out of it. The most memorable firms don't invent something new — they make visible what was already there: the expertise, the people, the judgment. The role of branding isn't to turn the firm into something else, but to help it be understood and chosen for what it already is."),

      p("At M81 we study and build brand experiences for law firms — always starting from what already exists, not from what might appear. If the questions in this article sound familiar, we can begin with a conversation."),
    ],
  },
};

/* ════ ARTICOL 2 — TEHNOLOGIE (ancorat avocatură) ════ */
const tech = {
  slug: "tehnologia-nu-inlocuieste-increderea-o-amplifica",
  set: {
    titleRo: "Tehnologia într-o firmă de avocatură nu înlocuiește încrederea, o amplifică",
    titleEn: "In a law firm, technology doesn't replace trust — it amplifies it",
    subtitleRo: "Pentru o firmă de avocatură, tehnologia nu construiește încrederea — o face mai ușor de găsit, de înțeles și de simțit. Despre tehnologia care servește expertiza, nu o ascunde.",
    subtitleEn: "For a law firm, technology doesn't build trust — it makes it easier to find, understand and feel. On technology that serves expertise rather than hiding it.",
    excerptRo: "Întrebarea pentru o firmă de avocatură nu este „câtă tehnologie?”, ci „în slujba cui?”. Despre tehnologia care nu impresionează, ci face mai accesibilă valoarea reală a firmei: oamenii, judecata și expertiza.",
    excerptEn: "The question for a law firm isn't “how much technology?” but “in service of what?”. On technology that doesn't impress, but makes the firm's real value more accessible: people, judgment and expertise.",
    topics: ["Tehnologie", "Avocatură", "Experiență digitală"],
    bodyRo: [
      lead("Pentru o firmă de avocatură, tehnologia nu construiește încrederea. O face mai ușor de găsit, de înțeles și de simțit."),
      p("Multe firme privesc tehnologia ca pe un scop. Un site nou. Mai multe funcții. Un „portal client”. Mai mult „digital”."),
      p("Întrebarea reală nu este însă „câtă tehnologie?”, ci „în slujba cui?”."),

      h2("Încrederea rămâne umană"),
      p("Clienții nu au încredere într-o platformă. Au încredere în oameni, în judecată, în experiență, în felul în care sunt tratați. Într-o firmă de avocatură, asta contează mai mult decât oriunde."),
      p("Tehnologia nu poate înlocui acest lucru. Dar îl poate face mai vizibil. Un website nu inspiră încredere prin animații, ci prin claritate și prin felul în care prezintă oamenii și expertiza din spate."),

      h2("De la arhivă la experiență"),
      p("Multe firme de avocatură investesc semnificativ în conținut — articole, analize, actualizări legislative. Publică mult și valorifică puțin. Informația există, însă rămâne închisă într-o arhivă greu de parcurs."),
      p("Tehnologia bine folosită transformă arhiva în experiență. Expertiza devine conectată, contextualizată, ușor de descoperit de clientul care caută un răspuns."),
      p("Nu adaugi mai mult. Faci ca expertiza care există deja să fie mai accesibilă."),

      figure(IMG.techExpertiza, "Tehnologia bine gândită stă în spatele oamenilor și al expertizei, nu în fața lor", "Tehnologia bine gândită stă în spatele oamenilor și al expertizei, nu în fața lor.", "Well-considered technology stands behind people and expertise, not in front of them."),

      pullQuote("Tehnologia nu este o promisiune nouă pentru o firmă de avocatură. Este un mod de a face vizibilă expertiza care există deja."),

      h2("Tehnologia care dispare"),
      p("Cea mai bună tehnologie nu se vede. Nu impresionează. Reduce frecarea, scoate barierele și lasă omul și expertiza în prim-plan."),
      p("Când tehnologia devine spectacol, atrage atenția asupra ei. Când este bine gândită, atrage atenția asupra a ceea ce contează: judecata și oamenii firmei."),

      figure(IMG.techUman, "O conversație în jurul unui laptop — tehnologia susține schimbul uman, nu îl înlocuiește", "O conversație în jurul unui laptop — tehnologia susține schimbul uman, nu îl înlocuiește.", "A conversation around a laptop — technology supports the human exchange, it doesn't replace it."),

      h2("Tehnologia în slujba expertizei, nu invers"),
      p("Pentru o firmă de avocatură, oportunitatea nu este să urmărească tendințe sau să adopte tehnologie de dragul tehnologiei. Este să folosească tehnologia pentru a susține ceea ce este deja valoros: oamenii, judecata, experiența, cunoașterea."),
      p("Mai puțină tehnologie de dragul ei. Mai multă tehnologie în slujba înțelegerii. Mai puțin zgomot. Mai multă claritate."),

      callout("Tehnologie bine folosită", "Recunoști tehnologia care servește o firmă de avocatură, nu o ascunde, după câteva semne:"),
      bullet("pornește de la oameni și expertiză, nu de la funcții"),
      bullet("face expertiza conectată și ușor de descoperit"),
      bullet("reduce frecarea pentru client, nu o adaugă"),
      bullet("susține încrederea, nu o înlocuiește"),
      bullet("dispare în spatele experienței"),

      statement("Observație", "Pentru o firmă de avocatură, tehnologia nu este un scop, ci un instrument. Într-un domeniu construit pe încredere, rolul ei nu este să impresioneze, ci să facă mai accesibilă valoarea reală a firmei — oamenii, judecata și experiența. Cele mai bune experiențe digitale nu se remarcă prin tehnologie, ci prin claritatea cu care lasă expertiza să se vadă."),

      p("La M81 studiem și construim experiențe digitale pentru firme de avocatură — în care tehnologia susține oamenii și expertiza, nu le ascunde. Dacă te regăsești în aceste întrebări, putem începe cu o discuție."),
    ],
    bodyEn: [
      lead("For a law firm, technology doesn't build trust. It makes it easier to find, understand and feel."),
      p("Many firms treat technology as a goal. A new website. More features. A “client portal.” More “digital.”"),
      p("But the real question isn't “how much technology?” — it's “in service of what?”"),

      h2("Trust remains human"),
      p("Clients don't trust a platform. They trust people, judgment, experience, the way they're treated. In a law firm, this matters more than anywhere."),
      p("Technology can't replace this. But it can make it more visible. A website doesn't inspire trust through animations, but through clarity and the way it presents the people and the expertise behind it."),

      h2("From archive to experience"),
      p("Many law firms invest significantly in content — articles, analyses, legislative updates. They publish a lot and leverage little. The information exists, but stays locked in an archive that's hard to navigate."),
      p("Well-used technology turns the archive into an experience. Expertise becomes connected, contextualized, easy to discover for the client looking for an answer."),
      p("You don't add more. You make the expertise that already exists more accessible."),

      figure(IMG.techExpertiza, "Well-considered technology stands behind people and expertise, not in front of them", "Tehnologia bine gândită stă în spatele oamenilor și al expertizei, nu în fața lor.", "Well-considered technology stands behind people and expertise, not in front of them."),

      pullQuote("Technology isn't a new promise for a law firm. It's a way to make visible the expertise that already exists."),

      h2("Technology that disappears"),
      p("The best technology isn't seen. It doesn't show off. It reduces friction, removes barriers and keeps the person and the expertise in the foreground."),
      p("When technology becomes a spectacle, it draws attention to itself. When it's well-considered, it draws attention to what matters: the judgment and the people of the firm."),

      figure(IMG.techUman, "A conversation around a laptop — technology supports the human exchange, it doesn't replace it", "O conversație în jurul unui laptop — tehnologia susține schimbul uman, nu îl înlocuiește.", "A conversation around a laptop — technology supports the human exchange, it doesn't replace it."),

      h2("Technology in service of expertise, not the other way around"),
      p("For a law firm, the opportunity isn't to chase trends or adopt technology for its own sake. It's to use technology to support what is already valuable: people, judgment, experience, knowledge."),
      p("Less technology for its own sake. More technology in service of understanding. Less noise. More clarity."),

      callout("Well-used technology", "You recognize technology that serves a law firm rather than hiding it by a few signs:"),
      bullet("it starts from people and expertise, not from features"),
      bullet("it makes expertise connected and easy to discover"),
      bullet("it reduces friction for the client rather than adding it"),
      bullet("it supports trust rather than replacing it"),
      bullet("it disappears behind the experience"),

      statement("Observation", "For a law firm, technology isn't a goal, but a tool. In a field built on trust, its role isn't to impress, but to make the firm's real value more accessible — the people, the judgment and the experience. The best digital experiences don't stand out through technology, but through the clarity with which they let the expertise show."),

      p("At M81 we study and build digital experiences for law firms — where technology supports the people and the expertise rather than hiding them. If you recognize yourself in these questions, we can begin with a conversation."),
    ],
  },
};

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");
  for (const art of [branding, tech]) {
    const id = await idBySlug(art.slug);
    if (!id) { console.log(`NOT FOUND: ${art.slug}`); continue; }
    const res = await patch(id, art.set);
    console.log(`${art.slug} → ${JSON.stringify(res)}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
