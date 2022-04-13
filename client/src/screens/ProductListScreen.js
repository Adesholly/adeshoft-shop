import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useNavigate } from "react-router-dom"
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"

function ProductListScreen() {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/login")
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ])

  const deleteHandler = (id) => {
    if (window.confirm("Are sure you want to delete?")) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <div className='px-16 lg:px-32 py-2 mt-8'>
      <h2 className='mb-8 text-gray-700 text-xl'>Product List</h2>

      {loading || loadingDelete || loadingCreate ? (
        <Loader />
      ) : error || errorDelete || errorCreate ? (
        <Message>{error}</Message>
      ) : (
        <div className='rounded-lg shadow-gray-200 overflow-auto'>
          <div className='flex justify-end mb-4'>
            <button
              onClick={createProductHandler}
              type='button'
              className='  bg-gray-500  text-white hover:bg-gray-600 text-sm font-semibold p-2'
            >
              <i className='fa-solid fa-plus'></i> Create Product
            </button>
          </div>
          <table className='w-full'>
            <thead className='bg-gray-100 border-b-4 border-gray-200'>
              <tr>
                <th className='p-3 text-left tracking-wide text-sm'>ID</th>
                <th className='p-3 text-left tracking-wide text-sm'>NAME</th>
                <th className='p-3 text-left tracking-wide text-sm'>PRICE</th>
                <th className='p-3 text-left tracking-wide text-sm'>BRAND</th>
                <th className='p-3 text-left tracking-wide text-sm'>
                  CATEGORY
                </th>
                <th className='p-3 text-left tracking-wide text-sm'></th>
              </tr>
            </thead>
            <tbody className='bg-gray-50 divide-y-2 divide-gray-100  text-sm'>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className='uppercase px-3 py-1 whitespace-nowrap'>
                    {product._id}
                  </td>
                  <td className='px-3 py-2  whitespace-nowrap'>
                    {product.name}
                  </td>
                  <td className='px-3 py-2  whitespace-nowrap'>
                    ${product.price}
                  </td>
                  <td className='px-3 py-2  whitespace-nowrap'>
                    {product.brand}
                  </td>
                  <td className='px-3 py-2  whitespace-nowrap'>
                    {product.category}
                  </td>

                  <td className='px-3 py-2  whitespace-nowrap'>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button>
                        <i className='fas fa-edit'></i>
                      </button>
                    </Link>
                    <button
                      className='ml-4'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProductListScreen
