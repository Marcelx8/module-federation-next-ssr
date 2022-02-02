import dynamic from 'next/dynamic';

const UI = dynamic(() => import('./real-ui'))

export default UI
