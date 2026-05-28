"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

const CSS = `
  *, *::before, *::after { box-sizing: border-box; cursor: none !important; }
  @keyframes m81-pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.3;transform:scale(1.5);} }
  @keyframes m81-ticker { 0%{transform:translateX(0);}100%{transform:translateX(-50%);} }
  @media (max-width: 767px) { *, *::before, *::after { cursor: auto !important; } }
`;

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

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
      <div ref={dot} style={{ position:"fixed",zIndex:99999,pointerEvents:"none",width:7,height:7,borderRadius:"50%",backgroundColor:"#c4f20d",transform:"translate(-50%,-50%)" }}/>
      <div ref={ring} style={{ position:"fixed",zIndex:99998,pointerEvents:"none",width:has?72:32,height:has?72:32,borderRadius:"50%",border:`1.5px solid ${has?"#c4f20d":"rgba(196,242,13,0.4)"}`,backgroundColor:has?"#c4f20d":"transparent",transform:"translate(-50%,-50%)",transition:"width .3s cubic-bezier(.23,1,.32,1),height .3s cubic-bezier(.23,1,.32,1),background-color .25s",display:"flex",alignItems:"center",justifyContent:"center" }}>
        {has && <span style={{ fontSize:8,fontWeight:900,color:"#000",textTransform:"uppercase",letterSpacing:"0.1em",whiteSpace:"nowrap" }}>{lbl}</span>}
      </div>
    </>
  );
}

function FadeUp({ children, delay=0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.04 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transition:`opacity .9s ease ${delay}ms, transform .9s cubic-bezier(.23,1,.32,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow:"hidden", padding:"14px 0", backgroundColor:"#0d0d0b" }}>
      <div style={{ display:"flex", gap:56, whiteSpace:"nowrap", animation:"m81-ticker 28s linear infinite", width:"max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:i%2===0?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.4)" }}>
            {item} <span style={{ margin:"0 8px", color:"rgba(255,255,255,0.2)" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── ServiceRow — expandabil la hover ── */
function ServiceRow({ number, title, description, tags, result, index, ready, isMobile }: {
  number: string; title: string; description: string;
  tags: string[]; result: string; index: number; ready: boolean; isMobile?: boolean;
}) {
  const [hov, setHov] = useState(false);
  const open = hov || isMobile;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderTop: "1px solid rgba(0,0,0,0.07)",
        padding: "0",
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .8s ease ${index*60}ms, transform .8s cubic-bezier(.23,1,.32,1) ${index*60}ms`,
        cursor: "default",
      }}
    >
      {/* riga principala */}
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "40px 1fr auto" : "64px 1fr auto", gap:isMobile?16:24, alignItems:"center", padding:"28px 0" }}>
        <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", color:open?"#0d0d0b":"rgba(0,0,0,0.25)", textTransform:"uppercase", transition:"color .3s" }}>
          {number}
        </span>
        <h2 style={{
          fontSize:"clamp(20px,2.2vw,32px)",
          fontWeight: open ? 700 : 500,
          letterSpacing:"-0.03em",
          color: open ? "#0d0d0b" : "rgba(0,0,0,0.65)",
          margin:0, lineHeight:1.1,
          transition:"color .3s, font-weight .2s",
        }}>{title}</h2>
        <div style={{
          width:32, height:32, borderRadius:"50%",
          border:`1px solid ${open?"#0d0d0b":"rgba(0,0,0,0.15)"}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:13, color:open?"#0d0d0b":"rgba(0,0,0,0.25)",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition:"border-color .3s, color .3s, transform .4s cubic-bezier(.23,1,.32,1)",
          flexShrink:0,
        }}>↗</div>
      </div>

      {/* detali expandabile */}
      <div style={{
        display:"grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition:"grid-template-rows .4s cubic-bezier(.23,1,.32,1)",
        overflow:"hidden",
      }}>
        <div style={{ minHeight:0 }}>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "64px 1fr 1fr", gap:isMobile?16:24, paddingBottom:32, paddingLeft: isMobile ? 56 : 0 }}>
            {!isMobile && <div/>}
            <div>
              <p style={{ fontSize:14, fontWeight:300, lineHeight:1.85, color:"rgba(0,0,0,0.5)", margin:"0 0 20px", maxWidth:420 }}>
                {description}
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ width:20, height:1, backgroundColor:"rgba(0,0,0,0.2)", flexShrink:0 }}/>
                <span style={{ fontSize:12, fontWeight:500, color:"rgba(0,0,0,0.45)", letterSpacing:"-0.01em" }}>{result}</span>
              </div>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, alignContent:"flex-start", paddingTop:2 }}>
              {tags.map(t => (
                <span key={t} style={{ padding:"5px 12px", borderRadius:999, fontSize:10, fontWeight:600, letterSpacing:"0.04em", backgroundColor:"rgba(0,0,0,0.05)", color:"rgba(0,0,0,0.45)" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiciiPage() {
  const [ready, setReady] = useState(false);
  const isMobile = useIsMobile();
  const locale = useLocale();
  const isRo = locale === "ro";
  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);

  const services = isRo ? [
    { number:"01", title:"Strategie de Brand", description:"Înainte de design, înțelegem afacerea, publicul și direcția brandului pentru a construi o identitate clară și autentică.", tags:["Analiză business","Analiză competiție","Public țintă","Poziționare","Tone of voice"], result:"direcție clară pentru brand" },
    { number:"02", title:"Identitate Vizuală", description:"Creăm identități vizuale care reprezintă brandul coerent în online, produse și comunicare.", tags:["Logo design","Tipografie","Paletă cromatică","Elemente grafice","Brand guidelines"], result:"identitate vizuală completă" },
    { number:"03", title:"Packaging & Product Design", description:"Proiectăm ambalaje și produse care reflectă identitatea brandului și creează o experiență coerentă.", tags:["Design ambalaje","Etichete produse","Design cutii","Mockups produs","Design retail"], result:"produse construite coerent" },
    { number:"04", title:"Design Digital (UI/UX)", description:"Construim experiențe digitale ușor de folosit și aliniate cu identitatea brandului.", tags:["UX research","Wireframes","UI design","Prototipuri","Design system"], result:"design complet de website sau aplicație" },
    { number:"05", title:"Dezvoltare Website", description:"Dezvoltăm website-uri rapide, stabile și construite pentru experiența utilizatorului.", tags:["Front-end dev","Integrare CMS","Optimizare","SEO tehnic","Responsive"], result:"website construit complet" },
    { number:"06", title:"Suport & Mentenanță", description:"Un brand evoluează în timp. Oferim suport pentru dezvoltare, actualizare și optimizare continuă.", tags:["Mentenanță website","Actualizări design","Optimizări","Noi funcționalități"], result:"brand construit pentru evoluție" },
  ] : [
    { number:"01", title:"Brand Strategy", description:"Before design, we understand the business, the audience and the brand direction to build a clear and authentic identity.", tags:["Business analysis","Competition analysis","Target audience","Positioning","Tone of voice"], result:"clear direction for the brand" },
    { number:"02", title:"Visual Identity", description:"We create visual identities that represent the brand coherently across online, products and communication.", tags:["Logo design","Typography","Color palette","Graphic elements","Brand guidelines"], result:"complete visual identity" },
    { number:"03", title:"Packaging & Product Design", description:"We design packaging and products that reflect the brand's identity and create a coherent experience.", tags:["Packaging design","Product labels","Box design","Product mockups","Retail design"], result:"products built coherently" },
    { number:"04", title:"Digital Design (UI/UX)", description:"We build digital experiences that are easy to use and aligned with the brand's identity.", tags:["UX research","Wireframes","UI design","Prototypes","Design system"], result:"complete website or app design" },
    { number:"05", title:"Website Development", description:"We develop fast, stable websites built around the user experience.", tags:["Front-end dev","CMS integration","Optimization","Technical SEO","Responsive"], result:"fully built website" },
    { number:"06", title:"Support & Maintenance", description:"A brand evolves over time. We offer support for ongoing development, updates and optimization.", tags:["Website maintenance","Design updates","Optimization","New features"], result:"brand built to evolve" },
  ];

  const tickerItems = isRo
    ? ["Identitate Vizuală","Packaging","UI/UX Design","Brand Strategy","Web Development","Art Direction","Design System","Branding"]
    : ["Visual Identity","Packaging","UI/UX Design","Brand Strategy","Web Development","Art Direction","Design System","Branding"];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>
      <Cursor/>

      <main style={{ backgroundColor:"#ededed", fontFamily:"'Manrope','Inter',sans-serif", color:"#0d0d0b", overflowX:"hidden" }}>

        {/* ════ HERO ════ */}
        <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>

          {/* top bar */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap", padding: isMobile ? "96px 24px 24px" : "100px 56px 40px", borderBottom:"1px solid rgba(0,0,0,0.07)", opacity:ready?1:0, transition:"opacity .7s ease 150ms" }}>
            <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.26em", textTransform:"uppercase", color:"rgba(0,0,0,0.28)" }}>
              {isRo ? "CE FACEM" : "WHAT WE DO"}
            </span>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:5, height:5, borderRadius:"50%", backgroundColor:"#c4f20d", display:"inline-block", animation:"m81-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(0,0,0,0.4)" }}>
                {isRo ? "6 SERVICII" : "6 SERVICES"}
              </span>
            </div>
            <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.26em", textTransform:"uppercase", color:"rgba(0,0,0,0.28)" }}>M81 STUDIO</span>
          </div>

          {/* split */}
          <div style={{ flex:1, display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr" }}>

            {/* LEFT — titlu + descriere + cta */}
            <div style={{ display:"flex", flexDirection:"column", justifyContent:"space-between", gap: isMobile ? 40 : 0, padding: isMobile ? "40px 24px" : "56px 56px 56px", borderRight: isMobile ? "none" : "1px solid rgba(0,0,0,0.07)", borderBottom: isMobile ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
              <div>
                {(isRo ? ["Servicii", "care", "construiesc."] : ["Services", "that", "build."]).map((line, i) => (
                  <div key={i} style={{ overflow:"hidden", lineHeight:.9 }}>
                    <h1 style={{
                      fontSize:"clamp(44px,5.5vw,88px)",
                      fontWeight: i===1 ? 300 : 800,
                      letterSpacing:"-0.05em", margin:0,
                      color: i===1 ? "rgba(0,0,0,0.18)" : "#0d0d0b",
                      fontStyle: i===1 ? "italic" : "normal",
                      transform:ready?"translateY(0)":"translateY(108%)",
                      opacity:ready?1:0,
                      transition:`transform 1.1s cubic-bezier(.16,1,.3,1) ${80+i*140}ms, opacity .6s ease ${80+i*140}ms`,
                    }}>{line}</h1>
                  </div>
                ))}
              </div>

              <div style={{ opacity:ready?1:0, transition:"opacity 1s ease 600ms" }}>
                <p style={{ fontSize:14, fontWeight:300, lineHeight:1.85, color:"rgba(0,0,0,0.42)", margin:"0 0 32px", maxWidth:340 }}>
                  {isRo
                    ? "De la strategie și identitate până la website-uri și lansare — construim tot ce are nevoie un brand pentru a crește coerent."
                    : "From strategy and identity to websites and launch — we build everything a brand needs to grow coherently."
                  }
                </p>
                <Link href={`/${locale}/incepe-un-proiect`} data-cur="Start"
                  style={{ display:"inline-flex", alignItems:"center", gap:12, backgroundColor:"#0d0d0b", color:"#fff", padding:"14px 32px", borderRadius:999, fontSize:12, fontWeight:700, textDecoration:"none", letterSpacing:"0.06em", textTransform:"uppercase", transition:"background-color .25s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor="#c4f20d";(e.currentTarget as HTMLElement).style.color="#000";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor="#0d0d0b";(e.currentTarget as HTMLElement).style.color="#fff";}}>
                  {isRo ? "Începe un proiect" : "Start a project"} →
                </Link>
              </div>
            </div>

            {/* RIGHT — lista expandabila */}
            <div style={{ padding: isMobile ? "40px 24px 48px" : "56px 56px 56px 48px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
              {!isMobile && (
                <div style={{ opacity:ready?1:0, transition:"opacity .5s ease 200ms", marginBottom:8 }}>
                  <span style={{ fontSize:9, fontWeight:600, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(0,0,0,0.22)" }}>
                    {isRo ? "Hover pentru detalii" : "Hover for details"}
                  </span>
                </div>
              )}
              {services.map((s, i) => (
                <ServiceRow key={s.number} {...s} index={i} ready={ready} isMobile={isMobile}/>
              ))}
              <div style={{ borderTop:"1px solid rgba(0,0,0,0.07)" }}/>
            </div>
          </div>
        </section>

        {/* ════ TICKER ════ */}
        <Ticker items={tickerItems}/>

        {/* ════ CTA ════ */}
        <section style={{ backgroundColor:"#0d0d0b", padding: isMobile ? "72px 24px" : "96px 56px" }}>
          <FadeUp>
            <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 36 : 64, alignItems: isMobile ? "start" : "center" }}>
              <div>
                <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:20 }}>
                  {isRo ? "Gata să începi?" : "Ready to start?"}
                </p>
                <h2 style={{ fontSize:"clamp(28px,4vw,56px)", fontWeight:700, letterSpacing:"-0.04em", color:"#fff", lineHeight:1.05, margin:0 }}>
                  {isRo ? <>Hai sa construim<br/>ceva impreuna.</> : <>Let&apos;s build<br/>something together.</>}
                </h2>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:20 }}>
                <p style={{ fontSize:14, fontWeight:300, lineHeight:1.8, color:"rgba(255,255,255,0.4)", maxWidth:280, textAlign:"right", margin:0 }}>
                  {isRo
                    ? "Spune-ne ce construiești."
                    : "Tell us what you're building."
                  }
                </p>
                <Link href={`/${locale}/incepe-un-proiect`} data-cur="Start"
                  style={{ display:"inline-flex", alignItems:"center", gap:12, backgroundColor:"#fff", color:"#0d0d0b", padding:"16px 36px", borderRadius:999, fontSize:13, fontWeight:700, textDecoration:"none", letterSpacing:"0.04em", transition:"background-color .25s, color .25s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor="#c4f20d";(e.currentTarget as HTMLElement).style.color="#000";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor="#fff";(e.currentTarget as HTMLElement).style.color="#0d0d0b";}}>
                  {isRo ? "Începe un proiect" : "Start a project"} →
                </Link>
              </div>
            </div>
          </FadeUp>
        </section>

      </main>
    </>
  );
}