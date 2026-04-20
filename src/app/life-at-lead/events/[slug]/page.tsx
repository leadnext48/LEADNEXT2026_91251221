import EventDetailPage from "@/components/pages/LifeAtLead/Events/EventDetails";
import EventsPage from "@/components/pages/LifeAtLead/Events/Events";
import LifeEvents from "@/components/pages/LifeAtLead/LifeEvents";

export const metadata = {
  title: "Events | Life at LEAD",
  description: "LEAD hosts a wide range of academic, cultural, entrepreneurial, and social events throughout the year.",
};

export default function EventsDetail() {
  return (
    <main>
      <EventDetailPage />
    </main>
  );
}
