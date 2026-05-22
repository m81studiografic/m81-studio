import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { CSSProperties } from "react";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const isSalt            = project.slug === "salt";
  const isNordRoast       = project.slug === "nord-roast";
  const isLuneAtelier     = project.slug === "lune-atelier";
  const isOliva           = project.slug === "oliva";
  const isMaisonCroissant = project.slug === "maison-croissant";
  const isCantina         = project.slug === "cantina";

  const saltBase    = "/projects/salt/";
  const nordBase    = "/projects/nord-roast/";
  const luneBase    = "/projects/lune-atelier/";
  const olivaBase   = "/projects/oliva/";
  const maisonBase  = "/projects/maison-croissant/";
  const cantinaBase = "/projects/cantina/";

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const S: Record<string, CSSProperties> = {
    page: {
      backgroundColor: "var(--gray-50)",
      minHeight: "100vh",
      fontFamily: "'Manrope', 'Inter', sans-serif",
      color: "var(--gray-900)",
      paddingTop: 100,
      paddingBottom: 120,
    },
    inner: { maxWidth: 1200, margin: "0 auto", padding: "0 40px" },
    backLink: {
      display: "inline-flex", alignItems: "center", gap: 8,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
      textTransform: "uppercase" as const,
      color: "var(--gray-900)", textDecoration: "none",
      marginBottom: 48, opacity: 0.45,
    },
    displayTitle: {
      fontFamily: "'Manrope', 'Inter', sans-serif",
      fontWeight: 800,
      letterSpacing: "-0.04em",
      lineHeight: 0.95,
      color: "var(--gray-900)",
    },
    pill: {
      fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
      textTransform: "uppercase" as const, color: "#1a1a1a",
      backgroundColor: "var(--lime-400)", display: "inline-block",
      padding: "3px 10px", borderRadius: 999, marginBottom: 20,
    },
    pillNeutral: {
      fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
      textTransform: "uppercase" as const, color: "rgba(0,0,0,0.6)",
      backgroundColor: "rgba(0,0,0,0.07)", display: "inline-block",
      padding: "3px 10px", borderRadius: 999, marginBottom: 20,
    },
    indexNum: {
      fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
      color: "rgba(0,0,0,0.25)", fontFamily: "'Manrope', monospace",
      display: "block", marginBottom: 16,
    },
    bodyLg: {
      fontSize: 18, lineHeight: 1.75,
      color: "rgba(0,0,0,0.6)", margin: 0,
      fontFamily: "'Manrope', sans-serif",
    },
    bodySm: {
      fontSize: 15, lineHeight: 1.8,
      color: "rgba(0,0,0,0.5)", margin: 0,
      fontFamily: "'Manrope', sans-serif",
    },
    tagsRow: { display: "flex", flexWrap: "wrap" as const, gap: 8, marginTop: 28 },
    tag: {
      padding: "5px 14px", borderRadius: 999, fontSize: 11,
      fontWeight: 700, letterSpacing: "0.08em",
      backgroundColor: "rgba(0,0,0,0.06)", color: "var(--gray-900)",
      textTransform: "uppercase" as const,
    },
    divider: { borderBottom: "1px solid rgba(0,0,0,0.08)", margin: "80px 0" },
    imgRound: { width: "100%", borderRadius: 16, display: "block", objectFit: "cover" as const },
    imgWide: { width: "100%", borderRadius: 16, display: "block", objectFit: "cover" as const, aspectRatio: "21/9" },
    imgSquare: { width: "100%", borderRadius: 16, display: "block", objectFit: "cover" as const, aspectRatio: "1/1" },
    quoteSection: {
      maxWidth: 800, margin: "0 auto", textAlign: "center" as const, padding: "0 24px",
    },
    quoteIcon: {
      fontSize: 72, color: "rgba(0,0,0,0.15)", lineHeight: 1,
      marginBottom: 8, fontFamily: "Georgia, serif", display: "block",
    },
    quoteText: {
      fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 500,
      fontStyle: "italic" as const, lineHeight: 1.55,
      color: "rgba(0,0,0,0.65)", margin: "0 0 20px",
    },
    quoteAuthor: {
      fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
      textTransform: "uppercase" as const, color: "rgba(0,0,0,0.35)", margin: 0,
    },
    relatedSection: { marginTop: 100 },
    relatedHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 },
    relatedTitle: { fontSize: 32, fontWeight: 800, margin: 0, fontFamily: "'Manrope', sans-serif", letterSpacing: "-0.04em" },
    relatedAll: { fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(0,0,0,0.4)", textDecoration: "none" },
    relatedGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 },
    relatedCard: { display: "block", textDecoration: "none", color: "inherit" },
    relatedImgWrap: { aspectRatio: "4/3", borderRadius: 16, overflow: "hidden", marginBottom: 16 },
    relatedImg: { width: "100%", height: "100%", objectFit: "cover" as const, display: "block" },
    relatedMeta: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 },
    relatedName: { fontSize: 15, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.01em" },
    relatedCat: { fontSize: 11, color: "rgba(0,0,0,0.4)", margin: 0, textTransform: "uppercase" as const, letterSpacing: "0.1em" },
    relatedYear: { fontSize: 11, fontFamily: "monospace", color: "rgba(0,0,0,0.3)", paddingTop: 2, flexShrink: 0 },
  };

  const RelatedProjects = () => (
    <section style={S.relatedSection}>
      <div style={S.relatedHeader}>
        <h2 style={S.relatedTitle}>Proiecte similare</h2>
        <Link href="/proiecte" style={S.relatedAll}>Vezi toate →</Link>
      </div>
      <div style={S.relatedGrid}>
        {related.map((rp) => (
          <Link key={rp.slug} href={`/proiecte/${rp.slug}`} style={S.relatedCard}>
            <div style={S.relatedImgWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={rp.image} alt={rp.title} style={S.relatedImg} />
            </div>
            <div style={S.relatedMeta}>
              <div>
                <p style={S.relatedName}>{rp.title}</p>
                <p style={S.relatedCat}>{rp.category}</p>
              </div>
              <span style={S.relatedYear}>{rp.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );

  // ── FALLBACK ──
  if (!isSalt && !isNordRoast && !isLuneAtelier && !isOliva && !isMaisonCroissant && !isCantina) {
    const gallery = [project.image, project.image, project.image];
    return (
      <main style={S.page}>
        <div style={S.inner}>
          <Link href="/proiecte" style={S.backLink}>← Înapoi</Link>
          <section style={{ borderRadius: 16, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={project.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" as const, display: "block" }} />
          </section>
          <div style={{ marginTop: 48, maxWidth: 700 }}>
            <span style={S.pill}>{project.category} • {project.year}</span>
            <h1 style={{ ...S.displayTitle, fontSize: "clamp(40px, 6vw, 80px)", margin: "0 0 24px" }}>{project.title}</h1>
            {project.description && <p style={S.bodyLg}>{project.description}</p>}
            <div style={S.tagsRow}>{project.tags.map((t) => <span key={t} style={S.tag}>{t}</span>)}</div>
          </div>
          <section style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[gallery[0], gallery[1]].map((img, i) => (
              <div key={i} style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "1/1" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" as const, display: "block" }} />
              </div>
            ))}
            <div style={{ gridColumn: "1 / -1", borderRadius: 16, overflow: "hidden", aspectRatio: "21/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={gallery[2]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" as const, display: "block" }} />
            </div>
          </section>
          <RelatedProjects />
        </div>
      </main>
    );
  }

  // ── SALT ──
  if (isSalt) {
    return (
      <main style={S.page}>
        <div style={S.inner}>
          <Link href="/proiecte" style={S.backLink}>← Înapoi la proiecte</Link>

          {/* HERO */}
          <section>
            <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 56 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${saltBase}salt-hero.png`} alt="SALT" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" as const, display: "block" }} />
            </div>
            <h1 style={{ ...S.displayTitle, fontSize: "clamp(56px, 9vw, 130px)", margin: "0 0 0 -3px" }}>SALT</h1>
            <div style={{ borderBottom: "1px solid rgba(0,0,0,0.12)", margin: "24px 0 32px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={S.pill}>{project.category}</span>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(0,0,0,0.3)" }}>{project.year}</span>
              </div>
              <p style={{ ...S.bodyLg, maxWidth: 560, textAlign: "right" as const, fontSize: 16 }}>{project.description}</p>
            </div>
            <div style={S.tagsRow}>{project.tags.map((t) => <span key={t} style={S.tag}>{t}</span>)}</div>
          </section>

          <div style={S.divider} />

          {/* 01 BRAND MARK */}
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "center" }}>
              <div>
                <span style={S.indexNum}>01</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Brand<br />Mark</h2>
                <p style={S.bodySm}>Identitatea vizuală porneşte de la o tipografie puternică şi un sistem de forme grafice inspirate de ritmul spațiilor urbane. Logo-ul este construit pentru impact, claritate şi recunoaştere imediată.</p>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${saltBase}salt-logo.png`} alt="Logo" style={S.imgRound} />
              </div>
            </div>
          </section>

          <div style={S.divider} />

          {/* 02 TYPOGRAPHY SYSTEM */}
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 64, alignItems: "center" }}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${saltBase}salt-typography.png`} alt="Typography" style={S.imgRound} />
              </div>
              <div>
                <span style={S.indexNum}>02</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Typography<br />System</h2>
                <p style={S.bodySm}>Sistemul tipografic susține caracterul direct şi contemporan al brandului, folosind contraste clare şi o ierarhie puternică pentru a comunica rapid şi eficient.</p>
              </div>
            </div>
          </section>

          <div style={S.divider} />

          {/* 03 COLOR SYSTEM */}
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>03</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Color<br />System</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 380, textAlign: "right" as const }}>Paleta cromatică este vibrantă şi energică, construită pentru a transmite prospețime, dinamism şi personalitate într-un mod simplu şi recognoscibil.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${saltBase}salt-palette.png`} alt="Color System" style={S.imgWide} />
          </section>

          <div style={S.divider} />

          {/* 04 GRAPHIC ELEMENTS */}
          <section>
            <span style={S.indexNum}>04</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${saltBase}salt-graphics.png`} alt="Graphic Elements" style={S.imgWide} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 40 }}>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(28px, 3.5vw, 48px)", margin: 0 }}>Graphic<br />Elements</h2>
              <p style={S.bodySm}>Elementele grafice completează identitatea şi creează un limbaj vizual flexibil, adaptabil pentru spațiu, materiale print şi medii digitale.</p>
            </div>
          </section>

          <div style={S.divider} />

          {/* 05 PACKAGING */}
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>05</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Packaging</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 380, textAlign: "right" as const }}>Sistemul de packaging transformă brandul într-o experiență tangibilă, păstrând aceeaşi claritate vizuală şi energie în toate materialele takeaway.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${saltBase}salt-packaging.png`} alt="Packaging" style={S.imgWide} />
          </section>

          <div style={S.divider} />

          {/* 06 MENU DESIGN */}
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
              <div>
                <span style={S.indexNum}>06</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Menu<br />Design</h2>
                <p style={S.bodySm}>Meniul este construit cu accent pe lizibilitate şi ritm vizual, folosind tipografia şi sistemul grafic pentru a susține experiența din spațiul restaurantului.</p>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${saltBase}salt-menu.png`} alt="Menu" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
              </div>
            </div>
          </section>

          <div style={S.divider} />

          {/* 07 POSTER DESIGN */}
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>07</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Poster<br />Design</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 360, textAlign: "right" as const }}>Posterele şi materialele promoționale extind identitatea brandului într-o direcție mai expresivă, menținând în acelaşi timp coerența întregului sistem vizual.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${saltBase}salt-posters.png`} alt="Posters" style={S.imgWide} />
          </section>

          <div style={S.divider} />

          {/* 08 WEBSITE DESIGN */}
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 64, alignItems: "center" }}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${saltBase}salt-website.png`} alt="Website" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
              </div>
              <div>
                <span style={S.indexNum}>08</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Website<br />Design</h2>
                <p style={S.bodySm}>Experiența digitală transpune brandul într-o interfață clară şi contemporană, unde informația, ritmul vizual şi structura susțin interacțiunea rapidă.</p>
              </div>
            </div>
          </section>

          <div style={S.divider} />

          {/* 09 MOBILE ORDERING */}
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${saltBase}salt-mobile.png`} alt="Mobile" style={{ width: "72%", borderRadius: 24, display: "block", objectFit: "cover" as const }} />
              </div>
              <div>
                <span style={S.indexNum}>09</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Mobile<br />Ordering</h2>
                <p style={S.bodySm}>Versiunea mobilă este gândită pentru comandă rapidă şi navigare intuitivă, păstrând aceeaşi identitate vizuală clară şi energică.</p>
              </div>
            </div>
          </section>

          <div style={S.divider} />

          {/* QUOTE */}
          <section style={S.quoteSection}>
            <span style={S.quoteIcon}>"</span>
            <p style={S.quoteText}>
              „SALT explorează un limbaj vizual modern şi energic — un brand de restaurant construit pentru comunitate, mâncare bună şi experiențe urbane.”
            </p>
            <p style={S.quoteAuthor}>— M81 Studio</p>
          </section>

          <div style={S.divider} />
          <RelatedProjects />
        </div>
      </main>
    );
  }

  // ── NORD ROAST ──
  if (isNordRoast) {
    return (
      <main style={S.page}>
        <div style={S.inner}>
          <Link href="/proiecte" style={S.backLink}>← Înapoi la proiecte</Link>
          <section>
            <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 56 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${nordBase}nord-roast-hero.png`} alt="Nord Roast" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" as const, display: "block" }} />
            </div>
            <h1 style={{ ...S.displayTitle, fontSize: "clamp(56px, 9vw, 130px)", margin: "0 0 0 -3px" }}>Nord Roast</h1>
            <div style={{ borderBottom: "1px solid rgba(0,0,0,0.12)", margin: "24px 0 32px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={S.pill}>{project.category}</span>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(0,0,0,0.3)" }}>{project.year}</span>
              </div>
              <p style={{ ...S.bodyLg, maxWidth: 560, textAlign: "right" as const, fontSize: 16 }}>Nord Roast este un concept de brand pentru o cafea specialty inspirată de minimalismul nordic şi ritualul cafelei de dimineață.</p>
            </div>
            <div style={S.tagsRow}>{project.tags.map((t) => <span key={t} style={S.tag}>{t}</span>)}</div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "center" }}>
              <div>
                <span style={S.indexNum}>01</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Brand<br />Mark</h2>
                <p style={S.bodySm}>Identitatea vizuală porneşte de la o tipografie elegantă şi un simbol inspirat de orientarea nordică — simplitate şi precizie în fiecare detaliu.</p>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${nordBase}nord-roast-logo.png`} alt="Logo" style={S.imgRound} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>02</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Sistem de<br />Ambalaj</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 380, textAlign: "right" as const }}>Sistemul de ambalaj menține aceeaşi estetică minimalistă şi claritate tipografică pe toate aplicațiile.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${nordBase}nord-roast-packaging.png`} alt="Packaging" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${nordBase}nord-roast-cups.png`} alt="Cups" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <span style={S.indexNum}>03</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${nordBase}nord-roast-cafe.png`} alt="Cafe" style={S.imgWide} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 40 }}>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(28px, 3.5vw, 48px)", margin: 0 }}>Brand<br />în Spațiu</h2>
              <p style={S.bodySm}>Identitatea Nord Roast funcționează coerent şi în spațiul fizic al brandului — de la semnalistică până la atmosfera cafenelei.</p>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>04</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Aplicații<br />Print</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 360, textAlign: "right" as const }}>Elementele tipărite extind identitatea în materiale tangibile, păstrând consistența tipografiei şi a paletei cromatice.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 16 }}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${nordBase}nord-roast-tote.png`} alt="Tote" style={{ ...S.imgRound, aspectRatio: "3/4", objectFit: "cover" as const }} />
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${nordBase}nord-roast-menu.png`} alt="Menu" style={{ ...S.imgRound, aspectRatio: "3/4", objectFit: "cover" as const }} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
              <span style={S.indexNum}>05</span>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 5vw, 72px)", margin: "0 auto" }}>Sistem Vizual</h2>
              <p style={{ ...S.bodySm, maxWidth: 480, margin: "20px auto 0", textAlign: "center" as const }}>Paleta de culori şi sistemul tipografic definesc limbajul vizual al brandului.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${nordBase}nord-roast-palette.png`} alt="Palette" style={S.imgSquare} />
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${nordBase}nord-roast-typography.png`} alt="Typography" style={S.imgSquare} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${nordBase}nord-roast-mobile.png`} alt="Mobile" style={{ width: "72%", borderRadius: 24, display: "block", objectFit: "cover" as const }} />
              </div>
              <div>
                <span style={S.indexNum}>06</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Experiență<br />Digitală</h2>
                <p style={S.bodySm}>Identitatea Nord Roast se extinde în mediul digital, oferind o experiență coerentă între produs, spațiul fizic şi interfata online.</p>
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <RelatedProjects />
        </div>
      </main>
    );
  }

  // ── OLIVA ──
  if (isOliva) {
    return (
      <main style={S.page}>
        <div style={S.inner}>
          <Link href="/proiecte" style={S.backLink}>← Înapoi la proiecte</Link>
          <section>
            <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 56 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${olivaBase}oliva-hero.png`} alt="Oliva" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" as const, display: "block" }} />
            </div>
            <h1 style={{ ...S.displayTitle, fontSize: "clamp(56px, 9vw, 130px)", margin: "0 0 0 -3px" }}>Oliva</h1>
            <div style={{ borderBottom: "1px solid rgba(0,0,0,0.12)", margin: "24px 0 32px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={S.pill}>{project.category}</span>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(0,0,0,0.3)" }}>{project.year}</span>
              </div>
              <p style={{ ...S.bodyLg, maxWidth: 560, textAlign: "right" as const, fontSize: 16 }}>{project.description}</p>
            </div>
            <div style={S.tagsRow}>{project.tags.map((t) => <span key={t} style={S.tag}>{t}</span>)}</div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "center" }}>
              <div>
                <span style={S.indexNum}>01</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Brand<br />Mark</h2>
                <p style={S.bodySm}>Identitatea vizuală porneşte de la un simbol inspirat de măslinul mediteranean — organic, simplu şi recognoscibil.</p>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${olivaBase}oliva-logo.png`} alt="Logo" style={S.imgRound} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>02</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Meniu &amp;<br />Print</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 380, textAlign: "right" as const }}>Materialele tipărite reflectă esența brandului — textură, căldură şi claritate tipografică.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${olivaBase}oliva-menu.png`} alt="Menu" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${olivaBase}oliva-card.png`} alt="Card" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <span style={S.indexNum}>03</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${olivaBase}oliva-interior.png`} alt="Interior" style={S.imgWide} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 40 }}>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(28px, 3.5vw, 48px)", margin: 0 }}>Brand<br />în Spațiu</h2>
              <p style={S.bodySm}>Identitatea Oliva se traduce natural în spațiul restaurantului.</p>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>04</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Semnalistică<br />&amp; Ambalaj</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 360, textAlign: "right" as const }}>Fiecare element fizic al brandului păstrează coerența vizuală mediteraneană.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 16 }}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${olivaBase}oliva-signage.png`} alt="Signage" style={{ ...S.imgRound, aspectRatio: "3/4", objectFit: "cover" as const }} />
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${olivaBase}oliva-food.png`} alt="Food" style={{ ...S.imgRound, aspectRatio: "3/4", objectFit: "cover" as const }} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
              <span style={S.indexNum}>05</span>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 5vw, 72px)", margin: "0 auto" }}>Sistem Vizual</h2>
              <p style={{ ...S.bodySm, maxWidth: 480, margin: "20px auto 0", textAlign: "center" as const }}>Paleta cromatică caldă şi tipografia definesc caracterul mediteranean al brandului.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${olivaBase}oliva-palette.png`} alt="Palette" style={S.imgSquare} />
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${olivaBase}oliva-social.png`} alt="Social" style={S.imgSquare} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${olivaBase}oliva-mobile.png`} alt="Mobile" style={{ width: "72%", borderRadius: 24, display: "block", objectFit: "cover" as const }} />
              </div>
              <div>
                <span style={S.indexNum}>06</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Experiență<br />Digitală</h2>
                <p style={S.bodySm}>Prezența digitală a brandului Oliva continuă aceeaşi direcție vizuală.</p>
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <RelatedProjects />
        </div>
      </main>
    );
  }

  // ── MAISON CROISSANT ──
  if (isMaisonCroissant) {
    return (
      <main style={S.page}>
        <div style={S.inner}>
          <Link href="/proiecte" style={S.backLink}>← Înapoi la proiecte</Link>
          <section>
            <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 56 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${maisonBase}maison-croissant-hero.png`} alt="Maison Croissant" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" as const, display: "block" }} />
            </div>
            <h1 style={{ ...S.displayTitle, fontSize: "clamp(56px, 9vw, 130px)", margin: "0 0 0 -3px" }}>Maison Croissant</h1>
            <div style={{ borderBottom: "1px solid rgba(0,0,0,0.12)", margin: "24px 0 32px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={S.pill}>{project.category}</span>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(0,0,0,0.3)" }}>{project.year}</span>
              </div>
              <p style={{ ...S.bodyLg, maxWidth: 560, textAlign: "right" as const, fontSize: 16 }}>{project.description}</p>
            </div>
            <div style={S.tagsRow}>{project.tags.map((t) => <span key={t} style={S.tag}>{t}</span>)}</div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "center" }}>
              <div>
                <span style={S.indexNum}>01</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Brand<br />Mark</h2>
                <p style={S.bodySm}>Identitatea vizuală porneşte de la o tipografie elegantă şi un simbol inspirat de forma croissantului.</p>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${maisonBase}maison-croissant-logo.png`} alt="Logo" style={S.imgRound} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>02</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Packaging<br />System</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 380, textAlign: "right" as const }}>Sistemul de ambalaje este conceput pentru a evidenția produsul şi identitatea brandului.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${maisonBase}maison-croissant-packaging.png`} alt="Packaging" style={S.imgWide} />
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 64, alignItems: "center" }}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${maisonBase}maison-croissant-bag.png`} alt="Bag" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
              </div>
              <div>
                <span style={S.indexNum}>03</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Takeaway<br />Bag</h2>
                <p style={S.bodySm}>Ambalajele takeaway sunt gândite pentru a păstra aceeaşi eleganță vizuală.</p>
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <span style={S.indexNum}>04</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${maisonBase}maison-croissant-product.png`} alt="Product" style={S.imgWide} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 40 }}>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(28px, 3.5vw, 48px)", margin: 0 }}>Product<br />Presentation</h2>
              <p style={S.bodySm}>Produsele sunt prezentate într-un mod care pune în valoare brandingul şi ambalajele.</p>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>05</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Menu<br />Design</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 360, textAlign: "right" as const }}>Meniul reflectă aceeaşi direcție vizuală minimalistă.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${maisonBase}maison-croissant-menu.png`} alt="Menu" style={S.imgWide} />
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
              <div>
                <span style={S.indexNum}>06</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Signage</h2>
                <p style={S.bodySm}>Semnalistica brandului transmite eleganță şi claritate vizuală.</p>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${maisonBase}maison-croissant-signage.png`} alt="Signage" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>07</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Social<br />Visuals</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 360, textAlign: "right" as const }}>Identitatea vizuală este extinsă şi în mediul digital.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${maisonBase}maison-croissant-social.png`} alt="Social" style={S.imgWide} />
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
              <span style={S.indexNum}>08</span>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 5vw, 72px)", margin: "0 auto" }}>Sistem Vizual</h2>
              <p style={{ ...S.bodySm, maxWidth: 480, margin: "20px auto 0", textAlign: "center" as const }}>Paleta cromatică şi sistemul tipografic definesc limbajul vizual al brandului.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${maisonBase}maison-croissant-palette.png`} alt="Palette" style={S.imgWide} />
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${maisonBase}maison-croissant-mobile.png`} alt="Mobile" style={{ width: "72%", borderRadius: 24, display: "block", objectFit: "cover" as const }} />
              </div>
              <div>
                <span style={S.indexNum}>09</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Experiență<br />Digitală</h2>
                <p style={S.bodySm}>Experiența digitală continuă aceeaşi direcție vizuală.</p>
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <RelatedProjects />
        </div>
      </main>
    );
  }

  // ── CANTINA ──
  if (isCantina) {
    return (
      <main style={S.page}>
        <div style={S.inner}>
          <Link href="/proiecte" style={S.backLink}>← Înapoi la proiecte</Link>
          <section>
            <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 56 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${cantinaBase}cantina-hero.png`} alt="Cantina" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" as const, display: "block" }} />
            </div>
            <h1 style={{ ...S.displayTitle, fontSize: "clamp(56px, 9vw, 130px)", margin: "0 0 0 -3px" }}>Cantina</h1>
            <div style={{ borderBottom: "1px solid rgba(0,0,0,0.12)", margin: "24px 0 32px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={S.pill}>{project.category}</span>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(0,0,0,0.3)" }}>{project.year}</span>
              </div>
              <p style={{ ...S.bodyLg, maxWidth: 560, textAlign: "right" as const, fontSize: 16 }}>{project.description}</p>
            </div>
            <div style={S.tagsRow}>{project.tags.map((t) => <span key={t} style={S.tag}>{t}</span>)}</div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "center" }}>
              <div>
                <span style={S.indexNum}>01</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Brand<br />Mark</h2>
                <p style={S.bodySm}>Identitatea vizuală porneşte de la o tipografie elegantă cu influențe mediteraneene şi un simbol care evocă atmosfera unui wine bar contemporan.</p>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${cantinaBase}cantina-logo.png`} alt="Logo" style={S.imgRound} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>02</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Wine Label<br />Design</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 380, textAlign: "right" as const }}>Etichetele de vin sunt concepute pentru a reflecta caracterul fiecărui vin prin tipografie clară şi ilustrații minimale.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${cantinaBase}cantina-label.png`} alt="Wine Label" style={S.imgWide} />
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 64, alignItems: "center" }}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${cantinaBase}cantina-packaging.png`} alt="Packaging" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
              </div>
              <div>
                <span style={S.indexNum}>03</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Packaging<br />System</h2>
                <p style={S.bodySm}>Sistemul de ambalaje extinde identitatea brandului în materialele fizice.</p>
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>04</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Menu<br />Design</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 360, textAlign: "right" as const }}>Meniul reflectă aceeaşi direcție vizuală — tipografie clară şi layout editorial.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${cantinaBase}cantina-menu.png`} alt="Menu" style={S.imgWide} />
          </section>
          <div style={S.divider} />
          <section>
            <span style={S.indexNum}>05</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${cantinaBase}cantina-signage.png`} alt="Signage" style={S.imgWide} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 40 }}>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(28px, 3.5vw, 48px)", margin: 0 }}>Restaurant<br />Signage</h2>
              <p style={S.bodySm}>Semnalistica brandului traduce identitatea vizuală în spațiul fizic al wine bar-ului.</p>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <span style={S.indexNum}>06</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Social<br />Visuals</h2>
              </div>
              <p style={{ ...S.bodySm, maxWidth: 360, textAlign: "right" as const }}>Sistemul de vizualuri pentru social media menține coerența identității în mediul digital.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${cantinaBase}cantina-social.png`} alt="Social" style={S.imgWide} />
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
              <span style={S.indexNum}>07</span>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 5vw, 72px)", margin: "0 auto" }}>Sistem Vizual</h2>
              <p style={{ ...S.bodySm, maxWidth: 480, margin: "20px auto 0", textAlign: "center" as const }}>Paleta cromatică caldă şi sistemul tipografic definesc limbajul vizual al brandului Cantina.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${cantinaBase}cantina-palette.png`} alt="Palette" style={S.imgWide} />
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
              <div>
                <span style={S.indexNum}>08</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Website<br />Experience</h2>
                <p style={S.bodySm}>Experiența web continuă direcția vizuală a brandului.</p>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${cantinaBase}cantina-website.png`} alt="Website" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${cantinaBase}cantina-mobile.png`} alt="Mobile" style={{ width: "72%", borderRadius: 24, display: "block", objectFit: "cover" as const }} />
              </div>
              <div>
                <span style={S.indexNum}>09</span>
                <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Mobile<br />Reservation</h2>
                <p style={S.bodySm}>Experiența mobilă este optimizată pentru rezervări rapide şi intuitive.</p>
              </div>
            </div>
          </section>
          <div style={S.divider} />
          <section style={S.quoteSection}>
            <span style={S.quoteIcon}>"</span>
            <p style={S.quoteText}>"Cantina explorează o identitate vizuală căldă şi sofisticată — un brand de wine bar construit pentru experiențe sociale şi cultură gastronomică."</p>
            <p style={S.quoteAuthor}>— M81 Studio</p>
          </section>
          <div style={S.divider} />
          <RelatedProjects />
        </div>
      </main>
    );
  }

  // ── LUNÉ ATELIER ──
  return (
    <main style={S.page}>
      <div style={S.inner}>
        <Link href="/proiecte" style={S.backLink}>← Înapoi la proiecte</Link>
        <section>
          <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 56 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${luneBase}lune-atelier-hero.png`} alt="Luné Atelier" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" as const, display: "block" }} />
          </div>
          <h1 style={{ ...S.displayTitle, fontSize: "clamp(56px, 9vw, 130px)", margin: "0 0 0 -3px" }}>Luné Atelier</h1>
          <div style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", margin: "24px 0 32px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={S.pillNeutral}>{project.category}</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(0,0,0,0.3)" }}>{project.year}</span>
            </div>
            <p style={{ ...S.bodyLg, maxWidth: 560, textAlign: "right" as const, fontSize: 16 }}>{project.description}</p>
          </div>
          <div style={S.tagsRow}>{project.tags.map((t) => <span key={t} style={S.tag}>{t}</span>)}</div>
        </section>
        <div style={S.divider} />
        <section>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${luneBase}lune-atelier-logo-system.png`} alt="Logo System" style={S.imgRound} />
            </div>
            <div>
              <span style={S.indexNum}>01</span>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Brand<br />Mark</h2>
              <p style={S.bodySm}>Identitatea vizuală porneşte de la o tipografie elegantă şi un sistem compus pentru a transmite rafinament, calm şi precizie.</p>
            </div>
          </div>
        </section>
        <div style={S.divider} />
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <span style={S.indexNum}>02</span>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Semnalistică<br />Salon</h2>
            </div>
            <p style={{ ...S.bodySm, maxWidth: 380, textAlign: "right" as const }}>Brandul este gândit să funcționeze natural în spațiul fizic al salonului.</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${luneBase}lune-atelier-signage.png`} alt="Signage" style={S.imgWide} />
        </section>
        <div style={S.divider} />
        <section>
          <span style={S.indexNum}>03</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${luneBase}lune-atelier-interior.png`} alt="Interior" style={S.imgWide} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 40 }}>
            <h2 style={{ ...S.displayTitle, fontSize: "clamp(28px, 3.5vw, 48px)", margin: 0 }}>Salon<br />în Spațiu</h2>
            <p style={S.bodySm}>Interiorul traduce identitatea vizuală într-o experiență calmă şi sofisticată.</p>
          </div>
        </section>
        <div style={S.divider} />
        <section>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64, alignItems: "center" }}>
            <div>
              <span style={S.indexNum}>04</span>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(28px, 3.5vw, 48px)", marginBottom: 24 }}>Extensii<br />de Brand</h2>
              <p style={S.bodySm}>Produsele de salon funcționează ca extensii ale identității.</p>
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${luneBase}lune-atelier-products.png`} alt="Products" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
            </div>
          </div>
        </section>
        <div style={S.divider} />
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <span style={S.indexNum}>05</span>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", margin: 0 }}>Aplicații<br />Print</h2>
            </div>
            <p style={{ ...S.bodySm, maxWidth: 360, textAlign: "right" as const }}>Materialele tipărite păstrează aceeaşi coerență vizuală.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${luneBase}lune-atelier-appointment-card.png`} alt="Appointment Card" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${luneBase}lune-atelier-tote.png`} alt="Tote" style={{ ...S.imgRound, aspectRatio: "4/3", objectFit: "cover" as const }} />
            </div>
          </div>
        </section>
        <div style={S.divider} />
        <section>
          <div style={{ textAlign: "center" as const, marginBottom: 48 }}>
            <span style={S.indexNum}>06</span>
            <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 5vw, 72px)", margin: "0 auto" }}>Sistem Vizual</h2>
            <p style={{ ...S.bodySm, maxWidth: 480, margin: "20px auto 0", textAlign: "center" as const }}>Paleta cromatică şi sistemul tipografic definesc limbajul vizual al brandului.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${luneBase}lune-atelier-palette.png`} alt="Palette" style={S.imgSquare} />
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${luneBase}lune-atelier-typography.png`} alt="Typography" style={S.imgSquare} />
            </div>
          </div>
        </section>
        <div style={S.divider} />
        <section>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${luneBase}lune-atelier-mobile.png`} alt="Mobile" style={{ width: "72%", borderRadius: 24, display: "block", objectFit: "cover" as const }} />
            </div>
            <div>
              <span style={S.indexNum}>07</span>
              <h2 style={{ ...S.displayTitle, fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 24 }}>Experiență<br />Digitală</h2>
              <p style={S.bodySm}>Prezența digitală continuă aceeaşi direcție vizuală şi oferă o experiență fluidă pentru booking.</p>
            </div>
          </div>
        </section>
        <div style={S.divider} />
        <section style={S.quoteSection}>
          <span style={S.quoteIcon}>"</span>
          <p style={S.quoteText}>"Luné Atelier explorează un limbaj vizual calm şi rafinat — un brand de beauty construit pentru claritate, feminitate şi experiență premium."</p>
          <p style={S.quoteAuthor}>— M81 Studio</p>
        </section>
        <div style={S.divider} />
        <RelatedProjects />
      </div>
    </main>
  );
}
