import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { saveShipping } from "../actions/cartActions"

function ShippingScreen() {
  const cart = useSelector((state) => state.cart)
  const { shipping } = cart

  const [address, setAddress] = useState(shipping.address)
  const [city, setCity] = useState(shipping.city)
  const [postCode, setPostCode] = useState(shipping.postCode)
  const [country, setCountry] = useState(shipping.country)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const saveShippingHandler = (e) => {
    e.preventDefault()
    dispatch(saveShipping({ address, city, postCode, country }))
    navigate("/payment")
  }

  return (
    <div className='px-16 lg:px-32 py-2 mt-8'>
      <div
        className='
     '
      >
        <div className='bg-white mt-10 px-8 py-8 rounded shadow-lg text-black w-full border border-gray-100 '>
          <h1 className='mb-8 text-gray-700 text-3xl text-center'>Shipping</h1>
          <form
            onSubmit={saveShippingHandler}
            className='px-5 sm:px-10 md:px-32 lg:px-64'
          >
            <input
              type='text'
              className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
              required
              name='address'
              autoComplete='address'
              placeholder='Address'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
              }}
            />

            <input
              type='text'
              className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
              required
              name='city'
              autoComplete='current-city'
              placeholder='City'
              value={city}
              onChange={(e) => {
                setCity(e.target.value)
              }}
            />

            <input
              type='number'
              className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
              required
              name='postCode'
              autoComplete='current-postCode'
              placeholder='Post-Code'
              value={postCode}
              onChange={(e) => {
                setPostCode(e.target.value)
              }}
            />

            <input
              type='text'
              className='block border border-gray-200 w-full p-3 rounded mb-4 focus:outline-none shadow-sm focus:border-gray-400 focus:ring-0 focus:ring-gray-500'
              name='country'
              autoComplete='current-country'
              placeholder='Country'
              value={country}
              onChange={(e) => {
                setCountry(e.target.value)
              }}
              required
            />

            <button
              type='submit'
              className='w-full text-center py-3 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none my-1'
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShippingScreen
