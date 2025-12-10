/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['*.pages.dev', 'localhost:3000'],
    },
  },
}

module.exports = nextConfig
