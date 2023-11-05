/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
    {
            source: "/:path*",
            headers: [
              {
                key: "Cache-Control",
                value: "no-store",
              },
            ],
          },
        ]
    },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.resolve.fallback = {

      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,  

      fs: false, // the solution
      tls: false,
      dns: false

    };
    return config;
  },
}

module.exports = nextConfig
