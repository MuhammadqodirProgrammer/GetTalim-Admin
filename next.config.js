/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeImages: true,
  compress: true,
  preload: true,
  images: {
    domains: ["64.227.42.134"],
    
  },
  sassOptions: {
    includePaths: ["path/to/sass/directory"],
  },
};

module.exports = nextConfig;
