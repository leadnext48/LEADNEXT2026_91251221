import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    // Serve AVIF first (smaller than WebP), falling back to WebP, then original.
    // Improves LCP and total image weight with no markup changes.
    formats: ["image/avif", "image/webp"],
remotePatterns: [
{ protocol: "https", hostname: "images.unsplash.com" },
{ protocol: "https", hostname: "source.unsplash.com" },
{ protocol: "https", hostname: "images.pexels.com" },
{ protocol: "https", hostname: "me7aitdbxq.ufs.sh" },
{ protocol: "https", hostname: "cdn.sanity.io" },
],
},

  // Tree-shake large barrel packages so only the icons/APIs actually used are
  // bundled, cutting client JS (helps the Performance score).
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      // Academic Administrator was renamed to Registrar — keep old links working.
      { source: "/academic-administrator", destination: "/registrar", permanent: true },
    ];
  },
};

export default nextConfig;
