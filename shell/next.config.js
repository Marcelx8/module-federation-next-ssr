// /**
//  * @type {import('next').NextConfig}
//  **/
const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');
const withPlugins = require('next-compose-plugins');
const FederatedStatsPlugin = require('webpack-federated-stats-plugin');

const name = 'shell';
const exposes = {
  './shell': './pages/shell.tsx',
  './pages-map': './pages-map.ts',
};
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    shell: process.env.VERCEL
    ? `shell@https://module-federation-next-ssr-shell.vercel.app/_next/static/${location}/remoteEntry.js?${Date.now()}`
    : `shell@http://localhost:3000/_next/static/${location}/remoteEntry.js?${Date.now()}`,
    home: process.env.VERCEL
    ? `home@https://module-federation-next-ssr-home.vercel.app/_next/static/${location}/remoteEntry.js?${Date.now()}`
    : `home@http://localhost:3001/_next/static/${location}/remoteEntry.js?${Date.now()}`,
    products: process.env.VERCEL
    ? `products@https://module-federation-next-ssr-products.vercel.app/_next/static/${location}/remoteEntry.js?${Date.now()}`
    : `products@http://localhost:3002/_next/static/${location}/remoteEntry.js?${Date.now()}`,
    ui: process.env.VERCEL
    ? `ui@https://module-federation-next-ssr-ui.vercel.app/_next/static/${location}/remoteEntry.js?${Date.now()}`
    : `ui@http://localhost:3003/_next/static/${location}/remoteEntry.js?${Date.now()}`,
  };
};

const nextConfig = {
  webpack(config, options) {
    const { webpack, isServer } = options;

    if (!isServer) {
      config.plugins.push(
        new FederatedStatsPlugin({
          filename: 'static/federated-stats.json',
        })
      );
    }

    config.module.rules.push({
      test: /_app.tsx/,
      loader: '@module-federation/nextjs-ssr/lib/federation-loader.js',
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.CURRENT_HOST": JSON.stringify("shell"),
      })
    );

    return config;
  },
};

module.exports = withPlugins(
  [
    withFederatedSidecar({
      name,
      filename: 'static/chunks/remoteEntry.js',
      exposes,
      remotes,
      shared: {
        react: {
          // Notice shared are NOT eager here.
          requiredVersion: false,
          singleton: true,
        },
        zustand: {
          requiredVersion: false,
          singleton: true,
        },
        '@chakra-ui/react': {
          requiredVersion: false,
          singleton: true,
        },
        '@chakra-ui/server': {
          requiredVersion: false,
          singleton: true,
        },
        '@chakra-ui/theme-tools': {
          requiredVersion: false,
          singleton: true,
        },
        '@chakra-ui/icons': {
          requiredVersion: false,
          singleton: true,
        },
        '@emotion/react': {
          requiredVersion: false,
          singleton: true,
        },
        '@emotion/styled': {
          requiredVersion: false,
          singleton: true,
        },
        'framer-motion': {
          requiredVersion: false,
          singleton: true,
        },
        sass: {
          requiredVersion: false,
          singleton: true,
        },
      },
    },
    {
      experiments: {
        flushChunks: true,
      },
    }),
  ],
  nextConfig
);
