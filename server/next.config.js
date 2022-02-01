const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');
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
module.exports = withFederatedSidecar(
  {
    name: 'server',
    filename: 'static/chunks/remoteEntry.js', // location where development code is exposed
    exposes: {
      './server': './pages/server.tsx',
      './pages-map': './pages-map.ts',
    },
    remotes,
    shared: {
      react: {
        // Notice shared are NOT eager here.
        requiredVersion: false,
        singleton: true,
      },
    },
  }
)({
  webpack5: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /_app.tsx/,
      loader: '@module-federation/nextjs-ssr/lib/federation-loader.js',
    });

    return config;
  },
});
