/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false, // 👈 Turn this off to prevent SWC from breaking child array introspection
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  serverExternalPackages: ['recharts'],
  experimental: {
    serverComponentsExternalPackages: ['@better-auth/kysely-adapter'],
  },
};

export default nextConfig;