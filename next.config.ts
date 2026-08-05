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
  async rewrites() {
    return [
      // RankPill's webhook integration is configured to POST to
      // /hcgi/api/webhook. Map that path to the real route handler so we don't
      // duplicate logic. Rewrites preserve method + raw body, so the HMAC
      // signature check in the handler still validates.
      { source: "/hcgi/api/webhook", destination: "/api/rankpill-webhook" },
    ];
  },
};

export default nextConfig;
