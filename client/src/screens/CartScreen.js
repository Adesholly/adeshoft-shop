import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import { addToCart, removeFromCart } from "../actions/cartActions"
import Message from "../components/Message"
import { Link } from "react-router-dom"
import { TrashIcon } from "@heroicons/react/solid"

function CartScreen() {
  const location = useLocation()
  const productId = location.search && location.search.slice(1, 25).toString()
  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const navigate = useNavigate()

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  function removeCartHandler(id) {
    dispatch(removeFromCart(id))
  }

  function checkOutHandler() {
    navigate(`/login?redirect=shipping`)
  }

  return (
    <>
      <div className='px-16 lg:px-32 py-2 mt-8'>
        <h1 className='text-xl uppercase font-semibold tracking-tight text-gray-600 mb-8'>
          Shopping Cart
        </h1>
        <div className=''>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty
              <Link to='/' className='text-sm font-bold underline ml-1'>
                Start shopping
              </Link>
            </Message>
          ) : (
            <div className='grid gap-8 sm:px-8'>
              {cartItems.map((item) => (
                <div
                  className='flex flex-row border-b-2 gap-2 items-center justify-center w-90 h-30 sm:justify-between'
                  key={item.product}
                >
                  <img className='w-36 h-24' src={item.image} alt={item.name} />
                  <Link to={`/product/${item.product}`}>
                    <h2>{item.name}</h2>
                  </Link>

                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                    className='select-form border-gray-200  rounded focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <div className='hidden md:block'>
                    Price: ${(item.qty * item.price).toFixed(2)}
                  </div>
                  <button onClick={() => removeCartHandler(item.product)}>
                    <TrashIcon className=' h-5 w-5' />
                  </button>
                </div>
              ))}
              <div className='flex justify-between p-6 border-1 '>
                <h2 className='font-bold'>
                  Subtotal of (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h2>
                <h2 className='font-bold'>
                  Total Price: $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h2>
              </div>
              <button
                className='bg-gray-500 text-white py-2 font-bold rounded hover:bg-gray-600'
                type='button'
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Process to checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CartScreen
