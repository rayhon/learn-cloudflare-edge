/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  // Add this configuration for proper static file serving
  assetPrefix: process.env.NODE_ENV === 'production' ? '/_next' : '',
  distDir: '.next',
  generateBuildId: async () => 'build'
}

module.exports = nextConfig 