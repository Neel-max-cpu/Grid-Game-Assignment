import type { NextConfig } from "next";

const nextConfig = {
  reactCompiler: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
