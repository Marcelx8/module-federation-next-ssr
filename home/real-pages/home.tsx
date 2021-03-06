import { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// Federated imports
const useStore = (await import('../fed-store/uiStore')).default
const Layout = dynamic(() => import('../fed-components/uiLayout'))
const Header = dynamic(() => import('../fed-components/uiHeader'))
const Nav = dynamic(() => import('../fed-components/uiNav'))
const Title = dynamic(() => import('../fed-components/uiTitle'))
const Counter = dynamic(() => import('../fed-components/uiCounter'))

const RealHome: NextPage = ({ data }: any) => {

  const { count, increment, decrement } = useStore()
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Header>
            <Nav />
          </Header>
          <Title text="Home" />
          <Counter count={count} onIncrement={increment} onDecrement={decrement} />

          {data && <h3><span style={{ fontWeight: 'bold' }}>Data from API:</span> {JSON.stringify(data)}</h3>}

        </Layout>
      </main>
    </>
  )
}

RealHome.getInitialProps = async (ctx) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await res.json();
  return { ctx, data };
}

export default RealHome