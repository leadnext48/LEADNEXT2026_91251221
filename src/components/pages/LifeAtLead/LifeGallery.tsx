"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RADIUS, SHADOWS, TRANS } from "@/lib/design-tokens";

interface GalleryItem {
  src: string;
  alt: string;
}

interface LifeGalleryProps {
  items: GalleryItem[];
}

export default function LifeGallery({ items }: LifeGalleryProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
        width: "100%",
      }}
    >
      {items.map((item, i) => (
        <GalleryImage key={i} src={item.src} alt={item.alt} />
      ))}
    </div>
  );
}

function GalleryImage({ src, alt }: GalleryItem) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: RADIUS.card,
        boxShadow: hovered ? SHADOWS.cardHov : SHADOWS.card,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: TRANS.lift,
        cursor: "pointer",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "3/2",
          objectFit: "cover",
          display: "block",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.5s cubic-bezier(.22,1,.36,1)",
        }}
      />
    </div>
  );
}
