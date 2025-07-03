/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // autorise tous les noms de domaines
      },
    ],
  },
};

export default nextConfig;
