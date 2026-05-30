import { defineType, defineArrayMember, defineField } from "sanity";

/* ──────────────────────────────────────────────────────────────
   Corpul articolului (Portable Text) — reutilizat pentru ro & en.
   Conține blocuri standard + blocuri speciale M81 inserabile:
   figure, pullQuote, callout, codeBlock.
   ────────────────────────────────────────────────────────────── */
export const blockContent = defineType({
  title: "Conținut",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraf", value: "normal" },
        { title: "Titlu mare (H2)", value: "h2" },
        { title: "Subtitlu (H3)", value: "h3" },
        { title: "Mic (H4)", value: "h4" },
        { title: "Lead (intro)", value: "blockquote" },
      ],
      lists: [
        { title: "Listă", value: "bullet" },
        { title: "Numerotată", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Cod", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (r) =>
                  r.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              },
            ],
          },
        ],
      },
    }),

    /* ── Imagine cu legendă (grayscale → color la hover) ── */
    defineArrayMember({
      type: "image",
      name: "figure",
      title: "Imagine",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Text alternativ (SEO/accesibilitate)",
        }),
        defineField({ name: "captionRo", type: "string", title: "Legendă (RO)" }),
        defineField({ name: "captionEn", type: "string", title: "Legendă (EN)" }),
      ],
    }),

    /* ── Citat evidențiat (bară lime în stânga) ── */
    defineArrayMember({
      type: "object",
      name: "pullQuote",
      title: "Citat evidențiat",
      fields: [
        defineField({ name: "text", type: "text", rows: 3, title: "Text" }),
        defineField({ name: "attribution", type: "string", title: "Sursă (opțional)" }),
      ],
      preview: {
        select: { title: "text" },
        prepare: ({ title }) => ({ title: `“${title}”`, subtitle: "Citat" }),
      },
    }),

    /* ── Notă / callout (cutie cu fundal + bară lime) ── */
    defineArrayMember({
      type: "object",
      name: "callout",
      title: "Notă (callout)",
      fields: [
        defineField({ name: "label", type: "string", title: "Etichetă (ex: Notă de design)" }),
        defineField({ name: "text", type: "text", rows: 3, title: "Text" }),
      ],
      preview: {
        select: { title: "label", subtitle: "text" },
        prepare: ({ title, subtitle }) => ({ title: title || "Notă", subtitle }),
      },
    }),

    /* ── Bloc de cod (fundal dark, mono) ── */
    defineArrayMember({
      type: "object",
      name: "codeBlock",
      title: "Bloc de cod",
      fields: [
        defineField({
          name: "language",
          type: "string",
          title: "Limbaj",
          options: {
            list: ["javascript", "typescript", "tsx", "html", "css", "bash", "json", "glsl", "wgsl"],
          },
        }),
        defineField({ name: "filename", type: "string", title: "Nume fișier (opțional)" }),
        defineField({ name: "code", type: "text", rows: 12, title: "Cod" }),
      ],
      preview: {
        select: { title: "filename", subtitle: "language" },
        prepare: ({ title, subtitle }) => ({ title: title || "Cod", subtitle }),
      },
    }),

    /* ── Declarație / concluzie (bloc dark, accent lime) ── */
    defineArrayMember({
      type: "object",
      name: "statement",
      title: "Declarație (bloc dark)",
      fields: [
        defineField({ name: "heading", type: "string", title: "Titlu (opțional, ex: Concluzie)" }),
        defineField({ name: "text", type: "text", rows: 4, title: "Text" }),
      ],
      preview: {
        select: { title: "heading", subtitle: "text" },
        prepare: ({ title, subtitle }) => ({ title: title || "Declarație", subtitle }),
      },
    }),
  ],
});
