"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

const CSS = `
  *, *::before, *::after { box-sizing: border-box; cursor: none !important; }
  @keyframes m81-pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.3; transform:scale(1.5); } }
`;

function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x:0, y:0 });
  const cur  = useRef({ x:0, y:0 });
  const raf  = useRef(0);
  const [lbl, setLbl] = useState("");
  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x:e.clientX, y:e.clientY };
      if (dot.current) { dot.current.style.left=e.clientX+"px"; dot.current.style.top=e.clientY+"px"; }
      const tag = (e.target as HTMLElement).closest("[data-cur]");
      setLbl(tag ? (tag as HTMLElement).dataset.cur||"" : "");
    };
    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1;
      cur.current.y += (pos.current.y - cur.current.y) * 0.1;
      if (ring.current) { ring.current.style.left=cur.current.x+"px"; ring.current.style.top=cur.current.y+"px"; }
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);
  const has = lbl.length > 0;
  return (
    <>
      <div ref={dot}  style={{ position:"fixed",zIndex:99999,pointerEvents:"none",width:7,height:7,borderRadius:"50%",backgroundColor:"#c4f20d",transform:"translate(-50%,-50%)" }}/>
      <div ref={ring} style={{ position:"fixed",zIndex:99998,pointerEvents:"none",width:has?72:32,height:has?72:32,borderRadius:"50%",border:`1.5px solid ${has?"#c4f20d":"rgba(196,242,13,0.4)"}`,backgroundColor:has?"#c4f20d":"transparent",transform:"translate(-50%,-50%)",transition:"width .3s cubic-bezier(.23,1,.32,1),height .3s cubic-bezier(.23,1,.32,1),background-color .25s",display:"flex",alignItems:"center",justifyContent:"center" }}>
        {has && <span style={{ fontSize:8,fontWeight:900,color:"#000",textTransform:"uppercase",letterSpacing:"0.1em",whiteSpace:"nowrap" }}>{lbl}</span>}
      </div>
    </>
  );
}

function FadeUp({ children, delay=0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(28px)", transition:`opacity .9s ease ${delay}ms, transform .9s cubic-bezier(.23,1,.32,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

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

export default function StudioPage() {
  const [ready, setReady] = useState(false);
  const locale = useLocale();
  const isRo = locale === "ro";
  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);

  const stats = isRo
    ? [{ value:"2019", label:"Fondat" },{ value:"48+", label:"Proiecte" },{ value:"12", label:"Industrii" },{ value:"100%", label:"Design system" }]
    : [{ value:"2019", label:"Founded" },{ value:"48+", label:"Projects" },{ value:"12", label:"Industries" },{ value:"100%", label:"Design system" }];

  const principles = isRo
    ? [
        { n:"01", title:"Simplitate", text:"Eliminam complexitatea inutila si pastram doar ce conteaza cu adevarat pentru produs si utilizatori." },
        { n:"02", title:"Structura",  text:"Construim sisteme de design consistente si scalabile, nu solutii one-off care nu pot creste." },
        { n:"03", title:"Evolutie",   text:"Produsele noastre sunt extensibile si adaptabile pe masura ce proiectul si business-ul evolueaza." },
      ]
    : [
        { n:"01", title:"Simplicity", text:"We eliminate unnecessary complexity and keep only what truly matters for the product and users." },
        { n:"02", title:"Structure",  text:"We build consistent, scalable design systems, not one-off solutions that cannot grow." },
        { n:"03", title:"Evolution",  text:"Our products are extensible and adaptable as the project and business evolve." },
      ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>
      <Cursor/>

      <main style={{ fontFamily:"'Manrope','Inter',sans-serif", overflowX:"hidden" }}>

        {/* ════════════════════════════════════════
            HERO — split screen 50/50
        ════════════════════════════════════════ */}
        <section style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", position:"relative" }}>

          {/* LEFT — dark */}
          <div style={{ backgroundColor:"#0d0d0b", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"100px 56px 56px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize:"72px 72px", pointerEvents:"none" }}/>

            {/* badge */}
            <div style={{ position:"relative", zIndex:1, opacity:ready?1:0, transition:"opacity .7s ease 200ms" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", backgroundColor:"#c4f20d", display:"inline-block", animation:"m81-pulse 2s ease-in-out infinite" }}/>
                <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)" }}>
                  {isRo ? "STUDIO INDEPENDENT · BUCURESTI · 2019" : "INDEPENDENT STUDIO · BUCHAREST · 2019"}
                </span>
              </div>
            </div>

            {/* title */}
            <div style={{ position:"relative", zIndex:1 }}>
              {["M81", "STUDIO."].map((line, i) => (
                <div key={i} style={{ overflow:"hidden", lineHeight:.88 }}>
                  <h1 style={{ fontSize:"clamp(56px,8vw,128px)", fontWeight:900, letterSpacing:"-0.055em", margin:0, color:i===0?"#fff":"#c4f20d", transform:ready?"translateY(0)":"translateY(108%)", opacity:ready?1:0, transition:`transform 1.2s cubic-bezier(.16,1,.3,1) ${100+i*160}ms, opacity .6s ease ${100+i*160}ms` }}>{line}</h1>
                </div>
              ))}
              <p style={{ fontSize:14, fontWeight:300, color:"rgba(255,255,255,0.28)", lineHeight:1.8, marginTop:28, maxWidth:320, opacity:ready?1:0, transition:"opacity .9s ease 500ms" }}>
                {isRo
                  ? "Design si dezvoltare digitala. Construim produse clare, functionale si pregatite pentru crestere."
                  : "Digital design and development. We build clear, functional products ready for growth."
                }
              </p>
            </div>

            {/* bottom links */}
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

          {/* RIGHT — light */}
          <div style={{ backgroundColor:"#ededed", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"100px 56px 56px" }}>
            <div style={{ opacity:ready?1:0, transition:"opacity .7s ease 300ms" }}>
              <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(0,0,0,0.25)" }}>
                {isRo ? "DESPRE NOI" : "ABOUT US"}
              </span>
            </div>

            {/* stats 2x2 */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, opacity:ready?1:0, transition:"opacity .9s ease 350ms" }}>
              {stats.map((s, i) => (
                <div key={s.value} style={{ padding:"32px 28px", backgroundColor:i%2===0?"#e2e2e0":"#dadad8", borderRadius:4 }}>
                  <p style={{ fontSize:"clamp(32px,4.5vw,64px)", fontWeight:900, letterSpacing:"-0.05em", color:"#0d0d0b", margin:"0 0 6px", lineHeight:1 }}>{s.value}</p>
                  <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(0,0,0,0.32)", margin:0 }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* manifesto */}
            <div style={{ opacity:ready?1:0, transition:"opacity 1s ease 550ms" }}>
              <p style={{ fontSize:13, lineHeight:1.85, color:"rgba(0,0,0,0.4)", margin:0, fontWeight:300, borderTop:"1px solid rgba(0,0,0,0.07)", paddingTop:24 }}>
                {isRo
                  ? "Nu suntem o agentie care livreaza fisiere. Suntem parteneri care construiesc sisteme, produse si branduri alaturi de clientii nostri."
                  : "We are not an agency that delivers files. We are partners who build systems, products and brands alongside our clients."
                }
              </p>
            </div>
          </div>

          {/* divider */}
          <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, backgroundColor:"rgba(196,242,13,0.1)", pointerEvents:"none" }}/>
        </section>

        {/* ════════════════════════════════════════
            PRINCIPLES — light, horizontal rows
        ════════════════════════════════════════ */}
        <section style={{ backgroundColor:"#ededed", padding:"96px 0", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 56px" }}>
            <FadeUp>
              <div style={{ display:"flex", alignItems:"center", gap:24, marginBottom:56 }}>
                <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"#c4f20d" }}>
                  {isRo ? "Cum gandim" : "How we think"}
                </span>
                <div style={{ flex:1, height:1, backgroundColor:"rgba(0,0,0,0.07)" }}/>
                <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(0,0,0,0.18)" }}>01 — 03</span>
              </div>
            </FadeUp>
            {principles.map((p, i) => <PrincipleRow key={p.n} {...p} index={i}/>)}
            <div style={{ borderTop:"1px solid rgba(0,0,0,0.07)" }}/>
          </div>
        </section>

        {/* ════════════════════════════════════════
            QUOTE — dark, full bleed, large type
        ════════════════════════════════════════ */}
        <section style={{ backgroundColor:"#0d0d0b", padding:"120px 56px" }}>
          <FadeUp>
            <div style={{ maxWidth:1000, margin:"0 auto" }}>
              <p style={{ fontSize:"clamp(24px,4vw,68px)", fontWeight:300, letterSpacing:"-0.03em", color:"#fff", lineHeight:1.2, fontStyle:"italic", margin:"0 0 28px" }}>
                {isRo
                  ? "Nu construim fisiere. Construim produse alaturi de oamenii care le vor folosi."
                  : "We do not build files. We build products alongside the people who will use them."
                }
              </p>
              <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)" }}>— M81 Studio</span>
            </div>
          </FadeUp>
        </section>

        {/* ════════════════════════════════════════
            CTA — studio version: email + link
            fara box verde, minimal
        ════════════════════════════════════════ */}
        <section style={{ backgroundColor:"#ededed", padding:"96px 56px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"end" }}>
            <FadeUp>
              <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(0,0,0,0.28)", marginBottom:20 }}>
                {isRo ? "Vorbim?" : "Shall we talk?"}
              </p>
              <a href="mailto:hello@m81.studio" data-cur="Email"
                style={{ display:"block", fontSize:"clamp(22px,3.5vw,56px)", fontWeight:900, letterSpacing:"-0.04em", color:"#0d0d0b", textDecoration:"none", lineHeight:1, borderBottom:"3px solid #c4f20d", paddingBottom:6, transition:"color .25s ease" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#c4f20d";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="#0d0d0b";}}>
                hello@m81.studio
              </a>
            </FadeUp>

            <FadeUp delay={80}>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <p style={{ fontSize:15, lineHeight:1.8, color:"rgba(0,0,0,0.42)", margin:0, fontWeight:300 }}>
                  {isRo
                    ? "Daca ai un proiect sau o idee, trimite-ne un email sau programeaza un kickoff direct."
                    : "If you have a project or an idea, send us an email or schedule a kickoff directly."
                  }
                </p>
                <Link href={`/${locale}/incepe-un-proiect`} data-cur="Start"
                  style={{ alignSelf:"flex-start", display:"inline-flex", alignItems:"center", gap:10, fontSize:11, fontWeight:900, letterSpacing:"0.18em", textTransform:"uppercase", color:"#0d0d0b", textDecoration:"none", borderBottom:"1px solid rgba(0,0,0,0.18)", paddingBottom:3, transition:"color .2s, border-color .2s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#c4f20d";(e.currentTarget as HTMLElement).style.borderColor="#c4f20d";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="#0d0d0b";(e.currentTarget as HTMLElement).style.borderColor="rgba(0,0,0,0.18)";}}>
                  {isRo ? "Programeaza un kickoff" : "Schedule a kickoff"} {"\u2192"}
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
    </>
  );
}