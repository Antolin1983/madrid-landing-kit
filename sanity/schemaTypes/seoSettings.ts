import { defineType, defineField } from "sanity";

export default defineType({
  name: "seoSettings",
  title: "SEO Global Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      initialValue: "en",
    }),
    defineField({
      name: "organizationName",
      title: "Organization name",
      type: "string",
    }),
    defineField({
      name: "organizationType",
      title: "Organization type",
      type: "string",
      options: {
        list: [
          { title: "Educational Organization", value: "EducationalOrganization" },
          { title: "Organization", value: "Organization" },
        ],
      },
    }),
    defineField({
      name: "audience",
      title: "Primary audience",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      initialValue: "Madrid",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      initialValue: "Spain",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default Open Graph image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
