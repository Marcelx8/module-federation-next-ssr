import type { AppProps } from 'next/app'
import App from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
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
      <ChakraProvider resetCSS={true} theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: any) => {
  const [appProps] = await Promise.all([
    App.getInitialProps(appContext),
  ]);

  const props = { ...appProps };

  if (typeof window === "undefined") {
    appContext.ctx.res.setHeader(
      "Cache-Control",
      "s-maxage=1, stale-while-revalidate"
    );
  }

  return props;
};

export default MyApp
