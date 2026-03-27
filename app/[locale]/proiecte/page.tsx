"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { projects } from "@/lib/projects";
import { FadeUp } from "@/app/components/m81-components";

const FILTERS_RO = ["Toate", "Branding", "Packaging", "Digital"] as const;
const FILTERS_EN = ["All", "Branding", "Packaging", "Digital"] as const;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  @keyframes m81-pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: .35; transform: scale(1.4); }
  }
`;

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: active ? "#0d0d0b" : hov ? "rgba(0,0,0,0.03)" : "transparent",
        color: active ? "#fff" : hov ? "#0d0d0b" : "rgba(0,0,0,0.48)",
        border: `1px solid ${
          active ? "#0d0d0b" : hov ? "rgba(0,0,0,0.22)" : "rgba(0,0,0,0.1)"
        }`,
        borderRadius: 999,
        padding: "10px 18px",
        fontWeight: active ? 700 : 500,
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontFamily: "inherit",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );
}

function ProjectCard({
  project,
  delay = 0,
  index,
}: {
  project: (typeof projects)[number];
  delay?: number;
  index: number;
}) {
  const [hov, setHov] = useState(false);
  const locale = useLocale();
  const isRo = locale === "ro";
  const aspect = index % 3 === 0 ? "16/11" : index % 3 === 1 ? "4/5" : "16/10";

  return (
    <FadeUp delay={delay}>
      <Link
        href={`/${locale}/proiecte/${project.slug}`}
        data-cursor={isRo ? "vezi" : "view"}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <article>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 18,
              backgroundColor: "#e4e3de",
              aspectRatio: aspect,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transform: hov ? "scale(1.045)" : "scale(1)",
                filter: hov ? "saturate(1)" : "saturate(.9)",
                transition:
                  "transform 0.9s cubic-bezier(.23,1,.32,1), filter 0.35s ease",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0.16) 32%, transparent 58%)",
                opacity: hov ? 1 : 0.82,
                transition: "opacity .3s ease",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: 18,
                right: 18,
                bottom: 18,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                gap: 16,
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 12px",
                    borderRadius: 999,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.78)",
                  }}
                >
                  {project.year}
                </span>
              </div>

              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#fff",
                  borderBottom: "1px solid rgba(255,255,255,0.35)",
                  paddingBottom: 3,
                  transform: hov ? "translateX(0)" : "translateX(-4px)",
                  opacity: hov ? 1 : 0.75,
                  transition: "all 0.28s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {isRo ? "Vezi proiectul →" : "View project →"}
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "18px 4px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: 16,
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 6px",
                  fontSize: "clamp(18px,1.9vw,24px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "#0d0d0b",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  lineHeight: 1.7,
                  color: "rgba(0,0,0,0.42)",
                  letterSpacing: "0.03em",
                }}
              >
                {project.category}
              </p>
            </div>

            <span
              aria-hidden="true"
              style={{
                fontSize: 18,
                color: hov ? "#0d0d0b" : "rgba(0,0,0,0.28)",
                transform: hov ? "translate(2px,-2px)" : "translate(0,0)",
                transition: "all .25s ease",
              }}
            >
              ↗
            </span>
          </div>
        </article>
      </Link>
    </FadeUp>
  );
}

export default function ProiectePage() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const locale = useLocale();
  const isRo = locale === "ro";

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 80);
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const filters = isRo ? FILTERS_RO : FILTERS_EN;
  const activeLabel = filters[activeFilter];

  const filtered =
    activeFilter === 0
      ? projects
      : projects.filter((project) => project.tags.includes(FILTERS_RO[activeFilter]));

  const intro = isRo
    ? "O selecție de identități, ambalaje și produse digitale construite cu structură clară și direcție vizuală coerentă."
    : "A selection of identities, packaging systems and digital products built with clear structure and cohesive visual direction.";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <main
        style={{
          backgroundColor: "#ededed",
          minHeight: "100vh",
          fontFamily: "'Manrope','Inter',sans-serif",
          color: "#0d0d0b",
          overflowX: "hidden",
        }}
      >
        <section
          style={{
            padding: isMobile ? "108px 24px 56px" : "120px 56px 72px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: isMobile ? "start" : "center",
                gap: 24,
                flexDirection: isMobile ? "column" : "row",
                marginBottom: 40,
                opacity: ready ? 1 : 0,
                transition: "opacity .6s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#c4f20d",
                    display: "inline-block",
                    animation: "m81-pulse 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.35)",
                  }}
                >
                  {isRo ? "Portofoliu selectat" : "Selected portfolio"}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: isMobile ? "flex-start" : "flex-end",
                }}
              >
                {filters.map((filter, index) => (
                  <FilterPill
                    key={filter}
                    label={filter}
                    active={activeFilter === index}
                    onClick={() => setActiveFilter(index)}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.15fr) minmax(320px, 0.85fr)",
                gap: isMobile ? 28 : 56,
                alignItems: "end",
              }}
            >
              <div>
                {(isRo ? ["Proiecte", "care rămân coerente."] : ["Projects", "that stay coherent."]).map(
                  (line, index) => (
                    <div key={line} style={{ lineHeight: 0.9, paddingBottom: "0.12em" }}>
                      <h1
                        style={{
                          margin: 0,
                          fontSize: "clamp(52px,8vw,120px)",
                          fontWeight: index === 0 ? 800 : 300,
                          letterSpacing: "-0.055em",
                          color: index === 0 ? "#0d0d0b" : "rgba(0,0,0,0.24)",
                          fontStyle: index === 1 ? "italic" : "normal",
                          opacity: ready ? 1 : 0,
                          transform: ready ? "translateY(0)" : "translateY(100%)",
                          transition: `opacity .8s ease ${80 + index * 120}ms, transform 1s cubic-bezier(.16,1,.3,1) ${80 + index * 120}ms`,
                        }}
                      >
                        {line}
                      </h1>
                    </div>
                  )
                )}
              </div>

              <div
                style={{
                  opacity: ready ? 1 : 0,
                  transform: ready ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity .85s ease 260ms, transform .85s cubic-bezier(.23,1,.32,1) 260ms",
                }}
              >
                <p
                  style={{
                    margin: "0 0 28px",
                    fontSize: 15,
                    lineHeight: 1.9,
                    color: "rgba(0,0,0,0.44)",
                    fontWeight: 300,
                    maxWidth: 420,
                  }}
                >
                  {intro}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                    alignItems: "center",
                    color: "rgba(0,0,0,0.34)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    {filtered.length} {isRo ? "proiecte" : "projects"}
                  </span>
                  {activeFilter !== 0 && (
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#0d0d0b",
                      }}
                    >
                      {activeLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: isMobile ? "32px 24px 88px" : "40px 56px 104px" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            {filtered.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: isMobile ? 28 : 32,
                  alignItems: "start",
                }}
              >
                {filtered.map((project, index) => (
                  <div
                    key={project.slug}
                    style={{
                      marginTop: !isMobile && index % 2 === 1 ? 72 : 0,
                    }}
                  >
                    <ProjectCard project={project} delay={index * 70} index={index} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "96px 0 64px",
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <p
                  style={{
                    margin: "0 0 12px",
                    fontSize: 22,
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    color: "#0d0d0b",
                  }}
                >
                  {isRo ? "Nu avem proiecte în filtrul acesta." : "No projects match this filter."}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: "rgba(0,0,0,0.38)",
                  }}
                >
                  {isRo ? "Schimbă categoria pentru a vedea alte lucrări." : "Change the category to explore other work."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
