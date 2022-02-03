import dynamic from 'next/dynamic';

const Login = dynamic(() => import('./realLogin'))

export default Login