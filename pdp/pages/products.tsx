import dynamic from 'next/dynamic';

const Products = dynamic(() => import('./realProducts'))

export default Products
