import type { AppContext, AppProps } from 'next/app'
import App from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
// import createEmotionCache from '../utilities/createEmotionCache';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// const clientSideEmotionCache = createEmotionCache();

// const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* <CacheProvider value={emotionCache}> */}
        <ChakraProvider resetCSS={true} theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      {/* </CacheProvider> */}
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const [appProps] = await Promise.all([
    App.getInitialProps(appContext),
  ]);

  const props = { ...appProps };

  if (typeof window === "undefined") {
    if (appContext.ctx.res) {
      appContext.ctx.res.setHeader(
        "Cache-Control",
        "s-maxage=1, stale-while-revalidate"
      );
    }
  }

  return props;
};

export default MyApp
