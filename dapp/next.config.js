/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/monopoly-dao.appspot.com/o/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dpoygzdfl/image/upload/**',
      },
    ],
    // domains: [
    //   'images.pexels.com',
    //   'lh3.googleusercontent.com',
    //   'img.freepik.com',
    //   'firebasestorage.googleapis.com',
    // ],
  },
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Prevent inclusion of 'fs' module on the client
        path: false, // Prevent inclusion of 'path' module on the client
      };
    }
    return config;
  },
};

module.exports = nextConfig;
