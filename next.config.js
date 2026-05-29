/** @type {import('next').NextConfig} */
const nextConfig = {
  // No 'output: export' — we need API routes for Groq proxy
  // Deploy to Vercel (free) instead of GitHub Pages
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
