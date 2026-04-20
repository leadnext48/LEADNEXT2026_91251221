"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/3d-testimonails"

const images = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
]

function ImageCard({ src }: { src: string }) {
  return (
    <div className="relative h-24 w-44 overflow-hidden rounded-xl bg-white/5 shadow-sm">
      <Image src={src} alt="campus" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  )
}

export function ImageMarqueeBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-[360px] w-full overflow-hidden flex items-center justify-center",
        "[perspective:900px]", // 👈 perspective restored
        className,
      )}
    >
      {/* 3D tilted container (STATIC) */}
      <div
        className="flex gap-6 opacity-40"
        style={{
          transform:
            "translateX(-80px) translateZ(-120px) rotateX(22deg) rotateY(-14deg) rotateZ(18deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Column 1 */}
        <Marquee vertical>
          {images.map((src, idx) => (
            <ImageCard key={`col1-${idx}`} src={src} />
          ))}
        </Marquee>

        {/* Column 2 */}
        <Marquee vertical>
          {images.map((src, idx) => (
            <ImageCard key={`col2-${idx}`} src={src} />
          ))}
        </Marquee>

        {/* Column 3 */}
        <Marquee vertical>
          {images.map((src, idx) => (
            <ImageCard key={`col3-${idx}`} src={src} />
          ))}
        </Marquee>
      </div>

      {/* Soft vignette fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white" />
    </div>
  )
}
