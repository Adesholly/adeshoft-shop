import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import { addToCart } from "../actions/cartActions"

function CartScreen() {
  const location = useLocation()
  const productId = location.search && location.search.slice(1, 25)
  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  console.log(productId)

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log(cartItems)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <>
      <div className='px-16 lg:px-32 py-2 mt-8'> Cart</div>
    </>
  )
}

export default CartScreen
