import type { SchemaTypeDefinition } from "sanity";

import { event } from "./event";
import { socialChannel } from "./socialChannel";
import { galleryPhoto } from "./galleryPhoto";
import { galleryVideo } from "./galleryVideo";
import { examResource } from "./examResource";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, socialChannel, galleryPhoto, galleryVideo, examResource],
};
