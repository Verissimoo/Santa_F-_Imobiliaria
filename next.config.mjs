/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vfrlzgnsivxgyaeqynuk.supabase.co', // Host do seu projeto Supabase
      },
    ],
  },
};

export default nextConfig;
