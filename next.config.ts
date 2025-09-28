import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["i.ibb.co"],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};export default nextConfig;
