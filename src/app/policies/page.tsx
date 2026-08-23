import PoliciesPage from "@/components/pages/Administration/PoliciesPage";

export const metadata = {
  title: "Policies | LEAD College",
  description:
    "Institutional policies of LEAD College (Autonomous) — academic, student, human resources, and governance policies available to view and download.",
  alternates: { canonical: "/policies" },
};

export default function Policies() {
  return (
    <main>
      <PoliciesPage />
    </main>
  );
}
