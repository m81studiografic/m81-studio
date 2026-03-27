"use client";

import Link from "next/link";
import { CSSProperties } from "react";

const socialLinks = [
  { href: "https://www.instagram.com/m81studio.ro/", label: "INSTAGRAM" },
  { href: "https://www.behance.net/m81studio1",   label: "BEHANCE"   },
  { href: "https://dribbble.com/m81-studio",  label: "DRIBBBLE"  },
];

export default function Footer() {
  const wrap: CSSProperties = {
    backgroundColor: "var(--black)",
    padding: "42px 48px",
    marginTop: 80,
  };

  const inner: CSSProperties = {
    maxWidth: 1440,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap",
  };

  const socials: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 56,
    flex: 1,
    flexWrap: "wrap",
  };

  return (
    <footer style={wrap}>
      <div style={inner}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:12, fontSize:18, fontWeight:800, letterSpacing:"-0.02em", color:"#fff", textDecoration:"none", whiteSpace:"nowrap" }}>
          <span>✦</span>
          <span>M81 STUDIO</span>
        </Link>

        <nav style={socials}>
          {socialLinks.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
              style={{ fontSize:13, fontWeight:700, letterSpacing:"0.22em", textDecoration:"none", color:"rgba(255,255,255,0.88)", transition:"opacity 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{ fontSize:13, letterSpacing:"0.12em", color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>
          © 2025 ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
