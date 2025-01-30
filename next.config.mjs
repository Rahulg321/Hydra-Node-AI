/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  //   experimental: {
  //     useCache: true,
  //     dynamicIO: true,
  //     cacheLife: {
  //       // The example above caches for 14 days, checks for updates daily, and expires the cache after 14 days.
  //       biweekly: {
  //         stale: 60 * 60 * 24 * 14, // 14 days
  //         revalidate: 60 * 60 * 24, // 1 day
  //         expire: 60 * 60 * 24 * 14, // 14 days
  //       },
  //     },
  //   },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hydranode.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "seeklogo.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
