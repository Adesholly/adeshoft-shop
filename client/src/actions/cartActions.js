import axios from "axios"
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants"

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/product/${id}`
  )

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShipping = (shipping) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: shipping,
  })

  localStorage.setItem("shippingInfo", JSON.stringify(getState().cart.shipping))
}

export const savePaymentMethod = (payment) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: payment,
  })

  localStorage.setItem("paymentInfo", JSON.stringify(getState().cart.payment))
}
