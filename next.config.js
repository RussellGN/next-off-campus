/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         { hostname: "localhost", port: "8000", protocol: "http" },
         { hostname: "127.0.0.1", port: "8000", protocol: "http" },
      ],
   },
};

module.exports = nextConfig;
