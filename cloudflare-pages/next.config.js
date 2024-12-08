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
  // Configure output for Cloudflare Pages
  output: 'standalone',
  distDir: '.next'
}

module.exports = nextConfig