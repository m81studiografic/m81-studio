/* ──────────────────────────────────────────────────────────────────────
   STUDIES — biblioteca publică de cercetare M81.
   Cercetare independentă: investigații, observații și explorări conceptuale
   despre organizații, branduri, comunicare și experiențe digitale.

   Conținutul este curatoriat editorial din cercetarea originală M81 — păstrăm
   structura, vocea și concluziile; alegem pasajele cele mai puternice și le
   țesem cu dovada vizuală (text + imagine împreună, nu separat).
   ────────────────────────────────────────────────────────────────────── */

export type Locale = "ro" | "en";

export interface L {
  ro: string;
  en: string;
}

export interface Img {
  src: string;
  w: number;
  h: number;
}

/* ── Mișcări: unitatea de conținut care țese text + imagine ── */
export type Movement =
  | { t: "lead"; v: L }
  | { t: "text"; heading?: L; body: L[] }
  | { t: "pull"; v: L }
  | { t: "split"; img: Img; flip?: boolean; label?: L; heading?: L; body: L[]; caption?: L; frame?: "browser" }
  | { t: "full"; img: Img; label?: L; title?: L; caption?: L }
  | { t: "beforeAfter"; heading?: L; body?: L[]; before: Img; after: Img; beforeLabel: L; afterLabel: L }
  | { t: "principles"; heading: L; lead?: L; items: { k: L; v: L }[]; close?: L }
  | { t: "list"; label: L; items: L[] }
  | { t: "statement"; heading?: L; v: L };

/* ── Carduri pe pagina index ── */
export interface StudyCard {
  number: string;
  slug: string;
  client: string;
  meta: L;
  kicker: L;
  excerpt: L;
  status: "published" | "coming-soon";
  cover?: Img;
}

export interface Study {
  slug: string;
  client: string;
  meta: L;
  kicker: L;
  /* hero */
  heroIntro: L;
  heroImage: Img;
  /* overview */
  overview: L[];
  facts: { label: L; value: L }[];
  metrics?: { value: string; label: L }[];
  /* secțiuni țesute */
  research: Movement[];
  vision: Movement[];
  final: Movement[];
}

/* imagini concept — Hale & Mercer, firmă demonstrativă fictivă */
const I = {
  cover: { src: "/studies/hale-mercer/study-cover.png", w: 1536, h: 2048 },
  question: { src: "/studies/hale-mercer/research-question.png", w: 1086, h: 1448 },
  conceptReveal: { src: "/studies/hale-mercer/concept-reveal.png", w: 1536, h: 2048 },
  typographyVerbal: { src: "/studies/hale-mercer/typography-verbal.png", w: 2048, h: 1152 },
  photography: { src: "/studies/hale-mercer/photography-human-presence.png", w: 1536, h: 2048 },
  visualWorld: { src: "/studies/hale-mercer/visual-world-foundation.png", w: 1086, h: 1448 },
  masterBrand: { src: "/studies/hale-mercer/master-brand-direction.png", w: 1536, h: 2048 },
  brandExpression: { src: "/studies/hale-mercer/brand-expression.png", w: 1536, h: 2048 },
  demoBeforeDeclaration: { src: "/studies/hale-mercer/demonstration-before-declaration.png", w: 1536, h: 2048 },
  homepage: { src: "/studies/hale-mercer/homepage-desktop.png", w: 1152, h: 2048 },
  digitalMatter: { src: "/studies/hale-mercer/digital-experience-matter.png", w: 2048, h: 1152 },
  mobile: { src: "/studies/hale-mercer/mobile-experience.png", w: 1536, h: 2048 },
  beyondScreen: { src: "/studies/hale-mercer/beyond-the-screen.png", w: 1536, h: 2048 },
  reflection: { src: "/studies/hale-mercer/reflection-claiming-vs-showing.png", w: 1536, h: 2048 },
};

/* ════════════════════════════════════════════════════════════════════════
   STUDIU 01 — THE FORM OF AUTHORITY
   Demonstrație conceptuală independentă. Hale & Mercer este o firmă
   fictivă, construită special pentru acest studiu ca vehicul de testare
   a conceptului rezultat din cercetare — nu un client real.
   ════════════════════════════════════════════════════════════════════════ */

const formOfAuthority: Study = {
  slug: "the-form-of-authority",
  client: "Hale & Mercer",
  meta: { ro: "Studiu independent · Demonstrație conceptuală · 2026", en: "Independent Study · Conceptual Demonstration · 2026" },
  kicker: {
    ro: "Cum devine autoritatea perceptibilă fără să fie declarată?",
    en: "How does authority become perceptible without being declared?",
  },
  heroIntro: {
    ro: "Un studiu independent despre autoritate, percepție și expresia unui brand — demonstrat printr-o firmă fictivă de avocatură de afaceri, construită special pentru acest experiment.",
    en: "An independent study about authority, perception and brand expression — demonstrated through a fictional business-law firm, built specifically for this experiment.",
  },
  heroImage: I.cover,

  overview: [
    {
      ro: "Acest studiu investighează felul în care autoritatea devine perceptibilă într-un brand fără să fie declarată explicit. Cercetarea a pornit de la o observație simplă: organizațiile încearcă adesea să comunice autoritate prin limbaj, statut și coduri vizuale recognoscibile — dar autoritatea reală nu apare neapărat acolo unde este afirmată cel mai tare.",
      en: "This study investigates how authority becomes perceptible in a brand without being explicitly declared. The research started from a simple observation: organizations often try to communicate authority through language, status and recognizable visual codes — but real authority doesn't necessarily appear where it's asserted the loudest.",
    },
    {
      ro: "Hale & Mercer este o firmă fictivă, construită special pentru acest studiu — un vehicul prin care ideea rezultată din cercetare, „Autoritate Calmă”, a putut fi testată într-un sistem de brand complet: identitate, oameni, limbaj și experiență digitală. Nu este un client real, ci un experiment independent M81.",
      en: "Hale & Mercer is a fictional firm, built specifically for this study — a vehicle through which the concept that emerged from the research, “Quiet Authority,” could be tested across a complete brand system: identity, people, language and digital experience. It is not a real client, but an independent M81 experiment.",
    },
  ],
  facts: [
    { label: { ro: "Studiu", en: "Study" }, value: { ro: "Autoritate Calmă / Quiet Authority", en: "Quiet Authority" } },
    { label: { ro: "Vehicul demonstrativ", en: "Demonstrative vehicle" }, value: { ro: "Hale & Mercer (firmă fictivă)", en: "Hale & Mercer (fictional firm)" } },
    { label: { ro: "Sector", en: "Sector" }, value: { ro: "Avocatură de afaceri, premium", en: "Business law, premium" } },
    { label: { ro: "An", en: "Year" }, value: { ro: "2026", en: "2026" } },
    {
      label: { ro: "Perspective", en: "Lenses" },
      value: { ro: "Cercetare · Concept · Identitate · Experiență digitală", en: "Research · Concept · Identity · Digital experience" },
    },
  ],

  /* ════ STUDIUL DE CERCETARE ════ */
  research: [
    {
      t: "lead",
      v: {
        ro: "Autoritatea reală nu apare neapărat acolo unde este afirmată cel mai tare.",
        en: "Real authority doesn't necessarily appear where it's asserted the loudest.",
      },
    },
    {
      t: "text",
      heading: { ro: "Întrebarea", en: "The question" },
      body: [
        {
          ro: "Organizațiile încearcă adesea să comunice autoritate prin limbaj, statut, formalitate, superlative sau coduri vizuale recognoscibile. Dar afirmația nu produce automat percepția — de multe ori, cu cât o organizație încearcă mai mult să își proclame valoarea, cu atât devine mai vizibil efortul de a o demonstra.",
          en: "Organizations often try to communicate authority through language, status, formality, superlatives or recognizable visual codes. But the claim doesn't automatically produce the perception — often, the harder an organization tries to proclaim its value, the more visible the effort becomes.",
        },
        {
          ro: "De aici a pornit întrebarea centrală a studiului: poate un brand să exprime autoritate fără să o performeze?",
          en: "From here came the study's central question: can a brand express authority without performing it?",
        },
      ],
    },
    {
      t: "full",
      img: I.question,
      label: { ro: "Cercetare", en: "Research" },
      title: { ro: "Cum devine autoritatea perceptibilă fără să fie declarată?", en: "How does authority become perceptible without being declared?" },
      caption: {
        ro: "Autoritatea a fost urmărită prin poziționare, oameni, cultură, spațiu, limbaj, identitate vizuală și experiență digitală.",
        en: "Authority was traced through positioning, people, culture, space, language, visual identity and digital experience.",
      },
    },
    {
      t: "text",
      heading: { ro: "Ce am observat", en: "What we observed" },
      body: [
        {
          ro: "Cele mai puternice surse de autoritate nu erau grafice. Erau competența, experiența, rezultatele, oamenii, reputația și comportamentul organizației. Brandul nu creează autoritatea din nimic — o poate însă amplifica, clarifica sau, dimpotrivă, dilua.",
          en: "The strongest sources of authority weren't graphic. They were competence, experience, results, people, reputation and behaviour. A brand doesn't create authority out of nothing — but it can amplify it, clarify it, or dilute it.",
        },
      ],
    },
    {
      t: "pull",
      v: { ro: "Autoritatea exista înaintea brandului.", en: "Authority existed before the brand." },
    },
    {
      t: "split",
      img: I.typographyVerbal,
      heading: { ro: "Declarat versus demonstrat", en: "Declared versus demonstrated" },
      body: [
        {
          ro: "Comunicarea care afirmă cere publicului să creadă. Comunicarea care arată îi oferă motive. Expertiza devine mai puternică atunci când este demonstrată decât atunci când este declarată.",
          en: "Communication that claims asks the audience to believe. Communication that shows gives them reasons. Expertise becomes stronger when it's demonstrated rather than declared.",
        },
      ],
      caption: {
        ro: "Sistemul verbal, în practică: aceeași expertiză, exprimată prin afirmație — și prin demonstrație.",
        en: "The verbal system, in practice: the same expertise, expressed as a claim — and as a demonstration.",
      },
    },
    {
      t: "split",
      img: I.photography,
      flip: true,
      heading: { ro: "Oamenii spun adevărul mai bine decât discursul oficial", en: "People tell the truth better than official language" },
      body: [
        {
          ro: "În cercetare, dimensiunea umană a transmis frecvent mai multă siguranță decât limbajul instituțional — calm, maturitate, control, fără superlative și fără efort vizibil de a impresiona.",
          en: "In the research, the human dimension frequently conveyed more confidence than institutional language — calm, maturity, control, without superlatives and without a visible effort to impress.",
        },
      ],
      caption: {
        ro: "Autenticitatea nu trebuie întotdeauna inventată. Uneori există deja în oameni, dar nu a fost tradusă coerent în identitate.",
        en: "Authenticity doesn't always need to be invented. Sometimes it already exists in people, but hasn't yet been translated coherently into identity.",
      },
    },
    {
      t: "pull",
      v: {
        ro: "Reținerea nu este lipsă de personalitate. Poate fi efectul unei identități suficient de sigure încât să nu aibă nevoie de spectacol.",
        en: "Restraint isn't a lack of personality. It can be the effect of an identity secure enough that it doesn't need spectacle.",
      },
    },
    {
      t: "statement",
      heading: { ro: "Tensiunea centrală", en: "The central tension" },
      v: {
        ro: "Autoritatea poate fi proclamată sau poate fi percepută. Autoritatea proclamată spune „privește cât de puternici suntem”. Autoritatea percepută produce altă reacție: „simt că știu ce fac”.",
        en: "Authority can be proclaimed, or it can be perceived. Proclaimed authority says “look how powerful we are.” Perceived authority produces a different reaction: “I can tell they know what they're doing.”",
      },
    },
    {
      t: "statement",
      heading: { ro: "Esența", en: "The essence" },
      v: {
        ro: "Autoritatea autentică nu are nevoie să se proclame. Trebuie să poată fi percepută. Brandul nu trebuie să creeze iluzia autorității — trebuie să permită realității organizației să devină vizibilă.",
        en: "Authentic authority doesn't need to proclaim itself. It needs to be perceptible. A brand shouldn't create the illusion of authority — it should let the organization's reality become visible.",
      },
    },
  ],

  /* ════ VIZIUNE & EXPLORARE CONCEPTUALĂ ════ */
  vision: [
    {
      t: "full",
      img: I.conceptReveal,
      label: { ro: "Concept", en: "Concept" },
      title: { ro: "Autoritate Calmă", en: "Quiet Authority" },
      caption: {
        ro: "O autoritate care nu se anunță. Se dovedește.",
        en: "An authority that doesn't announce itself. It proves itself.",
      },
    },
    {
      t: "text",
      heading: { ro: "Principiul central", en: "The central principle" },
      body: [
        {
          ro: "Autoritate Calmă înlocuiește revendicarea cu demonstrația, autodefinirea cu dovada, zgomotul cu claritatea. Nu înseamnă timiditate sau lipsă de energie — înseamnă siguranța de a nu demonstra mai mult decât este necesar.",
          en: "Quiet Authority replaces claiming with demonstrating, self-definition with proof, noise with clarity. It isn't timidity or a lack of energy — it's the confidence not to demonstrate more than necessary.",
        },
      ],
    },
    {
      t: "principles",
      heading: { ro: "Cum lucrăm cu conceptul", en: "How the concept works" },
      lead: {
        ro: "„Autoritate Calmă” nu se construiește prin acumulare. Se construiește prin selecție.",
        en: "“Quiet Authority” isn't built through accumulation. It's built through selection.",
      },
      items: [
        { k: { ro: "Păstrăm fondul", en: "We keep the substance" }, v: { ro: "Competența, experiența, oamenii, cultura, caracterul, comportamentul și rezultatele — tot ce este deja real și valoros.", en: "Competence, experience, people, culture, character, behaviour and results — everything that's already real and valuable." } },
        { k: { ro: "Amplificăm dovada", en: "We amplify the proof" }, v: { ro: "Facem vizibil ceea ce demonstrează valoarea: fapte, rezultate, oameni, procese, cunoaștere, impact.", en: "We make visible what demonstrates value: facts, results, people, process, knowledge, impact." } },
        { k: { ro: "Simplificăm forma", en: "We simplify the form" }, v: { ro: "Reducem tot ce împiedică înțelegerea — nu ca să sărăcim conținutul, ci ca să-i dăm greutate.", en: "We reduce everything that blocks understanding — not to strip content down, but to give it weight." } },
        { k: { ro: "Eliminăm zgomotul", en: "We remove the noise" }, v: { ro: "Superlativele, autodefinirea excesivă, decorul fără funcție, diferențierea artificială.", en: "Superlatives, excessive self-definition, decoration without function, artificial differentiation." } },
      ],
      close: {
        ro: "Păstrăm fondul. Amplificăm dovada. Simplificăm forma. Eliminăm zgomotul.",
        en: "We keep the substance. We amplify the proof. We simplify the form. We remove the noise.",
      },
    },
    {
      t: "split",
      img: I.visualWorld,
      heading: { ro: "Fundația vizuală", en: "Visual foundation" },
      body: [
        {
          ro: "Direcția este caldă, arhitecturală, reținută — verde pădure adânc, ivoriu cald, alamă periată folosită rar și decisiv. Tipografie disciplinată: un serif pentru autoritate, un grotesc pentru claritate, o monospațiată pentru fapte și date.",
          en: "The direction is warm, architectural, restrained — deep forest green, warm ivory, brushed brass used rarely and decisively. Disciplined typography: a serif for authority, a grotesque for clarity, a monospace for facts and data.",
        },
      ],
      caption: {
        ro: "Sistemul complet — logo, culoare, tipografie, grilă, papetărie, materiale.",
        en: "The complete system — logo, colour, typography, grid, stationery, materials.",
      },
    },
    {
      t: "split",
      img: I.masterBrand,
      flip: true,
      heading: { ro: "Autoritate purtată întâi de mediu", en: "Authority carried by environment first" },
      body: [
        {
          ro: "Camera ține gravitatea. Oamenii aduc judecata. Dovezile confirmă rezultatul. Fotografia urmează o ordine de prioritate: mai întâi atmosfera, apoi prezența umană, la final dovada.",
          en: "The room holds the gravity. People bring the judgment. Evidence confirms the outcome. Photography follows a priority order: atmosphere first, human presence second, proof last.",
        },
      ],
      caption: {
        ro: "Room-led — autoritate simțită înainte de a fi spusă.",
        en: "Room-led — authority felt before it's spoken.",
      },
    },
    {
      t: "split",
      img: I.brandExpression,
      heading: { ro: "Expresia de brand", en: "Brand expression" },
      body: [
        {
          ro: "Papetărie, documente, materiale de prezentare — fiecare piesă tratată cu aceeași disciplină: hârtie ivoriu, muchie de alamă, o singură linie de accent care marchează un moment de decizie.",
          en: "Stationery, documents, presentation materials — every piece treated with the same discipline: ivory paper, a brass edge, a single accent line marking a moment of decision.",
        },
      ],
    },
    {
      t: "split",
      img: I.demoBeforeDeclaration,
      flip: true,
      heading: { ro: "Dovada, la vedere", en: "Proof, in plain sight" },
      body: [
        {
          ro: "Mandatele nu sunt povestite — sunt arătate. Documentul, cronologia, faptele. Sistemul digital devine o extensie a acelorași dovezi.",
          en: "Mandates aren't narrated — they're shown. The document, the timeline, the facts. The digital system becomes an extension of the same evidence.",
        },
      ],
    },
    {
      t: "full",
      img: I.homepage,
      label: { ro: "Experiența digitală", en: "Digital experience" },
      title: { ro: "Clear thinking when it matters.", en: "Clear thinking when it matters." },
      caption: {
        ro: "De la prezentare la înțelegere — website-ul ca sistem de cunoaștere, nu ca arhivă.",
        en: "From presentation to understanding — the website as a system of knowledge, not an archive.",
      },
    },
    {
      t: "split",
      img: I.digitalMatter,
      heading: { ro: "De la declarație la demonstrație", en: "From declaration to demonstration" },
      body: [
        {
          ro: "Fiecare mandat devine o pagină de dovezi: cronologie, fapte-cheie, rezultat. Claritatea înaintea impresiei.",
          en: "Every mandate becomes a page of evidence: timeline, key facts, outcome. Clarity before impression.",
        },
      ],
      caption: {
        ro: "Un dosar tratat ca sistem de cunoaștere, nu ca listă de informații.",
        en: "A matter treated as a system of knowledge, not a list of information.",
      },
    },
    {
      t: "split",
      img: I.mobile,
      flip: true,
      heading: { ro: "Aceeași disciplină, orice ecran", en: "The same discipline, any screen" },
      body: [
        {
          ro: "Reținerea nu se pierde pe mobil — spațiul, ierarhia și tonul rămân identice.",
          en: "Restraint isn't lost on mobile — the space, the hierarchy and the tone stay identical.",
        },
      ],
    },
    {
      t: "full",
      img: I.beyondScreen,
      label: { ro: "Dincolo de ecran", en: "Beyond the screen" },
      title: { ro: "Brandul continuă în experiența oferită", en: "The brand continues in the experience it offers" },
      caption: {
        ro: "În documente, întâlniri, colaborare — brandul nu se termină la website.",
        en: "In documents, meetings, collaboration — the brand doesn't end at the website.",
      },
    },
    {
      t: "full",
      img: I.reflection,
      label: { ro: "Reflecție", en: "Reflection" },
      title: {
        ro: "Autoritatea devine perceptibilă atunci când brandul nu mai declară, ci arată.",
        en: "Authority becomes perceptible when a brand stops claiming and starts showing.",
      },
    },
  ],

  /* ════ FINAL STATEMENT ════ */
  final: [
    {
      t: "statement",
      heading: { ro: "Ce am descoperit", en: "What we discovered" },
      v: {
        ro: "Autoritatea poate exista înainte ca brandul să reușească să o exprime. Expertiza, experiența, rezultatele și încrederea pot exista cu adevărat — și totuși să nu devină perceptibile prin brand. Diferența nu este mereu între a avea și a nu avea valoare, ci între a spune cine ești și a permite celorlalți să înțeleagă cine ești prin ceea ce văd.",
        en: "Authority can exist before a brand manages to express it. Expertise, experience, results and trust can genuinely exist — and still not become perceptible through the brand. The gap isn't always between having and not having value, but between saying who you are and letting others understand who you are through what they see.",
      },
    },
    {
      t: "statement",
      heading: { ro: "Ce creează diferența", en: "What creates the gap" },
      v: {
        ro: "Distanța apare între substanță și expresie — nu pentru că lipsește valoarea, ci pentru că brandurile tind să declare ceea ce ar putea demonstra. Siguranța reală nu are nevoie să ocupe tot spațiul.",
        en: "The gap appears between substance and expression — not because value is missing, but because brands tend to declare what they could instead demonstrate. Real confidence doesn't need to occupy all the space.",
      },
    },
    {
      t: "pull",
      v: {
        ro: "Oportunitatea nu este întotdeauna să construiești o identitate nouă. Poate fi să înțelegi mai bine realitatea existentă și să îi dai o formă mai fidelă.",
        en: "The opportunity isn't always to build a new identity. It can be to understand the existing reality better, and give it a more faithful form.",
      },
    },
    {
      t: "statement",
      heading: { ro: "Direcția", en: "The direction" },
      v: {
        ro: "Autoritate Calmă înlocuiește afirmația cu demonstrația, autodefinirea cu dovada, zgomotul cu claritatea. Nu este o poziționare nouă — este o formă mai clară a ceva ce poate exista deja.",
        en: "Quiet Authority replaces the claim with the demonstration, self-definition with proof, noise with clarity. It isn't a new positioning — it's a clearer form of something that may already exist.",
      },
    },
    {
      t: "pull",
      v: {
        ro: "Poate că cele mai puternice branduri nu sunt cele care inventează cea mai convingătoare poveste. Sunt cele care înțeleg suficient de bine realitatea din spate, încât să îi poată da forma potrivită.",
        en: "Perhaps the strongest brands aren't the ones that invent the most convincing story. They're the ones that understand the reality behind them well enough to give it the right form.",
      },
    },
  ],
};

/* imagini concept — VELDRA, companie demonstrativă fictivă */
const V = {
  cover: { src: "/studies/veldra/study-cover.png", w: 2048, h: 1152 },
  finishedObject: { src: "/studies/veldra/research-finished-object.png", w: 1672, h: 941 },
  insight: { src: "/studies/veldra/the-insight.png", w: 1672, h: 941 },
  conceptReveal: { src: "/studies/veldra/concept-reveal.png", w: 2048, h: 1152 },
  conceptMeaning: { src: "/studies/veldra/concept-meaning.png", w: 2048, h: 1152 },
  creativeDirection: { src: "/studies/veldra/creative-direction.png", w: 1672, h: 941 },
  naming: { src: "/studies/veldra/naming.png", w: 1672, h: 941 },
  wordmark: { src: "/studies/veldra/wordmark-principle.png", w: 1672, h: 941 },
  typography: { src: "/studies/veldra/typography.png", w: 1672, h: 941 },
  colour: { src: "/studies/veldra/colour-system.png", w: 2048, h: 1152 },
  fit: { src: "/studies/veldra/the-fit.png", w: 1672, h: 941 },
  inProcess: { src: "/studies/veldra/brand-in-process.png", w: 2048, h: 1152 },
  heroProject: { src: "/studies/veldra/hero-project-024.png", w: 1600, h: 2000 },
  technical: { src: "/studies/veldra/project-technical-system.png", w: 2048, h: 1152 },
  homepage: { src: "/studies/veldra/homepage.png", w: 1024, h: 1536 },
  makerMark: { src: "/studies/veldra/maker-mark.png", w: 2048, h: 1152 },
  whatCouldYouMake: { src: "/studies/veldra/what-could-you-make.png", w: 1600, h: 2000 },
  showcase: { src: "/studies/veldra/brand-showcase.png", w: 2048, h: 1152 },
  materialWorld: { src: "/studies/veldra/material-world.png", w: 2016, h: 1344 },
};

/* ════════════════════════════════════════════════════════════════════════
   STUDIU 02 — WHAT MAKES IT POSSIBLE
   Demonstrație conceptuală independentă. VELDRA este o companie fictivă,
   construită special pentru acest studiu. Cercetarea provine din organizații
   reale din categorie, care rămân nenumite și neidentificabile.
   ════════════════════════════════════════════════════════════════════════ */

const whatMakesItPossible: Study = {
  slug: "what-makes-it-possible",
  client: "VELDRA",
  meta: { ro: "Studiu independent · Demonstrație conceptuală · 2026", en: "Independent Study · Conceptual Demonstration · 2026" },
  kicker: {
    ro: "Cum devine vizibilă valoarea care se produce înainte ca un obiect să existe?",
    en: "How does value that is created before an object exists become visible?",
  },
  heroIntro: {
    ro: "Un studiu independent despre atelierele de producție la comandă și despre decalajul dintre ceea ce produce valoarea și ceea ce brandul face perceptibil. Demonstrația se face prin VELDRA, o companie fictivă construită special pentru acest experiment.",
    en: "An independent study about custom-production workshops and the gap between what creates value and what a brand makes perceptible. It is demonstrated through VELDRA, a fictional company built specifically for this experiment.",
  },
  heroImage: V.cover,

  overview: [
    {
      ro: "Există companii la care se apelează exact atunci când un lucru nu poate fi cumpărat: o structură gândită pentru un singur spațiu, un obiect care trebuie să se miște, să reziste, să se desfacă pentru transport și să arate impecabil la final. Munca lor se vede în obiectul terminat. Partea care îl face posibil rămâne în atelier: interpretarea ideii, dimensionarea, decizia tehnică, felul în care se întâlnesc meseriile.",
      en: "Some companies are called in exactly when something can't be bought: a structure designed for a single space, an object that has to move, hold up, come apart for transport and still look flawless at the end. Their work is visible in the finished object. The part that makes it possible stays in the workshop: interpreting the idea, sizing it, the technical decision, the way different trades come together.",
    },
    {
      ro: "Studiul a pornit de aici. Am urmărit în profunzime o organizație reală de producție la comandă și am comparat-o cu un eșantion de 12 organizații din aceeași categorie, din România, din Europa și din afara ei. Organizațiile cercetate rămân nenumite.",
      en: "The study started there. We followed one real custom-production organization in depth and compared it with a sample of 12 organizations from the same category, in Romania, across Europe and beyond. The organizations researched remain unnamed.",
    },
    {
      ro: "VELDRA este o companie fictivă, construită special pentru acest studiu. Prin ea, concluzia cercetării a putut fi testată într-un sistem de brand complet: nume, identitate, limbaj, documente de proiect și experiență digitală. VELDRA este un experiment independent M81. Nu reprezintă nicio organizație reală și nici versiunea transformată a vreuneia dintre cele cercetate.",
      en: "VELDRA is a fictional company, built specifically for this study. Through it, the research's conclusion could be tested across a complete brand system: name, identity, language, project documents and digital experience. VELDRA is an independent M81 experiment. It represents no real organization, nor a transformed version of any of those researched.",
    },
  ],
  facts: [
    { label: { ro: "Studiu", en: "Study" }, value: { ro: "Ce face obiectul posibil", en: "What Makes It Possible" } },
    { label: { ro: "Vehicul demonstrativ", en: "Demonstrative vehicle" }, value: { ro: "VELDRA (companie fictivă)", en: "VELDRA (fictional company)" } },
    { label: { ro: "Sector", en: "Sector" }, value: { ro: "Producție la comandă · fabricație specială", en: "Custom production · special fabrication" } },
    { label: { ro: "Cercetare", en: "Research" }, value: { ro: "O organizație în profunzime · 12 comparate", en: "One organization in depth · 12 compared" } },
    { label: { ro: "An", en: "Year" }, value: { ro: "2026", en: "2026" } },
    {
      label: { ro: "Perspective", en: "Lenses" },
      value: { ro: "Cercetare · Concept · Identitate · Experiență digitală", en: "Research · Concept · Identity · Digital experience" },
    },
  ],

  /* ════ STUDIUL DE CERCETARE ════ */
  research: [
    {
      t: "lead",
      v: {
        ro: "Obiectul este vizibil. Inteligența care l-a făcut posibil rămâne, în mare parte, invizibilă.",
        en: "The object is visible. The intelligence that made it possible remains, for the most part, invisible.",
      },
    },
    {
      t: "text",
      heading: { ro: "Întrebarea", en: "The question" },
      body: [
        {
          ro: "Într-un atelier de producție la comandă, fiecare proiect începe cu ceva care încă nu există: o schiță, o machetă, o referință, uneori doar o intenție. Până să devină obiect, intenția trece prin dimensiuni, structură, materiale, greutate, mecanisme, transport și montaj. Aici se iau cele mai multe decizii și tot aici se formează cea mai mare parte a valorii.",
          en: "In a custom-production workshop, every project begins with something that doesn't exist yet: a sketch, a model, a reference, sometimes only an intention. Before it becomes an object, that intention passes through dimensions, structure, materials, weight, mechanisms, transport and installation. This is where most decisions are made, and where most of the value is formed.",
        },
        {
          ro: "Publicul întâlnește însă aproape întotdeauna doar capătul acestui drum.",
          en: "The public, however, almost always meets only the end of that path.",
        },
        {
          ro: "De aici a pornit întrebarea centrală a studiului: cum devine vizibilă valoarea care se produce înainte ca un obiect să existe?",
          en: "Hence the study's central question: how does value that is created before an object exists become visible?",
        },
      ],
    },
    {
      t: "principles",
      heading: { ro: "Ce am cercetat", en: "What we researched" },
      lead: { ro: "Cercetarea a avut două niveluri.", en: "The research worked on two levels." },
      items: [
        {
          k: { ro: "În profunzime · o organizație", en: "In depth · one organization" },
          v: {
            ro: "Primul a urmărit o singură organizație, în profunzime: cum se definește public, ce poate fi observat efectiv în activitatea ei, ce semnale transmite, cum își construiește credibilitatea, cum comunică și ce experiență oferă celui care o descoperă online. Pe tot parcursul am ținut separat ce declară organizația de ce poate fi documentat: fotografii de atelier, desene tehnice, serii de lucru, proiecte instalate.",
            en: "The first followed a single organization in depth: how it defines itself publicly, what can actually be observed in its work, what signals it sends, how it builds credibility, how it communicates, and what experience it offers someone discovering it online. Throughout, we kept what the organization declares separate from what can be documented: workshop photographs, technical drawings, work sequences, installed projects.",
          },
        },
        {
          k: { ro: "În comparație · 12 organizații", en: "In comparison · 12 organizations" },
          v: {
            ro: "Al doilea nivel a pus-o alături de 12 organizații din aceeași categorie. Comparația a avut un rol precis: să separe ce aparține organizației de ce aparține, de fapt, industriei.",
            en: "The second level set it alongside 12 organizations from the same category. The comparison had a precise role: to separate what belongs to the organization from what actually belongs to the industry.",
          },
        },
      ],
    },
    {
      t: "split",
      img: V.finishedObject,
      heading: { ro: "01 · Rezultatul ocupă tot cadrul", en: "01 · The result fills the frame" },
      body: [
        {
          ro: "În această categorie, fotografia obiectului terminat e limbajul vizual comun. Procesul, desenele tehnice și oamenii la lucru apar rar, iar deciziile tehnice și granița dintre contribuția atelierului și cea a autorului ideii rămân aproape mereu nespuse.",
          en: "In this category, photography of the finished object is the shared visual language. Process, technical drawings and people at work rarely appear, while technical decisions and the boundary between the workshop's contribution and that of the idea's author almost always go unspoken.",
        },
        {
          ro: "Organizația cercetată în profunzime avea material pentru mult mai mult: desene cotate, mecanisme, serii fotografice ale aceluiași obiect în diferite stadii, relația dintre o randare și obiectul construit după ea. Toate existau, dar stăteau la marginea experienței. În prim-plan era un portofoliu de obiecte fără titlu, fără context și fără rolul atelierului în realizarea lor.",
          en: "The organization studied in depth had material for far more: dimensioned drawings, mechanisms, photo series of the same object at different stages, the relationship between a rendering and the object built from it. All of it existed, but it sat at the edge of the experience. In the foreground was a portfolio of objects without titles, without context and without the workshop's role in making them.",
        },
      ],
      caption: {
        ro: "Ce vede publicul: obiectul terminat. Rezultatul concentrează toată atenția, iar drumul care l-a făcut posibil rămâne în afara cadrului. Imagine din demonstrația VELDRA.",
        en: "What the public sees: the finished object. The result holds all the attention, while the path that made it possible stays outside the frame. Image from the VELDRA demonstration.",
      },
    },
    {
      t: "list",
      label: { ro: "Eșantion · 12 organizații", en: "Sample · 12 organizations" },
      items: [
        { ro: "11/12 · procesul, explicat doar la suprafață", en: "11/12 · process explained only superficially" },
        { ro: "12/12 · decizii tehnice nearătate sistematic", en: "12/12 · technical decisions not shown systematically" },
        { ro: "12/12 · granița atelier / autorul ideii, neclarificată", en: "12/12 · workshop / idea author boundary left unclear" },
      ],
    },
    {
      t: "pull",
      v: {
        ro: "Portofoliul arăta că s-au construit multe lucruri. Spunea foarte puțin despre ce a făcut atelierul pentru ca ele să existe.",
        en: "The portfolio showed that many things had been built. It said very little about what the workshop did so that they could exist.",
      },
    },
    {
      t: "text",
      heading: { ro: "02 · Mesajele cele mai vizibile aparțin categoriei", en: "02 · The most visible messages belong to the category" },
      body: [
        {
          ro: "Cele mai vizibile mesaje ale organizației cercetate erau aceleași pe care le folosește întreaga categorie: producția la comandă, calitatea, experiența, ideea transformată în realitate. Elementele care o distingeau cu adevărat stăteau în planul secund: dezvoltarea tehnică demonstrabilă, documentația, capacitatea de a duce proiectul până la montaj. Ingineria, asumată explicit ca disciplină, rămâne rară în întreaga categorie.",
          en: "The most visible messages of the organization researched were the same ones used across the whole category: custom production, quality, experience, ideas turned into reality. What genuinely set it apart sat in the background: demonstrable technical development, documentation, the ability to carry a project through to installation. Engineering, explicitly claimed as a discipline, remains rare across the category.",
        },
        {
          ro: "Tiparul s-a repetat constant: cu cât un mesaj ocupa un loc mai central, cu atât descria mai bine categoria și mai puțin organizația.",
          en: "The pattern held throughout: the more central a message's position, the better it described the category, and the less it described the organization.",
        },
      ],
    },
    {
      t: "list",
      label: { ro: "Frecvența în eșantion · 12 organizații", en: "Frequency in the sample · 12 organizations" },
      items: [
        { ro: "12/12 · producție la comandă", en: "12/12 · custom production" },
        { ro: "10/12 · calitate", en: "10/12 · quality" },
        { ro: "9/12 · anii de experiență", en: "9/12 · years of experience" },
        { ro: "5/12 · ideea transformată în realitate", en: "5/12 · ideas turned into reality" },
        { ro: "4/12 · ingineria, asumată explicit", en: "4/12 · engineering, explicitly claimed" },
      ],
    },
    {
      t: "split",
      img: V.materialWorld,
      flip: true,
      heading: { ro: "03 · Competența apare ca listă. Munca funcționează ca sistem.", en: "03 · Competence appears as a list. The work functions as a system." },
      caption: {
        ro: "Materiale diferite, puse în relație de același desen. Imagine din demonstrația VELDRA.",
        en: "Different materials, brought into relation by the same drawing. Image from the VELDRA demonstration.",
      },
      body: [
        {
          ro: "Metal, lemn, sculptură, pictură, fabricație digitală, montaj: fiecare serviciu avea pagina lui. Proiectele documentate arătau altceva. Aceeași piesă trecea prin mai multe discipline, în ordinea cerută de problemă.",
          en: "Metal, wood, sculpture, painting, digital fabrication, installation: each service had its own page. The documented projects showed something else. The same piece passed through several disciplines, in the order the problem required.",
        },
        {
          ro: "Multidisciplinaritatea e comună în industrie. Ce rămânea neexprimat era integrarea, adică felul în care disciplinele lucrează împreună în jurul aceluiași lucru care trebuie construit.",
          en: "Multidisciplinarity is common across the industry. What remained unexpressed was integration: the way disciplines work together around the same thing that needs to be built.",
        },
      ],
    },
    {
      t: "text",
      heading: { ro: "04 · Cunoașterea există. Aplicarea ei rămâne nespusă.", en: "04 · The knowledge exists. Its application goes unspoken." },
      body: [
        {
          ro: "Textele organizației aveau o densitate tehnică peste media categoriei. Materialele, procedeele, tipologiile și constrângerile erau explicate cu precizia cuiva care cunoaște meseria. Lipsea pasul următor: dimensiunile propriilor lucrări și poveștile de proiect, cu o problemă, o decizie și un rezultat.",
          en: "The organization's texts had a technical density above the category average. Materials, processes, typologies and constraints were explained with the precision of someone who knows the trade. The next step was missing: the dimensions of its own work, and project stories with a problem, a decision and a result.",
        },
      ],
    },
    {
      t: "pull",
      v: {
        ro: "Comunicarea explica foarte bine meseria. Arăta mult mai puțin organizația practicând-o.",
        en: "The communication explained the trade very well. It showed far less of the organization practising it.",
      },
    },
    {
      t: "text",
      heading: { ro: "05 · Experiența presupune un vizitator care știe deja ce caută", en: "05 · The experience assumes a visitor who already knows what they're looking for" },
      body: [
        {
          ro: "Vocabularul era de breaslă, iar cititorul presupus era profesionistul care cunoaște deja procesul. Paginile invitau mai degrabă la lectură decât la o conversație. Capacitatea era descrisă prin formule largi, construite pe „orice” și „indiferent de”. Ele comunică amploare, dar nu arată ce devine concret posibil.",
          en: "The vocabulary belonged to the trade, and the assumed reader was a professional already familiar with the process. The pages invited reading more than conversation. Capability was described through broad formulas built on “any” and “regardless of”. They convey scope, but don't show what becomes concretely possible.",
        },
        {
          ro: "Cine venea doar cu o intenție găsea multă informație și puține repere pentru a înțelege ce ar putea cere.",
          en: "Someone arriving with only an intention found plenty of information, and few cues for understanding what they could ask for.",
        },
      ],
    },
    {
      t: "principles",
      heading: { ro: "Direcția decalajului", en: "The direction of the gap" },
      lead: {
        ro: "Pusă cap la cap, cercetarea a arătat un decalaj constant, mereu în aceeași direcție: ce se poate observa în atelier depășește ce se exprimă public, iar ce se exprimă depășește ce ajunge publicul să trăiască.",
        en: "Taken together, the research revealed a consistent gap, always running in the same direction: what can be observed in the workshop exceeds what is expressed publicly, and what is expressed exceeds what the public actually experiences.",
      },
      items: [
        { k: { ro: "01 · Observat în atelier", en: "01 · Observed in the workshop" }, v: { ro: "Desene cotate, mecanisme, serii de lucru, montaj.", en: "Dimensioned drawings, mechanisms, work sequences, installation." } },
        { k: { ro: "02 · Exprimat public", en: "02 · Expressed publicly" }, v: { ro: "Categoria, lista de servicii, obiectul terminat.", en: "The category, the list of services, the finished object." } },
        { k: { ro: "03 · Trăit de public", en: "03 · Experienced by the public" }, v: { ro: "Imagini fără context și puține repere despre ce ar putea cere.", en: "Images without context, and few cues about what to ask for." } },
      ],
    },
    {
      t: "pull",
      v: {
        ro: "Organizația cercetată nu promitea mai mult decât putea face. Exprima mai puțin decât făcea.",
        en: "The organization researched didn't promise more than it could do. It expressed less than it did.",
      },
    },
    {
      t: "statement",
      heading: { ro: "Tensiunea centrală", en: "The central tension" },
      v: {
        ro: "Ce se vede sunt rezultatele: obiectul terminat, categoria, lista de servicii. Valoarea o creează drumul dintre intenție și obiect: interpretarea, dezvoltarea tehnică, decizia, integrarea disciplinelor. Brandul arată capetele drumului, iar valoarea se produce între ele.",
        en: "What's visible are the results: the finished object, the category, the list of services. What creates the value is the path between intention and object: interpretation, technical development, decision, the integration of disciplines. The brand shows both ends of the path, while the value is created in between.",
      },
    },
    {
      t: "full",
      img: V.insight,
      label: { ro: "Insight", en: "Insight" },
      title: { ro: "Obiectul se schimbă. Problema rămâne.", en: "The object changes. The problem doesn't." },
      caption: {
        ro: "Fiecare proiect începe altfel. Întrebarea rămâne aceeași: cum poate fi făcut acest lucru?",
        en: "Every project begins differently. The question is always the same: how can this be made?",
      },
    },
    {
      t: "statement",
      heading: { ro: "Esența", en: "The essence" },
      v: {
        ro: "Constantă rămâne capacitatea de a face construibil un lucru care încă nu are soluție. Acolo se află identitatea unui asemenea atelier, și tocmai această parte rămâne cea mai puțin vizibilă, atât în organizație, cât și în întreaga categorie.",
        en: "What stays constant is the ability to make buildable something that has no solution yet. That is where the identity of such a workshop lies, and it is precisely this part that remains least visible, both in the organization and across the category.",
      },
    },
    {
      t: "text",
      heading: { ro: "O consecință: trecutul poate deveni limita", en: "A consequence: the past can become the limit" },
      body: [
        {
          ro: "Tensiunea are și o a doua consecință. Pe aceasta nu am măsurat-o direct, ci am dedus-o din tiparele observate.",
          en: "The tension has a second consequence. We didn't measure it directly; we inferred it from the patterns we observed.",
        },
        {
          ro: "Când un brand arată în principal ce a construit deja, publicul învață să înțeleagă compania prin inventarul trecutului. Cine vede decoruri presupune un atelier de decoruri, iar cine vede mobilier presupune un atelier de mobilier. Portofoliul dovedește competența și, în același timp, îi trasează o margine.",
          en: "When a brand mainly shows what it has already built, the public learns to understand the company through an inventory of its past. Someone who sees stage sets assumes a stage-set workshop; someone who sees furniture assumes a furniture workshop. The portfolio proves competence and, at the same time, draws a boundary around it.",
        },
        {
          ro: "Capacitatea reală a atelierului constă în cunoaștere, oameni, materiale și instrumente care pot fi reorganizate pentru o problemă nouă. Ajunge însă să fie citită ca o colecție de lucruri deja făcute.",
          en: "The workshop's real capability lies in knowledge, people, materials and tools that can be reorganized for a new problem. Yet it ends up being read as a collection of things already made.",
        },
      ],
    },
    {
      t: "principles",
      heading: { ro: "Oportunitatea", en: "The opportunity" },
      lead: {
        ro: "Cercetarea a găsit substanța deja prezentă și documentată. Nu era nevoie de o competență nouă. Oportunitatea stătea în mutarea centrului de greutate de la inventar la capacitate.",
        en: "The research found the substance already present and documented. No new competence was needed. The opportunity lay in shifting the centre of gravity from inventory to capability.",
      },
      items: [
        { k: { ro: "De la ce a fost construit", en: "From what has been built" }, v: { ro: "→ la felul în care ceva devine construibil", en: "→ to how something becomes buildable" } },
        { k: { ro: "De la servicii separate", en: "From separate services" }, v: { ro: "→ la sistemul care le unește", en: "→ to the system that connects them" } },
        { k: { ro: "De la trecutul atelierului", en: "From the workshop's past" }, v: { ro: "→ la ceea ce poate deveni posibil prin el", en: "→ to what can become possible through it" } },
      ],
      close: {
        ro: "Un teritoriu puțin ocupat în categorie și susținut în întregime de realitatea organizației.",
        en: "A territory little occupied in the category, and fully supported by the organization's reality.",
      },
    },
  ],

  /* ════ VIZIUNE & EXPLORARE CONCEPTUALĂ ════ */
  vision: [
    {
      t: "lead",
      v: {
        ro: "Din acest punct, M81 nu mai investighează, ci alege.",
        en: "From this point, M81 stops investigating and starts choosing.",
      },
    },
    {
      t: "text",
      heading: { ro: "De la cercetare la construcție", en: "From research to construction" },
      body: [
        {
          ro: "Pentru a testa concluzia cercetării într-un sistem complet, am construit VELDRA: o companie fictivă de producție la comandă, dedicată proiectelor care nu au o cale evidentă de realizare. Întrebarea de lucru a devenit: cum arată un brand care face vizibil drumul, și nu doar obiectul?",
          en: "To test the research's conclusion in a complete system, we built VELDRA: a fictional custom-production company, devoted to projects without an obvious way of being made. The working question became: what does a brand look like when it makes the path visible, not just the object?",
        },
      ],
    },
    {
      t: "full",
      img: V.conceptReveal,
      label: { ro: "Concept", en: "Concept" },
      title: { ro: "MAKE IT POSSIBLE", en: "MAKE IT POSSIBLE" },
      caption: {
        ro: "Posibilul se află, se măsoară, apoi se construiește.",
        en: "The possible is found, measured, then built.",
      },
    },
    {
      t: "split",
      img: V.conceptMeaning,
      heading: { ro: "Aceeași promisiune, alt accent", en: "The same promise, a different emphasis" },
      body: [
        {
          ro: "Asemănarea merită spusă deschis. „Transformăm ideea în realitate” e una dintre cele mai răspândite promisiuni din categorie; o regăsim la 5 dintre cele 12 organizații analizate. La prima vedere, MAKE IT POSSIBLE aparține aceleiași familii.",
          en: "The resemblance deserves to be stated openly. “We turn ideas into reality” is one of the most widespread promises in the category; we found it at 5 of the 12 organizations analysed. At first glance, MAKE IT POSSIBLE belongs to the same family.",
        },
        {
          ro: "Diferența stă în ce anume este pus în lumină. Promisiunea categoriei vorbește despre rezultat: ideea intră, obiectul iese. MAKE IT POSSIBLE vorbește despre mecanism: investigarea ideii, confruntarea ei cu materialul, cu structura și cu spațiul, măsurarea, prototiparea, decizia tehnică și, abia la final, construcția.",
          en: "The difference lies in what is brought into the light. The category's promise speaks of the result: the idea goes in, the object comes out. MAKE IT POSSIBLE speaks of the mechanism: investigating the idea, confronting it with material, structure and space, measuring, prototyping, the technical decision, and only then, building.",
        },
        {
          ro: "Categoria promite că posibilul va fi livrat. VELDRA arată cum este găsit, în limite reale.",
          en: "The category promises that the possible will be delivered. VELDRA shows how it is found, within real limits.",
        },
      ],
      caption: {
        ro: "Posibilul, negociat cu realitatea: soluția construibilă se găsește în interiorul constrângerilor.",
        en: "The possible, negotiated with reality: the buildable solution is found within the constraints.",
      },
    },
    {
      t: "pull",
      v: {
        ro: "MAKE IT POSSIBLE descrie munca. Credibilitatea promisiunii vine din felul în care această muncă devine vizibilă.",
        en: "MAKE IT POSSIBLE describes the work. The promise earns its credibility from the way that work becomes visible.",
      },
    },
    {
      t: "principles",
      heading: { ro: "Cum funcționează conceptul", en: "How the concept works" },
      lead: {
        ro: "MAKE IT POSSIBLE are forță atâta timp cât posibilul rămâne ancorat în realitatea fizică.",
        en: "MAKE IT POSSIBLE holds its strength as long as the possible stays anchored in physical reality.",
      },
      items: [
        { k: { ro: "Posibilul începe cu o întrebare", en: "Possibility begins with a question" }, v: { ro: "Un proiect poate porni de la o intenție încă nerezolvată. Brandul încurajează întrebarea „se poate face?”, înaintea alegerii dintr-o listă de servicii.", en: "A project can start from an intention that's still unresolved. The brand encourages the question “can this be made?” before any choice from a list of services." } },
        { k: { ro: "Realitatea face parte din proces", en: "Reality is part of the process" }, v: { ro: "Greutatea, materialul, transportul, bugetul și termenul definesc soluția. Constrângerea este locul în care se lucrează.", en: "Weight, material, transport, budget and deadline define the solution. The constraint is where the work happens." } },
        { k: { ro: "Munca începe înaintea fabricației", en: "Making starts before fabrication" }, v: { ro: "Înțelegerea proiectului, evaluarea și dezvoltarea tehnică fac parte din valoare. Gândirea este parte din construcție.", en: "Understanding the project, evaluating it and developing it technically are part of the value. Thinking is part of making." } },
        { k: { ro: "Proiectul decide ce se reunește", en: "The project decides what comes together" }, v: { ro: "Disciplinele sunt mobilizate în funcție de problemă, iar valoarea stă în felul în care lucrează împreună.", en: "Disciplines are mobilized according to the problem, and the value lies in how they work together." } },
        { k: { ro: "Precizia și mâna lucrează împreună", en: "Precision and the hand work together" }, v: { ro: "Calculul, structura și toleranța stau alături de textură, formă și sensibilitatea materialului.", en: "Calculation, structure and tolerance sit alongside texture, form and a sensitivity to material." } },
      ],
      close: {
        ro: "Posibilul se află. Se măsoară. Apoi se construiește.",
        en: "The possible is found. Measured. Then built.",
      },
    },
    {
      t: "split",
      img: V.creativeDirection,
      heading: { ro: "Direcția creativă: RAW / PRECISE", en: "Creative direction: RAW / PRECISE" },
      body: [
        {
          ro: "Lumea VELDRA se află între materia brută și gândirea precisă. Oțelul, lemnul, rășina și urmele de lucru stau alături de cote, unghiuri și toleranțe. Atelierul rămâne prezent, cu materialele și mâinile lui; procesul rămâne controlat; rezultatul rămâne exact.",
          en: "VELDRA's world sits between raw matter and precise thinking. Steel, wood, resin and the traces of work sit alongside dimensions, angles and tolerances. The workshop stays present, with its materials and its hands; the process stays controlled; the result stays exact.",
        },
      ],
      caption: {
        ro: "Raw / precise · physical / intelligent · engineered / crafted.",
        en: "Raw / precise · physical / intelligent · engineered / crafted.",
      },
    },
    {
      t: "split",
      img: V.naming,
      flip: true,
      heading: { ro: "Un nume care lasă loc capacității", en: "A name that leaves room for capability" },
      body: [
        {
          ro: "VELDRA este un nume construit, fără sens de dicționar, iar alegerea e deliberată. Cercetarea arătase că identitatea unui asemenea atelier se îngustează atunci când e legată de un material, un proces sau un tip de obiect. Un nume deschis poate cuprinde un corp de iluminat, o structură, o piesă de mobilier sau o instalație, fără ca vreuna dintre ele să definească singură compania. Sensul numelui se construiește prin muncă.",
          en: "VELDRA is a constructed name, with no dictionary meaning, and the choice is deliberate. The research had shown that the identity of such a workshop narrows when it's tied to a material, a process or a type of object. An open name can hold a light fitting, a structure, a piece of furniture or an installation, without any one of them defining the company on its own. The name's meaning is built through the work.",
        },
      ],
      caption: {
        ro: "Un nume construit pentru a duce compania dincolo de orice material, proces sau tip de proiect.",
        en: "A name built to carry the company beyond any single material, process or type of project.",
      },
    },
    {
      t: "full",
      img: V.wordmark,
      label: { ro: "Identitate", en: "Identity" },
      title: { ro: "Form is variable. Measure is constant.", en: "Form is variable. Measure is constant." },
      caption: {
        ro: "Un singur unghi, de 18°, guvernează fiecare abatere de la verticală din literele semnului. Wordmark-ul este construit geometric, după o singură regulă.",
        en: "A single 18° angle governs every departure from vertical in the letterforms. The wordmark is geometrically constructed, to a single rule.",
      },
    },
    {
      t: "split",
      img: V.typography,
      heading: { ro: "Tipografia: faptul are dreptul să fie cel mai mare", en: "Typography: a fact may be the largest thing on the page" },
      body: [
        {
          ro: "Un singur grotesc poartă atât intenția, cât și dovada. Scara tipografică păstrează o treaptă rezervată, folosită rar. Pe ea urcă doar o măsurătoare împreună cu unitatea ei, și numai atunci când acea constrângere a făcut proiectul dificil. Titlurile vorbesc calm, iar faptul poate deveni cel mai mare element din pagină.",
          en: "One grotesque carries both intention and evidence. The type scale keeps a reserved step, used rarely. Only a measurement with its unit may occupy it, and only when that constraint is what made the project difficult. Headlines speak calmly; a fact can become the largest element on the page.",
        },
      ],
      caption: {
        ro: "Întrebarea brandului, alături de o dimensiune de proiect.",
        en: "The brand's question, alongside a project dimension.",
      },
    },
    {
      t: "split",
      img: V.colour,
      flip: true,
      heading: { ro: "Culoarea: lumea materială este neutră", en: "Colour: the material world is neutral" },
      body: [
        {
          ro: "Paleta vine din materialele atelierului: mill scale, hârtie de atelier, aluminiu frezat, stejar tăiat, rășină turnată. O singură culoare activă, #A62A50, apare acolo unde informația devine acțiune: o toleranță, un status, o decizie, o selecție.",
          en: "The palette comes from the workshop's materials: mill scale, shop paper, milled aluminium, sawn oak, cast resin. A single active colour, #A62A50, appears where information becomes action: a tolerance, a status, a decision, a selection.",
        },
      ],
      caption: {
        ro: "Lumea materială este neutră. Inteligența activă are o singură culoare.",
        en: "The material world is neutral. Active intelligence is one colour.",
      },
    },
    {
      t: "full",
      img: V.fit,
      label: { ro: "Principiu grafic", en: "Graphic principle" },
      title: { ro: "The Fit", en: "The Fit" },
      caption: {
        ro: "Relația dintre două piese: așezată, susținută, măsurată. Limbajul grafic al sistemului pornește de la o îmbinare precisă.",
        en: "The relationship between two parts: seated, held, measured. The system's graphic language starts from a precise joint.",
      },
    },
    {
      t: "split",
      img: V.inProcess,
      heading: { ro: "Informația tehnică apare acolo unde a existat gândire tehnică", en: "Technical information appears where technical thinking took place" },
      body: [
        {
          ro: "În sistemul VELDRA, cotele, codurile de proiect și toleranțele stau lângă obiectul pe care îl descriu: pe fișa de lucru, în momentul verificării. Oamenii sunt prezenți prin ceea ce fac, fie că e o mână care măsoară sau o piesă verificată înainte de etapa următoare. Grafica se naște din dovadă.",
          en: "In the VELDRA system, dimensions, project codes and tolerances sit next to the object they describe: on the work sheet, at the moment of checking. People are present through what they do, whether a hand taking a measurement or a part checked before the next stage. The graphics are born from the evidence.",
        },
      ],
      caption: {
        ro: "Fișa de proiect și măsurătoarea: identitatea funcționează întâi în atelier.",
        en: "The project sheet and the measurement: the identity works in the workshop first.",
      },
    },
    {
      t: "split",
      img: V.heroProject,
      flip: true,
      label: { ro: "Proiect", en: "Project" },
      heading: { ro: "Proiectul 024", en: "Project 024" },
      body: [
        {
          ro: "Pentru a demonstra conceptul, am construit un proiect complet: Folded Acoustic Lantern, un corp de iluminat acustic cu geometrie pliată. Proiectul traversează întreaga demonstrație, de la schiță la obiectul instalat. Motivul e simplu: în cercetare, exact acest lucru lipsea. Un proiect care arată nu doar ce există acum, ci și ce a trebuit aflat pentru ca el să existe.",
          en: "To demonstrate the concept, we built a complete project: the Folded Acoustic Lantern, an acoustic light fitting with folded geometry. It runs through the entire demonstration, from sketch to installed object. The reason is simple: in the research, this was exactly what was missing. A project that shows not only what exists now, but what had to be figured out for it to exist.",
        },
      ],
      caption: {
        ro: "De la intenție la obiect: Intention → Development → Resolution → Object. Schița devine dimensiune, dimensiunea devine îmbinare, îmbinarea devine obiect.",
        en: "From intention to object: Intention → Development → Resolution → Object. The sketch becomes a dimension, the dimension becomes a joint, the joint becomes an object.",
      },
    },
    {
      t: "split",
      img: V.technical,
      heading: { ro: "Decizia devine vizibilă", en: "The decision becomes visible" },
      body: [
        {
          ro: "Sistemul de control al proiectului aduce la suprafață ce rămâne de obicei în atelier: dimensiuni și toleranțe, specificația materialelor, vederea explodată, stadiul prototipului, testele acustice, structurale și de lumină, istoricul reviziilor.",
          en: "The project control system brings to the surface what usually stays in the workshop: dimensions and tolerances, material specifications, the exploded view, prototype status, acoustic, structural and light tests, the revision history.",
        },
        {
          ro: "Mai ales, arată decizia tehnică. După testele acustice și structurale, nodul unic a fost ales în locul sistemului cu mai multe cleme: simplifică asamblarea și îmbunătățește performanța acustică, fără a reduce capacitatea portantă.",
          en: "Above all, it shows the technical decision. After acoustic and structural testing, the single-node connector was chosen over the multi-clip system: it simplifies assembly and improves acoustic performance, without reducing load capacity.",
        },
      ],
      caption: {
        ro: "Un document de lucru care funcționează și ca dovadă.",
        en: "A working document that also functions as evidence.",
      },
    },
    {
      t: "split",
      img: V.homepage,
      flip: true,
      label: { ro: "Experiența digitală", en: "Digital experience" },
      heading: { ro: "Website-ul: de la catalog la drum", en: "The website: from catalogue to path" },
      caption: {
        ro: "„VELDRA makes non-standard physical ideas buildable.” Website-ul pornește de la intenția vizitatorului și îl conduce spre proiecte explicate, proces și capabilități conectate.",
        en: "“VELDRA makes non-standard physical ideas buildable.” The website starts from the visitor's intention and leads them towards explained projects, process and connected capabilities.",
      },
      body: [
        {
          ro: "Intrarea începe cu o întrebare: „What are you trying to make?”. Vizitatorul poate veni doar cu o intenție.",
          en: "The entry point is a question: “What are you trying to make?” A visitor can arrive with nothing more than an intention.",
        },
        {
          ro: "Procesul devine coloana experienței: idee, evaluare, dezvoltare, prototip, fabricație, test, realitate.",
          en: "The process becomes the backbone of the experience: idea, evaluation, development, prototype, fabrication, test, reality.",
        },
        {
          ro: "Fiecare proiect răspunde acelorași întrebări: ce trebuia să existe, ce l-a făcut dificil, ce s-a rezolvat, cum a fost construit, ce există acum.",
          en: "Every project answers the same questions: what needed to exist, what made it difficult, what was solved, how it was built, what exists now.",
        },
        {
          ro: "Capabilitățile apar ca o singură capacitate integrată, conectată la proiectele în care disciplinele au lucrat împreună.",
          en: "Capabilities appear as one integrated capability, connected to the projects where the disciplines worked together.",
        },
      ],
    },
    {
      t: "split",
      img: V.makerMark,
      heading: { ro: "Marcat discret", en: "Quietly marked" },
      body: [
        {
          ro: "Pe obiect, marca VELDRA apare mic și precis: numele și numărul proiectului, gravate direct în structură. Principiul sistemului este ca obiectul să fie marcat, nu brănduit: marca identifică, înregistrează, apoi lasă lucrarea în prim-plan.",
          en: "On the object, the VELDRA mark is small and precise: the name and project number, engraved into the structure itself. The system's principle is that objects are marked, not branded: the mark identifies, records, and then leaves the work in the foreground.",
        },
      ],
      caption: {
        ro: "VELDRA / 024: semnătura de atelier.",
        en: "VELDRA / 024: the maker's mark.",
      },
    },
    {
      t: "split",
      img: V.whatCouldYouMake,
      flip: true,
      label: { ro: "Invitație", en: "Invitation" },
      heading: { ro: "O consecință: ce ai putea face?", en: "A consequence: what could you make?" },
      caption: {
        ro: "What could you make? Portofoliul dovedește capacitatea. Invitația arată cât de departe poate merge.",
        en: "What could you make? The portfolio proves capability. The invitation shows how far it can go.",
      },
      body: [
        {
          ro: "Odată ce drumul devine vizibil, se schimbă și întrebarea pe care și-o poate pune un client. Un brand care arată doar ce a construit atrage cereri pentru lucruri asemănătoare. Un brand care arată cum se află soluția pentru ceva nou îi permite clientului să vină cu ce vrea să existe.",
          en: "Once the path becomes visible, the question a client can ask changes too. A brand that shows only what it has built attracts requests for similar things. A brand that shows how the solution to something new is found allows the client to arrive with what they want to exist.",
        },
        {
          ro: "Din această schimbare vine a treia întrebare a sistemului VELDRA. Primele două construiesc încredere: ce am făcut și ce putem face. A treia deschide relația: ce ai putea face?",
          en: "From this shift comes the third question in the VELDRA system. The first two build trust: what we've made, and what we can do. The third opens the relationship: what could you make?",
        },
        {
          ro: "Întrebarea decurge din cercetare, fără să fi fost măsurată în ea. Brandul o transformă în invitație.",
          en: "The question follows from the research, without having been measured in it. The brand turns it into an invitation.",
        },
      ],
    },
    {
      t: "list",
      label: { ro: "Trei niveluri", en: "Three levels" },
      items: [
        { ro: "What we made — dovada", en: "What we made — proof" },
        { ro: "What we can do — capabilitatea", en: "What we can do — capability" },
        { ro: "What could you make? — posibilitatea", en: "What could you make? — possibility" },
      ],
    },
    {
      t: "full",
      img: V.showcase,
      label: { ro: "Sistemul complet", en: "The complete system" },
      title: { ro: "VELDRA · MAKE IT POSSIBLE", en: "VELDRA · MAKE IT POSSIBLE" },
      caption: {
        ro: "Identitate, proiect, document tehnic și experiență digitală: expresii ale aceleiași idei.",
        en: "Identity, project, technical document and digital experience: expressions of the same idea.",
      },
    },
  ],

  /* ════ FINAL STATEMENT ════ */
  final: [
    {
      t: "statement",
      heading: { ro: "Ce am descoperit", en: "What we discovered" },
      v: {
        ro: "Într-un atelier de producție la comandă, valoarea se formează cu mult înainte ca obiectul să existe: în interpretarea ideii, în dezvoltarea tehnică, în deciziile luate sub constrângere, în felul în care meserii diferite lucrează împreună. Obiectul terminat este partea vizibilă a acestei munci. Brandul, comunicarea și portofoliul îl pun pe el în lumină, iar inteligența care l-a făcut posibil rămâne în umbră.",
        en: "In a custom-production workshop, value is formed long before the object exists: in interpreting the idea, in technical development, in decisions made under constraint, in the way different trades work together. The finished object is the visible part of that work. Brand, communication and portfolio put it in the light, while the intelligence that made it possible stays in the shadow.",
      },
    },
    {
      t: "statement",
      heading: { ro: "Ce creează diferența", en: "What creates the gap" },
      v: {
        ro: "Decalajul apare între realitatea atelierului și ceea ce ajunge la public. Categoria își arată rezultatele și își descrie valoarea în aceleași cuvinte: producție la comandă, calitate, experiență, ideea transformată în realitate. Cuvintele sunt corecte, dar descriu industria. Ce ar distinge o organizație anume, adică felul în care face construibil un lucru nou, rămâne în desene, în serii de lucru și în arhivă.",
        en: "The gap opens between the reality of the workshop and what reaches the public. The category shows its results and describes its value in the same words: custom production, quality, experience, ideas turned into reality. The words are accurate, but they describe the industry. What would set a particular organization apart, the way it makes something new buildable, remains in drawings, work sequences and the archive.",
      },
    },
    {
      t: "pull",
      v: {
        ro: "Valoarea reală a atelierului nu este colecția de obiecte pe care le-a produs. Este capacitatea de a face posibile obiecte diferite, inclusiv unele care încă nu există.",
        en: "The workshop's real value isn't the collection of objects it has produced. It's the ability to make different objects possible, including ones that don't exist yet.",
      },
    },
    {
      t: "statement",
      heading: { ro: "Oportunitatea", en: "The opportunity" },
      v: {
        ro: "Substanța există. Oportunitatea este ca ea să devină perceptibilă: atenția se mută de la inventar la capacitate, de la servicii separate la sistemul care le unește, de la rezultat la drum. Iar când drumul devine vizibil, se deschide și o altă relație cu clientul, în care acesta poate veni cu ce vrea să existe.",
        en: "The substance exists. The opportunity is for it to become perceptible: attention shifts from inventory to capability, from separate services to the system that connects them, from result to path. And once the path becomes visible, a different relationship with the client opens up, one in which they can arrive with what they want to exist.",
      },
    },
    {
      t: "statement",
      heading: { ro: "Direcția", en: "The direction" },
      v: {
        ro: "MAKE IT POSSIBLE preia o promisiune pe care categoria o cunoaște bine și îi mută accentul: de la rezultatul promis la mecanismul arătat. Adică felul în care se investighează, se măsoară, se prototipează, se decide și se construiește, în limite reale. VELDRA demonstrează că această capacitate poate deveni un sistem de brand complet: în nume, în tipografie, în documentele de lucru, în proiecte și în experiența digitală.",
        en: "MAKE IT POSSIBLE takes a promise the category knows well and shifts its emphasis: from the promised result to the mechanism shown. That is, the way things are investigated, measured, prototyped, decided and built, within real limits. VELDRA demonstrates that this capability can become a complete brand system: in the name, the typography, the working documents, the projects and the digital experience.",
      },
    },
    {
      t: "pull",
      v: {
        ro: "Obiectul arată ce a fost construit. Brandul poate arăta ce a făcut construcția posibilă.",
        en: "The object shows what was built. The brand can show what made building it possible.",
      },
    },
  ],
};

/* ── Registru ── */
export const STUDIES: Study[] = [formOfAuthority, whatMakesItPossible];

export const getStudy = (slug: string): Study | undefined =>
  STUDIES.find((s) => s.slug === slug);

/* ── Carduri pentru pagina index ── */
export const STUDY_CARDS: StudyCard[] = [
  {
    number: "01",
    slug: formOfAuthority.slug,
    client: formOfAuthority.client,
    meta: formOfAuthority.meta,
    kicker: formOfAuthority.kicker,
    excerpt: formOfAuthority.heroIntro,
    status: "published",
    cover: formOfAuthority.heroImage,
  },
  {
    number: "02",
    slug: whatMakesItPossible.slug,
    client: whatMakesItPossible.client,
    meta: whatMakesItPossible.meta,
    kicker: whatMakesItPossible.kicker,
    excerpt: whatMakesItPossible.heroIntro,
    status: "published",
    cover: whatMakesItPossible.heroImage,
  },
];

/* ── Etichete UI (bilingv) ── */
export const UI = {
  sectionTitle: { ro: "Studies", en: "Studies" },
  heroDesc: {
    ro: "Cercetare independentă, observații și explorări conceptuale despre organizații, branduri, comunicare și experiențe digitale.",
    en: "Independent research, observations and concept explorations focused on organizations, brands, communication and digital experiences.",
  },
  collectionLabel: { ro: "Bibliotecă de cercetare", en: "Research library" },
  available: { ro: "Studii disponibile", en: "Available studies" },
  readStudy: { ro: "Citește studiul", en: "Read Study" },
  comingSoon: { ro: "În curând", en: "Coming Soon" },
  growing: {
    ro: "O colecție în continuă dezvoltare. Adăugăm studii pe măsură ce le încheiem.",
    en: "A collection in continuous development. We add studies as we complete them.",
  },
  back: { ro: "Toate studiile", en: "All studies" },
  nav: {
    overview: { ro: "Prezentare", en: "Overview" },
    research: { ro: "Studiul de cercetare", en: "Research Study" },
    vision: { ro: "Viziune & concept", en: "Vision & Concept" },
    final: { ro: "Declarație finală", en: "Final Statement" },
  },
  navTitles: {
    overview: { ro: "Prezentare", en: "Overview" },
    research: { ro: "Studiul de cercetare", en: "Research Study" },
    vision: { ro: "Viziune & explorare conceptuală", en: "Vision & Concept Exploration" },
    final: { ro: "Declarație finală", en: "Final Statement" },
  },
} as const;
