import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/api/entry-source/config",
      },
    ];
  },
};

export default nextConfig;
