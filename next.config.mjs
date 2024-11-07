/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    FUNCTION_URL: process.env.FUNCTION_URL || "",
  },
};

export default nextConfig;
