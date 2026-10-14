import type { NextConfig } from "next";

// Static export works on both GitHub Pages and Vercel.
// On a GitHub Pages project site (https://<user>.github.io/<repo>) set
// NEXT_PUBLIC_BASE_PATH=/<repo>. Leave it empty for Vercel or a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Hide the floating "N" dev-tools button shown by `next dev`.
  devIndicators: false,
};

export default nextConfig;
