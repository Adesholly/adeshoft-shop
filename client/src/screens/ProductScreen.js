import { ArrowCircleLeftIcon, ShoppingCartIcon } from "@heroicons/react/solid"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import Rating from "../components/Rating"

function ProductScreen() {
  const [product, setProduct] = useState({})
  const { id } = useParams()

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`api/products/${Number(id)}`)

      const formateData = JSON.parse(data)

      setProduct(formateData)
    }

    fetchProduct()
  }, [])

  return (
    <div className='px-16 lg:px-32 py-2 mt-4 '>
      <Link to='/'>
        <ArrowCircleLeftIcon className='h-6 w-6' />
      </Link>

      <div className='grid grid-col mt-2 shadow-xl rounded-xl border max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-full lg:grid-cols-2  lg:overflow-hidden'>
        <div className='hidden lg:block'>
          <img
            className='aspect-[1/1.1] object-cover'
            src={product.oneImage}
            alt=''
          />
        </div>

        <div className='lg:grid lg:grid-row-6 lg:px-4'>
          <div className='lg:hidden'>
            <img className='aspect-[1/0.8]' src={product.oneImage} alt='' />
          </div>

          <div className='flevbx items-center justify-between mt-2 mx-4 lg:'>
            <div className='text-lg font-bold leading-tight  '>
              {product.name}
            </div>
            <div className='text-xl'>${product.price}</div>
          </div>
          <div className='my-2 mx-4'>
            <Rating
              value={product.rating}
              text={`(${product.numReviews} reviews)`}
            />
          </div>

          <details
            open
            className='hidden m-4 rounded-lg open:bg-gray-100 open:shadow-xl lg:block lg:open:bg-white lg:open:shadow-none'
          >
            <summary className='font-semibold cursor-pointer '>
              Check the Description
            </summary>
            <p className='mr-2 leading-relaxed mt-2 tracking-wide'>
              {product.description}
            </p>
          </details>

          <div className='grid grid-flow-col grid-cols-2  m-4'>
            <div className='flex justify-between items-center border-r lg:border-0'>
              <h3 className='font-semibold'>Status: </h3>
              <span className='text-gray-500 text-sm pr-4'>
                {product.countInStock >= 1 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <h3 className='font-bold pl-4 lg:pl-0'>Price:</h3>
              <span className='text-gray-500 text-sm'> ${product.price}</span>
            </div>
          </div>

          <div className='px-4'>
            <button
              type='button'
              className='flex items-center justify-center w-full bg-gray-600  text-white hover:bg-gray-500 text-lg font-semibold py-2 rounded'
            >
              <ShoppingCartIcon className='h-6 w-6' />
              Add Cart
            </button>
          </div>

          <details className='px-4 m-4 rounded-lg open:bg-gray-100 open:shadow-xl lg:hidden'>
            <summary className='font-semibold cursor-pointer'>
              Check the Description
            </summary>
            <p className='mr-2'>{product.description}</p>
          </details>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen
