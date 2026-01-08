/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow webhook routes to receive raw body
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig
