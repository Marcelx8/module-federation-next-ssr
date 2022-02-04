const serverPath = "http://localhost:3000"
const homePath = "http://localhost:3001"
const productsPath = "http://localhost:3002"
const uiPath = "http://localhost:3003"

const remotes = {
  home: {
    entry: `${homePath}/_next/static/chunks/remoteEntry.js`,
    publicPath: `${homePath}/_next/`,
  },
  server: {
    entry: `${serverPath}/_next/static/chunks/remoteEntry.js`,
    publicPath: `${serverPath}/_next/`,
  },
  products: {
    entry: `${productsPath}/_next/static/chunks/remoteEntry.js`,
    publicPath: `${productsPath}/_next/`,
  },
  ui: {
    entry: `${uiPath}/_next/static/chunks/remoteEntry.js`,
    publicPath: `${uiPath}/_next/`,
  },
}

export default remotes