"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type StartProjectPageClientProps = {
  locale: string;
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap');
  @keyframes m81-pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.3;transform:scale(1.5);} }
  * { cursor: none !important; box-sizing: border-box; }
  input, textarea, select { outline: none; font-family: inherit; }
  input::placeholder, textarea::placeholder { color: rgba(0,0,0,0.22); }
  select option { color: #111; background: #fff; }
  :root {
    --lime: #c4f20d;
    --ink: #0d0d0b;
    --muted: rgba(0,0,0,0.38);
    --border: rgba(0,0,0,0.08);
    --bg: #ededed;
    --surface: #fff;
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } }, { threshold:0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:go?1:0, transform:go?"translateY(0)":"translateY(28px)", transition:`opacity .9s ease ${delay}ms, transform .9s cubic-bezier(.23,1,.32,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Input styles — minimal, fără glow verde ── */
const inputStyle = (focused: boolean): React.CSSProperties => ({
  width:"100%", padding:"13px 16px",
  backgroundColor: focused ? "#fff" : "rgba(0,0,0,0.025)",
  border:`1px solid ${focused ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}`,
  borderRadius:8, fontSize:14, fontWeight:400, color:"var(--ink)",
  transition:"border-color .2s, background-color .2s",
});

const labelStyle: React.CSSProperties = {
  fontSize:10, fontWeight:600, letterSpacing:"0.14em",
  textTransform:"uppercase", color:"var(--muted)",
  display:"block", marginBottom:8,
};

const BUDGET_OPTIONS_RO = ["2.000 – 5.000 lei","5.000 – 10.000 lei","10.000 – 20.000 lei","20.000 lei +"];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function StyledSelect({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{ ...inputStyle(focused), appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 16px center", color:value?"var(--ink)":"rgba(0,0,0,0.3)" }}>
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

/* ── Progress — minimal, negru ── */
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ marginBottom:36 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <span style={{ fontSize:10, fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--muted)" }}>
          {step} / {total}
        </span>
        <div style={{ display:"flex", gap:6 }}>
          {Array.from({ length:total }).map((_,i) => (
            <div key={i} style={{ width:i<step?24:8, height:4, borderRadius:999, backgroundColor:i<step?"var(--ink)":"rgba(0,0,0,0.1)", transition:"all .5s cubic-bezier(.23,1,.32,1)" }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Butoane ── */
function PrimaryBtn({ children, onClick, disabled }: { children: ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} data-cursor=""
      style={{ width:"100%", padding:"15px", backgroundColor:disabled?"rgba(0,0,0,0.08)":"var(--ink)", color:disabled?"rgba(0,0,0,0.3)":"#fff", border:"none", borderRadius:999, fontSize:13, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:"inherit", transition:"background-color .25s" }}
      onMouseEnter={e=>{ if (!disabled) { (e.currentTarget).style.backgroundColor="#c4f20d"; (e.currentTarget).style.color="#000"; }}}
      onMouseLeave={e=>{ if (!disabled) { (e.currentTarget).style.backgroundColor="var(--ink)"; (e.currentTarget).style.color="#fff"; }}}>
      {children}
    </button>
  );
}

function BackBtn({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} data-cursor=""
      style={{ padding:"15px 24px", borderRadius:999, backgroundColor:"transparent", color:"var(--muted)", border:"1px solid var(--border)", fontSize:13, fontWeight:500, fontFamily:"inherit", transition:"all .2s", whiteSpace:"nowrap" }}
      onMouseEnter={e=>{ (e.currentTarget).style.color="var(--ink)"; (e.currentTarget).style.borderColor="rgba(0,0,0,0.25)"; }}
      onMouseLeave={e=>{ (e.currentTarget).style.color="var(--muted)"; (e.currentTarget).style.borderColor="var(--border)"; }}>
      {children}
    </button>
  );
}

/* ── Success ── */
function SuccessScreen() {
  return (
    <div style={{ textAlign:"center", padding:"48px 16px" }}>
      <div style={{ width:52, height:52, borderRadius:"50%", backgroundColor:"var(--lime)", margin:"0 auto 28px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>✓</div>
      <h2 style={{ fontSize:"clamp(24px,3vw,36px)", fontWeight:700, letterSpacing:"-0.035em", margin:"0 0 14px", color:"var(--ink)" }}>
        Proiect trimis.
      </h2>
      <p style={{ fontSize:15, fontWeight:300, color:"var(--muted)", lineHeight:1.8, margin:"0 auto 40px", maxWidth:380 }}>
        Mulțumim. Echipa M81 va analiza detaliile și te va contacta în maxim <strong style={{ fontWeight:600, color:"var(--ink)" }}>24 de ore</strong>.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, maxWidth:420, margin:"0 auto" }}>
        {["Revizuim brieful","Te contactăm","Începem"].map((s,i) => (
          <div key={i} style={{ padding:"18px 12px", borderRadius:8, border:"1px solid var(--border)", backgroundColor:"rgba(0,0,0,0.02)", textAlign:"center" }}>
            <p style={{ fontSize:11, fontWeight:500, color:"var(--muted)", margin:0, letterSpacing:"0.04em" }}>{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function StartProjectPageClient({ locale: _locale }: StartProjectPageClientProps) {
  void _locale;
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const TOTAL = 3;

  const [form, setForm] = useState({
    name:"", email:"", company:"", website:"",
    projectType:"", projectStage:"",
    description:"", budget:"", timeline:"",
  });
  const [focused, setFocused] = useState<string|null>(null);

  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]:e.target.value }));

  const canNext1 = form.name.trim() && form.email.trim();
  const canNext2 = form.projectType && form.projectStage;
  const canSubmit = form.description.trim() && form.budget && form.timeline;

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "project",
          payload: form,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
    } catch {
      setError("Nu am putut trimite proiectul acum. Încearcă din nou în câteva momente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }}/>
      <Cursor/>

      <main style={{ backgroundColor:"var(--bg)", minHeight:"100vh", fontFamily:"'Manrope','Inter',sans-serif", color:"var(--ink)", paddingTop:80, overflowX:"hidden" }}>

        {/* ════ HERO — calm, tipografic ════ */}
        <section style={{ maxWidth:1100, margin:"0 auto", padding:"80px var(--page-px,64px) 72px" }}>
          <div style={{ borderBottom:"1px solid var(--border)", paddingBottom:64 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"flex-end" }}>

              {/* stânga — titlu */}
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:32, opacity:ready?1:0, transition:"opacity .6s ease" }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", backgroundColor:"var(--lime)", display:"inline-block", animation:"m81-pulse 2s ease-in-out infinite" }}/>
                  <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--muted)" }}>
                    Acceptăm proiecte noi
                  </span>
                </div>

                {["Începe un", "proiect."].map((line, i) => (
  <div key={i} style={{
    lineHeight: .9,
    paddingTop: "0.08em",
    paddingBottom: "0.12em",
    marginBottom: i === 0 ? "0.55em" : 0,
  }}>
    <h1 style={{
      fontSize: "clamp(48px,7.5vw,104px)",
      fontWeight: i === 0 ? 300 : 800,
      letterSpacing: "-0.05em",
      margin: 0,
      color: i === 0 ? "rgba(0,0,0,0.28)" : "var(--ink)",
      fontStyle: i === 0 ? "italic" : "normal",
      opacity: ready ? 1 : 0,
      transform: ready ? "translateY(0)" : "translateY(100%)",
      transition: `opacity .8s ease ${80+i*130}ms, transform 1s cubic-bezier(.16,1,.3,1) ${80+i*130}ms`,
    }}>{line}</h1>
  </div>
))}
              </div>

              {/* dreapta — descriere */}
              <div style={{ opacity:ready?1:0, transform:ready?"translateY(0)":"translateY(16px)", transition:"opacity .9s ease 320ms, transform .9s cubic-bezier(.23,1,.32,1) 320ms" }}>
                <p style={{ fontSize:15, fontWeight:300, lineHeight:1.85, color:"var(--muted)", margin:"0 0 28px" }}>
                  Ai o idee, un produs sau un brand pe care vrei să îl construim — spune-ne câteva detalii și revenim în 24 de ore.
                </p>
                <p style={{ fontSize:14, fontWeight:300, lineHeight:1.85, color:"var(--muted)", margin:0 }}>
                  Lucrăm cu companii și antreprenori care au nevoie de{" "}
                  <span style={{ fontWeight:600, color:"var(--ink)" }}>strategie, design și dezvoltare digitală</span>{" "}
                  realizate coerent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════ FORM + SIDEBAR ════ */}
        <section style={{ maxWidth:1100, margin:"0 auto", padding:"0 var(--page-px,64px) 96px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.65fr", gap:64, alignItems:"flex-start" }}>

            {/* SIDEBAR */}
            <FadeUp delay={80}>
              <div style={{ position:"sticky", top:112 }}>

                {/* step indicators — simpli, fără dark card ── */}
                <div style={{ marginBottom:48 }}>
                  <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--muted)", display:"block", marginBottom:24 }}>
                    Etape
                  </span>
                  {[
                    { n:1, label:"Date de contact", desc:"Cine ești?" },
                    { n:2, label:"Tipul proiectului", desc:"Ce construim?" },
                    { n:3, label:"Detalii & buget", desc:"Cum procedăm?" },
                  ].map(s => {
                    const isActive = step===s.n;
                    const isDone = step>s.n;
                    return (
                      <div key={s.n}
                        onClick={() => { if (isDone||isActive) setStep(s.n); }}
                        data-cursor={isDone?"înapoi":""}
                        style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:28, opacity:(!isActive&&!isDone)?0.3:1, transition:"opacity .3s" }}>
                        <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, backgroundColor:isDone?"var(--ink)":isActive?"var(--ink)":"transparent", border:`1px solid ${isDone||isActive?"var(--ink)":"rgba(0,0,0,0.18)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:isDone||isActive?"#fff":"var(--muted)", transition:"all .3s" }}>
                          {isDone ? "✓" : s.n}
                        </div>
                        <div>
                          <p style={{ fontSize:14, fontWeight:isActive?600:400, margin:"0 0 3px", color:isActive?"var(--ink)":"rgba(0,0,0,0.55)", transition:"color .3s" }}>{s.label}</p>
                          <p style={{ fontSize:12, fontWeight:300, color:"var(--muted)", margin:0 }}>{s.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* info — pe fundal gri simplu, fără dark card ── */}
                <div style={{ borderTop:"1px solid var(--border)", paddingTop:28 }}>
                  <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--muted)", display:"block", marginBottom:20 }}>
                    De ce noi
                  </span>
                  {["Răspuns în 24 de ore","Fără birocrație","Strategie + design + dev","Livrare transparentă"].map(item => (
                    <div key={item} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                      <span style={{ width:4, height:4, borderRadius:"50%", backgroundColor:"rgba(0,0,0,0.25)", flexShrink:0 }}/>
                      <span style={{ fontSize:13, fontWeight:300, color:"rgba(0,0,0,0.55)" }}>{item}</span>
                    </div>
                  ))}
                </div>

              </div>
            </FadeUp>

            {/* FORM CARD */}
            <FadeUp delay={160}>
              <div style={{ backgroundColor:"var(--surface)", borderRadius:12, border:"1px solid var(--border)", padding:"40px 36px" }}>

                {submitted ? <SuccessScreen/> : (
                  <>
                    <ProgressBar step={step} total={TOTAL}/>

                    {/* ── STEP 1 ── */}
                    {step===1 && (
                      <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                        <div style={{ marginBottom:8 }}>
                          <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.03em", margin:"0 0 6px", color:"var(--ink)" }}>Date de contact</h2>
                          <p style={{ fontSize:13, fontWeight:300, color:"var(--muted)", margin:0 }}>Cine ești și cum te putem contacta?</p>
                        </div>

                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                          <Field label="Nume *">
                            <input type="text" value={form.name} onChange={set("name")} placeholder="Ion Popescu"
                              onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)} style={inputStyle(focused==="name")}/>
                          </Field>
                          <Field label="Email *">
                            <input type="email" value={form.email} onChange={set("email")} placeholder="ion@companie.ro"
                              onFocus={()=>setFocused("email")} onBlur={()=>setFocused(null)} style={inputStyle(focused==="email")}/>
                          </Field>
                        </div>

                        <Field label="Companie">
                          <input type="text" value={form.company} onChange={set("company")} placeholder="Numele companiei"
                            onFocus={()=>setFocused("company")} onBlur={()=>setFocused(null)} style={inputStyle(focused==="company")}/>
                        </Field>

                        <Field label="Website existent (opțional)">
                          <input type="text" value={form.website} onChange={set("website")} placeholder="https://companie.ro"
                            onFocus={()=>setFocused("website")} onBlur={()=>setFocused(null)} style={inputStyle(focused==="website")}/>
                        </Field>

                        <div style={{ paddingTop:8 }}>
                          <PrimaryBtn onClick={() => { if (canNext1) setStep(2); }} disabled={!canNext1}>
                            Continuă →
                          </PrimaryBtn>
                          {!canNext1 && <p style={{ fontSize:11, fontWeight:300, color:"var(--muted)", textAlign:"center", marginTop:10 }}>Completează numele și email-ul pentru a continua.</p>}
                        </div>
                      </div>
                    )}

                    {/* ── STEP 2 ── */}
                    {step===2 && (
                      <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                        <div style={{ marginBottom:8 }}>
                          <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.03em", margin:"0 0 6px", color:"var(--ink)" }}>Tipul proiectului</h2>
                          <p style={{ fontSize:13, fontWeight:300, color:"var(--muted)", margin:0 }}>Ce vrei să construim împreună?</p>
                        </div>

                        <Field label="Tip proiect *">
                          <StyledSelect value={form.projectType} onChange={v=>setForm(f=>({...f,projectType:v}))} placeholder="Selectează..." options={["Identitate de brand","Website","Produs digital / aplicație","Design & dezvoltare completă","Consultanță"]}/>
                        </Field>

                        <Field label="Etapa proiectului *">
                          <StyledSelect value={form.projectStage} onChange={v=>setForm(f=>({...f,projectStage:v}))} placeholder="Selectează etapa..." options={["Idee / concept","Proiect în dezvoltare","Rebranding / redesign","Produs existent de îmbunătățit"]}/>
                        </Field>

                        {/* hint discret — fără pill verde ── */}
                        {form.projectType && (
                          <p style={{ fontSize:13, fontWeight:300, color:"var(--muted)", margin:0, paddingLeft:4, borderLeft:"2px solid rgba(0,0,0,0.1)", lineHeight:1.7 }}>
                            {form.projectType==="Identitate de brand" && "Brand, logo, identitate vizuală completă și ghid de stil."}
                            {form.projectType==="Website" && "Website de prezentare, landing page sau portal web."}
                            {form.projectType==="Produs digital / aplicație" && "Aplicație web sau mobilă, SaaS, platformă digitală."}
                            {form.projectType==="Design & dezvoltare completă" && "De la strategie la lansare — design și cod livrate complet."}
                            {form.projectType==="Consultanță" && "Audit, strategie digitală sau îndrumare de produs."}
                          </p>
                        )}

                        <div style={{ display:"flex", gap:10, paddingTop:8 }}>
                          <BackBtn onClick={()=>setStep(1)}>← Înapoi</BackBtn>
                          <div style={{ flex:1 }}>
                            <PrimaryBtn onClick={() => { if (canNext2) setStep(3); }} disabled={!canNext2}>Continuă →</PrimaryBtn>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 3 ── */}
                    {step===3 && (
                      <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                        <div style={{ marginBottom:8 }}>
                          <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.03em", margin:"0 0 6px", color:"var(--ink)" }}>Detalii & buget</h2>
                          <p style={{ fontSize:13, fontWeight:300, color:"var(--muted)", margin:0 }}>Spune-ne mai mult despre proiect și așteptări.</p>
                        </div>

                        <Field label="Descrie proiectul *">
                          <textarea value={form.description} onChange={set("description")}
                            placeholder="Pe scurt — ce vrei să construiești și care este obiectivul principal..."
                            rows={5} onFocus={()=>setFocused("desc")} onBlur={()=>setFocused(null)}
                            style={{ ...inputStyle(focused==="desc"), resize:"vertical", minHeight:120 }}/>
                        </Field>

                        <Field label="Buget estimativ *">
                          <StyledSelect value={form.budget} onChange={v=>setForm(f=>({...f,budget:v}))} placeholder="Selectează bugetul..." options={BUDGET_OPTIONS_RO}/>
                        </Field>

                        <Field label="Timeline *">
                          <StyledSelect value={form.timeline} onChange={v=>setForm(f=>({...f,timeline:v}))} placeholder="Când vrei să începi?" options={["Cât mai curând","1–2 luni","3–6 luni","Doar explorăm"]}/>
                        </Field>

                        {/* rezumat — fără titlu bold verde ── */}
                        {form.name && (
                          <div style={{ backgroundColor:"rgba(0,0,0,0.025)", borderRadius:8, border:"1px solid var(--border)", padding:"16px 18px" }}>
                            <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--muted)", margin:"0 0 14px" }}>Rezumat</p>
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                              {[{l:"Nume",v:form.name},{l:"Email",v:form.email},{l:"Tip",v:form.projectType},{l:"Etapă",v:form.projectStage}].filter(r=>r.v).map(row => (
                                <div key={row.l}>
                                  <p style={{ fontSize:10, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", margin:"0 0 2px" }}>{row.l}</p>
                                  <p style={{ fontSize:13, fontWeight:500, color:"var(--ink)", margin:0 }}>{row.v}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div style={{ display:"flex", gap:10, paddingTop:8 }}>
                          <BackBtn onClick={()=>setStep(2)}>← Înapoi</BackBtn>
                          <div style={{ flex:1 }}>
                            <PrimaryBtn onClick={handleSubmit} disabled={!canSubmit || submitting}>
                              {submitting ? "Se trimite..." : "Trimite proiectul →"}
                            </PrimaryBtn>
                          </div>
                        </div>

                        {error && (
                          <p style={{ fontSize:11, fontWeight:400, color:"#b42318", textAlign:"center", margin:0 }}>
                            {error}
                          </p>
                        )}

                        <p style={{ fontSize:11, fontWeight:300, color:"var(--muted)", textAlign:"center", margin:0 }}>
                          Răspundem în maxim 24 de ore. Fără spam.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
    </>
  );
}
