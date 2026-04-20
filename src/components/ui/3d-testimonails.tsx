import React, { ComponentPropsWithoutRef, useRef } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  children: React.ReactNode
  vertical?: boolean
  repeat?: number
  ariaLabel?: string
  ariaLive?: "off" | "polite" | "assertive"
  ariaRole?: string
}

export function Marquee({
  className,
  children,
  vertical = false,
  repeat = 1,
  ariaLabel,
  ariaLive = "off",
  ariaRole = "presentation",
  ...props
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)

  return (
    <div
      {...props}
      ref={marqueeRef}
      className={cn(
        "flex overflow-hidden gap-4",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role={ariaRole}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 gap-4",
            vertical ? "flex-col" : "flex-row",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
