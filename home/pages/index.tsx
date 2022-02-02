import dynamic from 'next/dynamic';

const Home = dynamic(() => import('./realIndex'))

export default Home
