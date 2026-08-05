import EventsPage from "@/components/pages/LifeAtLead/Events/Events";
import { getEvents } from "@/sanity/fetch";

export const metadata = {
  title: "Events | Life at LEAD",
  description: "LEAD hosts a wide range of academic, cultural, entrepreneurial, and social events throughout the year.",
};

export default async function Events() {
  const events = await getEvents();
  return (
    <main>
      <EventsPage events={events} />
    </main>
  );
}
