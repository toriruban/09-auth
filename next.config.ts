import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "notehub-public.goit.study" },
      { protocol: "https", hostname: "ac.goit.global" },
    ],
  },
  async headers() {
    return [
      {
        source: "/sign-in",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/sign-up",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://notehub-api.goit.study/:path*",
      },
    ];
  },
};

export default nextConfig;