"use client";

import { usePathname } from "next/navigation";

// The /home-v3 preview ships its own dark footer, so the global (light) footer
// is suppressed there to keep the dark theme cohesive. Every other route keeps
// the standard site footer unchanged.
export default function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/home-v3") return null;
  return <>{children}</>;
}
