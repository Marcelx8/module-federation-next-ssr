import { AppProps, AppContext } from 'next/app';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../real-pages/app'))

const Shell = (props: AppProps) => {
  return <App {...props}></App>
}
Shell.getInitialProps = async (ctx: AppContext) => {
  const AppImport = import('../real-pages/app')
  const getInitialProps = (await AppImport)?.default.getInitialProps;
  if(getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}
export default Shell