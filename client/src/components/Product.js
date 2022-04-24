import React from "react"
import { Link } from "react-router-dom"
import Rating from "./Rating"

function Product({ product }) {
  const addCartHandler = () => {
    console.log("added")
  }

  return (
    <div className='my-5 border shadow-lg rounded-md overflow-hidden'>
      <div>
        <Link to={`/product/${product._id}`}>
          <img className='object-cover' src={product.image} alt='' />
        </Link>
      </div>

      <div className='p-6'>
        <Link to={`/product/${product._id}`}>
          <div className='font-bold leading-tight'> {product.name}</div>
        </Link>
        <div className='mt-2'>
          <Rating
            value={product.rating}
            text={`(${product.numReviews} reviews)`}
          />
        </div>
        <div className='flex justify-between'>
          <div className='mt-2 font-semibold text-xl tracking-widest'>
            ${product.price}
          </div>

          <button
            className='rounded-[25%] bg-gray-500 shadow-lg hover:bg-gray-600 font-bold px-2 text-white'
            onClick={addCartHandler}
          >
            <i class='fa-solid fa-cart-plus'></i>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
