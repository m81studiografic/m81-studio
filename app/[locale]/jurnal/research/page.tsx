"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeroBadge, FadeUp } from "@/app/components/m81-components";

/* ──────────────────────────────────────────────────────────────
   STUDIO INSIGHTS — Template articol: INDUSTRY RESEARCH
   Adaptat 1:1 la sistemul vizual M81 (Manrope, accent lime,
   fundal cream, carduri rotunjite, cursor global via data-cur).
   Nav + Footer vin din layout — pagina randeaza doar continutul.
   ────────────────────────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap');
.si { font-family: 'Manrope', system-ui, -apple-system, sans-serif; }
.si ::selection { background: var(--black); color: #fff; }
.si .tj { text-align: justify; text-justify: inter-word; }
`;

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA5efiE6ubPKyAfOeqHQCgUpg3LZ6EyT8Ro0rZTOzb2_cVbuSJgHQe66AFDkQ5QhfFzOQPU0GIW4wF1j9KI_MxlB5ihiK8iKK3PtrlDf4FlF9BV7vYwS_50o1fcLT5qeHfIFqTTWyXNuuMluYOSqiJdIOCwUCliR61XZo2Yc_XpfJamagjsSibP7-a8AKuSWn2meQFIWkofk6lm9TEtpUcFFJD4Q5QJGwrJmoFB2ykFgzLoa9m2aw5GkQYz2uFo4m_x4i-R1xZ0In4";

const T = {
  ro: {
    kicker: "Industry Research — înțelegem industria",
    title: "Viitorul brandingului post-digital",
    dateLabel: "Data", date: "Octombrie 2024",
    readLabel: "Timp citire", read: "14 minute",
    back: "Înapoi la insights",
    lead: "În era post-digitală, granița dintre experiența fizică și cea virtuală a dispărut complet. Această cercetare analizează modul în care mărcile de lux își redefinesc identitatea într-un ecosistem definit de date, nu doar de estetică.",
    introP1: "Brandingul nu mai este o simplă chestiune de logo-uri și palete cromatice. Astăzi, identitatea unei mărci este un sistem viu, algoritmic, care răspunde în timp real la comportamentul consumatorului. Cercetarea noastră arată că 72% dintre liderii din industrie consideră că personalizarea bazată pe AI este pilonul central al strategiei lor pentru următorul deceniu.",
    introP2: 'Analiza de față explorează structurile de profunzime ale acestui fenomen, utilizând un cadru metodologic mixt pentru a decoda semantica vizuală a viitorului. Ne concentrăm pe conceptul de „Branding Fluid" — o paradigmă unde consistența nu mai înseamnă repetiție, ci adaptabilitate structurală.',
    dataLabel: "Date & analiză",
    dataTitle: "Analiza comparativă a datelor",
    dataIntro: "Evoluția investițiilor în active intangibile digitale vs. marketing tradițional (2018–2024).",
    fig1: "Fig. 01 / Adopție tehnologică",
    fig1Pre: "Creștere de ", fig1Strong: "140%", fig1Post: " în sectorul de cercetare vizuală algoritmică.",
    fig2: "Fig. 02 / Retenția audienței",
    fig2Text: "Utilizatori care preferă interfețele „non-intruzive”.",
    fig3: "Fig. 03 / Distribuția pieței",
    fig3Text: "Dominanța pieței nord-americane în inovația de branding.",
    toc: ["01 Intro", "02 Paradigme", "03 Metodologie", "04 Concluzii"],
    sideQuote: "Datele nu sunt doar cifre; ele sunt noua cerneală a designului contemporan.",
    sideQuoteBy: "— M81 Studio Journal",
    h3a: "Dincolo de pixel: noua materialitate",
    bodyA1: 'Explorarea noastră a relevat un paradox interesant: cu cât devine mai digitală lumea noastră, cu atât mai mult consumatorii tânjesc după atribute senzoriale în interacțiunile cu brandurile. Așa a apărut „Skeuomorfismul Cognitiv" — utilizarea metaforelor vizuale digitale pentru a evoca reacții psihologice profunde, legate de siguranță și familiaritate.',
    bodyA2: "În acest context, designul editorial joacă un rol crucial. Structura unei pagini, ritmul lecturii și tipografia devin ancore de stabilitate într-un ocean de zgomot informațional. La M81 abordăm fiecare proiect de cercetare ca pe o monografie arhitecturală: spațiul alb nu este „gol”, ci structură portantă.",
    keyLabel: "Observație cheie",
    keyText: 'Brandingul viitorului va fi măsurat nu prin „share of voice", ci prin „share of attention span". Capacitatea de a reține atenția într-un mod etic devine principalul avantaj competitiv.',
    h3b: "Metodologie și rigoare",
    bodyB: "Pentru acest raport am analizat peste 500 de identități de brand lansate în ultimii 24 de luni, utilizând o metodologie de „Visual Sentiment Analysis” (VSA). Procesul a fost completat de interviuri structurate cu 30 de experți în semiotică și tehnologii emergente. Rezultatul este o hartă multidimensională a curentelor estetice care vor defini anul 2025.",
    phases: [
      { n: "Faza 01", t: "Data scraping & mining" },
      { n: "Faza 02", t: "Semantical mapping" },
      { n: "Faza 03", t: "Predictive modeling" },
      { n: "Faza 04", t: "Visual synthesis" },
    ],
    nlTitle: "Aprofundați subiectul.",
    nlText: "Primiți lunar rapoartele noastre de cercetare direct în inbox. Fără zgomot, doar analiză pură.",
    nlPlaceholder: "Adresa de email",
    nlBtn: "Abonează-te",
  },
  en: {
    kicker: "Industry Research — we understand the industry",
    title: "The Future of Post-Digital Branding",
    dateLabel: "Date", date: "October 2024",
    readLabel: "Read time", read: "14 minutes",
    back: "Back to insights",
    lead: "In the post-digital era, the line between physical and virtual experience has fully dissolved. This research examines how luxury brands are redefining their identity within an ecosystem defined by data, not aesthetics alone.",
    introP1: "Branding is no longer a matter of logos and color palettes. Today, a brand's identity is a living, algorithmic system that responds in real time to consumer behavior. Our research shows that 72% of industry leaders consider AI-driven personalization the central pillar of their strategy for the coming decade.",
    introP2: 'This analysis explores the deep structures of that phenomenon, using a mixed methodological framework to decode the visual semantics of the future. We focus on the concept of "Fluid Branding" — a paradigm where consistency no longer means repetition, but structural adaptability.',
    dataLabel: "Data & analysis",
    dataTitle: "Comparative Data Analysis",
    dataIntro: "Evolution of investment in intangible digital assets vs. traditional marketing (2018–2024).",
    fig1: "Fig. 01 / Technology adoption",
    fig1Pre: "A ", fig1Strong: "140%", fig1Post: " increase in algorithmic visual research.",
    fig2: "Fig. 02 / Audience retention",
    fig2Text: 'Users who prefer "non-intrusive" interfaces.',
    fig3: "Fig. 03 / Market distribution",
    fig3Text: "North-American market dominance in branding innovation.",
    toc: ["01 Intro", "02 Paradigms", "03 Methodology", "04 Conclusions"],
    sideQuote: "Data isn't just numbers; it is the new ink of contemporary design.",
    sideQuoteBy: "— M81 Studio Journal",
    h3a: "Beyond the Pixel: The New Materiality",
    bodyA1: 'Our exploration revealed an interesting paradox: the more digital our world becomes, the more consumers crave sensory attributes in their interactions with brands. This gave rise to "Cognitive Skeuomorphism" — using digital visual metaphors to evoke deep psychological reactions tied to safety and familiarity.',
    bodyA2: 'In this context, editorial design plays a crucial role. Page structure, reading rhythm and typography become anchors of stability in an ocean of informational noise. At M81 we approach every research project as an architectural monograph: white space is not "empty", it is load-bearing structure.',
    keyLabel: "Key observation",
    keyText: 'The branding of the future will be measured not by "share of voice", but by "share of attention span". The ability to hold attention ethically becomes the main competitive advantage.',
    h3b: "Methodology & Rigor",
    bodyB: 'For this report we analyzed over 500 brand identities launched in the last 24 months, using a "Visual Sentiment Analysis" (VSA) methodology. The process was complemented by structured interviews with 30 experts in semiotics and emerging technologies. The result is a multidimensional map of the aesthetic currents that will define 2025.',
    phases: [
      { n: "Phase 01", t: "Data scraping & mining" },
      { n: "Phase 02", t: "Semantical mapping" },
      { n: "Phase 03", t: "Predictive modeling" },
      { n: "Phase 04", t: "Visual synthesis" },
    ],
    nlTitle: "Go deeper.",
    nlText: "Receive our research reports in your inbox every month. No noise, just pure analysis.",
    nlPlaceholder: "Email address",
    nlBtn: "Subscribe",
  },
} as const;

/* hook in-view (declanseaza animatia graficelor la scroll) */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/* card grafic (border hairline + colt rotunjit) */
function ChartCard({ label, children, caption }: { label: string; children: React.ReactNode; caption: React.ReactNode }) {
  return (
    <div className="rounded-md border border-[rgba(13,13,11,0.12)] bg-[var(--cream)] p-8">
      <span className="block text-[10px] font-extrabold tracking-[0.16em] uppercase text-[rgba(13,13,11,0.5)] mb-8">{label}</span>
      {children}
      <p className="text-[14px] leading-[1.6] text-[var(--gray-900)] mt-6 m-0">{caption}</p>
    </div>
  );
}

/* ──────────────────── PAGE ──────────────────── */
export default function ResearchArticlePage() {
  const locale = useLocale();
  const isRo = locale === "ro";
  const t = isRo ? T.ro : T.en;
  const cur = isRo ? "Citește" : "Read";

  const bars = [
    { h: 40, accent: false },
    { h: 85, accent: false },
    { h: 60, accent: false },
    { h: 95, accent: true },
  ];
  const [barsRef, barsSeen] = useInView<HTMLDivElement>();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <main className="si bg-[var(--cream)] text-[var(--gray-900)] pt-20 overflow-x-hidden">

        {/* ════ HERO ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] pt-[clamp(40px,6vw,72px)] pb-[clamp(40px,6vw,64px)]">
          <Link href={`/${locale}/jurnal`} data-cur={cur}
            className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.16em] uppercase text-[rgba(13,13,11,0.5)] no-underline mb-[clamp(40px,6vw,72px)] transition-colors hover:text-[var(--black)]">
            <span className="inline-block">←</span> {t.back}
          </Link>
          <FadeUp>
            <span className="block text-[11px] font-extrabold tracking-[0.2em] uppercase text-[rgba(13,13,11,0.5)] mb-6">{t.kicker}</span>
            <h1 className="text-[clamp(40px,7vw,84px)] font-extrabold tracking-[-0.04em] leading-[1.02] text-[var(--black)] max-w-[1100px] m-0">{t.title}</h1>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="flex flex-wrap items-start gap-x-[clamp(32px,6vw,72px)] gap-y-6 border-t border-[rgba(13,13,11,0.12)] mt-[clamp(40px,5vw,56px)] pt-8">
              {[
                { l: t.dateLabel, v: t.date, strong: false },
                { l: t.readLabel, v: t.read, strong: false },
              ].map((m) => (
                <div key={m.l}>
                  <p className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-[rgba(13,13,11,0.5)] m-0 mb-2">{m.l}</p>
                  <p className={`text-[14px] text-[var(--black)] m-0 ${m.strong ? "font-bold" : "font-medium"}`}>{m.v}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </section>

        {/* ════ HERO IMAGE + INTRO ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] pb-[clamp(56px,9vw,120px)]">
          <FadeUp>
            <div className="relative overflow-hidden rounded-lg bg-[#e8e7e3] h-[clamp(320px,46vw,600px)] mb-[clamp(40px,6vw,72px)]">
              <img src={HERO_IMG} alt={t.title}
                className="w-full h-full object-cover grayscale transition-all duration-[1200ms] ease-[cubic-bezier(.23,1,.32,1)] hover:grayscale-0 hover:scale-[1.03]" />
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-start-4 md:col-span-7">
              <FadeUp>
                <p className="text-[clamp(18px,2vw,24px)] font-light leading-[1.55] text-[var(--black)] italic border-l-2 border-[var(--lime)] pl-8 py-1 mb-12 m-0">{t.lead}</p>
              </FadeUp>
              <FadeUp delay={100}>
                <div className="tj space-y-6 text-[16px] leading-[1.75] text-[rgba(13,13,11,0.65)]">
                  <p className="m-0">{t.introP1}</p>
                  <p className="m-0">{t.introP2}</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ════ DATA VISUALIZATION ════ */}
        <section className="bg-[#e7e6e2] border-y border-[rgba(13,13,11,0.12)] py-[clamp(56px,9vw,120px)]">
          <div className="max-w-[1440px] mx-auto px-[var(--page-px)]">
            <FadeUp>
              <div className="max-w-[460px] mb-14">
                <div className="flex items-center gap-3.5 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[var(--lime)] shrink-0" />
                  <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[var(--gray-900)]">{t.dataLabel}</span>
                </div>
                <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold tracking-[-0.03em] leading-[1.12] text-[var(--black)] mt-0 mb-4">{t.dataTitle}</h2>
                <p className="text-[15px] leading-[1.7] text-[rgba(13,13,11,0.6)] m-0">{t.dataIntro}</p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fig 01 — bar chart */}
              <FadeUp>
                <ChartCard label={t.fig1} caption={<>{t.fig1Pre}<span className="font-extrabold text-[var(--black)]">{t.fig1Strong}</span>{t.fig1Post}</>}>
                  <div ref={barsRef} className="flex items-end justify-between h-48 gap-3">
                    {bars.map((b, i) => (
                      <div key={i}
                        className="w-full rounded-t-sm transition-[height] duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)]"
                        style={{
                          height: barsSeen ? `${b.h}%` : "0%",
                          transitionDelay: `${i * 90}ms`,
                          backgroundColor: b.accent ? "var(--lime)" : i % 2 ? "var(--gray-900)" : "rgba(13,13,11,0.18)",
                        }} />
                    ))}
                  </div>
                </ChartCard>
              </FadeUp>

              {/* Fig 02 — donut */}
              <FadeUp delay={90}>
                <ChartCard label={t.fig2} caption={t.fig2Text}>
                  <div className="relative h-48 flex items-center justify-center">
                    <div className="w-44 h-44 rounded-full"
                      style={{ background: "conic-gradient(var(--lime) 0% 4%, var(--gray-900) 4% 75%, rgba(13,13,11,0.12) 75% 100%)" }} />
                    <div className="absolute w-[120px] h-[120px] rounded-full bg-[var(--cream)] flex items-center justify-center">
                      <span className="text-[34px] font-extrabold tracking-[-0.03em] text-[var(--black)]">75%</span>
                    </div>
                  </div>
                </ChartCard>
              </FadeUp>

              {/* Fig 03 — market grid */}
              <FadeUp delay={180}>
                <ChartCard label={t.fig3} caption={t.fig3Text}>
                  <div className="grid grid-cols-2 gap-2 h-48">
                    {[
                      { l: "EU", cls: "bg-[rgba(13,13,11,0.1)] text-[var(--gray-900)]" },
                      { l: "NA", cls: "bg-[var(--lime)] text-black" },
                      { l: "ASIA", cls: "bg-[var(--gray-900)] text-white" },
                      { l: "OTHER", cls: "bg-[rgba(13,13,11,0.05)] text-[rgba(13,13,11,0.5)]" },
                    ].map((c) => (
                      <div key={c.l} className={`rounded-sm p-3 flex flex-col justify-end ${c.cls}`}>
                        <span className="text-[10px] font-extrabold tracking-[0.12em]">{c.l}</span>
                      </div>
                    ))}
                  </div>
                </ChartCard>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ════ LONG FORM + STICKY SIDEBAR ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] py-[clamp(56px,9vw,120px)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* sidebar */}
            <aside className="hidden md:block md:col-span-3 border-r border-[rgba(13,13,11,0.12)] pr-8">
              <div className="sticky top-28 space-y-8">
                <nav className="flex flex-col gap-4">
                  {t.toc.map((s, i) => (
                    <span key={s}
                      className={`text-[11px] font-extrabold tracking-[0.16em] uppercase w-fit pb-1 ${i === 0 ? "text-[var(--black)] border-b border-[var(--lime)]" : "text-[rgba(13,13,11,0.45)]"}`}>
                      {s}
                    </span>
                  ))}
                </nav>
                <div className="pt-8 border-t border-[rgba(13,13,11,0.12)]">
                  <p className="text-[15px] italic leading-[1.6] text-[rgba(13,13,11,0.6)] mb-4 m-0">“{t.sideQuote}”</p>
                  <span className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-[var(--gray-900)]">{t.sideQuoteBy}</span>
                </div>
              </div>
            </aside>

            {/* article body */}
            <article className="md:col-span-7 md:col-start-5 space-y-12">
              <div className="space-y-6">
                <FadeUp>
                  <h3 className="text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.03em] leading-[1.15] text-[var(--black)] m-0">{t.h3a}</h3>
                </FadeUp>
                <FadeUp delay={80}>
                  <div className="tj space-y-6 text-[16px] leading-[1.75] text-[rgba(13,13,11,0.65)]">
                    <p className="m-0">{t.bodyA1}</p>
                    <p className="m-0">{t.bodyA2}</p>
                  </div>
                </FadeUp>
              </div>

              {/* key observation — bloc dark */}
              <FadeUp>
                <div className="rounded-[20px] bg-[var(--gray-900)] p-[clamp(28px,4vw,48px)]">
                  <div className="flex items-center gap-3.5 mb-5">
                    <span className="w-2 h-2 rounded-full bg-[var(--lime)] shrink-0" />
                    <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[var(--lime)]">{t.keyLabel}</span>
                  </div>
                  <p className="text-[clamp(18px,2.2vw,26px)] font-light leading-[1.5] text-white m-0">{t.keyText}</p>
                </div>
              </FadeUp>

              <div className="space-y-6">
                <FadeUp>
                  <h3 className="text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.03em] leading-[1.15] text-[var(--black)] m-0">{t.h3b}</h3>
                </FadeUp>
                <FadeUp delay={80}>
                  <p className="tj text-[16px] leading-[1.75] text-[rgba(13,13,11,0.65)] m-0">{t.bodyB}</p>
                </FadeUp>
                <FadeUp delay={120}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {t.phases.map((p) => (
                      <div key={p.n} className="rounded-md border border-[rgba(13,13,11,0.12)] p-6 transition-colors hover:border-[rgba(13,13,11,0.3)]">
                        <span className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-[rgba(13,13,11,0.5)]">{p.n}</span>
                        <p className="text-[16px] font-extrabold tracking-[-0.01em] text-[var(--black)] mt-2 m-0">{p.t}</p>
                      </div>
                    ))}
                  </div>
                </FadeUp>
              </div>
            </article>
          </div>
        </section>

        {/* ════ NEWSLETTER (bloc dark, stil M81) ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] pb-[clamp(64px,9vw,128px)]">
          <FadeUp>
            <div className="relative overflow-hidden rounded-[28px] bg-[var(--gray-900)] px-[clamp(28px,5vw,72px)] py-[clamp(56px,8vw,96px)] text-center">
              <div className="absolute -right-20 -top-20 w-[320px] h-[320px] rounded-full border border-[rgba(196,242,13,0.12)] pointer-events-none" />
              <h2 className="text-[clamp(32px,5vw,64px)] font-extrabold tracking-[-0.035em] leading-[1.05] text-white m-0 mb-6">{t.nlTitle}</h2>
              <p className="text-[clamp(15px,1.6vw,18px)] font-light leading-[1.7] text-[rgba(255,255,255,0.6)] max-w-[560px] mx-auto m-0 mb-10">{t.nlText}</p>
              <form className="max-w-[480px] mx-auto flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder={t.nlPlaceholder}
                  className="flex-1 bg-transparent border-b border-[rgba(255,255,255,0.3)] px-1 py-3 text-[14px] text-white placeholder:text-[rgba(255,255,255,0.4)] outline-none focus:border-[var(--lime)] transition-colors" />
                <button type="submit" data-cur={cur}
                  className="shrink-0 bg-[var(--lime)] text-black px-8 py-3 rounded-full text-[12px] font-black tracking-[0.12em] uppercase transition-transform hover:scale-[1.03]">
                  {t.nlBtn}
                </button>
              </form>
            </div>
          </FadeUp>
        </section>
      </main>
    </>
  );
}
