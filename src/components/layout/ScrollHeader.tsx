"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/ui/header-3";

export default function ScrollHeader() {
  const pathname = usePathname();

  // The homepage at "/" renders its own always-visible header (blue strip +
  // Header) inside the page, so suppress this one there to avoid a double nav.
  if (pathname === "/") return null;

  // Every other page: render the header as a normal sticky header that is
  // ALWAYS visible and stays in the document flow. Because it is sticky (not
  // fixed), it reserves its own height at the top of the page, so page content
  // starts below it and is never hidden/overlapped by the nav bar.
  return <Header />;
}
