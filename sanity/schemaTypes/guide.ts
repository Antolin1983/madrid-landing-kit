
// sanity/schemaTypes/guide.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: {
    source: "title",
    maxLength: 96,
  },
  validation: (Rule) => Rule.required(),
}),

defineField({
  name: "featured",
  title: "Featured guide",
  type: "boolean",
  description: "Show this guide on the Home page",
  initialValue: false,
}),

defineField({
  name: "seoTitle",
  title: "SEO Title",
  type: "string",
  description: "Title shown in Google results",
  validation: (Rule) => Rule.max(60),
}),


    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for search engines',
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: 'targetAudience',
      title: 'Target audience',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'US Parents', value: 'us-parents' },
          { title: 'US Students', value: 'us-students' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'lastUpdated',
      title: 'Last updated',
      type: 'datetime',
      description: 'Manually update when content changes',
    }),

    defineField({
      name: 'relatedGuides',
      title: 'Related guides',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'guide' }],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'targetAudience',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle?.join(', '),
      }
    },
  },
})
