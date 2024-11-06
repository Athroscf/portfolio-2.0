/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
    serverActions: false,
  },
};

export default nextConfig;
