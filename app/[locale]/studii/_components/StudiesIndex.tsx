"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, ReactNode } from "react";
import { type Img, type Locale, STUDY_CARDS, UI } from "../_data/studies";

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity .9s ease ${delay}ms, transform .9s cubic-bezier(.23,1,.32,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function StudiesIndex({ locale }: { locale: Locale }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 60); return () => clearTimeout(t); }, []);
  const tx = (l: { ro: string; en: string }) => l[locale];

  return (
    <main style={{ fontFamily: "'Manrope','Inter',sans-serif", backgroundColor: "#ededed", color: "#0d0d0b", minHeight: "100vh" }}>

      {/* ════ HERO ════ */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(140px,18vh,200px) var(--page-px) clamp(64px,9vh,110px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, opacity: ready ? 1 : 0, transition: "opacity .7s ease 100ms" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--lime)" }} />
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)" }}>
            {tx(UI.collectionLabel)}
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(64px,12vw,168px)", fontWeight: 900, letterSpacing: "-0.055em", lineHeight: 0.92, margin: 0, transform: ready ? "translateY(0)" : "translateY(40px)", opacity: ready ? 1 : 0, transition: "transform 1.1s cubic-bezier(.16,1,.3,1) 120ms, opacity .8s ease 120ms" }}>
          {tx(UI.sectionTitle)}
        </h1>

        <p style={{ fontSize: "clamp(17px,1.7vw,22px)", lineHeight: 1.65, fontWeight: 300, color: "rgba(0,0,0,0.6)", maxWidth: 620, marginTop: 36, opacity: ready ? 1 : 0, transition: "opacity .9s ease 360ms" }}>
          {tx(UI.heroDesc)}
        </p>
      </section>

      {/* ════ LISTA STUDII ════ */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "0 var(--page-px) clamp(80px,12vh,160px)" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)" }}>
              {tx(UI.available)}
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: "rgba(0,0,0,0.1)" }} />
          </div>
        </Reveal>

        {STUDY_CARDS.map((s, i) => {
          const comingSoon = s.status === "coming-soon";
          return (
            <Reveal key={s.number} delay={i * 90}>
              {comingSoon ? (
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,80px) 1fr auto", gap: "clamp(20px,4vw,64px)", alignItems: "center", borderTop: "1px solid rgba(0,0,0,0.1)", padding: "clamp(32px,5vw,52px) 0", opacity: 0.42 }}>
                  <span style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-0.05em", color: "rgba(0,0,0,0.18)", lineHeight: 1 }}>{s.number}</span>
                  <span style={{ fontSize: "clamp(20px,2.6vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", color: "rgba(0,0,0,0.35)" }}>
                    {locale === "ro" ? `Studiul ${s.number}` : `Study ${s.number}`}
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,0,0,0.18)", borderRadius: 999, padding: "7px 16px", whiteSpace: "nowrap" }}>
                    {tx(UI.comingSoon)}
                  </span>
                </div>
              ) : (
                <StudyRow locale={locale} number={s.number} slug={s.slug} client={s.client} meta={tx(s.meta)} kicker={tx(s.kicker)} excerpt={tx(s.excerpt)} cta={tx(UI.readStudy)} cover={s.cover} />
              )}
            </Reveal>
          );
        })}

        <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }} />

        <Reveal>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(0,0,0,0.4)", fontWeight: 400, marginTop: 40, maxWidth: 460 }}>
            {tx(UI.growing)}
          </p>
        </Reveal>
      </section>
    </main>
  );
}

function StudyRow({ locale, number, slug, client, meta, kicker, excerpt, cta, cover }: {
  locale: Locale; number: string; slug: string; client: string; meta: string; kicker: string; excerpt: string; cta: string; cover?: Img;
}) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/${locale}/studii/${slug}`} data-cur={cta}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "block", textDecoration: "none", color: "inherit", borderTop: "1px solid rgba(0,0,0,0.12)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,80px) 1fr", gap: "clamp(20px,4vw,64px)", alignItems: "start", padding: "clamp(36px,5vw,64px) 0", transition: "padding-left .4s cubic-bezier(.23,1,.32,1)", paddingLeft: hov ? 12 : 0 }}>
        <span style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-0.05em", color: hov ? "var(--lime-strong, #A3FF12)" : "rgba(0,0,0,0.16)", lineHeight: 1, transition: "color .35s ease" }}>{number}</span>

        <div>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", margin: "0 0 14px" }}>{meta}</p>

          <h2 style={{ fontSize: "clamp(30px,4.4vw,58px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.02, margin: "0 0 16px", color: "#0d0d0b" }}>{client}</h2>

          <p style={{ fontSize: "clamp(15px,1.5vw,18px)", fontWeight: 500, color: "rgba(0,0,0,0.62)", margin: "0 0 8px", letterSpacing: "-0.01em" }}>{kicker}</p>

          <p style={{ fontSize: 15, lineHeight: 1.75, fontWeight: 300, color: "rgba(0,0,0,0.5)", margin: "0 0 28px", maxWidth: 620 }}>{excerpt}</p>

          {cover && (
            <div style={{ position: "relative", width: "100%", maxWidth: 680, aspectRatio: `${cover.w} / ${cover.h}`, borderRadius: 6, overflow: "hidden", margin: "0 0 28px", filter: hov ? "none" : "saturate(0.92)", transition: "filter .4s ease" }}>
              <Image src={cover.src} alt={client} fill sizes="(max-width: 720px) 100vw, 680px" style={{ objectFit: "cover", transform: hov ? "scale(1.02)" : "scale(1)", transition: "transform .6s cubic-bezier(.23,1,.32,1)" }} />
            </div>
          )}

          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: hov ? "#0d0d0b" : "rgba(0,0,0,0.55)", borderBottom: `1px solid ${hov ? "#0d0d0b" : "rgba(0,0,0,0.2)"}`, paddingBottom: 4, transition: "color .25s, border-color .25s" }}>
            {cta}
            <span style={{ display: "inline-block", transform: hov ? "translateX(5px)" : "translateX(0)", transition: "transform .3s ease" }}>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
