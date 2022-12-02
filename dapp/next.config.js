/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pixura.imgix.net',
        port: '',
        pathname: '/*'
      }
    ]
  },
  swcMinify: true,
  future: {
    webpack5: true,
  },
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
