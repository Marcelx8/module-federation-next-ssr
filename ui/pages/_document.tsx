import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { flushChunks, ExtendedHead } from "@module-federation/nextjs-ssr/flushChunks";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      remoteChunks: await flushChunks(process.env.REMOTES),
    };
  }

  render() {
    return (
      <Html>
        {/* <Head /> */}
        <ExtendedHead>
          <meta name="robots" content="noindex" />
          {/* @ts-ignore*/}
          {this.props.remoteChunks}
        </ExtendedHead>
        <body>
          {/* <script
            data-webpack="server"
            src="http://localhost:3000/_next/static/chunks/remoteEntry.js"
          />
          <script
            data-webpack="home"
            src="http://localhost:3001/_next/static/chunks/remoteEntry.js"
          />
          <script
            data-webpack="products"
            src="http://localhost:3002/_next/static/chunks/remoteEntry.js"
          />
          <script
            data-webpack="ui"
            src="http://localhost:3003/_next/static/chunks/remoteEntry.js"
          /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;