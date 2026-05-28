"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type ContactPageClientProps = {
  locale: string;
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap');
  @keyframes m81-pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.3;transform:scale(1.5);} }
  @keyframes m81-spin-slow { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
  * { cursor: none !important; box-sizing: border-box; }
  input, textarea, select { outline: none; font-family: inherit; }
  input::placeholder, textarea::placeholder { color: rgba(0,0,0,0.22); }
  :root {
    --lime: #c4f20d;
    --ink: #0d0d0b;
    --muted: rgba(0,0,0,0.38);
    --border: rgba(0,0,0,0.07);
    --bg: #ededed;
    --surface: #fff;
    --page-px: 64px;
  }
  @media (max-width: 767px) {
    :root { --page-px: 24px; }
    * { cursor: auto !important; }
  }
`;

/* ── Cursor ── */
function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x:0, y:0 });
  const cur  = useRef({ x:0, y:0 });
  const raf  = useRef(0);
  const [lbl, setLbl] = useState("");
  useEffect(() => {
    const move = (e: globalThis.MouseEvent) => {
      pos.current = { x:e.clientX, y:e.clientY };
      if (dot.current) { dot.current.style.left=e.clientX+"px"; dot.current.style.top=e.clientY+"px"; }
      const tag = (e.target as HTMLElement).closest("[data-cursor]");
      setLbl(tag ? (tag as HTMLElement).dataset.cursor||"" : "");
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
      <div ref={dot}  style={{ position:"fixed",zIndex:99999,pointerEvents:"none",width:6,height:6,borderRadius:"50%",backgroundColor:"var(--lime)",transform:"translate(-50%,-50%)" }}/>
      <div ref={ring} style={{ position:"fixed",zIndex:99998,pointerEvents:"none",width:has?64:28,height:has?64:28,borderRadius:"50%",border:`1.5px solid ${has?"var(--lime)":"rgba(196,242,13,0.4)"}`,backgroundColor:has?"var(--lime)":"transparent",transform:"translate(-50%,-50%)",transition:"width .3s cubic-bezier(.23,1,.32,1),height .3s cubic-bezier(.23,1,.32,1),background-color .25s",display:"flex",alignItems:"center",justifyContent:"center" }}>
        {has && <span style={{ fontSize:8,fontWeight:900,color:"#000",textTransform:"uppercase",letterSpacing:"0.1em",whiteSpace:"nowrap" }}>{lbl}</span>}
      </div>
    </>
  );
}

/* ── FadeUp ── */
function FadeUp({ children, delay=0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } }, { threshold:0.06 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:go?1:0, transform:go?"translateY(0)":"translateY(28px)", transition:`opacity .9s ease ${delay}ms, transform .9s cubic-bezier(.23,1,.32,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── SpinBadge — păstrat dar mai mic și mai subtil ── */
function SpinBadge() {
  const letters = "CONTACTEAZĂ-NE · M81 STUDIO · ";
  return (
    <div style={{ position:"relative", width:96, height:96, flexShrink:0, opacity:.5 }}>
      <svg viewBox="0 0 96 96" width="96" height="96" style={{ animation:"m81-spin-slow 18s linear infinite" }}>
        <defs><path id="circ" d="M 48,48 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"/></defs>
        <text fontSize="8" fontWeight="700" fill="var(--muted)" letterSpacing="2" fontFamily="Manrope,sans-serif" textAnchor="start">
          <textPath href="#circ">{letters}</textPath>
        </text>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:28, height:28, borderRadius:"50%", backgroundColor:"var(--lime)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>✦</div>
      </div>
    </div>
  );
}

/* ── Input style ── */
const inputStyle = (focused: boolean): React.CSSProperties => ({
  width:"100%", padding:"14px 18px",
  backgroundColor: focused ? "#fff" : "rgba(0,0,0,0.025)",
  border:`1px solid ${focused ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}`,
  borderRadius:8, fontSize:14, fontWeight:400, color:"var(--ink)",
  transition:"border-color .2s, background-color .2s",
});

function getBudgetOptions(isRo: boolean) {
  return isRo
    ? ["2.000 – 5.000 lei","5.000 – 10.000 lei","10.000 – 20.000 lei","20.000 lei +","Discutăm"]
    : ["€2,000 – €5,000","€5,000 – €10,000","€10,000 – €20,000","€20,000+","Let's discuss"];
}

/* ── Budget pills ── */
function BudgetPills({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      {options.map(o => (
        <button key={o} type="button" onClick={() => onChange(o)}
          style={{ padding:"8px 16px", borderRadius:999, border:`1px solid ${value===o?"var(--ink)":"rgba(0,0,0,0.1)"}`, backgroundColor:value===o?"var(--ink)":"transparent", color:value===o?"#fff":"var(--muted)", fontSize:12, fontWeight:value===o?600:400, fontFamily:"inherit", transition:"all .2s" }}>
          {o}
        </button>
      ))}
    </div>
  );
}

/* ── Contact Form ── */
function ContactForm({ locale }: ContactPageClientProps) {
  const isRo = locale === "ro";
  const isMobile = useIsMobile();
  const budgetOptions = getBudgetOptions(isRo);
  const [fields, setFields] = useState({ name:"", email:"", projectType:"", budget:"", message:"" });
  const [focused, setFocused] = useState<string|null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setFields(f => ({ ...f, [k]:e.target.value }));

  const handleSubmit = async () => {
    if (!fields.name.trim() || !fields.email.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          payload: fields,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSent(true);
    } catch {
      setError("Nu am putut trimite mesajul acum. Încearcă din nou în câteva momente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) return (
    <div style={{ padding:"48px 0", textAlign:"center" }}>
      <div style={{ width:48, height:48, borderRadius:"50%", backgroundColor:"var(--lime)", margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>✓</div>
      <h3 style={{ fontSize:20, fontWeight:700, color:"var(--ink)", margin:"0 0 10px", letterSpacing:"-0.02em" }}>{isRo ? "Mesaj trimis." : "Message sent."}</h3>
      <p style={{ fontSize:14, fontWeight:300, color:"var(--muted)", margin:0, lineHeight:1.7 }}>{isRo ? "Îți răspundem în maxim 24 de ore." : "We'll get back to you within 24 hours."}</p>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:12 }}>
        <div>
          <label style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--muted)", display:"block", marginBottom:8 }}>{isRo ? "Nume" : "Name"}</label>
          <input type="text" value={fields.name} onChange={set("name")} placeholder={isRo ? "Ion Popescu" : "John Doe"} onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)} style={inputStyle(focused==="name")}/>
        </div>
        <div>
          <label style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--muted)", display:"block", marginBottom:8 }}>Email</label>
          <input type="email" value={fields.email} onChange={set("email")} placeholder={isRo ? "ion@companie.ro" : "john@company.com"} onFocus={()=>setFocused("email")} onBlur={()=>setFocused(null)} style={inputStyle(focused==="email")}/>
        </div>
      </div>

      <div>
        <label style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--muted)", display:"block", marginBottom:8 }}>{isRo ? "Tipul solicitării" : "Inquiry type"}</label>
        <select value={fields.projectType} onChange={set("projectType")} onFocus={()=>setFocused("project")} onBlur={()=>setFocused(null)}
          style={{ ...inputStyle(focused==="project"), appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 16px center" }}>
          <option value="">{isRo ? "Selectează..." : "Select..."}</option>
          <option value={isRo ? "Brand & Identitate Vizuală" : "Brand & Visual Identity"}>{isRo ? "Brand & Identitate Vizuală" : "Brand & Visual Identity"}</option>
          <option value={isRo ? "Design UX/UI" : "UX/UI Design"}>{isRo ? "Design UX/UI" : "UX/UI Design"}</option>
          <option value={isRo ? "Dezvoltare Web" : "Web Development"}>{isRo ? "Dezvoltare Web" : "Web Development"}</option>
          <option value={isRo ? "Produs Digital" : "Digital Product"}>{isRo ? "Produs Digital" : "Digital Product"}</option>
          <option value={isRo ? "Strategie Digitală" : "Digital Strategy"}>{isRo ? "Strategie Digitală" : "Digital Strategy"}</option>
          <option value={isRo ? "Altul" : "Other"}>{isRo ? "Altul" : "Other"}</option>
        </select>
      </div>

      <div>
        <label style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--muted)", display:"block", marginBottom:8 }}>{isRo ? "Mesaj" : "Message"}</label>
        <textarea value={fields.message} onChange={set("message")} placeholder={isRo ? "Povestește-ne despre idee, obiective sau ce vrei să construim împreună." : "Tell us about the idea, the goals, or what you'd like us to build together."} rows={5} onFocus={()=>setFocused("message")} onBlur={()=>setFocused(null)} style={{ ...inputStyle(focused==="message"), resize:"vertical", minHeight:120 }}/>
      </div>

      <button
        type="button"
        data-cursor="trimite"
        onClick={handleSubmit}
        disabled={submitting}
        style={{ width:"100%", padding:"16px", backgroundColor:"var(--ink)", color:"#fff", border:"none", borderRadius:999, fontSize:13, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:"inherit", transition:"background-color .25s" }}
        onMouseEnter={e=>{(e.currentTarget).style.backgroundColor="#c4f20d";(e.currentTarget).style.color="#000";}}
        onMouseLeave={e=>{(e.currentTarget).style.backgroundColor="var(--ink)";(e.currentTarget).style.color="#fff";}}
      >
        {submitting ? (isRo ? "Se trimite..." : "Sending...") : (isRo ? "Trimite mesajul →" : "Send message →")}
      </button>

      {error && (
        <p style={{ fontSize:11, fontWeight:400, color:"#b42318", textAlign:"center", margin:"-4px 0 0" }}>
          {isRo ? error : "We couldn't send your message right now. Please try again in a moment."}
        </p>
      )}

      <p style={{ fontSize:11, fontWeight:300, color:"var(--muted)", textAlign:"center", margin:0 }}>
        {isRo ? "Răspundem în maxim 24 de ore. Fără spam." : "We reply within 24 hours. No spam."}
      </p>
    </div>
  );
}

/* ── Map ── */
function MapBlock() {
  return (
    <div style={{ borderRadius:8, overflow:"hidden", border:"1px solid var(--border)", position:"relative", aspectRatio:"4/2.5" }}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91440.41556509!2d26.0201!3d44.4268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucure%C8%99ti!5e0!3m2!1sro!2sro!4v1"
        width="100%" height="100%" style={{ border:0, display:"block", position:"absolute", inset:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
    </div>
  );
}

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

/* ── Page ── */
export default function ContactPageClient({ locale }: ContactPageClientProps) {
  const [ready, setReady] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }}/>
      <Cursor/>

      <main style={{ backgroundColor:"var(--bg)", minHeight:"100vh", fontFamily:"'Manrope','Inter',sans-serif", color:"var(--ink)", paddingTop:80, overflowX:"hidden" }}>

        {/* ════ HERO — tipografic, calm ════ */}
        <section style={{ maxWidth:1200, margin:"0 auto", padding:"80px var(--page-px,64px) 72px" }}>

          {/* linia de sus — label + spin badge */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:56, opacity:ready?1:0, transition:"opacity .7s ease" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", backgroundColor:"var(--lime)", display:"inline-block", animation:"m81-pulse 2s ease-in-out infinite" }}/>
              <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--muted)" }}>
                Disponibili pentru proiecte noi
              </span>
            </div>
            <SpinBadge/>
          </div>

          {/* titlu — 2 linii, fără lime, fără italic agresiv */}
          <div style={{ borderBottom:"1px solid var(--border)", paddingBottom:56 }}>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:40, alignItems: isMobile ? "start" : "flex-end" }}>

              {/* stânga: titlu */}
              <div>
                {["Hai să", "vorbim."].map((line, i) => (
                  <div key={i} style={{ overflow:"hidden", lineHeight:.92 }}>
                    <h1 style={{
                      fontSize:"clamp(52px,8vw,112px)",
                      fontWeight: i===0 ? 300 : 800,
                      letterSpacing:"-0.05em",
                      margin:0,
                      color: i===0 ? "rgba(0,0,0,0.3)" : "var(--ink)",
                      fontStyle: i===0 ? "italic" : "normal",
                      opacity:ready?1:0,
                      transform:ready?"translateY(0)":"translateY(100%)",
                      transition:`opacity .8s ease ${80+i*140}ms, transform 1s cubic-bezier(.16,1,.3,1) ${80+i*140}ms`,
                    }}>{line}</h1>
                  </div>
                ))}
              </div>

              {/* dreapta: descriere + info rapide */}
              <div style={{ opacity:ready?1:0, transform:ready?"translateY(0)":"translateY(16px)", transition:"opacity .9s ease 360ms, transform .9s cubic-bezier(.23,1,.32,1) 360ms" }}>
                <p style={{ fontSize:15, fontWeight:300, lineHeight:1.85, color:"var(--muted)", margin:"0 0 36px" }}>
                  Ai un proiect în minte? Scrie-ne și îți răspundem în 24 de ore — brand nou, produs digital sau orice idee.
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {[
                    { label:"Email", value:"hello@m81studio.ro", href:"mailto:hello@m81studio.ro" },
                    { label:"Telefon", value:"+40 735248112", href:"tel:+40735248112" },
                  ].map(item => (
                    <a key={item.label} href={item.href}
                      style={{ display:"flex", alignItems:"baseline", gap:16, textDecoration:"none" }}
                      onMouseEnter={e=>(e.currentTarget.querySelector("span:last-child") as HTMLElement).style.color="var(--ink)"}
                      onMouseLeave={e=>(e.currentTarget.querySelector("span:last-child") as HTMLElement).style.color="var(--muted)"}
                    >
                      <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--muted)", minWidth:56 }}>{item.label}</span>
                      <span style={{ fontSize:15, fontWeight:400, color:"var(--muted)", transition:"color .25s" }}>{item.value}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════ MAIN — form + info ════ */}
        <section style={{ maxWidth:1200, margin:"0 auto", padding:"0 var(--page-px,64px) 96px" }}>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.35fr", gap: isMobile ? 40 : 64, alignItems:"flex-start" }}>

            {/* STÂNGA — info + map + social */}
            <div style={{ display:"flex", flexDirection:"column", gap:56 }}>

              <FadeUp>
                <div>
                  <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--muted)", display:"block", marginBottom:20 }}>Locație</span>
                  <p style={{ fontSize:17, fontWeight:600, color:"var(--ink)", margin:"0 0 4px", letterSpacing:"-0.02em" }}>București, România</p>
                  <p style={{ fontSize:13, fontWeight:300, color:"var(--muted)", margin:"0 0 20px" }}>Lucrăm remote cu clienți din toată lumea</p>
                  <MapBlock/>
                </div>
              </FadeUp>

              <FadeUp delay={80}>
                <div>
                  <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--muted)", display:"block", marginBottom:20 }}>Rețele sociale</span>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {[{l:"𝕏 Twitter",h:"#"},{l:"LinkedIn",h:"#"},{l:"Instagram",h:"#"},{l:"Dribbble",h:"#"}].map(s => (
                      <a key={s.l} href={s.h} data-cursor="vizitează"
                        style={{ padding:"8px 16px", borderRadius:999, border:"1px solid var(--border)", fontSize:12, fontWeight:500, color:"var(--muted)", textDecoration:"none", transition:"all .2s" }}
                        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--ink)";(e.currentTarget as HTMLElement).style.color="var(--ink)";}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--border)";(e.currentTarget as HTMLElement).style.color="var(--muted)";}}>
                        {s.l}
                      </a>
                    ))}
                  </div>
                </div>
              </FadeUp>

            </div>

            {/* DREAPTA — form */}
            <FadeUp delay={120}>
              <div style={{ backgroundColor:"var(--surface)", borderRadius:16, border:"1px solid var(--border)", padding:"44px 40px", position:"sticky", top:112 }}>
                <div style={{ marginBottom:32 }}>
                  <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--muted)", display:"block", marginBottom:12 }}>
                    {locale === "ro" ? "Formular de contact" : "Contact form"}
                  </span>
                  <h2 style={{ fontSize:"clamp(22px,2.5vw,30px)", fontWeight:700, letterSpacing:"-0.03em", margin:0, lineHeight:1.2, color:"var(--ink)" }}>
                    {locale === "ro" ? "Hai să vorbim" : "Let's talk"}
                  </h2>
                  <p style={{ fontSize:13, fontWeight:300, color:"var(--muted)", margin:"10px 0 0", lineHeight:1.7 }}>
                    {locale === "ro" ? "Spune-ne despre idee, proiect sau orice întrebare ai." : "Tell us about your idea, project, or any question you have."}
                  </p>
                </div>
                <ContactForm locale={locale}/>
              </div>
            </FadeUp>

          </div>
        </section>

        {/* ════ FAQ — simplu, pe fundal gri ════ */}
        <FadeUp>
          <section style={{ maxWidth:1200, margin:"0 auto", padding:"0 var(--page-px,64px) 80px" }}>
            <div style={{ borderTop:"1px solid var(--border)", paddingTop:64 }}>

              <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--muted)", display:"block", marginBottom:48 }}>
                Întrebări frecvente
              </span>

              <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 32 : 48 }}>
                {[
                  { q:"Cât durează un proiect?", a:"De obicei 4–12 săptămâni, în funcție de complexitate. Stabilim un timeline clar de la prima întâlnire." },
                  { q:"Lucrați cu startupuri?", a:"Da, absolut. Avem pachete flexibile adaptate bugetelor de startup, cu livrare rapidă și impact maxim." },
                  { q:"Ce se întâmplă după lansare?", a:"Oferim suport post-lansare și iterații bazate pe feedback real. Nu dispărem după delivery." },
                ].map(item => (
                  <div key={item.q}>
                    <h3 style={{ fontSize:16, fontWeight:600, color:"var(--ink)", margin:"0 0 12px", letterSpacing:"-0.02em", lineHeight:1.35 }}>{item.q}</h3>
                    <p style={{ fontSize:14, fontWeight:300, color:"var(--muted)", margin:0, lineHeight:1.8 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

      </main>
    </>
  );
}
