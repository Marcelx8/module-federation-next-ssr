import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
import Head from 'next/head'

// const Layout = dynamic(() => import('ui/Layout'));
// const Counter = dynamic(() => import('ui/Counter'));
// const Title = dynamic(() => import('ui/Title'));
import Layout from 'ui/Layout'
import Counter from 'ui/Counter'
import Title from 'ui/Title'
import useStore from 'ui/store'


const Login: NextPage = () => {

  const { count, increment, decrement } = useStore()

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Title text="Login" />
          <Counter count={count} onIncrement={increment} onDecrement={decrement} />
        </Layout>
      </main>
    </>
  )
}

export default Login
