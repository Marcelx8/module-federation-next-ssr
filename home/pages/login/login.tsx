import dynamic from 'next/dynamic';

const Page = dynamic(() => import('../../real-pages/login'))

const Wrapper = (props: any) => {
  return <Page {...props}></Page>
}
Wrapper.getInitialProps = async (ctx: any) => {
  const PageImport = import('../../real-pages/login')
  const getInitialProps = (await PageImport)?.default.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default Wrapper