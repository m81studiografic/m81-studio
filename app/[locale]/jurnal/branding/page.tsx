"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { FadeUp } from "@/app/components/m81-components";

/* ──────────────────────────────────────────────────────────────
   STUDIO INSIGHTS — Template articol: BRANDING & EXPERIENCE
   Adaptat 1:1 la sistemul vizual M81 (Manrope, accent lime,
   fundal cream, carduri rotunjite, cursor global via data-cur).
   Fara autor (regula). Nav + Footer vin din layout.
   ────────────────────────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap');
.si { font-family: 'Manrope', system-ui, -apple-system, sans-serif; }
.si ::selection { background: var(--black); color: #fff; }
.si .tj { text-align: justify; text-justify: inter-word; }
`;

const IMG = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuXlufTL6esXAR_IyaVRldvbTd3x6O2qg7JEjiDpxQCap_T0_zDZGrVNGIN47_I86mYCfY7U8MccedzAsd7Rx9G-X01AgOlvroPqgoPEPcneXWHFkj8DhyVOiRu1_aTdyVUlW_wPSkGtf6EA6jOGD-XMwDlOclwkch8A4hdOJLxtkoeOlHw44kYbiKLtsjmDQybEP2OuEJRUnLh9x-ItLzhrnQt_k5jiwxqzTRwYtV8oW3neTdpX5p_xiv4oYrcQgQMSyvVm8Y9lE",
  lamp: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh-2ZOsQwZIKJ1SFhqauVy175vuJVci8kBR07d5LAyrrnXHksyj3H0RjW265qkV3UKiLgJCBNwq12kRXiJBXR0k-2_7Q6p2srbEnnNwFOb_6DvW5oXxmaRyvAjWm0ugv3yaZqLVJroL75xd6ccMqRvVE93HH_h7O1mwlgvq_pD75GL9M-d6eP763tTAIBWXZVdcqKAxNUO4rnJukVz8lIqkkx3gyQt5y3Zm6KQfVGHAMIaXZR-_hMqv8VPQwJ0xNu5sVHeBaXGxSU",
  g1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrt0oKjT8ipv7AXInejgNKkEAkBFgjdfiaNpVsEa4pQOina5rWU9iaAnH3ftGKeV4Oo8ofzZ4XN68PNyzQ9SIR_Nax8poW_ycsr0GqVcwNTr66zanMB3D4kSJU12sNWpgMXbldIYX0lsn29kLAdKv8AJieJvm-ezJFcFDqcmn7cOoqFw-8YMugQaB2oQBKM23drH9QorGmfqriNyXWQQmGvgQ1_av8ee7bV0oOR9VOhy1JFpvUyovCFPr6b8nZKZ--iU6G0eq_wvU",
  g2: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUtJW0DUdVIKsMLDHx7m_nSt3JSeADi7ETBWK2Oe9j0loSPxG-WxKglmYrCAy8-3JVorPeP8MrIsPjUVAAwf8WDdYvnypFTtuWwSx2UkOoNgm15CoHcjfDB8YPKsjQ2DgaFVevOFhg1Yz2kOQBYy-FSE_tlL6ZBH429och-G3mzUI8X5xnHcaUGaD_JwLW6ixncHER1xvSgvHLCF_161_eF1AMwXICcclQJajd_P_NuP56w1GGrmNkLq6r7Xa2xPvtN33WrD3COvo",
  g3: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYbduZ_40HioOoCFZD2HRxIDXu0eJL7wV15swuAy8vX9s6JFcv4py9bp7A0Lq8LBddx9lefGCUg5bripJvYvddkTKmjK8JNTj3xjfwe5ZJOC6SJCUhrb0E_FCHG6E2Ks3mBW_bXEWMjWc9S5B7KHJqoAWUPxR93y7QFQxgbZmqUAFs3mXl4zz9pzRnwUa44D4526TMioN78eD59AAeidjDWG_D54ZQLHHtIeNtZhhjKOi-2erNVNLGdwhg01iwbi4jWBP1IGaA-co",
};

const T = {
  ro: {
    kicker: "Branding & Experience",
    title: "Psihologia designului senzorial",
    subtitle: "Înțelegem percepția și experiența prin prisma emoției și a designului conștient.",
    back: "Înapoi la insights",
    heroCaption: "Senzorialitatea în formă pură",
    readLabel: "Timp citire", read: "8 minute",
    topicsLabel: "Subiecte",
    topics: ["Neuromarketing", "Armonie vizuală", "Emoția utilizatorului"],
    h2a: "Percepția dincolo de vizual",
    a1: "Designul senzorial nu se rezumă doar la ceea ce vedem. Este o conversație tăcută între brand și utilizator, mediată de texturi, sunete subtile și chiar ritmul în care informația este dezvăluită. Într-o lume suprasaturată digital, luxul spațiului și al tăcerii vizuale devine un instrument psihologic puternic.",
    a2: "Când eliminăm zgomotul, lăsăm loc pentru emoție. Înțelegem percepția nu ca pe un simplu act biologic, ci ca pe o experiență culturală și emoțională profundă. Fiecare spațiu negativ într-un layout este o invitație la reflecție, o pauză necesară în fluxul constant de stimuli.",
    quote: "Designul nu este doar despre cum arată sau cum se simte. Designul este despre cum funcționează emoția în raport cu forma.",
    quoteCite: "— Arhitectura senzorială, 2024",
    h2b: "Experiența utilizatorului: o călătorie emoțională",
    b1: 'User Experience-ul modern evoluează de la funcționalitate pură spre rezonanță afectivă. Nu mai este suficient ca un produs să „meargă"; el trebuie să „vibreze" la aceeași frecvență cu valorile și starea de spirit a utilizatorului.',
    figCaption: "Figura 1.1: Interacțiunea dintre lumină și material ca metaforă a experienței digitale.",
    b2: "Prin utilizarea unor principii precum ierarhia tipografică precisă și grid-urile asimetrice, ghidăm ochiul nu prin forță, ci prin curiozitate. Este o formă de respect față de timpul și atenția utilizatorului.",
    noteLabel: "Note de design",
    noteText: "Fiecare element prezentat aici a fost redus la esența sa. Minimalizarea nu înseamnă lipsă, ci prezență asumată. Într-un context de branding, acest lucru se traduce prin autoritate calmă.",
    gridLabel: "Explorează elementele senzoriale",
    grid: ["Tactilitate", "Claritate", "Emoție"],
  },
  en: {
    kicker: "Branding & Experience",
    title: "The Psychology of Sensory Design",
    subtitle: "We understand perception and experience through the lens of emotion and conscious design.",
    back: "Back to insights",
    heroCaption: "Sensoriality in its purest form",
    readLabel: "Read time", read: "8 minutes",
    topicsLabel: "Topics",
    topics: ["Neuromarketing", "Visual harmony", "User emotion"],
    h2a: "Perception Beyond the Visual",
    a1: "Sensory design isn't limited to what we see. It's a silent conversation between brand and user, mediated by textures, subtle sounds and even the rhythm in which information is revealed. In a digitally oversaturated world, the luxury of space and visual silence becomes a powerful psychological tool.",
    a2: "When we remove the noise, we make room for emotion. We understand perception not as a mere biological act, but as a deep cultural and emotional experience. Every negative space in a layout is an invitation to reflect, a necessary pause in the constant flow of stimuli.",
    quote: "Design is not just about how it looks or how it feels. Design is about how emotion works in relation to form.",
    quoteCite: "— Sensory Architecture, 2024",
    h2b: "User Experience: An Emotional Journey",
    b1: 'Modern user experience is evolving from pure functionality toward affective resonance. It is no longer enough for a product to "work"; it must "vibrate" at the same frequency as the user\'s values and state of mind.',
    figCaption: "Figure 1.1: The interplay of light and material as a metaphor for digital experience.",
    b2: "By using principles such as precise typographic hierarchy and asymmetric grids, we guide the eye not through force, but through curiosity. It is a form of respect for the user's time and attention.",
    noteLabel: "Design note",
    noteText: "Every element shown here has been reduced to its essence. Minimizing doesn't mean absence, but deliberate presence. In a branding context, this translates into calm authority.",
    gridLabel: "Explore the sensory elements",
    grid: ["Tactility", "Clarity", "Emotion"],
  },
} as const;

/* ──────────────────── PAGE ──────────────────── */
export default function BrandingArticlePage() {
  const locale = useLocale();
  const isRo = locale === "ro";
  const t = isRo ? T.ro : T.en;
  const cur = isRo ? "Citește" : "Read";
  const gridImgs = [IMG.g1, IMG.g2, IMG.g3];
  const gridBg = ["#ecebE7", "#e7e6e2", "#e1e0db"];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <main className="si bg-[var(--cream)] text-[var(--gray-900)] pt-20 overflow-x-hidden">

        {/* ════ HERO ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] pt-[clamp(40px,6vw,72px)] pb-[clamp(40px,6vw,72px)]">
          <Link href={`/${locale}/jurnal`} data-cur={cur}
            className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.16em] uppercase text-[rgba(13,13,11,0.5)] no-underline mb-[clamp(40px,6vw,72px)] transition-colors hover:text-[var(--black)]">
            <span className="inline-block">←</span> {t.back}
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-8">
              <FadeUp>
                <span className="block text-[11px] font-extrabold tracking-[0.2em] uppercase text-[rgba(13,13,11,0.5)] mb-6">{t.kicker}</span>
                <h1 className="text-[clamp(40px,7vw,84px)] font-extrabold tracking-[-0.04em] leading-[1.02] text-[var(--black)] m-0">{t.title}</h1>
              </FadeUp>
            </div>
            <div className="md:col-span-4 md:pb-2">
              <FadeUp delay={120}>
                <p className="text-[clamp(15px,1.6vw,18px)] font-light italic leading-[1.6] text-[rgba(13,13,11,0.6)] m-0">{t.subtitle}</p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ════ IMAGINE IMPACT ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] mb-[clamp(56px,9vw,120px)]">
          <FadeUp>
            <div className="relative w-full overflow-hidden rounded-lg bg-[#e8e7e3]" style={{ aspectRatio: "16/9" }}>
              <img src={IMG.hero} alt={t.title}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.23,1,.32,1)] hover:scale-[1.04]" />
              <div className="absolute bottom-5 right-5 text-white text-[12px] font-semibold tracking-[0.04em] bg-black/25 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                {t.heroCaption}
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ════ CONTINUT ASIMETRIC ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] mb-[clamp(56px,9vw,120px)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* sidebar meta (fara autor) */}
            <aside className="md:col-span-3 border-t border-[rgba(13,13,11,0.12)] pt-8">
              <div className="md:sticky md:top-28 space-y-8">
                <div>
                  <span className="block text-[11px] font-extrabold tracking-[0.16em] uppercase text-[var(--gray-900)] mb-3">{t.readLabel}</span>
                  <p className="text-[15px] text-[rgba(13,13,11,0.6)] m-0">{t.read}</p>
                </div>
                <div>
                  <span className="block text-[11px] font-extrabold tracking-[0.16em] uppercase text-[var(--gray-900)] mb-3">{t.topicsLabel}</span>
                  <ul className="list-none m-0 p-0 space-y-1.5">
                    {t.topics.map((tp) => (
                      <li key={tp} className="flex items-center gap-2.5 text-[15px] text-[rgba(13,13,11,0.6)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] shrink-0" />{tp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* corp articol */}
            <article className="md:col-span-7 md:col-start-5 space-y-16">
              <div>
                <FadeUp>
                  <h2 className="text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--black)] mt-0 mb-6">{t.h2a}</h2>
                </FadeUp>
                <FadeUp delay={80}>
                  <div className="tj space-y-6 text-[clamp(16px,1.7vw,18px)] leading-[1.75] text-[rgba(13,13,11,0.65)]">
                    <p className="m-0">{t.a1}</p>
                    <p className="m-0">{t.a2}</p>
                  </div>
                </FadeUp>
              </div>

              {/* citat */}
              <FadeUp>
                <blockquote className="py-12 border-y border-[rgba(13,13,11,0.12)] m-0">
                  <p className="text-[clamp(22px,3vw,32px)] font-light italic leading-[1.4] tracking-[-0.02em] text-[var(--black)] m-0">“{t.quote}”</p>
                  <cite className="block not-italic text-[11px] font-extrabold tracking-[0.16em] uppercase text-[rgba(13,13,11,0.5)] mt-6">{t.quoteCite}</cite>
                </blockquote>
              </FadeUp>

              <div>
                <FadeUp>
                  <h2 className="text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--black)] mt-0 mb-6">{t.h2b}</h2>
                </FadeUp>
                <FadeUp delay={80}>
                  <p className="tj text-[clamp(16px,1.7vw,18px)] leading-[1.75] text-[rgba(13,13,11,0.65)] m-0">{t.b1}</p>
                </FadeUp>
                <FadeUp delay={120}>
                  <figure className="my-12 m-0">
                    <div className="overflow-hidden rounded-md bg-[#e8e7e3]">
                      <img src={IMG.lamp} alt={t.figCaption}
                        className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)]" />
                    </div>
                    <figcaption className="text-[13px] italic text-[rgba(13,13,11,0.5)] mt-4">{t.figCaption}</figcaption>
                  </figure>
                </FadeUp>
                <FadeUp delay={80}>
                  <p className="tj text-[clamp(16px,1.7vw,18px)] leading-[1.75] text-[rgba(13,13,11,0.65)] m-0">{t.b2}</p>
                </FadeUp>
              </div>

              {/* note de design — callout */}
              <FadeUp>
                <div className="rounded-md bg-[#e7e6e2] border-l-4 border-[var(--lime)] p-8 md:p-12">
                  <h3 className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-[var(--gray-900)] m-0 mb-4">{t.noteLabel}</h3>
                  <p className="text-[clamp(15px,1.6vw,18px)] italic leading-[1.6] text-[rgba(13,13,11,0.7)] m-0">{t.noteText}</p>
                </div>
              </FadeUp>
            </article>
          </div>
        </section>

        {/* ════ GRID INTERACTIV ════ */}
        <section className="max-w-[1440px] mx-auto px-[var(--page-px)] pb-[clamp(64px,9vw,128px)]">
          <h2 className="text-center text-[11px] font-extrabold tracking-[0.2em] uppercase text-[rgba(13,13,11,0.5)] mb-12">{t.gridLabel}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {t.grid.map((g, i) => (
              <div key={g} data-cur={cur}
                className="group relative overflow-hidden rounded-md flex items-center justify-center p-12 transition-colors duration-500 hover:bg-[var(--gray-900)]"
                style={{ aspectRatio: "1/1", backgroundColor: gridBg[i] }}>
                <span className="relative z-10 text-[clamp(22px,2.6vw,34px)] font-extrabold tracking-[-0.025em] text-[var(--black)] group-hover:text-[var(--lime)] transition-colors duration-500">{g}</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-[800ms] pointer-events-none">
                  <img src={gridImgs[i]} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
