"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { FadeUp } from "@/app/components/m81-components";

/* ──────────────────────────────────────────────────────────────
   STUDIO INSIGHTS — Template articol: TECHNOLOGY & EXPERIENCE
   Adaptat 1:1 la sistemul vizual M81 (Manrope + JetBrains Mono
   pentru cod, accent lime, fundal cream, carduri rotunjite,
   cursor global). Fara autor. Nav + Footer vin din layout.
   ────────────────────────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
.si { font-family: 'Manrope', system-ui, -apple-system, sans-serif; }
.si ::selection { background: var(--black); color: #fff; }
.si .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
`;

const IMG = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpAkg6jnPLwx5g62wGXHskwf9zdEcHlAqKjnc9sdalXihJM2cn3XrueXiobpJQK3TgFTICLg1McbnKzkwFCSrRaBcDyl9oidE63n_duRTUHA1RtLXlfL6VdoYfLhzTXuhTRILValL0C1wVOEwqtfMZ9ZXDUlI0NfMayOnK-Tc3uzbZGmS55pDWdo4U78GCbuViidUpCRg8sAuPXABfI7fY9YfQOTEWGU553eaTdpb7jvNEtG47OvLdENTl6fYaAS6eJ8eCBWA5HBU",
  chip: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVHoAYoahypQ-v3iBU54f5Fvs4FXlLRjyMlClYbk3lDZ5_03iT171vwQtqSlH300J7RcyTKczMSTnQKukoAKUkBmc9t9esVJd-F68nZZ24XfaKrjwgxGelyrT9-fHNqmh0MymYqzJuTqO4KbZSkCGJ9PljxnVm3ceJ_yogK3wovvboQcWqyv8I1sWQ7PO_fqB3cPvWnxJm1h1dKlL26cQuIdognzosK7kxhVDlnbJbBP7kTFDRxDcCS9bd4xIm4zZGnJMqZuAMRKY",
  t1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEU4SV3Hedm1nkP_2HhiZzqHxWVBbxUx80o8230IQWsyEx7IbpE5u7y0iM5ekd5W_JVavhYlh1Fv5XJrLZ3C_0p3aVCiiibfc55jTbp4m8701WpvhjETjRgc1fKKT68WJxbGuIe-2dRLrgRUCmv65UpWaaLxObLQi8lxqxfbwejd0qc4F73a6pVU5z4kbB0YRJE73chGWA7tI06HCYsgfY_KEa2UOf6ek88kJKWG2Xh6O6u3q5I08AYBZA-HLyxzhPhMFyEildeOM",
  t2: "https://lh3.googleusercontent.com/aida-public/AB6AXuClEKCYpd3S35w9vK0ryo1WyEmrtpKlv5sldWN1wqmZEJZBjq86xLaa9GTzpwEuHKiQ4y47KcOClCACELk0sDWCeAzt0B6EBshq3kwFCrtyyCj4hxuAZf-pr7GYbWqwEfb-SvTDMPnhVhF1h4GG3fBqz57McFA4OpVV8ctNOWzqBec6EUhPFybO2im522mooiEz04WKhuHKhm_TIfPb4wOS3zESm2bmI9t-XeceZWxXn9RJcwAGuHJ5wWeyTEFmyl8ihWbVtrW-KqA",
  t3: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ-OkQV6QJ0e5wnrgrAA7y3bWa6pK6PWhGaheNK5gZ7L6LsBwvvg24jCnv11x03LB6DJPE7WYkhKV3B3FDBrnvFKO84fQluQRWgBxZ53KxoSejJjzzC5eqIxzsXJz6-7ilw-g3Usq4YLwrIA9E0UOeU_o7cpzPGSIZG7UZC6xizmjfrI4ucNTD8sctEg2ua2XPyy8QTPERAzp1pb7gx4LvZtx4_IXPY4Ylt5b77ABnAky6hGHyf6icoGkQNKyi7FeJOt52jMRkSzk",
  t4: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxnOU_Mh2jFwpZHJ_-boyyCedvyqQQlxJtUXg7PonXQISI3MbikJ8SMNoiiKT-VwWJbsqw3p-g3nPaJOkpIHdL3380UrGShYUgNgig4SmX852mgcPChn_uj6vYeUUoIJsE4S-Sb8FzE5hDUnV_t5Dbj9NCNcTimoc3CIvcWaDqHjiKYW7VTw2nAm4pVreFzfW3EeMwwR8v5IwlkZgytX2V3TdQ-YdZX6tCcEhgM5KSX-lY-kdnkd1VxJp9eTlQ9F4ihWIKDbpXOsM",
};

const CODE = `// Initialize WebGPU adapter and device
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

// Create a shader module
const shader = device.createShaderModule({
  code: \`
    @vertex
    fn main(@builtin(vertex_index) VertexIndex : u32)
      -> @builtin(position) vec4<f32> {
      var pos = array<vec2<f32>, 3>(
        vec2<f32>(0.0, 0.5),
        vec2<f32>(-0.5, -0.5),
        vec2<f32>(0.5, -0.5)
      );
      return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
    }
  \`
});`;

const T = {
  ro: {
    kicker: "Technology & Experience — înțelegem instrumentele noi",
    title: "WebGPU și noua frontieră a web-ului interactiv",
    back: "Înapoi la insights",
    figCaption: "Fig 1.0 — Explorarea randării în timp real folosind arhitectura modernă GPU.",
    intro: "În ultimii ani, peisajul dezvoltării web a fost limitat de constrângerile API-urilor grafice legacy. WebGL, deși revoluționar la vremea sa, nu a reușit să țină pasul cu evoluția hardware-ului modern. WebGPU apare ca o soluție fundamentală, oferind acces direct la puterea de procesare a procesorului grafic, eliminând overhead-ul și deschizând calea pentru experiențe interactive fără precedent.",
    takeawayLabel: "Key takeaway",
    takeaway: "WebGPU nu este doar o actualizare incrementală; este o regândire totală a modului în care browserul interacționează cu hardware-ul de randare.",
    bentoLabel: "Instrumente și inovație",
    c1Title: "Eficiență nativă",
    c1Text: "Reducerea drastică a utilizării CPU-ului prin comenzi GPU directe și gestionarea eficientă a memoriei.",
    c1MetaLabel: "Latency reduction", c1MetaVal: "90%",
    c2Title: "Compute Shaders",
    c2Text: "WebGPU introduce Compute Shaders, permițând algoritmilor complecși de AI și simulărilor fizice să ruleze direct în browser la viteze native.",
    c2Btn: "Learn more",
    c3Big: "WGSL", c3Sub: "The new standard",
    c3Text: "WebGPU Shading Language înlocuiește GLSL, oferind o sintaxă mai robustă și siguranță sporită.",
    c4Title: "Interactive demo",
    c4Placeholder: "Simulation placeholder",
    c4Tags: ["Particles: 1.2M", "FPS: 144", "Draw calls: 1"],
    c5Idx: "04 / Architecture", c5Title: "Zero-copy Memory Access",
    codeTitle: "Simplitatea implementării",
    codeText: "În contrast cu complexitatea excesivă a Vulkan sau DirectX, WebGPU oferă un set de abstracții care păstrează performanța fără a sacrifica ergonomia dezvoltatorului.",
    codeCaption: "Configurarea unui pipeline de bază necesită mai puține linii de cod și oferă o siguranță tipologică superioară prin WGSL.",
    toolTitle: "Ecosistemul viitorului",
    toolSub: "Instrumente care definesc noua eră a web-ului.",
    toolViewAll: "Vezi toate instrumentele",
    tools: [
      { name: "Dawn Engine", text: "Implementarea open-source de la Google pentru WebGPU, optimizată pentru cross-platform." },
      { name: "WGPU (Rust)", text: "O bibliotecă Rust sigură care stă la baza multor implementări de desktop și web." },
      { name: "Babylon.js", text: "Unul dintre primele motoare 3D care a adoptat suportul complet pentru WebGPU." },
      { name: "Three.js Nodes", text: "Sistemul de noduri Three.js transformă complet modul în care scriem shadere pentru WebGPU." },
    ],
  },
  en: {
    kicker: "Technology & Experience — we understand the new tools",
    title: "WebGPU and the New Frontier of Interactive Web",
    back: "Back to insights",
    figCaption: "Fig 1.0 — Exploring real-time rendering using modern GPU architecture.",
    intro: "In recent years, the web development landscape has been limited by the constraints of legacy graphics APIs. WebGL, though revolutionary in its time, failed to keep pace with the evolution of modern hardware. WebGPU emerges as a fundamental solution, offering direct access to the processing power of the graphics processor, eliminating overhead and paving the way for unprecedented interactive experiences.",
    takeawayLabel: "Key takeaway",
    takeaway: "WebGPU is not just an incremental update; it is a total rethinking of how the browser interacts with rendering hardware.",
    bentoLabel: "Tools & innovation",
    c1Title: "Native efficiency",
    c1Text: "Drastically reducing CPU usage through direct GPU commands and efficient memory management.",
    c1MetaLabel: "Latency reduction", c1MetaVal: "90%",
    c2Title: "Compute Shaders",
    c2Text: "WebGPU introduces Compute Shaders, allowing complex AI algorithms and physics simulations to run directly in the browser at native speeds.",
    c2Btn: "Learn more",
    c3Big: "WGSL", c3Sub: "The new standard",
    c3Text: "WebGPU Shading Language replaces GLSL, offering a more robust syntax and improved safety.",
    c4Title: "Interactive demo",
    c4Placeholder: "Simulation placeholder",
    c4Tags: ["Particles: 1.2M", "FPS: 144", "Draw calls: 1"],
    c5Idx: "04 / Architecture", c5Title: "Zero-copy Memory Access",
    codeTitle: "Simplicity of implementation",
    codeText: "In contrast to the excessive complexity of Vulkan or DirectX, WebGPU offers a set of abstractions that preserve performance without sacrificing developer ergonomics.",
    codeCaption: "Setting up a basic pipeline requires fewer lines of code and offers superior type safety through WGSL.",
    toolTitle: "The ecosystem of the future",
    toolSub: "Tools that define the new era of the web.",
    toolViewAll: "View all tools",
    tools: [
      { name: "Dawn Engine", text: "Google's open-source WebGPU implementation, optimized for cross-platform use." },
      { name: "WGPU (Rust)", text: "A safe Rust library that underpins many desktop and web implementations." },
      { name: "Babylon.js", text: "One of the first 3D engines to adopt full WebGPU support." },
      { name: "Three.js Nodes", text: "The Three.js node system completely transforms how we write shaders for WebGPU." },
    ],
  },
} as const;

/* iconite simple inline (fara dependinta de icon font) */
function BoltIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}
function ChipIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  );
}

/* ──────────────────── PAGE ──────────────────── */
export default function TechnologyArticlePage() {
  const locale = useLocale();
  const isRo = locale === "ro";
  const t = isRo ? T.ro : T.en;
  const cur = isRo ? "Citește" : "Read";
  const card = "rounded-md border border-[rgba(13,13,11,0.14)] p-8";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <main className="si bg-[var(--cream)] text-[var(--gray-900)] pt-20 overflow-x-hidden">

        {/* ════ HERO ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] pt-[clamp(40px,6vw,72px)] pb-[clamp(56px,9vw,120px)]">
          <Link href={`/${locale}/jurnal`} data-cur={cur}
            className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.16em] uppercase text-[rgba(13,13,11,0.5)] no-underline mb-[clamp(40px,6vw,72px)] transition-colors hover:text-[var(--black)]">
            <span className="inline-block">←</span> {t.back}
          </Link>
          <FadeUp>
            <span className="block text-[11px] font-extrabold tracking-[0.2em] uppercase text-[rgba(13,13,11,0.5)] mb-6">{t.kicker}</span>
            <h1 className="text-[clamp(38px,6.4vw,80px)] font-extrabold tracking-[-0.04em] leading-[1.03] text-[var(--black)] max-w-[1000px] m-0">{t.title}</h1>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="mt-12 relative overflow-hidden rounded-lg bg-[#e8e7e3] h-[clamp(320px,46vw,614px)]">
              <img src={IMG.hero} alt={t.title}
                className="w-full h-full object-cover grayscale brightness-90 transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)] hover:grayscale-0 hover:scale-[1.03]" />
            </div>
            <p className="text-[13px] italic text-right text-[rgba(13,13,11,0.5)] mt-4 m-0">{t.figCaption}</p>
          </FadeUp>
        </section>

        {/* ════ INTRO + KEY TAKEAWAY ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] pb-[clamp(56px,9vw,120px)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-start-4 md:col-span-6">
              <FadeUp>
                <p className="text-[clamp(17px,1.9vw,20px)] font-light leading-[1.7] text-[rgba(13,13,11,0.7)] mb-10 m-0">{t.intro}</p>
              </FadeUp>
              <FadeUp delay={100}>
                <div className="border-l-2 border-[var(--lime)] pl-8 my-2">
                  <span className="block text-[11px] font-extrabold tracking-[0.16em] uppercase text-[var(--gray-900)] mb-3">{t.takeawayLabel}</span>
                  <p className="text-[clamp(22px,2.8vw,32px)] font-light italic leading-[1.4] tracking-[-0.02em] text-[var(--black)] m-0">“{t.takeaway}”</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ════ BENTO GRID ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] pb-[clamp(56px,9vw,120px)]">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-12 h-px bg-[var(--lime)]" />
            <h2 className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[var(--gray-900)] m-0">{t.bentoLabel}</h2>
          </div>

          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className={`${card} flex flex-col justify-between md:aspect-square transition-colors duration-300 hover:bg-[#e7e6e2]`}>
                <div>
                  <span className="text-[var(--gray-900)] block mb-6"><BoltIcon /></span>
                  <h3 className="text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-[-0.025em] text-[var(--black)] mb-4 m-0">{t.c1Title}</h3>
                  <p className="text-[15px] leading-[1.65] text-[rgba(13,13,11,0.6)] m-0">{t.c1Text}</p>
                </div>
                <div className="pt-8 mt-8 border-t border-[rgba(13,13,11,0.12)] flex justify-between items-center">
                  <span className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-[rgba(13,13,11,0.55)]">{t.c1MetaLabel}</span>
                  <span className="text-[20px] font-extrabold tracking-[-0.02em] text-[var(--black)]">{t.c1MetaVal}</span>
                </div>
              </div>

              {/* Card 2 — wide */}
              <div className={`${card} md:col-span-2 relative overflow-hidden group`}>
                <div className="relative z-10 max-w-md">
                  <span className="text-[var(--gray-900)] block mb-6"><ChipIcon /></span>
                  <h3 className="text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-[-0.025em] text-[var(--black)] mb-4 m-0">{t.c2Title}</h3>
                  <p className="text-[15px] leading-[1.65] text-[rgba(13,13,11,0.6)] mb-7 m-0">{t.c2Text}</p>
                  <span data-cur={cur} className="inline-block px-6 py-3 rounded-full border border-[var(--black)] text-[11px] font-black tracking-[0.12em] uppercase text-[var(--black)] cursor-pointer transition-colors duration-300 hover:bg-[var(--black)] hover:text-white">{t.c2Btn}</span>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700 pointer-events-none">
                  <img src={IMG.chip} alt="" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Card 3 — dark */}
              <div className="rounded-md border border-[rgba(13,13,11,0.14)] p-8 bg-[var(--gray-900)] text-white flex flex-col justify-center items-center text-center md:aspect-square">
                <h3 className="text-[clamp(40px,5vw,64px)] font-extrabold tracking-[-0.04em] text-white mb-3 m-0">{t.c3Big}</h3>
                <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[var(--lime)] mb-4">{t.c3Sub}</p>
                <p className="text-[14px] leading-[1.6] text-[rgba(255,255,255,0.6)] m-0">{t.c3Text}</p>
              </div>

              {/* Card 4 — demo */}
              <div className={card}>
                <h3 className="text-[clamp(20px,2.2vw,26px)] font-extrabold tracking-[-0.02em] text-[var(--black)] mb-6 m-0">{t.c4Title}</h3>
                <div className="h-48 mb-6 flex items-center justify-center rounded-md bg-[#e7e6e2] border border-dashed border-[rgba(13,13,11,0.2)]">
                  <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[rgba(13,13,11,0.45)]">{t.c4Placeholder}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {t.c4Tags.map((tag) => (
                    <span key={tag} className="mono px-2.5 py-1 rounded-sm bg-[#e2e1dc] text-[10px] text-[var(--gray-900)]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Card 5 */}
              <div className={`${card} flex flex-col justify-end bg-[#e7e6e2]`}>
                <p className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[rgba(13,13,11,0.5)] mb-2 m-0">{t.c5Idx}</p>
                <h3 className="text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-[-0.025em] leading-[1.15] text-[var(--black)] m-0">{t.c5Title}</h3>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ════ COD ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] pb-[clamp(56px,9vw,120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4">
              <FadeUp>
                <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.03em] leading-[1.15] text-[var(--black)] mb-5 m-0">{t.codeTitle}</h2>
                <p className="text-[15px] leading-[1.7] text-[rgba(13,13,11,0.6)] m-0">{t.codeText}</p>
              </FadeUp>
            </div>
            <div className="lg:col-span-8">
              <FadeUp delay={100}>
                <div className="rounded-lg bg-[var(--gray-900)] p-6 overflow-x-auto">
                  <div className="flex gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-[var(--lime)]" />
                    <span className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.25)]" />
                    <span className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.25)]" />
                  </div>
                  <pre className="mono text-[13px] leading-[1.65] text-[rgba(226,226,226,0.92)] m-0"><code>{CODE}</code></pre>
                </div>
                <p className="text-[13px] leading-[1.6] text-[rgba(13,13,11,0.5)] mt-4 m-0">{t.codeCaption}</p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ════ TOOLING ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] pb-[clamp(64px,9vw,128px)] border-t border-[rgba(13,13,11,0.12)] pt-[clamp(56px,9vw,120px)]">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-16">
            <div>
              <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.035em] leading-[1.08] text-[var(--black)] m-0">{t.toolTitle}</h2>
              <p className="text-[15px] text-[rgba(13,13,11,0.6)] mt-2 m-0">{t.toolSub}</p>
            </div>
            <span data-cur={cur} className="text-[11px] font-black tracking-[0.16em] uppercase text-[var(--black)] border-b border-[var(--black)] pb-1 cursor-pointer transition-colors hover:border-[var(--lime)]">{t.toolViewAll}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.tools.map((tool, i) => {
              const imgs = [IMG.t1, IMG.t2, IMG.t3, IMG.t4];
              return (
                <div key={tool.name} className="group">
                  <div className="overflow-hidden rounded-md bg-[#e8e7e3] mb-4" style={{ aspectRatio: "16/9" }}>
                    <img src={imgs[i]} alt="" className="w-full h-full object-cover grayscale transition-all duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] group-hover:grayscale-0 group-hover:scale-[1.05]" />
                  </div>
                  <h4 className="text-[12px] font-extrabold tracking-[0.12em] uppercase text-[var(--black)] mb-2 m-0">{tool.name}</h4>
                  <p className="text-[14px] leading-[1.6] text-[rgba(13,13,11,0.6)] m-0">{tool.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
