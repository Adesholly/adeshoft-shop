import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'



function Product({ product }) {
  return (
    <div className="my-5 border shadow-lg rounded-md overflow-hidden">
      <div> 
        <Link to={`product/${product._id}`} >
          <img className="object-cover"  src={product.image[0]} alt="" />
        </Link>
      </div>

      <div className="p-6">

        <div className="font-bold leading-tight"> {product.name}
        </div>
        <div className="mt-2"> 
          <Rating value={product.rating} text={`(${product.numReviews} reviews)`}/>     
        </div>
        <div className="mt-2 font-semibold text-xl tracking-widest"> ${product.price} 
        </div>

      </div>
     



    </div>
  )
}

export default Product