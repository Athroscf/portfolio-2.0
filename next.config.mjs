/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "/imageLoader.js",
  },
  experimental: {
    appDir: true,
    serverActions: false,
  },
};

export default nextConfig;
