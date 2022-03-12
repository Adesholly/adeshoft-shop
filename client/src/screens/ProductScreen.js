import { ArrowCircleLeftIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'

function ProductScreen() {

  const {id} = useParams()
  const product = products.find(p =>p._id === id)
  return (
    <div className="px-16 lg:px-32 py-2 mt-4 ">
      <Link to="/">
        <ArrowCircleLeftIcon className="h-6 w-6" />
      </Link>

      <div className="grid grid-col mt-2 sm shadow-xl rounded-xl border max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-full lg:grid-cols-2  lg:overflow-hidden">


        <div className="hidden lg:block">
          <img className="aspect-[1/1.1] object-cover" src={product.image[0]} alt="" />
          
        </div>

        <div className="lg:grid lg:px-4">

          <div className="lg:hidden">
            <img className="aspect-[1/0.8]" src={product.image[0]} alt="" />
            
          </div>

          <div className="flex items-center justify-between mx-4 lg:">
            <div className="text-lg font-bold leading-tight mt-2 ">{product.name}</div>
            <div className="text-xl">${product.price}</div>
          </div>
          <div className="my-2 mx-4" >
            <Rating value={product.rating} text={`(${product.numReviews} reviews)`} />
          </div>

          <details open className="hidden m-4 rounded-lg open:bg-gray-100 open:shadow-xl lg:block lg:open:bg-white lg:open:shadow-none">

            <summary className="font-semibold cursor-pointer ">Check the Description</summary>
            <p className="mr-2 leading-relaxed mt-2 tracking-wide">
            {product.description}
            </p> 
      

          </details>
        

          <div className="grid grid-flow-col grid-cols-2 lg:grid-col-1 m-4">
            <div className="flex justify-between items-center border-r">
              
              <h3 className="font-semibold">Status: </h3>
              <span className="text-gray-500 text-sm pr-4">{product.countInStock >= 1 ? "In Stock" : "Out of Stock"}</span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="font-bold pl-4">Price:</h3>
              <span className="text-gray-500 text-sm"> ${product.price}</span>        
            </div>
          </div>

          <div className="px-4">
            <button type="button" className="flex items-center justify-center w-full bg-gray-600  text-white hover:bg-gray-500 text-lg font-semibold py-2 rounded"><ShoppingCartIcon className="h-6 w-6" />Add Cart
            </button>
          </div>

      
          <details className="px-4 m-4 rounded-lg open:bg-gray-100 open:shadow-xl lg:hidden">

            <summary className="font-semibold cursor-pointer">Check the Description</summary>
            <p className="mr-2">
            {product.description}
            </p> 
      
          </details>

        </div>       
      
      </div>


    
    </div>
  )
}

export default ProductScreen