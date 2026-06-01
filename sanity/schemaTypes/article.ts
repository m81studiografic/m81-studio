import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

/* Categoriile = skin-ul vizual de afișare al articolului */
export const CATEGORIES = [
  { title: "Branding & Experience", value: "branding" },
  { title: "Technology & Experience", value: "technology" },
  { title: "Industry Research", value: "research" },
  { title: "Strategic Insights", value: "strategic" },
  { title: "Case Study", value: "case" },
] as const;

/* Subcategorii (industrii) pentru Industry Research.
   Clasificare INTERNĂ: numele nu se afișează încă pe site —
   îl activăm când avem research pe mai multe industrii. */
export const SUBCATEGORIES = [
  { title: "Legal (Avocatură)", value: "legal" },
] as const;

export const article = defineType({
  name: "article",
  title: "Articol",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "ro", title: "Română", default: true },
    { name: "en", title: "English" },
    { name: "meta", title: "Setări" },
  ],
  fields: [
    /* ── Meta / clasificare ── */
    defineField({
      name: "category",
      title: "Categorie (alege stilul de afișare)",
      type: "string",
      group: "meta",
      options: { list: [...CATEGORIES], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subcategory",
      title: "Subcategorie / industrie (doar pt. Industry Research)",
      description:
        "Clasificare internă pe industrie. Numele NU se afișează încă pe site — îl activăm când avem research pe mai multe industrii. Articolul rămâne normal vizibil în Research.",
      type: "string",
      group: "meta",
      options: { list: [...SUBCATEGORIES], layout: "radio" },
      hidden: ({ document }) => document?.category !== "research",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "meta",
      options: { source: "titleRo", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data publicării",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readTime",
      title: "Timp de citire (minute)",
      type: "number",
      group: "meta",
      validation: (r) => r.min(1).max(120),
    }),
    defineField({
      name: "featured",
      title: "Articol principal (apare în hero pe /jurnal)",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
    defineField({
      name: "coverImage",
      title: "Imagine principală (hero)",
      type: "image",
      group: "meta",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Text alternativ" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "topics",
      title: "Topicuri / tag-uri (pentru sidebar)",
      type: "array",
      group: "meta",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "reportUrl",
      title: "Link raport PDF (opțional — skin Strategic)",
      type: "url",
      group: "meta",
    }),

    /* ── Câmpuri Case Study ── */
    defineField({
      name: "caseClient",
      title: "Client (skin Case Study)",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "caseTimeline",
      title: "Durată / timeline (ex: 18 luni)",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "caseServices",
      title: "Servicii (skin Case Study)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "meta",
    }),
    defineField({
      name: "metrics",
      title: "Metrici de impact (skin Case Study)",
      type: "array",
      group: "meta",
      of: [
        {
          type: "object",
          name: "metric",
          fields: [
            { name: "value", type: "string", title: "Valoare (ex: 40%)" },
            { name: "labelRo", type: "string", title: "Etichetă (RO)" },
            { name: "labelEn", type: "string", title: "Etichetă (EN)" },
          ],
          preview: {
            select: { title: "value", subtitle: "labelRo" },
          },
        },
      ],
    }),
    defineField({
      name: "testimonialAuthor",
      title: "Autor testimonial (ex: CEO, Zenith)",
      type: "string",
      group: "meta",
    }),

    /* ── RO ── */
    defineField({
      name: "titleRo",
      title: "Titlu",
      type: "string",
      group: "ro",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitleRo",
      title: "Subtitlu / kicker",
      type: "string",
      group: "ro",
    }),
    defineField({
      name: "excerptRo",
      title: "Rezumat (apare pe listare)",
      type: "text",
      rows: 3,
      group: "ro",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "takeawaysRo",
      title: "Key takeaways (puncte cheie — skin Strategic)",
      type: "array",
      group: "ro",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "testimonialRo",
      title: "Testimonial (skin Case Study)",
      type: "text",
      rows: 3,
      group: "ro",
    }),
    defineField({
      name: "bodyRo",
      title: "Conținut",
      type: "blockContent",
      group: "ro",
    }),

    /* ── EN ── */
    defineField({
      name: "titleEn",
      title: "Title",
      type: "string",
      group: "en",
    }),
    defineField({
      name: "subtitleEn",
      title: "Subtitle / kicker",
      type: "string",
      group: "en",
    }),
    defineField({
      name: "excerptEn",
      title: "Excerpt (shown in listing)",
      type: "text",
      rows: 3,
      group: "en",
    }),
    defineField({
      name: "takeawaysEn",
      title: "Key takeaways (Strategic skin)",
      type: "array",
      group: "en",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "testimonialEn",
      title: "Testimonial (Case Study skin)",
      type: "text",
      rows: 3,
      group: "en",
    }),
    defineField({
      name: "bodyEn",
      title: "Content",
      type: "blockContent",
      group: "en",
    }),
  ],

  preview: {
    select: { title: "titleRo", subtitle: "category", media: "coverImage" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: CATEGORIES.find((c) => c.value === subtitle)?.title || subtitle,
      media,
    }),
  },

  orderings: [
    {
      title: "Cele mai noi",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
