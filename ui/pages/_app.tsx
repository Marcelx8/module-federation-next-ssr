import { AppProps, AppContext } from 'next/app';
import dynamic from 'next/dynamic';
const AppImport = import('./realApp');
const App = dynamic(() => AppImport)

const UIShell = (props: any) => {
  return <App {...props}></App>
}
UIShell.getInitialProps = async (ctx: any) => {
  const gip = (await AppImport).default
  return gip.getInitialProps(ctx)
}
export default UIShell