import { groq } from "next-sanity";

// ─── Events ───────────────────────────────────────────────────────────────
export const eventsQuery = groq`
  *[_type == "event"] | order(date desc){
    _id,
    title,
    "slug": slug.current,
    category,
    date,
    excerpt,
    image,
    body
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    category,
    date,
    excerpt,
    image,
    body
  }
`;

export const eventSlugsQuery = groq`*[_type == "event" && defined(slug.current)].slug.current`;

// ─── Social channels ──────────────────────────────────────────────────────
export const socialChannelsQuery = groq`
  *[_type == "socialChannel"] | order(order asc){
    _id, platform, title, description, handle, url, image, followers, cta
  }
`;

// ─── Gallery ──────────────────────────────────────────────────────────────
export const galleryPhotosQuery = groq`
  *[_type == "galleryPhoto"] | order(order asc){
    _id, image, alt, caption, category
  }
`;

export const galleryVideosQuery = groq`
  *[_type == "galleryVideo"] | order(order asc){
    _id, title, videoUrl, thumbnail
  }
`;

// ─── Exam resources ───────────────────────────────────────────────────────
// The file URL is resolved here so the download button links straight to it.
export const examResourcesQuery = groq`
  *[_type == "examResource"] | order(publishedAt desc){
    _id,
    title,
    resourceType,
    program,
    publishedAt,
    "fileUrl": file.asset->url
  }
`;
