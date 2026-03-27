import Link from "next/link";
import { projects as allProjects } from "@/lib/projects";
import { useTranslations, useLocale } from "next-intl";
import { SlideUp, FadeUp, WipeIn, ProjectCard, ServiceRow, ProcessCard, CtaButton, HeroLink } from "@/app/components/HomePageClient";

function Marquee() {
  const items = [
    "Strategie",
    "Identitate",
    "UI/UX",
    "Front-end",
    "Branding",
    "Produs Digital",
    "Design Systems",
    "Consultanță",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-5">
      
      {/* fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[var(--cream)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[var(--cream)] to-transparent" />

      <div
        className="flex items-center gap-14 whitespace-nowrap w-max"
        style={{
          animation: "m81-ticker 30s linear infinite",
        }}
      >
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-14">
            
            <span className="text-[10px] md:text-[11px] font-light uppercase tracking-[0.26em] text-[#0d0d0b]">
              {t}
            </span>

            <span className="text-[#B6FF00] text-[10px] opacity-70">
              ✦
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}

function SpinBadge() {
  return (
    <div className="relative w-[100px] h-[100px] shrink-0">
      <svg viewBox="0 0 100 100" width="100" height="100" className="animate-[spinSlow_14s_linear_infinite]">
        <defs><path id="sc" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" /></defs>
        <text fontSize="8" fontWeight="800" fill="var(--lime)" letterSpacing="2.5" fontFamily="Manrope,sans-serif">
          <textPath href="#sc">M81 STUDIO · DESIGN DIGITAL · </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[34px] h-[34px] rounded-full bg-[var(--lime)] flex items-center justify-center text-[14px] font-black text-black">✦</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations("home");
  const ts = useTranslations("services");
  const tp = useTranslations("process");
  const tc = useTranslations("cta");

  const featuredProjects = allProjects.slice(0, 4);

  return (
    <>
      <main className="bg-[var(--cream)] min-h-screen font-sans text-[var(--black)] overflow-x-hidden">

        {/* ── HERO ── */}
        <section className="relative min-h-[100vh] bg-[#2a2a28] flex flex-col justify-between overflow-hidden p-0">
          <div className="absolute inset-0 pointer-events-none z-10 opacity-60 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_256_256%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27n%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.9%27_numOctaves=%274%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%23n)%27_opacity=%270.04%27/%3E%3C/svg%3E')]" />
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,242,13,0.12)] to-transparent animate-[scanline_8s_linear_infinite] pointer-events-none z-20" />
          <div className="absolute right-[60px] top-[15%] w-[380px] h-[380px] rounded-full border border-[rgba(196,242,13,0.07)] animate-[floatY_9s_ease-in-out_infinite] pointer-events-none z-10" />
          <div className="absolute right-[100px] top-[20%] w-[220px] h-[220px] rounded-full border border-[rgba(196,242,13,0.04)] animate-[floatY_9s_ease-in-out_infinite_3s] pointer-events-none z-10" />

          {/* TOP BAR */}
          <header className="relative z-10 flex justify-between items-center py-8 px-14 border-b border-[rgba(255,255,255,0.06)] opacity-100">
            <span className="text-[10px] font-extrabold tracking-[0.28em] uppercase text-[rgba(255,255,255,0.3)]">
              {locale === "ro" ? "PARTENER CREATIV DIGITAL" : "CREATIVE DIGITAL PARTNER"}
            </span>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] animate-[pulse_2s_ease-in-out_infinite] inline-block" />
              <span className="text-[10px] font-extrabold text-[var(--lime)] tracking-[0.22em] uppercase">
                {locale === "ro" ? "DISPONIBILI" : "AVAILABLE"}
              </span>
            </div>
            <span className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-[rgba(255,255,255,0.3)]">EST. 2019 · BUCUREȘTI</span>
          </header>

          {/* TITLE */}
          <div className="relative z-10 flex-1 flex flex-col justify-center px-14">
            <div className="overflow-hidden leading-[0.88]">
              <h1 className="font-sans text-[clamp(64px,11vw,168px)] font-black italic tracking-[-0.04em] text-white block">{t("hero1")}</h1>
            </div>
            <div className="overflow-hidden leading-[0.82]">
              <h1 className="font-sans text-[clamp(64px,13.5vw,208px)] font-black tracking-[-0.055em] uppercase text-white block">{t("hero2")}</h1>
            </div>
            <div className="overflow-hidden leading-[0.82]">
              <h1 className="font-sans text-[clamp(64px,13.5vw,208px)] font-black tracking-[-0.055em] uppercase text-[var(--lime)] block">{t("hero3")}</h1>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <footer className="relative z-10 flex justify-between items-end px-14 pt-10 pb-12 border-t border-[rgba(255,255,255,0.06)] gap-10 flex-wrap opacity-100">
            <p className="text-[clamp(12px,1.2vw,14px)] font-semibold tracking-[0.12em] uppercase text-[rgba(255,255,255,0.35)] leading-[1.7] max-w-[340px] m-0">
              {t("tagline")}
            </p>
            <nav aria-label="Hero Navigation" className="flex items-center gap-6 flex-1 justify-center">
              <div className="h-px w-full max-w-[120px] bg-[rgba(255,255,255,0.15)]" />
              <HeroLink href={`/${locale}/proiecte`}>{t("lucrari")}</HeroLink>
              <div className="h-px w-full max-w-[120px] bg-[rgba(255,255,255,0.15)]" />
            </nav>
            <SpinBadge />
          </footer>
        </section>

        {/* ── STATS ── */}
        <div className="border-y border-[rgba(13,13,11,0.07)]">
          <div className="max-w-[1280px] mx-auto py-10 px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: "48+", label: t("stats_proiecte") },
              { n: "6", label: t("stats_ani") },
              { n: "98%", label: t("stats_clienti") },
              { n: "12", label: t("stats_industrii") },
            ].map((s, i) => (
              <FadeUp key={s.n} delay={i * 80}>
                <article className="text-center">
                  <p className="text-[clamp(28px,3vw,44px)] font-black tracking-[-0.04em] text-[var(--black)] leading-none">{s.n}</p>
                  <h3 className="text-[10px] font-extrabold text-[var(--muted)] tracking-[0.16em] uppercase mt-1.5 mb-0">{s.label}</h3>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── MARQUEE ── */}
        <Marquee />

        {/* ── PROJECTS ── */}
        <section className="max-w-[1280px] mx-auto py-16 md:py-24 px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10 md:mb-14">
            <SlideUp>
              <h2 className="text-[clamp(28px,3.5vw,48px)] font-black tracking-[-0.04em] text-[var(--black)] leading-none">{t("selected")}</h2>
            </SlideUp>
            <FadeUp delay={200}>
              <Link href={`/${locale}/proiecte`} data-cur="Toate" className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[var(--muted)] no-underline flex items-center gap-2">
                {t("toate")} <span className="inline-block w-5 h-px bg-[var(--muted)]" /> ↗
              </Link>
            </FadeUp>
          </div>

          <div className="mb-4 md:mb-5">
            <ProjectCard image={featuredProjects[0].image} title={featuredProjects[0].title} category={featuredProjects[0].category} index={0} aspect="21/8" href={`/${locale}/proiecte/${featuredProjects[0].slug}`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <ProjectCard image={featuredProjects[1].image} title={featuredProjects[1].title} category={featuredProjects[1].category} index={1} href={`/${locale}/proiecte/${featuredProjects[1].slug}`} />
            <ProjectCard image={featuredProjects[2]?.image ?? featuredProjects[0].image} title={featuredProjects[2]?.title ?? ""} category={featuredProjects[2]?.category ?? ""} index={2} href={`/${locale}/proiecte/${featuredProjects[2]?.slug ?? ""}`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-4">
            <ProjectCard image={featuredProjects[3]?.image ?? featuredProjects[0].image} title={featuredProjects[3]?.title ?? ""} category={featuredProjects[3]?.category ?? ""} index={3} aspect="4/3" href={`/${locale}/proiecte/${featuredProjects[3]?.slug ?? ""}`} />
            <FadeUp delay={300}>
              <div className="bg-[var(--black)] rounded-md py-12 px-11 h-full flex flex-col justify-between min-h-[280px] relative overflow-hidden">
                <div className="absolute -right-5 -bottom-10 text-[clamp(100px,14vw,180px)] font-black text-[rgba(255,255,255,.04)] tracking-[-0.06em] pointer-events-none select-none leading-none">48+</div>
                <p className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-[var(--lime)]">48+ {t("stats_proiecte").toLowerCase()}</p>
                <div>
                  <WipeIn delay={100}>
                    <p className="text-[clamp(22px,2.5vw,34px)] font-black tracking-[-0.03em] text-white leading-tight mb-6">
                      {locale === "ro" ? "Fiecare proiect, construit cu intenție clară și execuție precisă." : "Every project, built with clear intention and precise execution."}
                    </p>
                  </WipeIn>
                  <Link href={`/${locale}/proiecte`} data-cur="Vezi" className="inline-flex items-center gap-2.5 border border-[rgba(255,255,255,.15)] rounded-full py-3 px-6 text-[rgba(255,255,255,.6)] text-[12px] font-extrabold no-underline tracking-[0.06em]">
                    {locale === "ro" ? "Explorează portofoliul →" : "Explore portfolio →"}
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white border-y border-[rgba(13,13,11,0.06)]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-12 md:gap-20 items-start">
            <div className="md:sticky md:top-[120px]">
              <FadeUp><p className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-[var(--lime)] mb-4">{ts("label")}</p></FadeUp>
              <SlideUp delay={100}><h2 className="text-[clamp(32px,4vw,52px)] font-black tracking-[-0.04em] text-[var(--black)] leading-[1.05]">{ts("title")}<br /><span className="text-[rgba(13,13,11,0.2)]">{ts("subtitle")}</span></h2></SlideUp>
              <FadeUp delay={200}><p className="text-[14px] text-[var(--muted)] leading-[1.8] mt-5 max-w-[260px]">{ts("desc")}</p></FadeUp>
              <FadeUp delay={350}>
                <Link href={`/${locale}/servicii`} data-cur="Vezi" className="inline-flex items-center gap-2.5 mt-8 text-[12px] font-extrabold text-[var(--black)] no-underline tracking-[0.06em] border-b border-[rgba(13,13,11,0.15)] pb-1">
                  {ts("all")}
                </Link>
              </FadeUp>
            </div>
            <div className="border-t border-[rgba(13,13,11,0.08)]">
              {[
                { n: "01", title: ts("s1_title"), desc: ts("s1_desc"), delay: 0 },
                { n: "02", title: ts("s2_title"), desc: ts("s2_desc"), delay: 80 },
                { n: "03", title: ts("s3_title"), desc: ts("s3_desc"), delay: 160 },
                { n: "04", title: ts("s4_title"), desc: ts("s4_desc"), delay: 240 },
              ].map(s => <ServiceRow key={s.n} {...s} />)}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="bg-[var(--black)] py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute -left-5 top-1/2 -translate-y-1/2 text-[clamp(100px,18vw,240px)] font-black text-[rgba(255,255,255,0.025)] tracking-[-0.06em] pointer-events-none select-none leading-none">
            {locale === "ro" ? "PROCES" : "PROCESS"}
          </div>
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="flex items-center gap-5 mb-10 md:mb-16">
              <FadeUp><p className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-[var(--lime)]">{tp("label")}</p></FadeUp>
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
              <Link href={`/${locale}/proces`} className="text-[11px] font-extrabold text-[rgba(255,255,255,0.25)] tracking-[0.1em] no-underline">
                {locale === "ro" ? "Detalii →" : "Details →"}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { n: "01", title: tp("p1_title"), desc: tp("p1_desc") },
                { n: "02", title: tp("p2_title"), desc: tp("p2_desc") },
                { n: "03", title: tp("p3_title"), desc: tp("p3_desc") },
              ].map((s, i) => <ProcessCard key={s.n} {...s} delay={i * 120} />)}
            </div>
          </div>
        </section>

        {/* ── BRAND STATEMENT ── */}
       {/* ── BRAND STATEMENT ── */}
        <section className="max-w-[1000px] mx-auto py-16 md:py-24 px-6 md:px-12">
          <FadeUp>
            <div style={{ borderTop:"1px solid rgba(13,13,11,0.07)", paddingTop:56 }}>
              <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"rgba(13,13,11,0.3)", display:"block", marginBottom:28 }}>
                {locale === "ro" ? "Ce construim" : "What we build"}
              </span>
              <p style={{ fontSize:"clamp(20px,2.8vw,36px)", fontWeight:300, letterSpacing:"-0.02em", lineHeight:1.65, color:"var(--black)", margin:0, maxWidth:720 }}>
                {locale === "ro"
                  ? <><span style={{ fontWeight:700 }}>Construim branduri clare</span>, coerente și pregătite să crească — de la strategie și identitate până la produs digital și lansare.</>
                  : <>We build <span style={{ fontWeight:700 }}>clear, coherent brands</span> ready to grow — from strategy and identity to digital product and launch.</>
                }
              </p>
            </div>
          </FadeUp>
        </section>

        {/* ── CTA ── */}
        <section className="pb-10 md:pb-20 px-6 md:px-12">
          <FadeUp>
            <div style={{ backgroundColor:"#0d0d0b", borderRadius:12, padding:"clamp(48px,6vw,80px) clamp(32px,5vw,72px)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", right:-20, bottom:-20, fontSize:"clamp(120px,16vw,200px)", fontWeight:900, color:"rgba(255,255,255,0.03)", letterSpacing:"-0.06em", lineHeight:1, pointerEvents:"none", userSelect:"none" as const }}>81</div>

              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
                  <span style={{ width:5, height:5, borderRadius:"50%", backgroundColor:"#c4f20d", display:"inline-block" }}/>
                  <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.3)" }}>
                    {locale === "ro" ? "Gata să începi?" : "Ready to start?"}
                  </span>
                </div>
                <h2 style={{ fontSize:"clamp(28px,3.5vw,52px)", fontWeight:700, letterSpacing:"-0.04em", lineHeight:1.05, color:"#fff", margin:0 }}>
                  {locale === "ro" ? <>Hai să construim<br/>ceva împreună.</> : <>Let&apos;s build<br/>something together.</>}
                </h2>
              </div>

              <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:20 }}>
                <p style={{ fontSize:14, fontWeight:300, lineHeight:1.8, color:"rgba(255,255,255,0.4)", maxWidth:280, textAlign:"right" as const, margin:0 }}>
                  {locale === "ro"
                    ? "Spune-ne despre proiectul tău și revenim în 24 de ore."
                    : "Tell us about your project and we'll get back within 24 hours."
                  }
                </p>
                <CtaButton href={`/${locale}/incepe-un-proiect`} locale={locale}>
                  {locale === "ro" ? "Începe un proiect →" : "Start a project →"}
                </CtaButton>
              </div>
            </div>
          </FadeUp>
        </section>

      </main>
    </>
  );
}
