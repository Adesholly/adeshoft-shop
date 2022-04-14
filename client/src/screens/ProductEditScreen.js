import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ArrowCircleLeftIcon } from "@heroicons/react/solid"
import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router"

import { editProduct, listProductDetail } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"

function ProductEditScreen() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState("")

  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const productDetail = useSelector((state) => state.productDetail)
  const { loading, error, product } = productDetail

  const productEdit = useSelector((state) => state.productEdit)
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = productEdit

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate("/admin/productlist")
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetail(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [product, dispatch, id, navigate, successEdit])

  const productEditHandler = (e) => {
    e.preventDefault()
    dispatch(
      editProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    )
  }

  return (
    <>
      <div className='px-16 lg:px-32 py-2 mt-8'>
        <Link to='/admin/productlist'>
          <ArrowCircleLeftIcon className='h-6 w-6 mb-2' />
        </Link>
        <div className='flex flex-col items-center'>
          {product.name === "Sample name" ? (
            <h2 className='mb-8 text-gray-700 text-xl'>Create New Product</h2>
          ) : (
            <h2 className='mb-8 text-gray-700 text-xl'>Edit Product</h2>
          )}
          {loadingEdit && <Loader />}
          {errorEdit && <Message>{errorEdit}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            <form className='flex flex-col'>
              <input
                type='text'
                className='border border-gray-200 w-[300px] p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                required
                name='name'
                autoComplete='productname'
                placeholder='Product Name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />

              <input
                type='number'
                className='border border-gray-200 w-[300px] p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                required
                name='product'
                placeholder='Price'
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              />

              <input
                type='text      '
                className='border border-gray-200 w-[300px] p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                required
                name='image'
                placeholder='Select Image'
                value={image}
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              />

              <input
                type='text      '
                className='border border-gray-200 w-[300px] p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                required
                name='brand'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value)
                }}
              />

              <input
                type='text      '
                className='border border-gray-200 w-[300px] p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                required
                name='category'
                placeholder='Select Category'
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
              />

              <input
                type='number'
                className='border border-gray-200 w-[300px] p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                required
                name='countInStock'
                placeholder='Enter Count In Stock'
                value={countInStock}
                onChange={(e) => {
                  setCountInStock(e.target.value)
                }}
              />

              <textarea
                type='text      '
                className='border border-gray-200 w-[300px] p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                required
                name='description'
                placeholder='Enter Product Description'
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />

              {product.name === "Sample name" ? (
                <button
                  type='submit'
                  className='w-[300px] text-center py-3 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none my-1'
                  onClick={productEditHandler}
                >
                  Create
                </button>
              ) : (
                <button
                  type='submit'
                  className='w-[300px] text-center py-3 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none my-1'
                  onClick={productEditHandler}
                >
                  Update
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductEditScreen
