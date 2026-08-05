import { defineField, defineType } from "sanity";

// Mirrors RESULTS / NOTICES / SCHEDULES in ExaminationsPage.tsx.
// The `file` field is the real fix for the currently-dead download buttons.
export const examResource = defineType({
  name: "examResource",
  title: "Exam Result / Notice / Schedule",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "resourceType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Result", value: "result" },
          { title: "Notice", value: "notice" },
          { title: "Schedule", value: "schedule" },
          { title: "Calendar", value: "calendar" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "file",
      title: "PDF / Document",
      type: "file",
      description:
        "Upload the file students download (PDF, DOC, etc.). Optional — leave empty for a text-only notice.",
      options: { accept: ".pdf,.doc,.docx,.xls,.xlsx" },
    }),
    defineField({
      name: "program",
      title: "Program",
      type: "string",
      description: "Optional, e.g. MBA / MCA.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      options: { dateFormat: "MMMM D, YYYY" },
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Published date, newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "resourceType" },
  },
});
