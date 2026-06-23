/* ──────────────────────────────────────────────────────────────────────
   STUDIES — biblioteca publică de cercetare M81.
   Cercetare independentă: investigații, observații și explorări conceptuale
   despre organizații, branduri, comunicare și experiențe digitale.

   Conținutul este curatoriat editorial din studiul original M81 — păstrăm
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
  metrics: { value: string; label: L }[];
  /* secțiuni țesute */
  research: Movement[];
  vision: Movement[];
  final: Movement[];
}

/* imagini concept */
const I = {
  cover: { src: "/studies/filip/concept-01-cover.png", w: 2048, h: 1152 },
  moodboard: { src: "/studies/filip/concept-02-moodboard.png", w: 2048, h: 1152 },
  typography: { src: "/studies/filip/concept-03-typography.png", w: 2048, h: 2048 },
  decision: { src: "/studies/filip/concept-04-decision.png", w: 2048, h: 2048 },
  homepage: { src: "/studies/filip/concept-05-homepage.png", w: 2048, h: 1152 },
  team: { src: "/studies/filip/concept-06-team.png", w: 2048, h: 2048 },
  mandate: { src: "/studies/filip/concept-07-mandate.png", w: 2048, h: 2048 },
  insights: { src: "/studies/filip/concept-08-insights.png", w: 2048, h: 2048 },
  intelligent: { src: "/studies/filip/concept-09-intelligent.png", w: 2048, h: 2048 },
  reflection: { src: "/studies/filip/concept-10-reflection.png", w: 2048, h: 2048 },
  site: { src: "/studies/filip/site-homepage.png", w: 1280, h: 5099 },
};

/* ════════════════════════════════════════════════════════════════════════
   STUDIU 01 — FILIP & COMPANY
   ════════════════════════════════════════════════════════════════════════ */

const filip: Study = {
  slug: "filip-and-company",
  client: "Filip & Company",
  meta: { ro: "Avocatură de afaceri · România · 2026", en: "Business Law · Romania · 2026" },
  kicker: {
    ro: "Studiu independent de brand, comunicare și experiență digitală",
    en: "Independent Brand, Communication & Digital Experience Study",
  },
  heroIntro: {
    ro: "Un studiu care explorează relația dintre identitatea organizațională, comunicare, experiența digitală și expresia de brand.",
    en: "A study exploring the relationship between organizational identity, communication, digital experience and brand expression.",
  },
  heroImage: I.cover,

  overview: [
    {
      ro: "Acest studiu explorează modul în care brandul, comunicarea și experiența digitală contribuie la percepția unei firme de avocatură moderne. Scopul nu este evaluarea activității juridice, ci înțelegerea felului în care valoarea organizației este exprimată.",
      en: "This study explores how brand, communication and digital experience shape the perception of a modern law firm. The goal is not to evaluate the firm's legal work, but to understand how the organization's value is expressed.",
    },
    {
      ro: "Filip & Company ocupă o poziție premium în piața de avocatură de business din România — o firmă construită în jurul expertizei, al mandatelor complexe și al unei culturi de parteneriat. Studiul urmărește punctele forte existente, oportunitățile de evoluție și direcțiile prin care caracterul real al organizației ar putea fi exprimat mai clar.",
      en: "Filip & Company holds a premium position in Romania's business-law market — a firm built around expertise, complex mandates and a culture of partnership. The study looks at existing strengths, opportunities to evolve, and directions through which the organization's real character could be expressed more clearly.",
    },
  ],
  facts: [
    { label: { ro: "Subiect", en: "Subject" }, value: { ro: "Filip & Company", en: "Filip & Company" } },
    { label: { ro: "Industrie", en: "Sector" }, value: { ro: "Avocatură de afaceri", en: "Business Law" } },
    { label: { ro: "Regiune", en: "Region" }, value: { ro: "România", en: "Romania" } },
    { label: { ro: "An", en: "Year" }, value: { ro: "2026", en: "2026" } },
    {
      label: { ro: "Perspective", en: "Lenses" },
      value: { ro: "Organizație · Brand · Comunicare · Experiență digitală", en: "Organization · Brand · Communication · Digital experience" },
    },
  ],
  metrics: [
    { value: "9.5", label: { ro: "Credibilitate", en: "Credibility" } },
    { value: "8.0", label: { ro: "Structură website", en: "Website structure" } },
    { value: "7.0", label: { ro: "UX", en: "UX" } },
    { value: "5.5", label: { ro: "Branding vizual", en: "Visual branding" } },
    { value: "4.5", label: { ro: "Experiență premium", en: "Premium experience" } },
    { value: "4.0", label: { ro: "Diferențiere vizuală", en: "Visual differentiation" } },
  ],

  /* ════ STUDIUL DE CERCETARE ════ */
  research: [
    {
      t: "lead",
      v: {
        ro: "Problema nu este funcționalitatea. Problema este percepția. Experiența nu reflectă pe deplin nivelul real al organizației.",
        en: "The problem isn't functionality. It's perception. The experience doesn't fully reflect the real level of the organization.",
      },
    },
    {
      t: "text",
      heading: { ro: "Analiza brandului — prima impresie", en: "Brand analysis — first impression" },
      body: [
        {
          ro: "Prima impresie este cea a unui brand serios, instituțional și corporatist. Transmite stabilitate, control și profesionalism — imaginea unei firme mari, orientate către mediul de business.",
          en: "The first impression is of a serious, institutional, corporate brand. It conveys stability, control and professionalism — the image of a large firm oriented toward business.",
        },
        {
          ro: "La nivel emoțional, expresia este rezervată, formală și distantă. Brandul inspiră încredere și competență, însă nu produce o impresie puternică sau memorabilă.",
          en: "Emotionally, the expression is reserved, formal and distant. The brand inspires trust and competence, but doesn't leave a strong or memorable impression.",
        },
      ],
    },
    {
      t: "list",
      label: { ro: "Cuvinte asociate", en: "Associated words" },
      items: [
        { ro: "corporatist", en: "corporate" },
        { ro: "serios", en: "serious" },
        { ro: "instituțional", en: "institutional" },
        { ro: "competent", en: "competent" },
        { ro: "rezervat", en: "reserved" },
        { ro: "conservator", en: "conservative" },
      ],
    },
    {
      t: "pull",
      v: {
        ro: "Premiumul este asociat în primul rând cu numele și reputația firmei, nu cu experiența oferită de brand.",
        en: "Premium is associated first with the firm's name and reputation, not with the experience the brand offers.",
      },
    },
    {
      t: "split",
      img: I.site,
      frame: "browser",
      label: { ro: "Analiza experienței digitale", en: "Digital experience analysis" },
      heading: { ro: "Corect, dar conservator", en: "Correct, but conservative" },
      body: [
        {
          ro: "Website-ul transmite imediat imaginea unei organizații stabile și profesioniste. Structura este clară, navigația matură, conținutul bogat — performează peste media industriei.",
          en: "The website immediately conveys a stable, professional organization. The structure is clear, the navigation mature, the content rich — it performs above the industry average.",
        },
        {
          ro: "Însă experiența este construită aproape exclusiv în jurul consumului de informație. Este informativă, dar nu experiențială — și reproduce aproape integral modelul întâlnit la majoritatea firmelor de avocatură corporate.",
          en: "But the experience is built almost entirely around consuming information. It is informative, not experiential — and reproduces almost exactly the model found at most corporate law firms.",
        },
      ],
      caption: {
        ro: "filipandcompany.com — pagina principală actuală, materialul de pornire al studiului.",
        en: "filipandcompany.com — the current homepage, the study's starting material.",
      },
    },
    {
      t: "text",
      heading: { ro: "Analiza comunicării — două voci", en: "Communication analysis — two voices" },
      body: [
        {
          ro: "Analiza relevă două voci distincte. Vocea care vorbește despre organizație este abstractă, autoreferențială, declarativă — „leading”, „top-quality”, „excellence”. Vocea care vorbește despre activitate este factuală, precisă, sigură pe sine.",
          en: "The analysis reveals two distinct voices. The voice that speaks about the organization is abstract, self-referential, declarative — “leading,” “top-quality,” “excellence.” The voice that speaks about the work is factual, precise, self-assured.",
        },
        {
          ro: "Vocea asociată activității este semnificativ mai credibilă și mai convingătoare decât vocea asociată autoprezentării.",
          en: "The voice tied to the work is significantly more credible and convincing than the voice tied to self-presentation.",
        },
      ],
    },
    {
      t: "pull",
      v: {
        ro: "Organizația este mai puternică decât expresia sa de brand. Reputația susține brandul mai mult decât brandul susține reputația.",
        en: "The organization is stronger than its brand expression. Reputation supports the brand more than the brand supports the reputation.",
      },
    },
    {
      t: "statement",
      heading: { ro: "Concluzia studiului", en: "Study conclusion" },
      v: {
        ro: "Filip & Company beneficiază de una dintre cele mai puternice reputații din industria juridică românească. Experiența digitală este clară și credibilă, însă nu capitalizează pe deplin valoarea brandului. Principala oportunitate nu este corectarea unor probleme, ci alinierea imaginii digitale la nivelul real de sofisticare, influență și expertiză al organizației.",
        en: "Filip & Company enjoys one of the strongest reputations in the Romanian legal industry. The digital experience is clear and credible, but it doesn't fully capitalize on the brand's value. The main opportunity isn't fixing problems — it's aligning the digital image with the organization's real level of sophistication, influence and expertise.",
      },
    },
  ],

  /* ════ VIZIUNE & EXPLORARE CONCEPTUALĂ ════ */
  vision: [
    {
      t: "full",
      img: I.cover,
      label: { ro: "Concept", en: "Concept" },
      title: { ro: "Quiet Authority", en: "Quiet Authority" },
      caption: {
        ro: "O explorare a judecății, parteneriatului și clarității — punctul de pornire al direcției.",
        en: "An exploration of judgment, partnership and clarity — the starting point of the direction.",
      },
    },
    {
      t: "text",
      heading: { ro: "Viziunea M81", en: "The M81 vision" },
      body: [
        {
          ro: "Concluzia noastră nu este că Filip & Company are o problemă de expertiză, reputație sau poziționare. Dimpotrivă. Organizația deține deja ceea ce majoritatea brandurilor încearcă ani la rând să dobândească.",
          en: "Our conclusion is not that Filip & Company has a problem of expertise, reputation or positioning. Quite the opposite. The organization already holds what most brands spend years trying to acquire.",
        },
        {
          ro: "Provocarea nu ține de ceea ce este organizația. Ține de felul în care este exprimată. Cele mai puternice elemente ale brandului nu au fost niciodată afirmațiile despre firmă — au fost oamenii, portretele, mandatele, felul calm și precis în care firma vorbește când spune, simplu, ce a făcut.",
          en: "The challenge isn't what the organization is. It's how it is expressed. The strongest elements of the brand were never the claims about the firm — they were the people, the portraits, the mandates, the calm and precise way the firm speaks when it simply says what it has done.",
        },
      ],
    },
    {
      t: "pull",
      v: {
        ro: "Filip & Company nu are nevoie de o identitate mai puternică. Are nevoie de o expresie mai fidelă a identității pe care o deține deja.",
        en: "Filip & Company doesn't need a stronger identity. It needs a more faithful expression of the identity it already holds.",
      },
    },
    {
      t: "split",
      img: I.decision,
      flip: true,
      label: { ro: "Conceptul", en: "The concept" },
      heading: { ro: "Autoritate calmă", en: "Quiet authority" },
      body: [
        {
          ro: "Un brand care nu se anunță. Se dovedește. Conceptul înlocuiește revendicarea cu demonstrația, autodefinirea cu dovada, zgomotul cu claritatea.",
          en: "A brand that doesn't announce itself. It proves itself. The concept replaces claiming with demonstrating, self-definition with proof, noise with clarity.",
        },
        {
          ro: "Autoritatea nu este tratată ca un mesaj. Este tratată ca un rezultat. Lăsăm expertiza să vorbească prin proiecte, oamenii prin caracter, rezultatele prin impact.",
          en: "Authority isn't treated as a message. It's treated as a result. We let expertise speak through projects, people through character, results through impact.",
        },
      ],
      caption: {
        ro: "Moodboard — momentele dinaintea unei decizii: încredere discretă, expertiză umană.",
        en: "Moodboard — the moments before a decision: quiet confidence, human expertise.",
      },
    },
    {
      t: "principles",
      heading: { ro: "Principiile conceptului", en: "Principles of the concept" },
      lead: {
        ro: "„Autoritate calmă” nu se construiește prin acumulare. Se construiește prin selecție.",
        en: "“Quiet authority” isn't built through accumulation. It's built through selection.",
      },
      items: [
        { k: { ro: "Păstrăm", en: "We keep" }, v: { ro: "Reputația, expertiza demonstrată, cultura de parteneriat, oamenii — ceea ce este deja autentic și valoros.", en: "Reputation, demonstrated expertise, the partnership culture, the people — what is already authentic and valuable." } },
        { k: { ro: "Amplificăm", en: "We amplify" }, v: { ro: "Demonstrația în locul declarației, oamenii ca expresie a brandului, reținerea ca formă de încredere.", en: "Demonstration over declaration, people as the brand's expression, restraint as a form of confidence." } },
        { k: { ro: "Simplificăm", en: "We simplify" }, v: { ro: "Limbajul excesiv, mesajele repetitive, complexitatea inutilă — pentru claritate, nu pentru a reduce conținutul.", en: "Excessive language, repetitive messaging, needless complexity — for clarity, not to reduce content." } },
        { k: { ro: "Eliminăm", en: "We remove" }, v: { ro: "Autodefinirea excesivă, revendicările generice, diferențierea artificială, zgomotul vizual.", en: "Excessive self-definition, generic claims, artificial differentiation, visual noise." } },
      ],
      close: {
        ro: "Păstrăm fondul. Amplificăm dovada. Simplificăm forma. Eliminăm zgomotul.",
        en: "We keep the substance. We amplify the proof. We simplify the form. We remove the noise.",
      },
    },
    {
      t: "pull",
      v: {
        ro: "Architectural Contemporary — sobrietate caldă, lux prin reținere.",
        en: "Architectural Contemporary — warm sobriety, luxury through restraint.",
      },
    },
    {
      t: "split",
      img: I.moodboard,
      label: { ro: "Expresia vizuală", en: "Visual expression" },
      heading: { ro: "Fundația vizuală", en: "Visual foundation" },
      body: [
        {
          ro: "Direcția vizuală nu trebuie inventată — există deja în organizație: în biroul său, în materialele pe care le folosește, în felul în care își fotografiază oamenii. Cald, deschis, arhitectural, sigur pe sine.",
          en: "The visual direction doesn't need to be invented — it already exists in the organization: in its office, in the materials it uses, in the way it photographs its people. Warm, open, architectural, self-assured.",
        },
        {
          ro: "Paletă — ivoriu cald, aubergine, bronz periat. Materialitate mată. Accent aubergine folosit rar, folosit decisiv.",
          en: "Palette — warm ivory, aubergine, brushed bronze. Matte materiality. An aubergine accent used rarely, used decisively.",
        },
      ],
      caption: {
        ro: "Fundația vizuală — paletă, direcție foto și sistemul tipografic Canela.",
        en: "Visual foundation — palette, photography direction and the Canela typographic system.",
      },
    },
    {
      t: "split",
      img: I.typography,
      flip: true,
      heading: { ro: "Sistem tipografic", en: "Typographic system" },
      body: [
        {
          ro: "Canela pentru display și text, Inter pentru etichete. Grile disciplinate, spațiu generos, tipografie cu caracter. Mult aer, puțin zgomot.",
          en: "Canela for display and text, Inter for labels. Disciplined grids, generous space, typography with character. Plenty of air, little noise.",
        },
      ],
      caption: {
        ro: "Ierarhie clară — autoritate liniștită, citită fără efort.",
        en: "Clear hierarchy — quiet authority, read effortlessly.",
      },
    },
    {
      t: "beforeAfter",
      heading: { ro: "Experiența digitală", en: "Digital experience" },
      body: [
        {
          ro: "Aceeași organizație, exprimată diferit. Nu o reinventare — o aliniere: de la o pagină corectă, dar convențională, la o experiență care pune dovada în prim-plan.",
          en: "The same organization, expressed differently. Not a reinvention — an alignment: from a correct but conventional page to an experience that puts proof first.",
        },
      ],
      before: I.site,
      after: I.homepage,
      beforeLabel: { ro: "Acum", en: "Now" },
      afterLabel: { ro: "Concept M81", en: "M81 concept" },
    },
    {
      t: "split",
      img: I.team,
      label: { ro: "Oamenii", en: "People" },
      heading: { ro: "Caracterul, nu funcția", en: "Character, not function" },
      body: [
        {
          ro: "„The People Behind Important Decisions.” Cel mai autentic activ de brand sunt oamenii — prezentați ca experiență, prin portrete editoriale și caracter, nu ca un director intern.",
          en: "“The People Behind Important Decisions.” The most authentic brand asset is the people — presented as experience, through editorial portraits and character, not as an internal directory.",
        },
      ],
      caption: {
        ro: "Oamenii devin principalul limbaj vizual al brandului.",
        en: "People become the brand's primary visual language.",
      },
    },
    {
      t: "split",
      img: I.mandate,
      flip: true,
      label: { ro: "Mandate", en: "Mandates" },
      heading: { ro: "The Work Speaks", en: "The Work Speaks" },
      body: [
        {
          ro: "Dovezi în locul afirmațiilor. Rezultate concrete — tranzacții cross-border, emisiuni de obligațiuni, finanțări de infrastructură — lăsate să vorbească prin greutatea faptelor.",
          en: "Proof instead of claims. Concrete outcomes — cross-border deals, bond issuances, infrastructure financings — left to speak through the weight of the facts.",
        },
      ],
      caption: {
        ro: "Autoritatea tratată ca rezultat, nu ca mesaj.",
        en: "Authority treated as a result, not a message.",
      },
    },
    {
      t: "split",
      img: I.insights,
      label: { ro: "Insights", en: "Insights" },
      heading: { ro: "Gândirea din spatele muncii", en: "The thinking behind the work" },
      body: [
        {
          ro: "„The Thinking Behind The Work.” Conținutul bogat al firmei, reorganizat și contextualizat — gândirea prezentată editorial, nu doar arhivată.",
          en: "“The Thinking Behind The Work.” The firm's rich content, reorganized and contextualized — thinking presented editorially, not merely archived.",
        },
      ],
      caption: {
        ro: "De la publicare la experiența de consum a conținutului.",
        en: "From publishing to the experience of consuming content.",
      },
    },
    {
      t: "full",
      img: I.intelligent,
      label: { ro: "Experiență inteligentă", en: "Intelligent experience" },
      title: { ro: "Everything connected. Always clear.", en: "Everything connected. Always clear." },
      caption: {
        ro: "Website-ul ca instrument de acces la cunoaștere — informația conectată, explorată și înțeleasă, nu doar publicată.",
        en: "The website as a tool for accessing knowledge — information connected, explored and understood, not merely published.",
      },
    },
    {
      t: "full",
      img: I.reflection,
      label: { ro: "Reflecție", en: "Reflection" },
      title: { ro: "Quiet Authority. Not Claimed. Earned.", en: "Quiet Authority. Not Claimed. Earned." },
      caption: {
        ro: "Prin experiență. Prin judecată. Prin rezultate.",
        en: "Through experience. Through judgment. Through results.",
      },
    },
  ],

  /* ════ FINAL STATEMENT ════ */
  final: [
    {
      t: "statement",
      heading: { ro: "Ce am descoperit", en: "What we discovered" },
      v: {
        ro: "Filip & Company este o organizație mai puternică decât imaginea pe care o proiectează. Expertiza există. Experiența există. Reputația există. Oamenii există. Ceea ce lipsește nu este valoarea, ci exprimarea ei.",
        en: "Filip & Company is a stronger organization than the image it projects. The expertise exists. The experience exists. The reputation exists. The people exist. What's missing isn't the value — it's its expression.",
      },
    },
    {
      t: "statement",
      heading: { ro: "Ce creează diferența", en: "What creates the gap" },
      v: {
        ro: "Diferența apare între ceea ce organizația este și modul în care această realitate este exprimată. Între experiență și comunicare. Între expertiză și percepție. Provocarea nu este crearea de valoare nouă — valoarea există deja — ci reducerea distanței dintre substanță și expresie.",
        en: "The gap appears between what the organization is and how that reality is expressed. Between experience and communication. Between expertise and perception. The challenge isn't creating new value — the value already exists — but closing the distance between substance and expression.",
      },
    },
    {
      t: "pull",
      v: {
        ro: "Filip & Company nu are nevoie să devină altceva. Are nevoie să devină o expresie mai clară a ceea ce este deja.",
        en: "Filip & Company doesn't need to become something else. It needs to become a clearer expression of what it already is.",
      },
    },
    {
      t: "statement",
      heading: { ro: "Direcția", en: "The direction" },
      v: {
        ro: "Quiet Authority nu este o poziționare nouă, ci o expresie mai clară a caracteristicilor care există deja. În locul afirmațiilor, dovezi. În locul poziționării abstracte, experiență demonstrată. În locul complexității, claritate. Nu o reinventare — o aliniere.",
        en: "Quiet Authority isn't a new positioning, but a clearer expression of traits that already exist. Proof instead of claims. Demonstrated experience instead of abstract positioning. Clarity instead of complexity. Not a reinvention — an alignment.",
      },
    },
    {
      t: "pull",
      v: {
        ro: "Cele mai puternice branduri nu sunt cele care încearcă să pară importante. Sunt cele care permit valorii reale să devină vizibilă.",
        en: "The strongest brands aren't the ones that try to seem important. They're the ones that let real value become visible.",
      },
    },
  ],
};

/* ── Registru ── */
export const STUDIES: Study[] = [filip];

export const getStudy = (slug: string): Study | undefined =>
  STUDIES.find((s) => s.slug === slug);

/* ── Carduri pentru pagina index ── */
export const STUDY_CARDS: StudyCard[] = [
  {
    number: "01",
    slug: filip.slug,
    client: filip.client,
    meta: filip.meta,
    kicker: filip.kicker,
    excerpt: filip.heroIntro,
    status: "published",
    cover: filip.heroImage,
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
