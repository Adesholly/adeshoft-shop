import React from 'react'
import products from '../products';

function HomeScreen() {
  return (
    <>
    <div className="container px-12 lg:px-16 ">
        <h1 className="text-2xl uppercase font-sans tracking-wide text-gray-900">Lastest Products</h1>
        <div className="">{products.map(product => (
            <img src={product.image[0]}></img>
        ))}</div>

    </div>
   
    </>
  )
}

export default HomeScreen