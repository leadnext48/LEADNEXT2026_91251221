import "server-only";

import { client } from "./client";
import { urlFor } from "./image";
import {
  eventsQuery,
  eventBySlugQuery,
  eventSlugsQuery,
  socialChannelsQuery,
  galleryPhotosQuery,
  examResourcesQuery,
} from "./queries";

// Pages cache each Sanity query for 60s (ISR), so edits appear within ~1 minute
// automatically. The revalidation webhook (src/app/api/revalidate) makes it
// instant when configured. Reads are also served from Sanity's CDN (useCdn).
const opts = { next: { revalidate: 60 } };

// "2024-03-14" -> "March 14, 2024" (matches the original hardcoded format)
function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// ─── Events ──────────────────────────────────────────────────────────────
export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  gallery: string[];
  excerpt: string;
  body: string;
}

interface RawEvent {
  _id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string;
  image: Parameters<typeof urlFor>[0];
  gallery?: Parameters<typeof urlFor>[0][];
}

function mapEvent(e: RawEvent): EventItem {
  return {
    id: e._id,
    slug: e.slug,
    title: e.title,
    category: e.category,
    date: formatDate(e.date),
    image: e.image ? urlFor(e.image).width(900).auto("format").url() : "",
    gallery: (e.gallery || []).map((g) => urlFor(g).width(1400).auto("format").url()),
    excerpt: e.excerpt,
    body: e.body || "",
  };
}

export async function getEvents(): Promise<EventItem[]> {
  const rows = await client.fetch<RawEvent[]>(eventsQuery, {}, opts);
  return rows.map(mapEvent);
}

export async function getEvent(
  slug: string
): Promise<{ event: EventItem; related: EventItem[] } | null> {
  const row = await client.fetch<RawEvent | null>(eventBySlugQuery, { slug }, opts);
  if (!row) return null;
  const all = await getEvents();
  const related = all.filter((e) => e.slug !== slug).slice(0, 3);
  return { event: mapEvent(row), related };
}

export async function getEventSlugs(): Promise<string[]> {
  return client.fetch<string[]>(eventSlugsQuery, {}, opts);
}

// ─── Social channels ─────────────────────────────────────────────────────
export interface SocialItem {
  id: string;
  platform: "instagram" | "facebook" | "youtube";
  title: string;
  description: string;
  handle: string;
  url: string;
  image: string | null;
  followers: string;
  cta: string;
}

export async function getSocialChannels(): Promise<SocialItem[]> {
  const rows = await client.fetch<
    (Omit<SocialItem, "image"> & { _id: string; image?: Parameters<typeof urlFor>[0] })[]
  >(socialChannelsQuery, {}, opts);
  return rows.map((r) => ({
    id: r._id,
    platform: r.platform,
    title: r.title,
    description: r.description,
    handle: r.handle,
    url: r.url,
    image: r.image ? urlFor(r.image).width(700).auto("format").url() : null,
    followers: r.followers,
    cta: r.cta,
  }));
}

// ─── Gallery photos ──────────────────────────────────────────────────────
export interface GalleryPhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export async function getGalleryPhotos(): Promise<GalleryPhotoItem[]> {
  const rows = await client.fetch<
    { _id: string; alt: string; caption?: string; image: Parameters<typeof urlFor>[0] }[]
  >(galleryPhotosQuery, {}, opts);
  return rows.map((r) => ({
    id: r._id,
    src: urlFor(r.image).width(1000).auto("format").url(),
    alt: r.alt,
    caption: r.caption || r.alt,
  }));
}

// ─── Exam resources ──────────────────────────────────────────────────────
export type ExamType = "result" | "notice" | "schedule" | "calendar";
export interface ExamItem {
  id: string;
  title: string;
  type: ExamType;
  fileUrl: string | null;
  publishedAt: string;
}

export async function getExamResources(): Promise<{
  results: ExamItem[];
  notices: ExamItem[];
  schedules: ExamItem[];
}> {
  const rows = await client.fetch<
    { _id: string; title: string; resourceType: ExamType; fileUrl: string | null; publishedAt: string }[]
  >(examResourcesQuery, {}, opts);
  const items: ExamItem[] = rows.map((r) => ({
    id: r._id,
    title: r.title,
    type: r.resourceType,
    fileUrl: r.fileUrl,
    publishedAt: r.publishedAt,
  }));
  return {
    results: items.filter((i) => i.type === "result"),
    notices: items.filter((i) => i.type === "notice"),
    schedules: items.filter((i) => i.type === "schedule" || i.type === "calendar"),
  };
}
