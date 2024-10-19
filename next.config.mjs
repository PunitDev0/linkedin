/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: true,
      experimental: {
        appDir: true, // Remove or enable depending on your setup
      },
      images: {
        domains: ['avatars.githubusercontent.com'],
      },
};

export default nextConfig;
