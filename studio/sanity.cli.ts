import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "8ltl696l",
    dataset: "production",
  },
  // Hosted editor URL: https://leadcollege.sanity.studio
  studioHost: "leadcollege",
  deployment: { autoUpdates: true, appId: "czgr5u0tidpt6hjvzo13q50t" },
});
