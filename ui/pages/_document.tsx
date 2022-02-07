import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { flushChunks, ExtendedHead } from "@module-federation/nextjs-ssr/flushChunks";
import { ColorModeScript } from '@chakra-ui/react'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const remoteChunks = await flushChunks(process.env.REMOTES);
    return { ...initialProps, remoteChunks };
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
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;