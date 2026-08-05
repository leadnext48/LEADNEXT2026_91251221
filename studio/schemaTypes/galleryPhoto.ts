import { defineField, defineType } from "sanity";

// Mirrors the PHOTOS array in LifePhotoGallery.tsx
export const galleryPhoto = defineType({
  name: "galleryPhoto",
  title: "Gallery Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the photo (used for accessibility & SEO).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Short label shown on the photo card and lightbox.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Optional grouping, e.g. Sports, Cultural, Campus.",
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
    select: { title: "alt", subtitle: "category", media: "image" },
  },
});
