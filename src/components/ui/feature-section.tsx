"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { cinzel, playfair } from "@/app/fonts"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const leftColRef = useRef<HTMLDivElement>(null)
  const [leftHeight, setLeftHeight] = useState<number>(0)

  useEffect(() => {
    const measure = () => {
      if (leftColRef.current) {
        setLeftHeight(leftColRef.current.offsetHeight)
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    const next = (currentFeature + 1) % features.length
    const img = new window.Image()
    img.src = features[next].image
  }, [currentFeature, features])

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col overflow-hidden",
        className,
      )}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col h-full px-6 py-6 md:px-8 md:py-8 lg:px-12 lg:py-8">

        {/* Title */}
        <h2
          className={cn(
            "text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-center",
            "mb-10 md:mb-8 lg:mb-10 xl:mb-12 shrink-0",
            cinzel.className,
          )}
        >
          {title}
        </h2>

        {/* Body — 50/50 */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-8 lg:gap-10 flex-1 min-h-0 items-center">

          {/* Left — text */}
          <div
            ref={leftColRef}
            className="order-2 md:order-1 flex flex-col justify-center space-y-4 md:space-y-5 lg:space-y-7 w-full"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 md:gap-5 lg:gap-7 cursor-pointer"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setCurrentFeature(index)
                  setProgress(0)
                }}
              >
                {/* Step circle */}
                <motion.div
                  className={cn(
                    cinzel.className,
                    "shrink-0 w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border-2 mt-0.5",
                    index === currentFeature
                      ? "bg-primary border-primary text-primary-foreground scale-110"
                      : "bg-muted border-muted-foreground",
                  )}
                >
                  {index <= currentFeature ? (
                    <span className="text-xs md:text-sm lg:text-base font-semibold">✓</span>
                  ) : (
                    <span className="text-xs md:text-sm lg:text-base font-medium">
                      {index + 1}
                    </span>
                  )}
                </motion.div>

                <div className="flex-1">
                  {/* Subtitle */}
                  <h3
                    className={cn(
                      "text-base md:text-lg lg:text-xl font-semibold",
                      cinzel.className,
                    )}
                  >
                    {feature.title || feature.step}
                  </h3>

                  {index === currentFeature && (
                    <div className="w-full h-0.5 bg-muted mt-1.5 mb-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-none"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Paragraph */}
                  <p
                    className={cn(
                      "text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed",
                      playfair.className,
                    )}
                  >
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — image, exact same height as left column */}
          <div
            className="order-1 md:order-2 relative w-full rounded-xl overflow-hidden bg-muted"
            style={{
              height: leftHeight > 0 ? `${leftHeight}px` : "360px",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="absolute inset-0"
                style={{
                  opacity: index === currentFeature ? 1 : 0,
                  transition: "opacity 0.7s ease-in-out",
                  zIndex: index === currentFeature ? 1 : 0,
                }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title || feature.step}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}