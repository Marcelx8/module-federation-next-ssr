// /**
//  * @type {import('next').NextConfig}
//  **/
const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');
const withPlugins = require('next-compose-plugins');
const FederatedStatsPlugin = require('webpack-federated-stats-plugin');

const name = 'home';
const exposes = {
  './home': './pages/home.tsx',
  './login': './pages/login/login.tsx',
  './pages-map': './pages-map.ts',
};
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    shell: process.env.VERCEL
    ? `shell@https://${VERCEL_URL}-shell.vercel.app/_next/static/${location}/remoteEntry.js?${Date.now()}`
    : `shell@http://localhost:3000/_next/static/${location}/remoteEntry.js?${Date.now()}`,
    home: process.env.VERCEL_URL
    ? `home@https://${VERCEL_URL}-home.vercel.app/_next/static/${location}/remoteEntry.js?${Date.now()}`
    : `home@http://localhost:3001/_next/static/${location}/remoteEntry.js?${Date.now()}`,
    products: process.env.VERCEL_URL
    ? `products@https://${VERCEL_URL}-products.vercel.app/_next/static/${location}/remoteEntry.js?${Date.now()}`
    : `products@http://localhost:3002/_next/static/${location}/remoteEntry.js?${Date.now()}`,
    ui: process.env.VERCEL_URL
    ? `ui@https://${VERCEL_URL}-ui.vercel.app/_next/static/${location}/remoteEntry.js?${Date.now()}`
    : `ui@http://localhost:3003/_next/static/${location}/remoteEntry.js?${Date.now()}`,
  };
};

const nextConfig = {
  env: {
    VERCEL: process.env.VERCEL,
    VERCEL_URL: `module-federation-next-ssr`
  },

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
        "process.env.CURRENT_HOST": JSON.stringify("home"),
      })
    );

    return config;
  },
};

module.exports = withPlugins(
  [
    withFederatedSidecar({
      name: name,
      filename: 'static/chunks/remoteEntry.js',
      exposes: exposes,
      remotes: remotes,
      shared: {
        react: {
          // Notice shared are NOT eager here.
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
