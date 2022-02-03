
import type { NextPage } from 'next'
import Head from 'next/head'

const Layout = (await import('ui/Layout')).default
const Counter = (await import('ui/Counter')).default
const Title = (await import('ui/Title')).default
const useStore = (await import('ui/store')).default

const RealProducts: NextPage = () => {

  const { count, increment, decrement } = useStore();

  return (
    <>
      <Head>
        <title>RealProducts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Title text="RealProducts" />
          <Counter count={count} onIncrement={increment} onDecrement={decrement} />
        </Layout>
      </main>
    </>
  )
}

RealProducts.getInitialProps = async (ctx) => {
  return {};
}

export default RealProducts