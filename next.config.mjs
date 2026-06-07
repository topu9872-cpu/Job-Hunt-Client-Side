/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
 images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**",
    },
    {
      protocol: "http",
      hostname: "**",
    },
  ],
},
experimental: {
serverComponentsExternalPackages: ['@better-auth/kysely-adapter'],
},
};

export default nextConfig;