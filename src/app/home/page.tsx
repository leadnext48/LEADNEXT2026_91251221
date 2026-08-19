import type { Metadata } from "next";
import LegacyGate from "@/components/pages/HomeV2/LegacyGate";
import LegacyHomepage from "@/components/pages/LegacyHomepage";

// The earlier (v1) homepage, preserved behind a password gate and kept out of
// search indexes. Not linked from public navigation — reachable only by URL.
export const metadata: Metadata = {
  title: "Legacy Homepage — LEAD College",
  robots: { index: false, follow: false },
  alternates: { canonical: "/home" },
};

export default function LegacyHomeRoute() {
  return (
    <LegacyGate>
      <LegacyHomepage />
    </LegacyGate>
  );
}
