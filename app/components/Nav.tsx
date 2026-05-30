"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback, MouseEvent, CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import ProjectCursor from "@/app/components/ProjectCursor";

const navLinks = [
  { href: "/proiecte", key: "concepte" },
  { href: "/servicii", key: "servicii" },
  { href: "/proces", key: "proces" },
  { href: "/studio", key: "studio" },
  { href: "/jurnal", key: "jurnal" },
];

function LangSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [hov, setHov] = useState(false);
  const toggle = () => {
    const next = locale === "ro" ? "en" : "ro";
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };
  return (
    <button onClick={toggle} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontSize:11, fontWeight:700, background:"none", border:`1px solid ${hov?"rgba(0,0,0,0.3)":"rgba(0,0,0,0.12)"}`, borderRadius:999, padding:"5px 12px", cursor:"pointer", letterSpacing:"0.08em", color:hov?"var(--gray-900)":"rgba(0,0,0,0.5)", transition:"all 0.2s ease", fontFamily:"inherit" }}>
      {locale === "ro" ? "EN" : "RO"}
    </button>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const active = pathname.includes(href);
  const [hov, setHov] = useState(false);
  return (
    <Link href={`/${locale}${href}`} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position:"relative", fontSize:14, fontWeight:active?700:500, textDecoration:"none", color:active?"var(--gray-900)":hov?"var(--gray-900)":"rgba(0,0,0,0.45)", transition:"color 0.2s ease", textTransform:"lowercase", letterSpacing:"0.01em", paddingBottom:2 }}>
      {label}
      <span style={{ position:"absolute", bottom:-6, left:"50%", transform:"translateX(-50%)", width:active?4:0, height:4, borderRadius:"50%", backgroundColor:"var(--lime)", display:"block", transition:"width 0.3s cubic-bezier(.23,1,.32,1)" }}/>
      <span style={{ position:"absolute", bottom:-2, left:0, right:0, height:1, backgroundColor:"var(--gray-900)", display:"block", transformOrigin:"left", transform:hov&&!active?"scaleX(1)":"scaleX(0)", transition:"transform 0.3s cubic-bezier(.23,1,.32,1)" }}/>
    </Link>
  );
}

function MagneticCta() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [xy, setXY] = useState({ x:0, y:0 });
  const [hov, setHov] = useState(false);
  const locale = useLocale();
  const t = useTranslations("nav");
  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setXY({ x:(e.clientX-(r.left+r.width/2))*0.3, y:(e.clientY-(r.top+r.height/2))*0.3 });
  }, []);
  return (
    <Link ref={ref} href={`/${locale}/incepe-un-proiect`} onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setXY({ x:0, y:0 }); }}
      style={{ display:"inline-flex", alignItems:"center", gap:8, backgroundColor:hov?"#1a1a17":"var(--black)", color:"#fff", padding:"10px 22px", borderRadius:999, fontSize:13, fontWeight:700, textDecoration:"none", textTransform:"lowercase", letterSpacing:"0.02em", transform:`translate(${xy.x}px, ${xy.y}px)`, transition:"transform 0.4s cubic-bezier(.23,1,.32,1), background-color 0.2s ease, box-shadow 0.3s ease", boxShadow:hov?"0 8px 24px rgba(0,0,0,0.2)":"none" }}>
      {t("cta")}
      <span style={{ display:"inline-block", transform:hov?"translateX(3px)":"translateX(0)", transition:"transform 0.3s ease" }}>→</span>
    </Link>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5, width:22 }}>
      {[0,1,2].map((i) => (
        <span key={i} style={{ display:"block", width:"100%", height:1.5, backgroundColor:"var(--gray-900)", transformOrigin:"center", transition:"transform 0.3s ease, opacity 0.3s ease",
          transform: open ? i===0?"rotate(45deg) translate(4px, 4.5px)":i===2?"rotate(-45deg) translate(4px, -4.5px)":"none":"none",
          opacity: open && i===1 ? 0 : 1 }}/>
      ))}
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("scroll", onScroll, { passive:true });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const headerStyle: CSSProperties = {
    position:"fixed", top:0, left:0, right:0, zIndex:100,
    backgroundColor: scrolled ? "rgba(237,237,237,0.94)" : "rgba(237,237,237,0.75)",
    backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
    borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
    transition:"background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
    boxShadow: scrolled ? "0 4px 24px -8px rgba(0,0,0,0.1)" : "none",
  };

  return (
    <>
      <ProjectCursor />

      <header style={headerStyle}>
        <div style={{ padding:"0 56px", height:80, width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          <Link href={`/${locale}`} style={{ display:"flex", alignItems:"center", flexShrink:0 }}>
            <Image src="/logo-M81-simplu.svg" alt="M81 Studio" width={80} height={28} style={{ height:22, width:"auto" }} priority/>
          </Link>

          {!isMobile && (
            <nav style={{ display:"flex", alignItems:"center", gap:32 }}>
              {navLinks.map((l) => (
                <NavLink key={l.href} href={l.href} label={t(l.key as any)}/>
              ))}
            </nav>
          )}

          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <LangSwitch/>
            {!isMobile && (
              <Link href={`/${locale}/contact`}
                style={{ fontSize:13, fontWeight:500, color:"rgba(0,0,0,0.45)", textDecoration:"none", textTransform:"lowercase", letterSpacing:"0.01em", transition:"color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gray-900)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.45)")}>
                {t("contact")}
              </Link>
            )}
            {!isMobile && <MagneticCta/>}
            {isMobile && (
              <button onClick={() => setMenuOpen(!menuOpen)}
                style={{ background:"none", border:"none", cursor:"pointer", padding:8 }}
                aria-label="toggle menu">
                <Hamburger open={menuOpen}/>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div style={{ position:"fixed", inset:0, zIndex:99, backgroundColor:"rgba(237,237,237,0.98)", backdropFilter:"blur(20px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:32, opacity:menuOpen?1:0, pointerEvents:menuOpen?"all":"none", transition:"opacity 0.4s ease" }}>
        {navLinks.map((l, i) => (
          <Link key={l.href} href={`/${locale}${l.href}`}
            style={{ fontSize:"clamp(32px, 8vw, 56px)", fontWeight:800, letterSpacing:"-0.03em", textDecoration:"none", color:"var(--gray-900)", textTransform:"lowercase", opacity:menuOpen?1:0, transform:menuOpen?"translateY(0)":"translateY(20px)", transition:`opacity 0.4s ease ${i*60}ms, transform 0.4s ease ${i*60}ms` }}>
            {t(l.key as any)}
          </Link>
        ))}
        <Link href={`/${locale}/incepe-un-proiect`}
          style={{ marginTop:16, backgroundColor:"var(--black)", color:"#fff", padding:"14px 32px", borderRadius:999, fontSize:16, fontWeight:700, textDecoration:"none", textTransform:"lowercase", opacity:menuOpen?1:0, transform:menuOpen?"translateY(0)":"translateY(20px)", transition:`opacity 0.4s ease ${navLinks.length*60}ms, transform 0.4s ease ${navLinks.length*60}ms` }}>
          {t("cta")} →
        </Link>
      </div>
    </>
  );
}
