import { notFound } from "next/navigation";
import EventDetailPage from "@/components/pages/LifeAtLead/Events/EventDetails";
import { getEvent, getEventSlugs } from "@/sanity/fetch";

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getEvent(slug);
  if (!data) return { title: "Event | Life at LEAD" };
  return { title: `${data.event.title} | Life at LEAD`, description: data.event.excerpt };
}

export default async function EventsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getEvent(slug);
  if (!data) notFound();
  return (
    <main>
      <EventDetailPage event={data.event} related={data.related} />
    </main>
  );
}
