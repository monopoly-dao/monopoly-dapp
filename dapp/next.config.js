/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com', 'lh3.googleusercontent.com', 'img.freepik.com']
  },
  swcMinify: true,
  webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      }

    return config;
  }
}

module.exports = nextConfig
