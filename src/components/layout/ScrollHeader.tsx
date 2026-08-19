"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/ui/header-3";

export default function ScrollHeader() {
  const pathname = usePathname();
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!triggerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, []);

  // The new homepage at "/" renders its own always-visible header (blue strip
  // + Header), so suppress the scroll-reveal global header there to avoid a
  // double nav. The legacy homepage at /home keeps the scroll-reveal header.
  if (pathname === "/") return null;

  return (
    <>
      {/* Invisible trigger just below hero */}
      <div ref={triggerRef} className="h-px w-full" />

      {/* Header */}
      <div
        className={`
          fixed top-0 left-0 z-50 w-full
          transition-transform duration-300 ease-out
          ${visible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <Header />
      </div>
    </>
  );
}
