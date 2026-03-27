"use client";

import { useEffect, useRef, useState } from "react";

export default function ProjectCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: 0, y: 0 });
  const cur  = useRef({ x: 0, y: 0 });
  const raf  = useRef(0);
  const [lbl, setLbl] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncEnabled = () => {
      const nextEnabled = media.matches && !reducedMotion.matches;
      setEnabled(nextEnabled);

      if (nextEnabled) {
        document.documentElement.dataset.m81Cursor = "custom";
      } else {
        delete document.documentElement.dataset.m81Cursor;
      }
    };

    syncEnabled();

    const move = (e: MouseEvent) => {
      if (!media.matches || reducedMotion.matches) return;
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top  = e.clientY + "px";
      }
      const t = (e.target as HTMLElement).closest("[data-cursor],[data-cur]");
      setLbl(
        t
          ? (t as HTMLElement).dataset.cursor || (t as HTMLElement).dataset.cur || ""
          : ""
      );
    };

    const tick = () => {
      if (!media.matches || reducedMotion.matches) return;
      cur.current.x += (pos.current.x - cur.current.x) * 0.1;
      cur.current.y += (pos.current.y - cur.current.y) * 0.1;
      if (ring.current) {
        ring.current.style.left = cur.current.x + "px";
        ring.current.style.top  = cur.current.y + "px";
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(tick);
    media.addEventListener("change", syncEnabled);
    reducedMotion.addEventListener("change", syncEnabled);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
      media.removeEventListener("change", syncEnabled);
      reducedMotion.removeEventListener("change", syncEnabled);
      delete document.documentElement.dataset.m81Cursor;
    };
  }, []);

  if (!enabled) return null;

  const has = lbl.length > 0;

  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed", zIndex: 99999, pointerEvents: "none",
          width: 7, height: 7, borderRadius: "50%",
          backgroundColor: "#c4f20d",
          transform: "translate(-50%,-50%)",
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed", zIndex: 99998, pointerEvents: "none",
          width: has ? 64 : 28, height: has ? 64 : 28,
          borderRadius: "50%",
          border: `1.5px solid ${has ? "#c4f20d" : "rgba(196,242,13,0.45)"}`,
          backgroundColor: has ? "#c4f20d" : "transparent",
          transform: "translate(-50%,-50%)",
          transition: "width .3s cubic-bezier(.23,1,.32,1), height .3s cubic-bezier(.23,1,.32,1), background-color .25s",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {has && (
          <span style={{
            fontSize: 7, fontWeight: 900, color: "#000",
            textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap",
          }}>
            {lbl}
          </span>
        )}
      </div>
    </>
  );
}
