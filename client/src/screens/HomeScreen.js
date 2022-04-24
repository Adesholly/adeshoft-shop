import React, { useEffect } from "react"
import Product from "../components/Product"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useParams } from "react-router"
import Pagination from "../components/Pagination"

function HomeScreen() {
  const dispatch = useDispatch()
  const { keyword } = useParams()

  const { pageNumber } = useParams() || 1

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages, counts } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className='px-16 lg:px-32 py-2 mt-8'>
          <h1 className='text-xl uppercase font-semibold tracking-tight text-gray-600'>
            Latest Products
          </h1>
          <div className='grid grid-grow-col sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 '>
            {products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>

          <Pagination
            page={page}
            pages={pages}
            counts={counts}
            keyword={keyword ? keyword : ""}
          />
        </div>
      )}
    </>
  )
}

export default HomeScreen
