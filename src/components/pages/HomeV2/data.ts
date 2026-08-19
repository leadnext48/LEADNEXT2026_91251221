/*  /home (POC) — shared content.
    Everything here is reused from the existing homepage components; no new
    facts are invented. Keep this file as the single source of content so the
    page component stays presentational. */

export const ADMISSION = {
  mba: "https://admission.lead.ac.in/lead-college-of-management-mba-application",
  mca: "https://admission.lead.ac.in/lead-college-of-management-mca-application",
  brochure: "/LEAD-MBA-Brochure-2026-28.pdf",
};

export const CONTACT = {
  name: "LEAD College (Autonomous)",
  address: ["Dhoni PO, Palakkad", "Kerala, India – 678009"],
  landline: ["0491 2553693", "0491 2553663"],
  mobile: "+91 9497713693",
  emails: ["info@lead.ac.in", "mail@lead.ac.in"],
  mapQuery: "LEAD College Autonomous Dhoni Palakkad Kerala",
};

export const SOCIAL = [
  { key: "instagram", label: "Instagram", handle: "@lead_college_official", href: "https://www.instagram.com/lead_college_official/?hl=en" },
  { key: "facebook",  label: "Facebook",  handle: "/leadcollegeofficial",   href: "https://www.facebook.com/leadcollegeofficial/" },
  { key: "linkedin",  label: "LinkedIn",  handle: "LEAD College (Autonomous)", href: "https://in.linkedin.com/school/lead-college-autonomous/" },
  { key: "youtube",   label: "YouTube",   handle: "@leadcollegeofficial",   href: "https://www.youtube.com/@leadcollegeofficial" },
] as const;

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Programmes", href: "#programmes" },
  { label: "Admissions", href: "/admissions" },
  { label: "Campus Life", href: "#campus" },
  { label: "Placements", href: "/placements" },
  { label: "Contact", href: "#contact" },
];

export const TRUST = ["AICTE Approved", "NAAC Accredited", "Autonomous", "University of Calicut"];

export const HERO_STATS = [
  { value: "15+", label: "Years of Excellence" },
  { value: "95%+", label: "Placement Record" },
  { value: "3000+", label: "Global Alumni" },
  { value: "200+", label: "Recruiting Partners" },
];

/* Audience / quick-access shortcuts — addresses "limited clear options to explore". */
export const QUICK = [
  { title: "Admissions 2026", desc: "Applications open for MBA & MCA.", href: "/admissions", tag: "Apply" },
  { title: "Our Programmes", desc: "Industry-integrated MBA & MCA.", href: "#programmes", tag: "Explore" },
  { title: "Campus Life", desc: "Residential campus at Dhoni, Palakkad.", href: "/life-at-lead/gallery", tag: "Discover" },
  { title: "Placements", desc: "22 LPA highest • 100% assurance.", href: "/placements", tag: "See record" },
];

export const PROGRAMS = [
  {
    id: "mba",
    short: "MBA",
    full: "Master of Business Administration",
    tagline: "Where strategy meets ambition.",
    duration: "2 Years",
    mode: "Full-time · Residential",
    badge: "AICTE Approved",
    description:
      "A comprehensive management programme focused on entrepreneurship, leadership, and industry-ready skills — with live projects, internships every semester, and mentorship from Guinness World Record holder Dr. Thomas George K.",
    highlights: ["10+ Specializations", "Live Industry Projects", "Startup Incubation", "95%+ Placement Record"],
    image: "/convert/LEAD30.webp",
    explore: "/mba",
    apply: "https://admission.lead.ac.in/lead-college-of-management-mba-application",
  },
  {
    id: "mca",
    short: "MCA",
    full: "Master of Computer Applications",
    tagline: "Engineer the future. Command the digital age.",
    duration: "2 Years",
    mode: "Full-time · Residential",
    badge: "AICTE Approved",
    description:
      "An advanced computer-applications programme built around AI, Machine Learning, Cloud, and Data Science, with an industry-aligned curriculum, a one-year internship, modern computing labs, and research opportunities.",
    highlights: ["AI · ML · Cloud · Data Science", "1-Year Internship", "Modern Computing Labs", "Top Tech Placements"],
    image: "/convert/LEAD33.webp",
    explore: "/mca",
    apply: "https://admission.lead.ac.in/lead-college-of-management-mca-application",
  },
];

export const WHY = [
  { n: "01", title: "Expert Faculty", body: "Guided by Guinness World Record holder Dr. Thomas George K. — mentors focused on real-world projects and experiential learning from day one." },
  { n: "02", title: "Modern Curriculum", body: "Digital Marketing, Analytics, Robotics, and AI built into every programme — an entrepreneurial MBA that evolves with industry, never behind it." },
  { n: "03", title: "Industry Partnerships", body: "Live collaborations with 200+ companies including ITC, Deloitte, and Wipro — real internships and client projects that build your portfolio." },
  { n: "04", title: "Research Opportunities", body: "LEAD Research Centre, an approved Ph.D. hub under KUFOS, driving impactful academic and applied industry research." },
  { n: "05", title: "Global Exposure", body: "A multicultural community spanning 10+ nations, with international projects and global faculty partnerships from your first semester." },
  { n: "06", title: "Career Support", body: "A 95%+ placement record, with training, mentorship, an alumni network, and a startup incubation cell — graduate fully industry-ready." },
];

export const NUMBERS = [
  { value: "22 LPA", label: "Highest Package" },
  { value: "100%", label: "Placement Assurance" },
  { value: "3000+", label: "Global Alumni Network" },
  { value: "10+", label: "Specializations" },
  { value: "40+", label: "Expert Faculty" },
  { value: "15+", label: "Years of Excellence" },
];

/* Real, college-supplied campus photos only — identified by their original
   camera/phone filenames (DSC…, IMG_…, photo_<date>…). The renamed LEADxx set
   is excluded here because it can contain stock/Google imagery. */
export const GALLERY = [
  { src: "/convert/DSC06898.webp" },
  { src: "/convert/photo_1_2024-11-25_17-10-18.jpeg" },
  { src: "/convert/DSC07270.webp" },
  { src: "/convert/IMG_1261.jpeg" },
  { src: "/convert/DSC00254.webp" },
  { src: "/convert/photo_8_2025-05-07_12-00-48.jpeg" },
  { src: "/convert/DSC06679.webp" },
  { src: "/convert/DSC000912.webp" },
  { src: "/convert/DSC00075.webp" },
];

export const TESTIMONIALS = [
  { text: "The placement support here is genuinely structured. From resume reviews to mock interviews — it felt like a real career launchpad.", name: "Ananya Menon", role: "MBA • 2024–26 Batch", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" },
  { text: "What stood out was the mentorship. Faculty were accessible, practical, and focused on making learning career-relevant.", name: "Fathima Azeez", role: "MCA • Final Year 2023–26", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150" },
  { text: "The training sessions were industry-like — presentations, teamwork, and real feedback. It prepared me for my first job confidently.", name: "Rahul Das", role: "MBA Graduate • Business Analyst", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" },
  { text: "A calm campus, strong academic structure, and great student life. It felt like the right place to build focus and momentum.", name: "Meera Suresh", role: "MBA • 2023–25 Batch", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" },
];

export const VIDEO_ID = "VrkT32NhEM4";
