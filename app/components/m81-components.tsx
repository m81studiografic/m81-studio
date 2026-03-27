"use client";

import {
  CSSProperties,
  useEffect,
  useRef,
  useState,
  useCallback,
  MouseEvent,
  ReactNode,
} from "react";
import Link from "next/link";

// ─── Global CSS (inject once in layout or per-page) ──────────────────
export const GLOBAL_CSS = `
  @keyframes m81-ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes m81-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes m81-pulse {
    0%, 100% { opacity: 0.9; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(1.2); }
  }
  * { cursor: none !important; }
`;

// ─── Custom Cursor (Removed - kept single source of truth in Nav.tsx) ───

// ─── Magnetic Button ─────────────────────────────────────────────────
export function MagneticBtn({
  children,
  href,
  dark = true,
}: {
  children: ReactNode;
  href: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [xy, setXY] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setXY({
      x: (e.clientX - (r.left + r.width / 2)) * 0.35,
      y: (e.clientY - (r.top + r.height / 2)) * 0.35,
    });
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      data-cursor="click"
      onMouseMove={onMove}
      onMouseLeave={() => setXY({ x: 0, y: 0 })}
      style={{
        display: "inline-flex", alignItems: "center", gap: 12,
        backgroundColor: dark ? "var(--black)" : "var(--lime)",
        color: dark ? "#fff" : "var(--black)",
        borderRadius: 999, padding: "18px 40px",
        fontSize: 15, fontWeight: 800, textDecoration: "none",
        letterSpacing: "0.02em",
        transform: `translate(${xy.x}px, ${xy.y}px)`,
        transition: "transform 0.4s cubic-bezier(.23,1,.32,1), box-shadow 0.3s ease",
        boxShadow: (xy.x || xy.y)
          ? "0 20px 50px rgba(0,0,0,0.25)"
          : "none",
      }}
    >
      {children}
    </Link>
  );
}

// ─── Fade Up (scroll reveal) ─────────────────────────────────────────
export function FadeUp({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: go ? 1 : 0,
      transform: go ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(.23,1,.32,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Clip-path Text Reveal ───────────────────────────────────────────
export function TextReveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      clipPath: go ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
      transition: `clip-path 0.9s cubic-bezier(.77,0,.18,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Floating Circles ────────────────────────────────────────────────
export function FloatingCircles() {
  return (
    <>
      <div style={{
        position: "absolute", right: 24, top: 0,
        width: 320, height: 320, borderRadius: "50%",
        border: "1px solid rgba(196,242,13,0.2)",
        animation: "m81-float 6s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 64, top: 40,
        width: 200, height: 200, borderRadius: "50%",
        border: "1px solid rgba(196,242,13,0.1)",
        animation: "m81-float 6s ease-in-out infinite 1.5s",
        pointerEvents: "none",
      }} />
    </>
  );
}

// ─── Marquee Ticker ──────────────────────────────────────────────────
export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: "hidden", padding: "24px 0",
      borderTop: "1px solid rgba(0,0,0,0.07)",
      borderBottom: "1px solid rgba(0,0,0,0.07)",
    }}>
      <div style={{
        display: "flex", gap: 64, whiteSpace: "nowrap",
        animation: "m81-ticker 40s linear infinite",
        width: "max-content",
      }}>
        {doubled.map((t, i) => (
          <span key={i} style={{
            fontSize: 13, fontWeight: 800, letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: i % 2 === 0 ? "var(--gray-900)" : "var(--lime)",
          }}>
            {t}
            <span style={{ color: "var(--lime)", margin: "0 8px" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Dark Flip Card ──────────────────────────────────────────────────
export function DarkFlipCard({
  number,
  title,
  text,
  delay = 0,
}: {
  number: string;
  title: string;
  text: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-cursor="read"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", overflow: "hidden",
        padding: "40px 36px", borderRadius: 24,
        backgroundColor: hov ? "var(--gray-900)" : "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0)"
          : "translateY(32px)",
        transition: [
          `opacity 0.7s ease ${delay}ms`,
          `transform 0.7s cubic-bezier(.23,1,.32,1) ${delay}ms`,
          "background-color 0.4s ease",
          "box-shadow 0.4s ease",
        ].join(", "),
        boxShadow: hov
          ? "0 32px 64px -16px rgba(0,0,0,0.25)"
          : "0 4px 20px -6px rgba(0,0,0,0.06)",
      }}
    >
      {/* giant background number */}
      <span style={{
        position: "absolute", right: -8, top: -16,
        fontSize: 120, fontWeight: 900, lineHeight: 1,
        color: hov ? "rgba(196,242,13,0.08)" : "rgba(0,0,0,0.04)",
        userSelect: "none", pointerEvents: "none",
        transition: "color 0.4s ease",
      }}>{number}</span>

      <span style={{
        fontSize: 13, fontWeight: 800, color: "var(--lime)",
        display: "block", marginBottom: 20, letterSpacing: "0.05em",
      }}>{number}</span>

      <h3 style={{
        fontSize: 26, fontWeight: 800, letterSpacing: "-0.025em",
        margin: "0 0 14px",
        color: hov ? "#fff" : "var(--gray-900)",
        transition: "color 0.4s ease",
      }}>{title}</h3>

      <p style={{
        fontSize: 15, lineHeight: 1.75, margin: 0,
        color: hov ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
        transition: "color 0.4s ease",
      }}>{text}</p>

      {/* bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: 3, width: "100%", borderRadius: "0 0 24px 24px",
        backgroundColor: "var(--lime)",
        transformOrigin: "left",
        transform: hov ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.4s cubic-bezier(.23,1,.32,1)",
      }} />
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────
export function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 56 }}>
      <span style={{
        fontSize: 11, fontWeight: 800, letterSpacing: "0.2em",
        textTransform: "uppercase", color: "var(--lime)",
      }}>{text}</span>
      <div style={{ flex: 1, height: 1, backgroundColor: "rgba(0,0,0,0.1)" }} />
    </div>
  );
}

// ─── Hero Badge ───────────────────────────────────────────────────────
export function HeroBadge({ text }: { text: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      backgroundColor: "rgba(196,242,13,0.15)",
      padding: "6px 14px 6px 8px", borderRadius: 999,
      fontSize: 10, fontWeight: 800, letterSpacing: "0.2em",
      textTransform: "uppercase", marginBottom: 24,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        backgroundColor: "var(--lime)",
        animation: "m81-pulse 2s ease-in-out infinite",
        display: "inline-block",
      }} />
      {text}
    </span>
  );
}

// ─── Dark Quote Block ─────────────────────────────────────────────────
export function DarkQuote({ text, author }: { text: string; author: string }) {
  return (
    <FadeUp>
      <div style={{
        backgroundColor: "var(--gray-900)",
        borderRadius: 28, padding: "72px 56px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", right: -60, top: -60,
          width: 280, height: 280, borderRadius: "50%",
          border: "1px solid rgba(196,242,13,0.1)",
          pointerEvents: "none",
        }} />
        <span style={{
          fontSize: 96, color: "var(--lime)",
          fontFamily: "Georgia, serif", lineHeight: 1,
          display: "block", marginBottom: 8,
        }}>"</span>
        <blockquote style={{
          fontSize: "clamp(20px, 2.5vw, 34px)",
          fontWeight: 800, letterSpacing: "-0.025em",
          lineHeight: 1.3, margin: "0 0 28px", color: "#fff",
        }}>{text}</blockquote>
        <cite style={{
          fontSize: 11, fontWeight: 800, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
          fontStyle: "normal",
        }}>{author}</cite>
      </div>
    </FadeUp>
  );
}

// ─── CTA Split ────────────────────────────────────────────────────────
export function CtaSplit({
  badge,
  title,
  text,
  btnLabel,
  btnHref,
}: {
  badge: string;
  title: string;
  text: string;
  btnLabel: string;
  btnHref: string;
}) {
  return (
    <FadeUp>
      <div style={{
        background: "linear-gradient(135deg, var(--lime) 0%, #a8d900 100%)",
        borderRadius: 28, padding: "64px 56px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 32, flexWrap: "wrap",
      }}>
        <div>
          <p style={{
            fontSize: 11, fontWeight: 800, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "rgba(0,0,0,0.4)", margin: "0 0 12px",
          }}>{badge}</p>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 800, letterSpacing: "-0.03em",
            margin: 0, lineHeight: 1.1, color: "var(--black)",
          }} dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-end" }}>
          <p style={{
            fontSize: 15, color: "rgba(0,0,0,0.5)",
            margin: 0, maxWidth: 280, textAlign: "right", lineHeight: 1.6,
          }}>{text}</p>
          <MagneticBtn href={btnHref} dark>{btnLabel}</MagneticBtn>
        </div>
      </div>
    </FadeUp>
  );
}
