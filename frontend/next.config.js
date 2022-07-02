/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cloudflare-ipfs.com','placeimg.com','ryuzetsu.vercel.app'],
  },
}
module.exports = nextConfig