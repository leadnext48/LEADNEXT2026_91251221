import { defineField, defineType } from "sanity";

// Mirrors the cards in src/components/pages/LifeAtLead/SocialMediaPage.tsx
export const socialChannel = defineType({
  name: "socialChannel",
  title: "Social Media Channel",
  type: "document",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "Facebook", value: "facebook" },
          { title: "YouTube", value: "youtube" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Card Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "handle",
      title: "Handle / Page Name",
      type: "string",
      description: "e.g. @leadcollege",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "Link URL",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Card Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "followers",
      title: "Followers Label",
      type: "string",
      description: 'e.g. "12.4K Followers"',
    }),
    defineField({
      name: "cta",
      title: "Button Text",
      type: "string",
      description: 'e.g. "Follow on Instagram"',
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "handle", media: "image" },
  },
});
