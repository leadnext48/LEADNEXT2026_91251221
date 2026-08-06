"use client"

import Image from "next/image"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"
import { cinzel, playfair } from "@/app/fonts"

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 py-16 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-8 md:grid-cols-4 md:px-20">
        {/* Logo */}
        <div>
          <Image
            src="/logolead.png"
            alt="LEAD College Logo"
            width={150}
            height={50}
            className="mb-4"
            priority
          />
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={cn("mb-4 text-xl font-bold uppercase", cinzel.className)}>
            Quick Links
          </h3>

          <ul className={cn("space-y-2 text-sm text-white/85", playfair.className)}>
            <li>
              <a href="/" className="transition-colors hover:text-[#085eaa]">
                Home
              </a>
            </li>
            <li>
              <a href="/mba" className="transition-colors hover:text-[#085eaa]">
                MBA
              </a>
            </li>
            <li>
              <a href="/mca" className="transition-colors hover:text-[#085eaa]">
                MCA
              </a>
            </li>
            <li>
              <a href="/admissions" className="transition-colors hover:text-[#085eaa]">
                Admissions
              </a>
            </li>
            <li>
              <a href="/placements" className="transition-colors hover:text-[#085eaa]">
                Placements
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className={cn("mb-4 text-xl font-bold uppercase", cinzel.className)}>
            Contact
          </h3>

          <div className={cn("space-y-2 text-sm text-white/85", playfair.className)}>
            <p>
              LEAD College
              <br />
              Dhoni PO, Palakkad
              <br />
              Kerala, India – 678009
            </p>

            <p>Landline: 0491 2553693, 2553663</p>
            <p>Mobile: +91 9497713693</p>
            <p>Emails: info@lead.ac.in, mail@lead.ac.in</p>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className={cn("mb-4 text-xl font-bold uppercase", cinzel.className)}>
            Follow Us
          </h3>

          <div className="flex gap-4 text-white">
            <a href="https://www.youtube.com/@leadcollegeofficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-colors hover:text-[#085eaa]">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/lead_college_official/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-[#085eaa]">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://in.linkedin.com/school/lead-college-autonomous/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-[#085eaa]">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/leadcollegeofficial/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-colors hover:text-[#085eaa]">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className={cn("mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/60", playfair.className)}>
        &copy; {new Date().getFullYear()} LEAD College. All rights reserved.
      </div>
    </footer>
  )
}