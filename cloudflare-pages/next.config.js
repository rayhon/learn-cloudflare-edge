/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  // Configure for Cloudflare Pages
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: false,
  },
  webpack: (config, { isServer }) => {
    // Add path alias
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    // Handle browser-specific globals
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        process: false,
      };
    }

    return config;
  },
}

module.exports = nextConfig