"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap');
  @keyframes m81-pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.3;transform:scale(1.5);} }
  * { cursor: none !important; }
  :root {
    --lime: #c4f20d;
    --black: #0d0d0b;
    --gray-900: #0d0d0b;
    --ink: #1a1a18;
    --muted: rgba(0,0,0,0.38);
    --border: rgba(0,0,0,0.07);
    --bg: #f5f4f0;
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
      const tag = (e.target as HTMLElement).closest("[data-cursor],[data-cur]");
      setLbl(tag ? ((tag as HTMLElement).dataset.cursor||(tag as HTMLElement).dataset.cur||"") : "");
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

/* ── Types & Data ── */
type CategoryRo = "Toate" | "Design Systems" | "Strategie Digitala" | "Engineering" | "Cultura";
type CategoryEn = "All" | "Design Systems" | "Digital Strategy" | "Engineering" | "Culture";

interface Article {
  slug: string;
  categoryRo: Exclude<CategoryRo,"Toate">;
  categoryEn: Exclude<CategoryEn,"All">;
  date: string;
  readTime: number;
  titleRo: string;
  titleEn: string;
  excerptRo: string;
  excerptEn: string;
  author: string;
  featured?: boolean;
  image: string;
}

const ARTICLES: Article[] = [
  { slug:"viitorul-ui-minimalist-2024", categoryRo:"Design Systems", categoryEn:"Design Systems", date:"28 Mar. 2025", readTime:6, titleRo:"Viitorul UI Minimalist: Mai Putin Inseamna Mai Mult", titleEn:"The Future of Minimalist UI: Less Means More", excerptRo:"Exploram cum interfetele digitale evolueaza spre o simplitate extrema si cum designul adaptiv schimba modelele de interactiune.", excerptEn:"We explore how digital interfaces evolve toward extreme simplicity and how adaptive design changes interaction patterns.", author:"Alex Rivera", featured:true, image:"https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=900&q=80&fit=crop" },
  { slug:"design-la-scara-sisteme-complexe", categoryRo:"Design Systems", categoryEn:"Design Systems", date:"20 Mar. 2025", readTime:8, titleRo:"Design la Scara in Sisteme Complexe", titleEn:"Design at Scale in Complex Systems", excerptRo:"Cum gestionam cresterea infrastructurii fara a compromite performanta sau calitatea in produse mature.", excerptEn:"How we manage infrastructure growth without compromising performance or quality in mature products.", author:"Maria Ionescu", image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&fit=crop" },
  { slug:"arta-continutului-narativ", categoryRo:"Strategie Digitala", categoryEn:"Digital Strategy", date:"20 Mar. 2025", readTime:5, titleRo:"Arta Continutului Bazat pe Naratiune", titleEn:"The Art of Narrative-Based Content", excerptRo:"De ce storytelling-ul ramane cel mai puternic instrument de marketing digital in era AI.", excerptEn:"Why storytelling remains the most powerful digital marketing tool in the AI era.", author:"Elena Dumitrescu", image:"https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=700&q=80&fit=crop" },
  { slug:"inside-m81-procesul-creativ", categoryRo:"Cultura", categoryEn:"Culture", date:"15 Mar. 2025", readTime:7, titleRo:"Inside M81 Studio: Procesul Nostru Creativ", titleEn:"Inside M81 Studio: Our Creative Process", excerptRo:"O privire in culise despre cum echipa noastra colaboreaza pentru a livra produse digitale exceptionale.", excerptEn:"A behind-the-scenes look at how our team collaborates to deliver exceptional digital products.", author:"Radu Popescu", image:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80&fit=crop" },
  { slug:"tipografie-mastering-mobil", categoryRo:"Design Systems", categoryEn:"Design Systems", date:"10 Mar. 2025", readTime:4, titleRo:"Mastering Tipografie pentru Dispozitive Mobile", titleEn:"Mastering Typography for Mobile Devices", excerptRo:"Ghid esential despre lizibilitate si estetica pentru a crea tipografie exceptionala pe ecrane mici.", excerptEn:"Essential guide on readability and aesthetics for creating exceptional typography on small screens.", author:"Alex Rivera", image:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&q=80&fit=crop" },
  { slug:"dincolo-de-react-urmatorul-framework", categoryRo:"Engineering", categoryEn:"Engineering", date:"5 Mar. 2025", readTime:9, titleRo:"Dincolo de React: Urmatorul Framework", titleEn:"Beyond React: The Next Framework", excerptRo:"Evaluam framework-urile frontend emergente si impactul lor real asupra performantei si experientelor utilizatorilor.", excerptEn:"We evaluate emerging frontend frameworks and their real impact on performance and user experiences.", author:"Andrei Stan", image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80&fit=crop" },
  { slug:"securitate-cibernetica-era-llm", categoryRo:"Engineering", categoryEn:"Engineering", date:"1 Mar. 2025", readTime:11, titleRo:"Securitate Cibernetica in Era LLM-urilor", titleEn:"Cybersecurity in the LLM Era", excerptRo:"Protejarea datelor proprietare in timp ce valorificam puterea modelelor lingvistice de mari dimensiuni.", excerptEn:"Protecting proprietary data while leveraging the power of large language models.", author:"Vlad Constantin", image:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80&fit=crop" },
];

/* ── Featured Card — editorial, imagine mare sus, text jos ── */
function FeaturedCard({ article, isRo }: { article: Article; isRo: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={`/jurnal/${article.slug}`}
      data-cursor={isRo?"citeste":"read"}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display:"block", textDecoration:"none" }}
    >
      {/* imagine full-bleed */}
      <div style={{ position:"relative", overflow:"hidden", borderRadius:6, aspectRatio:"21/9", marginBottom:32 }}>
        <img
          src={article.image}
          alt={isRo?article.titleRo:article.titleEn}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform:hov?"scale(1.03)":"scale(1)", transition:"transform .9s cubic-bezier(.23,1,.32,1)" }}
        />
        {/* overlay subtil */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)", pointerEvents:"none" }}/>
      </div>

      {/* meta linie */}
      <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:16 }}>
        <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--muted)" }}>
          {isRo ? article.categoryRo : article.categoryEn}
        </span>
        <span style={{ width:16, height:1, backgroundColor:"var(--border)" }}/>
        <span style={{ fontSize:11, fontWeight:400, color:"var(--muted)" }}>{article.date}</span>
        <span style={{ fontSize:11, fontWeight:400, color:"var(--muted)" }}>·</span>
        <span style={{ fontSize:11, fontWeight:400, color:"var(--muted)" }}>{article.readTime} min</span>
      </div>

      {/* titlu */}
      <h2 style={{ fontSize:"clamp(26px,3.5vw,48px)", fontWeight:700, letterSpacing:"-0.04em", lineHeight:1.1, color:"var(--ink)", margin:"0 0 16px", maxWidth:820, transition:"color .3s ease" }}>
        {isRo ? article.titleRo : article.titleEn}
      </h2>

      {/* excerpt + cta pe aceeasi linie */}
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:40, flexWrap:"wrap" }}>
        <p style={{ fontSize:16, fontWeight:300, lineHeight:1.8, color:"rgba(0,0,0,0.48)", margin:0, maxWidth:560 }}>
          {isRo ? article.excerptRo : article.excerptEn}
        </p>
        <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:hov?"var(--ink)":"var(--muted)", borderBottom:`1px solid ${hov?"var(--ink)":"transparent"}`, paddingBottom:2, transition:"color .3s, border-color .3s", whiteSpace:"nowrap", flexShrink:0 }}>
          {isRo ? "Citeste" : "Read"} →
        </span>
      </div>
    </Link>
  );
}

/* ── Article Row — layout lista, editorial ── */
function ArticleRow({ article, isRo, index }: { article: Article; isRo: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.06 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transition:`opacity .8s ease ${index*60}ms, transform .8s cubic-bezier(.23,1,.32,1) ${index*60}ms` }}>
      <Link
        href={`/jurnal/${article.slug}`}
        data-cursor={isRo?"citeste":"read"}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:48, alignItems:"center", padding:"36px 0", borderBottom:"1px solid var(--border)", textDecoration:"none" }}
      >
        {/* stânga: meta + titlu + excerpt */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:14 }}>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--muted)" }}>
              {isRo ? article.categoryRo : article.categoryEn}
            </span>
            <span style={{ fontSize:10, color:"var(--muted)" }}>·</span>
            <span style={{ fontSize:10, fontWeight:400, color:"var(--muted)" }}>{article.date}</span>
            <span style={{ fontSize:10, color:"var(--muted)" }}>·</span>
            <span style={{ fontSize:10, fontWeight:400, color:"var(--muted)" }}>{article.readTime} min</span>
          </div>
          <h3 style={{ fontSize:"clamp(18px,2vw,24px)", fontWeight:600, letterSpacing:"-0.025em", lineHeight:1.25, color:hov?"var(--ink)":"rgba(0,0,0,0.82)", margin:"0 0 10px", transition:"color .25s" }}>
            {isRo ? article.titleRo : article.titleEn}
          </h3>
          <p style={{ fontSize:14, fontWeight:300, lineHeight:1.75, color:"var(--muted)", margin:0, maxWidth:520 }}>
            {isRo ? article.excerptRo : article.excerptEn}
          </p>
        </div>

        {/* dreapta: imagine mică */}
        <div style={{ overflow:"hidden", borderRadius:4, aspectRatio:"4/3", flexShrink:0 }}>
          <img
            src={article.image}
            alt=""
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform:hov?"scale(1.05)":"scale(1)", transition:"transform .7s cubic-bezier(.23,1,.32,1)", filter:hov?"none":"grayscale(20%)" }}
          />
        </div>
      </Link>
    </div>
  );
}

/* ── Newsletter — minimal ── */
function Newsletter({ isRo }: { isRo: boolean }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"72px 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
      <div>
        <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--muted)", display:"block", marginBottom:16 }}>Newsletter</span>
        <h2 style={{ fontSize:"clamp(22px,3vw,36px)", fontWeight:700, letterSpacing:"-0.03em", lineHeight:1.15, color:"var(--ink)", margin:"0 0 14px" }}>
          {isRo ? "Cele mai bune idei, direct în inbox." : "The best ideas, straight to your inbox."}
        </h2>
        <p style={{ fontSize:14, fontWeight:300, lineHeight:1.75, color:"var(--muted)", margin:0, maxWidth:360 }}>
          {isRo
            ? "Ganduri saptamanale despre design, tehnologie si produs digital. Fara spam."
            : "Weekly thoughts on design, technology and digital product. No spam."
          }
        </p>
      </div>
      <div>
        {sent ? (
          <p style={{ fontSize:15, fontWeight:500, color:"var(--ink)" }}>
            {isRo ? "Multumim! Te-ai abonat." : "Thank you! You're subscribed."}
          </p>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder={isRo ? "adresa ta de email" : "your email address"}
              style={{ backgroundColor:"transparent", border:"none", borderBottom:"1px solid rgba(0,0,0,0.2)", padding:"12px 0", fontSize:15, color:"var(--ink)", outline:"none", fontFamily:"inherit", fontWeight:300 }}
            />
            <button
              onClick={() => { if (email) setSent(true); }}
              data-cursor="click"
              style={{ alignSelf:"flex-start", backgroundColor:"var(--ink)", color:"#fff", border:"none", borderRadius:999, padding:"12px 28px", fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:"inherit", transition:"background-color .25s ease" }}
              onMouseEnter={e=>(e.currentTarget.style.backgroundColor="#c4f20d") && (e.currentTarget.style.color="#000")}
              onMouseLeave={e=>(e.currentTarget.style.backgroundColor="var(--ink)") && (e.currentTarget.style.color="#fff")}
            >
              {isRo ? "Aboneaza-ma" : "Subscribe"} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function BlogPage() {
  const [ready, setReady] = useState(false);
  const locale = useLocale();
  const isRo = locale === "ro";

  const CATS_RO: CategoryRo[] = ["Toate","Design Systems","Strategie Digitala","Engineering","Cultura"];
  const CATS_EN: CategoryEn[] = ["All","Design Systems","Digital Strategy","Engineering","Culture"];

  const [catRo, setCatRo] = useState<CategoryRo>("Toate");
  const [catEn, setCatEn] = useState<CategoryEn>("All");

  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);

  const featured = ARTICLES.find(a => a.featured)!;
  const rest = ARTICLES.filter(a => !a.featured);

  const filtered = isRo
    ? (catRo==="Toate" ? rest : rest.filter(a => a.categoryRo===catRo))
    : (catEn==="All"   ? rest : rest.filter(a => a.categoryEn===catEn));

  const isAll = isRo ? catRo==="Toate" : catEn==="All";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }}/>
      <Cursor/>

      <main style={{ backgroundColor:"var(--bg)", minHeight:"100vh", fontFamily:"'Manrope','Inter',sans-serif", color:"var(--ink)", paddingTop:80, overflowX:"hidden" }}>

        {/* ════ HERO — editorial, tipografic ════ */}
        <section style={{ maxWidth:1200, margin:"0 auto", padding:"80px var(--page-px, 64px) 64px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", alignItems:"flex-end", gap:40, borderBottom:"1px solid var(--border)", paddingBottom:40 }}>

            {/* stânga: label + titlu */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24, opacity:ready?1:0, transition:"opacity .6s ease" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", backgroundColor:"var(--lime)", display:"inline-block", animation:"m81-pulse 2s ease-in-out infinite" }}/>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--muted)" }}>
                  {isRo ? "Jurnal" : "Journal"}
                </span>
              </div>

              <div style={{ overflow:"hidden" }}>
                <h1 style={{ fontSize:"clamp(48px,8vw,112px)", fontWeight:800, letterSpacing:"-0.05em", lineHeight:.95, color:"var(--ink)", margin:0, opacity:ready?1:0, transform:ready?"translateY(0)":"translateY(100%)", transition:"opacity .8s ease 100ms, transform 1s cubic-bezier(.16,1,.3,1) 100ms" }}>
                  {isRo ? "Idei." : "Ideas."}
                </h1>
              </div>
            </div>

            {/* dreapta: descriere scurtă */}
            <div style={{ maxWidth:320, opacity:ready?1:0, transform:ready?"translateY(0)":"translateY(16px)", transition:"opacity .9s ease 300ms, transform .9s cubic-bezier(.23,1,.32,1) 300ms" }}>
              <p style={{ fontSize:14, fontWeight:300, lineHeight:1.85, color:"var(--muted)", margin:0 }}>
                {isRo
                  ? "Ganduri despre design, strategie digitala si procesul de a construi produse care contează."
                  : "Thoughts on design, digital strategy and the process of building products that matter."
                }
              </p>
            </div>
          </div>
        </section>

        {/* ════ FILTER — subtil, text ════ */}
        <section style={{ maxWidth:1200, margin:"0 auto", padding:"0 var(--page-px, 64px) 48px" }}>
          <div style={{ display:"flex", gap:0, borderBottom:"1px solid var(--border)" }}>
            {(isRo ? CATS_RO : CATS_EN).map(cat => {
              const active = isRo ? cat===catRo : cat===catEn;
              return (
                <button
                  key={cat}
                  onClick={() => isRo ? setCatRo(cat as CategoryRo) : setCatEn(cat as CategoryEn)}
                  style={{ padding:"14px 20px", background:"none", border:"none", borderBottom:`2px solid ${active?"var(--ink)":"transparent"}`, fontSize:12, fontWeight:active?700:400, letterSpacing:"0.04em", color:active?"var(--ink)":"var(--muted)", fontFamily:"inherit", marginBottom:-1, transition:"color .25s, border-color .25s" }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* ════ FEATURED ════ */}
        {isAll && (
          <FadeUp>
            <section style={{ maxWidth:1200, margin:"0 auto", padding:"0 var(--page-px, 64px) 80px" }}>
              <FeaturedCard article={featured} isRo={isRo}/>
            </section>
          </FadeUp>
        )}

        {/* ════ ARTICOLE — layout lista ════ */}
        <section style={{ maxWidth:1200, margin:"0 auto", padding:"0 var(--page-px, 64px) 96px" }}>

          {/* header sectiune */}
          <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:0 }}>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--muted)" }}>
              {isRo
                ? (catRo==="Toate" ? "Toate articolele" : catRo)
                : (catEn==="All"   ? "All articles"    : catEn)
              }
            </span>
            <span style={{ fontSize:11, color:"var(--muted)", fontWeight:400 }}>
              {filtered.length} {isRo ? "articole" : "articles"}
            </span>
          </div>

          {/* lista */}
          <div>
            {filtered.map((article, i) => (
              <ArticleRow key={article.slug} article={article} isRo={isRo} index={i}/>
            ))}
          </div>

          {/* pagination minimă */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:56, paddingTop:32, borderTop:"1px solid var(--border)" }}>
            <span style={{ fontSize:12, color:"var(--muted)", fontWeight:400 }}>Pagina 1 din 12</span>
            <div style={{ display:"flex", gap:4 }}>
              {[1,2,3,"…",12].map((p, i) => (
                <button key={i}
                  style={{ minWidth:36, height:36, borderRadius:4, border:"1px solid", borderColor:p===1?"var(--ink)":"var(--border)", backgroundColor:p===1?"var(--ink)":"transparent", color:p===1?"#fff":"var(--muted)", fontSize:12, fontWeight:p===1?700:400, fontFamily:"inherit", transition:"all .2s" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ════ NEWSLETTER ════ */}
        <section style={{ maxWidth:1200, margin:"0 auto", padding:"0 var(--page-px, 64px) 96px" }}>
          <FadeUp>
            <Newsletter isRo={isRo}/>
          </FadeUp>
        </section>

      </main>
    </>
  );
}
