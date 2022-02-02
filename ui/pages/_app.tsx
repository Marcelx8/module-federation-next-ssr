import type { AppProps } from 'next/app'
// import Script from 'next/script'
import theme from '../theme'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Script
        data-webpack="server"
        src="http://localhost:3000/_next/static/chunks/remoteEntry.js"
      />
      <Script
        data-webpack="home"
        src="http://localhost:3001/_next/static/chunks/remoteEntry.js"
      />
      <Script
        data-webpack="products"
        src="http://localhost:3002/_next/static/chunks/remoteEntry.js"
      />
      <Script
        data-webpack="ui"
        src="http://localhost:3003/_next/static/chunks/remoteEntry.js"
      /> */}

        <Component {...pageProps} />
    </>
  )
}

export default MyApp
