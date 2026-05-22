/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['@sentry/nextjs'],
  },
}

module.exports = nextConfig
