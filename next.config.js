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
  // Disable caching for dynamic pages
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
