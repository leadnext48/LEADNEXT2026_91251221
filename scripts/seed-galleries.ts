/**
 * Testing seed: fills each event's `gallery` with several DIFFERENT event photos
 * (drawn from the cover images of the other events) so the frontend carousel
 * shows visually distinct images and doesn't look "stuck" / broken while the
 * college team tests it. No external/stock images are used — only images that
 * already exist on the events.
 *
 * Safe & idempotent:
 *   - The "Onam" event (added manually by the college) is always skipped.
 *   - Only test galleries are overwritten. A gallery is treated as real (and
 *     left alone) as soon as it contains more than one distinct image — i.e.
 *     once the college uploads their own photos.
 *
 * Run:  SANITY_TOKEN=<editor-token> node scripts/seed-galleries.ts
 */
import { createClient } from "@sanity/client";

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

const COPIES = 4; // how many (distinct) gallery photos to seed per event

type RawEvent = {
  _id: string;
  title: string;
  image?: { asset?: { _ref?: string } };
  gallery?: { asset?: { _ref?: string } }[];
};

const events: RawEvent[] = await client.fetch(
  `*[_type == "event"]{ _id, title, image, gallery }`
);

const isOnam = (e: RawEvent) => /onam/i.test(e.title || "");

// Pool of event cover images (excluding Onam) to draw distinct gallery photos from.
const pool = events
  .filter((e) => !isOnam(e) && e.image?.asset?._ref)
  .map((e) => e.image!.asset!._ref as string);

// True only for our seeded galleries: every item is the SAME image. Any real
// upload (2+ distinct images) is treated as college content and left untouched.
function isTestGallery(g: RawEvent["gallery"]): boolean {
  if (!g || g.length === 0) return true; // empty -> safe to seed
  const refs = new Set(g.map((it) => it?.asset?._ref).filter(Boolean));
  return refs.size <= 1;
}

let patched = 0;
let skipped = 0;

for (let i = 0; i < events.length; i++) {
  const e = events[i];

  if (isOnam(e)) {
    console.log("skip (Onam):", e.title);
    skipped++;
    continue;
  }
  if (!isTestGallery(e.gallery)) {
    console.log("skip (real gallery):", e.title);
    skipped++;
    continue;
  }

  const coverRef = e.image?.asset?._ref;
  if (!coverRef) {
    console.warn("skip (no cover image):", e.title);
    skipped++;
    continue;
  }

  // Start with this event's own cover, then add other events' covers so every
  // photo in the carousel is different. Rotate the "others" list by index so
  // each event gets a different mix.
  const others = pool.filter((r) => r !== coverRef);
  const shift = others.length ? i % others.length : 0;
  const rotated = others.slice(shift).concat(others.slice(0, shift));
  const chosen = [coverRef, ...rotated].slice(0, COPIES);

  const gallery = chosen.map((ref, k) => ({
    _type: "image",
    _key: `${e._id}-g${k}`.replace(/[^a-zA-Z0-9]/g, ""),
    asset: { _type: "reference", _ref: ref },
  }));

  await client.patch(e._id).set({ gallery }).commit();
  console.log("patched:", e.title, `(+${gallery.length} distinct photos)`);
  patched++;
}

console.log(`\nDone. Patched ${patched}, skipped ${skipped}.`);
