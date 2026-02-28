import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
