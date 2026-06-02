// Articol Technology & Experience #2 — AI (RO + EN, mockup-uri proprii RO).
import { readFileSync } from "node:fs";
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;
const DIR = "/Users/m81studio/Desktop/Dosar Imagini articole/AI, website-uri și noua generație de experiențe digitale";

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

  const coverId = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780428542735_b611f392.png`, "ai-cover-brightflow.png");
  const fig1 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780428191271_ce35edfc.png`, "ai-fig1-asistent.png");
  const fig2 = await uploadFile(`${DIR}/openart-gpt-image-2-1_1780428285392_7e696605.png`, "ai-fig2-informaai.png");

  const capF1Ro = "Interacțiune dintre un utilizator și o interfață digitală asistată de inteligență artificială.";
  const capF1En = "A user interacting with a digital interface assisted by artificial intelligence.";
  const capF2Ro = "Exemplu de experiență digitală modernă construită în jurul personalizării și asistenței inteligente.";
  const capF2En = "An example of a modern digital experience built around personalization and intelligent assistance.";

  const bodyRo = [
    lead("Website-urile au fost construite pentru navigare. AI începe să le transforme în experiențe conversaționale."),
    p("Timp de mulți ani, experiența digitală a fost construită în jurul acelorași principii."),
    p("Meniuri. Pagini. Categorii. Formulare."),
    p("Utilizatorii trebuiau să găsească singuri informația de care aveau nevoie."),
    p("Astăzi, comportamentul începe să se schimbe."),
    p("Oamenii sunt din ce în ce mai obișnuiți să pună o întrebare și să primească direct un răspuns."),
    p("Această schimbare influențează nu doar tehnologia, ci și modul în care sunt concepute website-urile, aplicațiile și experiențele digitale."),

    h2("De la navigare la conversație"),
    p("Majoritatea website-urilor funcționează încă după aceeași logică."),
    p("Utilizatorul intră. Explorează meniuri. Accesează pagini. Caută informații."),
    p("Inteligența artificială introduce o abordare diferită. Conversația."),
    p("În loc să navigheze prin zeci de secțiuni, utilizatorul poate explica ce caută și poate fi ghidat direct către informația relevantă."),
    p("Pentru afaceri, acest lucru înseamnă o oportunitate de a reduce complexitatea și de a simplifica experiența."),

    figure(fig1, "Utilizator interacționând cu o interfață asistată de AI", capF1Ro, capF1En),

    h2("Website-ul nu mai este doar un website"),
    p("În trecut, rolul principal al unui website era să prezinte informații."),
    p("Astăzi, utilizatorii se așteaptă la mai mult."),
    p("Vor răspunsuri rapide. Vor recomandări. Vor asistență. Vor experiențe personalizate."),
    p("Pe măsură ce AI devine tot mai accesibil, website-urile încep să evolueze din simple biblioteci de informații în sisteme interactive capabile să înțeleagă contextul și intenția utilizatorului."),
    p("Această schimbare este vizibilă deja în numeroase industrii."),

    h2("Aplicațiile devin mai inteligente"),
    p("Impactul AI nu se limitează la website-uri."),
    p("Aplicațiile moderne încep să integreze funcții care adaptează experiența în funcție de utilizator."),
    p("Recomandări personalizate. Asistență contextuală. Automatizări. Fluxuri dinamice."),
    p("Scopul nu este înlocuirea utilizatorului. Scopul este reducerea efortului necesar pentru a ajunge la rezultat."),

    pullQuote("Utilizatorii nu mai compară experiențele digitale cu alte website-uri. Le compară cu cele mai bune produse pe care le folosesc zilnic."),

    h2("Ce înseamnă asta pentru branding"),
    p("De multe ori, brandingul este asociat doar cu identitatea vizuală."),
    p("Logo. Culori. Tipografie."),
    p("În realitate, experiența digitală devine tot mai importantă în modul în care oamenii percep un brand."),
    p("Un proces simplu. Un răspuns rapid. O experiență intuitivă."),
    p("Toate acestea contribuie la percepția profesionalismului și a încrederii."),
    p("Pe măsură ce AI transformă produsele digitale, experiența devine parte integrantă din identitatea brandului."),

    callout("De reținut", ""),
    bullet("AI schimbă modul în care utilizatorii caută informații"),
    bullet("conversația începe să înlocuiască navigarea tradițională"),
    bullet("website-urile evoluează către sisteme interactive"),
    bullet("aplicațiile devin mai personalizate și mai eficiente"),
    bullet("experiența digitală influențează tot mai mult percepția brandului"),

    figure(fig2, "Experiență digitală modernă cu personalizare și asistență inteligentă", capF2Ro, capF2En),

    h2("Ce urmează"),
    p("Nu toate website-urile vor deveni produse bazate pe AI. Nu toate aplicațiile vor avea asistenți inteligenți."),
    p("Însă așteptările utilizatorilor se schimbă deja."),
    p("Oamenii caută experiențe mai simple. Mai rapide. Mai clare. Mai relevante."),
    p("În acest context, organizațiile care reușesc să combine tehnologia, experiența utilizatorului și brandingul au oportunitatea de a crea produse digitale mai utile și mai memorabile."),

    statement("Experiența devine diferențiator", "Inteligența artificială nu schimbă doar tehnologia. Schimbă modul în care oamenii interacționează cu produsele digitale. În următorii ani, avantajul competitiv nu va veni doar din funcționalități, ci din capacitatea de a transforma procese complexe în experiențe simple, intuitive și relevante."),
  ];

  const bodyEn = [
    lead("Websites were built for navigation. AI is starting to turn them into conversational experiences."),
    p("For many years, the digital experience was built around the same principles."),
    p("Menus. Pages. Categories. Forms."),
    p("Users had to find the information they needed on their own."),
    p("Today, behavior is starting to change."),
    p("People are increasingly used to asking a question and getting a direct answer."),
    p("This shift influences not only technology, but also how websites, apps and digital experiences are designed."),

    h2("From navigation to conversation"),
    p("Most websites still work on the same logic."),
    p("The user enters. Explores menus. Visits pages. Looks for information."),
    p("Artificial intelligence introduces a different approach. Conversation."),
    p("Instead of navigating through dozens of sections, the user can explain what they're looking for and be guided directly to the relevant information."),
    p("For businesses, this means an opportunity to reduce complexity and simplify the experience."),

    figure(fig1, "A user interacting with an AI-assisted interface", capF1Ro, capF1En),

    h2("A website is no longer just a website"),
    p("In the past, a website's main role was to present information."),
    p("Today, users expect more."),
    p("They want fast answers. They want recommendations. They want assistance. They want personalized experiences."),
    p("As AI becomes more accessible, websites start to evolve from simple libraries of information into interactive systems capable of understanding the user's context and intent."),
    p("This shift is already visible across many industries."),

    h2("Apps are becoming smarter"),
    p("The impact of AI isn't limited to websites."),
    p("Modern apps are starting to integrate features that adapt the experience to the user."),
    p("Personalized recommendations. Contextual assistance. Automations. Dynamic flows."),
    p("The goal isn't to replace the user. The goal is to reduce the effort needed to reach a result."),

    pullQuote("Users no longer compare digital experiences with other websites. They compare them with the best products they use every day."),

    h2("What this means for branding"),
    p("Branding is often associated only with visual identity."),
    p("Logo. Colors. Typography."),
    p("In reality, the digital experience is becoming increasingly important in how people perceive a brand."),
    p("A simple process. A fast answer. An intuitive experience."),
    p("All of this contributes to the perception of professionalism and trust."),
    p("As AI transforms digital products, experience becomes an integral part of the brand's identity."),

    callout("Worth keeping in mind", ""),
    bullet("AI is changing how users search for information"),
    bullet("conversation is starting to replace traditional navigation"),
    bullet("websites are evolving into interactive systems"),
    bullet("apps are becoming more personalized and more efficient"),
    bullet("the digital experience increasingly shapes brand perception"),

    figure(fig2, "A modern digital experience with personalization and intelligent assistance", capF2Ro, capF2En),

    h2("What comes next"),
    p("Not all websites will become AI-based products. Not all apps will have intelligent assistants."),
    p("But user expectations are already changing."),
    p("People look for experiences that are simpler. Faster. Clearer. More relevant."),
    p("In this context, organizations that manage to combine technology, user experience and branding have the opportunity to create digital products that are more useful and more memorable."),

    statement("Experience becomes the differentiator", "Artificial intelligence doesn't just change technology. It changes how people interact with digital products. In the coming years, the competitive advantage won't come only from features, but from the ability to turn complex processes into simple, intuitive and relevant experiences."),
  ];

  const doc = {
    _type: "article",
    category: "technology",
    slug: { _type: "slug", current: "ai-website-uri-si-noua-generatie-de-experiente-digitale" },
    publishedAt: new Date().toISOString(),
    readTime: 6,
    featured: false,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: "Produs digital modern cu funcții de inteligență artificială" },
    topics: ["AI", "Tehnologie", "Experiență digitală"],
    titleRo: "AI, website-uri și noua generație de experiențe digitale",
    subtitleRo: "Inteligența artificială începe să schimbe modul în care utilizatorii caută informații, interacționează cu afacerile și folosesc produsele digitale.",
    excerptRo: "Inteligența artificială mută experiența digitală de la navigare la conversație. Website-urile și aplicațiile evoluează în sisteme care înțeleg intenția utilizatorului — iar experiența devine parte din brand.",
    bodyRo,
    titleEn: "AI, websites and the new generation of digital experiences",
    subtitleEn: "Artificial intelligence is starting to change how users search for information, interact with businesses and use digital products.",
    excerptEn: "AI is moving the digital experience from navigation to conversation. Websites and apps are evolving into systems that understand user intent — and experience becomes part of the brand.",
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
