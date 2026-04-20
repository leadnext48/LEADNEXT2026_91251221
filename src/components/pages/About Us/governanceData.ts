// data/governanceData.ts
import { 
  Users, 
  Shield, 
  Briefcase, 
  MessageSquare, 
  GitBranch, 
  GraduationCap, 
  BookOpen, 
  DollarSign, 
  Award 
} from "lucide-react";

export type GovernanceBody = {
  slug: string;
  title: string;
  shortLabel: string;
  icon: any;
  description: string;
  term: string;
  meetings: string;
  composition: Array<{
    name: string;
    designation: string;
    role?: string;
    image?: string;
  }>;
};

export const governanceData: GovernanceBody[] = [
  {
    slug: "trust",
    title: "The Trust",
    shortLabel: "The Trust",
    icon: Shield,
    description:
      "LEAD College of Management is governed and promoted by a committed educational trust established with the objective of advancing quality education and social development. The Trust firmly believes that education is a powerful instrument for societal transformation and individual empowerment. Guided by strong ethical values and a long-term vision, the Trust ensures that the institution operates with transparency, accountability, and academic integrity.",
    term: "The Trust is a Permanent Body. The decision to coopt new members to the body is solely at the discretion of the existing Trust members collectively and based on extraordinary process of coopting.",
    meetings: "Meetings of the Trust shall be convened at least once every six months, or more frequently as required to ensure effective functioning.",
    composition: [
      {
        name: "Dr. Thomas George K.",
        designation: "Chairman",
        role: "Prompt Charitable Trust",
        image: "/governing/gv1 - Dr. Thomas George K.jpg",
      },
      {
        name: "Mr. Pratheesh V.",
        designation: "Member",
        role: "Trustee, Prompt Charitable Trust",
        image: "/governing/gv2 - Mr. Pratheesh V.jpeg",
      },
      {
        name: "Mr. Zacharia George K.",
        designation: "Member",
        role: "Trustee, Prompt Charitable Trust",
        image: "/governing/gv3 - Mr. Zacharia George K.jpeg",
      },
    ],
  },
  {
    slug: "governing-body",
    title: "Governing Body",
    shortLabel: "Governing Body",
    icon: Users,
    description:
      "The Governing Body of LEAD College of Management serves as the apex decision-making authority of the institution. It provides strategic direction, policy guidance, and governance oversight to ensure that the college functions in alignment with its vision and statutory requirements. Comprising experienced academicians, administrators, and Industrial and Social professionals, the Governing Body is responsible for framing institutional policies, approving academic initiatives, and monitoring overall performance.",
    term: "The term of the nominated members of the GB shall be FIVE (5) years.",
    meetings: "Meetings of the GB shall be convened at least once every six months.",
    composition: [
      {
        name: "Dr. Thomas George K.",
        designation: "Chairman",
        role: "Director, LEAD College",
        image: "/governing/gv1 - Dr. Thomas George K.jpg",
      },
      {
        name: "Mr. Pratheesh V.",
        designation: "Member",
        role: "Trustee, Prompt Charitable Trust",
        image: "/governing/gv2 - Mr. Pratheesh V.jpeg",
      },
      {
        name: "Dr. Mohammed Hanifa K.",
        designation: "Member",
        role: "University Nominee",
        image: "/governing/gv4 -  Dr. Mohamed Haneefa K .jpeg",
      },
      {
        name: "Shri Anil Kumar V. S.",
        designation: "Member",
        role: "State Government Nominee",
        image: "/governing/gv5 - Mr Anil Kumar.jpeg",
      },
      {
        name: "Dr. D. Viswanathan",
        designation: "Education Member",
        role: "Former Vice-Chancellor, Anna University",
        image: "/governing/gv6 - Prof. Dr. D. Viswanathan.jpg",
      },
      {
        name: "Mr. Jiji Thomson (IAS – Retd.)",
        designation: "Member",
        role: "IIM Ahmedabad alumnus",
        image: "/governing/gv7 -  Dr. Jiji Thomson IAS.jpeg",
      },
      {
        name: "Dr. R. Nandagopal",
        designation: "Education Member",
        role: "Director General, Sree Saraswathi Thyagaraja College",
        image: "/governing/gv8 - Dr. R. Nandagopal.jpeg",
      },
      {
        name: "Dr. Alli Rani (IES – Retd.)",
        designation: "Education Member",
        role: "Director, Sardar Vallabhbhai Patel Institute",
        image: "/governing/gv9 - Dr. P. Alli Rani IES (Retd).jpeg",
      },
      {
        name: "Dr. Rupa Gunaseelan",
        designation: "Education Member",
        role: "Professor, Bharathiar University",
        image: "/governing/gv10 - Dr. Rupa Gunaseelan.jpeg",
      },
      {
        name: "Dr. Rahul Menon",
        designation: "Industry Member",
        role: "CEO, Apollo Hospitals",
        image: "/governing/gv11 -  Dr. Rahul Menon.jpeg",
      },
      {
        name: "Dr. Chandrasekhar R.",
        designation: "Member",
        role: "Senior Professor, LEAD College",
        image: "/governing/gv12 - Dr. Chandrasekhar Ramankutty.jpg",
      },
      {
        name: "Dr. Sreekanth Sreedharan",
        designation: "Member",
        role: "Academic Advisor, LEAD College",
        image: "/governing/gv13 - Dr. Sreekanth Sreedharan.jpg",
      },
      {
        name: "Dr. Rajkishan S. S.",
        designation: "Member Secretary",
        role: "Deputy Director, LEAD College",
        image: "/governing/gv14 - Prof. Rajkishan S Nair.jpg",
      },
      {
        name: "Ms. Yasmin Samad",
        designation: "Member",
        role: "Administrator, LEAD College",
        image: "/governing/gv15 - Mrs. Yasmin Samad .jpg",
      },
      {
        name: "Dr. Mohammed Irshad",
        designation: "Faculty Representative",
        role: "Associate Dean, LEAD College",
        image: "/governing/gv16 - Dr. Mohammad Irshad V K.jpg",
      },
    ],
  },
  {
    slug: "ldc",
    title: "Leadership Decision Council",
    shortLabel: "LDC",
    icon: Briefcase,
    description:
      "The Leadership Decision Council (LDC) functions as a key institutional body that supports academic planning, stakeholder engagement, and quality enhancement initiatives at LEAD College. It serves as a collaborative platform that brings together institutional leadership, faculty representatives, and other stakeholders to guide policy formulation and strategic decision-making, in alignment with the broader directions of the Governing Body.",
    term: "The LDC is a permanent body and the new members shall be nominated by the GB and Trust in mutual concurrence.",
    meetings: "Meetings of the LDC shall be convened at least once every 14 days, or more frequently as required to ensure effective program oversight and continuous improvement.",
    composition: [
      {
        name: "Dr. Thomas George K.",
        designation: "Chairman",
        role: "Director, LEAD College",
        image: "/governing/gv1 - Dr. Thomas George K.jpg",
      },
      {
        name: "Mr. Pratheesh V.",
        designation: "Member",
        role: "Trustee, Prompt Charitable Trust",
        image: "/governing/gv2 - Mr. Pratheesh V.jpeg",
      },
      {
        name: "Dr. Unninarayanan KV",
        designation: "Member",
        role: "Former Director of LEAD College",
        image: "/governing/gv17 - Dr. Unninarayanan K V.jpeg",
      },
      {
        name: "Dr. Chandrasekhar R.",
        designation: "Member",
        role: "Senior Professor, LEAD College",
        image: "/governing/gv12 - Dr. Chandrasekhar Ramankutty.jpg",
      },
      {
        name: "Dr. Sreekanth Sreedharan",
        designation: "Member",
        role: "Academic Advisor, LEAD College",
           image: "/governing/gv13 - Dr. Sreekanth Sreedharan.jpg",
      },
      {
        name: "Mrs. Yasmin Samad",
        designation: "Member-Secretary",
        role: "Administrator, LEAD College",
        image: "/governing/gv15 - Mrs. Yasmin Samad .jpg",
      },
      {
        name: "Dr. Rajkishan N",
        designation: "Permanent Invitee",
        role: "Deputy Director, LEAD College",
        image: "/governing/gv14 - Prof. Rajkishan S Nair.jpg",
      },
    ],
  },
  {
    slug: "pac",
    title: "Program Advisory Committee",
    shortLabel: "PAC",
    icon: MessageSquare,
    description:
      "The Program Advisory Committee (PAC) plays a critical role in ensuring the quality, relevance, and continuous improvement of the MBA program. Comprising faculty members and key stakeholders, the PAC systematically evaluates the attainment of Program Outcomes (POs) through a comprehensive analysis of academic performance, feedback from alumni, industry stakeholders, and other relevant data sources.",
    term: "The term of the nominated members of the Program Advisory Committee (PAC) shall be three (3) years. The term of the student representative shall be one (1) year.",
    meetings: "Meetings of the Program Advisory Committee (PAC) shall be convened at least once every six months, or more frequently as required to ensure effective program oversight and continuous improvement.",
    composition: [
      {
        name: "Dr. Thomas George K.",
        designation: "Chairman",
        role: "Director, LEAD College",
        image: "/governing/gv1 - Dr. Thomas George K.jpg",
      },
      {
        name: "Dr. Sreekanth Sreedharan",
        designation: "Academic Advisor",
        role: "Academic Advisor, LEAD College",
       image: "/governing/gv13 - Dr. Sreekanth Sreedharan.jpg",
      },
      {
        name: "Dr. Rajkishan S S",
        designation: "Secretary",
        role: "Deputy Director, LEAD College",
        image: "/governing/gv14 - Prof. Rajkishan S Nair.jpg",
      },
      {
        name: "Mr. Pratheesh V.",
        designation: "Member",
        role: "Trustee, Prompt Charitable Trust",
        image: "/governing/gv2 - Mr. Pratheesh V.jpeg",
      },
      {
        name: "Mrs. Yasmin Samad",
        designation: "Member",
        role: "Administrator, LEAD College",
        image: "/governing/gv15 - Mrs. Yasmin Samad .jpg",
      },
      {
        name: "Dr. Mohammed Irshad",
        designation: "Faculty Representative",
        role: "Associate Dean (Acad), LEAD College",
        image: "/governing/gv16 - Dr. Mohammad Irshad V K.jpg",
      },
      {
        name: "Mr. Sunil Joseph",
        designation: "Industry Representative",
        role: "MD, SAARK Cables Pvt. Ltd",
        image: "/governing/gv18 - Dr. Sunil Joseph.jpg",
      },
      {
        name: "Ms. Soorya P",
        designation: "Alumna",
        role: "CEO, OHO Solutions",
        image: "/governing/gv19 - Ms. P Soorya.jpeg",
      },
      {
        name: "Ms Shahma Nasrin",
        designation: "Student Representative",
        role: "2nd year student of LEAD College",
        image: "",
      },
      {
        name: "Mr Adwaith",
        designation: "Student Representative",
        role: "1st year student of LEAD College",
        image: "",
      },
    ],
  },
  {
    slug: "pcc",
    title: "Program Core Committee",
    shortLabel: "PCC",
    icon: GitBranch,
    description:
      "The Program Core Committee plays a major role in the day-to-day activities of the Institution. All the decisions taken at the BOG level and duly recommended by the LDC are implemented through various committees.",
    term: "The term of the nominated members shall be three (3) years.",
    meetings: "Meetings shall be convened as required for effective program implementation.",
    composition: [
      {
        name: "Dr. Rajkishan S S",
        designation: "Chairman",
        role: "Deputy Director, LEAD College",
        image: "/governing/gv14 - Prof. Rajkishan S Nair.jpg",
      },
      {
        name: "Mrs Yasmin Samad",
        designation: "Member",
        role: "Administrator, LEAD College",
        image: "/governing/gv15 - Mrs. Yasmin Samad .jpg",
      },
      {
        name: "Dr. Wranten Perez",
        designation: "Member",
        role: "Professor, LEAD College",
        image: "/governing/gv22 - Dr. R Wranton Perez .jpg",
      },
      {
        name: "Dr. Balamourougane",
        designation: "Member",
        role: "Associate Professor, LEAD College",
        image: "/governing/gv23 - Dr. Balamourougane R .jpg",
      },
      {
        name: "Dr. Sangeetha P",
        designation: "Member",
        role: "Associate Professor, LEAD College",
        image: "/governing/gv24 - Dr. Sangeetha P.jpeg",
      },
      {
        name: "Dr. Sabina A Nair",
        designation: "Member",
        role: "Assistant Professor (Sr.Gd.), LEAD College",
        image: "/governing/gv25 - Dr. Sabina A Nair.jpg",
      },
      {
        name: "Mr. Jith R",
        designation: "Member",
        role: "Assistant Professor, LEAD College",
        image: "/governing/gv26 - Dr. Jith Rajan.png",
      },
      {
        name: "Mr. Pramod V",
        designation: "Member",
        role: "Assistant Professor, LEAD College",
        image: "/governing/gv27 - Mr. Pramod V.jpg",
      },
    ],
  },
  {
    slug: "academic-council",
    title: "Academic Council",
    shortLabel: "Academic Council",
    icon: GraduationCap,
    description:
      "With the conferment of autonomous status, LEAD College of Management constituted the Academic Council as its principal academic authority to uphold and enhance academic standards. The Academic Council plays a pivotal role in ensuring that the institution offers a relevant, coherent, innovative, and future-oriented curriculum, aligned with regulatory requirements and industry expectations.",
    term: "The term of the nominated members of the Academic Council shall be three (3) years.",
    meetings: "Meetings of the Academic Council shall be convened at least once every six months, or as required, to deliberate on academic matters.",
    composition: [
      {
        name: "Dr. Thomas George K",
        designation: "Chairman",
        role: "Director, LEAD College",
        image: "/governing/gv1 - Dr. Thomas George K.jpg",
      },
      {
        name: "Dr. Mohammed Irshad",
        designation: "Member",
        role: "Faculty MBA-Member Secretary",
        image: "/governing/gv16 - Dr. Mohammad Irshad V K.jpg",
      },
      {
        name: "Dr Baby Shari PA",
        designation: "Member",
        role: "University of Calicut Nominee",
        image: "/governing/gv28 - Dr. Baby Shari. P.A.jpeg",
      },
      {
        name: "Dr. Pramod Kovvaparth",
        designation: "Member",
        role: "University of Calicut Nominee",
        image: "/governing/gv29 - Dr. Pramod Kovvaparth.jpg",
      },
      {
        name: "Dr. Abraham Joseph",
        designation: "Member",
        role: "University of Calicut Nominee",
        image: "/governing/gv30 - Dr. Abraham Joseph.jpeg",
      },
      {
        name: "Dr. Chandrasekhar R",
        designation: "Member",
        role: "Senior professor, LEAD College",
        image: "/governing/gv12 - Dr. Chandrasekhar Ramankutty.jpg",
      },
      {
        name: "Dr. Sreekanth Sreedharan",
        designation: "Member",
        role: "Academic Advisor, LEAD College",
        image: "/governing/gv13 - Dr. Sreekanth Sreedharan.jpg",
      },
      {
        name: "Dr. Raj Kishan SS",
        designation: "Member",
        role: "Deputy Director, LEAD College",
        image: "/governing/gv14 - Prof. Rajkishan S Nair.jpg",
      },
      {
        name: "Mr. Krishna Kumar",
        designation: "Member",
        role: "Industrial Expert",
        image: "/governing/gv31 - Mr. Krishna Kumar.jpeg",
      },
      {
        name: "Dr. Bindu Ann Thomas",
        designation: "Member",
        role: "Academic Expert, Principal, Kochi Business School",
        image: "/governing/gv32 - Dr. Bindhu Ann Thomas.jpg",
      },
      {
        name: "Ms. P Soorya",
        designation: "Member",
        role: "Alumni Representative",
        image: "/governing/gv19 - Ms. P Soorya.jpeg",
      },
      {
        name: "Mr. Jith R",
        designation: "Member",
        role: "Faculty - MBA, LEAD College",
        image: "/governing/gv26 - Dr. Jith Rajan.png",
      },
      {
        name: "Mr. Pramod V",
        designation: "Member",
        role: "Faculty - MBA, LEAD College",
        image: "/governing/gv27 - Mr. Pramod V.jpg",
      },
      {
        name: "Mr. Ranjith K",
        designation: "Member",
        role: "Faculty - MBA, LEAD College",
        image: "/governing/gv33 - Mr. Ranjith Karat .jpg",
      },
      {
        name: "Mr Ajay Japamani",
        designation: "Member",
        role: "Faculty - MBA, LEAD College",
        image: "/governing/gv34 - Mr. Ajay Japamani.jpg",
      },
      {
        name: "Dr. Sheena MS",
        designation: "Member",
        role: "Controller of Examination, LEAD College",
        image: "/governing/gv35 - Dr. Sheena M S .jpeg",
      },
      {
        name: "Mr. Abel Jopaul VP",
        designation: "Member",
        role: "Faculty - MCA, LEAD College",
        image: "/governing/gv36 - Mr. Abel Jopaul V P .jpeg",
      },
    ],
  },
  {
    slug: "board-of-studies",
    title: "Board of Studies",
    shortLabel: "Board of Studies",
    icon: BookOpen,
    description:
      "LEAD College has two BoS committees – BoS MBA and BoS MCA. These committees are responsible for overseeing the academic curriculum and related matters for the MBA and MCA departments respectively. Each committee comprises of faculty members, experts, and other stakeholders like alumni and industry representatives. The BoS plays a crucial role in developing, reviewing, and updating curriculum, recommending teaching and examination methods, and advising on academic policies.",
    term: "The term of the nominated members shall be three years.",
    meetings: "Meetings of the Board of Studies shall be held once every six months.",
    composition: [
      {
        name: "Dr. Thomas George K",
        designation: "Chairman",
        role: "Director, LEAD College",
        image: "/governing/gv1 - Dr. Thomas George K.jpg",
      },
      {
        name: "Dr. Raj Kishan S S",
        designation: "Member Secretary",
        role: "Deputy Director, LEAD College",
        image: "/governing/gv14 - Prof. Rajkishan S Nair.jpg",
      },
      {
        name: "Dr. Manu Melvin Joy",
        designation: "Member",
        role: "University Nominee, Asst. Prof, CUSAT",
        image: "/governing/gv37 - Dr. Manu Melvin Joy.jpg",
      },
      {
        name: "Dr. Sreejith",
        designation: "Member",
        role: "Academician (External). Asso Prof, CUSAT",
        image: "/governing/gv38 - Dr. Sreejith S.jpg",
      },
      {
        name: "Dr. Pon Annanadurai",
        designation: "Member",
        role: "Chief Human Resources Officer, Simta Clear Coats Pvt Ltd",
        image: "/governing/gv39 - Dr. Pon Annadurai.jpeg",
      },
      {
        name: "Mr. Sunil Joseph",
        designation: "Member",
        role: "Industry representative, Executive Director SARK Cables",
        image: "/governing/gv18 - Dr. Sunil Joseph.jpg",
      },
      {
        name: "Mr. KS Amruth",
        designation: "Member",
        role: "Alumni, General Manager - Admin & Projects, RCP Group",
        image: "/governing/gv40 - Mr. K.S. Amruth.png",
      },
      {
        name: "Dr. Sindhu R",
        designation: "Member",
        role: "Head of IQAC, LEAD College",
        image: "/governing/gv41 - Dr. Sindhu R.jpeg",
      },
      {
        name: "Dr. Balamourougane R",
        designation: "Member",
        role: "Associate Professor, LEAD College",
        image: "/governing/gv23 - Dr. Balamourougane R .jpg",
      },
      {
        name: "Ms. Yasmin Samad",
        designation: "Member",
        role: "Administrator, LEAD College",
        image: "/governing/gv15 - Mrs. Yasmin Samad .jpg",
      },
      {
        name: "Dr. Chandrasekhar R",
        designation: "Member",
        role: "Sr. Professor, LEAD College",
        image: "/governing/gv12 - Dr. Chandrasekhar Ramankutty.jpg",
      },
      {
        name: "Dr. Sreekanth Sreedharan",
        designation: "Member",
        role: "Academic Advisor, LEAD College",
     image: "/governing/gv13 - Dr. Sreekanth Sreedharan.jpg",
      },
    ],
  },
  {
    slug: "finance-committee",
    title: "Finance Committee",
    shortLabel: "Finance Committee",
    icon: DollarSign,
    description:
      "The Finance Committee of LEAD College of Management, as an autonomous institution, is a statutory body constituted to oversee and regulate the financial management of the college. The Committee plays a pivotal role in ensuring financial discipline, transparency, and sustainability in alignment with the institutional objectives and regulatory requirements.",
    term: "The term of the Finance Committee shall be three (3) years, unless otherwise specified by statutory or regulatory provisions.",
    meetings: "Meetings of the Finance Committee shall be held at least once every six months. Additional meetings may be convened as required to address urgent financial or developmental matters.",
    composition: [
      {
        name: "Dr. Thomas George K",
        designation: "Chairman",
        role: "Director, LEAD College",
        image: "/governing/gv1 - Dr. Thomas George K.jpg",
      },
      {
        name: "Mr. Pratheesh V",
        designation: "Member",
        role: "Finance Head, LEAD College",
        image: "/governing/gv2 - Mr. Pratheesh V.jpeg",
      },
      {
        name: "CA. Mr. Suresh Rajagopal",
        designation: "Member",
        role: "Finance Officer, LEAD College",
        image: "/governing/gv42 - CA. Mr. Suresh Rajagopal.png",
      },
      {
        name: "Ms. Yasmin Samad",
        designation: "Member-Secretary",
        role: "Senior Faculty Member, LEAD College",
        image: "/governing/gv15 - Mrs. Yasmin Samad .jpg",
      },
      {
        name: "Dr. Chandrasekhar R",
        designation: "Member",
        role: "Special invitee, LEAD College",
        image: "/governing/gv12 - Dr. Chandrasekhar Ramankutty.jpg",
      },
      {
        name: "Dr. Sreekanth Sreedharan",
        designation: "Member",
        role: "Special invitee, Finance professional, Academic Advisor",
      image: "/governing/gv13 - Dr. Sreekanth Sreedharan.jpg",
      },
    ],
  },
  {
    slug: "iqac",
    title: "Internal Quality Assurance Cell",
    shortLabel: "IQAC",
    icon: Award,
    description:
      "Recognizing that quality enhancement is a continuous and dynamic process, the Internal Quality Assurance Cell (IQAC) is an integral part of the institutional framework at LEAD College of Management. The IQAC is established to promote, sustain, and enhance quality across all academic and administrative functions of the institution.",
    term: "The membership of the nominated members shall be for a period of two years.",
    meetings: "The IQAC meets at least once every quarter. The quorum for the meeting shall be two-thirds of the total number of members.",
    composition: [
      {
        name: "Dr. Thomas George K",
        designation: "Chairperson",
        role: "Director, LEAD College",
        image: "/governing/gv1 - Dr. Thomas George K.jpg",
      },
      {
        name: "Prof. Raj Kishan",
        designation: "Teaching Representative",
        role: "Deputy Director, LEAD College",
        image: "/governing/gv14 - Prof. Rajkishan S Nair.jpg",
      },
      {
        name: "Dr. Sindhu R",
        designation: "Head, IQAC",
        role: "Professor, LEAD College",
        image: "/governing/gv41 - Dr. Sindhu R.jpeg",
      },
      {
        name: "Dr KG Viswanathan",
        designation: "Dean, Quality Assurance",
        role: "Professor, LEAD College",
        image: "/governing/gv43 - Dr. K G Viswanadhan.jpeg",
      },
      {
        name: "Dr. Archana PV",
        designation: "Teaching Representative",
        role: "Assistant Professor, LEAD College",
        image: "/governing/gv44 - Dr. Archana P V.png",
      },
      {
        name: "Dr. Wranton Perez",
        designation: "Teaching Representative",
        role: "Professor, LEAD College",
        image: "/governing/gv22 - Dr. R Wranton Perez .jpg",
      },
      {
        name: "Mr. Jith Rajan",
        designation: "Teaching Representative",
        role: "Assistant Professor, LEAD College",
        image: "/governing/gv26 - Dr. Jith Rajan.png",
      },
      {
        name: "Mr. Pramod Mathakode",
        designation: "Teaching Representative",
        role: "Assistant Professor, LEAD College",
        image: "/governing/gv27 - Mr. Pramod V.jpg",
      },
      {
        name: "Mr. Shaju Meetna",
        designation: "Teaching Representative",
        role: "Assistant Professor, LEAD College",
        image: "/governing/gv45 - Mr. Shaju Meetna .jpg",
      },
      {
        name: "Mr. Pratheesh V",
        designation: "Management Representative",
        role: "Trustee, Prompt Educational Trust",
        image: "/governing/gv2 - Mr. Pratheesh V.jpeg",
      },
      {
        name: "Ms. Yasmin Samad",
        designation: "Senior Administrative Officer",
        role: "Administrator, LEAD College",
        image: "/governing/gv15 - Mrs. Yasmin Samad .jpg",
      },
      {
        name: "Ms. Beena Govind",
        designation: "Society/Trust Representative",
        role: "Senior Sub-editor, Mathrubhumi",
        image: "",
      },
      {
        name: "Mr. Jeffin Jo Thomas",
        designation: "Student Representative",
        role: "MBA (2024 batch), LEAD College",
        image: "",
      },
      {
        name: "Dr. Durga",
        designation: "Alumni Representative",
        role: "Section Officer, Chinmaya Vishwa Vidyapeeth",
        image: "",
      },
      {
        name: "Mr. AG Gireesh",
        designation: "Industry Nominee",
        role: "Head (Retd.), HR, Apollo Tyres",
        image: "",
      },
      {
        name: "Dr. Dhanalakshmi",
        designation: "IQAC Coordinator",
        role: "Associate Professor, LEAD College",
        image: "/governing/gv50 - Dr. M Dhanalakshmi.jpeg",
      },
    ],
  },
];