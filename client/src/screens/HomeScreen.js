import React, { useEffect, useState } from "react"
import Product from "../components/Product"
import axios from "axios"

function HomeScreen() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get("api/products")

      setProducts(data)
    }

    fetchProduct()
  }, [])

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
