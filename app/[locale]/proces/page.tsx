"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const CSS = `
  *, *::before, *::after { box-sizing: border-box; cursor: none !important; }
  @keyframes m81-pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.3; transform:scale(1.5); } }
  @keyframes m81-float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
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

/* ── Cursor ── */
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

/* ── FadeUp ── */
function FadeUp({ children, delay=0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(32px)", transition:`opacity .9s ease ${delay}ms, transform .9s cubic-bezier(.23,1,.32,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Step row ── */
function StepRow({ number, phase, title, description, activities, activitiesLabel, last, active, dimmed, onEnter, onLeave, vis, isMobile }: {
  number:string; phase:string; title:string; description:string;
  activities:string[]; activitiesLabel:string; last:boolean;
  active:boolean; dimmed:boolean;
  onEnter:()=>void; onLeave:()=>void;
  vis:boolean; isMobile?:boolean;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position:"relative",
        borderTop:"1px solid rgba(255,255,255,0.06)",
        padding: isMobile ? "40px 0" : "72px 0",
        opacity: !vis ? 0 : dimmed ? 0.12 : 1,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition:"opacity .4s ease, transform .9s cubic-bezier(.23,1,.32,1)",
        cursor:"default",
      }}>

      {/* giant background number — only show when active */}
      <span style={{
        position:"absolute", left:0, top:"50%", transform:"translateY(-50%)",
        fontSize:"clamp(120px,18vw,260px)", fontWeight:900, lineHeight:1,
        color: active ? "rgba(196,242,13,0.06)" : "rgba(255,255,255,0.02)",
        letterSpacing:"-0.06em", pointerEvents:"none", userSelect:"none", zIndex:0,
        transition:"color .4s ease",
      }}>
        {number}
      </span>

      <div style={{ position:"relative", zIndex:1, display:"grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr 1fr", gap: isMobile ? 24 : 48, alignItems:"start" }}>

        {/* left: number + phase */}
        <div>
          <span style={{
            display:"block", fontSize:"clamp(40px,5vw,72px)", fontWeight:900,
            letterSpacing:"-0.05em", lineHeight:1, marginBottom:12,
            color: active ? "#c4f20d" : "rgba(196,242,13,0.4)",
            transition:"color .4s ease",
          }}>{number}</span>
          <span style={{
            fontSize:10, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase",
            color: active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
            transition:"color .4s ease",
          }}>{phase}</span>
        </div>

        {/* middle: title + desc */}
        <div>
          <h3 style={{
            fontSize:"clamp(20px,2.2vw,32px)", fontWeight:800, letterSpacing:"-0.03em",
            lineHeight:1.15, margin:"0 0 20px",
            color: active ? "#fff" : "rgba(255,255,255,0.7)",
            transition:"color .4s ease",
          }}>{title}</h3>
          <p style={{
            fontSize:15, lineHeight:1.85, margin:0, fontWeight:300,
            color: active ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.28)",
            transition:"color .4s ease",
          }}>{description}</p>
        </div>

        {/* right: activities */}
        <div style={{ paddingTop:8 }}>
          <span style={{
            fontSize:10, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase",
            display:"block", marginBottom:20,
            color: active ? "rgba(196,242,13,0.8)" : "rgba(196,242,13,0.3)",
            transition:"color .4s ease",
          }}>{activitiesLabel}</span>
          <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:12 }}>
            {activities.map(act => (
              <li key={act} style={{ display:"flex", alignItems:"center", gap:12, fontSize:13, fontWeight:600,
                color: active ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                transition:"color .4s ease",
              }}>
                <span style={{
                  width:5, height:5, borderRadius:"50%", flexShrink:0,
                  backgroundColor: active ? "#c4f20d" : "rgba(196,242,13,0.3)",
                  transition:"background-color .4s ease",
                }}/>
                {act}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* border highlight on active */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:1,
        backgroundColor: active ? "rgba(196,242,13,0.35)" : "transparent",
        transition:"background-color .4s ease",
      }}/>

      {!last && (
        <div style={{ position:"absolute", left:88, bottom:-40, width:1, height:80, background:"linear-gradient(to bottom, rgba(196,242,13,0.2), transparent)", zIndex:1 }}/>
      )}
    </div>
  );
}

/* ── Page ── */
export default function ProcesPage() {
  const [ready, setReady] = useState(false);
  const [visMap, setVisMap] = useState<boolean[]>(Array(8).fill(false));
  const [activeStep, setActiveStep] = useState<number|null>(null);
  const isMobile = useIsMobile();
  const locale = useLocale();
  const tc = useTranslations("cta");
  const isRo = locale === "ro";
  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);

  // staggered scroll reveal per row
  const rowRefs = useRef<(HTMLDivElement|null)[]>([]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisMap(prev => { const n=[...prev]; n[i]=true; return n; }), i * 60);
          obs.disconnect();
        }
      }, { threshold:0.05 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const steps = isRo ? [
    { number:"01", phase:"Etapa 1", title:"Începem cu o conversație", description:"Începem prin a înțelege afacerea, obiectivele și contextul în care brandul va crește.", activities:["Discuție inițială","Clarificarea obiectivelor","Înțelegerea contextului","Definirea direcției"] },
    { number:"02", phase:"Etapa 2", title:"Definim direcția", description:"Stabilim direcția brandului și baza tuturor deciziilor creative și strategice.", activities:["Strategie de brand","Poziționare","Valori & personalitate","Brief creativ"] },
    { number:"03", phase:"Etapa 3", title:"Explorăm ideile", description:"Explorăm direcții vizuale și construim primele elemente ale identității brandului.", activities:["Moodboard","Direcții vizuale","Tipografie","Paletă cromatică"] },
    { number:"04", phase:"Etapa 4", title:"Construim identitatea", description:"Construim identitatea vizuală și sistemul care va susține brandul în toate mediile de comunicare.", activities:["Logo & variante","Sistem vizual","Ghid de brand","Aplicații primare"] },
    { number:"05", phase:"Etapa 5", title:"Extindem brandul", description:"Aplicăm identitatea brandului în produse, materiale și experiențe digitale reale.", activities:["Packaging","Materiale print","Assets digitale","Aplicații secundare"] },
    { number:"06", phase:"Etapa 6", title:"Construim website-ul", description:"Transformăm identitatea brandului într-un website clar, rapid și ușor de folosit.", activities:["Design UI","Dezvoltare","Optimizare","Testare"] },
    { number:"07", phase:"Etapa 7", title:"Lansăm", description:"Pregătim brandul și website-ul pentru lansare și verificăm fiecare detaliu înainte de publicare.", activities:["Verificare finală","Deploy","Lansare publică","Monitorizare inițială"] },
    { number:"08", phase:"Etapa 8", title:"Evoluăm", description:"După lansare, continuăm să dezvoltăm, optimizăm și adaptăm brandul în timp.", activities:["Suport post-lansare","Optimizări","Actualizări","Dezvoltare continuă"] },
  ] : [
    { number:"01", phase:"Stage 1", title:"We start with a conversation", description:"We start by understanding the business, the goals, and the context in which the brand will grow.", activities:["Initial discussion","Clarifying objectives","Understanding context","Defining direction"] },
    { number:"02", phase:"Stage 2", title:"We define the direction", description:"We set the brand's direction and the foundation for every creative and strategic decision.", activities:["Brand strategy","Positioning","Values & personality","Creative brief"] },
    { number:"03", phase:"Stage 3", title:"We explore ideas", description:"We explore visual directions and build the first elements of the brand's identity.", activities:["Moodboard","Visual directions","Typography","Color palette"] },
    { number:"04", phase:"Stage 4", title:"We build the identity", description:"We build the visual identity and the system that will support the brand across every channel.", activities:["Logo & variants","Visual system","Brand guidelines","Primary applications"] },
    { number:"05", phase:"Stage 5", title:"We extend the brand", description:"We apply the brand identity to real products, materials and digital experiences.", activities:["Packaging","Print materials","Digital assets","Secondary applications"] },
    { number:"06", phase:"Stage 6", title:"We build the website", description:"We turn the brand identity into a clear, fast and easy-to-use website.", activities:["UI design","Development","Optimization","Testing"] },
    { number:"07", phase:"Stage 7", title:"We launch", description:"We prepare the brand and the website for launch and check every detail before going public.", activities:["Final review","Deploy","Public launch","Initial monitoring"] },
    { number:"08", phase:"Stage 8", title:"We evolve", description:"After launch, we keep developing, optimizing and adapting the brand over time.", activities:["Post-launch support","Optimizations","Updates","Continuous development"] },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>
      <Cursor/>

      <main style={{ backgroundColor:"#0d0d0b", fontFamily:"'Manrope','Inter',sans-serif", color:"#fff", overflowX:"hidden" }}>

        {/* ════ HERO ════ */}
        <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", right:80, top:"15%", width:480, height:480, borderRadius:"50%", border:"1px solid rgba(196,242,13,0.04)", animation:"m81-float 12s ease-in-out infinite", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", right:160, top:"25%", width:280, height:280, borderRadius:"50%", border:"1px solid rgba(196,242,13,0.06)", animation:"m81-float 12s ease-in-out infinite 4s", pointerEvents:"none" }}/>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap", padding: isMobile ? "96px 24px 24px" : "100px 64px 40px", borderBottom:"1px solid rgba(255,255,255,0.05)", opacity:ready?1:0, transition:"opacity .7s ease 150ms" }}>
            <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.26em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)" }}>{isRo?"CUM LUCRAM":"HOW WE WORK"}</span>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:5, height:5, borderRadius:"50%", backgroundColor:"#c4f20d", display:"inline-block", animation:"m81-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", color:"#c4f20d" }}>{isRo?"8 ETAPE":"8 STAGES"}</span>
            </div>
            <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.26em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)" }}>M81 STUDIO</span>
          </div>

          <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding: isMobile ? "48px 24px" : "0 64px", position:"relative", zIndex:1 }}>
            {(isRo?["Procesul","nostru,","simplu."]:["Our","process,","simple."]).map((line,i) => (
              <div key={i} style={{ overflow:"hidden", lineHeight:.9 }}>
                <h1 style={{ fontSize:"clamp(56px,11vw,176px)", fontWeight:900, letterSpacing:"-0.055em", margin:0, color:i===2?"#c4f20d":i===1?"rgba(255,255,255,0.18)":"#fff", fontStyle:i===1?"italic":"normal", transform:ready?"translateY(0)":"translateY(108%)", opacity:ready?1:0, transition:`transform 1.2s cubic-bezier(.16,1,.3,1) ${80+i*160}ms, opacity .6s ease ${80+i*160}ms` }}>{line}</h1>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", padding: isMobile ? "32px 24px 40px" : "36px 64px 52px", borderTop:"1px solid rgba(255,255,255,0.05)", opacity:ready?1:0, transition:"opacity 1s ease 700ms", flexWrap:"wrap", gap:32 }}>
            <p style={{ fontSize:14, fontWeight:300, color:"rgba(255,255,255,0.32)", maxWidth:400, lineHeight:1.8, margin:0 }}>
              {isRo?"Construim fiecare proiect printr-un proces clar, colaborativ \u0219i atent \u2014 de la idee p\u00e2n\u0103 la lansare.":"We build every project through a clear, collaborative and considered process \u2014 from idea to launch."}
            </p>
            <div style={{ display:"flex", gap:48, alignItems:"center" }}>
              {["8","48+","1:1"].map((val,i) => (
                <div key={i} style={{ textAlign:"center" }}>
                  <p style={{ fontSize:"clamp(24px,3vw,40px)", fontWeight:900, letterSpacing:"-0.04em", color:"#fff", margin:"0 0 4px", lineHeight:1 }}>{val}</p>
                  <p style={{ fontSize:9, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", margin:0 }}>
                    {i===0?(isRo?"etape":"stages"):i===1?(isRo?"concepte":"concepts"):(isRo?"colaborare":"collaboration")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════ STEPS ════ */}
        <section style={{ maxWidth:1200, margin:"0 auto", padding: isMobile ? "24px 24px 64px" : "40px 64px 80px" }}>
          <FadeUp>
            <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:0 }}>
              <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)" }}>{isRo?"Etapele colaborarii":"Collaboration stages"}</span>
              <div style={{ flex:1, height:1, backgroundColor:"rgba(255,255,255,0.05)" }}/>
              <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.15)" }}>01 \u2014 08</span>
            </div>
          </FadeUp>

          {/* hint text */}
          {!isMobile && (
            <p style={{ fontSize:12, fontWeight:400, color:"rgba(255,255,255,0.2)", margin:"24px 0 0", letterSpacing:"0.02em" }}>
              {isRo ? "Trece cu mouse-ul peste o etapă pentru detalii." : "Hover over a stage for details."}
            </p>
          )}

          <div>
            {steps.map((step, i) => (
              <div key={step.number} ref={el => { rowRefs.current[i] = el; }}>
                <StepRow
                  {...step}
                  activitiesLabel={isRo?"Activități":"Activities"}
                  last={i === steps.length - 1}
                  active={activeStep === i}
                  dimmed={activeStep !== null && activeStep !== i}
                  onEnter={() => setActiveStep(i)}
                  onLeave={() => setActiveStep(null)}
                  vis={visMap[i]}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ════ LIGHT INTERLUDE ════ */}
        <section style={{ backgroundColor:"#ededed", padding: isMobile ? "64px 24px" : "80px 64px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems:"center" }}>
            <FadeUp>
              <h2 style={{ fontSize:"clamp(32px,4vw,64px)", fontWeight:900, letterSpacing:"-0.045em", color:"#0d0d0b", lineHeight:.95, margin:0 }}>
                {isRo
                  ? <><span>{"Claritate"}</span><br/><span style={{ color:"rgba(0,0,0,0.2)", fontStyle:"italic" }}>{"în fiecare etapă."}</span></>
                  : <><span>{"Clarity"}</span><br/><span style={{ color:"rgba(0,0,0,0.2)", fontStyle:"italic" }}>{"at every stage."}</span></>
                }
              </h2>
            </FadeUp>
            <FadeUp delay={80}>
              <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
                {(isRo
                  ? ["Vezi exact cum evoluează proiectul de la idee la lansare.","Lucrăm direct cu tine, fără filtre sau procese inutile.","Fiecare etapă contribuie la construcția brandului tău."]
                  : ["See exactly how the project evolves from idea to launch.","We work directly with you, without filters or unnecessary processes.","Every stage contributes to building your brand."]
                ).map((text,i) => (
                  <div key={i} style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                    <span style={{ width:5, height:5, borderRadius:"50%", backgroundColor:"#c4f20d", flexShrink:0, marginTop:8 }}/>
                    <p style={{ fontSize:15, lineHeight:1.75, color:"rgba(0,0,0,0.5)", margin:0, fontWeight:300 }}>{text}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ════ CTA ════ */}
        <section style={{ backgroundColor:"#0d0d0b", padding: isMobile ? "80px 24px" : "120px 64px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <FadeUp>
              <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.22)", marginBottom:32 }}>{tc("ready")}</p>
            </FadeUp>
            <FadeUp delay={60}>
              <h2 style={{ fontSize:"clamp(40px,7vw,110px)", fontWeight:900, letterSpacing:"-0.055em", lineHeight:.9, color:"#fff", margin:"0 0 56px", maxWidth:900 }}>
                {isRo
                  ? <><span>{"Hai să construim"}</span><br/><span style={{ color:"rgba(255,255,255,0.18)", fontStyle:"italic" }}>{"un proiect."}</span></>
                  : <><span>{"Let's build"}</span><br/><span style={{ color:"rgba(255,255,255,0.18)", fontStyle:"italic" }}>{"a project."}</span></>
                }
              </h2>
            </FadeUp>
            <FadeUp delay={120}>
              <div style={{ display:"flex", alignItems:"center", gap:40, flexWrap:"wrap" }}>
                <Link href={`/${locale}/incepe-un-proiect`} data-cur="Start"
                  style={{ display:"inline-flex", alignItems:"center", gap:12, backgroundColor:"#c4f20d", color:"#000", padding:"20px 44px", borderRadius:999, fontSize:13, fontWeight:900, textDecoration:"none", letterSpacing:"0.04em", transition:"transform .3s ease, box-shadow .3s ease" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="scale(1.04)";(e.currentTarget as HTMLElement).style.boxShadow="0 20px 48px rgba(196,242,13,0.25)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="scale(1)";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
                  {isRo?"Trimite un mesaj":"Send a message"} {"\u2192"}
                </Link>
                <Link href={`/${locale}/proiecte`} data-cur="View"
                  style={{ fontSize:11, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", textDecoration:"none", borderBottom:"1px solid rgba(255,255,255,0.12)", paddingBottom:3, transition:"color .2s, border-color .2s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#c4f20d";(e.currentTarget as HTMLElement).style.borderColor="#c4f20d";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.35)";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.12)";}}>
                  {isRo?"Vezi proiectele":"View projects"} {"\u2192"}
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
    </>
  );
}
