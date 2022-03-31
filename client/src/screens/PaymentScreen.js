import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { savePaymentMethod } from "../actions/cartActions"
import CheckoutStep from "../components/CheckoutStep"

function PaymentScreen({ step1, step2, step3 }) {
  const cart = useSelector((state) => state.cart)
  const { shipping, payment } = cart

  const [paymentMethod, setPaymentMethod] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!shipping) {
    navigate("/shipping")
  }

  const savePaymentMethodHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(payment))
    navigate("/placeOrder")
  }

  return (
    <div className='px-16 lg:px-32 py-2 mt-8'>
      <div className='bg-white mt-5 px-8 py-8 rounded shadow-lg text-black w-full border border-gray-100 '>
        <CheckoutStep step1 step2 step3 />
        <h2 className='mb-8 text-gray-700 text-2xl text-center'>
          Select Payment Method
        </h2>

        <form
          onSubmit={savePaymentMethodHandler}
          className='px-5 sm:px-10 md:px-32 lg:px-64'
        >
          <div className='flex items-center p-4'>
            <input
              type='radio'
              className='form-radio text-gray-500 focus:ring-gray-600 mr-4'
              name={paymentMethod}
              id='Paypal'
              value='Paypal'
              checked
              onChange={(e) => {
                setPaymentMethod(e.target.value)
              }}
            />
            <label className='mr-10' htmlFor='paypal'>
              PayPal Method
            </label>
            <img
              className='w-20 h-10'
              src='https://www.kindpng.com/picc/m/43-439816_paypal-png-free-image-download-logo-paypal-2019.png'
              alt='paypal'
            />
          </div>

          <div className='flex items-center p-4 mb-4'>
            <input
              type='radio'
              className='form-radio text-gray-500 focus:ring-gray-600 mr-4'
              name={paymentMethod}
              value='Stripe'
              id='Stripe'
              onChange={(e) => {
                setPaymentMethod(e.target.value)
              }}
            />
            <label className='mr-10' htmlFor='stripe'>
              Stripe Method
            </label>
            <img
              className='w-20 h-10'
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9CInB4JguWfw11tW-WYhOX86wqWbwW3_RTobDOAHUyxiaZxd_oCF1ImkfuzWxRfR_Ieg&usqp=CAU'
              alt='stripe'
            />
          </div>

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none my-1'
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentScreen
