import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schema } from "./schemaTypes";

// Project: "Lead college website" (manage.sanity.io/projects/8ltl696l)
// projectId/dataset are not secrets — safe to keep in source.
export default defineConfig({
  name: "lead-cms",
  title: "LEAD College CMS",
  projectId: "8ltl696l",
  dataset: "production",
  schema,
  plugins: [structureTool(), visionTool()],
});
