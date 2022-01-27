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
module.exports = withFederatedSidecar({
  name: 'ui',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './ui': './pages/ui.tsx',
    './Layout': './components/layout/Layout.tsx',
    './Header': './components/layout/Header.tsx',
    './Counter': './components/Counter.tsx',
    './Title': './components/Title.tsx',
    './Nav': './components/Nav.tsx',
    './store': './lib/store.ts',
    './pages-map': './pages-map.ts',
  },
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
      eager: true,
    },
    "@chakra-ui/react": {
      requiredVersion: false,
      singleton: true,
      eager: true,
    },
    "@chakra-ui/icons": {
      requiredVersion: false,
      singleton: true,
      eager: true,
    },
    "@emotion/react": {
      requiredVersion: false,
      singleton: true,
      eager: true,
    },
    "@emotion/styled": {
      requiredVersion: false,
      singleton: true,
      eager: true,
    },
    "framer-motion": {
      requiredVersion: false,
      singleton: true,
      eager: true,
    },
    sass: {
      requiredVersion: false,
      singleton: true,
      eager: false,
    }
  },

})({
  webpack5: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /_app.tsx/,
      loader: '@module-federation/nextjs-ssr/lib/federation-loader.js',
    });

    return config;
  },
});

// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   reactStrictMode: true,
// // }

// // module.exports = nextConfig

// const { withFederatedSidecar, federationLoader } = require('@module-federation/nextjs-mf');
// const deps = require('./package.json').dependencies;
// let merge = require('webpack-merge');

// module.exports = withFederatedSidecar({
//   name: "ui",
//   filename: "static/chunks/remoteEntry.js",
//   exposes: {
//     './Counter': './components/Counter.tsx',
//     './useStore': './lib/store',
//     './ui': './pages/ui.tsx',
//     "./pages-map": "./pages-map.ts",
//   },
//   shared: {
//     react: {
//       requiredVersion: false,
//       singleton: true,
//     },
//   },
// })({
//   webpack5: true,
//   webpack(config, options) {
//     const { webpack, isServer } = options;

//     config.experiments = { topLevelAwait: true };
//     config.output.publicPath = "auto";
//     config.module.rules.push({
//       test: /_app.tsx/,
//       loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
//     });

//     if (isServer) {
//       // ignore it on SSR, realistically you probably wont be SSRing Fmodules, without paid support from @ScriptedAlchemy
//       Object.assign(config.resolve.alias, {
//         server: false,
//         home: false,
//         products: false,
//         ui: false,
//       });
//     } else {
//       config.output.publicPath = "auto";
//       config.plugins.push(
//         new webpack.container.ModuleFederationPlugin({
//           remoteType: "var",
//           remotes: {
//             server: "server",
//             home: "home",
//             products: "products",
//             ui: "ui",
//           },
//           shared: {
//             // "@module-federation/nextjs-mf/lib/noop": {
//             //   eager: false,
//             // },
//             react: {
//               singleton: true,
//               eager: true,
//               requiredVersion: false,
//             },
//             zustand: {
//               singleton: true,
//               eager: true,
//               requiredVersion: false,
//             },
//           },
//         })
//       );
//     }

//     return config
//   },
// });
