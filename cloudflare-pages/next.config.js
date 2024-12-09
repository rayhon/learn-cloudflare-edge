const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use standalone output for Cloudflare Pages
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Add path alias
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    
    // Polyfill Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }
    
    return config;
  },
}

module.exports = nextConfig