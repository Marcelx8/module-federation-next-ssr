/// /**
//  * @type {import('next').NextConfig}
//  **/
const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');
const FederatedStatsPlugin = require('webpack-federated-stats-plugin');
const withPlugins = require('next-compose-plugins');

const name = 'home';
const exposes = {
  './home': './pages/home.tsx',
  './login': './pages/login/index.tsx',
  './pages-map': './pages-map.ts',x
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
  env: {
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL
  },

  webpack(config, options) {
    const { webpack, isServer } = options;

    config.module.rules.push({
      test: /_app.tsx/,
      loader: '@module-federation/nextjs-ssr/lib/federation-loader.js',
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.CURRENT_HOST": JSON.stringify("home"),
      })
    );

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
    withFederatedSidecar(
      {
        name,
        filename: 'static/chunks/remoteEntry.js',
        exposes,
        remotes,
        shared: {
          react: {
            requiredVersion: false,
            singleton: true,
          },
        },
      },
      {
        experiments: {
          flushChunks: true,
        },
      }
    ),
  ],
  nextConfig
);
