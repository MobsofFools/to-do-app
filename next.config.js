/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
    loader:"custom",
  },
  trailingSlash:true,

}

module.exports = nextConfig
