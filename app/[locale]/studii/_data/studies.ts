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

/* ── Registru ── */
export const STUDIES: Study[] = [formOfAuthority];

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
