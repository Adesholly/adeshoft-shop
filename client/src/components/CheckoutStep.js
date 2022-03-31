import React from "react"
import { Link } from "react-router-dom"

function CheckoutStep({ step1, step2, step3, step4 }) {
  return (
    <nav className='flex justify-between my-8 mx-2'>
      <div className=''>
        {step1 ? (
          <Link to='/login'>
            <span className='text-gray-700 active:bg-gray-100 p-2 rounded'>
              Sign In
            </span>
          </Link>
        ) : (
          <span className='text-gray-600 active:bg-gray-100 p-2 rounded opacity-20'>
            Sign In
          </span>
        )}
      </div>
      <div className=''>
        {step2 ? (
          <Link to='/shipping'>
            <span className='text-gray-700 active:bg-gray-100 p-2 rounded'>
              Shipping
            </span>
          </Link>
        ) : (
          <span className='text-gray-600 active:bg-gray-100 p-2 roundedshadow-orange-50 opacity-20'>
            {" "}
            Shipping{" "}
          </span>
        )}
      </div>
      <div className=''>
        {step3 ? (
          <Link to='/payment'>
            <span className='text-gray-700 active:bg-gray-100 p-2 rounded'>
              Payment
            </span>
          </Link>
        ) : (
          <span className='text-gray-600 active:bg-gray-100 p-2 rounded opacity-20'>
            Payment
          </span>
        )}
      </div>
      <div className=''>
        {step4 ? (
          <Link to='/placeorder'>
            <span className='text-gray-700 active:bg-gray-100 p-2 rounded'>
              Order
            </span>
          </Link>
        ) : (
          <span className='text-gray-600 active:bg-gray-100 p-2 rounded  opacity-20'>
            Order
          </span>
        )}
      </div>
    </nav>
  )
}

export default CheckoutStep
