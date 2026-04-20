import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
remotePatterns: [
{ protocol: "https", hostname: "images.unsplash.com" },
{ protocol: "https", hostname: "source.unsplash.com" },
{ protocol: "https", hostname: "images.pexels.com" },
{ protocol: "https", hostname: "me7aitdbxq.ufs.sh" },
],
},
};

export default nextConfig;
