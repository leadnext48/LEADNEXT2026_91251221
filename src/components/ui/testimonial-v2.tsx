"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { cinzel, playfair } from "@/app/fonts"

// --- Types ---
interface Testimonial {
  text: string
  image: string
  name: string
  role: string
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "The placement support here is genuinely structured. From resume reviews to mock interviews — it felt like a real career launchpad.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ananya Menon",
    role: "MBA Student • 2024–26 Batch",
  },
  {
    text: "The campus culture helped me grow beyond academics. I gained confidence, leadership skills, and a strong peer network.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Arjun Nair",
    role: "MBA Student • Student Council President",
  },
  {
    text: "What stood out was the mentorship. Faculty were accessible, practical, and focused on making learning career-relevant.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Fathima Azeez",
    role: "MCA Student • Final Year (2023–26)",
  },
  {
    text: "The training sessions were industry-like — presentations, teamwork, and real feedback. It prepared me for my first job confidently.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Rahul Das",
    role: "MBA Graduate • Business Analyst (Campus Placement)",
  },
  {
    text: "A calm campus, strong academic structure, and great student life. It felt like the right place to build focus and momentum.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Meera Suresh",
    role: "MBA Student • 2023–25 Batch",
  },
  {
    text: "Workshops, guest sessions, and practical projects made learning feel real. Not just theory — we were building skills weekly.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sreenath K",
    role: "MCA Student • 2022–25 Batch",
  },
  {
    text: "I loved the career guidance and the discipline it gave me. The environment makes you want to improve consistently.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Nivedh Raj",
    role: "MCA Alumni • Software Engineer at HCL",
  },
  {
    text: "The campus gave me both comfort and challenge — a place where I could focus, perform, and still enjoy college life.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aishwarya P",
    role: "MBA Student • 2023–25 Batch",
  },
  {
    text: "From day one, the system was clear — learning, training, and growth. It feels premium and structured in a good way.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Vishnu S",
    role: "MCA Student • 2024–26 Batch",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

// --- Column Component ---
function TestimonialsColumn({
  testimonials,
  className,
  duration = 10,
}: {
  testimonials: Testimonial[]
  className?: string
  duration?: number
}) {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 list-none m-0 p-0"
      >
        {Array.from({ length: 2 }, (_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, name, role }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow:
                    "0 25px 50px -12px rgba(0,0,0,0.12), 0 10px 10px -5px rgba(0,0,0,0.06)",
                }}
                whileFocus={{
                  scale: 1.03,
                  y: -8,
                  boxShadow:
                    "0 25px 50px -12px rgba(0,0,0,0.12), 0 10px 10px -5px rgba(0,0,0,0.06)",
                }}
                className="p-10 rounded-3xl border border-neutral-200 bg-white shadow-lg max-w-xs w-full cursor-default select-none focus:outline-none focus:ring-2 focus:ring-neutral-300"
              >
                <blockquote>
                  <p
                    className={cn(
                      "text-neutral-700 leading-relaxed",
                      playfair.className,
                    )}
                  >
                    {text}
                  </p>

                  <footer className="flex items-center gap-3 mt-6">
                    <span
                      aria-hidden
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#005C9F] text-base font-semibold text-white ring-2 ring-neutral-100",
                        cinzel.className,
                      )}
                    >
                      {name
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="flex flex-col">
                      <cite className="text-[15px] font-semibold not-italic text-neutral-900">
                        {name}
                      </cite>
                      <span className="text-sm text-neutral-500 mt-0.5">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  )
}

// --- Main Component ---
export function TestimonialsV2() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-24 relative overflow-hidden bg-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="container px-4 mx-auto"
      >
        <div className="flex flex-col items-center max-w-[650px] mx-auto mb-16">
          <h2
            id="testimonials-heading"
            className={cn(
              "text-4xl md:text-5xl font-extrabold tracking-tight text-center text-neutral-900",
              cinzel.className,
            )}
          >
            Voices That Matter
          </h2>

          <p
            className={cn(
              "mt-5 text-center text-lg leading-relaxed text-neutral-600 max-w-xl",
              playfair.className,
            )}
          >
            Perspectives from learners, recruiters, and partners who’ve experienced LEAD up close.
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mt-10 max-h-[740px] overflow-hidden
          [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </motion.div>
    </section>
  )
}
