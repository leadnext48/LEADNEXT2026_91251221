import SocialMediaPage from "@/components/pages/LifeAtLead/SocialMediaPage";
import { getSocialChannels } from "@/sanity/fetch";

export const metadata = {
  title: "Social Media | Life at LEAD",
  description: "Connect with LEAD College across Instagram, Facebook, and YouTube — campus highlights, events, and student stories.",
};

export default async function SocialMedia() {
  const channels = await getSocialChannels();
  return (
    <main>
      <SocialMediaPage channels={channels} />
    </main>
  );
}
