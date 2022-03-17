import React, { useEffect } from "react"
import Product from "../components/Product"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"

function HomeScreen() {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <div className='px-16 lg:px-32 py-2 mt-8'>
        <h1 className='text-xl uppercase font-semibold tracking-tight text-gray-600'>
          Latest Products
        </h1>
        <div className='grid grid-grow-col sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 '>
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default HomeScreen
