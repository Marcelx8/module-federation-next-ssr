import dynamic from 'next/dynamic';

const Server = dynamic(() => import('./realServer'))

export default Server

