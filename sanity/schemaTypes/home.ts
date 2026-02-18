import { defineType, defineField } from "sanity";

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título principal",
      type: "string",
    }),

    // 🔵 PRIMER BLOQUE LEARN
    defineField({
      name: "learnSection",
      title: "Learn Section (Top)",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "subheading",
          title: "Subheading",
          type: "text",
          rows: 5,
        }),
        defineField({
          name: "body",
          title: "Body Text",
          type: "text",
          rows: 10,
        }),
        defineField({
          name: "ctaText",
          title: "CTA Text",
          type: "string",
        }),
        defineField({
          name: "ctaUrl",
          title: "CTA URL",
          type: "string",
        }),
      ],
    }),

    // 🟢 SEGUNDO BLOQUE LEARN
    defineField({
      name: "learnSectionBottom",
      title: "Learn Section (Bottom)",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "subheading",
          title: "Subheading",
          type: "text",
          rows: 5,
        }),
        defineField({
          name: "body",
          title: "Body Text",
          type: "text",
          rows: 10,
        }),
        defineField({
          name: "ctaText",
          title: "CTA Text",
          type: "string",
        }),
        defineField({
          name: "ctaUrl",
          title: "CTA URL",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "text",
    }),
  ],
});


