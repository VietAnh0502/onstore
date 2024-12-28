import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [{
      hostname: 'global.bonanzasatrangi.com',
    }]
  },
};

export default nextConfig;
