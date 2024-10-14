/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: false, // or true, based on your app structure
      },
      images: {
        domains: ['avatars.githubusercontent.com'],
      },
};

export default nextConfig;
