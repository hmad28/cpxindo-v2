/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    localPatterns: [{ pathname: '/images/**' }],
  },
  turbopack: {},
};
export default nextConfig;
