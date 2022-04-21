import { ArrowCircleLeftIcon, ShoppingCartIcon } from "@heroicons/react/solid"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  createProductReview,
  listProductDetail,
} from "../actions/productActions"
import Rating from "../components/Rating"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"

function ProductScreen() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const [qty, setQty] = useState(1)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productDetail = useSelector((state) => state.productDetail)
  const { loading, error, product } = productDetail

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert("Review Added")
      setRating(0)
      setComment("")
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET,
      })
    }
    dispatch(listProductDetail(id))
  }, [dispatch, id, successProductReview])

  const addToCartHandler = () => {
    navigate(`/cart/?${id}?qty=${qty}`)
  }

  const reviewsHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className='px-16 lg:px-32 py-2 mt-4 '>
          <Link to='/'>
            <ArrowCircleLeftIcon className='h-6 w-6' />
          </Link>

          <div className='grid grid-col mt-2 shadow-xl rounded-xl border max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-full lg:grid-cols-2  lg:overflow-hidden'>
            <div className='hidden lg:block'>
              <img
                className='aspect-[1/1.1] object-cover'
                src={product.image}
                alt=''
              />
            </div>

            <div className='lg:grid lg:grid-row-6 lg:px-4'>
              <div className='lg:hidden'>
                <img className='aspect-[1/0.8]' src={product.image} alt='' />
              </div>

              <div className='flex items-center justify-between mt-2 mx-4 lg:'>
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
                  <span className='text-gray-500 text-sm'>
                    {" "}
                    ${product.price}
                  </span>
                </div>
              </div>

              {product.countInStock > 0 && (
                <div className='grid grid-flow-col grid-cols-2  m-4'>
                  <div className='flex justify-between items-center  lg:border-0'>
                    <h3 className='font-semibold'>Quantity:</h3>
                  </div>
                  <div className='flex justify-between items-center'>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className='border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500 '
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className='px-4'>
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
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

                <h2 className='font-bold mt-3 mr-2'>Reviews</h2>
                <div className='my-2'>
                  {product.reviews.length === 0 && (
                    <Message> No Reviews</Message>
                  )}
                </div>
                {product.reviews.map((review) => (
                  <div className='m-3' key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p className='mr-2 text-sm'>
                      {review.createdAt.substring(0, 10)}
                    </p>
                    <p className='mr-2'>{review.comment}</p>
                  </div>
                ))}
                <div className='mx-3'>
                  <h2 className='font-semibold mb-2'>
                    Write a Customer Review
                  </h2>
                  {errorProductReview && (
                    <Message>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <form className='' onSubmit={reviewsHandler}>
                      <label htmlFor='rating'>Rate this product</label>
                      <select
                        className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        name='rating'
                        id='rating'
                      >
                        <option value=''>Select....</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </select>
                      <textarea
                        className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                        value={comment}
                        placeholder='Comment'
                        onChange={(e) => setComment(e.target.value)}
                        name='comment'
                        id='comment'
                        cols='10'
                        rows='2'
                      ></textarea>

                      <button
                        type='submit'
                        className='w-full text-center py-3 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none my-1'
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    <Message>
                      Please{" "}
                      <Link className='text-sm font-bold' to='/login'>
                        Sigin
                      </Link>{" "}
                      to review
                    </Message>
                  )}
                </div>
              </details>

              <details className='px-4 m-4 rounded-lg open:bg-gray-100 open:shadow-xl sm:hidden lg:block'>
                <summary className='font-semibold cursor-pointer'>
                  Reviews
                </summary>

                <div className='my-2'>
                  {product.reviews.length <= 0 && <Message>No Reviews</Message>}
                </div>
                {product.reviews.map((review) => (
                  <div className='m-3' key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p className='mr-2 text-sm'>
                      {review.createdAt.substring(0, 10)}
                    </p>
                    <p className='mr-2'>{review.comment}</p>
                  </div>
                ))}
                <div className='mx-3'>
                  <h2 className='font-semibold mb-2'>
                    Write a Customer Review
                  </h2>
                  {errorProductReview && (
                    <Message>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <form className='' onSubmit={reviewsHandler}>
                      <label htmlFor='rating'>Rate this product</label>
                      <select
                        className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        name='rating'
                        id='rating'
                      >
                        <option value=''>Select....</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </select>
                      <textarea
                        className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                        value={comment}
                        placeholder='Comment'
                        onChange={(e) => setComment(e.target.value)}
                        name='comment'
                        id='comment'
                        cols='10'
                        rows='2'
                      ></textarea>

                      <button
                        type='submit'
                        className='w-full text-center py-3 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none my-1'
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    <Message>
                      Please{" "}
                      <Link className='text-sm font-bold' to='/login'>
                        Sigin
                      </Link>{" "}
                      to review
                    </Message>
                  )}
                </div>
              </details>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductScreen
