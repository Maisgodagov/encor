import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
