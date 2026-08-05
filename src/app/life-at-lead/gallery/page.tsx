import LifePhotoGallery from "@/components/pages/LifeAtLead/LifeVideoGallery";
import { getGalleryPhotos } from "@/sanity/fetch";

export const metadata = {
  title: "Gallery | Life at LEAD",
  description: "Photo gallery capturing memorable campus moments and the spirit of Life at LEAD.",
};

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();
  return (
    <main>
      <LifePhotoGallery photos={photos} />
    </main>
  );
}
