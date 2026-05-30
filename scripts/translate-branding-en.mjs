// Adaugă traducerile EN (title/subtitle/excerpt/body) pentru cele 3 articole de branding.
const TOKEN = process.env.SANITY_TOKEN;
const PROJECT = "bkejlgaa";
const DATASET = "production";
const API = "2025-05-30";
const BASE = `https://${PROJECT}.api.sanity.io/v${API}`;

const k = () => Math.random().toString(36).slice(2, 12);
const span = (text) => ({ _type: "span", _key: k(), text, marks: [] });
const block = (style, text) => ({ _type: "block", _key: k(), style, markDefs: [], children: [span(text)] });
const p = (t) => block("normal", t);
const h2 = (t) => block("h2", t);
const lead = (t) => block("blockquote", t);
const pullQuote = (t) => ({ _type: "pullQuote", _key: k(), text: t });
const callout = (label, text) => ({ _type: "callout", _key: k(), label, text });
const statement = (heading, text) => ({ _type: "statement", _key: k(), heading, text });
const bullet = (t) => ({ _type: "block", _key: k(), style: "normal", level: 1, listItem: "bullet", markDefs: [], children: [span(t)] });
const figure = (ref, alt, captionEn) => ({ _type: "figure", _key: k(), asset: { _type: "reference", _ref: ref }, alt, captionEn });

async function getArticle(slug) {
  const q = encodeURIComponent(`*[_type=="article" && slug.current=="${slug}"][0]{_id, bodyRo}`);
  const res = await fetch(`${BASE}/data/query/${DATASET}?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  return (await res.json()).result;
}
function figureRefs(bodyRo) {
  return bodyRo.filter((b) => b._type === "figure").map((b) => b.asset?._ref);
}
async function patch(id, set) {
  const mut = await fetch(`${BASE}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id, set } }] }),
  });
  return mut.json();
}

/* ── Articol 1 ── */
function body1([r1, r2]) {
  return [
    lead("A business can offer an excellent product. A brand also offers a reason for people to remember it."),
    p("When you build a business, most of the work stays invisible."),
    p("People see the result. They see the products. They see the services. They see the website. They see the prices. But they rarely see the road that led there."),
    p("They don't see the experiences that shaped you. They don't see the choices you make every day. They don't see the standards you refuse to lower. They don't see the reasons you started."),
    p("And yet, these are exactly the things that give a business its personality."),
    figure(r1, "Team working on a business's decisions", "A business's identity is built from everyday decisions, not visual elements."),
    h2("A business is built from decisions"),
    p("Every business makes choices."),
    p("It chooses how it speaks to people. It chooses what it promises. It chooses what it considers important. It chooses how much attention it gives to detail. It chooses the kind of experience it offers."),
    p("Over time, these choices create something more valuable than a product or a service. They create identity."),
    p("And identity is what helps people understand who they're dealing with."),
    h2("People look for clarity"),
    p("In almost any industry there are similar products. There are similar services. There are similar promises."),
    p("From the customer's perspective, the differences are often hard to notice."),
    p("That's why people look for clues. They look for signals. They look for reasons to trust. They look for businesses that seem to know exactly who they are and what they offer."),
    p("The moment a business manages to express these things clearly, it starts to be perceived differently."),
    pullQuote("Branding doesn't mean inventing something new about your business. It means expressing more clearly what already exists."),
    h2("This is where branding begins"),
    p("Branding doesn't create a business's values. It doesn't create the passion. It doesn't create the experience. It doesn't create the quality."),
    p("These already exist."),
    p("The role of branding is to make them visible. To turn the things you feel inside the business into things people can understand from the outside."),
    p("Through language. Through visual identity. Through experience. Through communication. Through every point of contact between the business and the customer."),
    figure(r2, "Tidy workspace, attention to detail", "Trust comes from consistent experiences, repeated over time."),
    h2("Trust is built over time"),
    p("The most memorable brands don't appear overnight."),
    p("They're built through consistency. Through good experiences repeated. Through promises kept. Through attention to detail. Through the way people feel after interacting with them."),
    p("Over time, these experiences turn into perception. And perception turns into trust."),
    callout("Worth keeping in mind", "Before you think about a logo, colors or a website, try to answer a few simple questions:"),
    bullet("What do we value most in what we do?"),
    bullet("What experience do we want to offer?"),
    bullet("What made us start?"),
    bullet("How do we want to be perceived?"),
    bullet("What do we want people to remember about us?"),
    statement("A brand is not what you say about your business.", "A brand is what people understand, feel and remember after they interact with it. And it all starts with a clear understanding of what your business truly represents."),
  ];
}

/* ── Articol 2 ── */
function body2([r1, r2]) {
  return [
    lead("Before visual identity, there is identity. Before branding, there is a business that knows what it stands for."),
    p("When people hear the word branding, they often think of the visible side of a business."),
    p("The logo. The colors. The website. The communication materials."),
    p("These are the elements we notice first."),
    p("But the strongest brands begin much earlier. They begin with a clear understanding of what they are and the value they want to bring to people."),
    p("This is the foundation on which everything else is built."),
    figure(r1, "An idea noted at the start of a project", "Every business starts from a reason — that's where identity begins."),
    h2("Every business has an identity"),
    p("Behind every business there is a reason it was created."),
    p("Maybe you noticed a problem worth solving. Maybe you wanted to offer a better experience. Maybe you turned a passion into a project. Maybe you continued a tradition. Maybe you saw an opportunity and chose to build something around it."),
    p("These things shape the way you work. They shape the choices you make. They shape the experience you create."),
    p("Over time, they become part of the business's personality."),
    h2("People remember how they feel"),
    p("Products can be similar. Services can be similar. Experiences, however, are different."),
    p("People notice the attention to detail. They notice the care. They notice the consistency. They notice when there's a clear idea behind a business."),
    p("Over time, these things build trust. And trust is one of the most valuable assets a brand can have."),
    pullQuote("A strong brand emerges when what you believe, what you do and what you communicate all tell the same story."),
    h2("Branding expresses what already exists"),
    p("Visual identity plays an important role. So does the website. So does communication."),
    p("But their value appears when they express something real. A business's values. Its personality. The experience it wants to offer. The way it works."),
    p("When all these elements are aligned, people understand more easily who you are and what you stand for."),
    figure(r2, "Visual plan and notes on a desk", "Clarity and consistency turn value into a recognizable brand."),
    h2("Clarity creates connection"),
    p("Many businesses invest time and resources into developing their products and services."),
    p("The next step is to turn that value into an experience people can recognize and understand."),
    p("Clarity helps people form an image. Consistency helps them remember. Experience helps them trust."),
    p("Over time, these things build something bigger than a visual identity. They build a brand."),
    callout("Questions worth exploring", ""),
    bullet("What does our business stand for?"),
    bullet("What do we value most?"),
    bullet("What experience do we want to offer?"),
    bullet("What motivates us to build every day?"),
    bullet("What do we want people to remember about us?"),
    statement("The strongest brands are built on clarity, values and consistency.", "Design, communication and experience become the tools through which this identity takes shape and reaches people."),
  ];
}

/* ── Articol 3 ── */
function body3([r1, r2]) {
  return [
    lead("Trust appears when people understand who you are and recognize it every time they interact with your business."),
    p("There are businesses we recognize instantly."),
    p("We recognize them by the way they communicate. By the experience they offer. By their attention to detail. By the way they make us feel."),
    p("Over time, these things become familiar. And familiarity is one of the foundations of trust."),
    p("People appreciate experiences that make sense. Experiences that are clear. Experiences that convey the same idea wherever they encounter them."),
    figure(r1, "A conversation between a customer and a business", "Every touchpoint shapes the image people form about the brand."),
    h2("Every interaction contributes to a business's image"),
    p("A business communicates constantly."),
    p("Through the website. Through social media. Through emails. Through products. Through services. Through every conversation with a customer."),
    p("Each of these touchpoints contributes to how people perceive the brand."),
    p("When they all convey the same personality and the same direction, the image becomes clearer."),
    p("People understand more quickly who you are. They understand what you stand for. They understand what to expect."),
    h2("Trust is built through confirmation"),
    p("The strongest relationships develop over time. The same is true for brands."),
    p("Trust grows when experiences confirm what you promised. When the values you communicate are reflected in reality. When attention to detail shows in every interaction."),
    p("When people feel that the business they discovered yesterday is the same business they meet again tomorrow."),
    pullQuote("Consistency turns individual experiences into trust. Over time, trust turns a business into a memorable brand."),
    h2("Clarity helps people recognize you"),
    p("When a business has a clear direction, people start to recognize it more easily."),
    p("They recognize the language. They recognize the style. They recognize the values. They recognize the experience."),
    p("This recognition reduces the effort of understanding."),
    p("People no longer try to figure out who you are. They start to focus on what you offer. They start to build a relationship with the brand."),
    figure(r2, "A team working as the business evolves", "Consistency provides continuity even as the business evolves."),
    h2("Consistency supports evolution"),
    p("Every business evolves."),
    p("It launches new services. It updates its website. It develops its identity. It improves its processes."),
    p("Evolution is natural."),
    p("At the same time, there are certain things that provide continuity. The values. The personality. The experience. The way the business chooses to relate to people."),
    p("These elements create stability and make evolution easier to understand."),
    callout("What contributes to a brand's consistency", ""),
    bullet("A clear and coherent message"),
    bullet("A recognizable visual identity"),
    bullet("A similar experience across all touchpoints"),
    bullet("Values expressed through actions"),
    bullet("Promises kept consistently"),
    statement("People develop trust in the businesses they understand and recognize.", "When experience, communication and values point in the same direction over time, the brand becomes clearer, more memorable and easier to choose."),
  ];
}

const ARTICLES = [
  {
    slug: "ce-transforma-o-afacere-intr-un-brand",
    titleEn: "What turns a business into a brand",
    subtitleEn: "Products and services are only the beginning. People remember the businesses that manage to convey something more.",
    excerptEn: "A brand isn't what you say about your business — it's what people understand, feel and remember after they interact with it.",
    build: body1,
  },
  {
    slug: "ce-sta-la-baza-unui-brand-puternic",
    titleEn: "What lies at the foundation of a strong brand",
    subtitleEn: "The most memorable brands start from clarity, values and a deep understanding of what they represent.",
    excerptEn: "The strongest brands are built on clarity, values and consistency — design, communication and experience are simply the tools through which that identity reaches people.",
    build: body2,
  },
  {
    slug: "de-ce-consistenta-creeaza-incredere",
    titleEn: "Why consistency builds trust",
    subtitleEn: "People build trust when they encounter the same experience, the same values and the same attention to detail over time.",
    excerptEn: "Trust appears when a business's experience, communication and values point in the same direction over time — consistency turns individual experiences into a memorable brand.",
    build: body3,
  },
];

async function main() {
  if (!TOKEN) throw new Error("SANITY_TOKEN missing");
  for (const a of ARTICLES) {
    const doc = await getArticle(a.slug);
    if (!doc?._id) throw new Error("negăsit: " + a.slug);
    const refs = figureRefs(doc.bodyRo);
    if (refs.length < 2) throw new Error("imagini lipsă la " + a.slug + " (" + refs.length + ")");
    const out = await patch(doc._id, {
      titleEn: a.titleEn,
      subtitleEn: a.subtitleEn,
      excerptEn: a.excerptEn,
      bodyEn: a.build(refs),
    });
    console.log(a.slug, "→", JSON.stringify(out.results?.[0] || out));
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
