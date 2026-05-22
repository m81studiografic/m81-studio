"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { FadeUp } from "@/app/components/m81-components";

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  @keyframes m81-pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.3; transform:scale(1.5); } }
`;

function PrincipleRow({ n, title, text, index }: { n:string; title:string; text:string; index:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ display:"grid", gridTemplateColumns:"80px 1fr 1.5fr", gap:48, alignItems:"start", borderTop:"1px solid rgba(0,0,0,0.07)", padding:"40px 0", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:`opacity .8s ease ${index*80}ms, transform .8s cubic-bezier(.23,1,.32,1) ${index*80}ms` }}>
      <span style={{ fontSize:"clamp(28px,4vw,52px)", fontWeight:900, letterSpacing:"-0.05em", color:"rgba(0,0,0,0.1)", lineHeight:1 }}>{n}</span>
      <h3 style={{ fontSize:"clamp(18px,1.8vw,28px)", fontWeight:800, letterSpacing:"-0.03em", color:"#0d0d0b", margin:0, lineHeight:1.1 }}>{title}</h3>
      <p style={{ fontSize:15, lineHeight:1.8, color:"rgba(0,0,0,0.45)", margin:0, fontWeight:300 }}>{text}</p>
    </div>
  );
}

function ServiceTile({ label, sub, index, dark }: { label:string; sub:string; index:number; dark?:boolean }) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const bg = hov ? "#c4f20d" : (dark ? "#dadad8" : "#e2e2e0");

  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding:"32px 28px 28px",
        backgroundColor: bg,
        borderRadius:4,
        display:"flex", flexDirection:"column", justifyContent:"space-between", gap:32,
        minHeight:180,
        opacity: vis?1:0,
        transform: vis?"translateY(0)":"translateY(16px)",
        transition: `background-color .25s ease, opacity .7s ease ${index*80}ms, transform .7s cubic-bezier(.23,1,.32,1) ${index*80}ms`,
      }}>
      <span style={{ fontSize:9, fontWeight:900, letterSpacing:"0.22em", textTransform:"uppercase", color: hov?"rgba(0,0,0,0.45)":"rgba(0,0,0,0.3)" }}>
        {"0"+(index+1)}
      </span>
      <div>
        <p style={{ fontSize:"clamp(18px,2vw,26px)", fontWeight:900, letterSpacing:"-0.03em", color:"#0d0d0b", margin:"0 0 6px", lineHeight:1.05 }}>{label}</p>
        <p style={{ fontSize:12, fontWeight:500, color: hov?"rgba(0,0,0,0.5)":"rgba(0,0,0,0.35)", margin:0, letterSpacing:"0.01em" }}>{sub}</p>
      </div>
    </div>
  );
}

export default function StudioPage() {
  const [ready, setReady] = useState(false);
  const locale = useLocale();
  const isRo = locale === "ro";
  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);

  const services = isRo ? [
    { label:"Identitate Vizuală", sub:"Logo, sistem vizual și ghid de brand", dark:false },
    { label:"Packaging",          sub:"Ambalaje și materiale de produs", dark:true },
    { label:"Website & Digital",  sub:"Website-uri și experiențe digitale", dark:false },
    { label:"Direcție Vizuală",   sub:"Concepte și direcții creative", dark:true },
  ] : [
    { label:"Visual Identity",   sub:"Logo, visual system and brand guide", dark:false },
    { label:"Packaging",         sub:"Packaging and product materials", dark:true },
    { label:"Website & Digital", sub:"Websites and digital experiences", dark:false },
    { label:"Visual Direction",  sub:"Concepts and creative directions", dark:true },
  ];

  const principles = isRo
    ? [
        { n:"01", title:"Simplitate", text:"Eliminăm ce este inutil și păstrăm doar ce ajută brandul și utilizatorii." },
        { n:"02", title:"Structură",  text:"Construim sisteme clare și coerente care pot crește odată cu brandul." },
        { n:"03", title:"Evoluție",   text:"Gândim produse și experiențe digitale care pot evolua în timp, nu doar la lansare." },
      ]
    : [
        { n:"01", title:"Simplicity", text:"We strip away what's unnecessary and keep only what helps the brand and its users." },
        { n:"02", title:"Structure",  text:"We build clear, coherent systems that can grow alongside the brand." },
        { n:"03", title:"Evolution",  text:"We design products and digital experiences that can evolve over time, not just at launch." },
      ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>

      <main style={{ fontFamily:"'Manrope','Inter',sans-serif", overflowX:"hidden" }}>

        {/* ════ HERO — split 50/50 ════ */}
        <section style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", position:"relative" }}>

          {/* LEFT — dark */}
          <div style={{ backgroundColor:"#0d0d0b", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"100px 56px 56px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize:"72px 72px", pointerEvents:"none" }}/>

            <div style={{ position:"relative", zIndex:1, opacity:ready?1:0, transition:"opacity .7s ease 200ms" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", backgroundColor:"#c4f20d", display:"inline-block", animation:"m81-pulse 2s ease-in-out infinite" }}/>
                <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)" }}>
                  {isRo ? "STUDIO INDEPENDENT · BUCUREȘTI" : "INDEPENDENT STUDIO · BUCHAREST"}
                </span>
              </div>
            </div>

            <div style={{ position:"relative", zIndex:1 }}>
              {["M81", "STUDIO."].map((line, i) => (
                <div key={i} style={{ overflow:"hidden", lineHeight:.88 }}>
                  <h1 style={{ fontSize:"clamp(56px,8vw,128px)", fontWeight:900, letterSpacing:"-0.055em", margin:0, color:i===0?"#fff":"#c4f20d", transform:ready?"translateY(0)":"translateY(108%)", opacity:ready?1:0, transition:`transform 1.2s cubic-bezier(.16,1,.3,1) ${100+i*160}ms, opacity .6s ease ${100+i*160}ms` }}>{line}</h1>
                </div>
              ))}
              <p style={{ fontSize:14, fontWeight:400, color:"rgba(255,255,255,0.62)", lineHeight:1.8, marginTop:28, maxWidth:320, opacity:ready?1:0, transition:"opacity .9s ease 500ms" }}>
                {isRo
                  ? "Branduri, produse și experiențe digitale construite cu direcție clară și atenție la detalii."
                  : "Brands, products and digital experiences built with clear direction and attention to detail."
                }
              </p>
            </div>

            <div style={{ position:"relative", zIndex:1, display:"flex", gap:28, opacity:ready?1:0, transition:"opacity 1s ease 700ms" }}>
              {[
                { label: isRo?"Proiecte":"Projects", href:`/${locale}/proiecte`, cur:"View" },
                { label: "Contact", href:`/${locale}/contact`, cur:"Talk" },
              ].map(link => (
                <Link key={link.href} href={link.href} data-cur={link.cur}
                  style={{ fontSize:11, fontWeight:800, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", textDecoration:"none", borderBottom:"1px solid rgba(255,255,255,0.08)", paddingBottom:3, transition:"color .2s, border-color .2s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#c4f20d";(e.currentTarget as HTMLElement).style.borderColor="#c4f20d";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.3)";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)";}}>
                  {link.label} {"\u2192"}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT — light, service tiles */}
          <div style={{ backgroundColor:"#ededed", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"100px 56px 56px" }}>
            <div style={{ opacity:ready?1:0, transition:"opacity .7s ease 300ms" }}>
              <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(0,0,0,0.25)" }}>
                {isRo ? "CE FACEM" : "WHAT WE DO"}
              </span>
            </div>

            {/* 2x2 service tiles */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4, opacity:ready?1:0, transition:"opacity .9s ease 350ms" }}>
              {services.map((s, i) => (
                <ServiceTile key={s.label} label={s.label} sub={s.sub} index={i} dark={s.dark} />
              ))}
            </div>

            <div style={{ opacity:ready?1:0, transition:"opacity 1s ease 550ms" }}>
              <p style={{ fontSize:14, lineHeight:1.85, color:"rgba(0,0,0,0.68)", margin:0, fontWeight:400, borderTop:"1px solid rgba(0,0,0,0.07)", paddingTop:24 }}>
                {isRo
                  ? "Construim sisteme, produse și branduri alături de oamenii cu care lucrăm."
                  : "We build systems, products and brands alongside the people we work with."
                }
              </p>
            </div>
          </div>

          <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, backgroundColor:"rgba(196,242,13,0.1)", pointerEvents:"none" }}/>
        </section>

        {/* ════ PRINCIPLES — dark bg, contrast cu hero ════ */}
        <section style={{ backgroundColor:"#0d0d0b", padding:"96px 0" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 56px" }}>
            <FadeUp>
              <div style={{ display:"flex", alignItems:"center", gap:24, marginBottom:56 }}>
                <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"#c4f20d" }}>
                  {isRo ? "Cum gandim" : "How we think"}
                </span>
                <div style={{ flex:1, height:1, backgroundColor:"rgba(255,255,255,0.06)" }}/>
                <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.15)" }}>01 — 03</span>
              </div>
            </FadeUp>
            {principles.map((p, i) => (
              <PrincipleRowDark key={p.n} n={p.n} title={p.title} text={p.text} index={i} />
            ))}
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}/>
          </div>
        </section>

        {/* ════ QUOTE — light, contrast cu dark principles ════ */}
        <section style={{ backgroundColor:"#ededed", padding:"120px 56px" }}>
          <FadeUp>
            <div style={{ maxWidth:1000, margin:"0 auto" }}>
              <p style={{ fontSize:"clamp(24px,4vw,68px)", fontWeight:300, letterSpacing:"-0.03em", color:"#0d0d0b", lineHeight:1.2, fontStyle:"italic", margin:"0 0 28px" }}>
                {isRo
                  ? "Construim branduri care reflectă autentic oamenii și afacerile din spatele lor."
                  : "We build brands that authentically reflect the people and businesses behind them."
                }
              </p>
              <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(0,0,0,0.25)" }}>— M81 Studio</span>
            </div>
          </FadeUp>
        </section>

        {/* ════ CTA — dark, contrast cu quote light ════ */}
        <section style={{ backgroundColor:"#0d0d0b", padding:"96px 56px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"end" }}>
            <FadeUp>
              <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginBottom:20 }}>
                {isRo ? "Vorbim?" : "Shall we talk?"}
              </p>
              <a href="mailto:hello@m81studio.ro" data-cur="Email"
                style={{ display:"block", fontSize:"clamp(22px,3.5vw,56px)", fontWeight:900, letterSpacing:"-0.04em", color:"#fff", textDecoration:"none", lineHeight:1, borderBottom:"3px solid #c4f20d", paddingBottom:6, transition:"color .25s ease" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#c4f20d";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="#fff";}}>
                hello@m81studio.ro
              </a>
            </FadeUp>

            <FadeUp delay={80}>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <p style={{ fontSize:15, lineHeight:1.8, color:"rgba(255,255,255,0.62)", margin:0, fontWeight:400 }}>
                  {isRo
                    ? "Dacă ai o idee sau un proiect, hai să vorbim despre el."
                    : "If you have an idea or a project, let's talk about it."
                  }
                </p>
                <Link href={`/${locale}/incepe-un-proiect`} data-cur="Start"
                  style={{ alignSelf:"flex-start", display:"inline-flex", alignItems:"center", gap:10, fontSize:11, fontWeight:900, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)", textDecoration:"none", borderBottom:"1px solid rgba(255,255,255,0.15)", paddingBottom:3, transition:"color .2s, border-color .2s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#c4f20d";(e.currentTarget as HTMLElement).style.borderColor="#c4f20d";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.5)";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.15)";}}>
                  {isRo ? "Intr\u0103 \u00een contact" : "Get in touch"} {"\u2192"}
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
    </>
  );
}

function PrincipleRowDark({ n, title, text, index }: { n:string; title:string; text:string; index:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ display:"grid", gridTemplateColumns:"80px 1fr 1.5fr", gap:48, alignItems:"start", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"40px 0", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:`opacity .8s ease ${index*80}ms, transform .8s cubic-bezier(.23,1,.32,1) ${index*80}ms` }}>
      <span style={{ fontSize:"clamp(28px,4vw,52px)", fontWeight:900, letterSpacing:"-0.05em", color:"rgba(255,255,255,0.07)", lineHeight:1 }}>{n}</span>
      <h3 style={{ fontSize:"clamp(18px,1.8vw,28px)", fontWeight:800, letterSpacing:"-0.03em", color:"#fff", margin:0, lineHeight:1.1 }}>{title}</h3>
      <p style={{ fontSize:15, lineHeight:1.8, color:"rgba(255,255,255,0.68)", margin:0, fontWeight:400 }}>{text}</p>
    </div>
  );
}
