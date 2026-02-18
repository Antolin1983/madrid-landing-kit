import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // HEADER
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
    }),
    
    defineField({
      name: "headerLinks",
      title: "Header Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "url", type: "string", title: "URL" },
          ],
        },
      ],
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

    // 🔽 FOOTER (AÑADIR AQUÍ)
    defineField({
      name: "footerCopyright",
      title: "Footer Copyright",
      type: "string",
    }),

    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "url", type: "string", title: "URL" },
          ],
        },
      ],
    }),
  ],
});

