import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook target. When an editor publishes a change, Sanity POSTs here
 * and we refresh the content-driven pages immediately (otherwise they refresh
 * on their own within ~60s via ISR).
 *
 * Configure in Sanity → API → Webhooks:
 *   URL:     https://<your-domain>/api/revalidate
 *   Trigger: Create / Update / Delete
 *   Secret:  same value as SANITY_REVALIDATE_SECRET
 */
const CONTENT_PATHS = [
  "/life-at-lead/events",
  "/life-at-lead/social-media",
  "/life-at-lead/gallery",
  "/life-at-lead/photo-gallery",
  "/examinations",
];

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    for (const path of CONTENT_PATHS) revalidatePath(path);
    // Event detail pages share a dynamic route — refresh them all.
    revalidatePath("/life-at-lead/events/[slug]", "page");

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error("Revalidate webhook error:", err);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
