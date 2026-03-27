export interface Project {
  slug: string
  title: string
  category: string
  year: string
  tags: string[]
  image: string
  description?: string
  description2?: string
}

export const projects: Project[] = [
  {
    slug: "nord-roast",
    title: "Nord Roast",
    category: "Brand Identity & Packaging",
    year: "2025",
    tags: ["Branding", "Packaging"],
    image: "/projects/nord-roast/nord-roast-hero.png",
    description: "Nord Roast este un concept de brand de cafea specialty inspirat de minimalismul nordic și de ritualul cafelei de dimineață. Identitatea vizuală se bazează pe tipografie curată, tonuri naturale și un design de ambalaj simplu și elegant.",
    description2: "Paleta de culori este inspirată din natură — bej cald, verde închis și accente de negru mat — iar tipografia combină un serif clasic cu un sans-serif modern.",
  },
  {
    slug: "lune-atelier",
    title: "Luné Atelier",
    category: "Brand Identity & Digital Presence",
    year: "2025",
    tags: ["Branding", "Digital"],
    image: "/projects/lune-atelier/lune-atelier-hero.png",
    description: "Luné Atelier este un concept de brand pentru un salon de înfrumusețare contemporan, construit în jurul ideii de rafinament, echilibru și îngrijire premium. Identitatea vizuală combină tipografie elegantă, tonuri soft și un sistem vizual minimalist, gândit pentru a transmite calm, încredere și sofisticare.",
    description2: "Sistemul de brand este construit pentru consistență pe toate punctele de contact — de la interiorul salonului și materialele tipărite până la prezența digitală și experiența de booking.",
  },
  {
    slug: "oliva",
    title: "Oliva",
    category: "Brand Identity & Digital Presence",
    year: "2025",
    tags: ["Branding", "Digital"],
    image: "/projects/oliva/oliva-hero.png",
    description: "Oliva este un concept de brand pentru un restaurant mediteranean contemporan, construit în jurul ideii de simplitate, prospețime și experiență culinară autentică. Identitatea vizuală combină căldura materialelor naturale cu un limbaj grafic curat și modern.",
    description2: "Sistemul de brand acoperă toate punctele de contact — de la meniu și semnalistică până la prezența digitală și materialele de comunicare.",
  },
  {
    slug: "maison-croissant",
    title: "Maison Croissant",
    category: "Brand Identity & Packaging",
    year: "2025",
    tags: ["Branding", "Packaging"],
    image: "/projects/maison-croissant/maison-croissant-hero.png",
    description: "Maison Croissant este un concept de brand pentru o patiserie contemporană inspirată de estetica pariziană și cultura produselor artizanale. Identitatea vizuală combină tipografie elegantă, o paletă cromatică caldă și un sistem de ambalaje minimalist.",
    description2: "Brandul explorează ideea de patiserie premium modernă, unde produsul, ambalajul și experiența vizuală funcționează împreună pentru a crea o identitate coerentă.",
  },
  {
    slug: "cantina",
    title: "Cantina",
    category: "Brand Identity & Digital Presence",
    year: "2025",
    tags: ["Branding", "Packaging", "Digital"],
    image: "/projects/cantina/cantina-hero.png",
    description: "Cantina este un concept de brand pentru un wine bar contemporan construit în jurul ideii de social dining și cultură europeană a vinului. Identitatea vizuală combină tipografie elegantă, o paletă cromatică caldă și un sistem grafic minimalist gândit pentru a transmite rafinament, atmosferă și experiență gastronomică.",
    description2: "Sistemul de brand este construit pentru consistență pe toate punctele de contact — de la etichetele de vin și ambalaje până la meniuri, semnalistică și experiența digitală.",
  },
  {
    slug: "salt",
    title: "SALT",
    category: "Brand Identity & Digital Presence",
    year: "2025",
    tags: ["Branding", "Packaging", "Digital"],
    image: "/projects/salt/salt-hero.png",
    description: "SALT este un concept de brand pentru un restaurant urban contemporan construit în jurul ideii de mâncare simplă, ingrediente bune și experiență socială. Identitatea vizuală combină tipografie puternică, o paletă cromatică vibrantă și un sistem grafic minimalist care reflectă energia spațiilor de street food moderne.",
    description2: "Brandul este gândit pentru consistență pe toate punctele de contact — de la ambalaje și materiale tipărite până la semnalistică, social media și experiența digitală.",
  },
]
