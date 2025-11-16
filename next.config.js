/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    // Cloudflare Pages requires unoptimized images or custom loader
    unoptimized: true,
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Output standalone for Cloudflare
  output: 'standalone',
}

module.exports = nextConfig
