import React from 'react'


function Product({ product }) {
  return (
    <div className="my-5 border shadow-lg rounded-md overflow-hidden">
      <div> 
        <a href="">
        <img className="object-cover"  src={product.image[0]} alt="" />
        </a>
      </div>

      <div className="p-6">

        <div className="font-bold leading-tight"> {product.name}
        </div>
        <div className="mt-2"> {product.rating} ({product.numReviews} reviews)
        </div>
        <div className="mt-2 font-semibold text-xl tracking-widest"> ${product.price} 
        </div>

      </div>
     



    </div>
  )
}

export default Product