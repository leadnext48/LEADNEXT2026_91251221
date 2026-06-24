"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { playfair, cinzel } from "@/app/fonts";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { createPortal } from "react-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen, Target, User, Building2, Shield,
  Users, GraduationCap, Calendar, ClipboardList, Briefcase,
  Landmark, BadgeCheck, Info, ExternalLink,
  FileDown, FlaskConical, Rocket, Laptop, AlertCircle, Trophy,
  Library, ClipboardCheck, MonitorDot, ShieldCheck,
  Camera, CalendarDays, Leaf, PawPrint, Dumbbell,
  UtensilsCrossed, BedDouble, Handshake, Share2, Coffee, Sparkles,
  Mountain, X, ArrowRight, CheckCircle2,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* TYPES                                                             */
/* ---------------------------------------------------------------- */

type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  external?: boolean;
};

type NavSection = {
  title: string;
  items: LinkItem[];
};

/* ---------------------------------------------------------------- */
/* APPLY MODAL                                                       */
/* ---------------------------------------------------------------- */

function ApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ perspective: "1200px" }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="apply-modal-backdrop absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Card */}
      <div
        className="apply-modal-card relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={15} className="text-gray-600" />
        </button>

        {/* Header illustration band */}
        <div className="apply-modal-hero relative overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#005C9F] to-[#1e3a8a] px-8 pt-8 pb-10">
          <div className="apply-deco-circle apply-deco-circle--1" />
          <div className="apply-deco-circle apply-deco-circle--2" />
          <div className="apply-deco-circle apply-deco-circle--3" />

          <div className="apply-hero-wm" style={{ fontFamily: cinzel.style.fontFamily }}>
            LEAD
          </div>

          <div className="relative z-10">
            <div className="apply-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
              <span className="apply-eyebrow-dash" />
              LEAD College
            </div>
            <h2 className="apply-hero-title" style={{ fontFamily: cinzel.style.fontFamily }}>
              Begin Your Journey
            </h2>
            <p className="apply-hero-sub" style={{ fontFamily: playfair.style.fontFamily }}>
              NBA-accredited postgraduate programmes designed to develop
              transformational leaders for a dynamic world.
            </p>
          </div>
        </div>

        {/* Features strip */}
        <div className="apply-features">
          {[
            { icon: CheckCircle2, text: "NBA Accredited" },
            { icon: CheckCircle2, text: "100% Residential" },
            { icon: CheckCircle2, text: "Industry Mentors" },
          ].map((f) => (
            <div key={f.text} className="apply-feature-item">
              <f.icon size={13} className="text-[#005C9F]" strokeWidth={2} />
              <span style={{ fontFamily: cinzel.style.fontFamily }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Programme cards */}
        <div className="apply-programmes">

          {/* MBA */}
          <a
            href="https://admission.lead.ac.in/lead-college-of-management-mba-application/"
            target="_blank"
            rel="noopener noreferrer"
            className="apply-prog-card apply-prog-card--mba"
          >
            <div className="apply-prog-icon">
              <GraduationCap size={22} strokeWidth={1.6} />
            </div>
            <div className="apply-prog-info">
              <div className="apply-prog-label" style={{ fontFamily: cinzel.style.fontFamily }}>
                Department of Management Studies
              </div>
              <div className="apply-prog-title" style={{ fontFamily: cinzel.style.fontFamily }}>
                MBA
              </div>
              <div className="apply-prog-desc" style={{ fontFamily: playfair.style.fontFamily }}>
                Master of Business Administration · 2 Years
              </div>
            </div>
            <ArrowRight size={16} className="apply-prog-arrow" strokeWidth={2} />
          </a>

          {/* MCA */}
          <a
            href="https://admission.lead.ac.in/lead-college-of-management-mca-application/"
            target="_blank"
            rel="noopener noreferrer"
            className="apply-prog-card apply-prog-card--mca"
          >
            <div className="apply-prog-icon apply-prog-icon--mca">
              <MonitorDot size={22} strokeWidth={1.6} />
            </div>
            <div className="apply-prog-info">
              <div className="apply-prog-label" style={{ fontFamily: cinzel.style.fontFamily }}>
                Department of Computer Applications
              </div>
              <div className="apply-prog-title" style={{ fontFamily: cinzel.style.fontFamily }}>
                MCA
              </div>
              <div className="apply-prog-desc" style={{ fontFamily: playfair.style.fontFamily }}>
                Master of Computer Applications · 2 Years
              </div>
            </div>
            <ArrowRight size={16} className="apply-prog-arrow" strokeWidth={2} />
          </a>
        </div>

        {/* Footer note */}
        <div className="apply-footer" style={{ fontFamily: playfair.style.fontFamily }}>
          Palakkad, Kerala · Affiliated to University of Calicut
        </div>
      </div>

      <style>{`
        .apply-modal-backdrop {
          animation: applyBackdropIn 0.4s ease forwards;
        }

        .apply-modal-card {
          animation: applyFlipIn 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          transform-origin: center center;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        @keyframes applyBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes applyFlipIn {
          from {
            opacity: 0;
            transform: perspective(1200px) rotateX(-88deg) translateZ(-80px) scale(0.92);
          }
          60% {
            opacity: 1;
            transform: perspective(1200px) rotateX(6deg) translateZ(0px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotateX(0deg) translateZ(0px) scale(1);
          }
        }

        .apply-modal-hero { min-height: 180px; }

        .apply-hero-wm {
          position: absolute; right: -0.05em; bottom: -0.2em;
          font-size: 7rem; font-weight: 900; line-height: 1;
          letter-spacing: -0.06em; color: rgba(255,255,255,0.05);
          pointer-events: none; user-select: none;
        }

        .apply-deco-circle {
          position: absolute; border-radius: 50%;
          background: rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .apply-deco-circle--1 { width: 220px; height: 220px; top: -80px; right: -60px; }
        .apply-deco-circle--2 { width: 140px; height: 140px; top: 20px; right: 60px; background: rgba(255,255,255,0.04); }
        .apply-deco-circle--3 { width: 80px; height: 80px; bottom: -20px; left: 50%; background: rgba(255,255,255,0.06); }

        .apply-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.52rem; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(255,255,255,0.6); margin-bottom: 10px;
        }
        .apply-eyebrow-dash {
          display: inline-block; width: 22px; height: 1.5px;
          background: rgba(255,255,255,0.5); flex-shrink: 0;
        }
        .apply-hero-title {
          font-size: clamp(1.5rem, 4vw, 2.2rem); font-weight: 900;
          line-height: 0.95; letter-spacing: -0.025em; text-transform: uppercase;
          color: #fff; margin-bottom: 10px;
        }
        .apply-hero-sub {
          font-size: 0.88rem; line-height: 1.7;
          color: rgba(255,255,255,0.7); max-width: 380px; margin: 0;
        }

        .apply-features {
          display: flex; align-items: center; gap: 0;
          border-bottom: 1px solid rgba(0,92,159,0.1);
          padding: 0 24px;
        }
        .apply-feature-item {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 16px 10px 0;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #374151;
          margin-right: 16px;
          border-right: 1px solid rgba(0,92,159,0.1);
        }
        .apply-feature-item:last-child { border-right: none; }

        .apply-programmes {
          display: flex; flex-direction: column; gap: 10px;
          padding: 16px 24px;
        }
        .apply-prog-card {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border-radius: 12px;
          border: 1.5px solid rgba(0,92,159,0.12);
          text-decoration: none; color: inherit;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
          background: #fff; position: relative; overflow: hidden;
        }
        .apply-prog-card::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: linear-gradient(to bottom, #005C9F, #1e3a8a);
          transform: scaleY(0); transform-origin: top;
          transition: transform 0.25s ease;
          border-radius: 3px 0 0 3px;
        }
        .apply-prog-card:hover {
          border-color: rgba(0,92,159,0.35);
          background: #EBF4FF;
          transform: translateX(3px);
          box-shadow: 0 4px 18px rgba(0,92,159,0.1);
        }
        .apply-prog-card:hover::before { transform: scaleY(1); }

        .apply-prog-icon {
          width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0;
          background: rgba(0,92,159,0.08); border: 1px solid rgba(0,92,159,0.15);
          display: grid; place-items: center; color: #005C9F;
          transition: background 0.2s;
        }
        .apply-prog-card:hover .apply-prog-icon { background: rgba(0,92,159,0.14); }
        .apply-prog-icon--mca { background: rgba(30,58,138,0.07); border-color: rgba(30,58,138,0.15); color: #1e3a8a; }

        .apply-prog-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
        .apply-prog-label {
          font-size: 0.5rem; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: #9ca3af;
        }
        .apply-prog-title {
          font-size: 1.1rem; font-weight: 900; letter-spacing: -0.01em; color: #0A2540;
          line-height: 1;
        }
        .apply-prog-desc {
          font-size: 0.75rem; color: #6b7280; line-height: 1.4;
        }
        .apply-prog-arrow {
          color: rgba(0,92,159,0.4); flex-shrink: 0;
          transition: transform 0.2s, color 0.2s;
        }
        .apply-prog-card:hover .apply-prog-arrow {
          transform: translateX(3px); color: #005C9F;
        }

        .apply-footer {
          text-align: center; font-size: 0.72rem; color: #9ca3af;
          padding: 0 24px 16px;
        }
      `}</style>
    </div>,
    document.body
  );
}

/* ---------------------------------------------------------------- */
/* HEADER                                                            */
/* ---------------------------------------------------------------- */

export function Header() {
  const [open, setOpen]           = React.useState(false);
  const [applyOpen, setApplyOpen] = React.useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-gray-200 bg-white",
          playfair.className
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center px-4">

          {/* ── LOGO ── clicking navigates to home page */}
          <a
            href="/"
            className="flex shrink-0 items-center mr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
            aria-label="LEAD College – Home"
          >
            <img src="/logolead.png" alt="LEAD College" className="h-10 w-auto" />
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden flex-1 justify-center md:flex overflow-visible">
            <NavigationMenu delayDuration={0}>
              <NavigationMenuList className="flex gap-0.5">
                {navSections.map((section) => (
                  <NavigationMenuItem key={section.title}>
                    <NavigationMenuTrigger className="bg-white text-black hover:bg-gray-100 text-[13px] px-3 py-2">
                      {section.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul
                        className={cn(
                          "grid gap-2 rounded-md border border-gray-200 bg-white p-2 shadow-lg",
                          section.title === "Life at LEAD"
                            ? "w-[900px] grid-cols-3"
                            : "w-[720px] grid-cols-2"
                        )}
                      >
                        {section.items.map((item) => (
                          <li key={item.title}>
                            <ListItem {...item} />
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden shrink-0 ml-4 md:flex">
            <Button
              className="bg-black text-white hover:bg-black/90 cursor-pointer"
              onClick={() => setApplyOpen(true)}
            >
              Apply Now
            </Button>
          </div>

          {/* MOBILE TOGGLE */}
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen(!open)}
            className="ml-auto md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </nav>

        <MobileMenu
          open={open}
          onClose={() => setOpen(false)}
          onApply={() => { setOpen(false); setApplyOpen(true); }}
        />
      </header>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* MOBILE MENU                                                       */
/* ---------------------------------------------------------------- */

function MobileMenu({
  open,
  onClose,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
}) {
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      className="fixed inset-0 top-16 z-40 bg-white p-4 md:hidden overflow-y-auto"
    >
      <div className="flex flex-col gap-6">
        <Button
          className="w-full bg-black text-white cursor-pointer"
          onClick={onApply}
        >
          Apply Now
        </Button>

        {navSections.map((section) => (
          <div key={section.title}>
            <p className="text-sm font-semibold text-gray-900">{section.title}</p>
            <div className="mt-2 flex flex-col gap-2">
              {section.items.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-100"
                >
                  <item.icon className="size-5 text-black" />
                  <span className="text-sm">{item.title}</span>
                  {item.external && (
                    <ExternalLink className="ml-auto size-3.5 text-gray-400" />
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
}

/* ---------------------------------------------------------------- */
/* DESKTOP LIST ITEM                                                 */
/* ---------------------------------------------------------------- */

function ListItem({ title, description, icon: Icon, href, external }: LinkItem) {
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex gap-3 rounded-md p-2 hover:bg-gray-100 group"
      >
        <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-gray-50 shadow-sm">
          <Icon className="size-5 text-black" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-medium text-sm">{title}</p>
            {external && (
              <ExternalLink className="size-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
          {description && (
            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{description}</p>
          )}
        </div>
      </a>
    </NavigationMenuLink>
  );
}

/* ---------------------------------------------------------------- */
/* NAV DATA                                                          */
/* ---------------------------------------------------------------- */

const navSections: NavSection[] = [
  {
    title: "About Us",
    items: [
      { title: "The LEAD Story",   href: "/the-lead-story",    description: "Our journey and academic foundation",   icon: BookOpen  },
      { title: "Dhoni",            href: "/dhoni",             description: "Campus and facilities",                 icon: Building2 },
      { title: "Chairman",         href: "/chairman",          description: "Leadership and vision",                 icon: User      },
      { title: "Vision & Mission", href: "/vision-and-mission",description: "Purpose and institutional direction",   icon: Target    },
      { title: "RTI",              href: "/rti",               description: "Right to Information",                  icon: Shield    },
      { title: "Governance",       href: "/governance",        description: "Institutional governance",              icon: Landmark  },
    ],
  },
  {
    title: "Academics",
    items: [
      { title: "Department of Management Studies",    href: "/mba",             description: "MBA programme & management education",  icon: GraduationCap },
      { title: "Department of Computer Applications", href: "/mca",             description: "MCA programme & technology education",  icon: MonitorDot    },
      { title: "Faculty",                             href: "/faculty",         description: "Experienced educators & researchers",   icon: Users         },
      { title: "Placements",                          href: "/placements",      description: "Career outcomes & recruiters",          icon: Briefcase     },
      { title: "Academic Calendar",                   href: "/calendar",        description: "Schedules & timelines",                 icon: Calendar      },
      { title: "Examinations",                        href: "/examinations",    description: "Assessment details & results",          icon: ClipboardList },
      { title: "Research",                            href: "/research",        description: "Research & innovation",                 icon: FlaskConical  },
      { title: "LEAD Journal",                        href: "/journal",         description: "Academic publications & insights",      icon: BookOpen      },
      { title: "Entrepreneurship",                    href: "/entrepreneurship",description: "Startups & innovation ecosystem",       icon: Rocket        },
    ],
  },
  {
    title: "Administration",
    items: [
      { title: "Director",                href: "/director",               description: "Institutional head overseeing academic and administrative leadership",  icon: GraduationCap  },
      { title: "Deputy Director",         href: "/deputy-director",        description: "Assists the Director in institutional governance and operations",       icon: ShieldCheck    },
      { title: "Academic Administrator",  href: "/academic-administrator", description: "Manages academic coordination, compliance, and execution",             icon: ClipboardCheck },
      { title: "Deans",                   href: "/deans",                  description: "Leads faculties and academic departments",                             icon: Users          },
      { title: "Program Office",          href: "/program-office",         description: "Handles program management, scheduling, and student services",         icon: Briefcase      },
      { title: "Quality & Accreditation", href: "/iqac",                   description: "Ensures IQAC, NAAC, NBA, NIRF & AICTE standards and compliance",      icon: BadgeCheck     },
    ],
  },
  {
    title: "Admissions",
    items: [
      { title: "Overview",     href: "/admissions",          description: "Admission process & eligibility",    icon: Info        },
      // ── Brochure: the MBA 2026–28 PDF served directly from /public/convert.
      // Next.js serves files in /public at the root URL, so the PDF is reachable
      // at "/convert/LEAD MBA 26 - 28.pdf" (spaces URL-encoded as %20).
      // `external: true` makes it open in a new tab with rel="noopener noreferrer".
      {
        title: "Brochure",
        href: "/convert/LEAD%20MBA%2026%20-%2028.pdf",
        description: "Download / view our programmes brochure",
        icon: FileDown,
        external: true,
      },
      { title: "Apply for MBA",href: "https://admission.lead.ac.in/lead-college-of-management-mba-application/", description: "Start your MBA application online", icon: GraduationCap, external: true },
      { title: "Apply for MCA",href: "https://admission.lead.ac.in/lead-college-of-management-mca-application/", description: "Start your MCA application online", icon: MonitorDot,    external: true },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Alumni",              href: "https://alumni.lead.ac.in/",  description: "Our alumni network",     icon: Users,       external: true },
      { title: "ERP Login",           href: "https://leadv4.linways.com/", description: "Student & staff portal", icon: Laptop,      external: true },
      { title: "Grievance Redressal", href: "/grievance-redressal",        description: "Support system",         icon: AlertCircle                 },
      { title: "Library",             href: "/library",                    description: "Learning resources",     icon: Library                     },
    ],
  },
  {
    title: "Life at LEAD",
    items: [
      { title: "Turning Point",           href: "/life-at-lead/turning-point", description: "7-day flagship leadership transformation program",    icon: Sparkles        },
      { title: "Outbound Training (OBT)", href: "/life-at-lead/obt",           description: "Adventure-based experiential leadership learning",    icon: Mountain        },
      { title: "Mentoring",               href: "/life-at-lead/mentoring",     description: "Dedicated faculty mentors guiding student growth",    icon: Handshake       },
      { title: "LEAD Operating Teams",    href: "/life-at-lead/lot",           description: "Student-led teams managing campus initiatives",       icon: Users           },
      { title: "Curio",                   href: "/life-at-lead/curio",         description: "Campus refreshment hub for informal interactions",    icon: Coffee          },
      { title: "Sports & Recreation",     href: "/life-at-lead/sports",        description: "Facilities promoting fitness and teamwork",           icon: Dumbbell        },
      { title: "Hostel",                  href: "/life-at-lead/hostel",        description: "Fully residential campus fostering community living", icon: BedDouble       },
      { title: "Canteen",                 href: "/life-at-lead/canteen",       description: "Nutritious meals and vibrant campus dining",          icon: UtensilsCrossed },
      { title: "Pets & Campus Life",      href: "/life-at-lead/pets",          description: "Unique biodiversity with animals and nature",         icon: PawPrint        },
      { title: "Farm & Nature",           href: "/life-at-lead/farm-nature",   description: "Sustainable living across 24 acres of greenery",     icon: Leaf            },

      { title: "Gallery",                 href: "/life-at-lead/gallery",       description: "Photo gallery capturing campus life moments",         icon: Camera          },
    ],
  },
];