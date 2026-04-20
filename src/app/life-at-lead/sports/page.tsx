import LifeSports from "@/components/pages/LifeAtLead/LifeSports";
import Sports from "@/components/pages/LifeAtLead/Sports";

export const metadata = {
  title: "Sports & Recreation | Life at LEAD",
  description: "Physical fitness and recreation at LEAD — indoor and outdoor sports, teamwork, and competitive spirit.",
};

export default function SportsPage() {
  return (
    <main>
      <Sports />
    </main>
  );
}
