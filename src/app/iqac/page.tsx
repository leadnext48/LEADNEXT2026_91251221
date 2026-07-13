import fs from "fs";
import path from "path";

import Qualityassurancepage from "@/components/pages/Administration/Qualityassurancepage";

/**
 * Reads the meeting-minutes folder at build time and builds the list of files.
 * Drop a new PDF into `public/accreditations/meeting_minutes` and push —
 * it is picked up automatically, no code changes needed. The display name
 * shown on the site is the file name (without its extension).
 */
function getMeetingMinutes() {
  const dir = path.join(process.cwd(), "public", "accreditations", "meeting_minutes");

  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return files
    .filter((file) => file.toLowerCase().endsWith(".pdf"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file) => ({
      label: file.replace(/\.pdf$/i, ""),
      href: `/accreditations/meeting_minutes/${encodeURIComponent(file)}`,
      type: "pdf" as const,
    }));
}

export default function main() {
  const meetingMinutes = getMeetingMinutes();

  return (
    <main>
      <Qualityassurancepage meetingMinutes={meetingMinutes} />
    </main>
  );
}
