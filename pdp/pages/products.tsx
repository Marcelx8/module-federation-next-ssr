import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
import Head from 'next/head'

const Layout = dynamic(() => import('ui/Layout'));
const Counter = dynamic(() => import('ui/Counter'));
const Title = dynamic(() => import('ui/Title'));
import useStore from 'ui/store'

const Products: NextPage = () => {

  const { count, increment, decrement } = useStore();

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Title text="Products" />
          <Counter count={count} onIncrement={increment} onDecrement={decrement} />
        </Layout>
      </main>
    </>
  )
}

Products.getInitialProps = async (ctx) => {
  return {};
}

export default Products
