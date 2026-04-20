"use client";

import React from "react";
import { SPACE } from "@/lib/design-tokens";

interface LifeSectionGridProps {
  children: React.ReactNode;
  columns?: 2 | 3;
}

export default function LifeSectionGrid({ children, columns = 3 }: LifeSectionGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${columns === 3 ? "300px" : "360px"}, 1fr))`,
        gap: SPACE.colGapMd,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
