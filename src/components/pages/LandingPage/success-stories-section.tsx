"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { cinzel, playfair } from "@/app/fonts"
import { ImageMarqueeBackground } from "@/components/ui/image-marquee-bg"
import Link from "next/link"
import { ArrowUpRight, FileText } from "lucide-react"

/* ------------------ Data ------------------ */
const stats = [
  { value: "22 LPA", label: "Highest Package" },
  { value: "100%", label: "Placement Assurance" },
  { value: "3000+", label: "Global Alumni Network" },
  { value: "10+", label: "Specializations Offered" },
  { value: "40+", label: "Expert Faculty Members" },
  { value: "15+", label: "Years of Excellence" },
]

/* ------------------ Motion Variants ------------------ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

/* ------------------ Component ------------------ */
export default function SuccessStoriesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-20 xl:px-8 xl:py-20">

        {/* Static 3D Background */}
        <div className="pointer-events-none absolute inset-y-0 right-[-10%] top-0 z-0 w-[60%]">
          <div className="relative h-full w-full opacity-40">
            <ImageMarqueeBackground className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-l from-white via-white/30 to-white/0" />
          </div>
        </div>

        {/* Foreground Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 w-full text-left lg:w-[78%] xl:w-[80%]"
        >
          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            style={{
              background: "linear-gradient(90deg, #0D0D0D 0%, #005C9F 62%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
            className={cn(
              "font-bold leading-tight",
              "text-3xl sm:text-4xl lg:text-3xl xl:text-5xl",
              cinzel.className,
            )}
          >
            LEAD by the Numbers
          </motion.h2>

          {/* Subheading */}
          <motion.h3
            variants={fadeUp}
            className={cn(
              "mt-3 font-semibold text-black",
              "text-xl sm:text-2xl lg:text-lg xl:text-2xl",
              cinzel.className,
            )}
          >
            A legacy written in results.
          </motion.h3>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className={cn(
              "mt-4 max-w-3xl leading-relaxed text-black/70",
              "text-base sm:text-lg lg:text-sm xl:text-lg",
              playfair.className,
            )}
          >
            At LEAD, performance isn't presented — it's built. From placements to
            specializations, every milestone reflects a campus designed for
            clarity, competence, and real-world confidence.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            variants={stagger}
            className="mt-10 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-8"
          >
            {stats.map((item) => (
              <motion.div key={item.label} variants={fadeUp}>
                <div
                  className={cn(
                    "font-semibold tracking-wide text-black",
                    "text-3xl sm:text-4xl lg:text-2xl xl:text-4xl",
                    cinzel.className,
                  )}
                >
                  {item.value}
                </div>
                <div
                  className={cn(
                    "mt-2 font-semibold uppercase tracking-wide text-black/70",
                    "text-sm lg:text-xs xl:text-sm",
                    cinzel.className,
                  )}
                >
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            {/* Primary — dark blue to blue gradient */}
            <Link
              href="/placements"
              className={cn(
                "inline-flex items-center gap-2 group",
                "px-5 py-2.5",
                "transition-all duration-200 hover:opacity-90 hover:-translate-y-px",
                cinzel.className,
              )}
              style={{
                background: "linear-gradient(135deg, #0a2463 0%, #005C9F 100%)",
                borderRadius: 8,
                boxShadow: "0 4px 18px rgba(10,36,99,0.28)",
              }}
            >
              <span
                className="font-semibold uppercase tracking-[0.16em] text-[0.74rem] text-white"
              >
                Explore Placement Record
              </span>
              <ArrowUpRight
                size={11}
                strokeWidth={2.5}
                className="text-white/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            {/* Secondary — white with dark blue to blue gradient border */}
            <button
              onClick={() => {/* wire up when ready */}}
              className={cn(
                "inline-flex items-center gap-2 group",
                "px-5 py-2.5",
                "bg-white hover:bg-black/[0.02]",
                "transition-all duration-200 hover:-translate-y-px",
                cinzel.className,
              )}
              style={{
                borderRadius: 8,
                border: "1px solid transparent",
                backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #0a2463 0%, #005C9F 100%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              <FileText
                size={11}
                strokeWidth={2}
                className="text-[#0a2463]/50 group-hover:text-[#0a2463]/80 transition-colors duration-200"
              />
              <span
                className="font-semibold uppercase tracking-[0.16em] text-[0.74rem] text-[#0a2463]/60 group-hover:text-[#0a2463]/90 transition-colors duration-200"
              >
                2024–26 Placement Summary
              </span>
            </button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}