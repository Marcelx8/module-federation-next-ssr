import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ColorModeScript } from '@chakra-ui/react'

class MyDocument extends Document {
  // static async getStaticProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script
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
          />
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;