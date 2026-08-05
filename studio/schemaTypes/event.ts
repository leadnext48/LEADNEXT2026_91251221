import { defineField, defineType } from "sanity";

// Mirrors src/components/pages/LifeAtLead/Events/data.ts
export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "The web address for this event. Click Generate.",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Entrepreneurship",
          "Cultural",
          "Academic",
          "Sports",
          "Workshop",
          "Leadership",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Event Date",
      type: "date",
      options: { dateFormat: "MMMM D, YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short Summary",
      type: "text",
      rows: 3,
      description: "1–2 sentence teaser shown on the events list.",
      validation: (r) => r.required().max(320),
    }),
    defineField({
      name: "body",
      title: "Full Description",
      type: "text",
      rows: 14,
      description:
        "The full write-up. Separate paragraphs with a blank line between them.",
    }),
  ],
  orderings: [
    {
      title: "Event date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
