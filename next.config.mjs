/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: false,
      experimental: {
        appDir: true, // Remove or enable depending on your setup
      },
      images: {
        domains: ['avatars.githubusercontent.com', 'res.cloudinary.com'], // Include all domains
      },
};

export default nextConfig;
