"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Global Cursor implemented in Nav.tsx

import { motion } from "framer-motion";

export function SlideUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "104%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function WipeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

import Image from "next/image";

export function ProjectCard({ image, title, category, index, aspect = "16/9", href }: { image: string; title: string; category: string; index: number; aspect?: string; href: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: (index * 100) / 1000 }}
    >
      <Link href={href} data-cur="Vezi" className="group no-underline block">
        <div className="relative overflow-hidden rounded-md bg-[#e8e7e3]" style={{ aspectRatio: aspect }}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] scale-100 brightness-95 group-hover:scale-[1.06] group-hover:brightness-[0.85]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-3.5 left-3.5 bg-[var(--lime)] text-black text-[9px] font-black tracking-[0.12em] uppercase py-1.5 px-3 rounded-full transition-all duration-300 ease-out opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 text-center">
            {category}
          </div>
        </div>
        <div className="flex justify-between items-center mt-3.5 px-0.5">
          <div>
            <h3 className="text-[14px] font-extrabold text-[var(--black)] tracking-[-0.01em] mb-[3px] m-0">{title}</h3>
            <p className="text-[11px] text-[var(--muted)] font-semibold tracking-[0.05em] m-0">{category}</p>
          </div>
          <span className="text-[16px] text-[var(--muted)] transition-all duration-[250ms] ease-out group-hover:text-[var(--black)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" aria-hidden="true">↗</span>
        </div>
      </Link>
    </motion.article>
  );
}

export function ServiceRow({ n, title, desc, delay }: { n: string; title: string; desc: string; delay: number }) {
  return (
    <motion.article
      data-cur="Vezi"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: delay / 1000 }}
      className="group border-b border-[rgba(13,13,11,0.08)] py-7"
    >
      <div className="flex gap-4 items-start">
        <span className="text-[10px] font-extrabold text-[var(--lime)] tracking-[0.1em] mt-[3px] w-6 shrink-0">{n}</span>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-[clamp(16px,1.8vw,22px)] font-extrabold tracking-[-0.02em] text-[var(--black)] m-0">{title}</h3>
            <span className="text-[14px] text-[var(--muted)] shrink-0 ml-4 transition-all duration-[250ms] ease-out group-hover:text-[var(--black)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" aria-hidden="true">↗</span>
          </div>
          <div className="overflow-hidden max-h-0 transition-[max-height] duration-[400ms] ease-[cubic-bezier(.23,1,.32,1)] group-hover:max-h-[80px]">
            <p className="text-[13px] text-[var(--muted)] leading-[1.75] mt-2 opacity-0 transition-opacity duration-300 delay-100 ease-out group-hover:opacity-100 m-0">{desc}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProcessCard({ n, title, desc, delay }: { n: string; title: string; desc: string; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: delay / 1000 }}
      className="group py-10 px-9 rounded-[20px] border border-[rgba(13,13,11,0.08)] bg-white relative overflow-hidden transition-all duration-[400ms] ease-out shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] hover:bg-[var(--black)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]"
    >
      <span className="absolute -right-2 -top-4 text-[120px] font-black leading-none text-[rgba(13,13,11,0.04)] select-none pointer-events-none transition-colors duration-[400ms] ease-out group-hover:text-[rgba(196,242,13,0.07)]" aria-hidden="true">{n}</span>
      <span className="text-[11px] font-extrabold text-[var(--lime)] block mb-4 tracking-[0.1em]">{n}</span>
      <h3 className="text-[20px] font-extrabold tracking-[-0.02em] text-[var(--black)] mb-3 transition-colors duration-[400ms] ease-out group-hover:text-white m-0">{title}</h3>
      <p className="text-[13px] leading-[1.75] text-[var(--muted)] transition-colors duration-[400ms] ease-out group-hover:text-[rgba(255,255,255,0.5)] m-0">{desc}</p>
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[var(--lime)] origin-left scale-x-0 transition-transform duration-[400ms] ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-x-100" />
    </motion.article>
  );
}

// Wrapping Link interactions for static animations if needed
export function CtaButton({ href, children, locale }: { href: string; children: React.ReactNode; locale: string }) {
  return (
    <Link href={href} data-cur="Start"
      className="inline-flex items-center gap-3 bg-black text-white py-[18px] px-9 rounded-full text-[13px] font-black no-underline tracking-[0.04em] transition-transform duration-300 ease-out hover:scale-[1.04]"
    >{children}</Link>
  );
}

export function HeroLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} data-cur="Vezi"
      className="inline-flex items-center gap-3 text-[11px] font-black tracking-[0.2em] uppercase no-underline text-white whitespace-nowrap border-b border-[rgba(255,255,255,0.25)] pb-[3px] transition-colors duration-[250ms] ease-out hover:text-[var(--lime)] hover:border-[var(--lime)]"
    >{children}</Link>
  );
}
