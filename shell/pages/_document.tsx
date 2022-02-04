import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { flushChunks, ExtendedHead } from "@module-federation/nextjs-ssr/flushChunks";
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../utilities/createEmotionCache';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {

    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props) =>
          <App emotionCache={cache} {...props} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    const remoteChunks = await flushChunks(process.env.REMOTES);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    // const emotionStyleTags = emotionStyles.styles.map((style) => (
      // <style
      //   data-emotion={`${style.key} ${style.ids.join(' ')}`}
      //   key={style.key}
      //   dangerouslySetInnerHTML={{ __html: style.css }}
      // />
    // ));


    return {
      ...initialProps,
      remoteChunks,
      style: [
        // ...React.Children.toArray(initialProps.styles),
        // ...emotionStyleTags,
      ]
    };
  }

  render() {

    return (
      <Html>
        <ExtendedHead>
          <meta name="robots" content="noindex" />
          {/* @ts-ignore*/}
          {this.props.remoteChunks}
        </ExtendedHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;