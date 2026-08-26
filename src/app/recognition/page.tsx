import type { Metadata } from "next";
import Link from "next/link";
import { cinzel, playfair } from "@/app/fonts";

const SITE_URL = "https://lead.ac.in";

export const metadata: Metadata = {
  title: "Recognition, Accreditation & Rankings",
  description:
    "LEAD College (Autonomous), Palakkad — AICTE approved, NAAC (B++) and NBA accredited, ISO 21001:2018 certified and autonomous under the University of Calicut. See LEAD's accreditations, national B-school recognition and answers to common questions about MBA & MCA in Kerala.",
  keywords: [
    "LEAD College accreditation",
    "is LEAD College good",
    "best MBA college in Kerala",
    "top MBA colleges in Palakkad",
    "AICTE approved MBA college Kerala",
    "NAAC accredited MBA college",
    "autonomous MBA college Kerala",
  ],
  alternates: { canonical: "/recognition" },
  openGraph: {
    type: "website",
    url: "/recognition",
    title: "Recognition, Accreditation & Rankings | LEAD College",
    description:
      "AICTE approved, NAAC (B++) and NBA accredited, ISO 21001:2018 certified, autonomous under the University of Calicut — with a 90%+ placement record.",
    images: ["/logolead.png"],
  },
};

const BLUE = "#005C9F";
const SECTIONX = "clamp(1.5rem,6vw,8rem)";

// Verifiable institutional recognitions (as shown across the site).
const ACCREDITATIONS: { name: string; body: string }[] = [
  { name: "AICTE Approved", body: "All India Council for Technical Education" },
  { name: "NAAC Accredited", body: "Assessed with a B++ grade" },
  { name: "NBA Accredited", body: "National Board of Accreditation" },
  { name: "ISO 21001:2018", body: "Educational Organisation Management System" },
  { name: "UGC Recognised", body: "University Grants Commission" },
  { name: "Autonomous Status", body: "Under the University of Calicut" },
];

// FAQ — used for BOTH the visible section and the FAQPage structured data,
// so the on-page text and the schema always match (Google requirement).
const FAQ: { q: string; a: string }[] = [
  {
    q: "Is LEAD College a good MBA college in Kerala?",
    a: "LEAD College (Autonomous) is one of Kerala's well-recognised residential MBA institutions. Located in Dhoni, Palakkad, it is AICTE-approved, NAAC (B++) and NBA accredited, ISO 21001:2018 certified, and holds autonomous status under the University of Calicut. Its industry-integrated model — with internships every semester and a 90%+ placement record — makes it a strong choice for an application-focused MBA in Kerala.",
  },
  {
    q: "Where is LEAD College located?",
    a: "LEAD College (Autonomous) is located at Dhoni PO, Palakkad, Kerala 678009, India — a fully residential campus set near the Dhoni hills.",
  },
  {
    q: "Is LEAD College AICTE approved and accredited?",
    a: "Yes. LEAD College is approved by AICTE, accredited by NAAC with a B++ grade and by NBA, certified to ISO 21001:2018, recognised by the UGC, and operates with autonomous status under the University of Calicut.",
  },
  {
    q: "What programmes does LEAD College offer?",
    a: "LEAD offers a 2-year full-time residential MBA, a future-ready MCA (covering AI & Machine Learning, Data Science, Cloud Computing and Cyber Security), and doctoral / research opportunities as a recognised research centre of KUFOS.",
  },
  {
    q: "What is the placement record at LEAD College?",
    a: "LEAD maintains a 90%+ placement consistency, with 235+ recruiters visiting campus — including Federal Bank, HDFC Life, Axis Bank and HCL — supported by six months of structured pre-placement training.",
  },
  {
    q: "Is LEAD an autonomous, residential MBA college?",
    a: "Yes. LEAD holds autonomous status under the University of Calicut and is a fully residential campus, giving students 24×7 access to faculty, library and facilities as part of its immersive, mentorship-driven learning model.",
  },
  {
    q: "Which university is LEAD College affiliated to?",
    a: "LEAD College is affiliated to the University of Calicut and holds autonomous status, which lets it design an industry-relevant, outcome-based curriculum.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Recognition & Accreditation", item: `${SITE_URL}/recognition` },
  ],
};

export default function RecognitionPage() {
  return (
    <main style={{ background: "#ffffff" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <style>{`
        .rec-accred-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 1rem; }
        .rec-featured { display: flex; flex-wrap: wrap; gap: .75rem 1.4rem; }
      `}</style>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: `clamp(5rem,10vh,8rem) ${SECTIONX} clamp(4rem,8vh,7rem)` }}>

        {/* Hero */}
        <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.62rem,.8vw,.72rem)", letterSpacing: ".26em", textTransform: "uppercase", color: BLUE, fontWeight: 700, margin: "0 0 .8rem" }}>
          Recognition &amp; Accreditation
        </p>
        <h1 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.8rem,4vw,3.4rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.025em", color: "#0D0D0D", margin: "0 0 1.2rem", lineHeight: 1.02 }}>
          Accredited, Autonomous &amp; Recognised
        </h1>
        <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.95rem,1.15vw,1.1rem)", lineHeight: 1.8, color: "#444", maxWidth: "70ch", margin: 0 }}>
          LEAD College (Autonomous) — formerly LEAD College of Management — is an{" "}
          <strong>AICTE-approved</strong> business and technology institution in Dhoni, Palakkad, Kerala,
          offering industry-integrated, fully residential <strong>MBA</strong> and <strong>MCA</strong> programmes.
          It is accredited by <strong>NAAC (B++)</strong> and <strong>NBA</strong>, certified to{" "}
          <strong>ISO 21001:2018</strong>, recognised by the <strong>UGC</strong>, and holds{" "}
          <strong>autonomous status under the University of Calicut</strong> — with a consistent{" "}
          <strong>90%+ placement record</strong> across 235+ recruiters.
        </p>

        {/* Accreditations */}
        <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.1rem,2vw,1.7rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.02em", color: "#0D0D0D", margin: "clamp(3rem,6vh,4.5rem) 0 1.4rem" }}>
          Approvals &amp; Accreditations
        </h2>
        <div className="rec-accred-grid">
          {ACCREDITATIONS.map((a) => (
            <div key={a.name} style={{ border: "1px solid #E8EEF4", borderRadius: 12, padding: "1.3rem 1.4rem", background: "#fff", boxShadow: "0 2px 12px rgba(0,92,159,.04)" }}>
              <div style={{ width: 34, height: 3, background: `linear-gradient(90deg,${BLUE},#1e3a8a)`, borderRadius: 2, marginBottom: ".9rem" }} />
              <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.9rem,1.1vw,1rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".03em", color: "#0D0D0D", margin: "0 0 .35rem" }}>{a.name}</p>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.82rem,.95vw,.9rem)", color: "#666", margin: 0, lineHeight: 1.5 }}>{a.body}</p>
            </div>
          ))}
        </div>

        {/* Featured / profiled on */}
        <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.1rem,2vw,1.7rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.02em", color: "#0D0D0D", margin: "clamp(3rem,6vh,4.5rem) 0 1rem" }}>
          Profiled &amp; Ranked On
        </h2>
        <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.88rem,1.05vw,.98rem)", lineHeight: 1.75, color: "#555", margin: "0 0 1.2rem", maxWidth: "68ch" }}>
          LEAD College is profiled and featured in national B-school rankings and independent education
          directories, including:
        </p>
        <div className="rec-featured">
          {[
            { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/LEAD_College_of_Management" },
            { label: "Collegedunia", href: "https://collegedunia.com/college/55254-lead-college-of-management-palakkad" },
            { label: "Shiksha", href: "https://www.shiksha.com/college/lead-college-of-management-palakkad-43312" },
            { label: "Careers360", href: "https://www.careers360.com/colleges/lead-college-of-management-palakkad" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer nofollow"
              style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.72rem,.85vw,.8rem)", letterSpacing: ".08em", textTransform: "uppercase", color: BLUE, fontWeight: 700, textDecoration: "none", borderBottom: "1px solid rgba(0,92,159,.3)", paddingBottom: 2 }}>
              {s.label}
            </a>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.1rem,2vw,1.7rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.02em", color: "#0D0D0D", margin: "clamp(3rem,6vh,4.5rem) 0 1.6rem" }}>
          Frequently Asked Questions
        </h2>
        <div>
          {FAQ.map((f, i) => (
            <div key={i} style={{ borderTop: "1px solid #E8EEF4", padding: "clamp(1.1rem,2.2vh,1.6rem) 0" }}>
              <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.95rem,1.15vw,1.08rem)", fontWeight: 700, color: BLUE, margin: "0 0 .6rem", lineHeight: 1.3 }}>{f.q}</h3>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.9rem,1.05vw,1rem)", lineHeight: 1.8, color: "#444", margin: 0, maxWidth: "72ch" }}>{f.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "clamp(3rem,6vh,4.5rem)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/mba" style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.72rem,.85vw,.8rem)", letterSpacing: ".14em", textTransform: "uppercase", color: "#fff", fontWeight: 700, textDecoration: "none", background: `linear-gradient(90deg,${BLUE},#1e3a8a)`, borderRadius: 8, padding: ".85rem 1.5rem" }}>
            Explore the MBA
          </Link>
          <Link href="/admissions" style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.72rem,.85vw,.8rem)", letterSpacing: ".14em", textTransform: "uppercase", color: BLUE, fontWeight: 700, textDecoration: "none", background: "#fff", border: `1px solid rgba(0,92,159,.25)`, borderRadius: 8, padding: ".85rem 1.5rem" }}>
            Admissions
          </Link>
        </div>
      </div>
    </main>
  );
}
