import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `false` on the server so publishes show up fast via revalidation;
  // set to true only for high-traffic cached reads if needed.
  useCdn: true,
});
