"use client";

import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import { COLORS, TYPE, SPACE, SHADOWS, RADIUS, TRANS, GRADIENTS } from "@/lib/design-tokens";

interface LifeFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

export default function LifeFeatureCard({ icon: Icon, title, description, href }: LifeFeatureCardProps) {
  const [hovered, setHovered] = useState(false);

  const card = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "#fff",
        border: `1px solid ${hovered ? COLORS.borderHov : COLORS.border}`,
        borderRadius: RADIUS.card,
        padding: SPACE.cardPadLg,
        boxShadow: hovered ? SHADOWS.cardHov : SHADOWS.card,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: TRANS.lift,
        cursor: href ? "pointer" : "default",
        overflow: "hidden",
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: GRADIENTS.primary90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.25rem",
          boxShadow: "0 6px 16px rgba(0, 92, 159, 0.25)",
        }}
      >
        <Icon size={20} color="#fff" strokeWidth={2} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: cinzel.style.fontFamily,
          ...TYPE.heading,
          color: COLORS.primary,
          margin: "0 0 0.6rem",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: playfair.style.fontFamily,
          ...TYPE.caption,
          color: COLORS.textMuted,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );

  if (href) {
    return <a href={href} style={{ textDecoration: "none", color: "inherit" }}>{card}</a>;
  }

  return card;
}
