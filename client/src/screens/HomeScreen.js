import React from 'react'
import Product from '../components/Product';
import products from '../products';

function HomeScreen() {
  return (
    <>
    <div className="px-16 lg:px-32 py-2 mt-8">
        <h1 className="text-xl uppercase font-semibold tracking-tight text-gray-600">Latest Products</h1>
        <div className="grid grid-grow-col sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 ">{products.map(product => (
            <Product product={product} />
        ))}</div>

    </div>
   
    </>
  )
}

export default HomeScreen