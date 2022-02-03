/**
 * @type {import('next').NextConfig}
 **/
const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');
const FederatedStatsPlugin = require('webpack-federated-stats-plugin');
const withPlugins = require('next-compose-plugins');

const name = 'ui';
const exposes = {
  './Layout': './components/layout/Layout.tsx',
  './Header': './components/layout/Header.tsx',
  './Counter': './components/Counter.tsx',
  './Title': './components/Title.tsx',
  './Nav': './components/Nav.tsx',
  './store': './lib/store.ts',
  './ui': './pages/ui.tsx',
  './pages-map': './pages-map.ts',
};
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    server: `server@http://localhost:3000/_next/static/${location}/remoteEntry.js?${Date.now()}`,
    home: `home@http://localhost:3001/_next/static/${location}/remoteEntry.js?${Date.now()}`,
    products: `products@http://localhost:3002/_next/static/${location}/remoteEntry.js?${Date.now()}`,
    ui: `ui@http://localhost:3003/_next/static/${location}/remoteEntry.js?${Date.now()}`,
  };
};
const nextConfig = {
  webpack(config, options) {
    const { webpack, isServer } = options;

    config.module.rules.push({
      test: /_app.tsx/,
      loader: '@module-federation/nextjs-ssr/lib/federation-loader.js',
    });

    if (!isServer) {
      config.plugins.push(
        new FederatedStatsPlugin({
          filename: 'static/federated-stats.json',
        })
      );
    }

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
          eager: false,
        },
        '@chakra-ui/react': {
          requiredVersion: false,
          singleton: true,
          eager: true,
        },
        '@chakra-ui/icons': {
          requiredVersion: false,
          singleton: true,
          eager: true,
        },
        '@emotion/react': {
          requiredVersion: false,
          singleton: true,
          eager: true,
        },
        '@emotion/styled': {
          requiredVersion: false,
          singleton: true,
          eager: true,
        },
        'framer-motion': {
          requiredVersion: false,
          singleton: true,
          eager: true,
        },
        sass: {
          requiredVersion: false,
          singleton: true,
          eager: false,
        },
      },
    }),
  ],
  nextConfig
);