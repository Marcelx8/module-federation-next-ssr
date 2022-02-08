import dynamic from 'next/dynamic';
const PageImport = import('../real-pages/ui')
const Page = dynamic(() => PageImport)
const UiWrapper = (props: any) => {
  return <Page {...props}></Page>
}
UiWrapper.getInitialProps = async (ctx: any) => {
  const gip = (await PageImport).default
  {/* @ts-ignore */ }
  return gip.getInitialProps(ctx)
}

export default UiWrapper