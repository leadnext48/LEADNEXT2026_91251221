import { defineField, defineType } from "sanity";

// For the Life at LEAD video gallery.
export const galleryVideo = defineType({
  name: "galleryVideo",
  title: "Gallery Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube or Vimeo link.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
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
    select: { title: "title", media: "thumbnail" },
  },
});
