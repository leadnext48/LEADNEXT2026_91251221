/**
 * One-time seed: migrates the existing hardcoded content into Sanity.
 * Idempotent — re-running skips documents that already exist (by _id).
 *
 * Run:  SANITY_TOKEN=<editor-token> node scripts/seed.ts
 */
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EVENTS } from "../src/components/pages/LifeAtLead/Events/data.ts";

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + "/..";

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error("Missing SANITY_TOKEN env var.");
  process.exit(1);
}

const client = createClient({
  projectId: "8ltl696l",
  dataset: "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

const toISO = (d: string) => {
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? "2024-01-01" : dt.toISOString().slice(0, 10);
};

// Pull the set of _ids that already exist so we can skip them.
const existingIds: string[] = await client.fetch(
  `*[_type in ["event","socialChannel","galleryPhoto","examResource"]]._id`
);
const existing = new Set(existingIds);

async function imageFromUrl(url: string, filename: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url} -> ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buf, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function imageFromFile(publicPath: string, filename: string) {
  const buf = await readFile(path.join(ROOT, "public", publicPath));
  const asset = await client.assets.upload("image", buf, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

let created = 0;
let skipped = 0;

// ─── Events ────────────────────────────────────────────────────────────────
for (const e of EVENTS) {
  const _id = `event-${e.slug}`;
  if (existing.has(_id)) { skipped++; continue; }
  try {
    const image = await imageFromUrl(e.image, `${e.slug}.jpg`);
    await client.createOrReplace({
      _id, _type: "event",
      title: e.title,
      slug: { _type: "slug", current: e.slug },
      category: e.category,
      date: toISO(e.date),
      image,
      excerpt: e.excerpt,
      body: e.body,
    });
    created++; console.log("event:", e.slug);
  } catch (err) { console.warn("SKIP event", e.slug, (err as Error).message); }
}

// ─── Social channels ─────────────────────────────────────────────────────────
const SOCIAL = [
  { id: "ig-1", platform: "instagram", title: "Campus Life Highlights", description: "Daily snapshots of campus events, student achievements, and life at LEAD.", handle: "@leadcollege", url: "https://www.instagram.com/leadcollege", followers: "12.4K Followers", cta: "Follow on Instagram" },
  { id: "fb-1", platform: "facebook", title: "LEAD Official Page", description: "Official announcements, event updates, and community stories from LEAD College.", handle: "LEAD College", url: "https://www.facebook.com/leadcollege", followers: "28.7K Followers", cta: "Like on Facebook" },
  { id: "yt-1", platform: "youtube", title: "LEAD TV", description: "Full recordings of seminars, convocations, guest lectures, and campus tours.", handle: "LEAD College Official", url: "https://www.youtube.com/@leadcollege", followers: "9.1K Subscribers", cta: "Subscribe on YouTube" },
  { id: "ig-2", platform: "instagram", title: "Student Stories", description: "Voices from the community — student journeys, internships, and milestone moments.", handle: "@leadstudents", url: "https://www.instagram.com/leadcollege", followers: "7.2K Followers", cta: "Follow on Instagram" },
  { id: "yt-2", platform: "youtube", title: "Knowledge Series", description: "Curated talks, panel discussions, and academic sessions from LEAD's thought leaders.", handle: "LEAD Knowledge Hub", url: "https://www.youtube.com/@leadcollege", followers: "5.8K Subscribers", cta: "Subscribe on YouTube" },
  { id: "fb-2", platform: "facebook", title: "LEAD Alumni Network", description: "Stay connected with the ever-growing LEAD alumni community across the globe.", handle: "LEAD Alumni", url: "https://www.facebook.com/leadcollege", followers: "14.3K Members", cta: "Join the Group" },
  { id: "ig-3", platform: "instagram", title: "Events & Fests", description: "Behind-the-scenes coverage of LEAD's biggest cultural and academic events.", handle: "@leadevents", url: "https://www.instagram.com/leadcollege", followers: "6.5K Followers", cta: "Follow on Instagram" },
  { id: "fb-3", platform: "facebook", title: "Admissions & Updates", description: "Prospective student queries, admission cycles, and important college notices.", handle: "LEAD Admissions", url: "https://www.facebook.com/leadcollege", followers: "19.0K Followers", cta: "Follow for Updates" },
  { id: "yt-3", platform: "youtube", title: "Campus Tour & Vlogs", description: "First-person walkthroughs of LEAD's campus, labs, hostels, and common spaces.", handle: "LEAD Campus", url: "https://www.youtube.com/@leadcollege", followers: "3.4K Subscribers", cta: "Subscribe on YouTube" },
];
for (let i = 0; i < SOCIAL.length; i++) {
  const s = SOCIAL[i];
  const _id = `social-${s.id}`;
  if (existing.has(_id)) { skipped++; continue; }
  await client.createOrReplace({ _id, _type: "socialChannel", ...s, order: i + 1 });
  created++; console.log("social:", s.title);
}

// ─── Gallery photos (real local campus images) ───────────────────────────────
const PHOTOS = [
  { id: "p-01", src: "convert/LEAD01.webp", alt: "Classroom engagement", caption: "Classroom Engagement" },
  { id: "p-02", src: "convert/LEAD02.webp", alt: "Incubation activities", caption: "Incubation Activities" },
  { id: "p-03", src: "convert/LEAD03.webp", alt: "Student celebrations", caption: "Student Celebrations" },
  { id: "p-04", src: "convert/LEAD04.webp", alt: "Sports events", caption: "Sports Events" },
  { id: "p-05", src: "convert/LEAD05.webp", alt: "Campus life", caption: "Campus Life" },
  { id: "p-06", src: "convert/LEAD06x.webp", alt: "Industry interactions", caption: "Industry Interactions" },
  { id: "p-07", src: "convert/LEAD07x.webp", alt: "Cultural events", caption: "Cultural Events" },
  { id: "p-08", src: "convert/LEAD08x.webp", alt: "Leadership programs", caption: "Leadership Programs" },
  { id: "p-09", src: "convert/LEAD09.webp", alt: "Campus greenery", caption: "Campus Greenery" },
  { id: "p-10", src: "convert/LEAD10.webp", alt: "Tech workshop", caption: "Tech Workshop" },
  { id: "p-11", src: "convert/LEAD11.webp", alt: "Seminar hall", caption: "Seminar Hall" },
  { id: "p-12", src: "convert/LEAD12.webp", alt: "Student collaboration", caption: "Student Collaboration" },
  { id: "p-13", src: "convert/LEAD13.webp", alt: "Convocation ceremony", caption: "Convocation Ceremony" },
  { id: "p-14", src: "convert/LEAD14.webp", alt: "Library reading", caption: "Library Reading" },
  { id: "p-15", src: "convert/LEAD15.webp", alt: "Guest lecture", caption: "Guest Lecture" },
  { id: "p-16", src: "convert/LEAD16.webp", alt: "Annual day celebration", caption: "Annual Day Celebration" },
  { id: "p-17", src: "convert/LEAD17.webp", alt: "Team building", caption: "Team Building Activity" },
  { id: "p-18", src: "convert/LEAD18x.webp", alt: "Research presentation", caption: "Research Presentation" },
  { id: "p-19", src: "convert/LEAD19x.webp", alt: "Outdoor activity", caption: "Outdoor Activity" },
  { id: "p-20", src: "convert/LEAD20.webp", alt: "Campus tour", caption: "Campus Tour" },
  { id: "p-21", src: "convert/LEAD21.webp", alt: "Hackathon event", caption: "Hackathon Event" },
  { id: "p-22", src: "convert/LEAD22.webp", alt: "Note taking session", caption: "Note Taking Session" },
  { id: "p-23", src: "convert/LEAD23.webp", alt: "Morning assembly", caption: "Morning Assembly" },
  { id: "p-24", src: "convert/LEAD24.webp", alt: "Classroom discussion", caption: "Classroom Discussion" },
];
for (let i = 0; i < PHOTOS.length; i++) {
  const p = PHOTOS[i];
  const _id = `photo-${p.id}`;
  if (existing.has(_id)) { skipped++; continue; }
  try {
    const image = await imageFromFile(p.src, path.basename(p.src));
    await client.createOrReplace({ _id, _type: "galleryPhoto", image, alt: p.alt, caption: p.caption, order: i + 1 });
    created++; console.log("photo:", p.caption);
  } catch (err) { console.warn("SKIP photo", p.id, (err as Error).message); }
}

// ─── Exam resources (metadata only — college attaches real PDFs later) ───────
const EXAMS: { title: string; resourceType: string; date: string }[] = [
  { title: "MBA Semester 2 Results - May 2024", resourceType: "result", date: "2024-05-20" },
  { title: "MCA Final Year Results - 2024", resourceType: "result", date: "2024-05-10" },
  { title: "Supplementary Examination Results - March 2024", resourceType: "result", date: "2024-03-15" },
  { title: "MBA Semester 1 Results - November 2023", resourceType: "result", date: "2023-11-25" },
  { title: "MCA Semester 3 Results - December 2023", resourceType: "result", date: "2023-12-18" },
  { title: "Arrear Results - February 2024", resourceType: "result", date: "2024-02-12" },
  { title: "Important Notice: Exam Hall Ticket Download", resourceType: "notice", date: "2024-04-01" },
  { title: "Revised Examination Schedule for MBA Program", resourceType: "notice", date: "2024-03-28" },
  { title: "Instructions for Online Examination", resourceType: "notice", date: "2024-03-20" },
  { title: "Notice: Revaluation Application Window Open", resourceType: "notice", date: "2024-06-05" },
  { title: "Examination Fee Payment Deadline Extended", resourceType: "notice", date: "2024-05-30" },
  { title: "MBA Final Examination Schedule - Semester 2", resourceType: "schedule", date: "2024-04-15" },
  { title: "MCA Mid-Term Examination Schedule", resourceType: "schedule", date: "2024-02-01" },
  { title: "Annual Examination Calendar 2024-25", resourceType: "calendar", date: "2024-07-01" },
  { title: "Supplementary Exam Schedule - August 2024", resourceType: "schedule", date: "2024-07-20" },
  { title: "Internal Assessment Schedule - October 2024", resourceType: "schedule", date: "2024-09-25" },
];
for (const x of EXAMS) {
  const _id = `exam-${slugify(x.title)}`;
  if (existing.has(_id)) { skipped++; continue; }
  await client.createOrReplace({ _id, _type: "examResource", title: x.title, resourceType: x.resourceType, publishedAt: x.date });
  created++; console.log("exam:", x.title);
}

console.log(`\nDone. Created ${created}, skipped ${skipped} (already existed).`);
