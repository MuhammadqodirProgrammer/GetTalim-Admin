/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeImages: true,
  compress: true,
  preload: true,
  images: {
    domains: ["fakestoreapi.com"],
  },
  sassOptions: {
    includePaths: ["path/to/sass/directory"],
  },
};

module.exports = nextConfig;
