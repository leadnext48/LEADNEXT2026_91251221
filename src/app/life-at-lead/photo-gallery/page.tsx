import LifePhotoGallery from "@/components/pages/LifeAtLead/LifePhotoGallery";
import { getGalleryPhotos } from "@/sanity/fetch";

export const metadata = {
  title: "Photo Gallery | Life at LEAD",
  description: "The Photo Gallery documents memorable campus moments — from classroom engagement to sports events and celebrations.",
};

export default async function PhotoGalleryPage() {
  const photos = await getGalleryPhotos();
  return (
    <main>
      <LifePhotoGallery photos={photos} />
    </main>
  );
}
