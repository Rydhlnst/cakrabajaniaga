import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — multiple lockfiles exist above this folder.
  turbopack: { root: __dirname },
  images: {
    // All current assets are served locally from /public. These patterns are a
    // safety net for future RankPill webhook articles whose featured_image may
    // still point at a remote host before it is localised.
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.hostinger.com" },
      { protocol: "https", hostname: "*.hostinger.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "*.r2.dev" },
    ],
  },
};

export default nextConfig;
