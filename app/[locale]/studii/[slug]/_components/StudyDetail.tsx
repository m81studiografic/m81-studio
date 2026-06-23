"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, ReactNode } from "react";
import { type Img, type Movement, type Locale, type Study, UI } from "../../_data/studies";

const SECTIONS = ["overview", "research", "vision", "final"] as const;
type SectionId = (typeof SECTIONS)[number];

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `opacity .9s ease ${delay}ms, transform .9s cubic-bezier(.23,1,.32,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function StudyDetail({ study, locale }: { study: Study; locale: Locale }) {
  const tx = (l: { ro: string; en: string }) => l[locale];
  const [active, setActive] = useState<SectionId>("overview");
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 60); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id as SectionId);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const go = (id: SectionId) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  return (
    <main style={{ fontFamily: "'Manrope','Inter',sans-serif", backgroundColor: "#ededed", color: "#0d0d0b", overflowX: "hidden" }}>

      {/* ════ HERO ════ */}
      <header style={{ backgroundColor: "#0d0d0b", color: "#fff", padding: "clamp(130px,16vh,180px) var(--page-px) clamp(48px,7vh,80px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.014) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.014) 1px,transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Link href={`/${locale}/studii`} data-cur={tx(UI.back)}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 48, opacity: ready ? 1 : 0, transition: "opacity .6s ease 80ms" }}>
            ← {tx(UI.back)}
          </Link>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--lime)", margin: "0 0 24px", opacity: ready ? 1 : 0, transition: "opacity .7s ease 200ms" }}>
            {tx(study.meta)}
          </p>
          <h1 style={{ fontSize: "clamp(44px,8vw,108px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.94, margin: 0, transform: ready ? "translateY(0)" : "translateY(36px)", opacity: ready ? 1 : 0, transition: "transform 1.1s cubic-bezier(.16,1,.3,1) 240ms, opacity .8s ease 240ms" }}>
            {study.client}
          </h1>
          <p style={{ fontSize: "clamp(16px,1.8vw,22px)", fontWeight: 500, color: "rgba(255,255,255,0.82)", margin: "26px 0 0", letterSpacing: "-0.01em", opacity: ready ? 1 : 0, transition: "opacity .8s ease 420ms" }}>
            {tx(study.kicker)}
          </p>
          <p style={{ fontSize: "clamp(15px,1.5vw,18px)", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", maxWidth: 620, margin: "20px 0 0", opacity: ready ? 1 : 0, transition: "opacity .9s ease 560ms" }}>
            {tx(study.heroIntro)}
          </p>
        </div>
      </header>

      {/* hero image */}
      <div style={{ backgroundColor: "#0d0d0b", padding: "0 0 clamp(8px,2vw,24px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 var(--page-px)" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: `${study.heroImage.w} / ${study.heroImage.h}`, borderRadius: 6, overflow: "hidden" }}>
            <Image src={study.heroImage.src} alt={study.client} fill priority sizes="(max-width: 1320px) 100vw, 1320px" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>

      {/* ════ STICKY SUB-NAV ════ */}
      <nav style={{ position: "sticky", top: 80, zIndex: 50, backgroundColor: "rgba(237,237,237,0.9)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 var(--page-px)", display: "flex", gap: "clamp(20px,3vw,44px)", overflowX: "auto", scrollbarWidth: "none" }}>
          {SECTIONS.map((id) => {
            const on = active === id;
            return (
              <button key={id} onClick={() => go(id)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "20px 0", fontFamily: "inherit", fontSize: 12, fontWeight: on ? 800 : 600, letterSpacing: "0.04em", whiteSpace: "nowrap", color: on ? "#0d0d0b" : "rgba(0,0,0,0.4)", borderBottom: `2px solid ${on ? "var(--lime-strong, #A3FF12)" : "transparent"}`, marginBottom: -1, transition: "color .25s, border-color .25s, font-weight .25s" }}>
                {tx(UI.nav[id])}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ════ 01 — OVERVIEW ════ */}
      <Section id="overview" label="01" title={tx(UI.navTitles.overview)}>
        <div className="m81-overview-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: "clamp(40px,7vw,96px)", alignItems: "start" }}>
          <div>
            {study.overview.map((para, i) => (
              <p key={i} style={{ fontSize: "clamp(18px,2vw,26px)", lineHeight: 1.6, fontWeight: 300, color: "rgba(0,0,0,0.78)", margin: i === 0 ? "0 0 28px" : 0, letterSpacing: "-0.01em" }}>
                {tx(para)}
              </p>
            ))}
          </div>
          <div>
            <dl style={{ margin: 0 }}>
              {study.facts.map((f, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                  <dt style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", flexShrink: 0 }}>{tx(f.label)}</dt>
                  <dd style={{ fontSize: 14, fontWeight: 600, color: "#0d0d0b", margin: 0, textAlign: "right" }}>{tx(f.value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 1, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.1)", marginTop: 64 }}>
            {study.metrics.map((m, i) => (
              <div key={i} style={{ backgroundColor: "#ededed", padding: "28px 24px" }}>
                <p style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, margin: "0 0 10px", color: "#0d0d0b" }}>
                  {m.value}<span style={{ fontSize: "0.4em", color: "rgba(0,0,0,0.3)", fontWeight: 700 }}> / 10</span>
                </p>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "rgba(0,0,0,0.5)", margin: 0 }}>{tx(m.label)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ════ 02 — RESEARCH STUDY ════ */}
      <Section id="research" label="02" title={tx(UI.navTitles.research)} dark>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(36px,6vh,72px)" }}>
          {study.research.map((m, i) => <Reveal key={i}><MovementView m={m} locale={locale} /></Reveal>)}
        </div>
      </Section>

      {/* ════ 03 — VISION & CONCEPT ════ */}
      <Section id="vision" label="03" title={tx(UI.navTitles.vision)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(48px,8vh,104px)" }}>
          {study.vision.map((m, i) => <Reveal key={i}><MovementView m={m} locale={locale} /></Reveal>)}
        </div>
      </Section>

      {/* ════ 04 — FINAL STATEMENT ════ */}
      <section id="final" style={{ scrollMarginTop: 140, backgroundColor: "#0d0d0b", color: "#fff", padding: "clamp(90px,14vh,160px) var(--page-px)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--lime)", margin: "0 0 56px" }}>
              {tx(UI.navTitles.final)}
            </p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(48px,8vh,80px)" }}>
            {study.final.map((m, i) => <Reveal key={i} delay={i * 40}><MovementView m={m} locale={locale} dark /></Reveal>)}
          </div>
          <Reveal delay={200}>
            <div style={{ marginTop: 64, display: "flex", justifyContent: "center", alignItems: "center", gap: 14 }}>
              <span style={{ width: 28, height: 1, backgroundColor: "rgba(255,255,255,0.2)" }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>M81 Studies</span>
              <span style={{ width: 28, height: 1, backgroundColor: "rgba(255,255,255,0.2)" }} />
            </div>
            <Link href={`/${locale}/studii`} data-cur={tx(UI.back)}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 48, fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 4 }}>
              ← {tx(UI.back)}
            </Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .m81-overview-grid { grid-template-columns: 1fr !important; }
          .m81-split { grid-template-columns: 1fr !important; }
          .m81-ba { grid-template-columns: 1fr !important; }
        }
        nav::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  );
}

/* ── Wrapper de secțiune ── */
function Section({ id, label, title, dark, children }: { id: string; label: string; title: string; dark?: boolean; children: ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 140, backgroundColor: dark ? "#f4f4f2" : "transparent", padding: "clamp(72px,11vh,140px) var(--page-px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: "clamp(44px,7vh,80px)" }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", color: "rgba(0,0,0,0.25)" }}>{label}</span>
            <h2 style={{ fontSize: "clamp(24px,3vw,42px)", fontWeight: 800, letterSpacing: "-0.035em", margin: 0, color: "#0d0d0b" }}>{title}</h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ── Imagine în ramă (concept sau browser pt. captură) ── */
function Frame({ img, alt, browser, priority }: { img: Img; alt: string; browser?: boolean; priority?: boolean }) {
  if (browser) {
    return (
      <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, overflow: "hidden", backgroundColor: "#fff", boxShadow: "0 30px 60px -30px rgba(0,0,0,0.22)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", borderBottom: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#f4f4f2" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c, opacity: 0.85 }} />)}
          <span style={{ marginLeft: 10, fontSize: 10.5, fontWeight: 600, color: "rgba(0,0,0,0.4)" }}>filipandcompany.com</span>
        </div>
        <div style={{ position: "relative", width: "100%", height: "clamp(300px, 42vh, 460px)", overflow: "hidden", backgroundColor: "#fff" }}>
          <Image src={img.src} alt={alt} fill loading="lazy" sizes="(max-width: 1180px) 100vw, 600px" style={{ objectFit: "cover", objectPosition: "top" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 72%, rgba(255,255,255,0.92))", pointerEvents: "none" }} />
        </div>
      </div>
    );
  }
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: `${img.w} / ${img.h}`, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 40px 80px -44px rgba(0,0,0,0.32)", backgroundColor: "#f4f4f2" }}>
      <Image src={img.src} alt={alt} fill loading="lazy" priority={priority} sizes="(max-width: 1180px) 100vw, 1180px" style={{ objectFit: "cover" }} />
    </div>
  );
}

/* ── Render mișcare ── */
function MovementView({ m, locale, dark }: { m: Movement; locale: Locale; dark?: boolean }) {
  const tx = (l: { ro: string; en: string }) => l[locale];
  const ink = dark ? "#fff" : "#0d0d0b";
  const soft = dark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.7)";
  const faint = dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  switch (m.t) {
    case "lead":
      return (
        <p style={{ maxWidth: 760, fontSize: "clamp(20px,2.4vw,30px)", fontWeight: 400, lineHeight: 1.45, letterSpacing: "-0.02em", color: ink, margin: 0, paddingLeft: 24, borderLeft: "3px solid var(--lime-strong, #A3FF12)" }}>
          {tx(m.v)}
        </p>
      );

    case "text":
      return (
        <div style={{ maxWidth: 720 }}>
          {m.heading && <h3 style={{ fontSize: "clamp(20px,2.2vw,28px)", fontWeight: 800, letterSpacing: "-0.03em", color: ink, margin: "0 0 20px" }}>{tx(m.heading)}</h3>}
          {m.body.map((p, i) => (
            <p key={i} style={{ fontSize: 18, lineHeight: 1.8, fontWeight: 300, color: soft, margin: i === 0 ? 0 : "20px 0 0" }}>{tx(p)}</p>
          ))}
        </div>
      );

    case "pull":
      return (
        <p style={{ maxWidth: 900, margin: "0 auto", fontSize: "clamp(24px,3.4vw,42px)", fontWeight: dark ? 300 : 700, fontStyle: dark ? "italic" : "normal", letterSpacing: "-0.03em", lineHeight: 1.3, color: ink, textAlign: "center" }}>
          {dark ? tx(m.v) : `“${tx(m.v)}”`}
        </p>
      );

    case "list":
      return (
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: faint, margin: "0 0 16px" }}>{tx(m.label)}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {m.items.map((it, i) => (
              <span key={i} style={{ fontSize: 14, fontWeight: 500, color: ink, border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.18)"}`, borderRadius: 999, padding: "8px 18px" }}>{tx(it)}</span>
            ))}
          </div>
        </div>
      );

    case "statement":
      return (
        <div style={{ maxWidth: 820, margin: dark ? "0 auto" : 0 }}>
          {m.heading && <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: dark ? "var(--lime)" : faint, margin: "0 0 18px" }}>{tx(m.heading)}</p>}
          <p style={{ fontSize: "clamp(18px,2vw,24px)", lineHeight: 1.6, fontWeight: 400, letterSpacing: "-0.015em", color: ink, margin: 0 }}>{tx(m.v)}</p>
        </div>
      );

    case "split":
      return (
        <div className="m81-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px,4vw,64px)", alignItems: "center", maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ order: m.flip ? 2 : 1 }}>
            {m.label && <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: faint, margin: "0 0 14px" }}>{tx(m.label)}</p>}
            {m.heading && <h3 style={{ fontSize: "clamp(22px,2.6vw,34px)", fontWeight: 800, letterSpacing: "-0.035em", color: ink, margin: "0 0 20px", lineHeight: 1.1 }}>{tx(m.heading)}</h3>}
            {m.body.map((p, i) => (
              <p key={i} style={{ fontSize: 16.5, lineHeight: 1.75, fontWeight: 300, color: soft, margin: i === 0 ? 0 : "16px 0 0" }}>{tx(p)}</p>
            ))}
          </div>
          <div style={{ order: m.flip ? 1 : 2 }}>
            <Frame img={m.img} alt={m.heading ? tx(m.heading) : ""} browser={m.frame === "browser"} />
            {m.caption && <p style={{ fontSize: 12.5, lineHeight: 1.6, color: faint, margin: "14px 0 0" }}>{tx(m.caption)}</p>}
          </div>
        </div>
      );

    case "full":
      return (
        <figure style={{ margin: 0, maxWidth: m.img.w > m.img.h ? 1180 : 940, marginLeft: "auto", marginRight: "auto", width: "100%" }}>
          <Frame img={m.img} alt={m.title ? tx(m.title) : ""} />
          {(m.label || m.title || m.caption) && (
            <figcaption style={{ marginTop: 18, textAlign: "center", maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
              {m.label && <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: faint, margin: "0 0 8px" }}>{tx(m.label)}</p>}
              {m.title && <p style={{ fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 800, letterSpacing: "-0.02em", color: ink, margin: "0 0 6px" }}>{tx(m.title)}</p>}
              {m.caption && <p style={{ fontSize: 14, lineHeight: 1.6, color: soft, fontWeight: 400, margin: 0 }}>{tx(m.caption)}</p>}
            </figcaption>
          )}
        </figure>
      );

    case "beforeAfter":
      return (
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          {(m.heading || m.body) && (
            <div style={{ maxWidth: 720, margin: "0 0 36px" }}>
              {m.heading && <h3 style={{ fontSize: "clamp(22px,2.6vw,34px)", fontWeight: 800, letterSpacing: "-0.035em", color: ink, margin: "0 0 16px" }}>{tx(m.heading)}</h3>}
              {m.body?.map((p, i) => <p key={i} style={{ fontSize: 16.5, lineHeight: 1.75, fontWeight: 300, color: soft, margin: i === 0 ? 0 : "14px 0 0" }}>{tx(p)}</p>)}
            </div>
          )}
          <div className="m81-ba" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(20px,3vw,40px)", alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: faint, margin: "0 0 12px" }}>{tx(m.beforeLabel)}</p>
              <Frame img={m.before} alt={tx(m.beforeLabel)} browser />
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--lime-strong, #A3FF12)", margin: "0 0 12px" }}>{tx(m.afterLabel)} →</p>
              <Frame img={m.after} alt={tx(m.afterLabel)} />
            </div>
          </div>
        </div>
      );

    case "principles":
      return (
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, margin: "0 0 40px" }}>
            <h3 style={{ fontSize: "clamp(22px,2.6vw,34px)", fontWeight: 800, letterSpacing: "-0.035em", color: ink, margin: "0 0 16px" }}>{tx(m.heading)}</h3>
            {m.lead && <p style={{ fontSize: 17, lineHeight: 1.7, fontWeight: 300, color: soft, margin: 0 }}>{tx(m.lead)}</p>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.1)" }}>
            {m.items.map((it, i) => (
              <div key={i} style={{ backgroundColor: "#ededed", padding: "28px 26px" }}>
                <p style={{ fontSize: 13, fontWeight: 900, letterSpacing: "0.04em", textTransform: "uppercase", color: "#0d0d0b", margin: "0 0 12px" }}>{tx(it.k)}</p>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, fontWeight: 300, color: "rgba(0,0,0,0.6)", margin: 0 }}>{tx(it.v)}</p>
              </div>
            ))}
          </div>
          {m.close && (
            <p style={{ fontSize: "clamp(18px,2.2vw,28px)", fontWeight: 800, letterSpacing: "-0.03em", color: ink, textAlign: "center", margin: "44px 0 0", lineHeight: 1.3 }}>{tx(m.close)}</p>
          )}
        </div>
      );
  }
}
