import { AppProps, AppContext } from 'next/app';
import dynamic from 'next/dynamic';
const AppImport = import('./realApp');
const App = dynamic(() => AppImport)

const Shell = (props: AppProps) => {
  return <App {...props}></App>
}
Shell.getInitialProps = async (ctx: AppContext) => {
  const gip = (await AppImport).default
  return gip.getInitialProps(ctx)
}
export default Shell