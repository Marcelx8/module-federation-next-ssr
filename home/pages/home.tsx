import dynamic from 'next/dynamic';

const Home = dynamic(() => import('./realHome'))

export default Home

