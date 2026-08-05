import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "./env";

const builder = imageUrlBuilder({ projectId, dataset });

// urlFor(image).width(600).height(400).url()
// Sanity's image pipeline handles resize / crop / format (webp) on its CDN.
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
