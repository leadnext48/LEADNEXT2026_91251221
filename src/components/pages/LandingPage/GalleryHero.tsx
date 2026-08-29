"use client"

import { Ref, forwardRef, useState, useEffect, useRef } from "react"
import Image, { ImageProps } from "next/image"
import Link from "next/link"
import { motion, useMotionValue, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { cinzel, playfair } from "@/app/fonts"
import { ArrowUpRight } from "lucide-react"

/* ------------------ Types ------------------ */
type Direction = "left" | "right"

/* ------------------ Data ------------------ */
const photos = [
  {
    id: 1,
    order: 0,
    x: "-320px",
    y: "15px",
    zIndex: 50,
    direction: "left" as Direction,
    src: "/convert/LEAD09.webp",
  },
  {
    id: 2,
    order: 1,
    x: "-160px",
    y: "32px",
    zIndex: 40,
    direction: "left" as Direction,
    src: "/convert/LEAD17.webp",
  },
  {
    id: 3,
    order: 2,
    x: "0px",
    y: "8px",
    zIndex: 30,
    direction: "right" as Direction,
    src: "/convert/LEAD22.webp",
  },
  {
    id: 4,
    order: 3,
    x: "160px",
    y: "22px",
    zIndex: 20,
    direction: "right" as Direction,
    src: "/convert/LEAD35.webp",
  },
  {
    id: 5,
    order: 4,
    x: "320px",
    y: "44px",
    zIndex: 10,
    direction: "left" as Direction,
    src: "/convert/LEAD38.webp",
  },
]

/* ------------------ Helpers ------------------ */
function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) throw new Error("Min value should be less than max value")
  return Math.random() * (max - min) + min
}

/* ------------------ MotionImage ------------------ */
const MotionImage = motion(
  forwardRef(function MotionImage(
    props: ImageProps,
    ref: Ref<HTMLImageElement>,
  ) {
    return <Image ref={ref} {...props} />
  }),
)

/* ------------------ Photo ------------------ */
const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
  ...props
}: {
  src: string
  alt: string
  className?: string
  direction?: Direction
  width: number
  height: number
}) => {
  const [rotation, setRotation] = useState<number>(0)
  const x = useMotionValue(200)
  const y = useMotionValue(200)

  useEffect(() => {
    const randomRotation =
      getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1)
    setRotation(randomRotation)
  }, [])

  function handleMouse(event: {
    currentTarget: { getBoundingClientRect: () => DOMRect }
    clientX: number
    clientY: number
  }) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  const resetMouse = () => {
    x.set(200)
    y.set(200)
  }

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{ scale: 1.1, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing",
      )}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
        <MotionImage
          className="rounded-2xl object-cover"
          fill
          src={src}
          alt={alt}
          {...props}
          draggable={false}
        />
      </div>
    </motion.div>
  )
}

/* ------------------ Custom variant type ------------------ */
type PhotoCustom = {
  x: string
  y: string
  order: number
}

/* ------------------ PhotoGallery ------------------ */
export const PhotoGallery = ({
  animationDelay = 0.3,
}: {
  animationDelay?: number
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const visibilityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          visibilityTimerRef.current = setTimeout(() => {
            setIsVisible(true)
          }, animationDelay * 1000)
          animationTimerRef.current = setTimeout(() => {
            setIsLoaded(true)
          }, (animationDelay + 0.4) * 1000)
        } else {
          if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current)
          if (animationTimerRef.current) clearTimeout(animationTimerRef.current)
          setIsVisible(false)
          setIsLoaded(false)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(section)
    return () => {
      observer.disconnect()
      if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current)
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current)
    }
  }, [animationDelay])

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const photoVariants = {
    hidden: (_custom: PhotoCustom) => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    }),
    visible: (custom: PhotoCustom) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20"
    >
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,92,159,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Corner accents */}
      <div className="pointer-events-none absolute top-7 left-7 w-10 h-10 border-t border-l border-[rgba(0,92,159,0.25)] z-0" />
      <div className="pointer-events-none absolute bottom-7 right-7 w-10 h-10 border-b border-r border-[rgba(0,92,159,0.25)] z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">

        {/* Eyebrow label */}
        <div className="flex items-center gap-3 mb-5">
          <span className="inline-block w-5 h-px bg-[#005C9F]" />
          <p
            className={cn(
              "text-[0.74rem] font-semibold uppercase tracking-[0.3em] text-[#005C9F]",
              cinzel.className,
            )}
          >
            Campus Gallery
          </p>
          <span className="inline-block w-5 h-px bg-[#005C9F]" />
        </div>

        {/* Title */}
        <h2
          className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight mb-4",
            cinzel.className,
          )}
          style={{
            background: "linear-gradient(90deg, #0D0D0D 0%, #005C9F 62%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Moments That Stay Forever
        </h2>

        {/* Divider */}
        <div className="w-10 h-0.5 bg-[#005C9F] mb-4" />

        {/* Description — mb reduced to pull images closer */}
        <p
          className={cn(
            "text-xs md:text-sm text-black/50 text-center max-w-md leading-relaxed mb-3",
            playfair.className,
          )}
        >
          Every frame tells a story. Drag, explore, and feel the pulse of life at LEAD.
        </p>

        {/* Photo gallery */}
        <div className="relative h-[350px] w-full flex items-center justify-center">
          <motion.div
            className="relative mx-auto flex w-full max-w-7xl justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="relative flex w-full justify-center"
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              <div className="relative h-[220px] w-[220px]">
                {[...photos].reverse().map((photo) => (
                  <motion.div
                    key={photo.id}
                    className="absolute left-0 top-0"
                    style={{ zIndex: photo.zIndex }}
                    variants={photoVariants}
                    custom={{ x: photo.x, y: photo.y, order: photo.order }}
                  >
                    <Photo
                      width={220}
                      height={220}
                      src={photo.src}
                      alt="LEAD campus life"
                      direction={photo.direction}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            href="/life-at-lead/gallery"
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
            <span className="font-semibold uppercase tracking-[0.18em] text-[0.72rem] text-white">
              Explore Full Gallery
            </span>
            <ArrowUpRight
              size={11}
              strokeWidth={2.5}
              className="text-white/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <p
            className={cn(
              "text-[0.74rem] text-black/30 tracking-widest uppercase",
              cinzel.className,
            )}
          >
            Hundreds of moments. One campus.
          </p>
        </div>

      </div>
    </section>
  )
}