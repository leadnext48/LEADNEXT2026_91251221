import ExaminationsPage from "@/components/pages/Academics/ExaminationsPage";
import { getExamResources } from "@/sanity/fetch";

export const metadata = {
  title: "Examinations | LEAD College",
  description: "Examination results, notices, schedules, and downloads from the Office of Examinations at LEAD College.",
};

export default async function Examinations() {
  const { results, notices, schedules } = await getExamResources();
  return (
    <main>
      <ExaminationsPage results={results} notices={notices} schedules={schedules} />
    </main>
  );
}
