// components/ui/gradual-spacing.tsx
"use client";

import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  initialDelay?: number;
  className?: string;
  style?: CSSProperties;
}

export function GradualSpacing({
  text,
  duration = 0.45,
  delayMultiple = 0.04,
  initialDelay = 0,
  className,
  style,
}: GradualSpacingProps) {
  return (
    <>
      <style>{`
        @keyframes gs-in {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .gs-char {
          display: inline-block;
          opacity: 0;
          animation-name: gs-in;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }
      `}</style>

      <div className="flex justify-center flex-wrap">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className={cn("gs-char drop-shadow-sm", className)}
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${initialDelay + i * delayMultiple}s`,
              whiteSpace: char === " " ? "pre" : undefined,
              ...style,
            } as CSSProperties}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        <span className="sr-only">{text}</span>
      </div>
    </>
  );
}