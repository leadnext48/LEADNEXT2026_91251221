import ReferPage from "@/components/pages/Admissions/ReferPage";

export const metadata = {
  title: "Refer a Student | LEAD College",
  description:
    "Refer a prospective MBA or MCA student to LEAD College (Autonomous). Submit the referral details and our admissions team will take it forward.",
  alternates: { canonical: "/refer" },
};

export default function Refer() {
  return (
    <main>
      <ReferPage />
    </main>
  );
}
